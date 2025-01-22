import type { Metadata } from 'next'

import 'tailwindcss/tailwind.css'
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

import '../../styles/global.css'

import { Lato } from 'next/font/google'
import clsx from 'clsx'

const lato = Lato({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'],
  variable: '--font-lato',
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
    <html
      lang="de"
      suppressHydrationWarning={true}
      className={clsx(lato.variable)}
    >
      <body>{children}</body>
    </html>
  )
}
