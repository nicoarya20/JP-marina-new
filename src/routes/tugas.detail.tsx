import { createFileRoute } from '@tanstack/react-router'
import { Viewport } from '~/components/Viewport'
import { TugasDetailScreen } from '~/screens/TugasDetailScreen'

export const Route = createFileRoute('/tugas/detail')({
  component: () => (
    <Viewport>
      <TugasDetailScreen />
    </Viewport>
  ),
})
