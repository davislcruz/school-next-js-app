'use client'

import { Inter } from 'next/font/google'
import './globals.css'
import { ChatProvider } from '@/context/ChatContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import { Toaster } from '@/components/ui/toaster'
import React from 'react'

const inter = Inter({ subsets: ['latin'] })

// Create QueryClient instance outside component to prevent recreation
let queryClient: QueryClient

function getQueryClient() {
  if (!queryClient) {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 5, // 5 minutes
          refetchOnWindowFocus: false,
        },
      },
    })
  }
  return queryClient
}

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
          <QueryClientProvider client={getQueryClient()}>
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