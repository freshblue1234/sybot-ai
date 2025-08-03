'use client'

<<<<<<< HEAD
import { useChat } from 'ai/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'
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
}

export function Chat({ id, initialMessages, savedMessages, models, ...props }: ChatProps) {
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
    data
  } = useChat({
    initialMessages: savedMessages || initialMessages || [],
    id,
    body: {
      id,
      previewToken: null
    },
    onResponse(response) {
      if (response.status === 401) {
        router.refresh()
      }
    }
  })

  // Handle initial message from URL
  useEffect(() => {
    if (initialMessage && messages.length === 0) {
      // Add the initial message to the chat
      append({
        role: 'user',
        content: initialMessage
      })
    }
  }, [initialMessage, messages.length, append])

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div
      {...props}
      className="flex flex-col h-full"
    >
      <div className="flex-1 flex flex-col min-h-0">
        {/* Header with controls */}
        <div className="flex items-center justify-between p-4 border-b border-border/50 bg-background/50 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <ModelSelector models={models || []} />
            <SearchModeToggle />
          </div>
          <VoiceControls onVoiceInput={(text) => setInput(text)} />
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
=======
import { CHAT_ID } from '@/lib/constants'
import { Model } from '@/lib/types/models'
import { useChat } from '@ai-sdk/react'
import { Message } from 'ai/react'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { ChatMessages } from './chat-messages'
import { ChatPanel } from './chat-panel'

export function Chat({
  id,
  savedMessages = [],
  query,
  models
}: {
  id: string
  savedMessages?: Message[]
  query?: string
  models?: Model[]
}) {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    status,
    setMessages,
    stop,
    append,
    data,
    setData,
    addToolResult
  } = useChat({
    initialMessages: savedMessages,
    id: CHAT_ID,
    body: {
      id
    },
    onFinish: () => {
      window.history.replaceState({}, '', `/search/${id}`)
    },
    onError: error => {
      toast.error(`Error in chat: ${error.message}`)
    },
    sendExtraMessageFields: false, // Disable extra message fields,
    experimental_throttle: 100
  })

  const isLoading = status === 'submitted' || status === 'streaming'

  useEffect(() => {
    setMessages(savedMessages)
  }, [id])

  const onQuerySelect = (query: string) => {
    append({
      role: 'user',
      content: query
    })
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setData(undefined) // reset data to clear tool call
    handleSubmit(e)
  }

  return (
    <div className="flex flex-col w-full max-w-3xl pt-14 pb-32 mx-auto stretch">
      <ChatMessages
        messages={messages}
        data={data}
        onQuerySelect={onQuerySelect}
        isLoading={isLoading}
        chatId={id}
        addToolResult={addToolResult}
      />
      <ChatPanel
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={onSubmit}
        isLoading={isLoading}
        messages={messages}
        setMessages={setMessages}
        stop={stop}
        query={query}
        append={append}
        models={models}
      />
>>>>>>> 41155a42ae5ee50065317213a1704586c96f7cfd
    </div>
  )
}
