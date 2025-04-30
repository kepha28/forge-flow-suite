
import { appConfig } from '@/config/app-config';

/**
 * Formats a file size in bytes to human-readable format (KB, MB, GB)
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Validates if a file is within the allowed size limit based on user tier
 */
export function isFileSizeValid(fileSize: number, userTier: 'free' | 'pro' | 'premium' = 'free'): boolean {
  const maxSizeInMB = appConfig.maxFileSizes[userTier];
  const fileSizeInMB = fileSize / (1024 * 1024);
  
  return fileSizeInMB <= maxSizeInMB;
}

/**
 * Gets the maximum file size for a user tier
 */
export function getMaxFileSize(userTier: 'free' | 'pro' | 'premium' = 'free'): number {
  return appConfig.maxFileSizes[userTier];
}

/**
 * Validates if a file format is supported for the given conversion type
 */
export function isFileFormatSupported(
  fileType: string, 
  category: 'document' | 'image' | 'video' | 'audio' | 'all' = 'all'
): boolean {
  const extension = getFileExtension(fileType);
  
  if (category === 'all') {
    return Object.values(appConfig.fileFormats).some(formats => formats.includes(extension));
  }
  
  return appConfig.fileFormats[category].includes(extension);
}

/**
 * Gets the file extension from a file type or file name
 */
export function getFileExtension(fileNameOrType: string): string {
  // Handle MIME types (e.g. image/png -> png)
  if (fileNameOrType.includes('/')) {
    return fileNameOrType.split('/').pop()?.toLowerCase() || '';
  }
  
  // Handle file names (e.g. document.pdf -> pdf)
  return fileNameOrType.split('.').pop()?.toLowerCase() || '';
}

/**
 * Gets a friendly category name for a file based on its type
 */
export function getFileCategory(fileType: string): 'document' | 'image' | 'video' | 'audio' | 'unknown' {
  const extension = getFileExtension(fileType);
  
  if (appConfig.fileFormats.document.includes(extension)) return 'document';
  if (appConfig.fileFormats.image.includes(extension)) return 'image';
  if (appConfig.fileFormats.video.includes(extension)) return 'video';
  if (appConfig.fileFormats.audio.includes(extension)) return 'audio';
  
  return 'unknown';
}

/**
 * Creates a blob URL from a file for previewing
 */
export function createFilePreviewUrl(file: File): string {
  return URL.createObjectURL(file);
}

/**
 * Cleans up a blob URL created by createFilePreviewUrl
 */
export function revokeFilePreviewUrl(url: string): void {
  URL.revokeObjectURL(url);
}
