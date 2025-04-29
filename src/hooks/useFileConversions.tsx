
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { fileConversionService } from '@/services/api';
import { FileConversion } from '@/types';

export const useFileConversions = () => {
  const [conversions, setConversions] = useState<FileConversion[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchConversions = async () => {
      try {
        const data = await fileConversionService.getConversions();
        setConversions(data);
      } catch (error) {
        console.error('Error fetching conversions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConversions();

    // Subscribe to realtime updates
    const unsubscribe = fileConversionService.subscribeToConversions(user.id, (newConversion) => {
      setConversions(prev => {
        // If it's an update to an existing conversion
        const exists = prev.some(c => c.id === newConversion.id);
        if (exists) {
          return prev.map(c => c.id === newConversion.id ? newConversion : c);
        }
        // If it's a new conversion
        return [newConversion, ...prev];
      });
    });

    return unsubscribe;
  }, [user]);

  return { conversions, loading };
};
