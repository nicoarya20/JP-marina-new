import { ActionIcon, Avatar, Group, Indicator, Text } from '@mantine/core'
import { IconChevronLeft, IconMenu2 } from '@tabler/icons-react'
import { semantic } from '~/theme/tokens'

interface AppBarProps {
  title: string
  showBack?: boolean
  showMenu?: boolean
  showAvatar?: boolean
  notif?: boolean
  initials?: string
}

/** App bar konsisten: posisi tombol tetap agar pola mudah dipelajari (PAPER.md §4.4). */
export function AppBar({
  title,
  showBack = false,
  showMenu = true,
  showAvatar = true,
  notif = false,
  initials = 'BS',
}: AppBarProps) {
  return (
    <Group
      justify="space-between"
      wrap="nowrap"
      px="md"
      style={{
        height: 64,
        flex: '0 0 auto',
        background: semantic.bgRaised,
        borderBottom: `1px solid ${semantic.bgSurface}`,
      }}
    >
      <Group gap="xs" wrap="nowrap">
        {showBack ? (
          <ActionIcon variant="subtle" color="espresso" aria-label="Kembali" size="lg">
            <IconChevronLeft />
          </ActionIcon>
        ) : showMenu ? (
          <ActionIcon variant="subtle" color="espresso" aria-label="Menu" size="lg">
            <IconMenu2 />
          </ActionIcon>
        ) : null}
        <Text fw={700} fz="xl" c={semantic.textPrimary} lineClamp={1}>
          {title}
        </Text>
      </Group>
      {showAvatar && (
        <Indicator color="danger.7" size={12} offset={4} disabled={!notif} withBorder>
          <Avatar color="terracotta" radius="xl">
            {initials}
          </Avatar>
        </Indicator>
      )}
    </Group>
  )
}
