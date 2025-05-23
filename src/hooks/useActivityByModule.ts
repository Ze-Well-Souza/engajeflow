
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUserProfile } from './useUserProfile';

export interface ModuleActivity {
  module: string;
  count: number;
}

export interface ActivityByModuleResult {
  activities: ModuleActivity[];
  modules: ModuleActivity[];  // Alias para compatibilidade
  total: number;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  refreshActivityData: () => Promise<void>; // Alias para compatibilidade
}

export const useActivityByModule = (period: 'week' | 'month' = 'week'): ActivityByModuleResult => {
  const [activities, setActivities] = useState<ModuleActivity[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const { profile } = useUserProfile();
  
  // Função para buscar estatísticas por módulo
  const fetchActivityByModule = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      if (!profile) {
        setActivities([]);
        setTotal(0);
        return;
      }
      
      // Determinar intervalo de tempo baseado no período
      const now = new Date();
      let startDate: Date;
      
      if (period === 'week') {
        // Últimos 7 dias
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 7);
      } else {
        // Último mês
        startDate = new Date(now);
        startDate.setMonth(now.getMonth() - 1);
      }
      
      // Buscar logs de atividade
      const { data, error: dbError } = await supabase
        .from('activity_logs')
        .select('module, count(*)')
        .gte('timestamp', startDate.toISOString())
        .lte('timestamp', now.toISOString())
        .eq('user_email', profile.email)
        .group('module');
      
      if (dbError) {
        throw new Error(dbError.message);
      }
      
      // Processar os dados
      const moduleActivities: ModuleActivity[] = data?.map(item => ({
        module: item.module,
        count: item.count
      })) || [];
      
      // Se não houver dados, adicionar alguns dados simulados
      if (moduleActivities.length === 0) {
        const mockData = [
          { module: 'dashboard', count: 12 },
          { module: 'social', count: 8 },
          { module: 'content', count: 5 },
          { module: 'settings', count: 2 }
        ];
        setActivities(mockData);
        // Calcular total
        const totalCount = mockData.reduce((sum, item) => sum + item.count, 0);
        setTotal(totalCount);
      } else {
        setActivities(moduleActivities);
        // Calcular total
        const totalCount = moduleActivities.reduce((sum, item) => sum + item.count, 0);
        setTotal(totalCount);
      }
      
    } catch (err) {
      console.error('Erro ao buscar atividades por módulo:', err);
      setError('Não foi possível carregar as estatísticas de atividade');
      
      // Usar dados simulados em caso de erro
      const mockData = [
        { module: 'dashboard', count: 12 },
        { module: 'social', count: 8 },
        { module: 'content', count: 5 },
        { module: 'settings', count: 2 }
      ];
      setActivities(mockData);
      // Calcular total
      const totalCount = mockData.reduce((sum, item) => sum + item.count, 0);
      setTotal(totalCount);
    } finally {
      setIsLoading(false);
    }
  }, [profile, period]);
  
  useEffect(() => {
    fetchActivityByModule();
  }, [fetchActivityByModule]);
  
  return {
    activities,
    modules: activities, // Alias para compatibilidade
    total,
    isLoading,
    error,
    refresh: fetchActivityByModule,
    refreshActivityData: fetchActivityByModule // Alias para compatibilidade
  };
};

export default useActivityByModule;
