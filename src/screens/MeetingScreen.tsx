import { Button, Stack, Text } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import { PhoneScreen } from '~/components/PhoneScreen'
import { MeetingCard } from '~/components/MeetingCard'
import { SectionTitle } from '~/components/SectionTitle'
import { meetings } from '~/data/mock'
import { semantic } from '~/theme/tokens'

/** M1 · Agenda — daftar acara + buat acara (wireframe §10). */
export function MeetingScreen() {
  return (
    <PhoneScreen title="Meeting" withBottomNav activeNav="/meeting">
      <Stack gap="md">
        <Button size="md" radius="md" fullWidth leftSection={<IconPlus size={20} aria-hidden />}>
          Buat acara
        </Button>

        <SectionTitle>Mendatang</SectionTitle>
        <Stack gap="sm">
          {meetings.map((m) => (
            <MeetingCard key={m.id} meeting={m} />
          ))}
        </Stack>

        <Text fz="sm" ta="center" c={semantic.textSecondary} mt="md">
          Pengingat dikirim lewat in-app, email, atau Telegram sesuai pilihan Anda.
        </Text>
      </Stack>
    </PhoneScreen>
  )
}
