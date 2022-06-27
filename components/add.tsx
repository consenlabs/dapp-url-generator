import Plus from '@geist-ui/react-icons/plus'
import { Button } from '@geist-ui/react'
import React from 'react'

export type AddProps = {
  onClick: () => void
}

const Add: React.FC<AddProps> = ({ onClick }) => {
  return (
    <div className="add">
      <Button className="add-btn" icon={<Plus />} auto size="mini" onClick={onClick} />
      <style jsx>{`
        .add {
          width: auto;
          height: 100%;
          display: inline-flex;
          justify-content: center;
          align-items: center;
        }

        .add :global(.add-btn) {
          padding: 0;
          height: 25px;
          width: 28px;
        }

        .add :global(.add-btn *) {
          margin-right: 0;
        }
      `}</style>
    </div>
  )
}

export default Add
