
import { supabase } from '@/integrations/supabase/client';
import { FileConversion, ConversionType } from '@/types';
import { appConfig } from '@/config/app-config';

// Abstract all Supabase API operations behind service functions

// File Conversion Services
export const fileConversionService = {
  // Get all conversions for the current user
  async getConversions(): Promise<FileConversion[]> {
    try {
      const { data, error } = await supabase
        .from('file_conversions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching conversions:', error);
      return [];
    }
  },

  // Upload and process a file
  async processFile(file: File, type: ConversionType, userId: string): Promise<{ success: boolean, error?: string }> {
    try {
      // 1. Upload file to storage
      const filePath = `${userId}/${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('user_files')
        .upload(filePath, file, {
          contentType: file.type,
          upsert: true
        });

      if (uploadError) throw uploadError;

      // 2. Create a record in the file_conversions table
      const { error: dbError } = await supabase
        .from('file_conversions')
        .insert({
          user_id: userId,
          input_file_name: file.name,
          input_file_type: file.type,
          input_file_size: file.size,
          conversion_type: type,
          status: 'processing'
        });

      if (dbError) throw dbError;

      return { success: true };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.message || 'An error occurred during file processing' 
      };
    }
  },

  // Subscribe to realtime updates for a user's conversions
  subscribeToConversions(userId: string, callback: (conversion: FileConversion) => void) {
    const channel = supabase
      .channel('public:file_conversions')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'file_conversions',
          filter: `user_id=eq.${userId}`
        }, 
        payload => {
          if (payload.new) {
            callback(payload.new as FileConversion);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }
};

// User Services
export const userService = {
  async getCurrentUserProfile() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
        
      if (error) throw error;
      return {
        id: user.id,
        email: user.email,
        fullName: data?.full_name,
      };
    } catch (error) {
      console.error('Error getting user profile:', error);
      return null;
    }
  },
};
