import type { ReactNode } from 'react'
import { Anchor, Box, Container, Group, Stack, Text, Title } from '@mantine/core'
import { Link } from '@tanstack/react-router'
import { semantic } from '~/theme/tokens'
import { BerandaScreen } from './BerandaScreen'
import { MasukScreen } from './MasukScreen'
import { TugasListScreen } from './TugasListScreen'
import { TugasDetailScreen } from './TugasDetailScreen'
import { BuatTugasScreen } from './BuatTugasScreen'
import { LaporanScreen } from './LaporanScreen'
import { ManajerScreen } from './ManajerScreen'
import { AdminScreen } from './AdminScreen'
import { MeetingScreen } from './MeetingScreen'
import { PengaturanScreen } from './PengaturanScreen'
import { ProfilScreen } from './ProfilScreen'
import { PapanBersamaScreen } from './PapanBersamaScreen'
import { RbacScreen } from './RbacScreen'

interface Item {
  label: string
  to: string
  el: ReactNode
}
interface Band {
  title: string
  note?: string
  items: Item[]
}

const bands: Band[] = [
  { title: '0 · Beranda', note: 'Dashboard staf', items: [{ label: 'Beranda', to: '/beranda', el: <BerandaScreen /> }] },
  { title: '1 · Autentikasi', items: [{ label: 'Masuk', to: '/masuk', el: <MasukScreen /> }] },
  {
    title: '3 · Tugas',
    items: [
      { label: 'Semua Tugas', to: '/tugas', el: <TugasListScreen /> },
      { label: 'Detail Tugas', to: '/tugas/detail', el: <TugasDetailScreen /> },
      { label: 'Buat Tugas', to: '/tugas/buat', el: <BuatTugasScreen /> },
    ],
  },
  {
    title: '4 · Profil & Papan',
    items: [
      { label: 'Profil Saya', to: '/profil', el: <ProfilScreen /> },
      { label: 'Papan Bersama', to: '/papan', el: <PapanBersamaScreen /> },
    ],
  },
  { title: '5 · Manajer', items: [{ label: 'Dashboard Tim', to: '/manajer', el: <ManajerScreen /> }] },
  { title: '6 · Laporan', items: [{ label: 'Pusat Laporan', to: '/laporan', el: <LaporanScreen /> }] },
  { title: '9 · Admin', items: [{ label: 'Panel Orkestrasi', to: '/admin', el: <AdminScreen /> }] },
  { title: '10 · Meeting', items: [{ label: 'Agenda', to: '/meeting', el: <MeetingScreen /> }] },
  { title: '8 · Pengaturan', items: [{ label: 'Pengaturan', to: '/pengaturan', el: <PengaturanScreen /> }] },
  { title: '11 · RBAC', items: [{ label: 'Peran & Izin', to: '/rbac', el: <RbacScreen /> }] },
]

/** Galeri wireframe — semua layar inti dalam bingkai ponsel 390px, per band. */
export function GalleryScreen() {
  return (
    <Box style={{ minHeight: '100dvh', background: semantic.bgBase }}>
      <Container size="xl" py="xl">
        <Stack gap={4} mb="xl">
          <Text fz="sm" fw={700} c={semantic.accentPrimary} style={{ letterSpacing: 1.5, textTransform: 'uppercase' }}>
            Task Manager Lansia
          </Text>
          <Title order={1} c={semantic.textPrimary}>
            Galeri Wireframe
          </Title>
          <Text fz="md" c={semantic.textSecondary} maw={680}>
            Tampilan layar inti — tema “Oatmeal &amp; Espresso”, target sentuh besar, kontras AAA. Klik judul
            layar untuk membukanya penuh layar.
          </Text>
        </Stack>

        <Stack gap="xl">
          {bands.map((band) => (
            <Stack key={band.title} gap="sm">
              <Group align="baseline" gap="sm">
                <Title order={3} c={semantic.textPrimary}>
                  {band.title}
                </Title>
                {band.note && (
                  <Text fz="sm" c={semantic.textSecondary}>
                    {band.note}
                  </Text>
                )}
              </Group>
              <Group align="flex-start" gap="lg" wrap="wrap">
                {band.items.map((item) => (
                  <Stack key={item.to} gap={6}>
                    <Anchor component={Link} to={item.to} fw={700} c={semantic.accentPrimary}>
                      {item.label} →
                    </Anchor>
                    <div className="phone-frame" style={{ height: 760 }}>
                      {item.el}
                    </div>
                  </Stack>
                ))}
              </Group>
            </Stack>
          ))}
        </Stack>
      </Container>
    </Box>
  )
}
