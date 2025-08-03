'use client'

import { deleteChat, getChats } from '@/lib/actions/chat'
import { Chat } from '@/lib/types'
import { Search, X } from 'lucide-react'
import { cache, useMemo, useState, useTransition } from 'react'
import { toast } from 'sonner'
import { ClearHistory } from './clear-history'
import HistoryItem from './history-item'
import { Button } from './ui/button'
import { Input } from './ui/input'

type HistoryListProps = {
  userId?: string
}

const loadChats = cache(async (userId?: string) => {
  return await getChats(userId)
})

export async function HistoryList({ userId }: HistoryListProps) {
  const chats = await loadChats(userId)

  return <HistoryListClient chats={chats || []} userId={userId} />
}

// Client component for search functionality
function HistoryListClient({ chats, userId }: { chats: Chat[], userId?: string }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [deletedChats, setDeletedChats] = useState<Set<string>>(new Set())
  const [isPending, startTransition] = useTransition()

  // Filter chats based on search query and deleted state
  const filteredChats = useMemo(() => {
    return chats.filter(chat => {
      // Filter out deleted chats
      if (deletedChats.has(chat.id)) return false
      
      // Filter by search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase()
        return chat.title.toLowerCase().includes(query)
      }
      
      return true
    })
  }, [chats, searchQuery, deletedChats])

  const handleDeleteChat = (chatId: string) => {
    startTransition(async () => {
      const result = await deleteChat(chatId, userId)
      if (result?.error) {
        toast.error(result.error)
      } else {
        setDeletedChats(prev => new Set([...prev, chatId]))
        toast.success('Chat deleted successfully')
      }
    })
  }

  const clearSearch = () => {
    setSearchQuery('')
  }

  return (
    <div className="flex flex-col flex-1 space-y-4 h-full">
      {/* Search bar */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10 h-9 text-sm"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              onClick={clearSearch}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 hover:bg-muted/50"
            >
              <X size={14} />
            </Button>
          )}
        </div>
      </div>

      {/* Chat list */}
      <div className="flex flex-col space-y-2 flex-1 overflow-y-auto">
        {filteredChats.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            {searchQuery ? (
              <>
                <div className="w-12 h-12 bg-muted/50 rounded-full flex items-center justify-center mb-3">
                  <Search className="w-6 h-6 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground text-sm font-medium">No chats found</p>
                <p className="text-muted-foreground/70 text-xs mt-1">
                  Try adjusting your search terms
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearSearch}
                  className="mt-3"
                >
                  Clear search
                </Button>
              </>
            ) : (
              <>
                <div className="w-12 h-12 bg-muted/50 rounded-full flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-muted-foreground text-sm font-medium">No search history</p>
                <p className="text-muted-foreground/70 text-xs mt-1">Your conversations will appear here</p>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-1">
            {filteredChats.map((chat) => (
              <HistoryItem 
                key={chat.id} 
                chat={chat} 
                onDelete={handleDeleteChat}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer with clear all button */}
      <div className="mt-auto pt-4 border-t border-border/50">
        <ClearHistory empty={filteredChats.length === 0} />
      </div>
    </div>
  )
}
