'use server'

<<<<<<< HEAD
import { getRedisClient, RedisWrapper } from '@/lib/redis/config'
import { type Chat } from '@/lib/types'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

async function getRedis(): Promise<RedisWrapper | null> {
  try {
    return await getRedisClient()
  } catch (error) {
    console.warn('Redis connection failed, using fallback mode:', error)
    return null
  }
=======
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { type Chat } from '@/lib/types'
import { getRedisClient, RedisWrapper } from '@/lib/redis/config'

async function getRedis(): Promise<RedisWrapper> {
  return await getRedisClient()
>>>>>>> 41155a42ae5ee50065317213a1704586c96f7cfd
}

const CHAT_VERSION = 'v2'
function getUserChatKey(userId: string) {
  return `user:${CHAT_VERSION}:chat:${userId}`
}

<<<<<<< HEAD
// In-memory fallback storage when Redis is not available
const fallbackStorage = new Map<string, Chat>()

=======
>>>>>>> 41155a42ae5ee50065317213a1704586c96f7cfd
export async function getChats(userId?: string | null) {
  if (!userId) {
    return []
  }

  try {
    const redis = await getRedis()
<<<<<<< HEAD
    if (!redis) {
      // Fallback: return empty array when Redis is not available
      console.warn('Redis not available, returning empty chat list')
      return []
    }

=======
>>>>>>> 41155a42ae5ee50065317213a1704586c96f7cfd
    const chats = await redis.zrange(getUserChatKey(userId), 0, -1, {
      rev: true
    })

    if (chats.length === 0) {
      return []
    }

    const results = await Promise.all(
      chats.map(async chatKey => {
        const chat = await redis.hgetall(chatKey)
        return chat
      })
    )

    return results
      .filter((result): result is Record<string, any> => {
        if (result === null || Object.keys(result).length === 0) {
          return false
        }
        return true
      })
      .map(chat => {
        const plainChat = { ...chat }
        if (typeof plainChat.messages === 'string') {
          try {
            plainChat.messages = JSON.parse(plainChat.messages)
          } catch (error) {
            plainChat.messages = []
          }
        }
        if (plainChat.createdAt && !(plainChat.createdAt instanceof Date)) {
          plainChat.createdAt = new Date(plainChat.createdAt)
        }
        return plainChat as Chat
      })
  } catch (error) {
<<<<<<< HEAD
    console.error('Error getting chats:', error)
=======
>>>>>>> 41155a42ae5ee50065317213a1704586c96f7cfd
    return []
  }
}

export async function getChat(id: string, userId: string = 'anonymous') {
<<<<<<< HEAD
  try {
    const redis = await getRedis()
    if (!redis) {
      // Fallback: return null when Redis is not available
      console.warn('Redis not available, cannot retrieve chat')
      return null
    }

    const chat = await redis.hgetall<Chat>(`chat:${id}`)

    if (!chat) {
      return null
    }

    // Parse the messages if they're stored as a string
    if (typeof chat.messages === 'string') {
      try {
        chat.messages = JSON.parse(chat.messages)
      } catch (error) {
        chat.messages = []
      }
    }

    // Ensure messages is always an array
    if (!Array.isArray(chat.messages)) {
      chat.messages = []
    }

    return chat
  } catch (error) {
    console.error('Error getting chat:', error)
    return null
  }
}

export async function deleteChat(
  chatId: string,
  userId: string = 'anonymous'
): Promise<{ error?: string }> {
  try {
    const redis = await getRedis()
    if (!redis) {
      // Fallback: simulate successful deletion
      console.warn('Redis not available, simulating chat deletion')
      return {}
    }

    const userChatKey = getUserChatKey(userId)
    const chatKey = `chat:${chatId}`

    // Check if the chat exists and belongs to the user
    const chat = await redis.hgetall(chatKey)
    if (!chat || chat.userId !== userId) {
      return { error: 'Chat not found or access denied' }
    }

    // Delete the chat and remove it from the user's chat list
    const pipeline = redis.pipeline()
    pipeline.del(chatKey)
    pipeline.zrem(userChatKey, chatKey)

    await pipeline.exec()

    revalidatePath('/')
    return {}
  } catch (error) {
    console.error('Error deleting chat:', error)
    return { error: 'Failed to delete chat' }
  }
=======
  const redis = await getRedis()
  const chat = await redis.hgetall<Chat>(`chat:${id}`)

  if (!chat) {
    return null
  }

  // Parse the messages if they're stored as a string
  if (typeof chat.messages === 'string') {
    try {
      chat.messages = JSON.parse(chat.messages)
    } catch (error) {
      chat.messages = []
    }
  }

  // Ensure messages is always an array
  if (!Array.isArray(chat.messages)) {
    chat.messages = []
  }

  return chat
>>>>>>> 41155a42ae5ee50065317213a1704586c96f7cfd
}

export async function clearChats(
  userId: string = 'anonymous'
): Promise<{ error?: string }> {
<<<<<<< HEAD
  try {
    const redis = await getRedis()
    if (!redis) {
      // Fallback: simulate successful clearing
      console.warn('Redis not available, simulating chat clearing')
      revalidatePath('/')
      redirect('/')
      return {}
    }

    const userChatKey = getUserChatKey(userId)
    const chats = await redis.zrange(userChatKey, 0, -1)
    if (!chats.length) {
      return { error: 'No chats to clear' }
    }
    const pipeline = redis.pipeline()

    for (const chat of chats) {
      pipeline.del(chat)
      pipeline.zrem(userChatKey, chat)
    }

    await pipeline.exec()

    revalidatePath('/')
    redirect('/')
  } catch (error) {
    console.error('Error clearing chats:', error)
    return { error: 'Failed to clear chats' }
  }
=======
  const redis = await getRedis()
  const userChatKey = getUserChatKey(userId)
  const chats = await redis.zrange(userChatKey, 0, -1)
  if (!chats.length) {
    return { error: 'No chats to clear' }
  }
  const pipeline = redis.pipeline()

  for (const chat of chats) {
    pipeline.del(chat)
    pipeline.zrem(userChatKey, chat)
  }

  await pipeline.exec()

  revalidatePath('/')
  redirect('/')
>>>>>>> 41155a42ae5ee50065317213a1704586c96f7cfd
}

export async function saveChat(chat: Chat, userId: string = 'anonymous') {
  try {
    const redis = await getRedis()
<<<<<<< HEAD
    if (!redis) {
      // Fallback: store in memory (this will be lost on server restart)
      console.warn('Redis not available, storing chat in memory')
      fallbackStorage.set(chat.id, chat)
      return []
    }

=======
>>>>>>> 41155a42ae5ee50065317213a1704586c96f7cfd
    const pipeline = redis.pipeline()

    const chatToSave = {
      ...chat,
      messages: JSON.stringify(chat.messages)
    }

    pipeline.hmset(`chat:${chat.id}`, chatToSave)
    pipeline.zadd(getUserChatKey(userId), Date.now(), `chat:${chat.id}`)

    const results = await pipeline.exec()

    return results
  } catch (error) {
<<<<<<< HEAD
    console.error('Error saving chat:', error)
=======
>>>>>>> 41155a42ae5ee50065317213a1704586c96f7cfd
    throw error
  }
}

export async function getSharedChat(id: string) {
<<<<<<< HEAD
  try {
    const redis = await getRedis()
    if (!redis) {
      // Fallback: return null when Redis is not available
      console.warn('Redis not available, cannot retrieve shared chat')
      return null
    }

    const chat = await redis.hgetall<Chat>(`chat:${id}`)

    if (!chat || !chat.sharePath) {
      return null
    }

    return chat
  } catch (error) {
    console.error('Error getting shared chat:', error)
    return null
  }
}

export async function shareChat(id: string, userId: string = 'anonymous') {
  try {
    const redis = await getRedis()
    if (!redis) {
      // Fallback: return null when Redis is not available
      console.warn('Redis not available, cannot share chat')
      return null
    }

    const chat = await redis.hgetall<Chat>(`chat:${id}`)

    if (!chat || chat.userId !== userId) {
      return null
    }

    const payload = {
      ...chat,
      sharePath: `/share/${id}`
    }

    await redis.hmset(`chat:${id}`, payload)

    return payload
  } catch (error) {
    console.error('Error sharing chat:', error)
    return null
  }
=======
  const redis = await getRedis()
  const chat = await redis.hgetall<Chat>(`chat:${id}`)

  if (!chat || !chat.sharePath) {
    return null
  }

  return chat
}

export async function shareChat(id: string, userId: string = 'anonymous') {
  const redis = await getRedis()
  const chat = await redis.hgetall<Chat>(`chat:${id}`)

  if (!chat || chat.userId !== userId) {
    return null
  }

  const payload = {
    ...chat,
    sharePath: `/share/${id}`
  }

  await redis.hmset(`chat:${id}`, payload)

  return payload
>>>>>>> 41155a42ae5ee50065317213a1704586c96f7cfd
}
