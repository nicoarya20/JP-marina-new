import { createFileRoute } from '@tanstack/react-router'
import { Viewport } from '~/components/Viewport'
import { ProfilScreen } from '~/screens/ProfilScreen'

export const Route = createFileRoute('/profil')({
  component: () => (
    <Viewport>
      <ProfilScreen />
    </Viewport>
  ),
})
