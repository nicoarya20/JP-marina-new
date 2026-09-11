import { Avatar, Badge, Button, Card, Group, Stack, Text } from '@mantine/core'
import { Link } from '@tanstack/react-router'
import { IconSettings } from '@tabler/icons-react'
import { PhoneScreen } from '~/components/PhoneScreen'
import { SectionTitle } from '~/components/SectionTitle'
import { StatChip } from '~/components/StatChip'
import { TaskCard } from '~/components/TaskCard'
import { currentUser, tasks } from '~/data/mock'
import { roleLabel } from '~/data/rbac'
import { semantic } from '~/theme/tokens'

const myTasks = tasks.filter((t) => t.assigneeId === currentUser.id)

/** P1 · Profil Saya — tugas milik sendiri & detail (wireframe §4). */
export function ProfilScreen() {
  return (
    <PhoneScreen title="Profil" withBottomNav activeNav="/profil">
      <Stack gap="md">
        <Card padding="lg" style={{ background: semantic.bgRaised }}>
          <Stack align="center" gap="xs">
            <Avatar size={88} radius="xl" color="terracotta">
              {currentUser.initials}
            </Avatar>
            <Text fz="xl" fw={800} c={semantic.textPrimary}>
              {currentUser.name}
            </Text>
            <Badge color="terracotta" variant="light" size="lg" radius="sm" styles={{ root: { textTransform: 'none' } }}>
              {roleLabel[currentUser.role]}
            </Badge>
          </Stack>
        </Card>

        <Group gap="sm" grow>
          <StatChip value={myTasks.length} label="Tugas saya" />
          <StatChip value={myTasks.filter((t) => t.state === 'DONE').length} label="Selesai" tone="success" />
          <StatChip value={myTasks.filter((t) => t.state !== 'DONE').length} label="Berjalan" />
        </Group>

        <Button
          component={Link}
          to="/pengaturan"
          variant="default"
          size="md"
          radius="md"
          fullWidth
          leftSection={<IconSettings size={20} aria-hidden />}
        >
          Pengaturan
        </Button>

        <SectionTitle>Tugas Saya</SectionTitle>
        <Stack gap="sm">
          {myTasks.map((t) => (
            <TaskCard key={t.id} task={t} />
          ))}
        </Stack>
      </Stack>
    </PhoneScreen>
  )
}
