import { createFileRoute } from '@tanstack/react-router'
import { Viewport } from '~/components/Viewport'
import { BerandaScreen } from '~/screens/BerandaScreen'

export const Route = createFileRoute('/beranda')({
  component: () => (
    <Viewport>
      <BerandaScreen />
    </Viewport>
  ),
})
