import { Group, Text } from '@mantine/core'
import { Link } from '@tanstack/react-router'
import { semantic } from '~/theme/tokens'

/** Label seksi (H3) + aksi opsional di kanan. */
export function SectionTitle({
  children,
  action,
  to,
}: {
  children: React.ReactNode
  action?: string
  to?: string
}) {
  return (
    <Group justify="space-between" align="baseline" mt="lg" mb="xs">
      <Text fw={700} fz="lg" c={semantic.textPrimary}>
        {children}
      </Text>
      {action &&
        (to ? (
          <Text component={Link} to={to} fz="sm" fw={600} c={semantic.accentPrimary}>
            {action} →
          </Text>
        ) : (
          <Text fz="sm" fw={600} c={semantic.accentPrimary}>
            {action} →
          </Text>
        ))}
    </Group>
  )
}
