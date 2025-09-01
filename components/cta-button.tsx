'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function CTAButton() {
  const router = useRouter()

  const navigateToChat = () => {
    router.push('/chat')
  }

  return (
    <Button 
      size="lg" 
      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
      onClick={navigateToChat}
    >
      Start Now for Free
      <ArrowRight className="ml-2 h-5 w-5" />
    </Button>
  )
}
