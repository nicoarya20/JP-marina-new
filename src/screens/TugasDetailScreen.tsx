import {
  Avatar,
  Button,
  Card,
  Checkbox,
  Divider,
  Group,
  RingProgress,
  Stack,
  Text,
} from '@mantine/core'
import {
  IconCalendar,
  IconCheck,
  IconClock,
  IconFile,
  IconPencil,
  IconUser,
} from '@tabler/icons-react'
import { PhoneScreen } from '~/components/PhoneScreen'
import { StatusPill } from '~/components/StatusPill'
import { personById, tasks } from '~/data/mock'
import { priorityLabel, stateStatus } from '~/data/types'
import { relativeDue } from '~/lib/format'
import { semantic } from '~/theme/tokens'

const task = tasks[0]!

/** T2 · Detail Tugas — subtask, checklist, assign, lampiran (wireframe §3). */
export function TugasDetailScreen() {
  const s = stateStatus[task.state]
  const assignee = personById(task.assigneeId)
  const checklist = task.checklist ?? []
  const doneCount = checklist.filter((c) => c.done).length
  const pct = checklist.length ? Math.round((doneCount / checklist.length) * 100) : 0

  return (
    <PhoneScreen title="Detail Tugas" showBack showMenu={false}>
      <Stack gap="md">
        <Stack gap="sm">
          <Text fz={24} fw={800} c={semantic.textPrimary}>
            {task.title}
          </Text>
          <Group gap="xs">
            <StatusPill statusKey={s.status} label={s.label} />
            <StatusPill statusKey="danger" label={priorityLabel[task.priority]} variant="solid" icon="warning" />
          </Group>
          {task.note && (
            <Text fz="md" c={semantic.textSecondary}>
              {task.note}
            </Text>
          )}
        </Stack>

        <Card padding="md" style={{ background: semantic.bgRaised }}>
          <Stack gap="sm">
            <InfoRow icon={<IconCalendar size={18} aria-hidden />} label="Tenggat" value={relativeDue(task.due)} />
            <InfoRow icon={<IconUser size={18} aria-hidden />} label="Penanggung jawab" value={assignee.name} />
            <InfoRow icon={<IconFile size={18} aria-hidden />} label="Proyek" value={task.project} />
          </Stack>
        </Card>

        {checklist.length > 0 && (
          <Card padding="md" style={{ background: semantic.bgRaised }}>
            <Group justify="space-between" mb="xs">
              <Text fw={700} fz="lg" c={semantic.textPrimary}>
                Checklist
              </Text>
              <RingProgress
                size={54}
                thickness={6}
                roundCaps
                sections={[{ value: pct, color: 'success.7' }]}
                label={
                  <Text ta="center" fz="xs" fw={700}>
                    {doneCount}/{checklist.length}
                  </Text>
                }
              />
            </Group>
            <Stack gap="sm">
              {checklist.map((c) => (
                <Checkbox
                  key={c.id}
                  defaultChecked={c.done}
                  label={c.label}
                  size="md"
                  color="success.7"
                  styles={{ label: { fontSize: 17, paddingInlineStart: 10 } }}
                />
              ))}
            </Stack>
          </Card>
        )}

        <Card padding="md" style={{ background: semantic.bgRaised }}>
          <Group justify="space-between">
            <Text fw={700} fz="lg" c={semantic.textPrimary}>
              Kolaborator
            </Text>
            <Avatar.Group>
              <Avatar color="terracotta" radius="xl">BS</Avatar>
              <Avatar color="espresso" radius="xl">SW</Avatar>
              <Avatar color="success" radius="xl">DL</Avatar>
            </Avatar.Group>
          </Group>
          <Divider my="sm" />
          <Group gap="xs">
            <IconFile size={18} color={semantic.textSecondary} aria-hidden />
            <Text fz="sm" c={semantic.textSecondary}>
              {task.attachments ?? 0} lampiran berkas
            </Text>
          </Group>
        </Card>

        <Group grow gap="sm">
          <Button size="md" radius="md" color="success.7" leftSection={<IconCheck size={20} aria-hidden />}>
            Selesai
          </Button>
          <Button size="md" radius="md" variant="default" leftSection={<IconClock size={20} aria-hidden />}>
            Tunda
          </Button>
        </Group>
        <Button
          size="md"
          radius="md"
          variant="light"
          color="terracotta"
          fullWidth
          leftSection={<IconPencil size={20} aria-hidden />}
        >
          Ubah tugas
        </Button>
      </Stack>
    </PhoneScreen>
  )
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <Group justify="space-between" wrap="nowrap">
      <Group gap="xs" wrap="nowrap">
        <span style={{ color: semantic.textSecondary, display: 'flex' }}>{icon}</span>
        <Text fz="sm" c={semantic.textSecondary}>
          {label}
        </Text>
      </Group>
      <Text fz="md" fw={600} c={semantic.textPrimary} ta="right">
        {value}
      </Text>
    </Group>
  )
}