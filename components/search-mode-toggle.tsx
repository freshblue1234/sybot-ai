'use client'

import { cn } from '@/lib/utils'
import { getCookie, setCookie } from '@/lib/utils/cookies'
import { Globe, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Toggle } from './ui/toggle'

export function SearchModeToggle() {
  const [isSearchMode, setIsSearchMode] = useState(true)

  useEffect(() => {
    const savedMode = getCookie('search-mode')
    if (savedMode !== null) {
      setIsSearchMode(savedMode === 'true')
    }
  }, [])

  const handleSearchModeChange = (pressed: boolean) => {
    setIsSearchMode(pressed)
    setCookie('search-mode', pressed.toString())
  }

  return (
    <Toggle
      aria-label="Toggle search mode"
      pressed={isSearchMode}
      onPressedChange={handleSearchModeChange}
      variant="outline"
      className={cn(
        'h-8 px-2 gap-1.5 border border-border/50 text-muted-foreground bg-background/50 backdrop-blur-sm',
        'data-[state=on]:bg-accent-blue data-[state=on]:text-accent-blue-foreground',
        'data-[state=on]:border-accent-blue-border data-[state=on]:shadow-sm',
        'hover:bg-muted/50 hover:text-foreground transition-all duration-200 rounded-xl',
        'lg:h-9 lg:px-3'
      )}
    >
      {isSearchMode ? (
        <Search className="size-3.5 lg:size-4" />
      ) : (
        <Globe className="size-3.5 lg:size-4" />
      )}
      <span className="text-xs font-medium hidden sm:inline lg:text-sm">
        {isSearchMode ? 'Search' : 'Chat'}
      </span>
    </Toggle>
  )
}
