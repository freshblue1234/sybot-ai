'use client'

// FileUploader.tsx
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { UploadCloud, X } from 'lucide-react'
import { Button } from './ui/button'

// Define supported file types
const FILE_TYPES = {
  // Text and code files
  'text/plain': ['.txt', '.md'],
  'application/json': ['.json'],
  'text/html': ['.html'],
  'text/css': ['.css'],
  'text/javascript': ['.js', '.ts', '.jsx', '.tsx'],
  // Documents
  'application/pdf': ['.pdf'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  'application/vnd.ms-excel': ['.xls'],
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
  'application/vnd.ms-powerpoint': ['.ppt'],
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
  // Images
  'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp'],
  // Videos
  'video/*': ['.mp4', '.webm', '.mov', '.avi', '.mkv'],
  // Audio
  'audio/*': ['.mp3', '.wav', '.ogg', '.m4a']
}

// Maximum file size: 10MB for images/docs, 50MB for videos
const MAX_FILE_SIZE = {
  DEFAULT: 10 * 1024 * 1024, // 10MB
  VIDEO: 50 * 1024 * 1024    // 50MB
}

export interface UploadedFile {
  id: string;
  file: File;
  preview?: string;
  text?: string;
  base64?: string;
  type: 'text' | 'image' | 'video' | 'audio' | 'document' | 'other';
}

interface FileUploaderProps {
  onFileSelect: (file: UploadedFile) => void;
  maxFiles?: number;
  acceptedTypes?: Record<string, string[]>;
}

// Generate a unique ID for each file
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
};

// Convert file to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

export default function FileUploader({ 
  onFileSelect, 
  maxFiles = 1,
  acceptedTypes = FILE_TYPES
}: FileUploaderProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const processFile = async (file: File): Promise<UploadedFile> => {
    let fileType: 'text' | 'image' | 'video' | 'audio' | 'document' | 'other' = 'other';
    let preview: string | undefined = undefined;
    let text: string | undefined = undefined;
    let base64: string | undefined = undefined;
    
    // Determine file type
    if (file.type.startsWith('text/') || file.type.includes('javascript') || file.type.includes('json')) {
      fileType = 'text';
      // Read text files
      try {
        text = await file.text();
      } catch (err) {
        console.error('Error reading text file:', err);
      }
    } else if (file.type.startsWith('image/')) {
      fileType = 'image';
      preview = URL.createObjectURL(file);
      // Also get base64 for images to send to backend
      base64 = await fileToBase64(file);
    } else if (file.type.startsWith('video/')) {
      fileType = 'video';
      preview = URL.createObjectURL(file);
      // For videos, we might not want to encode as base64 due to size
      // Instead, handle with FormData on submission
    } else if (file.type.startsWith('audio/')) {
      fileType = 'audio';
      // Create audio preview URL
      preview = URL.createObjectURL(file);
    } else if (
      file.type.includes('pdf') || 
      file.type.includes('word') || 
      file.type.includes('excel') || 
      file.type.includes('powerpoint') ||
      file.type.includes('document')
    ) {
      fileType = 'document';
      // For smaller documents, include base64
      if (file.size <= MAX_FILE_SIZE.DEFAULT / 2) {
        base64 = await fileToBase64(file);
      }
    }
    
    return { 
      id: generateId(),
      file, 
      preview, 
      text, 
      base64,
      type: fileType 
    };
  }

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!acceptedFiles.length) return;
    setError(null);
    
    try {
      setIsLoading(true);
      const file = acceptedFiles[0];
      
      // Check file size
      const maxSize = file.type.startsWith('video/') ? MAX_FILE_SIZE.VIDEO : MAX_FILE_SIZE.DEFAULT;
      if (file.size > maxSize) {
        const sizeInMB = maxSize / (1024 * 1024);
        throw new Error(`File is too large. Maximum size is ${sizeInMB}MB`);
      }
      
      const processedFile = await processFile(file);
      onFileSelect(processedFile);
    } catch (err) {
      console.error('Error processing file:', err);
      setError(err instanceof Error ? err.message : 'Failed to process file');
    } finally {
      setIsLoading(false);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: acceptedTypes,
    maxFiles,
    maxSize: MAX_FILE_SIZE.VIDEO // We'll do more specific validation in onDrop
  });

  return (
    <div className="relative">
      <div
        {...getRootProps()}
        className={`p-2 border-2 border-dashed rounded-lg text-center cursor-pointer flex items-center justify-center w-10 h-10 transition-all ${
          isDragActive ? 'border-primary bg-accent/50' : 'border-muted-foreground/50 bg-muted hover:bg-accent/20'
        } ${isLoading ? 'opacity-50' : ''}`}
        title="Upload file"
      >
        <input {...getInputProps()} />
        <UploadCloud className="w-5 h-5 text-muted-foreground" />
      </div>
      
      {error && (
        <div className="absolute top-full mt-2 left-0 right-0 text-xs text-red-500 bg-red-50 p-2 rounded border border-red-200 z-10">
          {error}
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-1 right-1 h-4 w-4" 
            onClick={() => setError(null)}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}
    </div>
  );
}
