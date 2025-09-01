"use client"

import { ChatMessages } from '@/components/chat-messages'
import { Button } from '@/components/ui/button'
import { VoiceControls } from '@/components/voice-controls'
import { useChat } from 'ai/react'
import {
    ArrowDown,
    ArrowUp,
    Code,
    Globe,
    Lightbulb,
    RefreshCw,
    Sparkles,
    Square
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export interface PerfectChatProps {
  id?: string
  initialMessages?: any[]
  defaultModel?: any
  models?: any[]
}

export default function PerfectChat({ id, initialMessages, defaultModel, models }: PerfectChatProps) {
  const router = useRouter()
  const [selectedModel, setSelectedModel] = useState(defaultModel?.id || '')
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [showScrollButton, setShowScrollButton] = useState(false)

  const { messages, append, reload, stop, isLoading } = useChat({
    initialMessages,
    id,
    body: { selectedModel },
    onResponse(res) {
      if (res.status === 401) router.push('/login')
    }
  })

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    append({ role: 'user', content: input })
    setInput('')
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

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto'
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 150) + 'px'
    }
  }, [input])

  const isEmpty = messages.length === 0

  const suggestions = [
    { icon: Lightbulb, text: "Explain quantum computing in simple terms", color: "bg-yellow-500" },
    { icon: Code, text: "Help me debug this JavaScript code", color: "bg-green-500" },
    { icon: Globe, text: "What are the latest AI developments?", color: "bg-blue-500" },
    { icon: Sparkles, text: "Write a creative story about space travel", color: "bg-purple-500" }
  ]

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      {/* Minimal Header */}
      <div className="flex-shrink-0 border-b border-gray-200/50 dark:border-gray-800/50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Sybot AI</h1>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs text-gray-500 dark:text-gray-400">Online</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {isEmpty ? (
          /* Welcome Screen */
          <div className="h-full flex items-center justify-center p-6">
            <div className="max-w-3xl mx-auto text-center">
              {/* Hero Section */}
              <div className="mb-12">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center mx-auto mb-6 shadow-2xl">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Welcome to Sybot AI
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
                  Your intelligent AI assistant for conversations, coding, creativity, and problem-solving. 
                  Start by typing below or try one of these examples.
                </p>
              </div>

              {/* Suggestion Pills */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-12">
                {suggestions.map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={() => setInput(suggestion.text)}
                    className="group flex items-center gap-4 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-200 text-left shadow-sm hover:shadow-md"
                  >
                    <div className={`w-10 h-10 rounded-xl ${suggestion.color} flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                      <suggestion.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{suggestion.text}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Messages Area */
          <div className="h-full overflow-y-auto">
            <div className="max-w-5xl mx-auto px-6 py-8">
              <ChatMessages messages={messages} isLoading={isLoading} />
              <div ref={messagesEndRef} />
            </div>
          </div>
        )}
      </div>

      {/* Floating Input Composer */}
      <div className="flex-shrink-0 relative">
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-50 via-gray-50/80 to-transparent dark:from-gray-950 dark:via-gray-950/80 dark:to-transparent h-20 pointer-events-none" />
        
        <div className="relative bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-800/50">
          <div className="max-w-5xl mx-auto px-6 py-6">
            <form onSubmit={handleSubmit} className="relative">
              <div className="relative flex items-end gap-4 p-4 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xl shadow-gray-200/20 dark:shadow-gray-900/20">
                {/* Input Field */}
                <div className="flex-1 min-w-0">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask me anything..."
                    className="w-full bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none border-0 outline-none text-base leading-relaxed max-h-[150px] min-h-[24px] py-1"
                    rows={1}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <VoiceControls onVoiceInput={(text) => setInput(text)} />
                  
                  {isLoading ? (
                    <Button
                      type="button"
                      onClick={() => stop()}
                      size="sm"
                      className="h-10 w-10 p-0 rounded-2xl bg-red-500 hover:bg-red-600 text-white shadow-lg"
                    >
                      <Square className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={!input.trim()}
                      size="sm"
                      className="h-10 w-10 p-0 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Status & Helper Text */}
              <div className="flex items-center justify-between mt-3 px-4">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Press <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs">Enter</kbd> to send, <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs">Shift + Enter</kbd> for new line
                </p>
                {isLoading && (
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce" />
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                    <span>AI is thinking...</span>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      {!isEmpty && (
        <div className="fixed bottom-32 right-8 flex flex-col gap-3 z-50">
          {showScrollButton && (
            <Button
              onClick={scrollToBottom}
              size="sm"
              className="h-12 w-12 p-0 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl hover:shadow-2xl text-gray-700 dark:text-gray-300 hover:scale-110 transition-all duration-200"
            >
              <ArrowDown className="w-5 h-5" />
            </Button>
          )}
          {messages.length > 0 && (
            <Button
              onClick={() => { stop(); reload(); }}
              size="sm"
              className="h-12 w-12 p-0 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl hover:shadow-2xl text-gray-700 dark:text-gray-300 hover:scale-110 transition-all duration-200"
            >
              <RefreshCw className="w-5 h-5" />
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
