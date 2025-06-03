import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface SalonService {
  id: string;
  client_id: string;
  name: string;
  description: string | null;
  duration_minutes: number;
  price: number | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  specialties?: string[]; // IDs das especialidades necessárias
}

export const useSalonServices = (clientId: string) => {
  const [services, setServices] = useState<SalonService[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchServices = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('salon_services')
        .select(`
          *,
          salon_service_specialties(
            specialty_id
          )
        `)
        .eq('client_id', clientId)
        .eq('is_active', true);

      if (error) {
        throw error;
      }

      // Transformar os dados para incluir as especialidades como array
      const servicesWithSpecialties = data.map(service => {
        const specialties = service.salon_service_specialties
          ? service.salon_service_specialties.map((s: any) => s.specialty_id)
          : [];
        
        delete service.salon_service_specialties;
        
        return {
          ...service,
          specialties
        };
      });

      setServices(servicesWithSpecialties);
    } catch (error: any) {
      console.error('Erro ao buscar serviços:', error);
      setError(error.message || 'Erro ao buscar serviços');
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar os serviços.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addService = async (service: Omit<SalonService, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      setIsLoading(true);
      setError(null);

      // Extrair especialidades antes de inserir o serviço
      const { specialties, ...serviceData } = service;

      // Inserir o serviço
      const { data, error } = await supabase
        .from('salon_services')
        .insert([{ ...serviceData, client_id: clientId }])
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Se houver especialidades, inserir as relações
      if (specialties && specialties.length > 0) {
        const specialtyRelations = specialties.map(specialtyId => ({
          service_id: data.id,
          specialty_id: specialtyId
        }));

        const { error: relError } = await supabase
          .from('salon_service_specialties')
          .insert(specialtyRelations);

        if (relError) {
          throw relError;
        }
      }

      // Atualizar a lista de serviços
      fetchServices();

      toast({
        title: 'Sucesso',
        description: 'Serviço adicionado com sucesso.',
      });

      return data;
    } catch (error: any) {
      console.error('Erro ao adicionar serviço:', error);
      setError(error.message || 'Erro ao adicionar serviço');
      toast({
        title: 'Erro',
        description: 'Não foi possível adicionar o serviço.',
        variant: 'destructive',
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const updateService = async (id: string, service: Partial<Omit<SalonService, 'id' | 'client_id' | 'created_at' | 'updated_at'>>) => {
    try {
      setIsLoading(true);
      setError(null);

      // Extrair especialidades antes de atualizar o serviço
      const { specialties, ...serviceData } = service;

      // Atualizar o serviço
      const { error } = await supabase
        .from('salon_services')
        .update(serviceData)
        .eq('id', id)
        .eq('client_id', clientId);

      if (error) {
        throw error;
      }

      // Se houver especialidades, atualizar as relações
      if (specialties) {
        // Primeiro, remover todas as relações existentes
        const { error: delError } = await supabase
          .from('salon_service_specialties')
          .delete()
          .eq('service_id', id);

        if (delError) {
          throw delError;
        }

        // Depois, inserir as novas relações
        if (specialties.length > 0) {
          const specialtyRelations = specialties.map(specialtyId => ({
            service_id: id,
            specialty_id: specialtyId
          }));

          const { error: relError } = await supabase
            .from('salon_service_specialties')
            .insert(specialtyRelations);

          if (relError) {
            throw relError;
          }
        }
      }

      // Atualizar a lista de serviços
      fetchServices();

      toast({
        title: 'Sucesso',
        description: 'Serviço atualizado com sucesso.',
      });

      return true;
    } catch (error: any) {
      console.error('Erro ao atualizar serviço:', error);
      setError(error.message || 'Erro ao atualizar serviço');
      toast({
        title: 'Erro',
        description: 'Não foi possível atualizar o serviço.',
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteService = async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // Opção 1: Exclusão física
      // const { error } = await supabase
      //   .from('salon_services')
      //   .delete()
      //   .eq('id', id)
      //   .eq('client_id', clientId);

      // Opção 2: Exclusão lógica (recomendada)
      const { error } = await supabase
        .from('salon_services')
        .update({ is_active: false })
        .eq('id', id)
        .eq('client_id', clientId);

      if (error) {
        throw error;
      }

      // Atualizar a lista de serviços
      fetchServices();

      toast({
        title: 'Sucesso',
        description: 'Serviço removido com sucesso.',
      });

      return true;
    } catch (error: any) {
      console.error('Erro ao remover serviço:', error);
      setError(error.message || 'Erro ao remover serviço');
      toast({
        title: 'Erro',
        description: 'Não foi possível remover o serviço.',
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (clientId) {
      fetchServices();
    }
  }, [clientId]);

  return {
    services,
    isLoading,
    error,
    fetchServices,
    addService,
    updateService,
    deleteService
  };
};
