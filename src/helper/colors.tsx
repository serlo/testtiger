import { ReactNode } from 'react'

export function Color1({ children }: { children: ReactNode }) {
  return <span className="text-blue-600">{children}</span>
}

export function Color2({ children }: { children: ReactNode }) {
  return <span className="text-green-600">{children}</span>
}

export function Color3({ children }: { children: ReactNode }) {
  return <span className="text-orange-600">{children}</span>
}

export function Color4({ children }: { children: ReactNode }) {
  return <span className="text-gray-500">{children}</span>
}
