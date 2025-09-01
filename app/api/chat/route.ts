import { createManualToolStreamResponse } from '@/lib/streaming/create-manual-tool-stream'
import { createToolCallingStreamResponse } from '@/lib/streaming/create-tool-calling-stream'
import { Model } from '@/lib/types/models'
import { isProviderEnabled } from '@/lib/utils/registry'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const maxDuration = 30

const DEFAULT_MODEL: Model = {
  id: 'gpt-4o-mini',
  name: 'GPT-4o mini',
  provider: 'OpenAI',
  providerId: 'openai',
  enabled: true,
  toolCallType: 'native'
}

// Helper function to handle file uploads
async function handleFileUpload(formData: FormData) {
  const files: Array<{
    name: string
    type: string
    size: number
    url?: string
  }> = []

  // Process each file in the form data
  for (const [key, value] of formData.entries()) {
    if (key.startsWith('file-') && value instanceof File) {
      const file = value as File
      // In a real app, you would upload the file to a storage service here
      // For now, we'll just return the file metadata
      files.push({
        name: file.name,
        type: file.type,
        size: file.size,
        // In a real implementation, this would be the URL of the uploaded file
        // url: await uploadFileToStorage(file)
      })
    }
  }

  return files
}

export async function POST(req: Request) {
  try {
    // Check if this is a file upload request
    const contentType = req.headers.get('content-type')
    if (contentType?.includes('multipart/form-data')) {
      const formData = await req.formData()
      const files = await handleFileUpload(formData)
      
      // Return the file metadata
      return NextResponse.json({ files })
    }

    // Handle regular chat messages
    const { messages, id: chatId, files: fileMetadata = [] } = await req.json()
    const referer = req.headers.get('referer')
    const isSharePage = referer?.includes('/share/')

    if (isSharePage) {
      return new Response('Chat API is not available on share pages', {
        status: 403,
        statusText: 'Forbidden'
      })
    }

    const cookieStore = await cookies()
    const modelJson = cookieStore.get('selectedModel')?.value
    const searchMode = cookieStore.get('search-mode')?.value === 'true'

    let selectedModel = DEFAULT_MODEL

    if (modelJson) {
      try {
        selectedModel = JSON.parse(modelJson) as Model
      } catch (e) {
        console.error('Failed to parse selected model:', e)
      }
    }

    if (
      !isProviderEnabled(selectedModel.providerId) ||
      selectedModel.enabled === false
    ) {
      return new Response(
        `Selected provider is not enabled ${selectedModel.providerId}`,
        {
          status: 404,
          statusText: 'Not Found'
        }
      )
    }

    const supportsToolCalling = selectedModel.toolCallType === 'native'

    // Include file metadata in the messages if available
    const messagesWithFiles = messages.map((message: any) => {
      if (message.files) {
        return {
          ...message,
          // Add file metadata to the message content
          content: message.content + '\n\nAttachments:\n' + 
            message.files.map((file: any) => `- ${file.name} (${file.type}, ${(file.size / 1024).toFixed(1)} KB)`).join('\n')
        }
      }
      return message
    })

    return supportsToolCalling
      ? createToolCallingStreamResponse({
          messages: messagesWithFiles,
          model: selectedModel,
          chatId,
          searchMode
        })
      : createManualToolStreamResponse({
          messages: messagesWithFiles,
          model: selectedModel,
          chatId,
          searchMode
        })
  } catch (error) {
    console.error('API route error:', error)
    return new Response('Error processing your request', {
      status: 500,
      statusText: 'Internal Server Error'
    })
  }
}
