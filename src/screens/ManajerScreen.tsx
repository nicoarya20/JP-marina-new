import { Avatar, Button, Card, Group, Progress, Stack, Text } from '@mantine/core'
import { IconArrowsExchange, IconUserPlus } from '@tabler/icons-react'
import { PhoneScreen } from '~/components/PhoneScreen'
import { AlertBanner } from '~/components/AlertBanner'
import { StatChip } from '~/components/StatChip'
import { SectionTitle } from '~/components/SectionTitle'
import { people } from '~/data/mock'
import { semantic } from '~/theme/tokens'

// Beban kerja contoh per anggota (load 0–100).
const workload = [
  { id: 'u1', load: 72, active: 5 },
  { id: 'u3', load: 45, active: 3 },
  { id: 'u4', load: 90, active: 8 },
]

const loadTone = (load: number) => (load >= 85 ? 'danger.7' : load >= 60 ? 'warning.7' : 'success.7')

/** G1 · Dashboard Tim — ringkasan kinerja + beban + audit (wireframe §5). */
export function ManajerScreen() {
  return (
    <PhoneScreen title="Kelola Tim" notif>
      <Stack gap="md">
        <Group gap="sm" grow>
          <StatChip value={3} label="Anggota" />
          <StatChip value={16} label="Tugas aktif" />
          <StatChip value={2} label="Terlambat" tone="danger" />
        </Group>

        <AlertBanner
          text="Dewi Lestari kelebihan beban (90%). Sekretaris AI menyarankan alihkan 1–2 tugas."
          action="Lihat saran alih tugas"
        />

        <Group grow gap="sm">
          <Button size="md" radius="md" leftSection={<IconUserPlus size={20} aria-hidden />}>
            Tugaskan
          </Button>
          <Button size="md" radius="md" variant="default" leftSection={<IconArrowsExchange size={20} aria-hidden />}>
            Alihkan
          </Button>
        </Group>

        <SectionTitle>Beban Anggota</SectionTitle>
        <Stack gap="sm">
          {workload.map((w) => {
            const p = people.find((x) => x.id === w.id)!
            return (
              <Card key={w.id} padding="md" style={{ background: semantic.bgRaised }}>
                <Group wrap="nowrap">
                  <Avatar color="terracotta" radius="xl">
                    {p.initials}
                  </Avatar>
                  <Stack gap={4} style={{ flex: 1 }}>
                    <Group justify="space-between">
                      <Text fw={700} fz="md" c={semantic.textPrimary}>
                        {p.name}
                      </Text>
                      <Text fz="sm" fw={600} c={semantic.textSecondary}>
                        {w.active} tugas
                      </Text>
                    </Group>
                    <Progress value={w.load} color={loadTone(w.load)} size="lg" radius="sm" aria-label={`Beban ${w.load}%`} />
                  </Stack>
                </Group>
              </Card>
            )
          })}
        </Stack>
      </Stack>
    </PhoneScreen>
  )
}
