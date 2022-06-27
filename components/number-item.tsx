import React, { ChangeEvent, useMemo } from 'react'
import { Input } from '@geist-ui/react'

export type NumberItemProps = {
  value: number
  onChange?: (value: number) => void
}

const NumberItem: React.FC<NumberItemProps> = ({ value, onChange }) => {
  const safeValue = useMemo<string>(() => {
    if (!value) return ''
    if (Number.isNaN(+value)) return ''
    return `${value}`
  }, [value])

  const ChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value
    if (Number.isNaN(+val)) return
    onChange && onChange(+val)
  }
  return (
    <>
      <Input
        value={safeValue}
        onChange={ChangeHandler}
        size="mini"
        width="100%"
        labelRight="px"
        className="number-item"
      />
      <style jsx>{`
        :global(.number-item .input-wrapper) {
          margin-right: 0 !important;
        }
      `}</style>
    </>
  )
}

export default NumberItem
