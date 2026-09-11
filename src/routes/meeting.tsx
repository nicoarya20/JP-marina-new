import { createFileRoute } from '@tanstack/react-router'
import { Viewport } from '~/components/Viewport'
import { MeetingScreen } from '~/screens/MeetingScreen'

export const Route = createFileRoute('/meeting')({
  component: () => (
    <Viewport>
      <MeetingScreen />
    </Viewport>
  ),
})
