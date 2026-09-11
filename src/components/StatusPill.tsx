import { Badge } from '@mantine/core'
import { IconAlertTriangle, IconCheck, IconClock, IconX } from '@tabler/icons-react'
import { status, type StatusKey } from '~/theme/tokens'

interface StatusPillProps {
  statusKey: StatusKey
  label: string
  variant?: 'soft' | 'solid'
  icon?: 'check' | 'clock' | 'warning' | 'x'
}

const icons = {
  check: IconCheck,
  clock: IconClock,
  warning: IconAlertTriangle,
  x: IconX,
}

/**
 * Pil status aksesibel: warna TIDAK pernah berdiri sendiri — selalu ikon + label
 * dan dipisah lewat lightness (PAPER.md §5.3). Lulus grayscale.
 */
export function StatusPill({ statusKey, label, variant = 'soft', icon = 'clock' }: StatusPillProps) {
  const c = status[statusKey]
  const Icon = icons[icon]
  const soft = variant === 'soft'
  return (
    <Badge
      size="lg"
      radius="sm"
      leftSection={<Icon size={16} stroke={2.5} aria-hidden />}
      styles={{
        root: {
          backgroundColor: soft ? c.soft : c.solid,
          color: soft ? c.ink : '#fff',
          textTransform: 'none',
          fontWeight: 600,
          paddingInline: 10,
          height: 30,
        },
      }}
    >
      {label}
    </Badge>
  )
}
