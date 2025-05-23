
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUserProfile } from './useUserProfile';

export interface MetricsData {
  postCount: number;
  pendingTasks: number;
  activeClients: number;
  totalEngagement: number;
}

export const useDashboardMetrics = () => {
  const [metrics, setMetrics] = useState<MetricsData>({
    postCount: 0,
    pendingTasks: 0,
    activeClients: 0,
    totalEngagement: 0
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const { profile } = useUserProfile();
  
  // Função para buscar métricas do dashboard
  const fetchDashboardMetrics = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      if (!profile) {
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
      
      // 1. Contar posts agendados
      let postQuery = supabase
        .from('scheduled_posts')
        .select('*', { count: 'exact', head: true });
      
      if (!isAdmin && clientFilter.clientIds && clientFilter.clientIds.length > 0) {
        postQuery = postQuery.in('client_id', clientFilter.clientIds);
      }
      
      const { count: postCount, error: postError } = await postQuery;
      if (postError) throw postError;
      
      // 2. Contar tarefas pendentes
      let taskQuery = supabase
        .from('automation_tasks')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');
      
      if (!isAdmin && clientFilter.clientIds && clientFilter.clientIds.length > 0) {
        taskQuery = taskQuery.in('client_id', clientFilter.clientIds);
      }
      
      const { count: pendingTasksCount, error: taskError } = await taskQuery;
      if (taskError) throw taskError;
      
      // 3. Contar clientes ativos
      const { count: activeClientsCount, error: clientError } = await supabase
        .from('clients')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'active');
      
      if (clientError) throw clientError;
      
      // 4. Obter métricas de engajamento (simulado para este exemplo)
      let engagementQuery = supabase
        .from('metrics')
        .select('value')
        .eq('metric_type', 'engagement');
      
      if (!isAdmin && clientFilter.clientIds && clientFilter.clientIds.length > 0) {
        engagementQuery = engagementQuery.in('client_id', clientFilter.clientIds);
      }
      
      const { data: engagementData, error: engagementError } = await engagementQuery;
      if (engagementError) throw engagementError;
      
      const totalEngagement = engagementData ? engagementData.reduce((sum, item) => sum + Number(item.value), 0) : 0;
      
      // Atualizar métricas
      setMetrics({
        postCount: postCount || 0,
        pendingTasks: pendingTasksCount || 0,
        activeClients: activeClientsCount || 0,
        totalEngagement: totalEngagement || 0
      });
      
    } catch (err) {
      console.error('Erro ao carregar métricas do dashboard:', err);
      setError('Não foi possível carregar as métricas');
      
      // Usar dados simulados em caso de erro
      setMetrics({
        postCount: 25,
        pendingTasks: 8,
        activeClients: 12,
        totalEngagement: 1240
      });
    } finally {
      setIsLoading(false);
    }
  }, [profile]);
  
  useEffect(() => {
    fetchDashboardMetrics();
  }, [fetchDashboardMetrics]);
  
  return {
    metrics,
    isLoading,
    error,
    refresh: fetchDashboardMetrics
  };
};
