import { cn } from '@/lib/utils'
import { UserCircle2 } from 'lucide-react'
import { IconLogo } from './ui/icons'

interface CollapsibleMessageProps {
  children: React.ReactNode
  role: 'user' | 'assistant'
  isCollapsible?: boolean
  isOpen?: boolean
  header?: React.ReactNode
  onOpenChange?: (open: boolean) => void
  showBorder?: boolean
  showIcon?: boolean
  messageIndex?: number
  className?: string
}

export function CollapsibleMessage({
  children,
  role,
  isCollapsible = false,
  isOpen = true,
  header,
  onOpenChange,
  showBorder = true,
  showIcon = true,
  messageIndex = 0,
  className
}: CollapsibleMessageProps) {
  const content = <div className="py-2 flex-1">{children}</div>

  // Add timestamp and reactions (placeholder)
  const now = new Date()
  const timestamp = now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  })

  return (
    <div
      className={cn(
        'flex w-full items-start gap-3 md:gap-4 py-2 animate-fade-in-up',
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
