
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { fileConversionService } from '@/services/api';
import { useAuth } from './useAuth';
import { ConversionType } from '@/types';

export const useFileProcessing = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const { user } = useAuth();
  const { toast } = useToast();

  const processFile = async (file: File, type: ConversionType) => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication required",
        description: "Please sign in to process files.",
      });
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 5;
        return newProgress >= 95 ? 95 : newProgress;
      });
    }, 300);

    try {
      const { success, error } = await fileConversionService.processFile(file, type, user.id);

      if (!success) throw new Error(error);

      toast({
        title: "File uploaded successfully",
        description: "Your file is now being processed.",
      });
      
      // Set to 100% when done
      setProgress(100);

    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error processing file",
        description: error.message,
      });
    } finally {
      clearInterval(progressInterval);
      setTimeout(() => {
        setIsProcessing(false);
        setProgress(0);
      }, 1000); // Reset after showing 100% for a moment
    }
  };

  return {
    isProcessing,
    progress,
    processFile
  };
};
