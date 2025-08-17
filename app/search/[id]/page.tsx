import { Chat } from '@/components/chat'
import { getChat } from '@/lib/actions/chat'
import { getModels } from '@/lib/config/models'
import { convertToUIMessages } from '@/lib/utils'
import { notFound, redirect } from 'next/navigation'

export const maxDuration = 60

export async function generateMetadata(props: {
  params: Promise<{ id: string }>
}) {
  try {
    const { id } = await props.params
    const chat = await getChat(id, 'anonymous')
    return {
      title: chat?.title?.toString().slice(0, 50) || 'Search'
    }
  } catch (error) {
    console.warn('Error generating metadata:', error)
    return {
      title: 'Search'
    }
  }
}

export default async function SearchPage(props: {
  params: Promise<{ id: string }>
}) {
  const userId = 'anonymous'
  const { id } = await props.params

  try {
    const chat = await getChat(id, userId)

    // If chat is not found, redirect to home
    if (!chat) {
      redirect('/')
    }

    if (chat?.userId !== userId) {
      notFound()
    }

    // convertToUIMessages for useChat hook
    const messages = convertToUIMessages(chat?.messages || [])
    const models = await getModels()

    return <Chat id={id} savedMessages={messages} models={models} />
  } catch (error) {
    console.error('Error loading search page:', error)
    // If there's an error, redirect to home page
    redirect('/')
  }
}
