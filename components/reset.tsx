import React, { useState } from 'react'
import RefreshCw from '@geist-ui/react-icons/refreshCw'

export type ResetProps = {
  onClick: () => void
  color: string
}

const Reset: React.FC<ResetProps> = ({ onClick, color }) => {
  const [touch, setTouch] = useState<boolean>(false)
  const clickHandler = () => {
    onClick()
  }
  return (
    <div
      className={`reset ${touch ? 'active' : ''}`}
      onClick={clickHandler}
      onMouseUp={() => setTouch(false)}
      onMouseDown={() => setTouch(true)}>
      <RefreshCw size={13} />
      <style jsx>{`
        .reset {
          position: absolute;
          right: 10px;
          top: 5px;
          cursor: pointer;
          user-select: none;
          color: ${color};
          transition: opacity, transform 200ms ease-in-out;
        }

        .reset:hover {
          opacity: 0.7;
        }

        .reset.active {
          transform: scale(0.9);
        }
      `}</style>
    </div>
  )
}

export default Reset
