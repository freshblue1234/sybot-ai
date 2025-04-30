import Footer from '@/components/footer'
import Header from '@/components/header'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Sidebar } from '@/components/sidebar'

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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={cn('font-sans antialiased')}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
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
        </ThemeProvider>
      </body>
    </html>
  )
}
