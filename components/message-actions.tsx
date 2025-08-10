'use client'

import { CHAT_ID } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { useChat } from 'ai/react'
import { Copy } from 'lucide-react'
import { toast } from 'sonner'
import { ChatShare } from './chat-share'
import { Button } from './ui/button'
import { VoiceOutputButton } from './voice-controls'

interface MessageActionsProps {
  message: string
  chatId?: string
  enableShare?: boolean
  className?: string
  messageIndex?: number
}

export function MessageActions({
  message,
  chatId,
  enableShare,
  className,
  messageIndex = 0
}: MessageActionsProps) {
  const { isLoading } = useChat({
    id: CHAT_ID
  })
  async function handleCopy() {
    await navigator.clipboard.writeText(message)
    toast.success('Message copied to clipboard')
  }

  if (isLoading) {
    return <div className="size-10" />
  }

  return (
    <div className={cn('flex items-center gap-0.5 self-end', className)}>
      <VoiceOutputButton text={message} messageIndex={messageIndex} />
      <Button
        variant="ghost"
        size="icon"
        onClick={handleCopy}
        className="rounded-full"
      >
        <Copy size={14} />
      </Button>
      {enableShare && chatId && <ChatShare chatId={chatId} />}
    </div>
  )
}
