'use client'

import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { useEffect, useState } from 'react'
import HistoryContainer from './history-container'

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [chatHistory, setChatHistory] = useState<string[]>([])

  // Save to localStorage when chatHistory changes
  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory))
  }, [chatHistory])

  // Load chats from localStorage when sidebar mounts
  useEffect(() => {
    const savedChats = localStorage.getItem('chatHistory')
    if (savedChats) {
      setChatHistory(JSON.parse(savedChats))
    }
  }, [])

  const handleNewChat = (message: string) => {
    setChatHistory(prev => [...prev, message])
  }

  return (
    <>
      {/* Menu Button */}
      <Button 
        variant="ghost" 
        size="icon"
        className="fixed top-14 left-4 z-50"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Sidebar Modal */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Sidebar Content */}
          <div className="h-[85vh] p-4 fixed top-24 left-0 flex flex-col w-64 bg-background border-r border-border z-50 rounded-r-lg">
            {/* Pass chatHistory to HistoryContainer */}
            <HistoryContainer chats={chatHistory} />

            <Button
              variant="ghost"
              className="mt-auto"
              onClick={() => setIsOpen(false)}
            >
              Close
            </Button>
          </div>
        </>
      )}
    </>
  )
}
