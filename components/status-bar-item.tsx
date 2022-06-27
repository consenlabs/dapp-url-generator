import React, { useMemo } from 'react'
import { Select } from '@geist-ui/react'

export type StatusBarItemProps = {
  value: number
  onChange?: (value: number) => void
}

const StatusBarItem: React.FC<StatusBarItemProps> = ({ value, onChange }) => {
  const safeValue = useMemo<string>(() => {
    if (!value) return '0'
    if (Number.isNaN(+value)) return '0'
    return `${value}`
  }, [value])

  const changeHandler = (val: string) => {
    if (Number.isNaN(+val)) return
    onChange && onChange(+val)
  }
  return (
    <>
      <Select
        placeholder="Frameworks"
        className="status-bar-item"
        size="small"
        pure
        onChange={changeHandler}
        value={safeValue}>
        <Select.Option value="0">Default</Select.Option>
        <Select.Option divider />
        <Select.Option value="1">Light Text</Select.Option>
        <Select.Option value="2">Dark Text</Select.Option>
      </Select>
      <style jsx>{`
        :global(.status-bar-item .value) {
          margin-right: 0 !important;
        }
      `}</style>
    </>
  )
}

export default StatusBarItem
