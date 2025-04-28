import React from 'react'
import { History } from './history'
import { HistoryList } from './history-list'

const HistoryContainer: React.FC = () => {
  const enableSaveChatHistory = process.env.NEXT_PUBLIC_ENABLE_SAVE_CHAT_HISTORY === 'true'

  if (!enableSaveChatHistory) {
    return null
  }

  return (
    <div>
      <History>
        <HistoryList userId="anonymous" />
      </History>
    </div>
  )
}

export default HistoryContainer
