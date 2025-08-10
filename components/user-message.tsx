import React from 'react'
import { CollapsibleMessage } from './collapsible-message'

type UserMessageProps = {
  message: string
  messageIndex?: number
}

export const UserMessage: React.FC<UserMessageProps> = ({
  message,
  messageIndex = 0
}) => {
  return (
    <CollapsibleMessage role="user" messageIndex={messageIndex}>
      <div className="flex-1 break-words w-full">{message}</div>
    </CollapsibleMessage>
  )
}
