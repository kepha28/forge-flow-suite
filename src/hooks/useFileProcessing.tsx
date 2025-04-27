
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export const useFileProcessing = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const { user } = useAuth();
  const { toast } = useToast();

  const processFile = async (file: File, type: 'convert' | 'compress') => {
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

    try {
      // Upload to user's folder in the storage bucket
      const filePath = `${user.id}/${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('user_files')
        .upload(filePath, file, {
          onUploadProgress: (progress) => {
            setProgress((progress.loaded / progress.total) * 100);
          },
        });

      if (uploadError) throw uploadError;

      // Create a record in the file_conversions table
      const { error: dbError } = await supabase
        .from('file_conversions')
        .insert({
          user_id: user.id,
          input_file_name: file.name,
          input_file_type: file.type,
          input_file_size: file.size,
          conversion_type: type,
          status: 'processing'
        });

      if (dbError) throw dbError;

      toast({
        title: "File uploaded successfully",
        description: "Your file is now being processed.",
      });

    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error processing file",
        description: error.message,
      });
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  return {
    isProcessing,
    progress,
    processFile
  };
};
