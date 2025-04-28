import { Chat } from '@/components/chat'
import { getChat } from '@/lib/actions/chat'
import { getModels } from '@/lib/config/models'
import { convertToUIMessages } from '@/lib/utils'
import { notFound, redirect } from 'next/navigation'

export const maxDuration = 60

export async function generateMetadata(props: {
  params: { id: string }
}) {
  const { id } = props.params
  const chat = await getChat(id, 'anonymous')
  return {
    title: chat?.title.toString().slice(0, 50) || 'Search'
  }
}

export default async function SearchPage(props: {
  params: { id: string }
}) {
  const userId = 'anonymous'
  const { id } = props.params

  const chat = await getChat(id, userId)

  if (!chat) {
    redirect('/')
  }

  if (chat?.userId !== userId) {
    notFound()
  }

  const messages = convertToUIMessages(chat.messages || [])
  const models = await getModels()

  return <Chat id={id} savedMessages={messages} models={models} />
}
