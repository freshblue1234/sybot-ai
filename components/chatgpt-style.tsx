"use client"

import { ChatMessages } from '@/components/chat-messages'
import { Button } from '@/components/ui/button'
import { useChat } from 'ai/react'
import {
    ArrowDown,
    ArrowUp,
    RefreshCw,
    Sparkles,
    Square
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export interface ChatGPTStyleProps {
  id?: string
  initialMessages?: any[]
  defaultModel?: any
  models?: any[]
}

export default function ChatGPTStyle({ id, initialMessages, defaultModel, models }: ChatGPTStyleProps) {
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
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 200) + 'px'
    }
  }, [input])

  const isEmpty = messages.length === 0

  const examples = [
    "Explain quantum computing in simple terms",
    "Write a haiku about recursion",
    "How do I make an HTTP request in Javascript?",
    "What are 5 creative uses for a paperclip?"
  ]

  return (
    <div className="flex flex-col h-screen w-screen bg-white dark:bg-gray-800 m-0 p-0">
      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {isEmpty ? (
          /* Welcome Screen - ChatGPT Style */
          <div className="h-full flex flex-col items-center justify-center px-6">
            <div className="max-w-2xl w-full text-center">
              {/* Logo */}
              <div className="mb-8">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-2">
                  How can I help you today?
                </h1>
              </div>

              {/* Example Prompts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                {examples.map((example, i) => (
                  <button
                    key={i}
                    onClick={() => setInput(example)}
                    className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-left"
                  >
                    <div className="text-sm text-gray-800 dark:text-gray-200">
                      {example}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Messages Area */
          <div className="h-full overflow-y-auto">
            <div className="w-full">
              <ChatMessages messages={messages} isLoading={isLoading} />
              <div ref={messagesEndRef} />
            </div>
          </div>
        )}
      </div>

      {/* Input Area - ChatGPT Style */}
      <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="w-full px-6 py-4">
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex items-end gap-3 p-4 rounded-2xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm">
              {/* Input */}
              <div className="flex-1 min-w-0">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Message ChatGPT..."
                  className="w-full bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none border-0 outline-none text-base leading-6 max-h-[200px] min-h-[24px]"
                  rows={1}
                />
              </div>

              {/* Send Button */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {isLoading ? (
                  <Button
                    type="button"
                    onClick={() => stop()}
                    size="sm"
                    className="h-8 w-8 p-0 rounded-lg bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-600 dark:text-gray-300"
                  >
                    <Square className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={!input.trim()}
                    size="sm"
                    className="h-8 w-8 p-0 rounded-lg bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Footer Text */}
            <div className="text-center mt-2">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                ChatGPT can make mistakes. Check important info.
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Floating Actions */}
      {!isEmpty && (
        <div className="fixed bottom-24 right-6 flex flex-col gap-2 z-50">
          {showScrollButton && (
            <Button
              onClick={scrollToBottom}
              size="sm"
              className="h-10 w-10 p-0 rounded-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow-lg text-gray-600 dark:text-gray-300"
            >
              <ArrowDown className="w-4 h-4" />
            </Button>
          )}
          {messages.length > 0 && (
            <Button
              onClick={() => { stop(); reload(); }}
              size="sm"
              className="h-10 w-10 p-0 rounded-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow-lg text-gray-600 dark:text-gray-300"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
