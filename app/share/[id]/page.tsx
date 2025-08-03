import { Chat } from '@/components/chat'
import { getSharedChat } from '@/lib/actions/chat'
import { getModels } from '@/lib/config/models'
import { convertToUIMessages } from '@/lib/utils'
import { notFound } from 'next/navigation'

export async function generateMetadata(props: {
  params: Promise<{ id: string }>
}) {
<<<<<<< HEAD
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
=======
  const { id } = await props.params
  const chat = await getSharedChat(id)

  if (!chat || !chat.sharePath) {
    return notFound()
  }

  return {
    title: chat?.title.toString().slice(0, 50) || 'Search'
>>>>>>> 41155a42ae5ee50065317213a1704586c96f7cfd
  }
}

export default async function SharePage(props: {
  params: Promise<{ id: string }>
}) {
<<<<<<< HEAD
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
=======
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
>>>>>>> 41155a42ae5ee50065317213a1704586c96f7cfd
}
