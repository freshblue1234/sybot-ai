'use client'

import { BookOpen, Github, Menu, Search, Sparkles, Zap } from 'lucide-react'
import React, { useState } from 'react'
import HistoryContainer from './history-container'
import { ModeToggle } from './mode-toggle'
import { SettingsPanel } from './settings-panel'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Separator } from './ui/separator'

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <a 
              href="/" 
              className="flex items-center gap-3 group transition-all duration-200 hover:scale-105"
            >
              <div className="relative">
                <img 
                  src="/sybot.png" 
                  alt="Sybot" 
                  className="w-8 h-8 rounded-lg shadow-lg group-hover:shadow-xl transition-shadow duration-200" 
                />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Sybot
                </span>
                <span className="text-xs text-muted-foreground -mt-1">AI Answer Engine</span>
              </div>
            </a>
            
            {/* Status Badge */}
            <Badge variant="secondary" className="hidden sm:flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs">Live</span>
            </Badge>
          </div>

          {/* Center Navigation - Hidden on mobile */}
          <nav className="hidden md:flex items-center space-x-6">
            <a 
              href="/" 
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <Search className="w-4 h-4" />
              Search
            </a>
            <a 
              href="/spinner-demo" 
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              Components
            </a>
            <a 
              href="https://github.com/sybot-ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Quick Actions */}
            <div className="hidden sm:flex items-center gap-1">
              <Button variant="ghost" size="sm" className="h-8 px-3">
                <Zap className="w-4 h-4 mr-1" />
                Quick Start
              </Button>
              <Button variant="ghost" size="sm" className="h-8 px-3">
                <BookOpen className="w-4 h-4 mr-1" />
                Docs
              </Button>
            </div>

            <Separator orientation="vertical" className="h-6 hidden sm:block" />

            {/* Main Actions */}
            <div className="flex items-center gap-1">
              <SettingsPanel />
              <ModeToggle />
              <HistoryContainer />
              
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl">
            <div className="px-4 py-4 space-y-3">
              <a 
                href="/" 
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium hover:bg-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Search className="w-4 h-4" />
                Search
              </a>
              <a 
                href="/spinner-demo" 
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium hover:bg-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Sparkles className="w-4 h-4" />
                Components
              </a>
              <a 
                href="https://github.com/sybot-ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium hover:bg-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <Separator />
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Zap className="w-4 h-4 mr-1" />
                  Quick Start
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <BookOpen className="w-4 h-4 mr-1" />
                  Docs
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
