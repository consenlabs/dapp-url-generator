import React from 'react'
import { Toggle } from '@geist-ui/react'
import { ToggleEvent } from '@geist-ui/react/dist/toggle/toggle'

export type ToggleItemProps = {
  value: boolean
  onChange?: (value: boolean) => void
}

const ToggleItem: React.FC<ToggleItemProps> = ({ value, onChange }) => {
  const ChangeHandler = (event: ToggleEvent) => {
    onChange && onChange(event.target.checked)
  }
  return <Toggle checked={value} onChange={ChangeHandler} size="small" />
}

export default ToggleItem
