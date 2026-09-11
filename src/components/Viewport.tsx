import type { ReactNode } from 'react'

/** Mengisi tinggi layar penuh agar PhoneScreen (app bar · scroll · nav) menata dengan benar. */
export function Viewport({ children }: { children: ReactNode }) {
  return <div style={{ height: '100dvh', overflow: 'hidden' }}>{children}</div>
}
