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
        'h-8 px-2 gap-1.5 border border-gray-600 text-gray-300 bg-gray-800 backdrop-blur-sm',
        'data-[state=on]:bg-blue-600 data-[state=on]:text-white',
        'data-[state=on]:border-blue-500 data-[state=on]:shadow-sm',
        'hover:bg-gray-700 hover:text-white transition-all duration-200 rounded-xl',
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
