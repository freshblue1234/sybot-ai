// FileAttachment.tsx
'use client'

import { Eye, File, FileAudio, FileText, Image as ImageIcon, Video, X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { UploadedFile } from './FileUploader'
import { Button } from './ui/button'

interface FileAttachmentProps {
  file: UploadedFile;
  onRemove?: () => void;
  readOnly?: boolean;
}

export function FileAttachment({ file, onRemove, readOnly = false }: FileAttachmentProps) {
  const [showPreview, setShowPreview] = useState(false);
  
  // Choose icon based on file type
  const getIcon = () => {
    switch (file.type) {
      case 'text': return <FileText className="h-4 w-4" />;
      case 'image': return <ImageIcon className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      case 'audio': return <FileAudio className="h-4 w-4" />;
      case 'document': return <FileText className="h-4 w-4" />;
      default: return <File className="h-4 w-4" />;
    }
  };
  
  return (
    <>
      <div className="flex items-center gap-2 p-2 rounded-md bg-muted/50 border text-xs max-w-fit">
        {getIcon()}
        <span className="truncate max-w-[120px]">{file.file.name}</span>
        
        {file.preview && (file.type === 'image' || file.type === 'video' || file.type === 'audio') && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-5 w-5" 
            onClick={() => setShowPreview(true)}
          >
            <Eye className="h-3 w-3" />
          </Button>
        )}
        
        {!readOnly && onRemove && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-5 w-5 ml-1" 
            onClick={onRemove}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
      
      {/* Preview Modal */}
      {showPreview && file.preview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg max-w-xl w-full mx-4 overflow-hidden">
            <div className="flex justify-between items-center p-3 border-b">
              <h3 className="font-medium">{file.file.name}</h3>
              <Button variant="ghost" size="icon" onClick={() => setShowPreview(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="p-4">
              {file.type === 'image' ? (
                <div className="relative aspect-video">
                  {file.base64 ? (
                    <Image 
                      src={file.base64} 
                      alt={file.file.name} 
                      fill 
                      className="object-contain" 
                    />
                  ) : file.preview ? (
                    <Image 
                      src={file.preview} 
                      alt={file.file.name} 
                      fill 
                      className="object-contain" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      Image preview not available
                    </div>
                  )}
                </div>
              ) : file.type === 'video' ? (
                <video 
                  src={file.preview} 
                  controls 
                  className="w-full aspect-video"
                />
              ) : file.type === 'audio' ? (
                <audio 
                  src={file.preview} 
                  controls 
                  className="w-full mt-4"
                />
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Preview not available for this file type
                </div>
              )}
            </div>
            
            <div className="flex justify-end gap-2 p-3 border-t">
              <Button variant="outline" onClick={() => setShowPreview(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}