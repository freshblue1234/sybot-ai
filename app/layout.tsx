import Footer from '@/components/footer'
import Header from '@/components/header'
import { Sidebar } from '@/components/sidebar'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { VoiceIndicator } from '@/components/voice-indicator'
import { VoiceProvider } from '@/contexts/voice-context'
import { cn } from '@/lib/utils'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://sybot.sh'),
  title: 'Sybot - AI-Powered Answer Engine',
  description:
    'A fully open-source AI-powered answer engine with a generative UI.',
  openGraph: {
    title: 'Sybot - AI-Powered Answer Engine',
    description:
      'A fully open-source AI-powered answer engine with a generative UI.'
  },
  twitter: {
    title: 'Sybot - AI-Powered Answer Engine',
    description:
      'A fully open-source AI-powered answer engine with a generative UI.',
    card: 'summary_large_image',
    creator: '@miiura'
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={cn(
          'font-sans antialiased bg-gradient-to-br from-background via-background to-muted/20'
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <VoiceProvider>
            {/* Background gradient overlay */}
            <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />

            <Header />
            <VoiceIndicator />

            {/* Main layout container */}
            <div className="relative flex min-h-screen">
              {/* Sidebar: hidden on mobile, shown on lg+ screens */}
              <aside className="hidden lg:block lg:w-80 lg:border-r lg:border-border/50 lg:bg-background/50 lg:backdrop-blur-sm">
                <div className="sticky top-0 h-screen overflow-y-auto">
                  <Sidebar />
                </div>
              </aside>

              {/* Main content area */}
              <main className="flex-1 relative">
                <div className="min-h-screen flex flex-col">{children}</div>
              </main>
            </div>

            <Footer />
            <Toaster />
          </VoiceProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
