import { createFileRoute } from '@tanstack/react-router'
import { Viewport } from '~/components/Viewport'
import { RbacScreen } from '~/screens/RbacScreen'

export const Route = createFileRoute('/rbac')({
  component: () => (
    <Viewport>
      <RbacScreen />
    </Viewport>
  ),
})
