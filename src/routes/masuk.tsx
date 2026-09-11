import { createFileRoute } from '@tanstack/react-router'
import { Viewport } from '~/components/Viewport'
import { MasukScreen } from '~/screens/MasukScreen'

export const Route = createFileRoute('/masuk')({
  component: () => (
    <Viewport>
      <MasukScreen />
    </Viewport>
  ),
})
