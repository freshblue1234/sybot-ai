'use client'

import { useVoice } from '@/lib/hooks/use-voice'
import {
    Globe,
    Languages,
    Mic,
    MicOff,
    Play,
    Repeat,
    Settings,
    Square,
    Volume2,
    VolumeX
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from './ui/select'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'

interface VoiceInputButtonProps {
  onTranscriptChange: (transcript: string) => void
  onCommand?: (command: string) => void
  disabled?: boolean
  continuousMode?: boolean
}

// Comprehensive language list with better organization
const LANGUAGES = [
  // Major Languages
  { code: 'en-US', name: 'English (US)', native: 'English' },
  { code: 'en-GB', name: 'English (UK)', native: 'English' },
  { code: 'es-ES', name: 'Español', native: 'Español' },
  { code: 'fr-FR', name: 'Français', native: 'Français' },
  { code: 'de-DE', name: 'Deutsch', native: 'Deutsch' },
  { code: 'it-IT', name: 'Italiano', native: 'Italiano' },
  { code: 'pt-BR', name: 'Português', native: 'Português' },
  { code: 'ru-RU', name: 'Русский', native: 'Русский' },
  { code: 'ja-JP', name: '日本語', native: '日本語' },
  { code: 'ko-KR', name: '한국어', native: '한국어' },
  { code: 'zh-CN', name: '中文 (简体)', native: '中文' },
  { code: 'zh-TW', name: '中文 (繁體)', native: '中文' },
  { code: 'ar-SA', name: 'العربية', native: 'العربية' },
  { code: 'hi-IN', name: 'हिन्दी', native: 'हिन्दी' },
  { code: 'tr-TR', name: 'Türkçe', native: 'Türkçe' },
  { code: 'nl-NL', name: 'Nederlands', native: 'Nederlands' },
  { code: 'pl-PL', name: 'Polski', native: 'Polski' },
  { code: 'sv-SE', name: 'Svenska', native: 'Svenska' },
  { code: 'da-DK', name: 'Dansk', native: 'Dansk' },
  { code: 'no-NO', name: 'Norsk', native: 'Norsk' },
  { code: 'fi-FI', name: 'Suomi', native: 'Suomi' },
  { code: 'cs-CZ', name: 'Čeština', native: 'Čeština' },
  { code: 'hu-HU', name: 'Magyar', native: 'Magyar' },
  { code: 'ro-RO', name: 'Română', native: 'Română' },
  { code: 'bg-BG', name: 'Български', native: 'Български' },
  { code: 'hr-HR', name: 'Hrvatski', native: 'Hrvatski' },
  { code: 'sk-SK', name: 'Slovenčina', native: 'Slovenčina' },
  { code: 'sl-SI', name: 'Slovenščina', native: 'Slovenščina' },
  { code: 'et-EE', name: 'Eesti', native: 'Eesti' },
  { code: 'lv-LV', name: 'Latviešu', native: 'Latviešu' },
  { code: 'lt-LT', name: 'Lietuvių', native: 'Lietuvių' },
  { code: 'mt-MT', name: 'Malti', native: 'Malti' },
  { code: 'el-GR', name: 'Ελληνικά', native: 'Ελληνικά' },
  { code: 'he-IL', name: 'עברית', native: 'עברית' },
  { code: 'th-TH', name: 'ไทย', native: 'ไทย' },
  { code: 'vi-VN', name: 'Tiếng Việt', native: 'Tiếng Việt' },
  { code: 'id-ID', name: 'Bahasa Indonesia', native: 'Bahasa Indonesia' },
  { code: 'ms-MY', name: 'Bahasa Melayu', native: 'Bahasa Melayu' },
  { code: 'fil-PH', name: 'Filipino', native: 'Filipino' },
  { code: 'uk-UA', name: 'Українська', native: 'Українська' },
  { code: 'be-BY', name: 'Беларуская', native: 'Беларуская' },
  { code: 'ka-GE', name: 'ქართული', native: 'ქართული' },
  { code: 'hy-AM', name: 'Հայերեն', native: 'Հայերեն' },
  { code: 'az-AZ', name: 'Azərbaycan', native: 'Azərbaycan' },
  { code: 'kk-KZ', name: 'Қазақ', native: 'Қазақ' },
  { code: 'ky-KG', name: 'Кыргызча', native: 'Кыргызча' },
  { code: 'uz-UZ', name: 'O\'zbek', native: 'O\'zbek' },
  { code: 'tg-TJ', name: 'Тоҷикӣ', native: 'Тоҷикӣ' },
  { code: 'mn-MN', name: 'Монгол', native: 'Монгол' },
  { code: 'ne-NP', name: 'नेपाली', native: 'नेपाली' },
  { code: 'si-LK', name: 'සිංහල', native: 'සිංහල' },
  { code: 'my-MM', name: 'မြန်မာ', native: 'မြန်မာ' },
  { code: 'km-KH', name: 'ខ្មែរ', native: 'ខ្មែរ' },
  { code: 'lo-LA', name: 'ລາວ', native: 'ລາວ' },
  { code: 'gl-ES', name: 'Galego', native: 'Galego' },
  { code: 'eu-ES', name: 'Euskara', native: 'Euskara' },
  { code: 'ca-ES', name: 'Català', native: 'Català' },
  { code: 'cy-GB', name: 'Cymraeg', native: 'Cymraeg' },
  { code: 'ga-IE', name: 'Gaeilge', native: 'Gaeilge' },
  { code: 'is-IS', name: 'Íslenska', native: 'Íslenska' },
  { code: 'fo-FO', name: 'Føroyskt', native: 'Føroyskt' },
  { code: 'sq-AL', name: 'Shqip', native: 'Shqip' },
  { code: 'mk-MK', name: 'Македонски', native: 'Македонски' },
  { code: 'sr-RS', name: 'Српски', native: 'Српски' },
  { code: 'bs-BA', name: 'Bosanski', native: 'Bosanski' },
  { code: 'me-ME', name: 'Crnogorski', native: 'Crnogorski' },
]

export function VoiceInputButton({
  onTranscriptChange,
  onCommand,
  disabled,
  continuousMode = false
}: VoiceInputButtonProps) {
  const {
    isListening,
    transcript,
    isSpeechSupported,
    isContinuousMode,
    language,
    setLanguage,
    startListening,
    stopListening,
    toggleContinuousMode,
    isVoiceCommand,
    executeVoiceCommand
  } = useVoice()

  const [showSettings, setShowSettings] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState(language)

  // Pass transcript to parent component
  useEffect(() => {
    onTranscriptChange(transcript)

    // Check if transcript contains a voice command
    if (onCommand && isVoiceCommand(transcript)) {
      executeVoiceCommand(transcript, onCommand)
      // Clear transcript after executing command
      onTranscriptChange('')
    }
  }, [
    transcript,
    onTranscriptChange,
    isVoiceCommand,
    executeVoiceCommand,
    onCommand
  ])

  // Update language when it changes
  useEffect(() => {
    setCurrentLanguage(language)
  }, [language])

  if (!isSpeechSupported) {
    return null
  }

  const handleToggleListening = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening(continuousMode || isContinuousMode)
    }
  }

  const getCurrentLanguageName = () => {
    const lang = LANGUAGES.find(l => l.code === currentLanguage)
    return lang ? lang.native : currentLanguage
  }

  return (
    <TooltipProvider>
      <div className="flex items-center gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleToggleListening}
              disabled={disabled}
              className={`rounded-full transition-all duration-200 ${
                isListening 
                  ? 'animate-pulse bg-red-500/20 hover:bg-red-500/30 text-red-500 shadow-lg' 
                  : 'hover:bg-primary/10'
              }`}
            >
              {isListening ? (
                <MicOff className="size-4" />
              ) : (
                <Mic className="size-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isListening ? 'Stop recording' : 'Start voice input'}</p>
            <p className="text-xs text-muted-foreground">
              Current language: {getCurrentLanguageName()}
            </p>
          </TooltipContent>
        </Tooltip>

        <Popover open={showSettings} onOpenChange={setShowSettings}>
          <PopoverTrigger asChild>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  disabled={disabled}
                  className="rounded-full hover:bg-primary/10"
                >
                  <Settings className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Voice settings</p>
              </TooltipContent>
            </Tooltip>
          </PopoverTrigger>
          <PopoverContent className="w-96 max-h-[80vh] overflow-y-auto">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none flex items-center gap-2">
                  <Languages className="w-4 h-4" />
                  Voice Settings
                </h4>
                <p className="text-sm text-muted-foreground">
                  Adjust voice recognition and synthesis settings
                </p>
              </div>

              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="continuous-mode">Continuous Mode</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleContinuousMode}
                    className={
                      isContinuousMode ? 'bg-primary text-primary-foreground' : ''
                    }
                  >
                    <Repeat className="size-4 mr-1" />
                    {isContinuousMode ? 'On' : 'Off'}
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Language
                  </Label>
                  <Select value={currentLanguage} onValueChange={(value) => {
                    setCurrentLanguage(value)
                    setLanguage(value)
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      {LANGUAGES.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          <div className="flex items-center justify-between w-full">
                            <span>{lang.native}</span>
                            <Badge variant="secondary" className="ml-2 text-xs">
                              {lang.name}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Current: {getCurrentLanguageName()} ({currentLanguage})
                  </p>
                </div>

                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground">
                    <strong>Voice Commands:</strong> Say &quot;send message&quot;, &quot;clear&quot;, &quot;new chat&quot;, &quot;stop speaking&quot; to control the app.
                  </p>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </TooltipProvider>
  )
}

interface VoiceOutputButtonProps {
  text: string
  disabled?: boolean
  messageIndex?: number
}

export function VoiceOutputButton({
  text,
  disabled,
  messageIndex = 0
}: VoiceOutputButtonProps) {
  const {
    isSpeaking,
    speakingMessageIndex,
    isSpeechSupported,
    speak,
    stopSpeaking,
    pauseSpeaking,
    resumeSpeaking
  } = useVoice()

  const [isPaused, setIsPaused] = useState(false)

  if (!isSpeechSupported) {
    return null
  }

  const handleSpeak = () => {
    if (isSpeaking && speakingMessageIndex === messageIndex) {
      if (isPaused) {
        resumeSpeaking()
        setIsPaused(false)
      } else {
        pauseSpeaking()
        setIsPaused(true)
      }
    } else {
      speak(text, messageIndex)
      setIsPaused(false)
    }
  }

  const handleStop = () => {
    stopSpeaking()
    setIsPaused(false)
  }

  const isCurrentMessageSpeaking =
    isSpeaking && speakingMessageIndex === messageIndex

  return (
    <div className="flex items-center gap-1">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={handleSpeak}
        disabled={disabled}
        className="rounded-full"
      >
        {isCurrentMessageSpeaking ? (
          isPaused ? (
            <Play className="size-4" />
          ) : (
            <VolumeX className="size-4" />
          )
        ) : (
          <Volume2 className="size-4" />
        )}
      </Button>

      {isCurrentMessageSpeaking && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handleStop}
          disabled={disabled}
          className="rounded-full"
        >
          <Square className="size-4" />
        </Button>
      )}
    </div>
  )
}
