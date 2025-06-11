import { Metadata } from 'next'
import Events from '@/pages/events'

export const metadata: Metadata = {
  title: 'School Events | EduConnect',
  description: 'Discover upcoming academic events and school activities in your community.',
}

export default function EventsPage() {
  return <Events />
}