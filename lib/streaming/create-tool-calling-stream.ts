import { researcher } from '@/lib/agents/researcher'
import {
  convertToCoreMessages,
  CoreMessage,
  createDataStreamResponse,
  DataStreamWriter,
  streamText
} from 'ai'
import { getMaxAllowedTokens, truncateMessages } from '../utils/context-window'
import { isReasoningModel } from '../utils/registry'
import { handleStreamFinish } from './handle-stream-finish'
import { BaseStreamConfig } from './types'

// Function to check if a message contains ask_question tool invocation
function containsAskQuestionTool(message: CoreMessage) {
  // For CoreMessage format, we check the content array
  if (message.role !== 'assistant' || !Array.isArray(message.content)) {
    return false
  }

  // Check if any content item is a tool-call with ask_question tool
  return message.content.some(
    item => item.type === 'tool-call' && item.toolName === 'ask_question'
  )
}

// Demo response generator for when no API keys are available
function generateDemoResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase()

  if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    return `Hello! I'm Sybot, an AI assistant created by Sycom Industrials in Rwanda. I'm here to help you with your questions and tasks. 

**Note:** I'm currently running in demo mode. To get full AI capabilities, please configure an API key for one of the supported providers (OpenAI, Anthropic, Google, etc.).

What can I help you with today?`
  }

  if (
    lowerMessage.includes('weather') ||
    lowerMessage.includes('temperature')
  ) {
    return `I'd be happy to help you with weather information! However, I'm currently running in demo mode and don't have access to real-time weather data.

**To get live weather updates:**
1. Configure an API key for one of the supported AI providers
2. I'll be able to search for current weather information for any location

For now, you can check weather services like:
- [Weather.com](https://weather.com)
- [AccuWeather](https://accuweather.com)
- [Google Weather](https://google.com/search?q=weather)`
  }

  if (
    lowerMessage.includes('news') ||
    lowerMessage.includes('current events')
  ) {
    return `I'd love to provide you with the latest news! However, I'm currently running in demo mode and don't have access to real-time news sources.

**To get current news updates:**
1. Configure an API key for one of the supported AI providers
2. I'll be able to search for and summarize the latest news

For now, you can check these reliable news sources:
- [BBC News](https://bbc.com/news)
- [Reuters](https://reuters.com)
- [Associated Press](https://ap.org)`
  }

  if (
    lowerMessage.includes('help') ||
    lowerMessage.includes('what can you do')
  ) {
    return `I'm Sybot, an AI assistant with many capabilities! Here's what I can help you with:

## 🤖 **My Capabilities**
- **Web Search**: Find real-time information from the internet
- **Content Retrieval**: Extract and summarize content from specific URLs
- **Video Search**: Find relevant video content
- **Question Clarification**: Ask follow-up questions when needed
- **Multi-language Support**: I can communicate in many languages
- **Voice Features**: Speech recognition and text-to-speech (when supported)

## 🔧 **Current Status**
I'm running in **demo mode** right now. To unlock my full capabilities:

1. **Configure an API Key**: Add your API key for OpenAI, Anthropic, Google, or other supported providers
2. **Restart the App**: The app will automatically detect your API key
3. **Start Chatting**: I'll be able to search the web, retrieve content, and provide comprehensive answers

## 🎯 **Try These Questions**
- "What's the weather like in Kigali?"
- "Tell me about the latest tech news"
- "How do I make traditional Rwandan coffee?"
- "What are the best tourist attractions in Rwanda?"

Would you like me to help you set up an API key, or do you have any other questions?`
  }

  // Default response for other questions
  return `Thank you for your question! I'm Sybot, an AI assistant created by Sycom Industrials in Rwanda.

**Current Status:** I'm running in demo mode and don't have access to real-time information or AI processing capabilities.

**To get a full response to your question:**
1. Configure an API key for one of the supported providers (OpenAI, Anthropic, Google, etc.)
2. Restart the application
3. Ask your question again, and I'll be able to search the web and provide comprehensive answers

**Supported Providers:**
- OpenAI (GPT models)
- Anthropic (Claude models)
- Google (Gemini models)
- Groq (Fast inference)
- Local Ollama models
- And many more!

For now, I can help you understand my capabilities and guide you through the setup process. What would you like to know?`
}

export function createToolCallingStreamResponse(config: BaseStreamConfig) {
  return createDataStreamResponse({
    execute: async (dataStream: DataStreamWriter) => {
      const { messages, model, chatId, searchMode } = config
      const modelId = `${model.providerId}:${model.id}`

      try {
        // Check if we have any API keys configured
        const hasApiKeys =
          process.env.OPENAI_API_KEY ||
          process.env.ANTHROPIC_API_KEY ||
          process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
          process.env.GROQ_API_KEY ||
          process.env.OLLAMA_BASE_URL

        if (!hasApiKeys) {
          // Demo mode - provide helpful response without API keys
          const lastUserMessage = messages[messages.length - 1]?.content || ''
          const demoResponse = generateDemoResponse(lastUserMessage)

          // Simulate streaming response
          const words = demoResponse.split(' ')
          for (let i = 0; i < words.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 50)) // 50ms delay between words
            dataStream.write({
              type: 'text-delta',
              textDelta: words[i] + (i < words.length - 1 ? ' ' : '')
            })
          }

          // Add assistant message to the stream
          dataStream.write({
            type: 'message',
            message: {
              id: `demo-${Date.now()}`,
              role: 'assistant',
              content: demoResponse
            }
          })

          dataStream.write({ type: 'done' })
          return
        }

        const coreMessages = convertToCoreMessages(messages)
        const truncatedMessages = truncateMessages(
          coreMessages,
          getMaxAllowedTokens(model)
        )

        let researcherConfig = await researcher({
          messages: truncatedMessages,
          model: modelId,
          searchMode
        })

        const result = streamText({
          ...researcherConfig,
          onFinish: async result => {
            // Check if the last message contains an ask_question tool invocation
            const shouldSkipRelatedQuestions =
              isReasoningModel(modelId) ||
              (result.response.messages.length > 0 &&
                containsAskQuestionTool(
                  result.response.messages[
                    result.response.messages.length - 1
                  ] as CoreMessage
                ))

            await handleStreamFinish({
              responseMessages: result.response.messages,
              originalMessages: messages,
              model: modelId,
              chatId,
              dataStream,
              skipRelatedQuestions: shouldSkipRelatedQuestions
            })
          }
        })

        result.mergeIntoDataStream(dataStream)
      } catch (error) {
        console.error('Stream execution error:', error)

        // Provide helpful error message in demo mode
        const errorMessage = `I encountered an error while processing your request. This might be because:

1. **No API Key Configured**: Please add an API key for one of the supported providers
2. **Network Issue**: Check your internet connection
3. **Service Unavailable**: The AI service might be temporarily down

**To fix this:**
- Add your API key to the environment variables
- Restart the application
- Try your question again

Error details: ${error instanceof Error ? error.message : String(error)}`

        dataStream.write({
          type: 'text-delta',
          textDelta: errorMessage
        })

        dataStream.write({ type: 'done' })
      }
    },
    onError: error => {
      // console.error('Stream error:', error)
      return error instanceof Error ? error.message : String(error)
    }
  })
}
