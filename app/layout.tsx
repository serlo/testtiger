import type { Metadata, Viewport } from 'next'

import 'tailwindcss/tailwind.css'
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

import '@ionic/react/css/structure.css'

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
    <html lang="de" suppressHydrationWarning={true}>
      <body>{children}</body>
    </html>
  )
}
