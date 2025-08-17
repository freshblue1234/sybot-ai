'use client'

import { cn } from '@/lib/utils'
import { Message } from 'ai'
import { Bot, User } from 'lucide-react'
import { CollapsibleMessage } from './collapsible-message'

interface RenderMessageProps {
  message: Message
  isLast?: boolean
}

export function RenderMessage({ message, isLast }: RenderMessageProps) {
  const isUser = message.role === 'user'
  const isAssistant = message.role === 'assistant'

  if (!isUser && !isAssistant) {
    return null
  }

  return (
    <div
      className={cn(
        'flex gap-3 transition-all duration-200',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-muted-foreground'
        )}
      >
        {isUser ? <User size={16} /> : <Bot size={16} />}
      </div>

      {/* Message Content */}
      <div
        className={cn(
          'flex-1 max-w-[85%] lg:max-w-[75%]',
          isUser ? 'text-right' : 'text-left'
        )}
      >
        <CollapsibleMessage message={message} isLast={isLast} />
      </div>
    </div>
  )
}
