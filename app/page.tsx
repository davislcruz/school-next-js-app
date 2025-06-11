import { Metadata } from 'next'
import Home from '@/pages/home'

export const metadata: Metadata = {
  title: 'Newsfeed | EduConnect',
  description: 'Stay connected with your school community through our interactive newsfeed.',
}

export default function HomePage() {
  return <Home />
}