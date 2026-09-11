import { Button, Card, Group, Progress, Stack, Tabs, Text } from '@mantine/core'
import { IconFileSpreadsheet, IconFileText, IconFileTypePdf, IconMail } from '@tabler/icons-react'
import { PhoneScreen } from '~/components/PhoneScreen'
import { SectionTitle } from '~/components/SectionTitle'
import { reportRows } from '~/data/mock'
import { semantic } from '~/theme/tokens'

/** Laporan — Pusat (wireframe §6). Multi-channel: unduh / kirim email. */
export function LaporanScreen() {
  return (
    <PhoneScreen title="Laporan" withBottomNav activeNav="/laporan">
      <Stack gap="md">
        <Tabs defaultValue="harian" color="terracotta" variant="pills">
          <Tabs.List grow>
            <Tabs.Tab value="harian">Harian</Tabs.Tab>
            <Tabs.Tab value="mingguan">Mingguan</Tabs.Tab>
            <Tabs.Tab value="anggota">Per anggota</Tabs.Tab>
          </Tabs.List>
        </Tabs>

        <SectionTitle>Ringkasan</SectionTitle>
        <Stack gap="sm">
          {reportRows.map((r) => {
            const pct = Math.round((r.done / r.total) * 100)
            return (
              <Card key={r.id} padding="md" style={{ background: semantic.bgRaised }}>
                <Group justify="space-between" mb={6}>
                  <Text fw={700} fz="md" c={semantic.textPrimary}>
                    {r.label}
                  </Text>
                  <Text fz="sm" c={semantic.textSecondary}>
                    {r.period}
                  </Text>
                </Group>
                <Progress value={pct} color="success.7" size="lg" radius="sm" aria-label={`${pct}% selesai`} />
                <Text fz="sm" c={semantic.textSecondary} mt={6}>
                  {r.done} dari {r.total} tugas selesai · {pct}%
                </Text>
              </Card>
            )
          })}
        </Stack>

        <SectionTitle>Format &amp; Ekspor</SectionTitle>
        <Group grow gap="sm">
          <Button variant="default" leftSection={<IconFileTypePdf size={20} aria-hidden />}>PDF</Button>
          <Button variant="default" leftSection={<IconFileSpreadsheet size={20} aria-hidden />}>Excel</Button>
          <Button variant="default" leftSection={<IconFileText size={20} aria-hidden />}>CSV</Button>
        </Group>
        <Button size="md" radius="md" fullWidth leftSection={<IconMail size={20} aria-hidden />}>
          Kirim laporan ke email
        </Button>
      </Stack>
    </PhoneScreen>
  )
}
