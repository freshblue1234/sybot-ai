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
    <div className="flex items-center justify-center h-full">
      <div className="text-center text-gray-400 max-w-md mx-auto px-6">
        <div className="mb-6">
          <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 bg-blue-500 rounded-full animate-pulse"></div>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">Hello! I&apos;m Sybot 👋</h2>
        <p className="text-lg text-gray-300 mb-4">
          Your intelligent AI companion, ready to chat, help, and explore with you.
        </p>
        <p className="text-base text-gray-400">
          Just type your message below or click the microphone to speak naturally!
        </p>
        
        {/* Quick Start Suggestions */}
        <div className="mt-8 grid grid-cols-1 gap-3">
          <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
            <p className="text-sm text-gray-300">
              💡 <span className="font-medium">Try asking:</span> &ldquo;What can you help me with today?&rdquo;
            </p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
            <p className="text-sm text-gray-300">
              🎯 <span className="font-medium">Or say:</span> &ldquo;Tell me something interesting!&rdquo;
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
