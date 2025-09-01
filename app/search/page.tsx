import { Chat } from '@/components/chat'
import { getModels } from '@/lib/config/models'
import { generateId } from 'ai'

interface SearchPageProps {
  searchParams: Promise<{
    q?: string
  }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams
  
  if (!q) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Search Query Required</h1>
          <p className="text-gray-400">Please provide a search query.</p>
        </div>
      </div>
    )
  }

  const id = generateId()
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

  return <Chat id={id} models={models} defaultModel={defaultModel} />
}
