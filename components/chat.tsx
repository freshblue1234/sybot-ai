'use client'

import { ChatMessages } from '@/components/chat-messages'
import { ChatPanel } from '@/components/chat-panel'
import { EmptyScreen } from '@/components/empty-screen'
import { ModelSelector } from '@/components/model-selector'
import { SearchModeToggle } from '@/components/search-mode-toggle'
import { Button } from '@/components/ui/button'
import { VoiceControls } from '@/components/voice-controls'
import { cn } from '@/lib/utils'
import { useChat } from 'ai/react'
import { ArrowDown, RefreshCw, Square } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export interface ChatProps extends React.ComponentProps<'div'> {
  id?: string
  initialMessages?: any[]
  defaultModel?: any
  models?: any[]
}

export function Chat({ id, initialMessages, defaultModel, models, className }: ChatProps) {
  const router = useRouter()
  const [selectedModel, setSelectedModel] = useState(defaultModel?.id || '')
  const [searchMode, setSearchMode] = useState<'search' | 'chat'>('chat')
  const { messages, append, reload, stop, isLoading, input, setInput, handleInputChange, handleSubmit } = useChat({
    initialMessages,
    id,
    body: {
      selectedModel,
      searchMode
    },
    onResponse(response) {
      if (response.status === 401) {
        router.push('/login')
      }
    }
  })

  const [isAtBottom, setIsAtBottom] = useState(true)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (defaultModel && !selectedModel) {
      setSelectedModel(defaultModel.id)
    }
  }, [defaultModel, selectedModel])

  const handleRefresh = () => {
    stop()
    reload()
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // Check if at bottom
  useEffect(() => {
    const handleScroll = () => {
      const element = document.querySelector('.overflow-y-auto')
      if (element) {
        const { scrollTop, scrollHeight, clientHeight } = element as HTMLElement
        setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 10)
      }
    }

    const element = document.querySelector('.overflow-y-auto')
    if (element) {
      element.addEventListener('scroll', handleScroll)
      return () => (element as HTMLElement).removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Compatibility fallbacks if useChat doesn't expose handlers
  const onInputChange = handleInputChange ?? ((e: React.ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value))
  const onSubmit = handleSubmit ?? ((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input?.trim()) return
    append({ role: 'user', content: input })
    setInput('')
  })

  return (
    <div className={cn('group relative h-full flex flex-col', className)}>
      {/* Decorative BG */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-grid-white/5 dark:bg-grid-white/10" />
        <div className="absolute -top-24 right-0 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      {/* Header */}
      <div className="border-b border-gray-700 bg-gray-900/60 backdrop-blur-sm p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-indigo-600 grid place-items-center text-white text-xs font-semibold">SB</div>
            <div>
              <div className="text-sm font-semibold">Sybot Assistant</div>
              <div className="text-xs text-gray-400">Online • Replies in seconds</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <SearchModeToggle />
            <VoiceControls onVoiceInput={text => setInput(text)} />
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto px-3 sm:px-4">
          {messages.length === 0 ? (
            <EmptyScreen />
          ) : (
            <ChatMessages
              messages={messages}
              isLoading={isLoading}
            />
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Composer */}
      <ChatPanel
        id={id}
        isLoading={isLoading}
        stop={stop}
        append={append}
        reload={reload}
        messages={messages}
        input={input}
        setInput={setInput}
        handleInputChange={onInputChange}
        handleSubmit={onSubmit}
      />

      {/* Floating Action Buttons */}
      <div className="absolute bottom-24 right-4 flex flex-col gap-2">
        {isLoading && (
          <Button
            variant="outline"
            size="icon"
            onClick={() => stop()}
            className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
          >
            <Square className="h-4 w-4" />
          </Button>
        )}
        {!isAtBottom && (
          <Button
            variant="outline"
            size="icon"
            onClick={scrollToBottom}
            className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
          >
            <ArrowDown className="h-4 w-4" />
          </Button>
        )}
        {messages.length > 0 && (
          <Button
            variant="outline"
            size="icon"
            onClick={handleRefresh}
            className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Hidden Model Selector for functionality */}
      <div className="hidden">
        <ModelSelector
          models={models || []}
          defaultModel={defaultModel}
        />
      </div>
    </div>
  )
}
