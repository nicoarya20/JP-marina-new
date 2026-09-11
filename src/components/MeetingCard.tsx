import { Card, Group, Stack, Text, ThemeIcon } from '@mantine/core'
import { IconClock, IconMapPin, IconUsers } from '@tabler/icons-react'
import type { Meeting } from '~/data/types'
import { dayTime } from '~/lib/format'
import { semantic } from '~/theme/tokens'

/** Kartu rapat: waktu, ruang, jumlah peserta — glanceable. */
export function MeetingCard({ meeting }: { meeting: Meeting }) {
  return (
    <Card padding="md" style={{ background: semantic.bgRaised }}>
      <Group wrap="nowrap" align="flex-start">
        <ThemeIcon size={46} radius="md" color="terracotta" variant="light">
          <IconClock size={24} aria-hidden />
        </ThemeIcon>
        <Stack gap={4} style={{ flex: 1 }}>
          <Text fw={700} fz="md" c={semantic.textPrimary}>
            {meeting.title}
          </Text>
          <Text fz="sm" c={semantic.textSecondary}>
            {dayTime(meeting.start)}
          </Text>
          <Group gap="lg">
            <Group gap={4}>
              <IconMapPin size={16} color={semantic.textSecondary} aria-hidden />
              <Text fz="sm" c={semantic.textSecondary}>
                {meeting.room}
              </Text>
            </Group>
            <Group gap={4}>
              <IconUsers size={16} color={semantic.textSecondary} aria-hidden />
              <Text fz="sm" c={semantic.textSecondary}>
                {meeting.participants} peserta
              </Text>
            </Group>
          </Group>
        </Stack>
      </Group>
    </Card>
  )
}
