import { Metadata } from 'next'
import LoginPage from '@/pages/login'

export const metadata: Metadata = {
  title: 'Login | EduConnect',
  description: 'Sign in to your EduConnect account to access school communication features.',
}

export default function Login() {
  return <LoginPage />
}