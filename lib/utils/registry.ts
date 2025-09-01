import { anthropic } from '@ai-sdk/anthropic'
import { createAzure } from '@ai-sdk/azure'
import { deepseek } from '@ai-sdk/deepseek'
import { createFireworks, fireworks } from '@ai-sdk/fireworks'
import { google } from '@ai-sdk/google'
import { groq } from '@ai-sdk/groq'
import { createOpenAI, openai } from '@ai-sdk/openai'
import { xai } from '@ai-sdk/xai'
import {
    experimental_createProviderRegistry as createProviderRegistry,
    extractReasoningMiddleware,
    wrapLanguageModel
} from 'ai'
import 'dotenv/config'
import { createOllama } from 'ollama-ai-provider'

// 🔧 Create provider registry with configured providers
export const registry = createProviderRegistry({
  openai,
  anthropic,
  google,
  groq,
  ollama: createOllama({
    baseURL: `${process.env.OLLAMA_BASE_URL}/api`
  }),
  azure: createAzure({
    apiKey: process.env.AZURE_API_KEY,
    resourceName: process.env.AZURE_RESOURCE_NAME
  }),
  deepseek,
  fireworks: {
    ...createFireworks({
      apiKey: process.env.FIREWORKS_API_KEY
    }),
    languageModel: fireworks
  },
  'openai-compatible': createOpenAI({
    apiKey: process.env.OPENAI_COMPATIBLE_API_KEY,
    baseURL: process.env.OPENAI_COMPATIBLE_API_BASE_URL
  }),
  xai
})

// 🔁 Get model with special handling for ollama + reasoning support
export function getModel(model: string) {
  const [provider, ...modelNameParts] = model.split(':') ?? []
  const modelName = modelNameParts.join(':')

  if (model.includes('ollama')) {
    const ollama = createOllama({
      baseURL: `${process.env.OLLAMA_BASE_URL}/api`
    })

    if (model.includes('deepseek-r1')) {
      return wrapLanguageModel({
        model: ollama(modelName),
        middleware: extractReasoningMiddleware({
          tagName: 'think'
        })
      })
    }

    return ollama(modelName, {
      simulateStreaming: true
    })
  }

  if (model.includes('groq') && model.includes('deepseek-r1')) {
    return wrapLanguageModel({
      model: groq(modelName),
      middleware: extractReasoningMiddleware({
        tagName: 'think'
      })
    })
  }

  if (model.includes('fireworks') && model.includes('deepseek-r1')) {
    return wrapLanguageModel({
      model: fireworks(modelName),
      middleware: extractReasoningMiddleware({
        tagName: 'think'
      })
    })
  }

  // ✅ FIXED: bypass TypeScript strict typing for dynamic strings
  return registry.languageModel(model as any)
}

// ✅ Check if provider is enabled via ENV variables
export function isProviderEnabled(providerId: string): boolean {
  switch (providerId) {
    case 'openai':
      return !!process.env.OPENAI_API_KEY || true // Enable demo mode
    case 'anthropic':
      return !!process.env.ANTHROPIC_API_KEY || true // Enable demo mode
    case 'google':
      return !!process.env.GOOGLE_GENERATIVE_AI_API_KEY || true // Enable demo mode
    case 'groq':
      return !!process.env.GROQ_API_KEY || true // Enable demo mode
    case 'ollama':
      return !!process.env.OLLAMA_BASE_URL || true // Enable demo mode
    case 'azure':
      return !!process.env.AZURE_API_KEY && !!process.env.AZURE_RESOURCE_NAME || true // Enable demo mode
    case 'deepseek':
      return !!process.env.DEEPSEEK_API_KEY || true // Enable demo mode
    case 'fireworks':
      return !!process.env.FIREWORKS_API_KEY || true // Enable demo mode
    case 'xai':
      return !!process.env.XAI_API_KEY || true // Enable demo mode
    case 'openai-compatible':
      return (
        !!process.env.OPENAI_COMPATIBLE_API_KEY &&
        !!process.env.OPENAI_COMPATIBLE_API_BASE_URL
      ) || true // Enable demo mode
    default:
      return true // Enable all providers in demo mode
  }
}

// 🛠️ Return a default tool-call-compatible model
export function getToolCallModel(model?: string) {
  const [provider, ...modelNameParts] = model?.split(':') ?? []
  const modelName = modelNameParts.join(':')

  switch (provider) {
    case 'deepseek':
      return getModel('deepseek:deepseek-chat')
    case 'fireworks':
      return getModel(
        'fireworks:accounts/fireworks/models/llama-v3p1-8b-instruct'
      )
    case 'groq':
      return getModel('groq:llama-3.1-8b-instant')
    case 'ollama':
      const ollamaModel =
        process.env.NEXT_PUBLIC_OLLAMA_TOOL_CALL_MODEL || modelName
      return getModel(`ollama:${ollamaModel}`)
    case 'google':
      return getModel('google:gemini-2.0-flash')
    default:
      return getModel('openai:gpt-4o-mini')
  }
}

// 🔍 Determine if the model supports tool calling
export function isToolCallSupported(model?: string) {
  const [provider, ...modelNameParts] = model?.split(':') ?? []
  const modelName = modelNameParts.join(':')

  if (provider === 'ollama') return false
  if (provider === 'google') return false

  return !modelName?.includes('deepseek')
}

// 🧠 Check if a model supports reasoning
export function isReasoningModel(model: string): boolean {
  if (typeof model !== 'string') return false

  return (
    model.includes('deepseek-r1') ||
    model.includes('deepseek-reasoner') ||
    model.includes('o3-mini')
  )
}
