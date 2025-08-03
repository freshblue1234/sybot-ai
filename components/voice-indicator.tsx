'use client'

import { useVoice } from '@/contexts/voice-context'
import { cn } from '@/lib/utils'
import { Mic, Volume2 } from 'lucide-react'
import { useEffect, useState } from 'react'

export function VoiceIndicator() {
  const { isListening, isSpeaking } = useVoice()
  const [isMounted, setIsMounted] = useState(false)

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Don't render anything during SSR or before mount
  if (!isMounted) {
    return null
  }

  if (!isListening && !isSpeaking) {
    return null
  }

  return (
    <div className="fixed top-20 right-4 z-50">
      <div className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-full shadow-lg backdrop-blur-sm border transition-all duration-200",
        isListening 
          ? "bg-red-500/90 text-white border-red-400/50" 
          : "bg-blue-500/90 text-white border-blue-400/50"
      )}>
        <div className="flex items-center gap-2">
          {isListening ? (
            <>
              <div className="relative">
                <Mic size={16} className="animate-pulse" />
                <div className="absolute inset-0 bg-red-400 rounded-full animate-ping opacity-75" />
              </div>
              <span className="text-sm font-medium">Listening...</span>
            </>
          ) : (
            <>
              <div className="relative">
                <Volume2 size={16} className="animate-pulse" />
                <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-75" />
              </div>
              <span className="text-sm font-medium">Speaking...</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
} 