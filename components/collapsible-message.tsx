'use client'

import { cn } from '@/lib/utils'
import { Message } from 'ai'
import { Check, ChevronDown, ChevronUp, Copy } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

interface CollapsibleMessageProps {
  message?: Message
  isLast?: boolean
  role?: string
  isCollapsible?: boolean
  header?: React.ReactNode
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
  showBorder?: boolean
  showIcon?: boolean
  children?: React.ReactNode
}

export function CollapsibleMessage({
  message,
  isLast,
  role,
  isCollapsible = false,
  header,
  isOpen,
  onOpenChange,
  showBorder = true,
  showIcon = true,
  children
}: CollapsibleMessageProps) {
  const [isExpanded, setIsExpanded] = useState(isOpen ?? true)
  const [copied, setCopied] = useState(false)
  
  // Handle both message-based and children-based usage
  const isUser = message ? message.role === 'user' : role === 'user'
  
  // Update internal state when external state changes
  useEffect(() => {
    if (isOpen !== undefined) {
      setIsExpanded(isOpen)
    }
  }, [isOpen])

  const handleCopy = async () => {
    let content = ''
    if (message) {
      content =
        typeof message.content === 'string'
          ? message.content
          : JSON.stringify(message.content)
    } else if (children) {
      // For children-based usage, try to extract text content
      const textContent = typeof children === 'string' ? children : ''
      content = textContent
    }

    await navigator.clipboard.writeText(content)
    setCopied(true)
    toast.success('Message copied to clipboard')
    setTimeout(() => setCopied(false), 2000)
  }

  const content = message
    ? typeof message.content === 'string'
      ? message.content
      : JSON.stringify(message.content, null, 2)
    : null

  return (
    <Card
      className={cn(
        'transition-all duration-200 hover:shadow-md',
        showBorder && 'border-border/50',
        isUser
          ? 'bg-primary text-primary-foreground'
          : 'bg-card'
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            {/* Header section */}
            {(header || showIcon) && (
              <div className="flex items-center gap-2 mb-2">
                {header ? (
                  header
                ) : (
                  <span className="text-xs font-medium opacity-70">
                    {isUser ? 'You' : 'Sybot AI'}
                  </span>
                )}
                {isCollapsible && !isUser && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const newState = !isExpanded
                      setIsExpanded(newState)
                      onOpenChange?.(newState)
                    }}
                    className="h-6 w-6 p-0"
                  >
                    {isExpanded ? (
                      <ChevronUp size={12} />
                    ) : (
                      <ChevronDown size={12} />
                    )}
                  </Button>
                )}
              </div>
            )}

            {/* Content section */}
            {isExpanded ? (
              <div className="prose prose-sm max-w-none">
                {children ? (
                  children
                ) : content ? (
                  <div
                    className={cn(
                      'whitespace-pre-wrap break-words',
                      isUser ? 'text-primary-foreground' : 'text-foreground'
                    )}
                  >
                    {content}
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">
                Click to expand message
              </div>
            )}
          </div>

          {!isUser && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-8 w-8 p-0 flex-shrink-0"
            >
              {copied ? (
                <Check size={14} className="text-green-500" />
              ) : (
                <Copy size={14} />
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
