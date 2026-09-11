import { createFileRoute } from '@tanstack/react-router'
import { Viewport } from '~/components/Viewport'
import { AdminScreen } from '~/screens/AdminScreen'

export const Route = createFileRoute('/admin')({
  component: () => (
    <Viewport>
      <AdminScreen />
    </Viewport>
  ),
})
