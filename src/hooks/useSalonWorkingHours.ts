import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface WorkingHours {
  id: string;
  professional_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useSalonWorkingHours = (professionalId: string) => {
  const [workingHours, setWorkingHours] = useState<WorkingHours[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchWorkingHours = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('salon_working_hours')
        .select('*')
        .eq('professional_id', professionalId)
        .order('day_of_week', { ascending: true })
        .order('start_time', { ascending: true });

      if (error) {
        throw error;
      }

      setWorkingHours(data || []);
    } catch (error: any) {
      console.error('Erro ao buscar horários de trabalho:', error);
      setError(error.message || 'Erro ao buscar horários de trabalho');
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar os horários de trabalho.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addWorkingHours = async (hours: Omit<WorkingHours, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      setIsLoading(true);
      setError(null);

      // Verificar se já existe um horário para este dia e profissional que se sobreponha
      const { data: existingHours, error: checkError } = await supabase
        .from('salon_working_hours')
        .select('*')
        .eq('professional_id', professionalId)
        .eq('day_of_week', hours.day_of_week)
        .or(`start_time.lte.${hours.end_time},end_time.gte.${hours.start_time}`);

      if (checkError) {
        throw checkError;
      }

      if (existingHours && existingHours.length > 0) {
        toast({
          title: 'Conflito de horários',
          description: 'Já existe um horário cadastrado que se sobrepõe a este período.',
          variant: 'destructive',
        });
        return null;
      }

      const { data, error } = await supabase
        .from('salon_working_hours')
        .insert([{ ...hours, professional_id: professionalId }])
        .select()
        .single();

      if (error) {
        throw error;
      }

      setWorkingHours(prev => [...prev, data]);

      toast({
        title: 'Sucesso',
        description: 'Horário de trabalho adicionado com sucesso.',
      });

      return data;
    } catch (error: any) {
      console.error('Erro ao adicionar horário de trabalho:', error);
      setError(error.message || 'Erro ao adicionar horário de trabalho');
      toast({
        title: 'Erro',
        description: 'Não foi possível adicionar o horário de trabalho.',
        variant: 'destructive',
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const updateWorkingHours = async (id: string, hours: Partial<Omit<WorkingHours, 'id' | 'professional_id' | 'created_at' | 'updated_at'>>) => {
    try {
      setIsLoading(true);
      setError(null);

      // Se estiver atualizando horário ou dia, verificar sobreposição
      if (hours.day_of_week !== undefined || hours.start_time !== undefined || hours.end_time !== undefined) {
        // Obter o registro atual para completar os dados
        const { data: currentHours, error: fetchError } = await supabase
          .from('salon_working_hours')
          .select('*')
          .eq('id', id)
          .single();

        if (fetchError) {
          throw fetchError;
        }

        const updatedHours = {
          ...currentHours,
          ...hours
        };

        // Verificar sobreposição com outros horários (exceto o próprio)
        const { data: existingHours, error: checkError } = await supabase
          .from('salon_working_hours')
          .select('*')
          .eq('professional_id', professionalId)
          .eq('day_of_week', updatedHours.day_of_week)
          .neq('id', id)
          .or(`start_time.lte.${updatedHours.end_time},end_time.gte.${updatedHours.start_time}`);

        if (checkError) {
          throw checkError;
        }

        if (existingHours && existingHours.length > 0) {
          toast({
            title: 'Conflito de horários',
            description: 'Já existe um horário cadastrado que se sobrepõe a este período.',
            variant: 'destructive',
          });
          return false;
        }
      }

      const { data, error } = await supabase
        .from('salon_working_hours')
        .update(hours)
        .eq('id', id)
        .eq('professional_id', professionalId)
        .select()
        .single();

      if (error) {
        throw error;
      }

      setWorkingHours(prev => prev.map(h => h.id === id ? data : h));

      toast({
        title: 'Sucesso',
        description: 'Horário de trabalho atualizado com sucesso.',
      });

      return true;
    } catch (error: any) {
      console.error('Erro ao atualizar horário de trabalho:', error);
      setError(error.message || 'Erro ao atualizar horário de trabalho');
      toast({
        title: 'Erro',
        description: 'Não foi possível atualizar o horário de trabalho.',
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteWorkingHours = async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const { error } = await supabase
        .from('salon_working_hours')
        .delete()
        .eq('id', id)
        .eq('professional_id', professionalId);

      if (error) {
        throw error;
      }

      setWorkingHours(prev => prev.filter(h => h.id !== id));

      toast({
        title: 'Sucesso',
        description: 'Horário de trabalho removido com sucesso.',
      });

      return true;
    } catch (error: any) {
      console.error('Erro ao remover horário de trabalho:', error);
      setError(error.message || 'Erro ao remover horário de trabalho');
      toast({
        title: 'Erro',
        description: 'Não foi possível remover o horário de trabalho.',
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (professionalId) {
      fetchWorkingHours();
    }
  }, [professionalId]);

  return {
    workingHours,
    isLoading,
    error,
    fetchWorkingHours,
    addWorkingHours,
    updateWorkingHours,
    deleteWorkingHours
  };
};
