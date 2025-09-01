'use client'

import { CollapsibleMessage } from '@/components/collapsible-message'
import { cn } from '@/lib/utils'
import { Message } from 'ai'
import { Bot, User } from 'lucide-react'

interface RenderMessageProps {
  message: Message
  isLast?: boolean
}

export function RenderMessage({ message, isLast }: RenderMessageProps) {
  const isUser = message.role === 'user'
  const isAssistant = message.role === 'assistant'

  return (
    <div className={cn(
      "flex w-full justify-center py-4",
      isLast && "pb-8"
    )}>
      <div className="w-full max-w-4xl px-4">
        <div className={cn(
          "flex gap-4 group",
          isUser ? "justify-end" : "justify-start"
        )}>
          {/* Avatar - Left for assistant, hidden for user */}
          {isAssistant && (
            <div className="flex-shrink-0 mt-1">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                <Bot className="w-4 h-4 text-white" />
              </div>
            </div>
          )}

          {/* Message Content */}
          <div className={cn(
            "flex flex-col max-w-[85%] md:max-w-[75%]",
            isUser ? "items-end" : "items-start"
          )}>
            {/* Message Bubble */}
            <div className={cn(
              "relative rounded-2xl px-4 py-3 shadow-lg backdrop-blur-sm border",
              isUser 
                ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white border-blue-500/20" 
                : "bg-slate-800/90 text-slate-100 border-slate-700/50",
              "animate-in slide-in-from-bottom-2 duration-300"
            )}>
              <CollapsibleMessage
                message={message}
                isCollapsible={message.content.length > 500}
              />
            </div>

            {/* Timestamp */}
            <div className={cn(
              "text-xs text-slate-500 mt-1 px-2",
              isUser ? "text-right" : "text-left"
            )}>
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>

          {/* Avatar - Right for user */}
          {isUser && (
            <div className="flex-shrink-0 mt-1">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center shadow-lg">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
