'use client'

<<<<<<< HEAD
import { Card, CardContent } from '@/components/ui/card'
import { JSONValue } from 'ai'
import { Search, Wrench } from 'lucide-react'

interface ToolSectionProps {
  toolCalls?: any[]
  data?: JSONValue[]
}

export function ToolSection({ toolCalls, data }: ToolSectionProps) {
  if (!toolCalls || toolCalls.length === 0) {
    return null
  }

  return (
    <div className="space-y-3">
      {toolCalls.map((toolCall, index) => (
        <Card key={index} className="bg-muted/30 border-border/50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                {toolCall.toolName === 'web_search' ? (
                  <Search size={16} className="text-blue-500" />
                ) : (
                  <Wrench size={16} className="text-blue-500" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-foreground">
                    {toolCall.toolName === 'web_search' ? 'Web Search' : toolCall.toolName}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {toolCall.toolCallId}
                  </span>
                </div>
                
                {toolCall.args && (
                  <div className="text-sm text-muted-foreground mb-2">
                    <strong>Query:</strong> {JSON.stringify(toolCall.args)}
                  </div>
                )}
                
                {toolCall.result && (
                  <div className="text-sm">
                    <strong>Result:</strong> {JSON.stringify(toolCall.result)}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
=======
import { ToolInvocation } from 'ai'
import { QuestionConfirmation } from './question-confirmation'
import RetrieveSection from './retrieve-section'
import { SearchSection } from './search-section'
import { VideoSearchSection } from './video-search-section'

interface ToolSectionProps {
  tool: ToolInvocation
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  addToolResult?: (params: { toolCallId: string; result: any }) => void
}

export function ToolSection({
  tool,
  isOpen,
  onOpenChange,
  addToolResult
}: ToolSectionProps) {
  // Special handling for ask_question tool
  if (tool.toolName === 'ask_question') {
    // When waiting for user input
    if (tool.state === 'call' && addToolResult) {
      return (
        <QuestionConfirmation
          toolInvocation={tool}
          onConfirm={(toolCallId, approved, response) => {
            addToolResult({
              toolCallId,
              result: approved
                ? response
                : {
                    declined: true,
                    skipped: response?.skipped,
                    message: 'User declined this question'
                  }
            })
          }}
        />
      )
    }

    // When result is available, display the result
    if (tool.state === 'result') {
      return (
        <QuestionConfirmation
          toolInvocation={tool}
          isCompleted={true}
          onConfirm={() => {}} // Not used in result display mode
        />
      )
    }
  }

  switch (tool.toolName) {
    case 'search':
      return (
        <SearchSection
          tool={tool}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      )
    case 'video_search':
      return (
        <VideoSearchSection
          tool={tool}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      )
    case 'retrieve':
      return (
        <RetrieveSection
          tool={tool}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      )
    default:
      return null
  }
>>>>>>> 41155a42ae5ee50065317213a1704586c96f7cfd
}
