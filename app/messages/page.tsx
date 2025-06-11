import { Metadata } from 'next'
import Messages from '@/pages/messages'

export const metadata: Metadata = {
  title: 'Messages | EduConnect',
  description: 'Connect with teachers, parents, and students through secure messaging.',
}

export default function MessagesPage() {
  return <Messages />
}