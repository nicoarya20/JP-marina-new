import type { ReactNode } from 'react'
import { Box, ScrollArea } from '@mantine/core'
import { AppBar } from './AppBar'
import { BottomNav } from './BottomNav'
import { semantic } from '~/theme/tokens'

interface PhoneScreenProps {
  title: string
  children: ReactNode
  activeNav?: string
  showBack?: boolean
  showMenu?: boolean
  showAvatar?: boolean
  notif?: boolean
  withBottomNav?: boolean
  bare?: boolean // tanpa app bar (mis. splash/login)
}

/** Bingkai layar ponsel: app bar atas (sticky) · konten bergulir · navigasi bawah opsional. */
export function PhoneScreen({
  title,
  children,
  activeNav,
  showBack,
  showMenu,
  showAvatar,
  notif,
  withBottomNav = false,
  bare = false,
}: PhoneScreenProps) {
  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: semantic.bgBase,
      }}
    >
      {!bare && (
        <AppBar
          title={title}
          showBack={showBack}
          showMenu={showMenu}
          showAvatar={showAvatar}
          notif={notif}
        />
      )}
      <ScrollArea style={{ flex: 1 }} type="scroll" scrollbarSize={8}>
        <Box p="md" pb="xl">
          {children}
        </Box>
      </ScrollArea>
      {withBottomNav && <BottomNav active={activeNav} />}
    </Box>
  )
}
