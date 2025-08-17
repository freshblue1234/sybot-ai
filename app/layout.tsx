import Footer from '@/components/footer'
import Header from '@/components/header'
import { Sidebar } from '@/components/sidebar'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { SettingsProvider } from '@/lib/hooks/use-settings'
import { cn } from '@/lib/utils'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://sybot.sh'),
  title: 'Sybot - AI-Powered Answer Engine',
  description:
    'A fully open-source AI-powered answer engine with a generative UI. Get instant answers, search the web, and chat with AI.',
  keywords: ['AI', 'chat', 'search', 'answer engine', 'open source', 'generative UI'],
  authors: [{ name: 'Sybot Team' }],
  creator: 'Sybot',
  openGraph: {
    title: 'Sybot - AI-Powered Answer Engine',
    description:
      'A fully open-source AI-powered answer engine with a generative UI. Get instant answers, search the web, and chat with AI.',
    url: 'https://sybot.sh',
    siteName: 'Sybot',
    images: [
      {
        url: '/sybot-logo.png',
        width: 1200,
        height: 630,
        alt: 'Sybot - AI-Powered Answer Engine'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sybot - AI-Powered Answer Engine',
    description:
      'A fully open-source AI-powered answer engine with a generative UI. Get instant answers, search the web, and chat with AI.',
    creator: '@sybot',
    images: ['/sybot-logo.png']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  userScalable: true
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="auto" suppressHydrationWarning className="scroll-smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/sybot-logo.png" />
        <meta name="theme-color" content="#3b82f6" />
        {/* Multi-language support */}
        <meta name="language" content="auto" />
        <meta name="content-language" content="auto" />
      </head>
      <body className={cn(
        'font-sans antialiased bg-gradient-to-br from-background via-background to-muted/20',
        'min-h-screen overflow-x-hidden'
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SettingsProvider>
            {/* Background Pattern */}
            <div className="fixed inset-0 -z-10">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
              <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]" />
            </div>

            <Header />

            {/* Enhanced Responsive Layout */}
            <div className="flex flex-col lg:flex-row min-h-screen relative">
              {/* Sidebar: Enhanced with better styling */}
              <aside className="hidden lg:block lg:w-80 xl:w-96 bg-background/60 backdrop-blur-xl border-r border-border/50 shadow-lg">
                <div className="sticky top-0 h-screen overflow-y-auto">
                  <Sidebar />
                </div>
              </aside>

              {/* Main Content Area */}
              <main className="flex-1 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
                  <div className="min-h-[calc(100vh-8rem)]">
                    {children}
                  </div>
                </div>
              </main>
            </div>

            <Footer />
            <Toaster 
              position="bottom-right"
              richColors
              closeButton
              duration={4000}
            />
          </SettingsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
