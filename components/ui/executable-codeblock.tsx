'use client'

import { FC, memo, useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { coldarkDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

import { Button } from '@/components/ui/button'
import { useCopyToClipboard } from '@/lib/hooks/use-copy-to-clipboard'
import { generateId } from 'ai'
import { Check, Copy, Download, Play } from 'lucide-react'
import { toast } from 'sonner'

interface Props {
  language: string
  value: string
}

interface languageMap {
  [key: string]: string | undefined
}

export const programmingLanguages: languageMap = {
  javascript: '.js',
  python: '.py',
  java: '.java',
  c: '.c',
  cpp: '.cpp',
  'c++': '.cpp',
  'c#': '.cs',
  ruby: '.rb',
  php: '.php',
  swift: '.swift',
  'objective-c': '.m',
  kotlin: '.kt',
  typescript: '.ts',
  go: '.go',
  perl: '.pl',
  rust: '.rs',
  scala: '.scala',
  haskell: '.hs',
  lua: '.lua',
  shell: '.sh',
  sql: '.sql',
  html: '.html',
  css: '.css'
  // add more file extensions here, make sure the key is same as language prop in CodeBlock.tsx component
}

// Simple execution function for client-side code
const executeCode = async (code: string, language: string): Promise<string> => {
  try {
    switch (language.toLowerCase()) {
      case 'javascript':
        // For security, we'll only allow simple expressions
        // In a real implementation, this would be done server-side
        const result = eval(code)
        return typeof result === 'object'
          ? JSON.stringify(result, null, 2)
          : String(result)

      case 'python':
        // Python execution would require a backend service
        throw new Error('Python execution requires backend support')

      case 'shell':
        // Shell execution would require a backend service
        throw new Error('Shell execution requires backend support')

      default:
        throw new Error(`Execution not supported for ${language}`)
    }
  } catch (error) {
    throw new Error(
      `Execution error: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    )
  }
}

const ExecutableCodeBlock: FC<Props> = memo(({ language, value }) => {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 })
  const [isExecuting, setIsExecuting] = useState(false)
  const [executionResult, setExecutionResult] = useState<string | null>(null)
  const [executionError, setExecutionError] = useState<string | null>(null)

  const downloadAsFile = () => {
    if (typeof window === 'undefined') {
      return
    }
    const fileExtension = programmingLanguages[language] || '.file'
    const suggestedFileName = `file-${generateId()}${fileExtension}`
    const fileName = window.prompt('Enter file name', suggestedFileName)

    if (!fileName) {
      // User pressed cancel on prompt.
      return
    }

    const blob = new Blob([value], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.download = fileName
    link.href = url
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const onCopy = () => {
    if (isCopied) return
    copyToClipboard(value)
  }

  const onExecute = async () => {
    // Check if execution is supported for this language
    const supportedLanguages = ['javascript']
    if (!supportedLanguages.includes(language.toLowerCase())) {
      toast.error(`Execution not supported for ${language} in browser`)
      return
    }

    setIsExecuting(true)
    setExecutionResult(null)
    setExecutionError(null)

    try {
      const result = await executeCode(value, language)
      setExecutionResult(result)
      toast.success('Code executed successfully')
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error'
      setExecutionError(errorMessage)
      toast.error(`Execution failed: ${errorMessage}`)
    } finally {
      setIsExecuting(false)
    }
  }

  return (
    <div className="relative w-full font-sans codeblock bg-neutral-800 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between w-full px-4 py-2 bg-neutral-700 text-zinc-100">
        <span className="text-xs lowercase">{language}</span>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            className="focus-visible:ring-1"
            onClick={downloadAsFile}
            size="icon"
          >
            <Download className="w-4 h-4" />
            <span className="sr-only">Download</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-xs focus-visible:ring-1 focus-visible:ring-offset-0"
            onClick={onCopy}
          >
            {isCopied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            <span className="sr-only">Copy code</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-xs focus-visible:ring-1 focus-visible:ring-offset-0"
            onClick={onExecute}
            disabled={isExecuting}
          >
            {isExecuting ? (
              <div className="w-4 h-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : (
              <Play className="w-4 h-4" />
            )}
            <span className="sr-only">Execute code</span>
          </Button>
        </div>
      </div>
      <SyntaxHighlighter
        language={language}
        style={coldarkDark}
        PreTag="div"
        showLineNumbers
        customStyle={{
          margin: 0,
          width: '100%',
          background: 'transparent',
          padding: '1rem'
        }}
        lineNumberStyle={{
          userSelect: 'none'
        }}
        codeTagProps={{
          style: {
            fontSize: '0.9rem',
            fontFamily: 'var(--font-mono)'
          }
        }}
      >
        {value}
      </SyntaxHighlighter>

      {/* Execution Result */}
      {(executionResult || executionError) && (
        <div className="border-t border-neutral-700 p-4 bg-neutral-900">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-zinc-100">
              {executionError ? 'Execution Error' : 'Execution Result'}
            </span>
          </div>
          <pre className="text-xs overflow-auto max-h-40">
            <code className="font-mono text-zinc-100">
              {executionError || executionResult}
            </code>
          </pre>
        </div>
      )}
    </div>
  )
})
ExecutableCodeBlock.displayName = 'ExecutableCodeBlock'

export { ExecutableCodeBlock }
