import { useVoice } from '@/contexts/voice-context'
import { JSONValue, Message } from 'ai'
import { Download, File, FileText, Image as ImageIcon } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { RenderMessage } from './render-message'
import { ToolSection } from './tool-section'

export interface ChatMessagesProps {
  messages: (Message & { files?: Array<{ name: string; type: string; size: number; preview?: string }> })[]
  isLoading?: boolean
  error?: Error | null
  data?: JSONValue[]
}

export function ChatMessages({ messages, isLoading, error, data }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(true)
  const { autoSpeak, speakText, isSpeaking, stopSpeaking } = useVoice()
  const lastSpokenMessageId = useRef<string | null>(null)

  // Group messages by tool calls
  const groupedMessages = useMemo(() => {
    const groups: Array<{
      messages: Message[]
      toolCalls?: any[]
    }> = []
    let currentGroup: (typeof groups)[0] = { messages: [] }

    for (const message of messages) {
      if ((message as any).role === 'tool') {
        // Add tool message to current group
        currentGroup.messages.push(message)
      } else if (
        (message as any).toolInvocations &&
        (message as any).toolInvocations.length > 0
      ) {
        // Start new group with tool calls
        if (currentGroup.messages.length > 0) {
          groups.push(currentGroup)
        }
        currentGroup = {
          messages: [message],
          toolCalls: (message as any).toolInvocations
        }
      } else {
        // Regular message
        currentGroup.messages.push(message)
      }
    }

    if (currentGroup.messages.length > 0) {
      groups.push(currentGroup)
    }

    return groups
  }, [messages])

  // Get file icon based on file type
  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) {
      return <ImageIcon className="h-5 w-5 text-blue-400" />
    } else if (fileType === 'application/pdf') {
      return <FileText className="h-5 w-5 text-red-400" />
    } else if (fileType.startsWith('text/')) {
      return <FileText className="h-5 w-5 text-green-400" />
    } else if (fileType.includes('word') || fileType.includes('document')) {
      return <FileText className="h-5 w-5 text-blue-500" />
    } else {
      return <File className="h-5 w-5 text-gray-400" />
    }
  }

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  // Render file attachments
  const renderFileAttachments = (files: any[]) => {
    if (!files || files.length === 0) return null
    
    return (
      <div className="mt-2 space-y-2">
        {files.map((file, index) => (
          <div 
            key={index} 
            className="flex items-center p-2 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="flex-shrink-0">
              {file.preview ? (
                <img 
                  src={file.preview} 
                  alt={file.name} 
                  className="h-10 w-10 object-cover rounded"
                />
              ) : (
                <div className="h-10 w-10 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded">
                  {getFileIcon(file.type)}
                </div>
              )}
            </div>
            <div className="ml-3 flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {file.name}
              </p>
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <span>{formatFileSize(file.size)}</span>
                <span className="mx-2">•</span>
                <span>{file.type}</span>
              </div>
            </div>
            <a
              href={file.preview || '#'}
              download={file.name}
              className="ml-2 p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download className="h-4 w-4" />
            </a>
          </div>
        ))}
      </div>
    )
  }

  // Scroll to bottom function
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: messages.length > 5 ? 'instant' : 'smooth'
    })
  }, [messages.length])

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const element = messagesEndRef.current?.parentElement
      if (element) {
        const { scrollTop, scrollHeight, clientHeight } = element
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 50 // 50px threshold
        setIsScrolledToBottom(isAtBottom)
      }
    }

    const element = messagesEndRef.current?.parentElement
    if (element) {
      element.addEventListener('scroll', handleScroll)
      return () => element.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Auto-scroll to bottom when new messages arrive or during loading
  useEffect(() => {
    if (isScrolledToBottom) {
      scrollToBottom()
    }
  }, [messages, isScrolledToBottom, scrollToBottom])

  // Auto-scroll during streaming
  useEffect(() => {
    if (isLoading && isScrolledToBottom) {
      const interval = setInterval(scrollToBottom, 100)
      return () => clearInterval(interval)
    }
  }, [isLoading, isScrolledToBottom, scrollToBottom])

  // Handle auto-speak for new AI messages
  useEffect(() => {
    if (!autoSpeak || !messages.length) return
    
    const lastMessage = messages[messages.length - 1]
    
    // Only speak if it's an AI message and not already speaking
    if (lastMessage.role === 'assistant' && lastMessage.id !== lastSpokenMessageId.current) {
      // Stop any current speech
      stopSpeaking()
      
      // Store the message ID to prevent re-speaking
      lastSpokenMessageId.current = lastMessage.id
      
      // Speak the message content
      if (lastMessage.content) {
        speakText(lastMessage.content)
      }
    }
  }, [messages, autoSpeak, speakText, stopSpeaking])

  // Clean up speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (isSpeaking) {
        stopSpeaking()
      }
    }
  }, [isSpeaking, stopSpeaking])

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {groupedMessages.map((group, groupIndex) => (
          <div key={groupIndex} className="space-y-6">
            {group.messages.map((message, messageIndex) => {
              const isUser = message.role === 'user'
              const messageFiles = (message as any).files || []
              
              return (
                <div
                  key={messageIndex}
                  className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-3xl rounded-2xl px-4 py-3 ${
                      isUser
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-none'
                    }`}
                  >
                    <div className="prose dark:prose-invert prose-sm max-w-none">
                      <RenderMessage message={message} />
                      
                      {/* Render file attachments */}
                      {messageFiles.length > 0 && (
                        <div className={`mt-2 ${isUser ? 'text-blue-50' : 'text-gray-700 dark:text-gray-300'}`}>
                          {renderFileAttachments(messageFiles)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
            
            {group.toolCalls && (
              <div className="mt-4">
                <ToolSection toolCalls={group.toolCalls} />
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-3 rounded-bl-none">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-700 dark:text-red-300">
            <p>Error: {error.message}</p>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}
