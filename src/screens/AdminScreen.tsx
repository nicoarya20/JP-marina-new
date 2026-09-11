import { Avatar, Badge, Card, Group, SimpleGrid, Stack, Text, UnstyledButton } from '@mantine/core'
import { Link } from '@tanstack/react-router'
import {
  IconActivity,
  IconRobot,
  IconShieldLock,
  IconUsers,
  type TablerIcon,
} from '@tabler/icons-react'
import { PhoneScreen } from '~/components/PhoneScreen'
import { AISecretaryCard } from '~/components/AISecretaryCard'
import { SectionTitle } from '~/components/SectionTitle'
import { people } from '~/data/mock'
import { roleLabel } from '~/data/rbac'
import { semantic } from '~/theme/tokens'

const tiles: { label: string; icon: TablerIcon; to: string }[] = [
  { label: 'Kelola pengguna', icon: IconUsers, to: '/admin' },
  { label: 'Peran & izin', icon: IconShieldLock, to: '/rbac' },
  { label: 'Tata kelola AI', icon: IconRobot, to: '/admin' },
  { label: 'Log aktivitas', icon: IconActivity, to: '/admin' },
]

/** Admin · Panel orkestrasi + saran Sekretaris AI (wireframe §9). */
export function AdminScreen() {
  return (
    <PhoneScreen title="Admin" notif>
      <Stack gap="md">
        <AISecretaryCard
          text="3 pengguna belum punya peran. 1 aturan pengingat nonaktif sejak pekan lalu — aktifkan kembali?"
          suggestions={[{ label: 'Tinjau', primary: true }, { label: 'Abaikan' }]}
        />

        <SectionTitle>Orkestrasi</SectionTitle>
        <SimpleGrid cols={2} spacing="sm">
          {tiles.map(({ label, icon: Icon, to }) => (
            <UnstyledButton
              key={label}
              component={Link}
              to={to}
              style={{
                background: semantic.bgRaised,
                border: `1px solid ${semantic.bgSurface}`,
                borderRadius: 14,
                padding: 14,
                minHeight: 96,
              }}
            >
              <Stack gap={8} justify="center" h="100%">
                <Icon size={28} color={semantic.accentPrimary} aria-hidden />
                <Text fw={600} fz="md" c={semantic.textPrimary}>
                  {label}
                </Text>
              </Stack>
            </UnstyledButton>
          ))}
        </SimpleGrid>

        <SectionTitle action="Semua" to="/admin">
          Pengguna
        </SectionTitle>
        <Stack gap="sm">
          {people.map((p) => (
            <Card key={p.id} padding="sm" style={{ background: semantic.bgRaised }}>
              <Group wrap="nowrap">
                <Avatar color="terracotta" radius="xl">
                  {p.initials}
                </Avatar>
                <Text fw={600} fz="md" c={semantic.textPrimary} style={{ flex: 1 }}>
                  {p.name}
                </Text>
                <Badge variant="light" color="terracotta" radius="sm" styles={{ root: { textTransform: 'none' } }}>
                  {roleLabel[p.role]}
                </Badge>
              </Group>
            </Card>
          ))}
        </Stack>
      </Stack>
    </PhoneScreen>
  )
}
