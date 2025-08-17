import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Bot, Globe, Lightbulb, Search, Sparkles, Zap } from 'lucide-react'

const exampleMessages = [
  {
    heading: 'Explore the world',
    message: 'What are the latest developments in renewable energy?',
    icon: Globe,
    bgColor: 'bg-blue-500/10',
    iconColor: 'text-blue-500'
  },
  {
    heading: 'Get creative',
    message: 'Write a short story about a time traveler in ancient Rome',
    icon: Sparkles,
    bgColor: 'bg-purple-500/10',
    iconColor: 'text-purple-500'
  },
  {
    heading: 'Learn something new',
    message: 'Explain quantum computing in simple terms',
    icon: Lightbulb,
    bgColor: 'bg-yellow-500/10',
    iconColor: 'text-yellow-500'
  },
  {
    heading: 'Stay informed',
    message: 'What are the current trends in artificial intelligence?',
    icon: Search,
    bgColor: 'bg-green-500/10',
    iconColor: 'text-green-500'
  },
  {
    heading: 'Get help',
    message: 'How can I improve my productivity at work?',
    icon: Zap,
    bgColor: 'bg-orange-500/10',
    iconColor: 'text-orange-500'
  },
  {
    heading: 'Have fun',
    message: 'Tell me a joke about programming',
    icon: Bot,
    bgColor: 'bg-pink-500/10',
    iconColor: 'text-pink-500'
  }
]

export function EmptyScreen() {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-background p-8">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Bot className="w-8 h-8 text-primary" />
          </div>
          <h1 className="mb-2 text-lg font-semibold">Welcome to Sybot AI</h1>
          <p className="mb-4 text-sm text-muted-foreground">
            Your intelligent AI assistant is ready to help. Ask me anything!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {exampleMessages.map((example, index) => (
            <Card
              key={index}
              className="group cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-[1.02]"
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
                      example.bgColor
                    )}
                  >
                    <example.icon
                      className={cn('w-5 h-5', example.iconColor)}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium mb-1 group-hover:text-primary transition-colors">
                      {example.heading}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {example.message}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-4">
            💡 <strong>Pro tip:</strong> Try asking follow-up questions to dive
            deeper into any topic
          </p>
          <div className="flex flex-wrap justify-center gap-2 text-xs text-muted-foreground">
            <span className="px-2 py-1 bg-muted rounded-full">Web Search</span>
            <span className="px-2 py-1 bg-muted rounded-full">Voice Input</span>
            <span className="px-2 py-1 bg-muted rounded-full">
              Multi-language
            </span>
            <span className="px-2 py-1 bg-muted rounded-full">Real-time</span>
          </div>
        </div>
      </div>
    </div>
  )
}
