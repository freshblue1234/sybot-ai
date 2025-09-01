'use client'

import { usePathname } from 'next/navigation'

interface ConditionalLayoutProps {
  children: React.ReactNode
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname()
  const isChatRoute = pathname === '/chat'
  
  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}
