import { Button, Center, Stack, Text, ThemeIcon } from '@mantine/core'
import { Link } from '@tanstack/react-router'
import { IconBrandGoogle, IconChecklist } from '@tabler/icons-react'
import { PhoneScreen } from '~/components/PhoneScreen'
import { semantic } from '~/theme/tokens'

/** A2 · Masuk — tombol besar "Masuk dengan Google" (wireframe §1). */
export function MasukScreen() {
  return (
    <PhoneScreen title="Masuk" bare>
      <Center style={{ minHeight: 560 }}>
        <Stack align="center" gap="xl" maw={320}>
          <ThemeIcon size={96} radius="xl" color="terracotta" variant="light">
            <IconChecklist size={52} aria-hidden />
          </ThemeIcon>
          <Stack align="center" gap={6}>
            <Text fz={30} fw={800} ta="center" c={semantic.textPrimary}>
              Asisten Tugas
            </Text>
            <Text fz="md" ta="center" c={semantic.textSecondary}>
              Sekretaris pribadi yang sabar untuk tugas harian Anda.
            </Text>
          </Stack>

          <Button
            component={Link}
            to="/beranda"
            size="xl"
            radius="md"
            fullWidth
            leftSection={<IconBrandGoogle size={24} aria-hidden />}
            styles={{ root: { height: 60, fontSize: 20 } }}
          >
            Masuk dengan Google
          </Button>

          <Text fz="sm" ta="center" c={semantic.textSecondary}>
            Dengan masuk, Anda menyetujui ketentuan penggunaan dan kebijakan privasi.
          </Text>
        </Stack>
      </Center>
    </PhoneScreen>
  )
}
