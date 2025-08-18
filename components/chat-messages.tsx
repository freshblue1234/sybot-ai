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
}

export function ChatMessages({
  messages,
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
    let currentGroup: (typeof groups)[0] = { messages: [] }

    for (const message of messages) {
      if ((message as any).role === 'tool') {
        // Add tool message to current group
        currentGroup.messages.push(message)
      } else if (
        message.toolInvocations &&
        message.toolInvocations.length > 0
      ) {
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
              isLast={
                index === groupedMessages.length - 1 &&
                messageIndex === group.messages.length - 1
              }
            />
          ))}

          {group.toolCalls && group.toolCalls.map((tool, toolIndex) => (
            <ToolSection
              key={toolIndex}
              tool={tool}
              isOpen={true}
              onOpenChange={() => {}}
            />
          ))}
        </div>
      ))}

      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
            <div
              className="w-2 h-2 bg-primary rounded-full animate-bounce"
              style={{ animationDelay: '0.1s' }}
            />
            <div
              className="w-2 h-2 bg-primary rounded-full animate-bounce"
              style={{ animationDelay: '0.2s' }}
            />
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
    </div>
  )
}
