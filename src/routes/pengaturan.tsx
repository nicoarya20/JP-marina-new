import { createFileRoute } from '@tanstack/react-router'
import { Viewport } from '~/components/Viewport'
import { PengaturanScreen } from '~/screens/PengaturanScreen'

export const Route = createFileRoute('/pengaturan')({
  component: () => (
    <Viewport>
      <PengaturanScreen />
    </Viewport>
  ),
})
