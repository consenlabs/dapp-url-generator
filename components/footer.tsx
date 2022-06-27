import React from 'react'
import { Grid, Link, Text, Code } from '@geist-ui/react'

const Footer: React.FC<unknown> = () => {
  return (
    <Grid xs={24}>
      <div>
        <Text size={13} style={{ marginTop: 0 }}>
          Use URL options to give your pages a consistent user experience even before they load, for
          example, the <Code>title</Code>, the <Code>background color</Code> of the header, etc.
        </Text>
        <ul>
          <Text size={13}>
            <li>
              For all URL query parameters, you can refer to the{' '}
              <Link
                color
                target="_blank"
                href="https://imtoken.gitbook.io/developers/products/imtoken/webview/preload-url-options">
                URL Preload Documentation
              </Link>{' '}
              for more information.
            </li>
          </Text>
          <Text size={13}>
            <li>
              If you want to change any configuration after the page has loaded, please visit our{' '}
              <Link
                color
                target="_blank"
                href="https://imtoken.gitbook.io/developers/products/webview/sdk">
                WebView SDK API
              </Link>
              .
            </li>
          </Text>
          <Text size={13}>
            <li>
              If you still have questions or need help with WebView, please{' '}
              <Link
                color
                target="_blank"
                href="https://github.com/consenlabs/webview/discussions/new">
                create a discussion
              </Link>
              .
            </li>
          </Text>
          <Text size={13}>
            <li>
              If you have any bugs or features to feedback, please{' '}
              <Link color target="_blank" href="https://github.com/consenlabs/webview/issues">
                create an issue
              </Link>
              .
            </li>
          </Text>
        </ul>
      </div>
    </Grid>
  )
}

export default Footer
