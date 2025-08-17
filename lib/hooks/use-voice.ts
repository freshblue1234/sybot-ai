'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

export function useVoice() {
  // Speech recognition states
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [isSpeechSupported, setIsSpeechSupported] = useState(true)
  const [isContinuousMode, setIsContinuousMode] = useState(false)
  const [language, setLanguage] = useState('en-US')
  const [recognitionError, setRecognitionError] = useState<string | null>(null)

  // Speech synthesis states
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [speakingMessageIndex, setSpeakingMessageIndex] = useState<
    number | null
  >(null)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [selectedVoice, setSelectedVoice] =
    useState<SpeechSynthesisVoice | null>(null)
  const [speechRate, setSpeechRate] = useState(1.0)
  const [speechPitch, setSpeechPitch] = useState(1.0)
  const [speechVolume, setSpeechVolume] = useState(1.0)

  // Refs
  const recognitionRef = useRef<any>(null)
  const utteranceRef = useRef<any>(null)
  const finalTranscriptRef = useRef('')

  // Check browser support
  useEffect(() => {
    const isSupported =
      typeof window !== 'undefined' &&
      ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) &&
      'speechSynthesis' in window

    setIsSpeechSupported(isSupported)

    if (!isSupported) return

    // Initialize speech recognition
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition
    recognitionRef.current = new SpeechRecognition()
    recognitionRef.current.continuous = isContinuousMode
    recognitionRef.current.interimResults = true
    recognitionRef.current.lang = language

    recognitionRef.current.onresult = (event: any) => {
      let interimTranscript = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          finalTranscriptRef.current += transcript + ' '
          setTranscript(prev => prev + transcript + ' ')
        } else {
          interimTranscript += transcript
        }
      }
      // Only update with interim results if we're not in continuous mode
      // or if we want to show interim results
      if (!isContinuousMode || interimTranscript) {
        setTranscript(finalTranscriptRef.current + interimTranscript)
      }
    }

    recognitionRef.current.onerror = (event: any) => {
      console.error('Speech recognition error', event)
      let errorMessage = 'Speech recognition error'
      
      switch (event.error) {
        case 'no-speech':
          errorMessage = 'No speech detected. Please try again.'
          break
        case 'audio-capture':
          errorMessage = 'Microphone not found or permission denied.'
          break
        case 'not-allowed':
          errorMessage = 'Microphone permission denied. Please allow microphone access.'
          break
        case 'network':
          errorMessage = 'Network error occurred during speech recognition.'
          break
        case 'service-not-allowed':
          errorMessage = 'Speech recognition service not allowed.'
          break
        case 'bad-grammar':
          errorMessage = 'Speech recognition grammar error.'
          break
        case 'language-not-supported':
          errorMessage = `Language ${language} is not supported.`
          break
        default:
          errorMessage = `Speech recognition error: ${event.error}`
      }
      
      setRecognitionError(errorMessage)
      setIsListening(false)
      
      // Clear error after 5 seconds
      setTimeout(() => {
        setRecognitionError(null)
      }, 5000)
    }

    recognitionRef.current.onend = () => {
      // In continuous mode, restart recognition
      if (isContinuousMode && isListening) {
        try {
          recognitionRef.current.start()
        } catch (error) {
          console.error('Error restarting recognition:', error)
          setIsListening(false)
        }
      } else {
        setIsListening(false)
      }
    }

    // Initialize speech synthesis
    const loadVoices = () => {
      if (window.speechSynthesis) {
        const availableVoices = window.speechSynthesis.getVoices()
        setVoices(availableVoices)
        if (availableVoices.length > 0) {
          // Select a default voice
          const defaultVoice =
            availableVoices.find(voice => voice.default) || availableVoices[0]
          setSelectedVoice(defaultVoice)
        }
      }
    }

    // Load voices when they become available
    if (window.speechSynthesis) {
      loadVoices()
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel()
      }
    }
  }, [isContinuousMode, language])

  // Speech recognition functions
  const startListening = useCallback(
    (continuous = false) => {
      if (!isSpeechSupported || !recognitionRef.current) return

      setIsContinuousMode(continuous)
      finalTranscriptRef.current = ''
      setTranscript('')
      setIsListening(true)

      // Update continuous mode in recognition
      recognitionRef.current.continuous = continuous

      try {
        recognitionRef.current.start()
      } catch (error) {
        console.error('Error starting recognition:', error)
        setIsListening(false)
      }
    },
    [isSpeechSupported]
  )

  const stopListening = useCallback(() => {
    if (!isSpeechSupported || !recognitionRef.current) return

    setIsListening(false)
    recognitionRef.current.stop()
  }, [isSpeechSupported])

  const toggleContinuousMode = useCallback(() => {
    setIsContinuousMode(prev => !prev)
  }, [])

  // Speech synthesis functions
  const speak = useCallback(
    (text: string, messageIndex: number | null = null, onEnd?: () => void) => {
      if (!isSpeechSupported || !window.speechSynthesis) return

      // Cancel any ongoing speech
      window.speechSynthesis.cancel()

      const utterance = new (window as any).SpeechSynthesisUtterance(text)
      utteranceRef.current = utterance

      // Set utterance properties
      if (selectedVoice) {
        utterance.voice = selectedVoice
      }
      utterance.rate = speechRate
      utterance.pitch = speechPitch
      utterance.volume = speechVolume

      utterance.onstart = () => {
        setIsSpeaking(true)
        setSpeakingMessageIndex(messageIndex)
      }

      utterance.onend = () => {
        setIsSpeaking(false)
        setSpeakingMessageIndex(null)
        if (onEnd) onEnd()
      }

      utterance.onerror = () => {
        setIsSpeaking(false)
        setSpeakingMessageIndex(null)
      }

      window.speechSynthesis.speak(utterance)
    },
    [isSpeechSupported, selectedVoice, speechRate, speechPitch, speechVolume]
  )

  const stopSpeaking = useCallback(() => {
    if (!isSpeechSupported || !window.speechSynthesis) return

    window.speechSynthesis.cancel()
    setIsSpeaking(false)
    setSpeakingMessageIndex(null)
  }, [isSpeechSupported])

  const pauseSpeaking = useCallback(() => {
    if (!isSpeechSupported || !window.speechSynthesis) return

    window.speechSynthesis.pause()
  }, [isSpeechSupported])

  const resumeSpeaking = useCallback(() => {
    if (!isSpeechSupported || !window.speechSynthesis) return

    window.speechSynthesis.resume()
  }, [isSpeechSupported])

  // Voice command functions
  const isVoiceCommand = useCallback((text: string) => {
    const lowerText = text.toLowerCase().trim()
    return (
      lowerText.includes('send message') ||
      lowerText.includes('submit') ||
      lowerText.includes('send') ||
      lowerText.includes('clear') ||
      lowerText.includes('reset') ||
      lowerText.includes('new chat') ||
      lowerText.includes('stop speaking') ||
      lowerText.includes('pause') ||
      lowerText.includes('resume')
    )
  }, [])

  const executeVoiceCommand = useCallback(
    (text: string, commandHandler: (command: string) => void) => {
      const lowerText = text.toLowerCase().trim()

      if (
        lowerText.includes('send message') ||
        lowerText.includes('submit') ||
        lowerText.includes('send')
      ) {
        commandHandler('send')
      } else if (lowerText.includes('clear') || lowerText.includes('reset')) {
        commandHandler('clear')
      } else if (lowerText.includes('new chat')) {
        commandHandler('newChat')
      } else if (lowerText.includes('stop speaking')) {
        commandHandler('stopSpeaking')
      } else if (lowerText.includes('pause')) {
        commandHandler('pauseSpeaking')
      } else if (lowerText.includes('resume')) {
        commandHandler('resumeSpeaking')
      }
    },
    []
  )

  return {
    // Speech recognition
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
    executeVoiceCommand,
    recognitionError,

    // Speech synthesis
    isSpeaking,
    speakingMessageIndex,
    voices,
    selectedVoice,
    setSelectedVoice,
    speechRate,
    setSpeechRate,
    speechPitch,
    setSpeechPitch,
    speechVolume,
    setSpeechVolume,
    speak,
    stopSpeaking,
    pauseSpeaking,
    resumeSpeaking
  }
}
