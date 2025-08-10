import { Chat } from '@/components/chat'
import { getChat } from '@/lib/actions/chat'
import { getModels } from '@/lib/config/models'
import { convertToUIMessages } from '@/lib/utils'
import { ExtendedCoreMessage } from '@/lib/types'
import { notFound, redirect } from 'next/navigation'

export const maxDuration = 60

export async function generateMetadata(props: {
  params: Promise<{ id: string }>
}) {
  const { id } = await props.params
  const chat = await getChat(id, 'anonymous')
  return {
    title: chat?.title.toString().slice(0, 50) || 'Search'
  }
}
export default async function SearchPage(props: {
  params: Promise<{ id: string }>
}) {
  const userId = 'anonymous'
  const { id } = await props.params

  const MOCK_CHAT = {
    id: 'mock',
    userId: 'anonymous',
    title: 'Mock Search',
    path: '/search/mock',
    messages: [],
    createdAt: new Date(),
    updatedAt: new Date().toISOString(),
  };

  let chat;
  try {
    chat = await getChat(id, userId);
  } catch (err) {
    chat = null;
  }
  if (!chat || !chat.messages) {
    chat = MOCK_CHAT;
  }
  // convertToUIMessages for useChat hook
  const messages = convertToUIMessages(chat?.messages || [])

  if (!chat) {
    redirect('/')
  }

  if (chat?.userId !== userId) {
    notFound()
  }

  const models = await getModels()
  return <Chat id={id} savedMessages={messages} models={models} />
}
