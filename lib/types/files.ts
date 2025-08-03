export interface ProcessedFile {
    id: string;
    name: string;
    type: 'text' | 'image' | 'video' | 'audio' | 'document' | 'other';
    url?: string;
    content?: string;
    contentType: string;
    size: number;
  }
  
  export interface FileUploaderProps {
    onFileSelect: (file: ProcessedFile) => void;
    maxFiles?: number;
    disabled?: boolean;
  }
  
  export interface UploadButtonProps {
    onTextSubmit: (text: string) => void;
    onFileAttach: (file: ProcessedFile) => void;
  }
  
  export interface FileAttachmentProps {
    file: ProcessedFile;
    onRemove?: () => void;
    readOnly?: boolean;
  }