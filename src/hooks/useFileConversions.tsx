
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';

interface FileConversion {
  id: string;
  input_file_name: string;
  output_file_name: string | null;
  status: string;
  created_at: string;
}

export const useFileConversions = () => {
  const [conversions, setConversions] = useState<FileConversion[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchConversions = async () => {
      try {
        const { data, error } = await supabase
          .from('file_conversions')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setConversions(data || []);
      } catch (error) {
        console.error('Error fetching conversions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConversions();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('public:file_conversions')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'file_conversions',
          filter: `user_id=eq.${user.id}`
        }, 
        payload => {
          if (payload.eventType === 'INSERT') {
            setConversions(prev => [payload.new, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setConversions(prev => 
              prev.map(conv => 
                conv.id === payload.new.id ? payload.new : conv
              )
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return { conversions, loading };
};
