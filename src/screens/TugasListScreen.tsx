import { Box, Button, Chip, Group, Stack, TextInput } from '@mantine/core'
import { Link } from '@tanstack/react-router'
import { IconPlus, IconSearch } from '@tabler/icons-react'
import { PhoneScreen } from '~/components/PhoneScreen'
import { TaskCard } from '~/components/TaskCard'
import { tasks } from '~/data/mock'

const filters = ['Semua', 'Hari ini', 'Mendesak', 'Berjalan', 'Selesai']

/** T1 · Semua Tugas — daftar seluruh tugas + filter + tombol buat (wireframe §3). */
export function TugasListScreen() {
  return (
    <PhoneScreen title="Tugas" notif withBottomNav activeNav="/tugas">
      <Stack gap="sm">
        <TextInput
          placeholder="Cari tugas…"
          leftSection={<IconSearch size={18} aria-hidden />}
          aria-label="Cari tugas"
        />

        <Chip.Group multiple={false} defaultValue="Semua">
          <Group gap="xs" wrap="nowrap" style={{ overflowX: 'auto', paddingBottom: 4 }}>
            {filters.map((f) => (
              <Chip key={f} value={f} radius="sm" color="terracotta" size="md">
                {f}
              </Chip>
            ))}
          </Group>
        </Chip.Group>

        <Button
          component={Link}
          to="/tugas/buat"
          size="md"
          radius="md"
          fullWidth
          leftSection={<IconPlus size={20} aria-hidden />}
        >
          Buat tugas baru
        </Button>

        <Box mt="xs">
          <Stack gap="sm">
            {tasks.map((t) => (
              <TaskCard key={t.id} task={t} />
            ))}
          </Stack>
        </Box>
      </Stack>
    </PhoneScreen>
  )
}
