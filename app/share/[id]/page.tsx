import { Chat } from '@/components/chat'
import { getSharedChat } from '@/lib/actions/chat'
import { getModels } from '@/lib/config/models'
import { convertToUIMessages } from '@/lib/utils'
import { notFound } from 'next/navigation'

export async function generateMetadata(props: {
  params: Promise<{ id: string }>
}) {
  try {
    const { id } = await props.params
    const chat = await getSharedChat(id)

    if (!chat || !chat.sharePath) {
      return {
        title: 'Chat Not Found'
      }
    }

    return {
      title: chat?.title?.toString().slice(0, 50) || 'Shared Chat'
    }
  } catch (error) {
    console.warn('Error generating metadata for shared chat:', error)
    return {
      title: 'Shared Chat'
    }
  }
}

export default async function SharePage(props: {
  params: Promise<{ id: string }>
}) {
  try {
    const { id } = await props.params
    const chat = await getSharedChat(id)

    if (!chat || !chat.sharePath) {
      return notFound()
    }

    const models = await getModels()
    return (
      <Chat
        id={chat.id}
        savedMessages={convertToUIMessages(chat.messages)}
        models={models}
      />
    )
  } catch (error) {
    console.error('Error loading shared chat:', error)
    return notFound()
  }
}
