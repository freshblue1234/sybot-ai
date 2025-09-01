'use client'

import { Button } from '@/components/ui/button'
import { Message } from 'ai'
import { Check, ChevronDown, ChevronUp, Copy } from 'lucide-react'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeKatex from 'rehype-katex'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { toast } from 'sonner'

interface CollapsibleMessageProps {
  message: Message
  isCollapsible?: boolean
}

export function CollapsibleMessage({ message, isCollapsible = false }: CollapsibleMessageProps) {
  const [isExpanded, setIsExpanded] = useState(!isCollapsible)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content)
      setCopied(true)
      toast.success('Message copied to clipboard')
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error('Failed to copy message')
    }
  }

  const content = message.content
  const shouldTruncate = isCollapsible && !isExpanded && content.length > 500
  const displayContent = shouldTruncate ? content.slice(0, 500) + '...' : content

  return (
    <div className="relative group">
      {/* Copy Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleCopy}
        className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-700/80 hover:bg-slate-600/80 text-slate-300 h-7 w-7 p-0 rounded-full"
      >
        {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      </Button>

      {/* Message Content */}
      <div className="prose prose-invert prose-sm max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[
            [rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }],
            rehypeKatex
          ]}
          components={{
            // Code blocks
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '')
              if (!inline) {
                return (
                  <div className="my-4 overflow-hidden rounded-xl border border-slate-600/50 bg-slate-900/50">
                    <div className="flex items-center justify-between px-4 py-2 bg-slate-800/50 border-b border-slate-600/50">
                      <span className="text-xs text-slate-400 font-mono">
                        {match ? match[1] : 'code'}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigator.clipboard.writeText(String(children))}
                        className="h-6 px-2 text-xs text-slate-400 hover:text-slate-200"
                      >
                        Copy
                      </Button>
                    </div>
                    <SyntaxHighlighter
                      style={oneDark}
                      language={match ? match[1] : 'text'}
                      PreTag="div"
                      customStyle={{
                        margin: 0,
                        background: 'transparent',
                        padding: '1rem',
                        fontSize: '0.875rem'
                      }}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  </div>
                )
              }
              return (
                <code className="bg-slate-700/50 text-slate-200 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                  {children}
                </code>
              )
            },
            // Headings
            h1: ({ children }) => <h1 className="text-xl font-bold text-slate-100 mb-3 mt-4">{children}</h1>,
            h2: ({ children }) => <h2 className="text-lg font-semibold text-slate-100 mb-2 mt-3">{children}</h2>,
            h3: ({ children }) => <h3 className="text-base font-semibold text-slate-200 mb-2 mt-3">{children}</h3>,
            // Paragraphs
            p: ({ children }) => <p className="text-slate-100 leading-relaxed mb-3">{children}</p>,
            // Lists
            ul: ({ children }) => <ul className="text-slate-100 space-y-1 mb-3 pl-4">{children}</ul>,
            ol: ({ children }) => <ol className="text-slate-100 space-y-1 mb-3 pl-4">{children}</ol>,
            li: ({ children }) => <li className="text-slate-100">{children}</li>,
            // Links
            a: ({ children, href }) => (
              <a
                href={href}
                className="text-blue-400 hover:text-blue-300 underline decoration-blue-400/50 hover:decoration-blue-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </a>
            ),
            // Tables
            table: ({ children }) => (
              <div className="overflow-x-auto my-4">
                <table className="w-full border-collapse border border-slate-600/50 rounded-lg overflow-hidden">
                  {children}
                </table>
              </div>
            ),
            th: ({ children }) => (
              <th className="border border-slate-600/50 bg-slate-800/50 px-3 py-2 text-left text-slate-200 font-semibold">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="border border-slate-600/50 px-3 py-2 text-slate-100">
                {children}
              </td>
            ),
            // Blockquotes
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-blue-500/50 pl-4 py-2 my-4 bg-slate-800/30 rounded-r-lg">
                <div className="text-slate-200 italic">{children}</div>
              </blockquote>
            )
          }}
        >
          {displayContent}
        </ReactMarkdown>
      </div>

      {/* Expand/Collapse Button */}
      {isCollapsible && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2 text-slate-400 hover:text-slate-200 h-8 px-3"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="h-4 w-4 mr-1" />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4 mr-1" />
              Show More
            </>
          )}
        </Button>
      )}
    </div>
  )
}
