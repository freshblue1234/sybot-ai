import { ProcessedFile } from './files';

export interface ExtendedMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  attachments?: ProcessedFile[];
  createdAt?: Date;
}