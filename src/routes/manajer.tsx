import { createFileRoute } from '@tanstack/react-router'
import { Viewport } from '~/components/Viewport'
import { ManajerScreen } from '~/screens/ManajerScreen'

export const Route = createFileRoute('/manajer')({
  component: () => (
    <Viewport>
      <ManajerScreen />
    </Viewport>
  ),
})
