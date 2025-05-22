import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUserProfile } from './useUserProfile';

export interface ActivityByModule {
  modules: {
    id: string;
    name: string;
    count: number;
  }[];
  total: number;
  isLoading: boolean;
  error: string | null;
}

export const useActivityByModule = (timeRange = 30) => {
  const [activityData, setActivityData] = useState<ActivityByModule>({
    modules: [],
    total: 0,
    isLoading: true,
    error: null
  });
  
  const { profile } = useUserProfile();
  
  const fetchActivityByModule = async () => {
    if (!profile) return;
    
    try {
      setActivityData(prev => ({ ...prev, isLoading: true, error: null }));
      
      // Calcular data de início com base no intervalo de tempo
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - timeRange);
      
      // Buscar atividades por módulo
      const { data: activities, error: activitiesError } = await supabase
        .from('activity_logs')
        .select('module, id')
        .gte('timestamp', startDate.toISOString());
      
      if (activitiesError) {
        throw new Error('Erro ao buscar atividades por módulo');
      }
      
      // Buscar informações dos módulos
      const { data: modules, error: modulesError } = await supabase
        .from('modules')
        .select('id, name');
      
      if (modulesError) {
        throw new Error('Erro ao buscar informações dos módulos');
      }
      
      // Calcular contagem por módulo
      const moduleCounts: Record<string, number> = {};
      
      activities?.forEach(activity => {
        const moduleId = activity.module;
        moduleCounts[moduleId] = (moduleCounts[moduleId] || 0) + 1;
      });
      
      // Formatar dados para exibição
      const formattedData = modules?.map(module => ({
        id: module.id,
        name: module.name,
        count: moduleCounts[module.id] || 0
      })) || [];
      
      // Ordenar por contagem (decrescente)
      formattedData.sort((a, b) => b.count - a.count);
      
      setActivityData({
        modules: formattedData,
        total: activities?.length || 0,
        isLoading: false,
        error: null
      });
      
    } catch (error) {
      console.error('Erro ao buscar atividades por módulo:', error);
      setActivityData(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      }));
    }
  };
  
  useEffect(() => {
    fetchActivityByModule();
  }, [profile, timeRange]);
  
  const refreshActivityData = () => {
    fetchActivityByModule();
  };
  
  return {
    ...activityData,
    refreshActivityData
  };
};

export default useActivityByModule;
