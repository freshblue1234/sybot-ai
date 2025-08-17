// app/page.tsx
export const dynamic = 'force-dynamic'

import { Chat } from '@/components/chat'
import { getModels } from '@/lib/config/models'
import { generateId } from 'ai'

export default async function Page() {
  const id = generateId() // generate a unique id
  const models = await getModels() // fetch models
  return <Chat id={id} models={models} />
}
