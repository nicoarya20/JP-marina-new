import { Paper, Stack, Text } from '@mantine/core'
import { semantic, status, type StatusKey } from '~/theme/tokens'

interface StatChipProps {
  value: number | string
  label: string
  tone?: StatusKey | 'neutral'
}

/** Chip statistik: angka besar + label. Terlambat memakai tone danger. */
export function StatChip({ value, label, tone = 'neutral' }: StatChipProps) {
  const isStatus = tone !== 'neutral'
  const c = isStatus ? status[tone] : null
  return (
    <Paper
      p="sm"
      radius="md"
      style={{
        flex: 1,
        textAlign: 'center',
        background: c ? c.soft : semantic.bgRaised,
        border: `1px solid ${semantic.bgSurface}`,
      }}
    >
      <Stack gap={0} align="center">
        <Text fw={800} fz={28} lh={1.1} c={c ? c.ink : semantic.textPrimary}>
          {value}
        </Text>
        <Text fz="sm" fw={500} c={c ? c.ink : semantic.textSecondary}>
          {label}
        </Text>
      </Stack>
    </Paper>
  )
}
