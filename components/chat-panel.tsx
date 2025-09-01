'use client'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useVoice } from '@/contexts/voice-context'
import { cn } from '@/lib/utils'
import { ChevronDown, Mic, Paperclip, Rocket, Send, StopCircle, Volume2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
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
  const { autoSpeak, speakText, isSupported, isListening, startListening, stopListening, onVoiceInput } = useVoice()
  const [attachedFiles, setAttachedFiles] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Set up voice input callback
  useEffect(() => {
    onVoiceInput((text: string) => {
      setInput?.(text)
      // Auto-submit after voice input
      setTimeout(() => {
        if (handleSubmit) {
          const form = document.querySelector('form')
          if (form) {
            const submitEvent = new Event('submit', { bubbles: true, cancelable: true })
            form.dispatchEvent(submitEvent)
          }
        }
      }, 500)
    })
  }, [onVoiceInput, setInput, handleSubmit])

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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const newFiles = Array.from(files).filter(file => {
      if (file.size > 10 * 1024 * 1024) {
        toast.error(`File "${file.name}" is too large (max 10MB)`)
        return false
      }
      return true
    })

    setAttachedFiles(prev => [...prev, ...newFiles])
    
    // Auto-focus the input after file selection
    setTimeout(() => {
      textareaRef.current?.focus()
    }, 100)
  }

  const removeFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmitWithFiles = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if ((!input || input.trim() === '') && attachedFiles.length === 0) {
      return
    }

    // Create a FormData object to handle file uploads
    const formData = new FormData()
    
    // Add files to FormData
    attachedFiles.forEach((file, index) => {
      formData.append(`file-${index}`, file)
    })

    // Create message with file metadata
    const message = {
      role: 'user' as const,
      content: input || '',
      files: attachedFiles.map(file => ({
        name: file.name,
        type: file.type,
        size: file.size,
        preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
      }))
    }

    // Append the message to the chat
    append?.({
      ...message,
      // Include the FormData for server-side processing
      formData
    })
    
    // Clear the input and files
    setInput?.('')
    setAttachedFiles([])
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    
    // Call the original handleSubmit if it exists
    if (handleSubmit) {
      const syntheticEvent = {
        ...e,
        preventDefault: () => {},
        currentTarget: e.currentTarget
      }
      handleSubmit(syntheticEvent as React.FormEvent<HTMLFormElement>)
    }
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
      const newFiles = Array.from(files).filter(file => {
        if (file.size > 10 * 1024 * 1024) {
          toast.error(`File "${file.name}" is too large (max 10MB)`)
          return false
        }
        return true
      })
      setAttachedFiles(prev => [...prev, ...newFiles])
    }
  }

  // Clean up object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      attachedFiles.forEach(file => {
        if (file.type.startsWith('image/')) {
          URL.revokeObjectURL(URL.createObjectURL(file))
        }
      })
    }
  }, [attachedFiles])

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

  return (
    <div className="border-t border-gray-700 bg-gray-900/50 backdrop-blur-sm p-6">
      <form
        onSubmit={handleSubmitWithFiles}
        className="flex flex-col items-center gap-6"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* File preview area */}
        {attachedFiles.length > 0 && (
          <div className="w-full max-w-4xl flex flex-wrap gap-2 mb-2">
            {attachedFiles.map((file, index) => (
              <div key={index} className="relative group bg-gray-800 rounded-lg p-2 pr-8 flex items-center">
                {file.type.startsWith('image/') ? (
                  <img 
                    src={URL.createObjectURL(file)} 
                    alt={file.name} 
                    className="h-12 w-12 object-cover rounded"
                  />
                ) : (
                  <div className="h-12 w-12 bg-gray-700 rounded flex items-center justify-center">
                    <Paperclip className="h-5 w-5 text-gray-400" />
                  </div>
                )}
                <div className="ml-2 max-w-[200px] truncate">
                  <div className="text-sm font-medium text-white truncate">{file.name}</div>
                  <div className="text-xs text-gray-400">{(file.size / 1024).toFixed(1)} KB</div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeFile(index)
                  }}
                  className="absolute -right-2 -top-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Remove file"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Main Input Field */}
        <div className="w-full max-w-4xl relative">
          <div className={cn(
            'relative bg-gray-800 rounded-2xl border border-gray-600 p-5 shadow-lg',
            isDragging && 'ring-2 ring-blue-500 border-blue-500'
          )}>
            {/* Left Controls */}
            <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center gap-3">
              {/* Microphone Button */}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className={cn(
                  "h-9 w-9 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-all duration-200",
                  isListening && "bg-red-500 animate-pulse",
                  !isSupported && "opacity-50 cursor-not-allowed"
                )}
                disabled={!isSupported}
                onClick={handleVoiceToggle}
                title={isSupported ? "Click to speak" : "Voice not supported"}
              >
                <Mic size={18} />
              </Button>

              {/* File Upload Button */}
              <div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-9 w-9 rounded-full transition-all duration-200",
                    attachedFiles.length > 0 
                      ? "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30" 
                      : "bg-gray-700 hover:bg-gray-600 text-white"
                  )}
                  onClick={() => fileInputRef.current?.click()}
                  title="Upload file"
                >
                  <Paperclip size={18} />
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                  multiple
                  accept="image/*,.pdf,.doc,.docx,.txt"
                />
              </div>

              {/* Rocket Button with Auto Text */}
              <Button
                type="button"
                variant="ghost"
                className="h-9 px-4 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-all duration-200 flex items-center gap-2"
                title="Auto mode"
              >
                <Rocket size={16} />
                <span className="text-sm font-medium">Auto</span>
                <ChevronDown size={14} />
              </Button>
            </div>

            {/* Main Textarea */}
            <Textarea
              ref={textareaRef}
              tabIndex={0}
              onKeyDown={handleKeyDown}
              rows={1}
              value={input}
              onChange={handleInputChange}
              placeholder="What do you want to know?"
              spellCheck={false}
              className={cn(
                'min-h-[70px] w-full resize-none bg-transparent border-0 px-36 py-4 focus-within:outline-none text-white placeholder-gray-400 text-lg font-medium',
                isDragging && 'border-primary/50 bg-primary/5'
              )}
              style={{
                maxHeight: '200px',
                height: 'auto'
              }}
            />

            {/* Right Control - Volume Button */}
            <div className="absolute right-5 top-1/2 -translate-y-1/2">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-all duration-200"
                onClick={() => speakText("Hello! I'm ready to help you.")}
                title="Text to speech"
              >
                <Volume2 size={18} />
              </Button>
            </div>
          </div>

          {/* Hidden file input */}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading || (!input?.trim() && attachedFiles.length === 0)}
          className="h-14 px-10 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-blue-500/25"
        >
          {isLoading ? (
            <div className="flex items-center gap-3">
              <StopCircle size={22} />
              <span className="text-lg">Stop</span>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Send size={22} />
              <span className="text-lg">Send</span>
            </div>
          )}
        </Button>
      </form>

      {/* Auto-speak indicator */}
      {autoSpeak && (
        <div className="mt-6 text-sm text-gray-400 text-center">
          🔊 Auto-speak enabled
        </div>
      )}

      {/* Drag and drop indicator */}
      {isDragging && (
        <div className="absolute inset-0 bg-blue-500/10 border-2 border-dashed border-blue-500/50 rounded-lg flex items-center justify-center">
          <p className="text-blue-500 font-medium">Drop file here</p>
        </div>
      )}
    </div>
  )
}
