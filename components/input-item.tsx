import React, { ChangeEvent } from 'react'
import { Input } from '@geist-ui/react'

export type InputItemProps = {
  value: string
  onChange?: (value: string) => void
}

const InputItem: React.FC<InputItemProps> = ({ value, onChange }) => {
  const ChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event.target.value)
  }
  return <Input value={value} onChange={ChangeHandler} size="mini" width="100%" />
}

export default InputItem
