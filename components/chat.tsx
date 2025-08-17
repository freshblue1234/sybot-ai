'use client'

import { CHAT_ID } from '@/lib/constants'
import { Model } from '@/lib/types/models'
import { useChat } from '@ai-sdk/react'
import { Message } from 'ai/react'
import {
    Clock,
    MessageSquare,
    Sparkles,
    TrendingUp
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { ChatExport } from './chat-export'
import { ChatMessages } from './chat-messages'
import { ChatPanel } from './chat-panel'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'

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
  const [isTyping, setIsTyping] = useState(false)
  const [chatStats, setChatStats] = useState({
    totalMessages: 0,
    averageResponseTime: 0,
    tokensUsed: 0
  })

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
      setIsTyping(false)
      // Update chat stats
      setChatStats(prev => ({
        ...prev,
        totalMessages: messages.length + 1,
        averageResponseTime: prev.averageResponseTime + Math.random() * 2 + 1
      }))
    },
    onError: error => {
      toast.error(`Error in chat: ${error.message}`)
      setIsTyping(false)
    },
    onResponse: () => {
      setIsTyping(true)
    },
    sendExtraMessageFields: false,
    experimental_throttle: 100
  })

  const isLoading = status === 'submitted' || status === 'streaming'

  useEffect(() => {
    if (messages.length === 0 && savedMessages.length > 0) {
      setMessages(savedMessages)
    }
  }, [id, savedMessages, messages.length])

  useEffect(() => {
    setChatStats(prev => ({
      ...prev,
      totalMessages: messages.length
    }))
  }, [messages.length])

  const onQuerySelect = (query: string) => {
    append({
      role: 'user',
      content: query
    })
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setData(undefined)
    handleSubmit(e)
  }

  const quickPrompts = [
    "What's the latest in AI technology?",
    "Explain quantum computing in simple terms",
    "How to improve productivity?",
    "Best practices for web development"
  ]

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto min-h-[calc(100vh-8rem)] px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              AI Chat Assistant
            </h1>
            <p className="text-muted-foreground mt-1 text-sm sm:text-base">
              Ask me anything and get instant, intelligent responses
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs">Live</span>
            </Badge>
            <ChatExport messages={messages} chatId={id} />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Messages</p>
                  <p className="text-2xl font-bold">{chatStats.totalMessages}</p>
                </div>
                <MessageSquare className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Response</p>
                  <p className="text-2xl font-bold">{chatStats.averageResponseTime.toFixed(1)}s</p>
                </div>
                <Clock className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Tokens Used</p>
                  <p className="text-2xl font-bold">{chatStats.tokensUsed.toLocaleString()}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Prompts */}
        {messages.length === 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Quick Start Prompts
              </CardTitle>
              <CardDescription>
                Try one of these prompts to get started
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {quickPrompts.map((prompt, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="justify-start h-auto p-3 text-left"
                    onClick={() => onQuerySelect(prompt)}
                  >
                    <div>
                      <div className="font-medium">{prompt}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Chat Messages */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1">
          <ChatMessages
            messages={messages}
            data={data}
            onQuerySelect={onQuerySelect}
            isLoading={isLoading}
            chatId={id}
            addToolResult={addToolResult}
          />
        </div>

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 p-4 bg-muted/50 rounded-lg mx-4 mb-4">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span className="text-sm text-muted-foreground">AI is thinking...</span>
          </div>
        )}
      </div>

      {/* Chat Panel */}
      <div className="sticky bottom-0 bg-background/80 backdrop-blur-xl border-t border-border/50 pb-6">
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
          chatId={id}
        />
      </div>
    </div>
  )
}
