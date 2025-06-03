import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AvailableSlot {
  professional_id: string;
  professional_name: string;
  available_start_time: string;
  available_end_time: string;
}

export const useSalonAvailability = (clientId: string) => {
  const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const checkAvailability = async (
    serviceId: string,
    date: Date,
    professionalId?: string
  ) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Formatar a data para YYYY-MM-DD
      const formattedDate = date.toISOString().split('T')[0];
      
      // Chamar a função SQL que verifica disponibilidade
      const { data, error } = await supabase
        .rpc('check_salon_availability', {
          p_client_id: clientId,
          p_service_id: serviceId,
          p_date: formattedDate,
          p_professional_id: professionalId || null
        });
      
      if (error) {
        throw error;
      }
      
      setAvailableSlots(data || []);
      return data;
    } catch (error: any) {
      console.error('Erro ao verificar disponibilidade:', error);
      setError(error.message || 'Erro ao verificar disponibilidade');
      toast({
        title: 'Erro',
        description: 'Não foi possível verificar a disponibilidade de horários.',
        variant: 'destructive',
      });
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return {
    availableSlots,
    isLoading,
    error,
    checkAvailability
  };
};
