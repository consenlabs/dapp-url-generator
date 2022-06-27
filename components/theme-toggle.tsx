import React, { useMemo } from 'react'
import { Button, useTheme } from '@geist-ui/react'
import Sun from '@geist-ui/react-icons/sun'
import Moon from '@geist-ui/react-icons/moon'

export type ThemeToggleProps = {
  onChange: (val: string) => void
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ onChange }) => {
  const theme = useTheme()
  const Icon = useMemo(() => (theme.type === 'light' ? <Moon /> : <Sun />), [theme.type])
  const clickHandler = () => {
    const next = theme.type === 'light' ? 'dark' : 'light'
    onChange(next)
    localStorage.setItem('theme', next)
  }

  return (
    <div className="theme-toggle">
      <Button auto size="small" type="abort" iconRight={Icon} onClick={clickHandler} />
      <style jsx>{`
        .theme-toggle {
          position: fixed;
          top: 10px;
          right: 10px;
          z-index: 1;
        }

        .theme-toggle :global(button) {
          padding: 0 calc(0.8 * ${theme.layout.gapHalf});
        }
      `}</style>
    </div>
  )
}

export default ThemeToggle
