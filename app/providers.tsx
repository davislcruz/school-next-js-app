'use client'

import { ChatProvider } from '@/context/ChatContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import { Toaster } from '@/components/ui/toaster'
import React from 'react'

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

export function Providers({ children }: { children: React.ReactNode }) {
  return (
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
  )
}