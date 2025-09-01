import { Chat } from '@/components/chat'
import { getChat } from '@/lib/actions/chat'
import { getModels } from '@/lib/config/models'
import { convertToUIMessages } from '@/lib/utils'
import { notFound } from 'next/navigation'

interface SharePageProps {
  params: Promise<{
    id: string
  }>
}

export default async function SharePage({ params }: SharePageProps) {
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

    return (
      <Chat
        id={chat.id}
        initialMessages={messages}
        models={models}
        defaultModel={defaultModel}
      />
    )
  } catch (error) {
    console.error('Error loading share page:', error)
    notFound()
  }
}
