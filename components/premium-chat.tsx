"use client"

import { ChatMessages } from '@/components/chat-messages'
import { ChatPanel } from '@/components/chat-panel'
import { ModelSelector } from '@/components/model-selector'
import { SearchModeToggle } from '@/components/search-mode-toggle'
import { Button } from '@/components/ui/button'
import { VoiceControls } from '@/components/voice-controls'
import { cn } from '@/lib/utils'
import { useChat } from 'ai/react'
import { ArrowDown, RefreshCw, Square } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'

export interface PremiumChatProps extends React.ComponentProps<'div'> {
  id?: string
  initialMessages?: any[]
  defaultModel?: any
  models?: any[]
}

export default function PremiumChat({ id, initialMessages, defaultModel, models, className }: PremiumChatProps) {
  const router = useRouter()
  const [selectedModel, setSelectedModel] = useState(defaultModel?.id || '')
  const { messages, append, reload, stop, isLoading, input, setInput, handleInputChange, handleSubmit } = useChat({
    initialMessages,
    id,
    body: { selectedModel },
    onResponse(res) {
      if (res.status === 401) router.push('/login')
    }
  })

  useEffect(() => {
    if (defaultModel && !selectedModel) setSelectedModel(defaultModel.id)
  }, [defaultModel, selectedModel])

  // Fallbacks for older ai versions
  const onInputChange = handleInputChange ?? ((e: React.ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value))
  const onSubmit = handleSubmit ?? ((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); if (!input?.trim()) return; append({ role: 'user', content: input }); setInput('')
  })

  const viewportRef = useRef<HTMLDivElement>(null)
  const atBottom = useRef(true)
  const [showJump, setShowJump] = useState(false)

  useEffect(() => {
    const el = viewportRef.current
    if (!el) return
    const onScroll = () => {
      const b = el.scrollTop + el.clientHeight >= el.scrollHeight - 10
      atBottom.current = b
      setShowJump(!b)
    }
    el.addEventListener('scroll', onScroll)
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToBottom = () => viewportRef.current?.scrollTo({ top: viewportRef.current.scrollHeight, behavior: 'smooth' })
  const handleRefresh = () => { stop(); reload() }

  const modelName = useMemo(() => models?.find(m => m.id === selectedModel)?.name || defaultModel?.name || 'Auto', [models, selectedModel, defaultModel])

  return (
    <div className={cn('relative flex h-full min-h-[92vh] w-full flex-col', className)}>
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-grid-white/5 dark:bg-grid-white/10" />
        <div className="absolute -top-24 right-12 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border/60 bg-background/70 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-indigo-600 text-white text-sm font-semibold">SB</div>
            <div>
              <div className="text-sm font-semibold">Sybot Assistant</div>
              <div className="text-xs text-muted-foreground">{modelName} • Online</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <SearchModeToggle />
            <VoiceControls onVoiceInput={t => setInput(t)} />
          </div>
        </div>
      </header>

      {/* Body */}
      <main className="mx-auto flex w-full max-w-6xl flex-1 gap-4 px-2 sm:px-4 py-4">
        {/* Optional Left Rail (Quick actions) */}
        <aside className="sticky top-16 hidden w-52 shrink-0 lg:block" aria-hidden>
          <div className="space-y-3">
            {['DeepSearch','Create Images','Latest News','Personas'].map((label, i) => (
              <button key={label} className="w-full rounded-xl border border-border/60 bg-secondary/50 px-4 py-3 text-left text-sm hover:bg-secondary/70 transition-colors">
                {label}
              </button>
            ))}
          </div>
        </aside>

        {/* Conversation */}
        <section className="relative flex min-h-0 flex-1 flex-col">
          <div ref={viewportRef} className="relative h-full min-h-[50vh] w-full overflow-y-auto">
            <div className="mx-auto max-w-3xl">
              {messages.length === 0 ? (
                <div className="px-2">
                  {/* Reuse your existing EmptyScreen */}
                  {/* @ts-ignore */}
                  <div className="pt-8"><ChatMessages messages={[]} isLoading={false} /></div>
                </div>
              ) : (
                <ChatMessages messages={messages} isLoading={isLoading} />
              )}
            </div>
          </div>

          {/* Composer */}
          <div className="sticky bottom-0 z-10 -mx-2 sm:mx-0">
            <div className="mx-auto max-w-3xl">
              <ChatPanel
                id={id}
                isLoading={isLoading}
                stop={stop}
                append={append}
                reload={reload}
                messages={messages}
                input={input}
                setInput={setInput}
                handleInputChange={onInputChange}
                handleSubmit={onSubmit}
              />
            </div>
          </div>

          {/* Floating actions */}
          <div className="pointer-events-none absolute bottom-28 right-3 flex flex-col gap-2">
            {isLoading && (
              <div className="pointer-events-auto">
                <Button variant="outline" size="icon" onClick={() => stop()} className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700"><Square className="h-4 w-4" /></Button>
              </div>
            )}
            {showJump && (
              <div className="pointer-events-auto">
                <Button variant="outline" size="icon" onClick={scrollToBottom} className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700"><ArrowDown className="h-4 w-4" /></Button>
              </div>
            )}
            {messages.length > 0 && (
              <div className="pointer-events-auto">
                <Button variant="outline" size="icon" onClick={handleRefresh} className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700"><RefreshCw className="h-4 w-4" /></Button>
              </div>
            )}
          </div>
        </section>

        {/* Optional Right Rail */}
        <aside className="sticky top-16 hidden w-60 shrink-0 xl:block" aria-hidden>
          <div className="space-y-3">
            <div className="rounded-2xl border border-border/60 bg-secondary/40 p-4">
              <div className="text-sm font-semibold mb-2">Tips</div>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>Use voice for hands-free</li>
                <li>Upload files to analyze</li>
                <li>Toggle Search for live web</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-border/60 bg-secondary/40 p-4">
              <div className="text-sm font-semibold mb-2">Model</div>
              <div className="text-xs text-muted-foreground">{modelName}</div>
            </div>
          </div>
        </aside>
      </main>

      {/* Hidden Model Selector (kept for compatibility) */}
      <div className="hidden">
        <ModelSelector models={models || []} defaultModel={defaultModel} />
      </div>
    </div>
  )
}
