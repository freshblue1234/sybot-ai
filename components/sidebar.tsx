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
    }
  ]

  const recentChats = [
    {
      id: '1',
      title: 'How to build a React app',
      timestamp: '2 hours ago',
      unread: true
    },
    {
      id: '2',
      title: 'JavaScript best practices',
      timestamp: '1 day ago',
      unread: false
    },
    {
      id: '3',
      title: 'CSS Grid vs Flexbox',
      timestamp: '3 days ago',
      unread: false
    }
  ]

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed left-0 top-0 z-50 h-full w-80 bg-background/95 backdrop-blur-xl border-r border-border/50 transform transition-transform duration-300 ease-in-out md:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <ScrollArea className="h-full">
          <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="/sybot.png"
                  alt="Sybot"
                  className="w-8 h-8 rounded-lg shadow-lg"
                />
                <div>
                  <h2 className="text-lg font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    Sybot
                  </h2>
                  <p className="text-xs text-muted-foreground">AI Answer Engine</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsOpen(false)}
              >
                <Menu className="h-4 w-4" />
              </Button>
            </div>

            <Separator />

            {/* Navigation */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Navigation
              </h3>
              {navigationItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    activeSection === item.id
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  )}
                  onClick={() => setActiveSection(item.id)}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                  {item.id === 'history' && (
                    <Badge variant="secondary" className="ml-auto text-xs">
                      3
                    </Badge>
                  )}
                </Link>
              ))}
            </div>

            <Separator />

            {/* Quick Actions */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {quickActions.map((action) => (
                  <Button
                    key={action.label}
                    variant={action.variant}
                    size="sm"
                    className="justify-start h-9"
                    asChild
                  >
                    <Link href={action.href}>
                      <action.icon className="h-4 w-4 mr-2" />
                      {action.label}
                    </Link>
                  </Button>
                ))}
              </div>
            </div>

            <Separator />

            {/* Recent Chats */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Recent Chats
              </h3>
              <div className="space-y-1">
                {recentChats.map((chat) => (
                  <div
                    key={chat.id}
                    className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-accent transition-colors cursor-pointer"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {chat.title}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {chat.timestamp}
                      </p>
                    </div>
                    {chat.unread && (
                      <div className="w-2 h-2 bg-primary rounded-full" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Stats */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Stats
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-accent/50 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">24</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Total Chats</p>
                </div>
                <div className="bg-accent/50 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">89%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Accuracy</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Social Links */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Connect
              </h3>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                  <Link href="https://github.com/sybot-ai" target="_blank">
                    <Github className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                  <Link href="https://twitter.com/sybot_ai" target="_blank">
                    <Twitter className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Star className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </>
  )
}
