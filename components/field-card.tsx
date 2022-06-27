import React, { useMemo } from 'react'
import { Card, Code, Grid, Text, useTheme } from '@geist-ui/react'
import {
  UserSettings,
  defaultNames,
  useSettingsContext,
  defaultDescription,
  defaultUserTypes,
  defaultSettings,
} from './settings-context'
import {
  colorHexPipe,
  colorsToLinear,
  getColorLength,
  getContrastingColor,
  isBooleanKey,
  isColorKey,
  isEqualValue,
  isNumberKey,
  isStatusBarKey,
} from '../lib/utils'
import ColorItem from './color-item'
import InputItem from './input-item'
import ToggleItem from './toggle-item'
import NumberItem from './number-item'
import Reset from './reset'
import StatusBarItem from '@cps/status-bar-item'

export type FieldCardProps = {
  name: keyof UserSettings
}

const FieldCard: React.FC<FieldCardProps> = ({ name }) => {
  const theme = useTheme()
  const { updateSettings, ...values } = useSettingsContext()
  const value = useMemo(() => values[name], [name, values])
  const textColor = useMemo(() => {
    if (!isColorKey(name)) return theme.palette.foreground
    const colors = colorHexPipe(value as string)
    const colorString = Array.isArray(colors) ? colors[0] : colors
    return getContrastingColor(colorString)
  }, [name, value, theme.palette])
  const backgroundColor = useMemo(() => {
    if (!isColorKey(name)) return theme.palette.background
    return colorsToLinear(value as string)
  }, [name, theme.palette, value])
  const hasChange = useMemo(() => {
    const defaultValue = defaultSettings[name]
    return !isEqualValue(defaultValue, value)
  }, [defaultSettings, value])
  const colorLen = getColorLength(value)

  const ChangeHandler = (next: any) => {
    updateSettings(name, next)
  }
  const resetHandler = () => {
    const defaultValue = defaultSettings[name]
    updateSettings(name, defaultValue)
  }

  const component = useMemo(() => {
    const allowArray = name === 'hbg'
    if (isBooleanKey(name)) return <ToggleItem value={value as boolean} onChange={ChangeHandler} />
    if (isNumberKey(name)) return <NumberItem value={value as number} onChange={ChangeHandler} />
    if (isStatusBarKey(name))
      return <StatusBarItem value={value as number} onChange={ChangeHandler} />
    if (isColorKey(name))
      return <ColorItem value={value as string} onChange={ChangeHandler} isArray={allowArray} />
    return <InputItem value={value as string} onChange={ChangeHandler} />
  }, [name, value])

  return (
    <Grid xs={colorLen > 1 ? 24 : 12} sm={colorLen === 1 ? 6 : colorLen * 2.5 + 4}>
      <div className="container">
        <Card className="field-card">
          <Card.Content className="field">
            {hasChange && <Reset color={textColor} onClick={resetHandler} />}
            <Text size={16} className="title">
              {defaultNames[name]}
            </Text>
            <Text size={12} className="subtitle">
              {defaultDescription[name]}[<Code>{defaultUserTypes[name]}</Code>]
            </Text>
          </Card.Content>
          <Card.Footer className="color">{component}</Card.Footer>
        </Card>
        <style jsx>{`
          .container :global(.title) {
            color: ${textColor};
            margin-top: 5px;
            font-weight: 500;
            letter-spacing: 0.25px;
          }
          .container :global(.subtitle) {
            color: ${textColor};
            opacity: 0.5;
          }
          .container :global(.field-card) {
            max-width: ${colorLen === 1 ? '170px' : 'auto'};
            overflow: hidden;
          }
          .container :global(.field) {
            padding: calc(${theme.layout.gapHalf} / 2) ${theme.layout.gapHalf};
            width: 100%;
            height: 120px;
            background: ${backgroundColor};
            border-top-left-radius: ${theme.layout.radius};
            border-top-right-radius: ${theme.layout.radius};
            position: relative;
          }
          .container :global(.color) {
            height: 40px;
            min-height: unset;
            display: flex;
            align-items: center;
            padding-left: ${theme.layout.gapHalf};
          }
        `}</style>
      </div>
    </Grid>
  )
}

export default FieldCard
