import { SimpleGrid, Stack, Text, UnstyledButton } from '@mantine/core'
import { Link } from '@tanstack/react-router'
import {
  IconCalendarEvent,
  IconChecklist,
  IconLayoutGrid,
  IconReport,
  IconSettings,
  IconUser,
  type TablerIcon,
} from '@tabler/icons-react'
import { semantic } from '~/theme/tokens'

const shortcuts: { to: string; label: string; icon: TablerIcon }[] = [
  { to: '/tugas', label: 'Tugas', icon: IconChecklist },
  { to: '/laporan', label: 'Laporan', icon: IconReport },
  { to: '/meeting', label: 'Meeting', icon: IconCalendarEvent },
  { to: '/papan', label: 'Papan Bersama', icon: IconLayoutGrid },
  { to: '/pengaturan', label: 'Pengaturan', icon: IconSettings },
  { to: '/profil', label: 'Profil', icon: IconUser },
]

/** Grid pintasan: ikon + label, target besar. */
export function QuickMenu() {
  return (
    <SimpleGrid cols={3} spacing="sm">
      {shortcuts.map(({ to, label, icon: Icon }) => (
        <UnstyledButton
          key={to}
          component={Link}
          to={to}
          style={{
            background: semantic.bgRaised,
            border: `1px solid ${semantic.bgSurface}`,
            borderRadius: 14,
            padding: 12,
            minHeight: 88,
          }}
        >
          <Stack align="center" gap={6} justify="center" h="100%">
            <Icon size={30} color={semantic.accentPrimary} stroke={2} aria-hidden />
            <Text fz="sm" fw={600} ta="center" c={semantic.textPrimary} lineClamp={2}>
              {label}
            </Text>
          </Stack>
        </UnstyledButton>
      ))}
    </SimpleGrid>
  )
}
