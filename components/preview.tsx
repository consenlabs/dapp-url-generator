import React, { useMemo } from 'react'
import QRCode from 'qrcode.react'
import { Grid, Snippet, useTheme, Link, useMediaQuery } from '@geist-ui/react'
import { UserSettings } from './settings-context'
import { appendQueryToHost, queryToString } from '../lib/utils'

export type PreviewProps = {
  query: Partial<UserSettings>
  host: string
}

const Preview: React.FC<PreviewProps> = ({ query, host }) => {
  const theme = useTheme()
  const downXS = useMediaQuery('xs', { match: 'down' })
  const queryString = useMemo(() => queryToString(query), [query])
  const url = useMemo(() => appendQueryToHost(host, queryString), [queryString, host])

  return (
    <div className="preview">
      <Grid.Container justify="center" alignItems="center">
        <Grid xs={24} sm={10} direction="column" justify="center" alignItems="center">
          <div className="qrcode">
            <QRCode
              value={url}
              size={145}
              bgColor={theme.palette.background}
              fgColor={theme.palette.foreground}
            />
            <img
              src="/images/qrBottomLeft@2x.png"
              alt="qrcode"
              className="corners bl"
              draggable={false}
            />
            <img
              src="/images/qrBottomRight@2x.png"
              alt="qrcode"
              className="corners br"
              draggable={false}
            />
            <img
              src="/images/qrTopLeft@2x.png"
              alt="qrcode"
              className="corners tl"
              draggable={false}
            />
            <img
              src="/images/qrTopRight@2x.png"
              alt="qrcode"
              className="corners tr"
              draggable={false}
            />
          </div>
          {downXS && (
            <Link className="deeplink" block href={`imtokenv2://navigate/DappView?url=${url}`}>
              Click DeepLink to open in imToken
            </Link>
          )}
          <Snippet symbol="" type="lite" text={url} />
        </Grid>
      </Grid.Container>
      <style jsx>{`
        .preview {
          height: 400px;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .preview :global(.deeplink) {
          background-color: rgba(0, 112, 243, 0.1);
          color: #3291ff;
          margin-bottom: 20px;
        }
        .qrcode {
          width: 220px;
          height: 210px;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 20px;
        }
        .corners {
          position: absolute;
          z-index: 1;
          transform: scale(0.5);
          user-select: none;
        }
        .bl {
          bottom: 0;
          left: 0;
        }
        .br {
          bottom: 0;
          right: 0;
        }
        .tl {
          top: 0;
          left: 0;
        }
        .tr {
          top: 0;
          right: 0;
        }
      `}</style>
    </div>
  )
}

export default Preview
