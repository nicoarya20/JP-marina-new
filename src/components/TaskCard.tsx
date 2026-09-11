import { Badge, Card, Group, Stack, Text } from '@mantine/core'
import { Link } from '@tanstack/react-router'
import { IconCalendar, IconPaperclip, IconUser } from '@tabler/icons-react'
import { StatusPill } from './StatusPill'
import { personById } from '~/data/mock'
import { priorityLabel, stateStatus, type Task } from '~/data/types'
import { relativeDue } from '~/lib/format'
import { semantic, status } from '~/theme/tokens'

/** Kartu tugas glanceable: judul besar, meta jelas, status = warna+ikon+label. */
export function TaskCard({ task, to = '/tugas/detail' }: { task: Task; to?: string }) {
  const s = stateStatus[task.state]
  const assignee = personById(task.assigneeId)
  const urgent = task.priority === 'URGENT'
  const overdue = new Date(task.due) < new Date() && task.state !== 'DONE'

  return (
    <Card
      component={Link}
      to={to}
      padding="md"
      style={{ background: semantic.bgRaised, cursor: 'pointer' }}
    >
      <Stack gap="xs">
        <Group justify="space-between" wrap="nowrap" align="flex-start">
          <Text fw={700} fz="md" c={semantic.textPrimary} lineClamp={2} style={{ flex: 1 }}>
            {task.title}
          </Text>
          {urgent && (
            <Badge color="danger.7" variant="filled" radius="sm" styles={{ root: { textTransform: 'none' } }}>
              {priorityLabel.URGENT}
            </Badge>
          )}
        </Group>

        <Group gap="lg" wrap="wrap">
          <Meta icon={<IconCalendar size={16} aria-hidden />} text={relativeDue(task.due)} danger={overdue} />
          <Meta icon={<IconUser size={16} aria-hidden />} text={assignee.name.split(' ')[0]!} />
          {task.attachments ? (
            <Meta icon={<IconPaperclip size={16} aria-hidden />} text={`${task.attachments} berkas`} />
          ) : null}
        </Group>

        <Group justify="space-between">
          <StatusPill
            statusKey={s.status}
            label={s.label}
            icon={task.state === 'DONE' ? 'check' : task.state === 'REOPENED' ? 'warning' : 'clock'}
          />
          <Text fz="sm" c={semantic.textSecondary}>
            {task.project}
          </Text>
        </Group>
      </Stack>
    </Card>
  )
}

function Meta({ icon, text, danger }: { icon: React.ReactNode; text: string; danger?: boolean }) {
  return (
    <Group gap={4} wrap="nowrap">
      <span style={{ color: danger ? status.danger.ink : semantic.textSecondary, display: 'flex' }}>{icon}</span>
      <Text fz="sm" fw={danger ? 700 : 400} c={danger ? status.danger.ink : semantic.textSecondary}>
        {text}
      </Text>
    </Group>
  )
}
