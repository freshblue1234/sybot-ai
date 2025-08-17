'use client'

import { Eye, EyeOff, Type } from 'lucide-react'
import { useEffect, useState } from 'react'
import rehypeExternalLinks from 'rehype-external-links'
import remarkGfm from 'remark-gfm'
import { Button } from './ui/button'
import { MemoizedReactMarkdown } from './ui/markdown'
import { Textarea } from './ui/textarea'

interface MarkdownPreviewProps {
  initialValue?: string
  onSend?: (content: string) => void
  onCancel?: () => void
}

export function MarkdownPreview({
  initialValue = '',
  onSend,
  onCancel
}: MarkdownPreviewProps) {
  const [content, setContent] = useState(initialValue)
  const [showPreview, setShowPreview] = useState(false)
  const [wordCount, setWordCount] = useState(0)

  useEffect(() => {
    setWordCount(content.trim() ? content.trim().split(/\s+/).length : 0)
  }, [content])

  const handleSend = () => {
    if (onSend) {
      onSend(content)
    }
  }

  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    }
  }

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Type className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {wordCount} {wordCount === 1 ? 'word' : 'words'}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowPreview(!showPreview)}
          className="flex items-center gap-1"
        >
          {showPreview ? (
            <>
              <EyeOff className="w-4 h-4" />
              Edit
            </>
          ) : (
            <>
              <Eye className="w-4 h-4" />
              Preview
            </>
          )}
        </Button>
      </div>

      {showPreview ? (
        <div className="border rounded-lg p-4 bg-background min-h-[200px]">
          {content ? (
            <MemoizedReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[[rehypeExternalLinks, { target: '_blank' }]]}
              className="prose prose-sm max-w-none dark:prose-invert"
            >
              {content}
            </MemoizedReactMarkdown>
          ) : (
            <p className="text-muted-foreground text-center py-8">
              Nothing to preview
            </p>
          )}
        </div>
      ) : (
        <Textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Write your message in Markdown..."
          className="min-h-[200px] resize-none"
        />
      )}

      <div className="flex justify-end gap-2 mt-2">
        <Button variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleSend} disabled={!content.trim()}>
          Send
        </Button>
      </div>
    </div>
  )
}
