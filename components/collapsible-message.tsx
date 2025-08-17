import { IconLogo } from '@/components/ui/icons'
import { cn } from '@/lib/utils'
import { UserCircle2 } from 'lucide-react'
import React, { useState } from 'react'

interface CollapsibleMessageProps {
  role: 'user' | 'assistant'
  content: React.ReactNode
  header?: React.ReactNode
  isCollapsible?: boolean
  showIcon?: boolean
  showBorder?: boolean
  messageIndex?: number
  timestamp?: string
  className?: string
}

export const CollapsibleMessage: React.FC<CollapsibleMessageProps> = ({
  role,
  content,
  header,
  isCollapsible = false,
  showIcon = true,
  showBorder = false,
  messageIndex = 0,
  timestamp,
  className
}) => {
  const [isOpen, setIsOpen] = useState(!isCollapsible)

  const onOpenChange = (open: boolean) => {
    setIsOpen(open)
  }

  return (
    <div
      className={cn(
        'flex items-start gap-3 w-full',
        role === 'user' ? 'justify-end' : 'justify-start',
        className
      )}
      style={{ animationDelay: `${Math.min(0.2, (messageIndex % 3) * 0.05)}s` }}
    >
      {/* Avatar area for assistant messages */}
      {role === 'assistant' && showIcon && (
        <div className="flex flex-col items-center mt-1">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/90 dark:bg-card/90 shadow-sm border border-border/50">
            <IconLogo className="size-5" />
          </div>
        </div>
      )}

      {/* Message content area */}
      <div
        className={cn(
          'relative flex flex-col max-w-[85%] md:max-w-[80%] rounded-3xl px-5 py-4 my-1 transition-all duration-200 shadow-sm',
          role === 'assistant'
            ? 'bg-white/80 dark:bg-card/90 border border-border/50'
            : 'bg-primary/10 dark:bg-primary/20 border border-primary/20',
          role === 'assistant' ? 'rounded-br-2xl' : 'rounded-bl-2xl'
        )}
        tabIndex={0}
        aria-label={role === 'user' ? 'User message' : 'Assistant message'}
      >
        {header && <div className="mb-1">{header}</div>}
        <div className="py-2 flex-1">{content}</div>

        {/* Enhanced metadata area */}
        <div className="flex items-center justify-between mt-3 pt-2 border-t border-border/30 text-xs">
          <span className="text-muted-foreground/70">{timestamp}</span>
          <div className="flex space-x-1">
            <button
              className="rounded-full p-1 hover:bg-muted transition-colors"
              aria-label="Like message"
            >
              👍
            </button>
            <button
              className="rounded-full p-1 hover:bg-muted transition-colors"
              aria-label="Dislike message"
            >
              👎
            </button>
            <button
              className="rounded-full p-1 hover:bg-muted transition-colors"
              aria-label="Copy message"
            >
              📋
            </button>
          </div>
        </div>
      </div>

      {/* Avatar area for user messages */}
      {role === 'user' && showIcon && (
        <div className="flex flex-col items-center mt-1">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20 shadow-sm border border-primary/20">
            <UserCircle2
              size={20}
              className="text-primary/70 dark:text-primary/80"
            />
          </div>
        </div>
      )}
    </div>
  )
}
