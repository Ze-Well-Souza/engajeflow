import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface SalonSpecialty {
  id: string;
  client_id: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export const useSalonSpecialties = (clientId: string) => {
  const [specialties, setSpecialties] = useState<SalonSpecialty[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchSpecialties = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('salon_specialties')
        .select('*')
        .eq('client_id', clientId);

      if (error) {
        throw error;
      }

      setSpecialties(data || []);
    } catch (error: any) {
      console.error('Erro ao buscar especialidades:', error);
      setError(error.message || 'Erro ao buscar especialidades');
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar as especialidades.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addSpecialty = async (specialty: Omit<SalonSpecialty, 'id' | 'client_id' | 'created_at' | 'updated_at'>) => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('salon_specialties')
        .insert([{ ...specialty, client_id: clientId }])
        .select()
        .single();

      if (error) {
        throw error;
      }

      setSpecialties(prev => [...prev, data]);

      toast({
        title: 'Sucesso',
        description: 'Especialidade adicionada com sucesso.',
      });

      return data;
    } catch (error: any) {
      console.error('Erro ao adicionar especialidade:', error);
      setError(error.message || 'Erro ao adicionar especialidade');
      toast({
        title: 'Erro',
        description: 'Não foi possível adicionar a especialidade.',
        variant: 'destructive',
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const updateSpecialty = async (id: string, specialty: Partial<Omit<SalonSpecialty, 'id' | 'client_id' | 'created_at' | 'updated_at'>>) => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('salon_specialties')
        .update(specialty)
        .eq('id', id)
        .eq('client_id', clientId)
        .select()
        .single();

      if (error) {
        throw error;
      }

      setSpecialties(prev => prev.map(s => s.id === id ? data : s));

      toast({
        title: 'Sucesso',
        description: 'Especialidade atualizada com sucesso.',
      });

      return true;
    } catch (error: any) {
      console.error('Erro ao atualizar especialidade:', error);
      setError(error.message || 'Erro ao atualizar especialidade');
      toast({
        title: 'Erro',
        description: 'Não foi possível atualizar a especialidade.',
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteSpecialty = async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // Verificar se a especialidade está em uso
      const { data: profSpecialties, error: checkError } = await supabase
        .from('salon_professional_specialties')
        .select('id')
        .eq('specialty_id', id)
        .limit(1);

      if (checkError) {
        throw checkError;
      }

      if (profSpecialties && profSpecialties.length > 0) {
        toast({
          title: 'Ação não permitida',
          description: 'Esta especialidade está associada a profissionais e não pode ser removida.',
          variant: 'destructive',
        });
        return false;
      }

      const { error } = await supabase
        .from('salon_specialties')
        .delete()
        .eq('id', id)
        .eq('client_id', clientId);

      if (error) {
        throw error;
      }

      setSpecialties(prev => prev.filter(s => s.id !== id));

      toast({
        title: 'Sucesso',
        description: 'Especialidade removida com sucesso.',
      });

      return true;
    } catch (error: any) {
      console.error('Erro ao remover especialidade:', error);
      setError(error.message || 'Erro ao remover especialidade');
      toast({
        title: 'Erro',
        description: 'Não foi possível remover a especialidade.',
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (clientId) {
      fetchSpecialties();
    }
  }, [clientId]);

  return {
    specialties,
    isLoading,
    error,
    fetchSpecialties,
    addSpecialty,
    updateSpecialty,
    deleteSpecialty
  };
};
