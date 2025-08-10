// ChatPanel.tsx - Updated with improved file handling and multi-language support
'use client'

import { Model } from '@/lib/types/models'
import { cn } from '@/lib/utils'
import { Message } from 'ai'
import {
    ArrowUp,
    Globe,
    MessageCirclePlus,
    Paperclip,
    Square,
    Type
} from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import Textarea from 'react-textarea-autosize'
import { toast } from 'sonner'
import { ChatExport } from './chat-export'
import { EmptyScreen } from './empty-screen'
import { FileAttachment } from './FileAttachment'
import { UploadedFile } from './FileUploader'
import { MarkdownPreview } from './markdown-preview'
import { ModelSelector } from './model-selector'
import { SearchModeToggle } from './search-mode-toggle'
import { Button } from './ui/button'
import UploadButton from './UploadButton'
import { VoiceInputButton } from './voice-controls'

// Extended Message interface to support file attachments
interface ExtendedMessage extends Message {
  attachments?: UploadedFile[]
}

interface ChatPanelProps {
  input: string
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  isLoading: boolean
  messages: ExtendedMessage[]
  setMessages: (messages: ExtendedMessage[]) => void
  query?: string
  stop: () => void
  append: (message: any) => void
  models?: Model[]
  chatId: string
}

// This function would normally connect to your backend
const uploadFilesToServer = async (
  files: UploadedFile[]
): Promise<string[]> => {
  // Simulate file upload to server
  console.log('Uploading files to server:', files)

  // In a real implementation, you would:
  // 1. Create FormData
  // 2. Append files
  // 3. Send to your backend
  // 4. Return file URLs or IDs

  // For now, we'll just return fake URLs
  return Promise.resolve(
    files.map(
      file => `/uploads/${file.id}-${encodeURIComponent(file.file.name)}`
    )
  )
}

export function ChatPanel({
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
  messages,
  setMessages,
  query,
  stop,
  append,
  models,
  chatId
}: ChatPanelProps) {
  const [showEmptyScreen, setShowEmptyScreen] = useState(false)
  const router = useRouter()
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const isFirstRender = useRef(true)
  const [isComposing, setIsComposing] = useState(false)
  const [enterDisabled, setEnterDisabled] = useState(false)
  const [attachments, setAttachments] = useState<UploadedFile[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [voiceTranscript, setVoiceTranscript] = useState('')
  const [showMarkdownPreview, setShowMarkdownPreview] = useState(false)

  const handleCompositionStart = () => setIsComposing(true)
  const handleCompositionEnd = () => {
    setIsComposing(false)
    setEnterDisabled(true)
    setTimeout(() => {
      setEnterDisabled(false)
    }, 300)
  }

  const handleVoiceTranscript = (transcript: string) => {
    setVoiceTranscript(transcript)
    handleInputChange({
      target: { value: transcript }
    } as React.ChangeEvent<HTMLTextAreaElement>)
  }

  const handleVoiceCommand = (command: string) => {
    // Handle voice commands
    console.log('Voice command:', command)
    if (command.toLowerCase().includes('send') || command.toLowerCase().includes('submit')) {
      const form = document.querySelector('form') as HTMLFormElement
      if (form) {
        form.requestSubmit()
      }
    }
  }

  const handleNewChat = () => {
    router.push('/')
  }

  const isToolInvocationInProgress = () => {
    return messages.some(
      message =>
        (message.role as string) === 'tool' ||
        (message.role === 'assistant' &&
          message.content &&
          typeof message.content === 'string' &&
          message.content.includes('tool'))
    )
  }

  const handleFileContent = (text: string) => {
    handleInputChange({
      target: { value: text }
    } as React.ChangeEvent<HTMLTextAreaElement>)
  }

  const handleFileAttach = (file: UploadedFile) => {
    setAttachments(prev => [...prev, file])
  }

  const removeAttachment = (index: number) => {
    setAttachments(prev => {
      const newAttachments = [...prev]
      const removedAttachment = newAttachments.splice(index, 1)[0]
      if (removedAttachment.preview) {
        URL.revokeObjectURL(removedAttachment.preview)
      }
      return newAttachments
    })
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (input.trim().length === 0 && attachments.length === 0) {
      return
    }

    let finalMessage = input
    let messageAttachments = [...attachments]

    // If we have attachments, handle them
    if (attachments.length > 0) {
      try {
        setIsUploading(true)

        // In a real implementation, upload files to server
        // For demo, we'll skip actual upload and just simulate it
        await uploadFilesToServer(attachments)

        // Add a note about attachments to the message if there's no text
        if (input.trim().length === 0) {
          finalMessage = `[Shared ${attachments.length} file${
            attachments.length > 1 ? 's' : ''
          }]`
        }

        // Now append message with attachments
        append({
          role: 'user',
          content: finalMessage,
          attachments: messageAttachments
        })

        // Clear input and attachments
        handleInputChange({
          target: { value: '' }
        } as React.ChangeEvent<HTMLTextAreaElement>)
        setAttachments([])
      } catch (error) {
        console.error('Error uploading files:', error)
        toast.error('Failed to upload files. Please try again.')
      } finally {
        setIsUploading(false)
      }
    } else {
      // Normal text-only message
      handleSubmit(e)
    }
  }

  useEffect(() => {
    if (
      isFirstRender.current &&
      query &&
      query.trim().length > 0 &&
      messages.length === 0
    ) {
      append({
        role: 'user',
        content: query
      })
      isFirstRender.current = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      attachments.forEach(attachment => {
        if (attachment.preview) {
          URL.revokeObjectURL(attachment.preview)
        }
      })
    }
  }, [attachments])

  return (
    <div
      className={cn(
        'mx-auto w-full',
        messages.length > 0
          ? 'fixed bottom-0 left-0 right-0 bg-background/90 backdrop-blur-md border-t border-border/50 pb-6' // Added bottom padding
          : 'fixed bottom-4 md:bottom-8 left-0 right-0 top-6 flex flex-col items-center justify-center'
      )}
    >
      {messages.length === 0 && (
        <div className="mb-10 flex flex-col items-center gap-4">
          <Image
            src="/sybot-logo.png"
            alt="Sybot Logo"
            width={80}
            height={80}
            className="rounded-full shadow-lg"
            priority
          />
          <p className="text-center text-3xl font-semibold">
            What can I help you now?
          </p>
        </div>
      )}

      <form
        onSubmit={handleFormSubmit}
        className={cn(
          'max-w-4xl w-full mx-auto',
          messages.length > 0 ? 'px-4 md:px-6 py-4 pb-8' : 'px-6' // Increased bottom padding
        )}
      >
        <div className="relative flex flex-col w-full gap-3 md:gap-4 bg-muted rounded-3xl border border-input p-1 shadow-lg">
          {/* Attachments display area */}
          {attachments.length > 0 && (
            <div className="px-3 pt-2 flex flex-wrap gap-2">
              {attachments.map((attachment, index) => (
                <FileAttachment
                  key={`${attachment.id}`}
                  file={attachment}
                  onRemove={() => removeAttachment(index)}
                />
              ))}
            </div>
          )}

          {showMarkdownPreview ? (
            <MarkdownPreview
              initialValue={input}
              onSend={(content: string) => {
                handleInputChange({
                  target: { value: content }
                } as React.ChangeEvent<HTMLTextAreaElement>)
                setShowMarkdownPreview(false)
                // Submit the form
                const form = document.querySelector('form') as HTMLFormElement
                if (form) {
                  form.requestSubmit()
                }
              }}
              onCancel={() => setShowMarkdownPreview(false)}
            />
          ) : (
            <Textarea
              ref={inputRef}
              name="input"
              rows={2}
              maxRows={5}
              tabIndex={0}
              onCompositionStart={handleCompositionStart}
              onCompositionEnd={handleCompositionEnd}
              placeholder={
                attachments.length > 0
                  ? 'Add a message or send files directly... (支持任何语言 / Supports any language)'
                  : 'Ask a question... (支持任何语言 / Supports any language)'
              }
              spellCheck={false}
              value={input}
              disabled={
                isLoading || isUploading || isToolInvocationInProgress()
              }
              className="resize-none w-full min-h-14 md:min-h-16 bg-transparent border-0 px-4 py-3 pr-24 text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              onChange={e => {
                handleInputChange(e)
                setShowEmptyScreen(e.target.value.length === 0)
              }}
              onKeyDown={e => {
                if (
                  e.key === 'Enter' &&
                  !e.shiftKey &&
                  !isComposing &&
                  !enterDisabled
                ) {
                  if (input.trim().length === 0 && attachments.length === 0) {
                    e.preventDefault()
                    return
                  }
                  e.preventDefault()
                  const textarea = e.target as HTMLTextAreaElement
                  textarea.form?.requestSubmit()
                }
              }}
              onFocus={() => setShowEmptyScreen(true)}
              onBlur={() => setShowEmptyScreen(false)}
              // Enable multi-language support
              lang="auto"
              dir="auto"
            />
          )}

          {/* Bottom menu area */}
          <div className="flex items-center justify-between px-2 pt-2 pb-3"> {/* Increased bottom padding */}
            <div className="flex items-center gap-2">
              <ModelSelector models={models || []} />
              <SearchModeToggle />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowMarkdownPreview(!showMarkdownPreview)}
                className="rounded-full"
                type="button"
              >
                <Type size={20} />
              </Button>
              {/* Language indicator */}
              <div className="flex items-center gap-1 px-2 py-1 bg-background/50 rounded-full text-xs text-muted-foreground">
                <Globe className="w-3 h-3" />
                <span>Multi-Lang</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {messages.length > 0 && (
                <>
                  <ChatExport messages={messages} chatId={chatId} />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleNewChat}
                    className="shrink-0 rounded-full group"
                    type="button"
                    disabled={
                      isLoading || isUploading || isToolInvocationInProgress()
                    }
                  >
                    <MessageCirclePlus className="size-4 group-hover:rotate-12 transition-all" />
                  </Button>
                </>
              )}

              {/* Updated UploadButton with file attachment support */}
              <UploadButton
                onTextSubmit={handleFileContent}
                onFileAttach={handleFileAttach}
              />

              <VoiceInputButton
                onTranscriptChange={handleVoiceTranscript}
                onCommand={handleVoiceCommand}
                disabled={
                  isLoading || isUploading || isToolInvocationInProgress()
                }
              />

              <Button
                type="submit"
                size="icon"
                variant="outline"
                className={cn(
                  (isLoading || isUploading) && 'animate-pulse',
                  'rounded-full shadow-sm hover:shadow-md transition-shadow'
                )}
                disabled={
                  (input.length === 0 && attachments.length === 0) ||
                  isLoading ||
                  isUploading ||
                  isToolInvocationInProgress()
                }
                onClick={isLoading ? stop : undefined}
              >
                {isLoading || isUploading ? (
                  <Square size={20} />
                ) : attachments.length > 0 && input.length === 0 ? (
                  <Paperclip size={20} />
                ) : (
                  <ArrowUp size={20} />
                )}
              </Button>
            </div>
          </div>
        </div>

        {messages.length === 0 && (
          <EmptyScreen
            submitMessage={message => {
              handleInputChange({
                target: { value: message }
              } as React.ChangeEvent<HTMLTextAreaElement>)
            }}
            className={cn(showEmptyScreen ? 'visible' : 'invisible')}
          />
        )}
      </form>
    </div>
  )
}
