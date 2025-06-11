import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ChatProvider } from '@/context/ChatContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EduConnect - Educational Communication Platform',
  description: 'A mobile-first educational communication platform connecting students, parents, and educators.',
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <QueryClientProvider client={queryClient}>
            <ChatProvider>
              {children}
              <Toaster />
            </ChatProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}