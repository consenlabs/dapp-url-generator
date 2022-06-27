import { CssBaseline, GeistProvider } from '@geist-ui/react'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import ThemeToggle from '@cps/theme-toggle'
import useDomClean from '@cps/use-dom-clean'

const Application: NextPage<AppProps<unknown>> = ({ Component, pageProps }) => {
  const [theme, setTheme] = useState<string>(null)

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme')
    if (currentTheme === 'dark') {
      setTheme('dark')
    }
  }, [])
  useDomClean()

  return (
    <>
      <Head>
        <title>URL Options for imToken</title>
        <link rel="icon" type="image/png" href="/images/favicon.png" sizes="32x32" />
        <meta name="google" content="notranslate" />
        <meta name="referrer" content="strict-origin" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Deep Linking for imToken" />
        <meta
          property="og:description"
          content="Make your web pages in the imToken application a better user experience."
        />
        <meta property="og:type" content="website" />
        <meta name="generator" content="consenlabs" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="author" content="consenlabs" />
        <meta name="twitter:creator" content="@imTokenOfficial" />
        <meta property="og:title" content="URL Options for imToken" />
        <meta property="og:url" content="https://token-deeplink.vercel.app/" />
        <meta property="og:image" content="https://token-deeplink.vercel.app/images/logo.png" />
        <meta
          property="twitter:image"
          content="https://token-deeplink.vercel.app/images/logo.png"
        />
        <meta
          itemProp="image"
          property="og:image"
          content="https://token-deeplink.vercel.app/images/logo.png"
        />
        <meta
          name="viewport"
          content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <GeistProvider themeType={theme}>
        <CssBaseline />
        <Component {...pageProps} />
        <ThemeToggle onChange={val => setTheme(val)} />
      </GeistProvider>
    </>
  )
}

export default Application
