import { createFileRoute } from '@tanstack/react-router'
import { Viewport } from '~/components/Viewport'
import { LaporanScreen } from '~/screens/LaporanScreen'

export const Route = createFileRoute('/laporan')({
  component: () => (
    <Viewport>
      <LaporanScreen />
    </Viewport>
  ),
})
