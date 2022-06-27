import React from 'react'
import { Grid, Text } from '@geist-ui/react'

const Title: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <Grid xs={24}>
      <Text h2 size={15} style={{ marginTop: '25px' }}>
        {children}
      </Text>
    </Grid>
  )
}

export default Title
