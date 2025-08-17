'use client'

import * as React from 'react'
import { createContext, useContext, useEffect, useState } from 'react'

// Define the settings structure
export interface Settings {
  // Model settings
  defaultModelId: string
  // UI settings
  showReasoning: boolean
  showSearchResults: boolean
  showVideoResults: boolean
  showRelatedQuestions: boolean
  // Voice settings
  voiceLanguage: string
  voiceContinuousMode: boolean
  voiceRate: number
  voicePitch: number
  voiceVolume: number
  // Export settings
  exportFormat: 'json' | 'txt' | 'md'
  // Theme settings
  theme: 'light' | 'dark' | 'system'
}

// Default settings
const DEFAULT_SETTINGS: Settings = {
  // Model settings
  defaultModelId: 'gpt-4o',
  // UI settings
  showReasoning: true,
  showSearchResults: true,
  showVideoResults: true,
  showRelatedQuestions: true,
  // Voice settings
  voiceLanguage: 'en-US',
  voiceContinuousMode: false,
  voiceRate: 1.0,
  voicePitch: 1.0,
  voiceVolume: 1.0,
  // Export settings
  exportFormat: 'json',
  // Theme settings
  theme: 'system'
}

// Create the context
interface SettingsContextType {
  settings: Settings
  updateSettings: (newSettings: Partial<Settings>) => void
  resetSettings: () => void
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
)

// Provider component
export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS)

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('sybot-settings')
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings)
        setSettings(prev => ({ ...prev, ...parsedSettings }))
      } catch (error) {
        console.error('Failed to parse settings from localStorage:', error)
      }
    }
  }, [])

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('sybot-settings', JSON.stringify(settings))
  }, [settings])

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }))
  }

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS)
  }

  return (
    <SettingsContext.Provider
      value={{ settings, updateSettings, resetSettings }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

// Hook to use the settings context
export function useSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
}

