<<<<<<< HEAD
'use client'

import { cn } from '@/lib/utils'
import { Message } from 'ai'
import { Check, ChevronDown, ChevronUp, Copy } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

interface CollapsibleMessageProps {
  message: Message
  isLast?: boolean
}

export function CollapsibleMessage({ message, isLast }: CollapsibleMessageProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [copied, setCopied] = useState(false)
  const isUser = message.role === 'user'

  const handleCopy = async () => {
    const content = typeof message.content === 'string' 
      ? message.content 
      : JSON.stringify(message.content)
    
    await navigator.clipboard.writeText(content)
    setCopied(true)
    toast.success('Message copied to clipboard')
    setTimeout(() => setCopied(false), 2000)
  }

  const content = typeof message.content === 'string' 
    ? message.content 
    : JSON.stringify(message.content, null, 2)

  return (
    <Card
      className={cn(
        'transition-all duration-200 hover:shadow-md',
        isUser
          ? 'bg-primary text-primary-foreground'
          : 'bg-card border-border/50'
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium opacity-70">
                {isUser ? 'You' : 'Sybot AI'}
              </span>
              {!isUser && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(!isExpanded)}
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
            
            {isExpanded ? (
              <div className="prose prose-sm max-w-none">
                <div
                  className={cn(
                    'whitespace-pre-wrap break-words',
                    isUser ? 'text-primary-foreground' : 'text-foreground'
                  )}
                >
                  {content}
                </div>
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
=======
import { cn } from '@/lib/utils'
import { ChevronDown, UserCircle2 } from 'lucide-react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from './ui/collapsible'
import { IconLogo } from './ui/icons'
import { Separator } from './ui/separator'

interface CollapsibleMessageProps {
  children: React.ReactNode
  role: 'user' | 'assistant'
  isCollapsible?: boolean
  isOpen?: boolean
  header?: React.ReactNode
  onOpenChange?: (open: boolean) => void
  showBorder?: boolean
  showIcon?: boolean
}

export function CollapsibleMessage({
  children,
  role,
  isCollapsible = false,
  isOpen = true,
  header,
  onOpenChange,
  showBorder = true,
  showIcon = true
}: CollapsibleMessageProps) {
  const content = <div className="py-2 flex-1">{children}</div>

  return (
    <div className="flex">
      {showIcon && (
        <div className="relative flex flex-col items-center">
          <div className={cn('mt-[10px] w-5', role === 'assistant' && 'mt-4')}>
            {role === 'user' ? (
              <UserCircle2 size={20} className="text-muted-foreground" />
            ) : (
              <IconLogo className="size-5" />
            )}
          </div>
        </div>
      )}

      {isCollapsible ? (
        <div
          className={cn(
            'flex-1 rounded-2xl p-4',
            showBorder && 'border border-border/50'
          )}
        >
          <Collapsible
            open={isOpen}
            onOpenChange={onOpenChange}
            className="w-full"
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full group">
              <div className="flex items-center justify-between w-full gap-2">
                {header && <div className="text-sm w-full">{header}</div>}
                <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="data-[state=closed]:animate-collapse-up data-[state=open]:animate-collapse-down">
              <Separator className="my-4 border-border/50" />
              {content}
            </CollapsibleContent>
          </Collapsible>
        </div>
      ) : (
        <div className="flex-1 rounded-2xl px-4">{content}</div>
      )}
    </div>
>>>>>>> 41155a42ae5ee50065317213a1704586c96f7cfd
  )
}
