<<<<<<< HEAD
'use client'

import { JSONValue, Message } from 'ai'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { RenderMessage } from './render-message'
import { ToolSection } from './tool-section'

export interface ChatMessagesProps {
  messages: Message[]
  isLoading?: boolean
  error?: Error | null
  data?: JSONValue[]
=======
import { JSONValue, Message } from 'ai'
import { useEffect, useMemo, useRef, useState } from 'react'
import { RenderMessage } from './render-message'
import { ToolSection } from './tool-section'
import { Spinner } from './ui/spinner'

interface ChatMessagesProps {
  messages: Message[]
  data: JSONValue[] | undefined
  onQuerySelect: (query: string) => void
  isLoading: boolean
  chatId?: string
  addToolResult?: (params: { toolCallId: string; result: any }) => void
>>>>>>> 41155a42ae5ee50065317213a1704586c96f7cfd
}

export function ChatMessages({
  messages,
<<<<<<< HEAD
  isLoading,
  error,
  data
}: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(true)

  // Scroll to bottom function
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: messages.length > 5 ? 'instant' : 'smooth'
    })
  }, [messages.length])

  // Scroll to bottom on mount and when messages change or during streaming
  useEffect(() => {
    if (isScrolledToBottom) {
      scrollToBottom()
    }
  }, [messages, isLoading, scrollToBottom, isScrolledToBottom])

  // Auto-scroll during streaming
  useEffect(() => {
    if (isLoading && isScrolledToBottom) {
      const intervalId = setInterval(scrollToBottom, 100)
      return () => {
        if (intervalId) clearInterval(intervalId)
      }
    }
  }, [messages.length, isLoading, messages, scrollToBottom, isScrolledToBottom])

  useEffect(() => {
    const handleScroll = () => {
      const element = messagesEndRef.current?.parentElement
      if (element) {
        const { scrollTop, scrollHeight, clientHeight } = element
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 100
        setIsScrolledToBottom(isAtBottom)
      }
    }

    const element = messagesEndRef.current?.parentElement
    if (element) {
      element.addEventListener('scroll', handleScroll)
      return () => element.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Group messages by tool calls
  const groupedMessages = useMemo(() => {
    const groups: Array<{
      messages: Message[]
      toolCalls?: any[]
    }> = []
    let currentGroup: typeof groups[0] = { messages: [] }

    for (const message of messages) {
      if (message.role === 'tool') {
        // Add tool message to current group
        currentGroup.messages.push(message)
      } else if (message.toolInvocations && message.toolInvocations.length > 0) {
        // Start new group with tool calls
        if (currentGroup.messages.length > 0) {
          groups.push(currentGroup)
        }
        currentGroup = {
          messages: [message],
          toolCalls: message.toolInvocations
        }
      } else {
        // Regular message
        currentGroup.messages.push(message)
      }
    }

    if (currentGroup.messages.length > 0) {
      groups.push(currentGroup)
    }

    return groups
  }, [messages])

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
      {groupedMessages.map((group, index) => (
        <div key={index} className="space-y-4">
          {group.messages.map((message, messageIndex) => (
            <RenderMessage
              key={message.id || messageIndex}
              message={message}
              isLast={index === groupedMessages.length - 1 && messageIndex === group.messages.length - 1}
            />
          ))}
          
          {group.toolCalls && (
            <ToolSection
              toolCalls={group.toolCalls}
              data={data}
            />
          )}
        </div>
      ))}

      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            <span className="ml-2 text-sm">AI is thinking...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-center justify-center py-8">
          <div className="text-center text-red-500">
            <p className="text-sm font-medium">Something went wrong</p>
            <p className="text-xs text-muted-foreground mt-1">
              {error.message}
            </p>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
=======
  data,
  onQuerySelect,
  isLoading,
  chatId,
  addToolResult
}: ChatMessagesProps) {
  const [openStates, setOpenStates] = useState<Record<string, boolean>>({})
  const manualToolCallId = 'manual-tool-call'

  // Add ref for the messages container
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom function
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: messages.length > 5 ? 'instant' : 'smooth'
    })
  }

  // Scroll to bottom on mount and when messages change or during streaming
  useEffect(() => {
    scrollToBottom()

    // Set up interval for continuous scrolling during streaming
    let intervalId: ReturnType<typeof setInterval> | undefined

    if (isLoading && messages[messages.length - 1]?.role === 'user') {
      intervalId = setInterval(scrollToBottom, 100)
    }

    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [messages.length, isLoading, messages])

  useEffect(() => {
    const lastMessage = messages[messages.length - 1]
    if (lastMessage?.role === 'user') {
      setOpenStates({ [manualToolCallId]: true })
    }
  }, [messages])

  // get last tool data for manual tool call
  const lastToolData = useMemo(() => {
    if (!data || !Array.isArray(data) || data.length === 0) return null

    const lastItem = data[data.length - 1] as {
      type: 'tool_call'
      data: {
        toolCallId: string
        state: 'call' | 'result'
        toolName: string
        args: string
      }
    }

    if (lastItem.type !== 'tool_call') return null

    const toolData = lastItem.data
    return {
      state: 'call' as const,
      toolCallId: toolData.toolCallId,
      toolName: toolData.toolName,
      args: toolData.args ? JSON.parse(toolData.args) : undefined
    }
  }, [data])

  if (!messages.length) return null

  const lastUserIndex =
    messages.length -
    1 -
    [...messages].reverse().findIndex(msg => msg.role === 'user')

  const showLoading = isLoading && messages[messages.length - 1].role === 'user'

  const getIsOpen = (id: string) => {
    if (id.includes('call')) {
      return openStates[id] ?? true
    }
    const baseId = id.endsWith('-related') ? id.slice(0, -8) : id
    const index = messages.findIndex(msg => msg.id === baseId)
    return openStates[id] ?? index >= lastUserIndex
  }

  const handleOpenChange = (id: string, open: boolean) => {
    setOpenStates(prev => ({
      ...prev,
      [id]: open
    }))
  }

  return (
    <div className="relative mx-auto px-4 w-full">
      {messages.map(message => (
        <div key={message.id} className="mb-4 flex flex-col gap-4">
          <RenderMessage
            message={message}
            messageId={message.id}
            getIsOpen={getIsOpen}
            onOpenChange={handleOpenChange}
            onQuerySelect={onQuerySelect}
            chatId={chatId}
            addToolResult={addToolResult}
          />
        </div>
      ))}
      {showLoading &&
        (lastToolData ? (
          <ToolSection
            key={manualToolCallId}
            tool={lastToolData}
            isOpen={getIsOpen(manualToolCallId)}
            onOpenChange={open => handleOpenChange(manualToolCallId, open)}
            addToolResult={addToolResult}
          />
        ) : (
          <Spinner />
        ))}
      <div ref={messagesEndRef} /> {/* Add empty div as scroll anchor */}
>>>>>>> 41155a42ae5ee50065317213a1704586c96f7cfd
    </div>
  )
}
