
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUserProfile } from './useUserProfile';

export interface AutomationTask {
  id: string;
  task_type: string;
  status: string;
  created_at: string;
  executed_at?: string;
  parameters?: Record<string, any>;
  result?: Record<string, any>;
  error_message?: string;
}

export interface UseRecentAutomationsResult {
  tasks: AutomationTask[];
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export const useRecentAutomations = (limit: number = 5): UseRecentAutomationsResult => {
  const [tasks, setTasks] = useState<AutomationTask[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const { profile } = useUserProfile();
  
  const fetchRecentAutomations = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      if (!profile) {
        setTasks([]);
        return;
      }
      
      // Determinar se o usuário é admin ou não para filtrar por cliente
      const isAdmin = profile.is_admin || false;
      
      let query = supabase
        .from('automation_tasks')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);
      
      // Se não for admin, filtrar apenas para o usuário atual
      if (!isAdmin) {
        query = query.eq('user_id', profile.id);
      }
      
      const { data, error: dbError } = await query;
      
      if (dbError) {
        throw dbError;
      }
      
      if (data) {
        setTasks(data as AutomationTask[]);
      } else {
        // Se não houver dados, usar dados simulados para demonstração
        const mockTasks = [
          {
            id: '1',
            task_type: 'social_post_scheduling',
            status: 'completed',
            created_at: new Date(Date.now() - 3600000).toISOString(),
            executed_at: new Date(Date.now() - 3500000).toISOString(),
            parameters: { platform: 'instagram', mediaId: '123' }
          },
          {
            id: '2',
            task_type: 'email_campaign',
            status: 'failed',
            created_at: new Date(Date.now() - 7200000).toISOString(),
            executed_at: new Date(Date.now() - 7100000).toISOString(),
            error_message: 'Falha ao enviar email'
          },
          {
            id: '3',
            task_type: 'content_generation',
            status: 'processing',
            created_at: new Date(Date.now() - 1800000).toISOString()
          }
        ] as AutomationTask[];
        
        setTasks(mockTasks);
      }
      
    } catch (err) {
      console.error('Erro ao buscar automações recentes:', err);
      setError('Não foi possível carregar as automações recentes');
      
      // Usar dados simulados em caso de erro
      const mockTasks = [
        {
          id: '1',
          task_type: 'social_post_scheduling',
          status: 'completed',
          created_at: new Date(Date.now() - 3600000).toISOString(),
          executed_at: new Date(Date.now() - 3500000).toISOString(),
          parameters: { platform: 'instagram', mediaId: '123' }
        },
        {
          id: '2',
          task_type: 'email_campaign',
          status: 'failed',
          created_at: new Date(Date.now() - 7200000).toISOString(),
          executed_at: new Date(Date.now() - 7100000).toISOString(),
          error_message: 'Falha ao enviar email'
        }
      ] as AutomationTask[];
      
      setTasks(mockTasks);
    } finally {
      setIsLoading(false);
    }
  }, [profile, limit]);
  
  useEffect(() => {
    fetchRecentAutomations();
  }, [fetchRecentAutomations]);
  
  return {
    tasks,
    isLoading,
    error,
    refresh: fetchRecentAutomations
  };
};
