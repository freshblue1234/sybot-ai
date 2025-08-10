// MessageDisplay.tsx - Component to display messages with attachments
'use client'

import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown'; // Assuming you're using this for markdown support
import { FileAttachment } from './FileAttachment';
import { UploadedFile } from './FileUploader';

interface MessageDisplayProps {
  message: {
    role: string;
    content: string;
    attachments?: UploadedFile[];
  };
  className?: string;
}

export function MessageDisplay({ message, className }: MessageDisplayProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      {/* Render attachments if present */}
      {message.attachments && message.attachments.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {message.attachments.map((attachment) => (
            <FileAttachment
              key={attachment.id}
              file={attachment}
              readOnly={true}
            />
          ))}
        </div>
      )}
      
      {/* Render message content */}
      <div className="prose prose-sm max-w-none">
        <ReactMarkdown>{message.content}</ReactMarkdown>
      </div>
    </div>
  );
}