import {
  Button,
  Card,
  Group,
  SegmentedControl,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core'
import { DateTimePicker } from '@mantine/dates'
import { IconMicrophone, IconSparkles } from '@tabler/icons-react'
import { PhoneScreen } from '~/components/PhoneScreen'
import { people } from '~/data/mock'
import { semantic } from '~/theme/tokens'

/** T3 · Buat Tugas — jalur utama bahasa natural + field terstruktur (wireframe §3, PAPER.md §7.1). */
export function BuatTugasScreen() {
  return (
    <PhoneScreen title="Buat Tugas" showBack showMenu={false}>
      <Stack gap="md">
        <Card padding="md" style={{ background: 'linear-gradient(135deg,#FBF8F1,#F2E8DD)', borderColor: semantic.accentDecorative }}>
          <Group gap="xs" mb="xs">
            <IconSparkles size={20} color={semantic.accentPrimary} aria-hidden />
            <Text fw={700} c={semantic.textPrimary}>
              Ceritakan saja
            </Text>
          </Group>
          <Textarea
            placeholder="Mis. “Ingatkan saya kirim laporan Jumat jam 3 sore”"
            autosize
            minRows={2}
            aria-label="Tulis tugas dengan bahasa sehari-hari"
          />
          <Group mt="sm" grow>
            <Button variant="light" color="terracotta" leftSection={<IconMicrophone size={20} aria-hidden />}>
              Pakai suara
            </Button>
            <Button color="terracotta">Buat dengan AI</Button>
          </Group>
        </Card>

        <Text ta="center" fz="sm" c={semantic.textSecondary}>
          atau isi rincian di bawah
        </Text>

        <TextInput label="Judul tugas" placeholder="Judul singkat" required />
        <Textarea label="Catatan" placeholder="Keterangan tambahan (opsional)" autosize minRows={2} />
        <DateTimePicker label="Tenggat" placeholder="Pilih tanggal & waktu" valueFormat="dddd, D MMM YYYY HH.mm" />

        <div>
          <Text fw={600} fz="sm" mb={6} c={semantic.textPrimary}>
            Prioritas
          </Text>
          <SegmentedControl
            fullWidth
            color="terracotta"
            defaultValue="NORMAL"
            data={[
              { label: 'Santai', value: 'LOW' },
              { label: 'Normal', value: 'NORMAL' },
              { label: 'Mendesak', value: 'URGENT' },
            ]}
          />
        </div>

        <Select label="Proyek" placeholder="Pilih proyek" defaultValue="Umum" data={['Umum', 'Keuangan', 'Administrasi', 'Rapat']} />
        <Select
          label="Tugaskan ke"
          placeholder="Pilih orang"
          data={people.map((p) => ({ value: p.id, label: p.name }))}
        />

        <Button size="lg" radius="md" fullWidth mt="xs" styles={{ root: { height: 56 } }}>
          Simpan tugas
        </Button>
      </Stack>
    </PhoneScreen>
  )
}
