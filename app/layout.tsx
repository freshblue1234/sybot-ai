import Footer from '@/components/footer'
import Header from '@/components/header'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Sidebar } from '@/components/sidebar'
<<<<<<< HEAD
import { VoiceProvider } from '@/contexts/voice-context'
import { VoiceIndicator } from '@/components/voice-indicator'

export const metadata: Metadata = {
  metadataBase: new URL('https://sybot.sh'),
  title: 'Sybot - AI-Powered Answer Engine',
  description: 'A fully open-source AI-powered answer engine with a generative UI.',
  openGraph: {
    title: 'Sybot - AI-Powered Answer Engine',
    description: 'A fully open-source AI-powered answer engine with a generative UI.'
  },
  twitter: {
    title: 'Sybot - AI-Powered Answer Engine',
=======

export const metadata: Metadata = {
  metadataBase: new URL('https://sybot.sh'),
  title: 'sybot',
  description: 'A fully open-source AI-powered answer engine with a generative UI.',
  openGraph: {
    title: 'sybot',
    description: 'A fully open-source AI-powered answer engine with a generative UI.'
  },
  twitter: {
    title: 'sybot',
>>>>>>> 41155a42ae5ee50065317213a1704586c96f7cfd
    description: 'A fully open-source AI-powered answer engine with a generative UI.',
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
<<<<<<< HEAD
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
=======
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
>>>>>>> 41155a42ae5ee50065317213a1704586c96f7cfd
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
<<<<<<< HEAD
      <body className={cn('font-sans antialiased bg-gradient-to-br from-background via-background to-muted/20')}>
=======
      <body className={cn('font-sans antialiased')}>
>>>>>>> 41155a42ae5ee50065317213a1704586c96f7cfd
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
<<<<<<< HEAD
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
                <div className="min-h-screen flex flex-col">
                  {children}
                </div>
              </main>
            </div>

            <Footer />
            <Toaster />
          </VoiceProvider>
=======
          <Header />

          {/* Responsive layout wrapper */}
          <div className="flex flex-col lg:flex-row min-h-screen">
            {/* Sidebar: hidden on mobile, shown on lg+ screens */}
            <aside className="hidden lg:block lg:w-64">
              <Sidebar />
            </aside>

            <main className="flex-1 p-4">
              {children}
            </main>
          </div>

          <Footer />
          <Toaster />
>>>>>>> 41155a42ae5ee50065317213a1704586c96f7cfd
        </ThemeProvider>
      </body>
    </html>
  )
}
