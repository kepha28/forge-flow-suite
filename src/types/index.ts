
// Common types used across the application

// Authentication
export interface UserProfile {
  id: string;
  email: string;
  fullName?: string;
}

// File processing
export type FileProcessingStatus = 'idle' | 'uploading' | 'processing' | 'completed' | 'error';
export type ConversionType = 'convert' | 'compress' | 'secure';

export interface FileConversion {
  id: string;
  input_file_name: string;
  input_file_type: string;
  input_file_size: number;
  output_file_name: string | null;
  conversion_type: ConversionType;
  status: string;
  created_at: string;
}

// App configuration
export interface AppConfig {
  maxFileSizes: {
    free: number;
    pro: number;
    premium: number;
  };
  fileFormats: {
    document: string[];
    image: string[];
    video: string[];
    audio: string[];
  };
  processingTimeout: number;
  dataRetention: {
    authenticated: number;
    anonymous: number;
  };
}
