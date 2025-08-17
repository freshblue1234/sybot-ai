'use client'

import { cn } from '@/lib/utils'
import { AlertCircle, Mic, MicOff, Volume2, VolumeX } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'

// Supported languages
const LANGUAGES = [
  { code: 'en-US', name: 'English (US)', flag: '🇺🇸' },
  { code: 'en-GB', name: 'English (UK)', flag: '🇬🇧' },
  { code: 'es-ES', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr-FR', name: 'French', flag: '🇫🇷' },
  { code: 'de-DE', name: 'German', flag: '🇩🇪' },
  { code: 'it-IT', name: 'Italian', flag: '🇮🇹' },
  { code: 'pt-BR', name: 'Portuguese', flag: '🇧🇷' },
  { code: 'ru-RU', name: 'Russian', flag: '🇷🇺' },
  { code: 'ja-JP', name: 'Japanese', flag: '🇯🇵' },
  { code: 'ko-KR', name: 'Korean', flag: '🇰🇷' },
  { code: 'zh-CN', name: 'Chinese', flag: '🇨🇳' },
  { code: 'ar-SA', name: 'Arabic', flag: '🇸🇦' },
  { code: 'hi-IN', name: 'Hindi', flag: '🇮🇳' },
  { code: 'tr-TR', name: 'Turkish', flag: '🇹🇷' },
  { code: 'nl-NL', name: 'Dutch', flag: '🇳🇱' }
]

interface VoiceInputButtonProps {
  onTranscript: (text: string) => void
  disabled?: boolean
  className?: string
}

interface VoiceOutputButtonProps {
  text: string
  messageIndex?: number
  disabled?: boolean
  className?: string
}

export function VoiceInputButton({ onTranscript, disabled, className }: VoiceInputButtonProps) {
  const [isListening, setIsListening] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('en-US')
  const [transcript, setTranscript] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSupported, setIsSupported] = useState(true)
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  useEffect(() => {
    try {
      if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        setIsSupported(false)
        setError('Speech recognition not supported')
        return
      }

      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = selectedLanguage

      recognitionRef.current.onstart = () => {
        setIsListening(true)
        setError(null)
      }

      recognitionRef.current.onresult = (event) => {
        try {
          let finalTranscript = ''
          let interimTranscript = ''

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript
            if (event.results[i].isFinal) {
              finalTranscript += transcript
            } else {
              interimTranscript += transcript
            }
          }

          setTranscript(finalTranscript || interimTranscript)

          if (finalTranscript) {
            onTranscript(finalTranscript)
            setTranscript('')
          }
        } catch (error) {
          console.error('Error processing speech recognition result:', error)
          setError('Error processing speech')
        }
      }

      recognitionRef.current.onerror = (event) => {
        setIsListening(false)
        console.error('Speech recognition error:', event.error)
        setError(`Error: ${event.error}`)
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }

      return () => {
        if (recognitionRef.current) {
          try {
            recognitionRef.current.stop()
          } catch (error) {
            console.error('Error stopping speech recognition:', error)
          }
        }
      }
    } catch (error) {
      console.error('Error initializing speech recognition:', error)
      setIsSupported(false)
      setError('Failed to initialize speech recognition')
    }
  }, [selectedLanguage, onTranscript])

  const startListening = () => {
    if (!recognitionRef.current || !isSupported) return
    try {
      recognitionRef.current.lang = selectedLanguage
      recognitionRef.current.start()
    } catch (error) {
      setError('Failed to start speech recognition')
    }
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
  }

  if (!isSupported) {
    return (
      <Button variant="outline" size="icon" className={cn("h-8 w-8", className)} disabled>
        <AlertCircle size={16} />
      </Button>
    )
  }

  return (
    <div className="flex items-center gap-1 sm:gap-2">
      <select
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.target.value)}
        className="text-xs border rounded px-1 sm:px-2 py-1 bg-background hidden sm:block"
      >
        {LANGUAGES.map(lang => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={isListening ? "destructive" : "outline"}
              size="icon"
              className={cn(
                "h-8 w-8 transition-all duration-200",
                isListening && "animate-pulse shadow-lg shadow-red-500/50",
                className
              )}
              onClick={isListening ? stopListening : startListening}
              disabled={disabled}
            >
              {isListening ? <MicOff size={16} /> : <Mic size={16} />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isListening ? 'Stop listening' : 'Start voice input'}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {transcript && (
        <Badge variant="secondary" className="text-xs hidden sm:block">
          {transcript}
        </Badge>
      )}

      {error && (
        <div className="text-xs text-red-500 hidden sm:block">
          {error}
        </div>
      )}
    </div>
  )
}

export function VoiceOutputButton({ text, messageIndex, disabled, className }: VoiceOutputButtonProps) {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const synthesisRef = useRef<SpeechSynthesisUtterance | null>(null)

  const speakText = useCallback(() => {
    if (!('speechSynthesis' in window) || disabled) return

    try {
      synthesisRef.current = new SpeechSynthesisUtterance(text)
      synthesisRef.current.onstart = () => setIsSpeaking(true)
      synthesisRef.current.onend = () => setIsSpeaking(false)
      synthesisRef.current.onerror = (event) => {
        console.error('Speech synthesis error:', event)
        setIsSpeaking(false)
      }
      speechSynthesis.speak(synthesisRef.current)
    } catch (error) {
      console.error('Speech synthesis error:', error)
      setIsSpeaking(false)
    }
  }, [text, disabled])

  const stopSpeaking = useCallback(() => {
    speechSynthesis.cancel()
    setIsSpeaking(false)
  }, [])

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={isSpeaking ? "destructive" : "ghost"}
            size="icon"
            className={cn(
              "h-8 w-8 rounded-full transition-all duration-200",
              isSpeaking && "animate-pulse shadow-lg shadow-red-500/50",
              className
            )}
            onClick={isSpeaking ? stopSpeaking : speakText}
            disabled={disabled}
          >
            {isSpeaking ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isSpeaking ? 'Stop speaking' : 'Speak message'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
