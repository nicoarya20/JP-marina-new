import { Avatar, Card, Group, Stack, Text } from '@mantine/core'
import { PhoneScreen } from '~/components/PhoneScreen'
import { StatusPill } from '~/components/StatusPill'
import { personById, tasks } from '~/data/mock'
import { stateStatus } from '~/data/types'
import { relativeDue } from '~/lib/format'
import { semantic } from '~/theme/tokens'

/** P2 · Papan Bersama — semua tugas semua user, pengawasan bersama (wireframe §4). */
export function PapanBersamaScreen() {
  return (
    <PhoneScreen title="Papan Bersama" showBack showMenu={false}>
      <Stack gap="sm">
        <Text fz="md" c={semantic.textSecondary}>
          Semua tugas seluruh anggota — transparan untuk pengawasan bersama.
        </Text>
        {tasks.map((t) => {
          const s = stateStatus[t.state]
          const p = personById(t.assigneeId)
          return (
            <Card key={t.id} padding="md" style={{ background: semantic.bgRaised }}>
              <Group wrap="nowrap" align="flex-start">
                <Avatar color="terracotta" radius="xl" size="md">
                  {p.initials}
                </Avatar>
                <Stack gap={6} style={{ flex: 1 }}>
                  <Text fw={700} fz="md" c={semantic.textPrimary} lineClamp={2}>
                    {t.title}
                  </Text>
                  <Group justify="space-between">
                    <Text fz="sm" c={semantic.textSecondary}>
                      {p.name.split(' ')[0]} · {relativeDue(t.due)}
                    </Text>
                    <StatusPill
                      statusKey={s.status}
                      label={s.label}
                      icon={t.state === 'DONE' ? 'check' : 'clock'}
                    />
                  </Group>
                </Stack>
              </Group>
            </Card>
          )
        })}
      </Stack>
    </PhoneScreen>
  )
}
