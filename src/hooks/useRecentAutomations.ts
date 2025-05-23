
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUserProfile } from './useUserProfile';

export interface RecentAutomation {
  id: string;
  name: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
  created_at: string;
  last_run?: string;
  next_run?: string;
  success_rate?: number;
}

export interface UseRecentAutomationsResult {
  automations: RecentAutomation[];
  isLoading: boolean;
  error: string | null;
  totalCount: number;
  totalPages: number;
  currentPage: number;
  refresh: () => Promise<void>;
  refreshAutomations: () => Promise<void>;
}

export const useRecentAutomations = (limit: number = 10, page: number = 1): UseRecentAutomationsResult => {
  const [automations, setAutomations] = useState<RecentAutomation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  
  const { profile } = useUserProfile();
  
  const fetchRecentAutomations = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      if (!profile) {
        setAutomations([]);
        setTotalCount(0);
        return;
      }
      
      // Dados simulados para demonstração
      const mockAutomations: RecentAutomation[] = [
        {
          id: '1',
          name: 'Envio de boas-vindas',
          status: 'completed',
          created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          last_run: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          next_run: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          success_rate: 95
        },
        {
          id: '2',
          name: 'Lembrete de agendamento',
          status: 'processing',
          created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          last_run: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
          success_rate: 88
        },
        {
          id: '3',
          name: 'Relatório semanal',
          status: 'pending',
          created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
          next_run: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
          success_rate: 92
        },
        {
          id: '4',
          name: 'Backup de dados',
          status: 'failed',
          created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
          last_run: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          success_rate: 45
        },
        {
          id: '5',
          name: 'Sincronização social',
          status: 'completed',
          created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
          last_run: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
          next_run: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
          success_rate: 98
        }
      ];
      
      // Simular paginação
      const offset = (page - 1) * limit;
      const paginatedAutomations = mockAutomations.slice(offset, offset + limit);
      
      setAutomations(paginatedAutomations);
      setTotalCount(mockAutomations.length);
      
    } catch (err) {
      console.error('Erro ao buscar automações recentes:', err);
      setError('Não foi possível carregar as automações recentes');
      setAutomations([]);
      setTotalCount(0);
    } finally {
      setIsLoading(false);
    }
  }, [profile, limit, page]);
  
  useEffect(() => {
    fetchRecentAutomations();
  }, [fetchRecentAutomations]);
  
  return {
    automations,
    isLoading,
    error,
    totalCount,
    totalPages: Math.ceil(totalCount / limit),
    currentPage: page,
    refresh: fetchRecentAutomations,
    refreshAutomations: fetchRecentAutomations
  };
};

export default useRecentAutomations;
