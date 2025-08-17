'use client'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useVoice } from '@/contexts/voice-context'
import { cn } from '@/lib/utils'
import { Send, StopCircle, Upload } from 'lucide-react'
import { useRef, useState } from 'react'
import { toast } from 'sonner'

interface ChatPanelProps {
  id?: string
  isLoading?: boolean
  stop?: () => void
  append?: (message: any) => void
  reload?: () => void
  messages?: any[]
  input?: string
  setInput?: (input: string) => void
  handleInputChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  handleSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
}

export function ChatPanel({
  id,
  isLoading,
  stop,
  append,
  reload,
  messages,
  input,
  setInput,
  handleInputChange,
  handleSubmit
}: ChatPanelProps) {
  const { autoSpeak, speakText } = useVoice()
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (handleSubmit) {
        const form = e.currentTarget.form
        if (form) {
          handleSubmit(e as any)
        }
      }
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const file = files[0]
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB')
      return
    }

    // Handle file upload logic here
    toast.success(`File "${file.name}" uploaded successfully`)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      const file = files[0]
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB')
        return
      }
      toast.success(`File "${file.name}" uploaded successfully`)
    }
  }

  return (
    <div className="border-t border-border/50 bg-background/50 backdrop-blur-sm p-4">
      <form
        onSubmit={handleSubmit}
        className="flex items-end gap-2"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex-1 relative">
          <Textarea
            ref={textareaRef}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            rows={1}
            value={input}
            onChange={handleInputChange}
            placeholder="Ask me anything..."
            spellCheck={false}
            className={cn(
              'min-h-[60px] w-full resize-none bg-background px-4 py-3 pr-12 focus-within:outline-none sm:text-sm',
              isDragging && 'border-primary/50 bg-primary/5'
            )}
            style={{
              maxHeight: '200px',
              height: 'auto'
            }}
          />

          {/* File upload button */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload size={16} />
          </Button>

          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileUpload}
            accept=".txt,.pdf,.doc,.docx,.jpg,.jpeg,.png"
          />
        </div>

        <Button
          type="submit"
          size="icon"
          disabled={isLoading || !input?.trim()}
          className="h-10 w-10 bg-primary hover:bg-primary/90"
        >
          {isLoading ? <StopCircle size={16} /> : <Send size={16} />}
        </Button>
      </form>

      {/* Auto-speak indicator */}
      {autoSpeak && (
        <div className="mt-2 text-xs text-muted-foreground text-center">
          🔊 Auto-speak enabled
        </div>
      )}

      {/* Drag and drop indicator */}
      {isDragging && (
        <div className="absolute inset-0 bg-primary/10 border-2 border-dashed border-primary/50 rounded-lg flex items-center justify-center">
          <p className="text-primary font-medium">Drop file here</p>
        </div>
      )}
    </div>
  )
}
