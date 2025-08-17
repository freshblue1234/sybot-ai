// ChatPanel.tsx - Updated with improved file handling and multi-language support
'use client'

import { Model } from '@/lib/types/models'
import { Message } from 'ai'
import {
    ArrowUp,
    Globe,
    Square,
    Type
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import Textarea from 'react-textarea-autosize'
import { toast } from 'sonner'
import { ChatExport } from './chat-export'
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
    files.map(file => `/uploads/${file.id}-${encodeURIComponent(file.file.name)}`)
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
  const [attachments, setAttachments] = useState<UploadedFile[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [showMarkdownPreview, setShowMarkdownPreview] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('en')
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const router = useRouter()

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' }
  ]

  useEffect(() => {
    if (query) {
      append({
        role: 'user',
        content: query
      })
    }
  }, [query, append])

  const handleFileUpload = async (files: UploadedFile[]) => {
    setIsUploading(true)
    try {
      const uploadedUrls = await uploadFilesToServer(files)
      setAttachments(prev => [...prev, ...files])
      toast.success(`${files.length} file(s) uploaded successfully`)
    } catch (error) {
      toast.error('Failed to upload files')
      console.error('Upload error:', error)
    } finally {
      setIsUploading(false)
    }
  }

  const removeAttachment = (fileId: string) => {
    setAttachments(prev => prev.filter(file => file.id !== fileId))
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!input.trim() && attachments.length === 0) {
      return
    }

    // Create message with attachments
    const messageWithAttachments = {
      role: 'user' as const,
      content: input,
      attachments: attachments.length > 0 ? attachments : undefined
    }

    // Clear input and attachments
    setAttachments([])
    if (inputRef.current) {
      inputRef.current.value = ''
    }

    // Submit the form
    handleSubmit(e)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      const form = e.currentTarget.form
      if (form) {
        form.requestSubmit()
      }
    }
  }

  const handleFileContent = (text: string) => {
    handleInputChange({
      target: { value: text }
    } as React.ChangeEvent<HTMLTextAreaElement>)
  }

  const handleFileAttach = (file: UploadedFile) => {
    setAttachments(prev => [...prev, file])
  }

  return (
    <div className="fixed inset-x-0 bottom-0 bg-gradient-to-b from-muted/0 from-0% to-muted/90 to-50%">
      <div className="mx-auto sm:max-w-2xl sm:px-4">
        <div className="flex h-10 items-center justify-center">
          {isLoading && (
            <Button
              variant="outline"
              onClick={() => stop()}
              className="bg-background"
            >
              <Square className="mr-2 h-4 w-4" />
              Stop generating
            </Button>
          )}
        </div>
        <div className="space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
          <form onSubmit={handleFormSubmit}>
            <div className="flex flex-col gap-4">
              {/* Language Selector */}
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="text-xs sm:text-sm border rounded px-1 sm:px-2 py-1 bg-background"
                >
                  {languages.map(lang => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* File Attachments */}
              {attachments.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {attachments.map(file => (
                    <FileAttachment
                      key={file.id}
                      file={file}
                      onRemove={() => removeAttachment(file.id)}
                    />
                  ))}
                </div>
              )}

              {/* Input Area */}
              <div className="relative flex items-center gap-2">
                <div className="relative flex-1">
                  <Textarea
                    ref={inputRef}
                    tabIndex={0}
                    onKeyDown={handleKeyDown}
                    rows={1}
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Send a message..."
                    spellCheck={false}
                    className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-1 sm:gap-2">
                  {/* Voice Input */}
                  <VoiceInputButton
                    onTranscript={(text) => {
                      handleInputChange({
                        target: { value: text }
                      } as React.ChangeEvent<HTMLTextAreaElement>)
                    }}
                    disabled={isLoading}
                  />

                  {/* File Upload */}
                  <UploadButton
                    onTextSubmit={handleFileContent}
                    onFileAttach={handleFileAttach}
                  />

                  {/* Markdown Preview Toggle */}
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowMarkdownPreview(!showMarkdownPreview)}
                    className="h-8 w-8 hidden sm:flex"
                  >
                    <Type className="h-4 w-4" />
                  </Button>

                  {/* Send Button */}
                  <Button
                    type="submit"
                    size="icon"
                    disabled={isLoading || (!input.trim() && attachments.length === 0)}
                    className="h-8 w-8"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Markdown Preview */}
              {showMarkdownPreview && input && (
                <div className="border rounded-lg p-4 bg-muted/50">
                  <MarkdownPreview 
                    initialValue={input}
                    onSend={(content) => {
                      handleInputChange({
                        target: { value: content }
                      } as React.ChangeEvent<HTMLTextAreaElement>)
                      setShowMarkdownPreview(false)
                    }}
                    onCancel={() => setShowMarkdownPreview(false)}
                  />
                </div>
              )}

              {/* Model Selector and Search Mode Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {models && <ModelSelector models={models} />}
                  <SearchModeToggle />
                </div>
                <ChatExport messages={messages} chatId={chatId} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
