import React, { useMemo } from 'react'
import { Popover, useTheme, useToasts } from '@geist-ui/react'
import { BlockPicker, ColorResult } from 'react-color'
import { getSafeColor } from '../lib/utils'
import Add from './add'

export type ColorItemBaseProps = {
  value: string
  onChange?: (color: string) => void
}

export type ColorItemProps = Omit<ColorItemBaseProps, 'value'> & {
  value: string | string[]
  isArray?: boolean
}

const ColorItemBase: React.FC<ColorItemBaseProps> = ({ value, onChange }) => {
  const theme = useTheme()
  const safeColor = useMemo(() => getSafeColor(value), [value])

  const colorChangeHandler = ({ hex }: ColorResult) => {
    onChange && onChange(hex)
  }
  const popoverContent = (color: string) => (
    <BlockPicker color={color} onChangeComplete={colorChangeHandler} />
  )
  return (
    <Popover content={() => popoverContent(safeColor)} portalClassName="colorContent">
      <div className="item">{`${safeColor}`.toUpperCase()}</div>
      <style jsx>{`
        .item {
          width: auto;
          height: 25px;
          overflow: hidden;
          background-color: transparent;
          padding: 0 ${theme.layout.gapHalf};
          line-height: 40px;
          display: inline-flex;
          align-items: center;
          border: 1px solid ${theme.palette.border};
          border-radius: ${theme.layout.radius};
          color: ${theme.palette.accents_5};
          margin-right: 10px;
          cursor: pointer;
          transition: color 200ms ease;
        }

        :global(#geist-ui-tooltip .colorContent .inner) {
          padding: 0;
        }
        :global(#geist-ui-tooltip .colorContent .block-picker) {
          box-shadow: none !important;
        }
      `}</style>
    </Popover>
  )
}

const ColorItem: React.FC<ColorItemProps> = ({ value, isArray, onChange }) => {
  const [, setToast] = useToasts()
  const colors = useMemo(() => `${value}`.split(','), [value])
  const changeHandler = (color: string, index: number) => {
    if (!isArray) return onChange(color)
    if (index >= colors.length) {
      return onChange([...colors, color].join(','))
    }
    const nextColors = colors.map((srouce, i) => (i !== index ? srouce : color))
    onChange(nextColors.join(','))
  }

  const addColor = () => {
    if (colors.length >= 3) {
      return setToast({ text: 'Only up to 3 gradient values can be set', type: 'warning' })
    }
    changeHandler('000000', colors.length)
  }

  return (
    <>
      {colors.map((c, index) => (
        <ColorItemBase key={index} value={c} onChange={c => changeHandler(c, index)} />
      ))}
      {isArray && <Add onClick={addColor} />}
    </>
  )
}

export default ColorItem
