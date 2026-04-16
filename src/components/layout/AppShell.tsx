import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function AppShell({ children }: Props) {
  return <div>AppShell — {children}</div>
}
