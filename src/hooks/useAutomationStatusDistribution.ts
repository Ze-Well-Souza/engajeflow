import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUserProfile } from './useUserProfile';

export interface AutomationStatusDistribution {
  pending: number;
  processing: number;
  completed: number;
  failed: number;
  cancelled: number;
  total: number;
  isLoading: boolean;
  error: string | null;
}

export const useAutomationStatusDistribution = () => {
  const [distribution, setDistribution] = useState<AutomationStatusDistribution>({
    pending: 0,
    processing: 0,
    completed: 0,
    failed: 0,
    cancelled: 0,
    total: 0,
    isLoading: true,
    error: null
  });
  
  const { profile } = useUserProfile();
  
  const fetchDistribution = async () => {
    if (!profile) return;
    
    try {
      setDistribution(prev => ({ ...prev, isLoading: true, error: null }));
      
      // Determinar se o usuário é admin ou não para filtrar por cliente
      const isAdmin = profile.is_admin;
      let clientFilter = {};
      
      if (!isAdmin) {
        // Buscar os clientes aos quais o usuário pertence
        const { data: clientMembers } = await supabase
          .from('client_members')
          .select('client_id')
          .eq('user_id', profile.id);
          
        if (clientMembers && clientMembers.length > 0) {
          const clientIds = clientMembers.map(cm => cm.client_id);
          clientFilter = { clientIds };
        }
      }
      
      // Buscar distribuição de status das automações
      const { data: automationTasks, error } = await supabase
        .from('automation_tasks')
        .select('status')
        .in('client_id', clientFilter.clientIds || []);
      
      if (error) {
        throw new Error('Erro ao buscar distribuição de status das automações');
      }
      
      // Calcular distribuição
      const counts = {
        pending: 0,
        processing: 0,
        completed: 0,
        failed: 0,
        cancelled: 0,
        total: automationTasks?.length || 0
      };
      
      automationTasks?.forEach(task => {
        if (task.status in counts) {
          counts[task.status as keyof typeof counts]++;
        }
      });
      
      setDistribution({
        ...counts,
        isLoading: false,
        error: null
      });
      
    } catch (error) {
      console.error('Erro ao buscar distribuição de status das automações:', error);
      setDistribution(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      }));
    }
  };
  
  useEffect(() => {
    fetchDistribution();
  }, [profile]);
  
  const refreshDistribution = () => {
    fetchDistribution();
  };
  
  return {
    ...distribution,
    refreshDistribution
  };
};

export default useAutomationStatusDistribution;
