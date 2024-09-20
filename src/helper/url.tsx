import { Capacitor } from '@capacitor/core'
export function Url(path: string) {
  const apiOrigin = process.env.NEXT_PUBLIC_API_ORIGIN || ''

  let origin = Capacitor.isNativePlatform() ? apiOrigin : ''
  return origin + '/' + path
}
