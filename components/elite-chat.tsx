"use client"

import { ChatMessages } from '@/components/chat-messages'
import { Button } from '@/components/ui/button'
import { VoiceControls } from '@/components/voice-controls'
import { useChat } from 'ai/react'
import {
    ArrowDown,
    ArrowUp,
    MessageSquare,
    Paperclip,
    RefreshCw,
    Sparkles,
    Square,
    Zap
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export interface EliteChatProps {
  id?: string
  initialMessages?: any[]
  defaultModel?: any
  models?: any[]
}

export default function EliteChat({ id, initialMessages, defaultModel, models }: EliteChatProps) {
  const router = useRouter()
  const [selectedModel, setSelectedModel] = useState(defaultModel?.id || '')
  const [input, setInput] = useState('')
  const [isVoiceActive, setIsVoiceActive] = useState(false)
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

  const isEmpty = messages.length === 0

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      {/* Main Content */}
      <div className="w-full">
        
        {/* Welcome Screen */}
        {isEmpty && (
          <div className="text-center py-16 animate-fade-in max-w-4xl mx-auto px-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <MessageSquare className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Welcome to Sybot Elite</h2>
            <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
              Experience the future of AI conversation. Ask anything, explore ideas, or let your creativity flow.
            </p>
            
            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-12">
              {[
                { icon: Zap, title: "Quick Start", desc: "Get instant answers to your questions" },
                { icon: Sparkles, title: "Creative Mode", desc: "Generate content and explore ideas" },
                { icon: MessageSquare, title: "Deep Chat", desc: "Have meaningful conversations" }
              ].map((item, i) => (
                <div key={i} className="group p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:bg-slate-800/50 transition-all duration-300 cursor-pointer backdrop-blur-sm">
                  <item.icon className="w-8 h-8 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        {!isEmpty && (
          <div className="mb-32">
            <ChatMessages messages={messages} isLoading={isLoading} />
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Floating Input */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-6 z-40">
        <form onSubmit={handleSubmit} className="relative">
          <div className="relative bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
            {/* Input Area */}
            <div className="flex items-end gap-3 p-4">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-slate-400 hover:text-white shrink-0 mb-1"
              >
                <Paperclip className="w-5 h-5" />
              </Button>
              
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask anything..."
                  className="w-full bg-transparent text-white placeholder-slate-400 resize-none border-0 outline-none text-base leading-6 max-h-32 min-h-[24px] py-0"
                  rows={1}
                  style={{
                    height: 'auto',
                    minHeight: '24px',
                    maxHeight: '128px'
                  }}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement
                    target.style.height = 'auto'
                    target.style.height = Math.min(target.scrollHeight, 128) + 'px'
                  }}
                />
              </div>

              <div className="flex items-center gap-2 shrink-0 mb-1">
                <VoiceControls 
                  onVoiceInput={(text) => setInput(text)}
                />
                
                {isLoading ? (
                  <Button
                    type="button"
                    onClick={() => stop()}
                    size="sm"
                    className="bg-red-500 hover:bg-red-600 text-white rounded-xl px-4"
                  >
                    <Square className="w-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={!input.trim()}
                    size="sm"
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl px-4 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Status Bar */}
            <div className="px-4 pb-3 flex items-center justify-between text-xs text-slate-500">
              <span>Press Enter to send, Shift+Enter for new line</span>
              <div className="flex items-center gap-2">
                {isLoading && (
                  <div className="flex items-center gap-1">
                    <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" />
                    <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <span className="ml-2">AI is thinking...</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Floating Actions */}
      {!isEmpty && (
        <div className="fixed bottom-32 right-6 flex flex-col gap-3 z-30">
          {showScrollButton && (
            <Button
              onClick={scrollToBottom}
              size="sm"
              className="bg-slate-800/90 backdrop-blur-sm border border-slate-700/50 text-white hover:bg-slate-700/90 rounded-xl shadow-lg"
            >
              <ArrowDown className="w-4 h-4" />
            </Button>
          )}
          {messages.length > 0 && (
            <Button
              onClick={() => { stop(); reload(); }}
              size="sm"
              className="bg-slate-800/90 backdrop-blur-sm border border-slate-700/50 text-white hover:bg-slate-700/90 rounded-xl shadow-lg"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
