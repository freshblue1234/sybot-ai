// app/chat/page.tsx
export const dynamic = 'force-dynamic'

import WorldClassChat from '@/components/world-class-chat'
import { getChats } from '@/lib/actions/chat'
import { getModels } from '@/lib/config/models'
import { convertToUIMessages } from '@/lib/utils'
import { cookies } from 'next/headers'

export default async function ChatPage() {
  const cookieStore = await cookies()
  const userId = cookieStore.get('userId')?.value || 'anonymous'
  const chats = await getChats(userId)
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

  // Convert chats to messages format
  const messages = chats.length > 0 ? convertToUIMessages(chats[0]?.messages || []) : []

  return (
    <WorldClassChat
      id="chat"
      initialMessages={messages}
      defaultModel={defaultModel}
      models={models}
    />
  )
}
