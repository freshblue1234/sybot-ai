import { Chat } from '@/components/chat'
import { getChat } from '@/lib/actions/chat'
import { getModels } from '@/lib/config/models'
import { convertToUIMessages } from '@/lib/utils'
import { notFound } from 'next/navigation'

interface SearchPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function SearchPage({ params }: SearchPageProps) {
  const { id } = await params

  try {
    const chat = await getChat(id)
    if (!chat) {
      notFound()
    }

    const messages = convertToUIMessages(chat.messages || [])
    const models = await getModels()
    
    // Select default model - prioritize working OpenAI models
    let defaultModel = models.find(model => 
      model.id === 'gpt-4o-mini' || 
      model.id === 'gpt-4o' || 
      model.id === 'gpt-4.1-mini' ||
      model.provider === 'openai'
    )
    
    // Fallback to first available model if no OpenAI models found
    if (!defaultModel && models.length > 0) {
      defaultModel = models[0]
    }

    return <Chat id={id} initialMessages={messages} models={models} defaultModel={defaultModel} />
  } catch (error) {
    console.error('Error loading search page:', error)
    // If there's an error, redirect to home page
    notFound()
  }
}
