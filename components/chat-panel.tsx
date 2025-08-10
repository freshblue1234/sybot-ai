// ChatPanel.tsx - Updated with improved file handling
'use client'

import { Model } from '@/lib/types/models'
import { cn } from '@/lib/utils'
import { Message } from 'ai'
import { ArrowUp, MessageCirclePlus, Paperclip, Square } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import Textarea from 'react-textarea-autosize'
import { toast } from 'sonner'
import { EmptyScreen } from './empty-screen'
import { FileAttachment } from './FileAttachment'
import { UploadedFile } from './FileUploader'
import { ModelSelector } from './model-selector'
import { SearchModeToggle } from './search-mode-toggle'
import { Button } from './ui/button'
import UploadButton from './UploadButton'

// Extended Message interface to support file attachments
interface ExtendedMessage extends Message {
  attachments?: UploadedFile[];
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
}

// This function would normally connect to your backend
const uploadFilesToServer = async (files: UploadedFile[]): Promise<string[]> => {
  // Simulate file upload to server
  console.log('Uploading files to server:', files);
  
  // In a real implementation, you would:
  // 1. Create FormData
  // 2. Append files
  // 3. Send to your backend
  // 4. Return file URLs or IDs
  
  // For now, we'll just return fake URLs
  return Promise.resolve(
    files.map(file => `/uploads/${file.id}-${encodeURIComponent(file.file.name)}`)
  );
};

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
  models
}: ChatPanelProps) {
  const [showEmptyScreen, setShowEmptyScreen] = useState(false)
  const router = useRouter()
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const isFirstRender = useRef(true)
  const [isComposing, setIsComposing] = useState(false)
  const [enterDisabled, setEnterDisabled] = useState(false)
  const [attachments, setAttachments] = useState<UploadedFile[]>([])
  const [isUploading, setIsUploading] = useState(false)

  const handleCompositionStart = () => setIsComposing(true)
  const handleCompositionEnd = () => {
    setIsComposing(false)
    setEnterDisabled(true)
    setTimeout(() => {
      setEnterDisabled(false)
    }, 300)
  }

  const handleNewChat = () => {
    setMessages([])
    setAttachments([])
    router.push('/')
  }

  const isToolInvocationInProgress = () => {
    if (!messages.length) return false
    const lastMessage = messages[messages.length - 1]
    if (lastMessage.role !== 'assistant' || !lastMessage.parts) return false
    const parts = lastMessage.parts
    const lastPart = parts[parts.length - 1]
    return (
      lastPart?.type === 'tool-invocation' &&
      lastPart?.toolInvocation?.state === 'call'
    )
  }
  
  const handleFileContent = (text: string) => {
    // Set the file content as input
    handleInputChange({
      target: { value: text }
    } as React.ChangeEvent<HTMLTextAreaElement>)
    
    // Focus the textarea
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }
  
  const handleFileAttach = (file: UploadedFile) => {
    setAttachments(prev => [...prev, file])
  }
  
  const removeAttachment = (index: number) => {
    setAttachments(prev => {
      const newAttachments = [...prev]
      // Clean up URL object if it exists
      if (newAttachments[index].preview) {
        URL.revokeObjectURL(newAttachments[index].preview!)
      }
      newAttachments.splice(index, 1)
      return newAttachments
    })
  }
  
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if ((input.trim().length === 0 && attachments.length === 0) || isLoading || isUploading) {
      return
    }
    
    let finalMessage = input;
    let messageAttachments = [...attachments];
    
    // If we have attachments, handle them
    if (attachments.length > 0) {
      try {
        setIsUploading(true);
        
        // In a real implementation, upload files to server
        // For demo, we'll skip actual upload and just simulate it
        await uploadFilesToServer(attachments);
        
        // Add a note about attachments to the message if there's no text
        if (input.trim().length === 0) {
          finalMessage = `[Shared ${attachments.length} file${attachments.length > 1 ? 's' : ''}]`;
        }
        
        // Now append message with attachments
        append({
          role: 'user',
          content: finalMessage,
          attachments: messageAttachments
        });
        
        // Clear input and attachments
        handleInputChange({
          target: { value: '' }
        } as React.ChangeEvent<HTMLTextAreaElement>);
        setAttachments([]);
        
      } catch (error) {
        console.error('Error uploading files:', error);
        toast.error('Failed to upload files. Please try again.');
      } finally {
        setIsUploading(false);
      }
    } else {
      // Normal text-only message
      handleSubmit(e);
    }
  }

  useEffect(() => {
    if (isFirstRender.current && query && query.trim().length > 0) {
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
          ? 'fixed bottom-0 left-0 right-0 bg-background'
          : 'fixed bottom-8 left-0 right-0 top-6 flex flex-col items-center justify-center'
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
          'max-w-3xl w-full mx-auto',
          messages.length > 0 ? 'px-2 pb-4' : 'px-6'
        )}
      >
        <div className="relative flex flex-col w-full gap-2 bg-muted rounded-3xl border border-input">
          {/* Attachments display area */}
          {attachments.length > 0 && (
            <div className="px-4 pt-3 flex flex-wrap gap-2">
              {attachments.map((attachment, index) => (
                <FileAttachment 
                  key={`${attachment.id}`}
                  file={attachment}
                  onRemove={() => removeAttachment(index)}
                />
              ))}
            </div>
          )}
          
          <Textarea
            ref={inputRef}
            name="input"
            rows={2}
            maxRows={5}
            tabIndex={0}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
            placeholder={attachments.length > 0 ? "Add a message or send files directly..." : "Ask a question..."}
            spellCheck={false}
            value={input}
            disabled={isLoading || isUploading || isToolInvocationInProgress()}
            className="resize-none w-full min-h-12 bg-transparent border-0 p-4 text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
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
          />

          {/* Bottom menu area */}
          <div className="flex items-center justify-between p-3">
            <div className="flex items-center gap-2">
              <ModelSelector models={models || []} />
              <SearchModeToggle />
            </div>

            <div className="flex items-center gap-2">
              {messages.length > 0 && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleNewChat}
                  className="shrink-0 rounded-full group"
                  type="button"
                  disabled={isLoading || isUploading || isToolInvocationInProgress()}
                >
                  <MessageCirclePlus className="size-4 group-hover:rotate-12 transition-all" />
                </Button>
              )}

              {/* Updated UploadButton with file attachment support */}
              <UploadButton 
                onTextSubmit={handleFileContent} 
                onFileAttach={handleFileAttach}
              />

              <Button
                type="submit"
                size="icon"
                variant="outline"
                className={cn((isLoading || isUploading) && 'animate-pulse', 'rounded-full')}
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
