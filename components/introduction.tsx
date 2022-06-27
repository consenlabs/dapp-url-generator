import React from 'react'
import { Link, Text } from '@geist-ui/react'

const Introduction: React.FC<unknown> = () => {
  return (
    <div className="introduction">
      <Text h2 size={18}>
        How to use
      </Text>
      <Text size={13}>
        These configuration items are the{' '}
        <Text span b>
          preloading capabilities supported by imToken WebView
        </Text>
        , you can fill in your own domain name and change them as you wish.
      </Text>
      <ul>
        <Text size={13}>
          <li>
            Use the{' '}
            <Link target="_blank" href="https://token.im/">
              <Text span i>
                imToken app
              </Text>
            </Link>{' '}
            to scan the code to see the preview.
          </li>
        </Text>
        <Text size={13}>
          <li>
            Or open this page from your mobile device and jump directly to the App for preview.
          </li>
        </Text>
      </ul>
      <style jsx>{`
        .introduction {
          padding-left: 8px;
        }
      `}</style>
    </div>
  )
}

export default Introduction
