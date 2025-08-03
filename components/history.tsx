'use client'

import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@/components/ui/sheet'
import { History as HistoryIcon, Menu } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Suspense, useTransition } from 'react'
import { HistorySkeleton } from './history-skeleton'

type HistoryProps = {
  children?: React.ReactNode
}

export function History({ children }: HistoryProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const onOpenChange = (open: boolean) => {
    if (open) {
      startTransition(() => {
        router.refresh()
      })
    }
  }

  return (
    <Sheet onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="h-8 w-8 lg:h-9 lg:w-9 hover:bg-muted/50 transition-all duration-200"
        >
          <Menu className="h-4 w-4 lg:h-5 lg:w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-80 lg:w-96 rounded-tl-2xl rounded-bl-2xl border-l border-border/50 bg-background/95 backdrop-blur-xl">
        <SheetHeader className="pb-4 border-b border-border/50">
          <SheetTitle className="flex items-center gap-2 text-base font-semibold">
            <div className="p-1.5 bg-primary/10 rounded-lg">
              <HistoryIcon size={16} className="text-primary" />
            </div>
            Chat History
          </SheetTitle>
        </SheetHeader>
        <div className="my-4 h-full pb-16 overflow-y-auto">
          <Suspense fallback={<HistorySkeleton />}>{children}</Suspense>
        </div>
      </SheetContent>
    </Sheet>
  )
}
