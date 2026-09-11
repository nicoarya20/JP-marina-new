import { Button, Group, Stack, Text } from '@mantine/core'
import { IconAlertTriangle } from '@tabler/icons-react'
import { status } from '~/theme/tokens'

/** Banner peringatan amber (soft tint) + aksi. Kondisional: hanya tampil bila ada anomali. */
export function AlertBanner({ text, action }: { text: string; action?: string }) {
  const c = status.warning
  return (
    <Stack
      gap="xs"
      p="md"
      style={{ background: c.soft, borderRadius: 14, border: `1px solid ${c.ink}33` }}
      role="status"
    >
      <Group gap="xs" wrap="nowrap" align="flex-start">
        <IconAlertTriangle size={22} color={c.ink} stroke={2.2} aria-hidden />
        <Text fz="md" fw={600} c={c.ink} style={{ flex: 1 }}>
          {text}
        </Text>
      </Group>
      {action && (
        <Button
          variant="filled"
          radius="md"
          styles={{ root: { background: c.solid, color: '#fff', alignSelf: 'flex-start' } }}
        >
          {action}
        </Button>
      )}
    </Stack>
  )
}
