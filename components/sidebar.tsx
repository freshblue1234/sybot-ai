'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import {
    BookOpen,
    Clock,
    Github,
    History,
    Menu,
    MessageSquare,
    Search,
    Sparkles,
    Star,
    TrendingUp,
    Twitter,
    Zap
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('chat')

  const navigationItems = [
    {
      id: 'chat',
      label: 'Chat',
      icon: MessageSquare,
      description: 'Start a new conversation',
      href: '/'
    },
    {
      id: 'search',
      label: 'Search',
      icon: Search,
      description: 'Search the web',
      href: '/search'
    },
    {
      id: 'components',
      label: 'Components',
      icon: Sparkles,
      description: 'UI Components Demo',
      href: '/spinner-demo'
    },
    {
      id: 'history',
      label: 'History',
      icon: History,
      description: 'View past conversations',
      href: '#'
    }
  ]

  const quickActions = [
    {
      label: 'Quick Start',
      icon: Zap,
      href: '#',
      variant: 'default' as const
    },
    {
      label: 'Documentation',
      icon: BookOpen,
      href: '#',
      variant: 'outline' as const
    },
    {
      label: 'GitHub',
      icon: Github,
      href: 'https://github.com/sybot-ai',
      variant: 'outline' as const
    }
  ]

  const stats = [
    { label: 'Total Chats', value: '1,234', icon: MessageSquare },
    { label: 'This Week', value: '89', icon: TrendingUp },
    { label: 'Avg. Response', value: '2.3s', icon: Clock }
  ]

  return (
    <>
      {/* Menu Button for mobile */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-20 left-4 z-50 lg:hidden shadow-lg bg-background/80 backdrop-blur-sm"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Sidebar Modal for mobile */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="h-[85vh] p-4 fixed top-24 left-0 flex flex-col w-80 bg-background/95 backdrop-blur-xl border-r border-border z-50 rounded-r-xl shadow-2xl lg:hidden">
            <SidebarContent />
            <Button
              variant="ghost"
              className="mt-auto"
              onClick={() => setIsOpen(false)}
            >
              Close
            </Button>
          </div>
        </>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:block h-full">
        <SidebarContent />
      </div>
    </>
  )

  function SidebarContent() {
    return (
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-border/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Navigation</h2>
            <Badge variant="secondary" className="text-xs">
              v2.0
            </Badge>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center p-2 rounded-lg bg-muted/50">
                <stat.icon className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                <div className="text-xs font-medium">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-4 py-4">
          <div className="space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`
                  flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${activeSection === item.id 
                    ? 'bg-primary text-primary-foreground shadow-md' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }
                `}
                onClick={() => setActiveSection(item.id)}
              >
                <item.icon className="w-4 h-4" />
                <div className="flex-1">
                  <div>{item.label}</div>
                  <div className="text-xs opacity-70">{item.description}</div>
                </div>
              </Link>
            ))}
          </div>

          <Separator className="my-6" />

          {/* Quick Actions */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Quick Actions</h3>
            {quickActions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                target={action.href.startsWith('http') ? '_blank' : undefined}
                className={cn(
                  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-8 px-3",
                  action.variant === 'default' 
                    ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                    : "border border-input hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <action.icon className="w-4 h-4 mr-2" />
                {action.label}
              </Link>
            ))}
          </div>

          <Separator className="my-6" />

          {/* Recent Activity */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Recent Activity</h3>
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-colors">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">Chat #{i}</div>
                    <div className="text-xs text-muted-foreground">2 hours ago</div>
                  </div>
                  <Star className="w-3 h-3 text-muted-foreground" />
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="p-4 border-t border-border/50">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>© 2024 Sybot</span>
            <div className="flex items-center gap-2">
              <a href="https://github.com/sybot-ai" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                <Github className="w-3 h-3" />
              </a>
              <a href="https://twitter.com/sybot" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                <Twitter className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
