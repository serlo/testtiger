import type { Metadata } from 'next'

import 'tailwindcss/tailwind.css'
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

import '../../styles/global.css'

import { Karla } from 'next/font/google'

const karla = Karla({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-karla',
})

export const metadata: Metadata = {
  title: 'TestTiger',
  description: 'technischer Prototyp',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de" suppressHydrationWarning={true} className={karla.variable}>
      <body>{children}</body>
    </html>
  )
}
