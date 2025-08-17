'use client'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { useVoice } from '@/contexts/voice-context'
import { cn } from '@/lib/utils'
import { Mic, MicOff, Settings, Volume2, VolumeX } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

interface VoiceControlsProps {
  onVoiceInput: (text: string) => void
}

// Client-side only wrapper to prevent hydration mismatches
function VoiceControlsClient({ onVoiceInput }: VoiceControlsProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" className="h-8 w-8 lg:h-9 lg:w-9" disabled>
          <Mic size={16} />
        </Button>
        <Button variant="outline" size="icon" className="h-8 w-8 lg:h-9 lg:w-9" disabled>
          <Volume2 size={16} />
        </Button>
        <Button variant="outline" size="icon" className="h-8 w-8 lg:h-9 lg:w-9" disabled>
          <Settings size={16} />
        </Button>
      </div>
    )
  }

  return <VoiceControlsInner onVoiceInput={onVoiceInput} />
}

// Supported languages for speech recognition and synthesis
const LANGUAGES = [
  { code: 'en-US', name: 'English (US)', flag: '🇺🇸' },
  { code: 'en-GB', name: 'English (UK)', flag: '🇬🇧' },
  { code: 'es-ES', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr-FR', name: 'French', flag: '🇫🇷' },
  { code: 'de-DE', name: 'German', flag: '🇩🇪' },
  { code: 'it-IT', name: 'Italian', flag: '🇮🇹' },
  { code: 'pt-BR', name: 'Portuguese (Brazil)', flag: '🇧🇷' },
  { code: 'pt-PT', name: 'Portuguese (Portugal)', flag: '🇵🇹' },
  { code: 'ru-RU', name: 'Russian', flag: '🇷🇺' },
  { code: 'ja-JP', name: 'Japanese', flag: '🇯🇵' },
  { code: 'ko-KR', name: 'Korean', flag: '🇰🇷' },
  { code: 'zh-CN', name: 'Chinese (Simplified)', flag: '🇨🇳' },
  { code: 'zh-TW', name: 'Chinese (Traditional)', flag: '🇹🇼' },
  { code: 'ar-SA', name: 'Arabic', flag: '🇸🇦' },
  { code: 'hi-IN', name: 'Hindi', flag: '🇮🇳' },
  { code: 'tr-TR', name: 'Turkish', flag: '🇹🇷' },
  { code: 'nl-NL', name: 'Dutch', flag: '🇳🇱' },
  { code: 'pl-PL', name: 'Polish', flag: '🇵🇱' },
  { code: 'sv-SE', name: 'Swedish', flag: '🇸🇪' },
  { code: 'da-DK', name: 'Danish', flag: '🇩🇰' },
  { code: 'no-NO', name: 'Norwegian', flag: '🇳🇴' },
  { code: 'fi-FI', name: 'Finnish', flag: '🇫🇮' },
  { code: 'cs-CZ', name: 'Czech', flag: '🇨🇿' },
  { code: 'hu-HU', name: 'Hungarian', flag: '🇭🇺' },
  { code: 'ro-RO', name: 'Romanian', flag: '🇷🇴' },
  { code: 'bg-BG', name: 'Bulgarian', flag: '🇧🇬' },
  { code: 'hr-HR', name: 'Croatian', flag: '🇭🇷' },
  { code: 'sk-SK', name: 'Slovak', flag: '🇸🇰' },
  { code: 'sl-SI', name: 'Slovenian', flag: '🇸🇮' },
  { code: 'et-EE', name: 'Estonian', flag: '🇪🇪' },
  { code: 'lv-LV', name: 'Latvian', flag: '🇱🇻' },
  { code: 'lt-LT', name: 'Lithuanian', flag: '🇱🇹' },
  { code: 'el-GR', name: 'Greek', flag: '🇬🇷' },
  { code: 'he-IL', name: 'Hebrew', flag: '🇮🇱' },
  { code: 'th-TH', name: 'Thai', flag: '🇹🇭' },
  { code: 'vi-VN', name: 'Vietnamese', flag: '🇻🇳' },
  { code: 'id-ID', name: 'Indonesian', flag: '🇮🇩' },
  { code: 'ms-MY', name: 'Malay', flag: '🇲🇾' },
  { code: 'fil-PH', name: 'Filipino', flag: '🇵🇭' },
  { code: 'uk-UA', name: 'Ukrainian', flag: '🇺🇦' },
  { code: 'be-BY', name: 'Belarusian', flag: '🇧🇾' },
  { code: 'ka-GE', name: 'Georgian', flag: '🇬🇪' },
  { code: 'hy-AM', name: 'Armenian', flag: '🇦🇲' },
  { code: 'az-AZ', name: 'Azerbaijani', flag: '🇦🇿' },
  { code: 'kk-KZ', name: 'Kazakh', flag: '🇰🇿' },
  { code: 'ky-KG', name: 'Kyrgyz', flag: '🇰🇬' },
  { code: 'uz-UZ', name: 'Uzbek', flag: '🇺🇿' },
  { code: 'mn-MN', name: 'Mongolian', flag: '🇲🇳' },
  { code: 'ne-NP', name: 'Nepali', flag: '🇳🇵' },
  { code: 'bn-BD', name: 'Bengali', flag: '🇧🇩' },
  { code: 'si-LK', name: 'Sinhala', flag: '🇱🇰' },
  { code: 'my-MM', name: 'Burmese', flag: '🇲🇲' },
  { code: 'km-KH', name: 'Khmer', flag: '🇰🇭' },
  { code: 'lo-LA', name: 'Lao', flag: '🇱🇦' },
  { code: 'gl-ES', name: 'Galician', flag: '🇪🇸' },
  { code: 'eu-ES', name: 'Basque', flag: '🇪🇸' },
  { code: 'ca-ES', name: 'Catalan', flag: '🇪🇸' },
  { code: 'cy-GB', name: 'Welsh', flag: '🇬🇧' },
  { code: 'ga-IE', name: 'Irish', flag: '🇮🇪' },
  { code: 'mt-MT', name: 'Maltese', flag: '🇲🇹' },
  { code: 'is-IS', name: 'Icelandic', flag: '🇮🇸' },
  { code: 'fo-FO', name: 'Faroese', flag: '🇫🇴' },
  { code: 'sq-AL', name: 'Albanian', flag: '🇦🇱' },
  { code: 'mk-MK', name: 'Macedonian', flag: '🇲🇰' },
  { code: 'sr-RS', name: 'Serbian', flag: '🇷🇸' },
  { code: 'bs-BA', name: 'Bosnian', flag: '🇧🇦' },
  { code: 'me-ME', name: 'Montenegrin', flag: '🇲🇪' },
  { code: 'af-ZA', name: 'Afrikaans', flag: '🇿🇦' },
  { code: 'zu-ZA', name: 'Zulu', flag: '🇿🇦' },
  { code: 'xh-ZA', name: 'Xhosa', flag: '🇿🇦' },
  { code: 'sw-KE', name: 'Swahili', flag: '🇰🇪' },
  { code: 'am-ET', name: 'Amharic', flag: '🇪🇹' },
  { code: 'ha-NG', name: 'Hausa', flag: '🇳🇬' },
  { code: 'yo-NG', name: 'Yoruba', flag: '🇳🇬' },
  { code: 'ig-NG', name: 'Igbo', flag: '🇳🇬' },
  { code: 'rw-RW', name: 'Kinyarwanda', flag: '🇷🇼' },
]

function VoiceControlsInner({ onVoiceInput }: VoiceControlsProps) {
  const {
    isListening,
    setIsListening,
    isSpeaking,
    setIsSpeaking,
    recognitionLanguage,
    setRecognitionLanguage,
    synthesisLanguage,
    setSynthesisLanguage,
    speechRate,
    setSpeechRate,
    speechPitch,
    setSpeechPitch,
    autoSpeak,
    setAutoSpeak,
    isSupported,
    speakText,
    stopSpeaking
  } = useVoice()

  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const onVoiceInputRef = useRef(onVoiceInput)

  // Initialize speech recognition
  const initSpeechRecognition = useCallback(() => {
    if (!isSupported || typeof window === 'undefined') return

    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (!SpeechRecognition) {
        console.warn('Speech recognition not supported')
        return
      }

      recognitionRef.current = new SpeechRecognition()
      
      const recognition = recognitionRef.current
      recognition.continuous = false
      recognition.interimResults = true
      recognition.lang = recognitionLanguage

      recognition.onstart = () => {
        setIsListening(true)
      }

      recognition.onresult = (event) => {
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

        if (finalTranscript) {
          onVoiceInputRef.current(finalTranscript)
          recognition.stop()
        }
      }

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error)
        setIsListening(false)
      }

      recognition.onend = () => {
        setIsListening(false)
      }
    } catch (error) {
      console.error('Error initializing speech recognition:', error)
    }
  }, [isSupported, recognitionLanguage, setIsListening])

  // Update ref when prop changes
  useEffect(() => {
    onVoiceInputRef.current = onVoiceInput
  }, [onVoiceInput])

  // Update recognition when language changes
  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = recognitionLanguage
    }
  }, [recognitionLanguage])

  // Initialize on mount - only after component is mounted
  useEffect(() => {
    // Small delay to ensure component is fully mounted
    const timer = setTimeout(() => {
      initSpeechRecognition()
    }, 100)
    
    return () => clearTimeout(timer)
  }, [initSpeechRecognition])

  const startListening = () => {
    if (recognitionRef.current && !isListening && typeof window !== 'undefined') {
      try {
        recognitionRef.current.start()
      } catch (error) {
        console.error('Error starting speech recognition:', error)
        setIsListening(false)
      }
    }
  }

  const stopListening = () => {
    if (recognitionRef.current && isListening && typeof window !== 'undefined') {
      try {
        recognitionRef.current.stop()
      } catch (error) {
        console.error('Error stopping speech recognition:', error)
        setIsListening(false)
      }
    }
  }

  const handleSpeakTest = () => {
    speakText("Hello! I'm ready to help you.")
  }

  if (!isSupported) {
    return (
      <div className="text-xs text-muted-foreground">
        Voice features not supported in this browser
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      {/* Voice Input Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={isListening ? stopListening : startListening}
        disabled={isSpeaking}
        className={cn(
          "h-8 w-8 lg:h-9 lg:w-9 transition-all duration-200",
          isListening 
            ? "bg-red-500 text-white hover:bg-red-600 animate-pulse" 
            : "hover:bg-muted/50"
        )}
      >
        {isListening ? <MicOff size={16} /> : <Mic size={16} />}
      </Button>

      {/* Voice Output Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={isSpeaking ? stopSpeaking : handleSpeakTest}
        disabled={isListening}
        className={cn(
          "h-8 w-8 lg:h-9 lg:w-9 transition-all duration-200",
          isSpeaking 
            ? "bg-blue-500 text-white hover:bg-blue-600" 
            : "hover:bg-muted/50"
        )}
      >
        {isSpeaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </Button>

      {/* Voice Settings */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 lg:h-9 lg:w-9 hover:bg-muted/50"
          >
            <Settings size={16} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4" align="end">
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">Voice Settings</h3>
            
            {/* Recognition Language */}
            <div className="space-y-2">
              <Label className="text-xs font-medium">Speech Recognition Language</Label>
              <Select value={recognitionLanguage} onValueChange={setRecognitionLanguage}>
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {LANGUAGES.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code} className="text-xs">
                      <span className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Synthesis Language */}
            <div className="space-y-2">
              <Label className="text-xs font-medium">Text-to-Speech Language</Label>
              <Select value={synthesisLanguage} onValueChange={setSynthesisLanguage}>
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {LANGUAGES.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code} className="text-xs">
                      <span className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Speech Rate */}
            <div className="space-y-2">
              <Label className="text-xs font-medium">Speech Rate: {speechRate}x</Label>
              <Slider
                value={[speechRate]}
                onValueChange={(value) => setSpeechRate(value[0])}
                min={0.5}
                max={2}
                step={0.1}
                className="w-full"
              />
            </div>

            {/* Speech Pitch */}
            <div className="space-y-2">
              <Label className="text-xs font-medium">Speech Pitch: {speechPitch}x</Label>
              <Slider
                value={[speechPitch]}
                onValueChange={(value) => setSpeechPitch(value[0])}
                min={0.5}
                max={2}
                step={0.1}
                className="w-full"
              />
            </div>

            {/* Auto Speak */}
            <div className="flex items-center justify-between">
              <Label className="text-xs font-medium">Auto-speak responses</Label>
              <Switch
                checked={autoSpeak}
                onCheckedChange={setAutoSpeak}
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export function VoiceControls(props: VoiceControlsProps) {
  return <VoiceControlsClient {...props} />
} 