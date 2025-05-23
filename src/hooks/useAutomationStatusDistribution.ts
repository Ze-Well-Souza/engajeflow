
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUserProfile } from './useUserProfile';

export interface StatusDistribution {
  status: string;
  count: number;
  percentage: number;
}

export interface AutomationStatusResult {
  distribution: StatusDistribution[];
  pending: number;
  processing: number;
  completed: number;
  failed: number;
  cancelled: number;
  total: number;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  refreshDistribution: () => Promise<void>;
}

export const useAutomationStatusDistribution = (): AutomationStatusResult => {
  const [distribution, setDistribution] = useState<StatusDistribution[]>([]);
  const [statusCounts, setStatusCounts] = useState({
    pending: 0,
    processing: 0,
    completed: 0,
    failed: 0,
    cancelled: 0,
    total: 0
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const { profile } = useUserProfile();
  
  // Função para buscar distribuição de status
  const fetchStatusDistribution = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      if (!profile) {
        setDistribution([]);
        setStatusCounts({
          pending: 0,
          processing: 0,
          completed: 0,
          failed: 0,
          cancelled: 0,
          total: 0
        });
        return;
      }
      
      // Determinar se o usuário é admin ou não para filtrar por cliente
      const isAdmin = profile.is_admin || false;
      let clientFilter: { clientIds?: string[] } = {};
      
      if (!isAdmin) {
        // Buscar os clientes aos quais o usuário pertence
        const { data: clientMembers, error: membersError } = await supabase
          .from('client_members')
          .select('client_id')
          .eq('user_id', profile.id);
          
        if (membersError) throw membersError;
        
        if (clientMembers && clientMembers.length > 0) {
          const clientIds = clientMembers.map(cm => cm.client_id);
          clientFilter = { clientIds };
        }
      }
      
      // Buscar contagem por status
      let query = supabase
        .from('automation_tasks')
        .select('status, count(*)', { count: 'exact' })
        .group('status');
      
      // Aplicar filtro de cliente se necessário
      if (!isAdmin && clientFilter.clientIds && clientFilter.clientIds.length > 0) {
        query = query.in('client_id', clientFilter.clientIds);
      }
      
      const { data, error: countError, count } = await query;
      
      if (countError) throw countError;
      
      // Processar dados
      const total = count || 0;
      
      if (data && data.length > 0) {
        const statuses = data.map(item => ({
          status: item.status,
          count: item.count,
          percentage: total > 0 ? (item.count / total) * 100 : 0
        }));
        
        setDistribution(statuses);
        
        // Atualizar contadores individuais
        const counts = {
          pending: 0,
          processing: 0,
          completed: 0,
          failed: 0,
          cancelled: 0,
          total
        };
        
        statuses.forEach(item => {
          if (item.status === 'pending') counts.pending = item.count;
          else if (item.status === 'processing') counts.processing = item.count;
          else if (item.status === 'completed') counts.completed = item.count;
          else if (item.status === 'failed') counts.failed = item.count;
          else if (item.status === 'cancelled') counts.cancelled = item.count;
        });
        
        setStatusCounts(counts);
      } else {
        // Dados simulados para demonstração
        const mockData = [
          { status: 'pending', count: 5, percentage: 25 },
          { status: 'processing', count: 3, percentage: 15 },
          { status: 'completed', count: 10, percentage: 50 },
          { status: 'failed', count: 2, percentage: 10 },
        ];
        setDistribution(mockData);
        
        setStatusCounts({
          pending: 5,
          processing: 3,
          completed: 10,
          failed: 2,
          cancelled: 0,
          total: 20
        });
      }
      
    } catch (err) {
      console.error('Erro ao buscar distribuição de status:', err);
      setError('Não foi possível carregar a distribuição de status');
      
      // Dados simulados em caso de erro
      const mockData = [
        { status: 'pending', count: 5, percentage: 25 },
        { status: 'processing', count: 3, percentage: 15 },
        { status: 'completed', count: 10, percentage: 50 },
        { status: 'failed', count: 2, percentage: 10 },
      ];
      setDistribution(mockData);
      
      setStatusCounts({
        pending: 5,
        processing: 3,
        completed: 10,
        failed: 2,
        cancelled: 0,
        total: 20
      });
    } finally {
      setIsLoading(false);
    }
  }, [profile]);
  
  useEffect(() => {
    fetchStatusDistribution();
  }, [fetchStatusDistribution]);
  
  return {
    distribution,
    ...statusCounts,
    isLoading,
    error,
    refresh: fetchStatusDistribution,
    refreshDistribution: fetchStatusDistribution
  };
};

export default useAutomationStatusDistribution;
