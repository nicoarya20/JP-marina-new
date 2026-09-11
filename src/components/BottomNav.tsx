import { Stack, Text, UnstyledButton } from '@mantine/core'
import { Link } from '@tanstack/react-router'
import {
  IconCalendarEvent,
  IconChecklist,
  IconHome,
  IconReport,
  IconUser,
  type TablerIcon,
} from '@tabler/icons-react'
import { semantic } from '~/theme/tokens'

const items: { to: string; label: string; icon: TablerIcon }[] = [
  { to: '/beranda', label: 'Beranda', icon: IconHome },
  { to: '/tugas', label: 'Tugas', icon: IconChecklist },
  { to: '/laporan', label: 'Laporan', icon: IconReport },
  { to: '/meeting', label: 'Meeting', icon: IconCalendarEvent },
  { to: '/profil', label: 'Profil', icon: IconUser },
]

/** Navigasi bawah: ikon SELALU + label teks (PAPER.md §4.4), target ≥56px. */
export function BottomNav({ active }: { active?: string }) {
  return (
    <nav
      style={{
        flex: '0 0 auto',
        display: 'flex',
        background: semantic.bgRaised,
        borderTop: `1px solid ${semantic.bgSurface}`,
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      {items.map(({ to, label, icon: Icon }) => {
        const isActive = active === to
        return (
          <UnstyledButton
            key={to}
            component={Link}
            to={to}
            style={{ flex: 1, minHeight: 60, padding: 6 }}
            aria-current={isActive ? 'page' : undefined}
          >
            <Stack align="center" gap={2}>
              <Icon
                size={26}
                stroke={isActive ? 2.6 : 2}
                color={isActive ? semantic.accentPrimary : semantic.textSecondary}
                aria-hidden
              />
              <Text fz="xs" fw={isActive ? 700 : 500} c={isActive ? semantic.accentPrimary : semantic.textSecondary}>
                {label}
              </Text>
            </Stack>
          </UnstyledButton>
        )
      })}
    </nav>
  )
}
