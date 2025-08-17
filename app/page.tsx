// app/page.tsx
export const dynamic = 'force-dynamic'

import { Chat } from '@/components/chat'
import { ErrorBoundary } from '@/components/error-boundary'
import { LoadingPage } from '@/components/loading'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { getModels } from '@/lib/config/models'
import { generateId } from 'ai'
import {
    BookOpen,
    Bot,
    Clock,
    Globe,
    MessageSquare,
    Search,
    Shield,
    Sparkles,
    TrendingUp,
    Users,
    Zap
} from 'lucide-react'
import { Suspense } from 'react'

export default async function Page() {
  const id = generateId()
  const models = await getModels()

  const features = [
    {
      icon: Bot,
      title: 'AI-Powered Chat',
      description: 'Advanced conversational AI with context awareness and natural language processing.',
      color: 'text-blue-500'
    },
    {
      icon: Search,
      title: 'Web Search',
      description: 'Real-time web search integration for up-to-date information and answers.',
      color: 'text-green-500'
    },
    {
      icon: Sparkles,
      title: 'Smart Responses',
      description: 'Intelligent responses with reasoning, citations, and multiple perspectives.',
      color: 'text-purple-500'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your data stays private with end-to-end encryption and local processing.',
      color: 'text-orange-500'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized for speed with streaming responses and efficient processing.',
      color: 'text-yellow-500'
    },
    {
      icon: Globe,
      title: 'Multi-Modal',
      description: 'Support for text, images, files, and various content types.',
      color: 'text-pink-500'
    }
  ]

  const stats = [
    { label: 'Active Users', value: '10K+', icon: Users },
    { label: 'Daily Queries', value: '50K+', icon: MessageSquare },
    { label: 'Response Time', value: '<2s', icon: Clock },
    { label: 'Uptime', value: '99.9%', icon: TrendingUp }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="text-center py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="w-3 h-3 mr-1" />
            AI-Powered Answer Engine
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            Your Intelligent
            <br />
            AI Assistant
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experience the future of AI-powered conversations. Get instant answers, 
            search the web, and chat with advanced AI models.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="text-lg px-8 py-6">
              <MessageSquare className="w-5 h-5 mr-2" />
              Start Chatting
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              <BookOpen className="w-5 h-5 mr-2" />
              View Documentation
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <stat.icon className="w-6 h-6 text-primary mr-2" />
                  <span className="text-2xl font-bold">{stat.value}</span>
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Separator className="my-12" />

      {/* Features Section */}
      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need for intelligent conversations and information retrieval
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="p-6 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center mb-4">
                    <feature.icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Separator className="my-12" />

      {/* Chat Section */}
      <div className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Try It Now</h2>
            <p className="text-muted-foreground">
              Start a conversation with our AI assistant
            </p>
          </div>
          
          <Suspense fallback={<LoadingPage />}>
            <ErrorBoundary>
              <Chat id={id} models={models} />
            </ErrorBoundary>
          </Suspense>
        </div>
      </div>
    </div>
  )
}
