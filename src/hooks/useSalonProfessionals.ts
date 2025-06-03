import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Professional {
  id: string;
  client_id: string;
  name: string;
  email: string | null;
  phone: string | null;
  bio: string | null;
  profile_image_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  specialties?: string[]; // IDs das especialidades
}

export const useSalonProfessionals = (clientId: string) => {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchProfessionals = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('salon_professionals')
        .select(`
          *,
          salon_professional_specialties(
            specialty_id
          )
        `)
        .eq('client_id', clientId)
        .eq('is_active', true);

      if (error) {
        throw error;
      }

      // Transformar os dados para incluir as especialidades como array
      const professionalsWithSpecialties = data.map(prof => {
        const specialties = prof.salon_professional_specialties
          ? prof.salon_professional_specialties.map((s: any) => s.specialty_id)
          : [];
        
        delete prof.salon_professional_specialties;
        
        return {
          ...prof,
          specialties
        };
      });

      setProfessionals(professionalsWithSpecialties);
    } catch (error: any) {
      console.error('Erro ao buscar profissionais:', error);
      setError(error.message || 'Erro ao buscar profissionais');
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar os profissionais.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addProfessional = async (professional: Omit<Professional, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      setIsLoading(true);
      setError(null);

      // Extrair especialidades antes de inserir o profissional
      const { specialties, ...professionalData } = professional;

      // Inserir o profissional
      const { data, error } = await supabase
        .from('salon_professionals')
        .insert([{ ...professionalData, client_id: clientId }])
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Se houver especialidades, inserir as relações
      if (specialties && specialties.length > 0) {
        const specialtyRelations = specialties.map(specialtyId => ({
          professional_id: data.id,
          specialty_id: specialtyId
        }));

        const { error: relError } = await supabase
          .from('salon_professional_specialties')
          .insert(specialtyRelations);

        if (relError) {
          throw relError;
        }
      }

      // Atualizar a lista de profissionais
      fetchProfessionals();

      toast({
        title: 'Sucesso',
        description: 'Profissional adicionado com sucesso.',
      });

      return data;
    } catch (error: any) {
      console.error('Erro ao adicionar profissional:', error);
      setError(error.message || 'Erro ao adicionar profissional');
      toast({
        title: 'Erro',
        description: 'Não foi possível adicionar o profissional.',
        variant: 'destructive',
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfessional = async (id: string, professional: Partial<Omit<Professional, 'id' | 'client_id' | 'created_at' | 'updated_at'>>) => {
    try {
      setIsLoading(true);
      setError(null);

      // Extrair especialidades antes de atualizar o profissional
      const { specialties, ...professionalData } = professional;

      // Atualizar o profissional
      const { error } = await supabase
        .from('salon_professionals')
        .update(professionalData)
        .eq('id', id)
        .eq('client_id', clientId);

      if (error) {
        throw error;
      }

      // Se houver especialidades, atualizar as relações
      if (specialties) {
        // Primeiro, remover todas as relações existentes
        const { error: delError } = await supabase
          .from('salon_professional_specialties')
          .delete()
          .eq('professional_id', id);

        if (delError) {
          throw delError;
        }

        // Depois, inserir as novas relações
        if (specialties.length > 0) {
          const specialtyRelations = specialties.map(specialtyId => ({
            professional_id: id,
            specialty_id: specialtyId
          }));

          const { error: relError } = await supabase
            .from('salon_professional_specialties')
            .insert(specialtyRelations);

          if (relError) {
            throw relError;
          }
        }
      }

      // Atualizar a lista de profissionais
      fetchProfessionals();

      toast({
        title: 'Sucesso',
        description: 'Profissional atualizado com sucesso.',
      });

      return true;
    } catch (error: any) {
      console.error('Erro ao atualizar profissional:', error);
      setError(error.message || 'Erro ao atualizar profissional');
      toast({
        title: 'Erro',
        description: 'Não foi possível atualizar o profissional.',
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProfessional = async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // Opção 1: Exclusão física
      // const { error } = await supabase
      //   .from('salon_professionals')
      //   .delete()
      //   .eq('id', id)
      //   .eq('client_id', clientId);

      // Opção 2: Exclusão lógica (recomendada)
      const { error } = await supabase
        .from('salon_professionals')
        .update({ is_active: false })
        .eq('id', id)
        .eq('client_id', clientId);

      if (error) {
        throw error;
      }

      // Atualizar a lista de profissionais
      fetchProfessionals();

      toast({
        title: 'Sucesso',
        description: 'Profissional removido com sucesso.',
      });

      return true;
    } catch (error: any) {
      console.error('Erro ao remover profissional:', error);
      setError(error.message || 'Erro ao remover profissional');
      toast({
        title: 'Erro',
        description: 'Não foi possível remover o profissional.',
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (clientId) {
      fetchProfessionals();
    }
  }, [clientId]);

  return {
    professionals,
    isLoading,
    error,
    fetchProfessionals,
    addProfessional,
    updateProfessional,
    deleteProfessional
  };
};
