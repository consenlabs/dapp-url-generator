import { createContext, useContext } from 'react'

export type UserSettings = {
  hbg?: string
  hfg?: string
  title?: string
  title_left?: boolean
  title_size?: number
  trans?: boolean
  trans_y?: number | null
  lbg?: string
  lfg?: string
  bbg?: string
  bfg?: string
  sbg?: string
  sfg?: number
}

export type UserSettingsUpdater = <T extends keyof UserSettings = keyof UserSettings>(
  key: T,
  value: UserSettings[T],
) => void

export const defaultSettings: Required<UserSettings> = {
  hbg: 'FFFFFF',
  hfg: '191C1E',
  title: '',
  title_left: false,
  title_size: 17,
  trans: false,
  trans_y: null,
  lbg: 'C8E5F8',
  lfg: '419FFF',
  bbg: 'FFFFFF',
  bfg: 'EAECF6',
  sbg: 'FFFFFF',
  sfg: 0,
}

export const defaultNames: Record<keyof Required<UserSettings>, string> = {
  hbg: 'Background',
  hfg: 'Foreground',
  title: 'Title',
  title_left: 'Title Left',
  title_size: 'Title Size',
  trans: 'Transparent',
  trans_y: 'Offset Distance',
  lbg: 'Background',
  lfg: 'Foreground',
  bbg: 'Background',
  bfg: 'Foreground',
  sbg: 'Background',
  sfg: 'Text Style',
}

export const defaultDescription: Record<keyof Required<UserSettings>, string> = {
  hbg: 'Background color of the header.',
  hfg: 'Primary color of the head.',
  title: 'Title displayed when the page is not loaded.',
  title_left: 'Use the style of the left header text.',
  title_size: ' Size of title text.',
  trans: 'Set the header to transparent hover mode.',
  trans_y: 'Cancel transparent mode after scrolling.',
  lbg: 'Background color of progress loading bar.',
  lfg: 'Body color of progress loading bar.',
  bbg: 'Background color of the body when the page is not loaded.',
  bfg: 'Primary color of the body when the page is not loaded.',
  sbg: 'Background color of the status bar at the top.',
  sfg: 'Primary style of the status bar at the top.',
}

export const defaultUserTypes: Record<keyof Required<UserSettings>, string> = {
  hbg: 'hex',
  hfg: 'hex',
  title: 'string',
  title_left: 'boolean',
  title_size: 'number',
  trans: 'boolean',
  trans_y: 'number',
  lbg: 'hex',
  lfg: 'hex',
  bbg: 'hex',
  bfg: 'hex',
  sbg: 'hex',
  sfg: 'select',
}

export type SettingsContextType = UserSettings & {
  updateSettings: UserSettingsUpdater
}

export const SettingsContext = createContext<SettingsContextType>({
  ...defaultSettings,
  updateSettings: () => {},
})
export const useSettingsContext = () => useContext<SettingsContextType>(SettingsContext)
