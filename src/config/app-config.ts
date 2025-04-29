
import { AppConfig } from '@/types';

// Centralized configuration for the application
export const appConfig: AppConfig = {
  maxFileSizes: {
    free: 100, // MB
    pro: 500,  // MB
    premium: 2048, // MB (2GB)
  },
  fileFormats: {
    document: ['doc', 'docx', 'pdf', 'txt', 'rtf', 'odt'],
    image: ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'bmp'],
    video: ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv'],
    audio: ['mp3', 'wav', 'ogg', 'aac', 'm4a', 'flac'],
  },
  processingTimeout: 300, // seconds
  dataRetention: {
    authenticated: 30 * 24 * 60 * 60, // 30 days in seconds
    anonymous: 24 * 60 * 60, // 24 hours in seconds
  }
};
