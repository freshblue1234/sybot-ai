import { ConditionalLayout } from '@/components/conditional-layout'
import { ThemeProvider } from '@/components/theme-provider'
import { VoiceProvider } from '@/contexts/voice-context'
import 'katex/dist/katex.min.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sybot AI - Advanced AI Assistant by Sycom Industry',
  description: 'The most advanced AI assistant with Grok-style interface. Natural conversation, voice control, and multi-model intelligence.',
  keywords: 'AI Assistant, Sybot, Sycom Industry, Grok-style, Voice AI, Chatbot',
  authors: [{ name: 'Sycom Industry' }],
  creator: 'Sycom Industry',
  publisher: 'Sycom Industry',
  robots: 'index, follow',
  openGraph: {
    title: 'Sybot AI - Advanced AI Assistant',
    description: 'The most advanced AI assistant with Grok-style interface',
    type: 'website',
    locale: 'en_US',
    siteName: 'Sybot AI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sybot AI - Advanced AI Assistant',
    description: 'The most advanced AI assistant with Grok-style interface',
  },
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
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <VoiceProvider>
            <ConditionalLayout>
              {children}
            </ConditionalLayout>
          </VoiceProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
