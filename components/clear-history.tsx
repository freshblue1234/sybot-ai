'use client'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { clearChats } from '@/lib/actions/chat'
import { Trash2 } from 'lucide-react'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { Spinner } from './ui/spinner'

type ClearHistoryProps = {
  empty: boolean
}

export function ClearHistory({ empty }: ClearHistoryProps) {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button 
          variant="outline" 
          className="w-full h-10 gap-2 text-sm font-medium border-destructive/20 text-destructive hover:bg-destructive/10 hover:border-destructive/30 transition-all duration-200" 
          disabled={empty}
        >
          <Trash2 size={16} />
          Clear History
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <div className="p-1.5 bg-destructive/10 rounded-lg">
              <Trash2 size={16} className="text-destructive" />
            </div>
            Clear Chat History?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-muted-foreground">
            This action cannot be undone. This will permanently delete your
            chat history and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel 
            disabled={isPending}
            className="h-9 px-4 text-sm"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            className="h-9 px-4 text-sm bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={event => {
              event.preventDefault()
              startTransition(async () => {
                const result = await clearChats()
                if (result?.error) {
                  toast.error(result.error)
                } else {
                  toast.success('History cleared successfully')
                }
                setOpen(false)
              })
            }}
          >
            {isPending ? (
              <div className="flex items-center gap-2">
                <Spinner />
                <span>Clearing...</span>
              </div>
            ) : (
              'Clear History'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
