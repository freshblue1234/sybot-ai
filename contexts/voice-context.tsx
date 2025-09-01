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
  startListening: () => void
  stopListening: () => void
  onVoiceInput: (callback: (text: string) => void) => void
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
  const recognitionRef = useRef<any>(null)
  const voiceInputCallbackRef = useRef<((text: string) => void) | null>(null)

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

  // Initialize speech recognition
  useEffect(() => {
    if (!isMounted || !isSupported || typeof window === 'undefined') return

    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition()
        const recognition = recognitionRef.current
        
        recognition.continuous = false
        recognition.interimResults = true
        recognition.lang = recognitionLanguage

        recognition.onstart = () => {
          setIsListening(true)
        }

        recognition.onresult = (event: any) => {
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

          if (finalTranscript && voiceInputCallbackRef.current) {
            voiceInputCallbackRef.current(finalTranscript)
            recognition.stop()
          }
        }

        recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error)
          setIsListening(false)
        }

        recognition.onend = () => {
          setIsListening(false)
        }
      }
    } catch (error) {
      console.error('Error initializing speech recognition:', error)
    }
  }, [isMounted, isSupported, recognitionLanguage])

  const speakText = useCallback((text: string) => {
    if (!isMounted || !isSupported || !text) return;
    
    try {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      // Create a new utterance
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = synthesisLanguage;
      utterance.rate = speechRate;
      utterance.pitch = speechPitch;
      
      // Set up event handlers
      utterance.onstart = () => {
        setIsSpeaking(true);
      };
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        setIsSpeaking(false);
      };
      
      // Select a voice
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        // Try to find a female voice
        const femaleVoice = voices.find(voice => 
          voice.name.toLowerCase().includes('female') ||
          voice.name.toLowerCase().includes('woman') ||
          voice.name.toLowerCase().includes('samantha') ||
          voice.name.toLowerCase().includes('susan') ||
          voice.name.toLowerCase().includes('karen') ||
          (voice.lang === synthesisLanguage && voice.name.toLowerCase().includes('f'))
        );
        
        if (femaleVoice) {
          utterance.voice = femaleVoice;
        } else if (voices.length > 0) {
          // Fallback to first available voice in the selected language
          const langVoices = voices.filter(v => v.lang.startsWith(synthesisLanguage.split('-')[0]));
          utterance.voice = langVoices.length > 0 ? langVoices[0] : voices[0];
        }
      }
      
      // Speak the text
      window.speechSynthesis.speak(utterance);
      
    } catch (error) {
      console.error('Error in speakText:', error);
      setIsSpeaking(false);
    }
  }, [isMounted, isSupported, synthesisLanguage, speechRate, speechPitch]);

  const stopSpeaking = useCallback(() => {
    if (isMounted && isSupported && typeof window !== 'undefined') {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [isMounted, isSupported]);

  const startListening = useCallback(() => {
    if (!isMounted || !recognitionRef.current || isListening || !isSupported) {
      return
    }

    try {
      recognitionRef.current.start()
    } catch (error) {
      console.error('Error starting speech recognition:', error)
      setIsListening(false)
    }
  }, [isMounted, isListening, isSupported])

  const stopListening = useCallback(() => {
    if (!isMounted || !recognitionRef.current || !isListening || !isSupported) {
      return
    }

    try {
      recognitionRef.current.stop()
    } catch (error) {
      console.error('Error stopping speech recognition:', error)
      setIsListening(false)
    }
  }, [isMounted, isListening, isSupported])

  const onVoiceInput = useCallback((callback: (text: string) => void) => {
    voiceInputCallbackRef.current = callback
  }, [])

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
    stopSpeaking,
    startListening,
    stopListening,
    onVoiceInput
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