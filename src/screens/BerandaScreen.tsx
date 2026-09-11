import { Group, Stack, Text } from '@mantine/core'
import { PhoneScreen } from '~/components/PhoneScreen'
import { AISecretaryCard } from '~/components/AISecretaryCard'
import { AlertBanner } from '~/components/AlertBanner'
import { StatChip } from '~/components/StatChip'
import { SectionTitle } from '~/components/SectionTitle'
import { TaskCard } from '~/components/TaskCard'
import { MeetingCard } from '~/components/MeetingCard'
import { QuickMenu } from '~/components/QuickMenu'
import { currentUser, dashboardStats, nextMeeting, todayTasks } from '~/data/mock'
import { fullDate, greeting } from '~/lib/format'
import { semantic } from '~/theme/tokens'

/** Band 0 · Beranda — pusat harian staf (wireframe §0). */
export function BerandaScreen() {
  return (
    <PhoneScreen title="Beranda" notif withBottomNav activeNav="/beranda">
      <Stack gap="sm">
        <Stack gap={2}>
          <Text fz={28} fw={800} c={semantic.textPrimary} lh={1.15}>
            {greeting()}, {currentUser.name.split(' ')[0]}
          </Text>
          <Text fz="sm" c={semantic.textSecondary}>
            {fullDate()}
          </Text>
        </Stack>

        <AISecretaryCard
          text="Hari ini ada 3 hal penting. Yang paling mendesak: kirim laporan keuangan sebelum jam 3 sore. Sisanya bisa menyusul."
          linkLabel="Lihat rencana hari ini"
        />

        <AlertBanner
          text="1 tugas terlambat sejak kemarin: “Siapkan notulen rapat pimpinan”."
          action="Tangani sekarang"
        />

        <Group gap="sm" grow>
          <StatChip value={dashboardStats.today} label="Hari ini" />
          <StatChip value={dashboardStats.done} label="Selesai" tone="success" />
          <StatChip value={dashboardStats.late} label="Terlambat" tone="danger" />
        </Group>

        <AISecretaryCard
          text="Saran urutan kerja: mulai dari laporan keuangan, lalu telepon vendor katering, terakhir follow-up surat tugas."
          suggestions={[
            { label: 'Terima', primary: true },
            { label: 'Nanti saja' },
          ]}
        />

        <SectionTitle action="Semua" to="/tugas">
          Tugas Hari Ini
        </SectionTitle>
        <Stack gap="sm">
          {todayTasks.map((t) => (
            <TaskCard key={t.id} task={t} />
          ))}
        </Stack>

        <SectionTitle action="Agenda" to="/meeting">
          Rapat Berikutnya
        </SectionTitle>
        <MeetingCard meeting={nextMeeting} />

        <SectionTitle>Menu Cepat</SectionTitle>
        <QuickMenu />
      </Stack>
    </PhoneScreen>
  )
}
