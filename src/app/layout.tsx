import type { Metadata } from 'next'

import 'tailwindcss/tailwind.css'
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

import '../../styles/global.css'

import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Fux',
  description: 'technischer Prototyp',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de" suppressHydrationWarning={true} className={inter.variable}>
      <body>{children}</body>
    </html>
  )
}
