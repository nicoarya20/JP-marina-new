import { Button, Card, Group, Stack, Text } from '@mantine/core'
import { IconSparkles } from '@tabler/icons-react'
import { semantic } from '~/theme/tokens'

interface AISecretaryCardProps {
  text: string
  linkLabel?: string
  suggestions?: { label: string; primary?: boolean }[]
}

/** Kartu Sekretaris AI: narasi hangat + tombol besar sebagai jalur alternatif chat (PAPER.md §7.3, §11.2). */
export function AISecretaryCard({ text, linkLabel, suggestions }: AISecretaryCardProps) {
  return (
    <Card
      padding="md"
      style={{
        background: 'linear-gradient(135deg, #FBF8F1 0%, #F2E8DD 100%)',
        borderColor: semantic.accentDecorative,
      }}
    >
      <Stack gap="sm">
        <Group gap="xs" wrap="nowrap" align="flex-start">
          <IconSparkles size={24} color={semantic.accentPrimary} stroke={2} aria-hidden />
          <Text fz="md" c={semantic.textPrimary} style={{ flex: 1 }}>
            {text}
          </Text>
        </Group>
        {linkLabel && (
          <Text fz="sm" fw={600} c={semantic.accentPrimary}>
            {linkLabel} →
          </Text>
        )}
        {suggestions && (
          <Group gap="xs">
            {suggestions.map((s) => (
              <Button
                key={s.label}
                variant={s.primary ? 'filled' : 'default'}
                color="terracotta"
                radius="md"
              >
                {s.label}
              </Button>
            ))}
          </Group>
        )}
      </Stack>
    </Card>
  )
}
