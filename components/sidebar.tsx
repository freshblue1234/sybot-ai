'use client'

import { Button } from '@/components/ui/button'
<<<<<<< HEAD
import { Github, HelpCircle, Menu, MessageSquare, Settings, X } from 'lucide-react'
=======
import { Menu } from 'lucide-react'
>>>>>>> 41155a42ae5ee50065317213a1704586c96f7cfd
import { useEffect, useState } from 'react'
import HistoryContainer from './history-container'

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [chatHistory, setChatHistory] = useState<string[]>([])

  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory))
  }, [chatHistory])

  useEffect(() => {
    const savedChats = localStorage.getItem('chatHistory')
    if (savedChats) {
      setChatHistory(JSON.parse(savedChats))
    }
  }, [])

  return (
    <>
<<<<<<< HEAD
      {/* Mobile Menu Button */}
      <Button 
        variant="ghost" 
        size="icon"
        className="fixed top-20 left-4 z-50 lg:hidden bg-background/80 backdrop-blur-sm border border-border/50 shadow-lg hover:shadow-xl transition-all duration-200"
=======
      {/* Menu Button */}
      <Button 
        variant="ghost" 
        size="icon"
        className="fixed top-14 left-4 z-50"
>>>>>>> 41155a42ae5ee50065317213a1704586c96f7cfd
        onClick={() => setIsOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </Button>

<<<<<<< HEAD
      {/* Mobile Sidebar Modal */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
          <div className="h-[85vh] p-6 fixed top-24 left-4 flex flex-col w-80 bg-background/95 backdrop-blur-xl border border-border/50 shadow-2xl z-50 rounded-2xl lg:hidden">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground">Chat History</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="hover:bg-muted/50"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              <HistoryContainer />
            </div>

            {/* Mobile sidebar footer */}
            <div className="pt-4 border-t border-border/50 mt-4">
              <div className="flex flex-col gap-2">
                <Button variant="ghost" className="justify-start gap-3 text-sm">
                  <Settings className="h-4 w-4" />
                  Settings
                </Button>
                <Button variant="ghost" className="justify-start gap-3 text-sm">
                  <HelpCircle className="h-4 w-4" />
                  Help & FAQ
                </Button>
                <Button variant="ghost" className="justify-start gap-3 text-sm">
                  <Github className="h-4 w-4" />
                  GitHub
                </Button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:h-full lg:w-full">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/10 rounded-lg">
              <MessageSquare className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Chat History</h2>
              <p className="text-xs text-muted-foreground">Your recent conversations</p>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <HistoryContainer />
          </div>
        </div>

        {/* Desktop sidebar footer */}
        <div className="mt-auto p-6 border-t border-border/50">
          <div className="flex flex-col gap-2">
            <Button variant="ghost" className="justify-start gap-3 text-sm hover:bg-muted/50">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
            <Button variant="ghost" className="justify-start gap-3 text-sm hover:bg-muted/50">
              <HelpCircle className="h-4 w-4" />
              Help & FAQ
            </Button>
            <Button variant="ghost" className="justify-start gap-3 text-sm hover:bg-muted/50">
              <Github className="h-4 w-4" />
              GitHub
            </Button>
          </div>
        </div>
      </div>
=======
      {/* Sidebar Modal */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="h-[85vh] p-4 fixed top-24 left-0 flex flex-col w-64 bg-background border-r border-border z-50 rounded-r-lg">
            <HistoryContainer /> {/* ✅ Fixed line */}
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
>>>>>>> 41155a42ae5ee50065317213a1704586c96f7cfd
    </>
  )
}
