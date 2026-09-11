import { createFileRoute } from '@tanstack/react-router'
import { Viewport } from '~/components/Viewport'
import { TugasListScreen } from '~/screens/TugasListScreen'

export const Route = createFileRoute('/tugas/')({
  component: () => (
    <Viewport>
      <TugasListScreen />
    </Viewport>
  ),
})
