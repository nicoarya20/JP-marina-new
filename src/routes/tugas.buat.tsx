import { createFileRoute } from '@tanstack/react-router'
import { Viewport } from '~/components/Viewport'
import { BuatTugasScreen } from '~/screens/BuatTugasScreen'

export const Route = createFileRoute('/tugas/buat')({
  component: () => (
    <Viewport>
      <BuatTugasScreen />
    </Viewport>
  ),
})
