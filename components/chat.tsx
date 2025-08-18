'use client'

import { CHAT_ID } from '@/lib/constants'
import { useChat } from 'ai/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { toast } from 'sonner'
import { ChatMessages } from './chat-messages'
import { ChatPanel } from './chat-panel'
import { EmptyScreen } from './empty-screen'
import { ModelSelector } from './model-selector'
import { SearchModeToggle } from './search-mode-toggle'
import { VoiceControls } from './voice-controls'

export interface ChatProps extends React.ComponentProps<'div'> {
  id?: string
  initialMessages?: any[]
  savedMessages?: any[]
  models?: any[]
  initialQuery?: string
}

export function Chat({
  id,
  initialMessages,
  savedMessages,
  models,
  initialQuery,
  ...props
}: ChatProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialMessage = searchParams.get('message')

  const {
    messages,
    append,
    reload,
    stop,
    isLoading,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    error,
    data,
    setData
  } = useChat({
    initialMessages: savedMessages || initialMessages || [],
    id: CHAT_ID,
    body: {
      id,
      previewToken: null
    },
    onResponse(response) {
      if (response.status === 401) {
        router.refresh()
      }
    },
    onFinish: () => {
      if (id) {
        window.history.replaceState({}, '', `/search/${id}`)
      }
    },
    onError: error => {
      toast.error(`Error in chat: ${error.message}`)
    }
  })

  // Handle initial message from URL or props
  useEffect(() => {
    const messageToSend = initialQuery || initialMessage
    if (messageToSend && messages.length === 0) {
      // Add the initial message to the chat
      append({
        role: 'user',
        content: messageToSend
      })
    }
  }, [initialQuery, initialMessage, messages.length, append])

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div {...props} className="flex flex-col h-full">
      <div className="flex-1 flex flex-col min-h-0">
        {/* Header with controls */}
        <div className="flex items-center justify-between p-4 border-b border-border/50 bg-background/50 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <ModelSelector models={models || []} />
            <SearchModeToggle />
          </div>
          <VoiceControls onVoiceInput={text => setInput(text)} />
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-hidden">
          {messages.length === 0 ? (
            <EmptyScreen />
          ) : (
            <ChatMessages
              messages={messages}
              isLoading={isLoading}
              error={error}
              data={data}
            />
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input panel */}
        <ChatPanel
          id={id}
          isLoading={isLoading}
          stop={stop}
          append={append}
          reload={reload}
          messages={messages}
          input={input}
          setInput={setInput}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}
