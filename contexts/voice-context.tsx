'use client'

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

interface VoiceContextType {
  isListening: boolean
  setIsListening: (listening: boolean) => void
  isSpeaking: boolean
  setIsSpeaking: (speaking: boolean) => void
  recognitionLanguage: string
  setRecognitionLanguage: (language: string) => void
  synthesisLanguage: string
  setSynthesisLanguage: (language: string) => void
  speechRate: number
  setSpeechRate: (rate: number) => void
  speechPitch: number
  setSpeechPitch: (pitch: number) => void
  autoSpeak: boolean
  setAutoSpeak: (auto: boolean) => void
  isSupported: boolean
  speakText: (text: string) => void
  stopSpeaking: () => void
}

const VoiceContext = createContext<VoiceContextType | undefined>(undefined)

export function VoiceProvider({ children }: { children: React.ReactNode }) {
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [recognitionLanguage, setRecognitionLanguage] = useState('en-US')
  const [synthesisLanguage, setSynthesisLanguage] = useState('en-US')
  const [speechRate, setSpeechRate] = useState(1)
  const [speechPitch, setSpeechPitch] = useState(1)
  const [autoSpeak, setAutoSpeak] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const synthesisRef = useRef<SpeechSynthesisUtterance | null>(null)

  // Set mounted state to prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Check browser support only after mount
  useEffect(() => {
    if (!isMounted) return

    const hasSpeechRecognition = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window
    const hasSpeechSynthesis = 'speechSynthesis' in window
    setIsSupported(hasSpeechRecognition && hasSpeechSynthesis)
  }, [isMounted])

  // Initialize speech synthesis only after mount and support check
  useEffect(() => {
    if (!isMounted || !isSupported || typeof window === 'undefined') return

    try {
      const synthesis = new SpeechSynthesisUtterance()
      synthesis.lang = synthesisLanguage
      synthesis.rate = speechRate
      synthesis.pitch = speechPitch
      synthesis.volume = 1

      synthesis.onstart = () => {
        setIsSpeaking(true)
      }

      synthesis.onend = () => {
        setIsSpeaking(false)
      }

      synthesis.onerror = (event) => {
        console.error('Speech synthesis error:', event.error)
        setIsSpeaking(false)
      }

      synthesisRef.current = synthesis
    } catch (error) {
      console.error('Error initializing speech synthesis:', error)
      setIsSupported(false)
    }
  }, [isMounted, isSupported, synthesisLanguage, speechRate, speechPitch])

  // Update synthesis when settings change
  useEffect(() => {
    if (!isMounted || !synthesisRef.current || typeof window === 'undefined') return

    try {
      synthesisRef.current.lang = synthesisLanguage
      synthesisRef.current.rate = speechRate
      synthesisRef.current.pitch = speechPitch
    } catch (error) {
      console.error('Error updating synthesis settings:', error)
    }
  }, [isMounted, synthesisRef, synthesisLanguage, speechRate, speechPitch])

  const speakText = useCallback((text: string) => {
    if (!isMounted || typeof window === 'undefined' || !synthesisRef.current || isSpeaking || !isSupported) {
      return
    }

    try {
      synthesisRef.current.text = text
      window.speechSynthesis.speak(synthesisRef.current)
    } catch (error) {
      console.error('Error speaking text:', error)
    }
  }, [isMounted, isSpeaking, isSupported, synthesisRef])

  const stopSpeaking = useCallback(() => {
    if (!isMounted || typeof window === 'undefined' || !isSpeaking || !isSupported) {
      return
    }

    try {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    } catch (error) {
      console.error('Error stopping speech:', error)
    }
  }, [isMounted, isSpeaking, isSupported])

  const value: VoiceContextType = {
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
    isSupported: isMounted ? isSupported : false, // Only show supported after mount
    speakText,
    stopSpeaking
  }

  return (
    <VoiceContext.Provider value={value}>
      {children}
    </VoiceContext.Provider>
  )
}

export function useVoice() {
  const context = useContext(VoiceContext)
  if (context === undefined) {
    throw new Error('useVoice must be used within a VoiceProvider')
  }
  return context
} 