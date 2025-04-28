import { ProcessedFile } from '@/lib/types/files';

export class FileService {
  static async processFile(file: File): Promise<ProcessedFile> {
    const id = crypto.randomUUID();
    let type: ProcessedFile['type'] = 'other';
    let content: string | undefined = undefined;
    let url: string | undefined = undefined;
    
    // Determine file type
    if (file.type.startsWith('text/') || 
        file.type.includes('javascript') || 
        file.type.includes('json')) {
      type = 'text';
      content = await file.text();
    } else if (file.type.startsWith('image/')) {
      type = 'image';
      url = URL.createObjectURL(file);
    } else if (file.type.startsWith('video/')) {
      type = 'video';
      url = URL.createObjectURL(file);
    } else if (file.type.startsWith('audio/')) {
      type = 'audio';
      url = URL.createObjectURL(file);
    } else if (file.type.includes('pdf') || 
               file.type.includes('word') || 
               file.type.includes('excel') || 
               file.type.includes('powerpoint')) {
      type = 'document';
    }
    
    return {
      id,
      name: file.name,
      type,
      url,
      content,
      contentType: file.type,
      size: file.size
    };
  }
  
  static cleanupFiles(files: ProcessedFile[]): void {
    files.forEach(file => {
      if (file.url?.startsWith('blob:')) {
        URL.revokeObjectURL(file.url);
      }
    });
  }

  static getSupportedTypes() {
    return {
      'text/plain': ['.txt'],
      'application/json': ['.json'],
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
      'video/*': ['.mp4', '.webm'],
      'audio/*': ['.mp3', '.wav'],
      'application/pdf': ['.pdf']
    };
  }

  static getMaxSize() {
    return 10 * 1024 * 1024; // 10MB
  }
}