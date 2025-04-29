
import { supabase } from '@/integrations/supabase/client';
import { FileConversion, ConversionType } from '@/types';
import { appConfig } from '@/config/app-config';

// Abstract all Supabase API operations behind service functions

// Helper function to validate conversion type
const validateConversionType = (type: string): ConversionType => {
  if (type === 'convert' || type === 'compress' || type === 'secure') {
    return type as ConversionType;
  }
  // Default to 'convert' if an invalid value is found
  return 'convert';
};

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
      
      // Map the database results to ensure conversion_type is correctly typed
      return (data || []).map(item => ({
        ...item,
        conversion_type: validateConversionType(item.conversion_type),
        output_file_name: item.output_file_name || null,
        output_file_size: item.output_file_size || null,
        output_file_type: item.output_file_type || null,
      }));
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
            // Ensure proper typing for the conversion_type field
            const conversion = {
              ...payload.new as any,
              conversion_type: validateConversionType((payload.new as any).conversion_type)
            } as FileConversion;
            
            callback(conversion);
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
