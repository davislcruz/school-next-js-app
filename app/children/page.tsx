import { Metadata } from 'next'
import Children from '@/pages/children'

export const metadata: Metadata = {
  title: 'Our Students | EduConnect',
  description: 'Track student progress, achievements, and activities in your school community.',
}

export default function ChildrenPage() {
  return <Children />
}