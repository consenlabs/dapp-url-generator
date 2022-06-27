import React, { useEffect, useMemo, useState } from 'react'
import FieldCard from './field-card'
import { Grid, Input } from '@geist-ui/react'
import {
  SettingsContext,
  defaultSettings,
  UserSettings,
  UserSettingsUpdater,
} from './settings-context'
import Preview from './preview'
import { previewHost, toQueryObject } from '../lib/utils'
import Title from './title'
import Introduction from './introduction'
import Footer from './footer'

const Settings: React.FC<unknown> = () => {
  const [host, setHost] = useState(previewHost)
  const [rendered, setRendered] = useState<boolean>(false)
  const [settings, setSettings] = useState<UserSettings>(defaultSettings)
  const queryObject = useMemo(() => toQueryObject(settings), [settings])
  const updateSettings: UserSettingsUpdater = (key, value) => {
    setSettings(last => ({
      ...last,
      [key]: value,
    }))
  }
  const values = useMemo(
    () => ({
      ...settings,
      updateSettings,
    }),
    [settings],
  )

  useEffect(() => {
    setRendered(true)
  }, [])

  if (!rendered) return null
  return (
    <SettingsContext.Provider value={values}>
      <div>
        <Preview query={queryObject} host={host} />
        <Grid.Container gap={1}>
          <Introduction />
          <Title>Host</Title>
          <Grid xs={24} sm={10} md={8}>
            <Input placeholder={host} onChange={e => setHost(e.target.value)} />
          </Grid>
          <Title>Header</Title>
          <FieldCard name="hbg" />
          <FieldCard name="hfg" />
          <FieldCard name="title" />
          <FieldCard name="title_left" />
          <FieldCard name="title_size" />
          <FieldCard name="trans" />
          <FieldCard name="trans_y" />
          <Title>Loading Bar</Title>
          <FieldCard name="lbg" />
          <FieldCard name="lfg" />
          <Title>Body</Title>
          <FieldCard name="bbg" />
          <FieldCard name="bfg" />
          <Title>Status Bar</Title>
          <FieldCard name="sfg" />
          <Title>About URL Options</Title>
          <Footer />
        </Grid.Container>
      </div>
    </SettingsContext.Provider>
  )
}

export default Settings
