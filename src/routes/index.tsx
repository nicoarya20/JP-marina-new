import { createFileRoute } from '@tanstack/react-router'
import { GalleryScreen } from '~/screens/GalleryScreen'

export const Route = createFileRoute('/')({
  component: GalleryScreen,
})
