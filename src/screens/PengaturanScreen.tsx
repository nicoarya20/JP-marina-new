import { useState } from 'react'
import { Button, Card, Divider, Group, SegmentedControl, Stack, Switch, Text } from '@mantine/core'
import { IconLogout } from '@tabler/icons-react'
import { PhoneScreen } from '~/components/PhoneScreen'
import { SectionTitle } from '~/components/SectionTitle'
import type { FontScaleKey } from '~/theme/tokens'
import { semantic } from '~/theme/tokens'

/** §8 · Pengaturan — akun, notifikasi, aksesibilitas, keluar (wireframe §8). */
export function PengaturanScreen() {
  const [scale, setScale] = useState<FontScaleKey>('a')
  const [reducedMotion, setReducedMotion] = useState(false)

  // Terapkan langsung ke <html> agar seluruh UI ikut (PAPER.md §6.3, §11.5).
  const applyScale = (v: string) => {
    setScale(v as FontScaleKey)
    document.documentElement.dataset.fontScale = v
  }
  const applyMotion = (on: boolean) => {
    setReducedMotion(on)
    document.documentElement.dataset.reducedMotion = String(on)
  }

  return (
    <PhoneScreen title="Pengaturan">
      <Stack gap="md">
        <SectionTitle>Notifikasi</SectionTitle>
        <Card padding="md" style={{ background: semantic.bgRaised }}>
          <Stack gap="sm">
            <Toggle label="Dalam aplikasi" defaultChecked />
            <Divider />
            <Toggle label="Email" defaultChecked />
            <Divider />
            <Toggle label="Telegram" />
            <Divider />
            <Toggle label="Jam tenang (22.00–06.00)" defaultChecked />
          </Stack>
        </Card>

        <SectionTitle>Aksesibilitas</SectionTitle>
        <Card padding="md" style={{ background: semantic.bgRaised }}>
          <Stack gap="md">
            <div>
              <Text fw={600} fz="md" mb={8} c={semantic.textPrimary}>
                Ukuran teks
              </Text>
              <SegmentedControl
                fullWidth
                color="terracotta"
                value={scale}
                onChange={applyScale}
                data={[
                  { label: 'A', value: 'a' },
                  { label: 'A+', value: 'aa' },
                  { label: 'A++', value: 'aaa' },
                ]}
              />
            </div>
            <Divider />
            <Toggle label="Kontras tinggi" />
            <Divider />
            <Group justify="space-between" wrap="nowrap">
              <Text fz="md" c={semantic.textPrimary}>
                Kurangi animasi
              </Text>
              <Switch size="lg" color="terracotta" checked={reducedMotion} onChange={(e) => applyMotion(e.currentTarget.checked)} />
            </Group>
            <Divider />
            <Toggle label="Optimalkan untuk pembaca layar" />
          </Stack>
        </Card>

        <Button
          size="md"
          radius="md"
          fullWidth
          mt="md"
          variant="light"
          color="danger"
          leftSection={<IconLogout size={20} aria-hidden />}
        >
          Keluar
        </Button>
      </Stack>
    </PhoneScreen>
  )
}

function Toggle({ label, defaultChecked }: { label: string; defaultChecked?: boolean }) {
  return (
    <Group justify="space-between" wrap="nowrap">
      <Text fz="md" c={semantic.textPrimary}>
        {label}
      </Text>
      <Switch size="lg" color="terracotta" defaultChecked={defaultChecked} />
    </Group>
  )
}
