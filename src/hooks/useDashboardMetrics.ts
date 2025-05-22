import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUserProfile } from './useUserProfile';

export interface DashboardMetrics {
  activeAutomations: number;
  automationSuccessRate: number;
  scheduledPosts: number;
  recentActivities: number;
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date;
}

export const useDashboardMetrics = (refreshInterval = 60000) => {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    activeAutomations: 0,
    automationSuccessRate: 0,
    scheduledPosts: 0,
    recentActivities: 0,
    isLoading: true,
    error: null,
    lastUpdated: new Date()
  });
  
  const { profile } = useUserProfile();
  
  const fetchMetrics = async () => {
    if (!profile) return;
    
    try {
      setMetrics(prev => ({ ...prev, isLoading: true, error: null }));
      
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
      
      // Buscar total de automações ativas
      const { count: activeAutomationsCount, error: automationsError } = await supabase
        .from('automation_tasks')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending')
        .in('client_id', clientFilter.clientIds || []);
      
      // Buscar taxa de sucesso das automações
      const { data: automationStats, error: statsError } = await supabase
        .from('automation_tasks')
        .select('status')
        .in('client_id', clientFilter.clientIds || []);
        
      let successRate = 0;
      if (automationStats && automationStats.length > 0) {
        const completedCount = automationStats.filter(task => task.status === 'completed').length;
        successRate = (completedCount / automationStats.length) * 100;
      }
      
      // Buscar total de publicações agendadas
      const { count: scheduledPostsCount, error: postsError } = await supabase
        .from('scheduled_posts')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending')
        .in('client_id', clientFilter.clientIds || []);
      
      // Buscar atividades recentes (últimas 24h)
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      const { count: recentActivitiesCount, error: activitiesError } = await supabase
        .from('activity_logs')
        .select('*', { count: 'exact', head: true })
        .gt('timestamp', yesterday.toISOString());
      
      // Verificar erros
      if (automationsError || statsError || postsError || activitiesError) {
        throw new Error('Erro ao buscar métricas do dashboard');
      }
      
      // Atualizar estado com os dados obtidos
      setMetrics({
        activeAutomations: activeAutomationsCount || 0,
        automationSuccessRate: Math.round(successRate * 10) / 10, // Arredondar para 1 casa decimal
        scheduledPosts: scheduledPostsCount || 0,
        recentActivities: recentActivitiesCount || 0,
        isLoading: false,
        error: null,
        lastUpdated: new Date()
      });
      
    } catch (error) {
      console.error('Erro ao buscar métricas do dashboard:', error);
      setMetrics(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      }));
    }
  };
  
  // Efeito para buscar métricas na montagem do componente e periodicamente
  useEffect(() => {
    fetchMetrics();
    
    // Configurar intervalo de atualização
    const intervalId = setInterval(fetchMetrics, refreshInterval);
    
    // Limpar intervalo na desmontagem
    return () => clearInterval(intervalId);
  }, [profile, refreshInterval]);
  
  // Função para atualizar manualmente
  const refreshMetrics = () => {
    fetchMetrics();
  };
  
  return {
    ...metrics,
    refreshMetrics
  };
};

export default useDashboardMetrics;
