// UploadButton.tsx
'use client'

import { X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'sonner'; // Assuming you have toast notifications
import FileUploader, { UploadedFile } from './FileUploader'
import { Button } from './ui/button'

interface UploadButtonProps {
  onTextSubmit: (text: string) => void;
  onFileAttach: (file: UploadedFile) => void;
}

export default function UploadButton({ onTextSubmit, onFileAttach }: UploadButtonProps) {
  const [preview, setPreview] = useState<{
    url: string;
    type: 'image' | 'video' | 'audio';
  } | null>(null);

  const handleFileSelect = (uploadedFile: UploadedFile) => {
    // For text files, submit the content directly
    if (uploadedFile.type === 'text' && uploadedFile.text) {
      if (uploadedFile.text.trim().length === 0) {
        toast.error('The file is empty');
        return;
      }
      
      if (uploadedFile.text.length > 100000) {
        toast.error('File is too large. Please upload a smaller file (less than 100KB)');
        return;
      }
      
      onTextSubmit(uploadedFile.text);
      toast.success(`${uploadedFile.file.name} content loaded`);
      return;
    }
    
    // For media files, notify the user and show preview if available
    if (uploadedFile.preview && 
        (uploadedFile.type === 'image' || 
         uploadedFile.type === 'video' || 
         uploadedFile.type === 'audio')) {
      setPreview({
        url: uploadedFile.preview,
        type: uploadedFile.type
      });
    }
    
    // Attach the file to the message
    onFileAttach(uploadedFile);
    
    // Show appropriate toast based on file type
    const fileTypeMap = {
      image: 'Image',
      video: 'Video',
      audio: 'Audio',
      document: 'Document',
      text: 'Text',
      other: 'File'
    };
    toast.success(`${fileTypeMap[uploadedFile.type]} attached: ${uploadedFile.file.name}`);
  }

  const closePreview = () => {
    if (preview?.url) {
      URL.revokeObjectURL(preview.url);
    }
    setPreview(null);
  }
  
  return (
    <div className="relative">
      <FileUploader onFileSelect={handleFileSelect} />
      
      {/* Preview Modal for Images/Videos/Audio */}
      {preview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg max-w-xl w-full mx-4 overflow-hidden">
            <div className="flex justify-between items-center p-3 border-b">
              <h3 className="font-medium">File Preview</h3>
              <Button variant="ghost" size="icon" onClick={closePreview}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="p-4">
              {preview.type === 'image' ? (
                <div className="relative aspect-video">
                  <Image 
                    src={preview.url} 
                    alt="Preview" 
                    fill 
                    className="object-contain" 
                  />
                </div>
              ) : preview.type === 'video' ? (
                <video 
                  src={preview.url} 
                  controls 
                  className="w-full aspect-video"
                />
              ) : preview.type === 'audio' ? (
                <audio 
                  src={preview.url} 
                  controls 
                  className="w-full mt-4"
                />
              ) : null}
            </div>
            
            <div className="flex justify-end gap-2 p-3 border-t">
              <Button variant="outline" onClick={closePreview}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}