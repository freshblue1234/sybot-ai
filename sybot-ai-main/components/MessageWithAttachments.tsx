// MessageWithAttachments.tsx - Component to display messages with attachments
'use client'

import { cn } from '@/lib/utils';
import { FileAttachment } from './FileAttachment';
import { UploadedFile } from './FileUploader';

interface MessageWithAttachmentsProps {
  message: {
    role: string;
    content: string;
    attachments?: UploadedFile[];
  };
  className?: string;
}

export function MessageWithAttachments({ message, className }: MessageWithAttachmentsProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      {/* Render attachments if present */}
      {message.attachments && message.attachments.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {message.attachments.map((attachment, index) => (
            <FileAttachment
              key={`${attachment.file.name}-${index}`}
              file={attachment}
              onRemove={() => {}} // Read-only in message view
            />
          ))}
        </div>
      )}
      
      {/* Render message content */}
      <div className="prose prose-sm max-w-none">
        {message.content}
      </div>
    </div>
  );
}