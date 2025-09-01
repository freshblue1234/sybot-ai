"use client"

import { ChatMessages } from '@/components/chat-messages'
import { Button } from '@/components/ui/button'
import { VoiceControls } from '@/components/voice-controls'
import { useChat } from 'ai/react'
import {
    ArrowDown,
    Brain,
    MessageSquare,
    RefreshCw,
    Send,
    Sparkles,
    Square,
    Zap
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export interface UltimateChatProps {
  id?: string
  initialMessages?: any[]
  defaultModel?: any
  models?: any[]
}

export default function UltimateChat({ id, initialMessages, defaultModel, models }: UltimateChatProps) {
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
      const scrolled = window.scrollY > 300
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
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 120) + 'px'
    }
  }, [input])

  const isEmpty = messages.length === 0

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-950">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Sybot AI</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {defaultModel?.name || 'AI Assistant'} • Online
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-gray-500 dark:text-gray-400">Ready</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden">
        {isEmpty ? (
          /* Welcome Screen */
          <div className="h-full flex items-center justify-center p-6">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Welcome to Sybot AI
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg leading-relaxed">
                Your intelligent AI companion for conversations, creativity, and problem-solving.
                Ask me anything or start with one of these suggestions.
              </p>
              
              {/* Suggestion Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {[
                  { icon: Zap, title: "Quick Question", desc: "Get instant answers", color: "from-yellow-500 to-orange-500" },
                  { icon: Sparkles, title: "Creative Help", desc: "Generate ideas", color: "from-purple-500 to-pink-500" },
                  { icon: MessageSquare, title: "Deep Discussion", desc: "Explore topics", color: "from-blue-500 to-cyan-500" },
                  { icon: Brain, title: "Problem Solving", desc: "Work through challenges", color: "from-green-500 to-emerald-500" }
                ].map((item, i) => (
                  <button
                    key={i}
                    onClick={() => setInput(`Help me with ${item.title.toLowerCase()}`)}
                    className="group p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 text-left"
                  >
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <item.icon className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Messages Area */
          <div className="h-full overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              <ChatMessages messages={messages} isLoading={isLoading} />
              <div ref={messagesEndRef} />
            </div>
          </div>
        )}
      </main>

      {/* Input Area */}
      <footer className="sticky bottom-0 z-40 border-t border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto p-4">
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex items-end gap-3 p-3 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg">
              {/* Input */}
              <div className="flex-1 min-w-0">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  className="w-full bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none border-0 outline-none text-base leading-6 max-h-[120px] min-h-[24px]"
                  rows={1}
                />
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <VoiceControls onVoiceInput={(text) => setInput(text)} />
                
                {isLoading ? (
                  <Button
                    type="button"
                    onClick={() => stop()}
                    size="sm"
                    variant="outline"
                    className="h-9 w-9 p-0 rounded-xl border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950"
                  >
                    <Square className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={!input.trim()}
                    size="sm"
                    className="h-9 w-9 p-0 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Helper Text */}
            <div className="flex items-center justify-between mt-2 px-3">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Press Enter to send, Shift+Enter for new line
              </p>
              {isLoading && (
                <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                  <div className="w-1 h-1 rounded-full bg-blue-500 animate-bounce" />
                  <div className="w-1 h-1 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-1 h-1 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <span className="ml-2">Thinking...</span>
                </div>
              )}
            </div>
          </form>
        </div>
      </footer>

      {/* Floating Actions */}
      {!isEmpty && (
        <div className="fixed bottom-24 right-6 flex flex-col gap-2 z-30">
          {showScrollButton && (
            <Button
              onClick={scrollToBottom}
              size="sm"
              variant="outline"
              className="h-10 w-10 p-0 rounded-full bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl"
            >
              <ArrowDown className="w-4 h-4" />
            </Button>
          )}
          {messages.length > 0 && (
            <Button
              onClick={() => { stop(); reload(); }}
              size="sm"
              variant="outline"
              className="h-10 w-10 p-0 rounded-full bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
