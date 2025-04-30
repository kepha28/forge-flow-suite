
import { toast } from '@/hooks/use-toast';

// Error types for better categorization
export type ErrorType = 'auth' | 'network' | 'server' | 'validation' | 'file' | 'unknown';

export interface ErrorWithCode extends Error {
  code?: string;
  statusCode?: number;
}

/**
 * Handles different types of errors consistently across the application
 */
export function handleError(error: unknown, context?: string): ErrorWithCode {
  // Convert the unknown error to a typed error
  const typedError = parseError(error);
  
  // Log the error for debugging
  if (context) {
    console.error(`Error in ${context}:`, typedError);
  } else {
    console.error('Error:', typedError);
  }
  
  // Return the parsed error for further processing
  return typedError;
}

/**
 * Parse unknown errors into a standardized format
 */
function parseError(error: unknown): ErrorWithCode {
  // Already an Error object
  if (error instanceof Error) {
    return error as ErrorWithCode;
  }
  
  // Handle string errors
  if (typeof error === 'string') {
    const newError = new Error(error) as ErrorWithCode;
    return newError;
  }
  
  // Handle object-like errors (e.g. from APIs)
  if (error && typeof error === 'object') {
    const errorObj = error as any;
    const message = errorObj.message || errorObj.error || 'Unknown error occurred';
    const newError = new Error(message) as ErrorWithCode;
    
    // Copy over potentially useful properties
    if (errorObj.code) newError.code = errorObj.code;
    if (errorObj.statusCode) newError.statusCode = errorObj.statusCode;
    
    return newError;
  }
  
  // Fallback for truly unknown errors
  return new Error('An unknown error occurred') as ErrorWithCode;
}

/**
 * Determine the error type based on the error object
 */
export function getErrorType(error: ErrorWithCode): ErrorType {
  if (error.message?.includes('auth') || error.code?.includes('auth')) {
    return 'auth';
  }
  
  if (error.message?.includes('network') || error.code === 'NETWORK_ERROR' || error.message?.includes('fetch')) {
    return 'network';
  }
  
  if (error.statusCode && error.statusCode >= 500) {
    return 'server';
  }
  
  if (error.message?.includes('validation') || error.code?.includes('validation')) {
    return 'validation';
  }
  
  if (error.message?.includes('file') || error.code?.includes('file')) {
    return 'file';
  }
  
  return 'unknown';
}

/**
 * Display a user-friendly toast message for the error
 */
export function showErrorToast(error: unknown, title = 'Error'): void {
  const parsedError = parseError(error);
  const errorType = getErrorType(parsedError);
  
  // Customize message based on error type
  let message = parsedError.message;
  
  switch (errorType) {
    case 'auth':
      title = 'Authentication Error';
      break;
    case 'network':
      title = 'Network Error';
      message = message || 'Please check your internet connection and try again.';
      break;
    case 'server':
      title = 'Server Error';
      message = message || 'Our servers are experiencing issues. Please try again later.';
      break;
    case 'file':
      title = 'File Error';
      break;
    case 'validation':
      title = 'Validation Error';
      break;
    default:
      message = message || 'An unexpected error occurred. Please try again.';
  }
  
  toast({
    variant: "destructive",
    title,
    description: message,
  });
}

/**
 * Safely executes a function and handles any errors
 */
export async function safeExecute<T>(
  fn: () => Promise<T>,
  options: {
    onError?: (error: ErrorWithCode) => void;
    showToast?: boolean;
    context?: string;
  } = {}
): Promise<T | null> {
  const { onError, showToast = true, context } = options;
  
  try {
    return await fn();
  } catch (error) {
    const parsedError = handleError(error, context);
    
    if (showToast) {
      showErrorToast(parsedError);
    }
    
    if (onError) {
      onError(parsedError);
    }
    
    return null;
  }
}
