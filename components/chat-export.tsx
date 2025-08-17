'use client'

import { useSettings } from '@/lib/hooks/use-settings'
import { Message } from 'ai'
import { Download } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './ui/dialog'

interface ChatExportProps {
  messages: Message[]
  chatId: string
  className?: string
}

export function ChatExport({ messages, chatId, className }: ChatExportProps) {
  const { settings } = useSettings()
  const [open, setOpen] = useState(false)
  const [pending, setPending] = useState(false)

  const exportChat = async () => {
    setPending(true)

    try {
      // Format the chat based on the selected export format
      let content = ''
      let filename = `chat-${chatId}`
      let mimeType = 'text/plain'

      switch (settings.exportFormat) {
        case 'json':
          content = JSON.stringify(
            {
              id: chatId,
              messages: messages,
              exportedAt: new Date().toISOString()
            },
            null,
            2
          )
          filename += '.json'
          mimeType = 'application/json'
          break

        case 'txt':
          content = formatAsText(messages)
          filename += '.txt'
          mimeType = 'text/plain'
          break

        case 'md':
          content = formatAsMarkdown(messages)
          filename += '.md'
          mimeType = 'text/markdown'
          break

        default:
          content = formatAsText(messages)
          filename += '.txt'
          mimeType = 'text/plain'
      }

      // Create and download the file
      const blob = new Blob([content], { type: mimeType })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      toast.success(`Chat exported as ${settings.exportFormat.toUpperCase()}`)
      setOpen(false)
    } catch (error) {
      console.error('Export failed:', error)
      toast.error('Failed to export chat')
    } finally {
      setPending(false)
    }
  }

  const formatAsText = (messages: Message[]): string => {
    return messages
      .map(msg => `[${msg.role.toUpperCase()}]: ${msg.content}`)
      .join('\n\n')
  }

  const formatAsMarkdown = (messages: Message[]): string => {
    let markdown = `# Chat Export\n\n`
    markdown += `**Chat ID**: ${chatId}\n\n`
    markdown += `**Exported**: ${new Date().toLocaleString()}\n\n`
    markdown += `---\n\n`

    messages.forEach((msg, index) => {
      const role = msg.role.charAt(0).toUpperCase() + msg.role.slice(1)
      markdown += `## ${role}\n\n`
      markdown += `${msg.content}\n\n`
      if (index < messages.length - 1) {
        markdown += `---\n\n`
      }
    })

    return markdown
  }

  return (
    <div className={className}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => setOpen(true)}
          >
            <Download size={14} />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Export Chat</DialogTitle>
            <DialogDescription>
              Export your chat history in {settings.exportFormat.toUpperCase()}{' '}
              format.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={exportChat} disabled={pending} size="sm">
              {pending
                ? 'Exporting...'
                : `Export as ${settings.exportFormat.toUpperCase()}`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
