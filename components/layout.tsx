import React from 'react'
import { Page } from '@geist-ui/react'

const Layout: React.FC<unknown> = ({ children }) => {
  return (
    <Page size="small" render="effect-seo">
      <Page.Header>{/*<Header />*/}</Page.Header>
      <Page.Content>{children}</Page.Content>
    </Page>
  )
}

export default Layout
