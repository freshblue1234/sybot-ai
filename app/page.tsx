// app/page.tsx
export const dynamic = 'force-dynamic'

import { Chat } from '@/components/chat'
import { getChats } from '@/lib/actions/chat'
import { getModels } from '@/lib/config/models'
import { convertToUIMessages } from '@/lib/utils'

export default async function HomePage() {
  const [chats, models] = await Promise.all([
    getChats(),
    getModels()
  ])

  const messages = convertToUIMessages(chats?.[0]?.messages || [])

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="mb-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
                Sybot AI
              </h1>
              <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Your intelligent AI assistant powered by cutting-edge language models. 
                Ask anything, get instant answers with web search capabilities.
              </p>
            </div>
            
            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:bg-card/70 transition-all duration-300">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
                <p className="text-muted-foreground text-sm">Get instant responses powered by the latest AI models</p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:bg-card/70 transition-all duration-300">
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Web Search</h3>
                <p className="text-muted-foreground text-sm">Access real-time information from across the web</p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:bg-card/70 transition-all duration-300">
                <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Voice Ready</h3>
                <p className="text-muted-foreground text-sm">Speak naturally with voice input and output support</p>
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-3xl shadow-2xl overflow-hidden">
            <Chat id="new" savedMessages={messages} models={models} />
          </div>

          {/* Footer Info */}
          <div className="text-center mt-12 text-sm text-muted-foreground">
            <p className="mb-2">
              Powered by Sycom Industrials • Built with Next.js and AI
            </p>
            <p>
              Start chatting to experience the future of AI assistance
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
