
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUserProfile } from './useUserProfile';

export interface MetricsData {
  activeAutomations: number;
  automationSuccessRate: number;
  scheduledPosts: number;
  recentActivities: number;
}

export interface DashboardMetricsResult {
  metrics: MetricsData;
  activeAutomations: number;
  automationSuccessRate: number;
  scheduledPosts: number;
  recentActivities: number;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  refreshMetrics: () => Promise<void>;
  lastUpdated: Date;
}

export const useDashboardMetrics = (): DashboardMetricsResult => {
  const [metrics, setMetrics] = useState<MetricsData>({
    activeAutomations: 0,
    automationSuccessRate: 0,
    scheduledPosts: 0,
    recentActivities: 0
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  
  const { profile } = useUserProfile();
  
  const fetchDashboardMetrics = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      if (!profile) {
        return;
      }
      
      // Simular delay de carregamento
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Dados simulados
      const metricsData: MetricsData = {
        activeAutomations: 24,
        automationSuccessRate: 87.5,
        scheduledPosts: 15,
        recentActivities: 42
      };
      
      setMetrics(metricsData);
      setLastUpdated(new Date());
      
    } catch (err) {
      console.error('Erro ao buscar métricas do dashboard:', err);
      setError('Não foi possível carregar as métricas do dashboard');
      
      setMetrics({
        activeAutomations: 18,
        automationSuccessRate: 75,
        scheduledPosts: 12,
        recentActivities: 30
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
    ...metrics,
    isLoading,
    error,
    refresh: fetchDashboardMetrics,
    refreshMetrics: fetchDashboardMetrics,
    lastUpdated
  };
};

export default useDashboardMetrics;
