import { Card, Group, Stack, Table, Text } from '@mantine/core'
import { PhoneScreen } from '~/components/PhoneScreen'
import { SectionTitle } from '~/components/SectionTitle'
import { accessLabel, capabilities, roleLabel, roleOrder, type Access } from '~/data/rbac'
import { semantic, status } from '~/theme/tokens'

// Warna sel mengikuti lightness + tetap ada teks (bukan warna sendiri).
const cellStyle: Record<Access, { bg: string; fg: string }> = {
  full: { bg: status.success.soft, fg: status.success.ink },
  own: { bg: status.warning.soft, fg: status.warning.ink },
  join: { bg: status.warning.soft, fg: status.warning.ink },
  view: { bg: semantic.bgSurface, fg: semantic.textSecondary },
  none: { bg: 'transparent', fg: semantic.textSecondary },
}

const legend: { a: Access; desc: string }[] = [
  { a: 'full', desc: 'penuh' },
  { a: 'own', desc: 'hanya milik sendiri' },
  { a: 'join', desc: 'ikut serta/hadir' },
  { a: 'view', desc: 'hanya baca' },
  { a: 'none', desc: 'tidak ada' },
]

/** Flow 5 · Matriks RBAC — 9 kemampuan × 4 peran (wireframe §11). */
export function RbacScreen() {
  return (
    <PhoneScreen title="Peran & Izin" showBack showMenu={false}>
      <Stack gap="md">
        <Text fz="md" c={semantic.textSecondary}>
          Hak akses tiap peran. Warna dibantu label agar tetap terbaca (uji grayscale).
        </Text>

        <Card padding="sm" style={{ background: semantic.bgRaised }}>
          <Stack gap={6}>
            {legend.map((l) => (
              <Group key={l.a} gap="xs">
                <Text fw={700} w={64} c={cellStyle[l.a].fg}>
                  {accessLabel[l.a]}
                </Text>
                <Text fz="sm" c={semantic.textSecondary}>
                  {l.desc}
                </Text>
              </Group>
            ))}
          </Stack>
        </Card>

        <SectionTitle>Matriks</SectionTitle>
        <div style={{ overflowX: 'auto' }}>
          <Table withTableBorder withColumnBorders striped stickyHeader verticalSpacing="xs" miw={560}>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Kemampuan</Table.Th>
                {roleOrder.map((r) => (
                  <Table.Th key={r} style={{ textAlign: 'center' }}>
                    {roleLabel[r]}
                  </Table.Th>
                ))}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {capabilities.map((cap) => (
                <Table.Tr key={cap.label}>
                  <Table.Td>
                    <Text fz="sm" fw={600} c={semantic.textPrimary}>
                      {cap.label}
                    </Text>
                  </Table.Td>
                  {roleOrder.map((r) => {
                    const a = cap.grants[r]
                    const c = cellStyle[a]
                    return (
                      <Table.Td key={r} style={{ background: c.bg, textAlign: 'center' }}>
                        <Text fz="sm" fw={700} c={c.fg}>
                          {accessLabel[a]}
                        </Text>
                      </Table.Td>
                    )
                  })}
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </div>
      </Stack>
    </PhoneScreen>
  )
}
