import { UserSettings, defaultSettings } from '../components/settings-context'

export const previewHost = 'https://token.im'

export const getSafeColor = (color: string): string => {
  if (!color.startsWith('#')) return `#${color}`
  return color
}

export const getColorLength = (color: string | string[] | any): number => {
  if (Array.isArray(color)) return color.length
  if (!`${color}`.includes(',')) return 1
  return `${color}`.split(',').length
}

export const colorHexPipe = (color: string): string | string[] => {
  const isArrayQueryParam = color.includes(',')
  if (!isArrayQueryParam) return getSafeColor(color)
  const colors = color.split(',')

  return colors.map(c => getSafeColor(c))
}

export const isColorKey = (key: keyof UserSettings) => {
  const defaultColorKeys: Array<keyof UserSettings> = [
    'hbg',
    'hfg',
    'lbg',
    'lfg',
    'bbg',
    'bfg',
    'sbg',
  ]
  return defaultColorKeys.includes(key)
}

export const isBooleanKey = (key: keyof UserSettings) => {
  const defaultColorKeys: Array<keyof UserSettings> = ['trans', 'title_left']
  return defaultColorKeys.includes(key)
}

export const isNumberKey = (key: keyof UserSettings) => {
  const defaultColorKeys: Array<keyof UserSettings> = ['trans_y', 'title_size']
  return defaultColorKeys.includes(key)
}

export const isStatusBarKey = (key: keyof UserSettings) => {
  return key === 'sfg'
}

const hexToRgb = (color: string): [number, number, number] => {
  const fullReg = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  const full = color.replace(fullReg, (_, r, g, b) => `${r}${r}${g}${g}${b}${b}`)
  const values = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(full)
  if (!values) {
    throw new Error(`Unsupported ${color} color.`)
  }
  return [
    Number.parseInt(values[1], 16),
    Number.parseInt(values[2], 16),
    Number.parseInt(values[3], 16),
  ]
}

export const colorToRgbValues = (color: string) => {
  if (color.charAt(0) === '#') return hexToRgb(color)

  const safeColor = color.replace(/ /g, '')
  const colorType = color.substr(0, 4)

  const regArray = safeColor.match(/\((.+)\)/)
  if (!colorType.startsWith('rgb') || !regArray) {
    throw new Error(`Only support ["RGB", "RGBA", "HEX"] color.`)
  }

  return regArray[1].split(',').map(str => Number.parseFloat(str))
}

export const getContrastingColor = (color?: string): string => {
  if (!color) return '#fff'
  if (color === 'transparent') return 'rgba(0,0,0,0.4)'
  const [r, g, b] = colorToRgbValues(color)
  const yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq >= 128 ? '#000' : '#fff'
}

export const isEqualValue = (source: any, next: any): boolean => {
  if (source === next) return true
  if (typeof next !== 'boolean' && !next) return true
  if (typeof source === 'string') {
    const sourceLower = source.toLowerCase()
    const nextLower = `${next}`.toLowerCase()
    const withoutHashTag = `${nextLower}`.replace('#', '')
    if (sourceLower === nextLower) return true
    if (sourceLower === withoutHashTag) return true
    if (sourceLower === `${withoutHashTag}${withoutHashTag}`) return true
  }
  return false
}

export const toQueryObject = (params: UserSettings = defaultSettings): Partial<UserSettings> => {
  const changeKeys = Object.keys(params).filter(key => {
    const sourceValue = defaultSettings[key]
    const nextValue = params[key]

    // Any non-true value is meaningless for this item
    if ((key as keyof UserSettings) === 'trans_y') {
      if (!nextValue) return false
    }

    const isEqual = isEqualValue(sourceValue, nextValue)
    return !isEqual
  })

  return changeKeys.reduce((pre, next) => {
    let val = params[next]
    if (isColorKey(next as keyof UserSettings)) {
      val = `${val}`.replaceAll('#', '')
    }
    if (isBooleanKey(next as keyof UserSettings)) {
      val = !!val
    }
    if (isNumberKey(next as keyof UserSettings)) {
      val = Number(val)
    }

    return {
      ...pre,
      [next]: val,
    }
  }, {})
}

export const queryToString = (query: Record<string, any> = {}): string => {
  const keys = Object.keys(query)
  if (!keys.length) return ''
  return keys.reduce((pre, nextKey) => {
    let val = query[nextKey]
    if (typeof val === 'boolean') {
      val = val ? 1 : 0
    }
    const nextItem = `${nextKey}=${val}`
    if (!pre) return nextItem
    return `${pre}&${nextItem}`
  }, '')
}

export const appendQueryToHost = (host: string = '', query: string = ''): string => {
  const encoded = encodeURIComponent(query)
  if (!query) return host
  if (host.includes('?')) {
    return `${host}&${encoded}`
  }
  return `${host}?${encoded}`
}

export const colorsToLinear = (color: string = ''): string => {
  const colors = colorHexPipe(`${color}`)
  if (!Array.isArray(colors) || colors.length === 1) return colors as string
  return `linear-gradient(to bottom, ${colors.join(',')})`
}
