import { createFileRoute } from '@tanstack/react-router'
import { Viewport } from '~/components/Viewport'
import { PapanBersamaScreen } from '~/screens/PapanBersamaScreen'

export const Route = createFileRoute('/papan')({
  component: () => (
    <Viewport>
      <PapanBersamaScreen />
    </Viewport>
  ),
})
