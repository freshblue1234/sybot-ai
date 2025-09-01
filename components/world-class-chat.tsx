"use client"

import { ChatMessages } from '@/components/chat-messages'
import { Button } from '@/components/ui/button'
import { VoiceControls } from '@/components/voice-controls'
import { useVoice } from '@/contexts/voice-context'
import { useChat } from 'ai/react'
import {
  ArrowDown,
  Paperclip,
  RefreshCw,
  Send,
  Square
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export interface WorldClassChatProps {
  id?: string
  initialMessages?: any[]
  defaultModel?: any
  models?: any[]
}

export default function WorldClassChat({ id, initialMessages, defaultModel, models }: WorldClassChatProps) {
  const router = useRouter()
  const [selectedModel, setSelectedModel] = useState(defaultModel?.id || '')
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [showScrollButton, setShowScrollButton] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [wasVoiceInput, setWasVoiceInput] = useState(false)
  const [isThinking, setIsThinking] = useState(false)

  const { messages, append, reload, stop, isLoading } = useChat({
    initialMessages,
    id,
    body: { selectedModel },
    onResponse(res) {
      if (res.status === 401) router.push('/login')
    },
    onFinish() {
      setIsThinking(false)
    }
  })

  const { speakText, isSpeaking, isListening } = useVoice()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    append({ role: 'user', content: input })
    setInput('')
    setIsThinking(true)
    setTimeout(scrollToBottom, 100)
  }

  const handleVoiceInput = (text: string) => {
    if (!text.trim()) return
    
    // Set voice input flag and auto-submit
    setWasVoiceInput(true)
    setIsThinking(true)
    
    // Add user message and trigger AI response
    append({ role: 'user', content: text })
    setTimeout(scrollToBottom, 100)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 200
      setShowScrollButton(scrolled)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(scrollToBottom, 100)
    }
  }, [messages])

  // Auto-resize textarea with smooth animation
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto'
      const newHeight = Math.min(inputRef.current.scrollHeight, 160)
      inputRef.current.style.height = newHeight + 'px'
    }
  }, [input])

  // Typing indicator
  useEffect(() => {
    if (input.length > 0) {
      setIsTyping(true)
      const timer = setTimeout(() => setIsTyping(false), 1000)
      return () => clearTimeout(timer)
    } else {
      setIsTyping(false)
    }
  }, [input])

  // Auto-speak AI responses when voice input was used
  useEffect(() => {
    if (wasVoiceInput && messages.length > 0 && !isLoading) {
      const lastMessage = messages[messages.length - 1]
      if (lastMessage.role === 'assistant' && lastMessage.content) {
        // Small delay to ensure message is fully rendered
        setTimeout(() => {
          speakText(lastMessage.content)
          setWasVoiceInput(false)
        }, 500)
      }
    }
  }, [messages, wasVoiceInput, isLoading, speakText])

  // Also speak any AI response immediately (for direct voice interaction)
  useEffect(() => {
    if (messages.length > 0 && !isSpeaking) {
      const lastMessage = messages[messages.length - 1]
      if (lastMessage.role === 'assistant' && lastMessage.content && wasVoiceInput) {
        speakText(lastMessage.content)
      }
    }
  }, [messages, isSpeaking, speakText, wasVoiceInput])

  const isEmpty = messages.length === 0

  return (
    <div className="flex flex-col h-screen w-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-400/10 to-blue-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-gradient-to-br from-purple-400/10 to-pink-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      {/* Messages Area - Only show when there are messages */}
      {!isEmpty && (
        <main className="flex-1 overflow-hidden relative">
          <div className="h-full overflow-y-auto">
            <div className="w-full">
              <ChatMessages messages={messages} isLoading={isLoading} />
              <div ref={messagesEndRef} />
            </div>
          </div>
        </main>
      )}

      {/* Floating Composer - Centered when empty, bottom when chatting */}
      <footer className={`relative z-10 p-4 ${isEmpty ? 'flex-1 flex items-center justify-center' : ''}`}>
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="relative">
            {/* Main Input Container */}
            <div className="relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-lg">
              <div className="flex items-start gap-4 p-6">
                {/* Attachment Button */}
                <Button
                  type="button"
                  size="sm"
                  className="h-11 w-11 p-0 rounded-2xl bg-slate-100 dark:bg-slate-800 flex-shrink-0"
                >
                  <Paperclip className="w-5 h-5" />
                </Button>

                {/* Input Field */}
                <div className="flex-1 min-w-0 relative">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..."
                    className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 resize-none border-0 outline-none focus:outline-none focus:ring-0 text-base leading-relaxed max-h-40 min-h-[28px] py-0"
                    rows={1}
                  />
                </div>

                {/* Voice Controls */}
                <div className="flex-shrink-0">
                  <VoiceControls onVoiceInput={handleVoiceInput} />
                </div>

                {/* Send Button */}
                <div className="flex-shrink-0">
                  {isLoading ? (
                    <Button
                      type="button"
                      onClick={() => stop()}
                      size="sm"
                      className="h-11 w-11 p-0 rounded-2xl bg-red-500 text-white shadow-md"
                    >
                      <Square className="w-5 h-5" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={!input.trim()}
                      size="sm"
                      className="h-11 w-11 p-0 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-5 h-5" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      {!isEmpty && (
        <div className="fixed bottom-24 right-6 flex flex-col gap-2 z-50">
          {showScrollButton && (
            <Button
              onClick={scrollToBottom}
              size="sm"
              className="h-10 w-10 p-0 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-lg text-slate-700 dark:text-slate-300 hover:scale-105 transition-all duration-200"
            >
              <ArrowDown className="w-4 h-4" />
            </Button>
          )}
          {messages.length > 0 && (
            <Button
              onClick={() => { stop(); reload(); }}
              size="sm"
              className="h-10 w-10 p-0 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-lg text-slate-700 dark:text-slate-300 hover:scale-105 transition-all duration-200"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
