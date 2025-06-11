import { Metadata } from 'next'
import RegisterPage from '@/pages/register'

export const metadata: Metadata = {
  title: 'Register | EduConnect',
  description: 'Create your EduConnect account to join your school community.',
}

export default function Register() {
  return <RegisterPage />
}