import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUserProfile } from './useUserProfile';

export interface RecentAutomation {
  id: string;
  task_type: string;
  status: string;
  scheduled_for: string | null;
  executed_at: string | null;
  created_at: string;
  client_id: string;
  client_name?: string;
  error_message?: string | null;
}

export interface RecentAutomationsResult {
  automations: RecentAutomation[];
  isLoading: boolean;
  error: string | null;
  totalCount: number;
}

export const useRecentAutomations = (limit = 5, page = 1) => {
  const [result, setResult] = useState<RecentAutomationsResult>({
    automations: [],
    isLoading: true,
    error: null,
    totalCount: 0
  });
  
  const { profile } = useUserProfile();
  
  const fetchRecentAutomations = async () => {
    if (!profile) return;
    
    try {
      setResult(prev => ({ ...prev, isLoading: true, error: null }));
      
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
      
      // Calcular offset para paginação
      const offset = (page - 1) * limit;
      
      // Buscar automações recentes
      const query = supabase
        .from('automation_tasks')
        .select('id, task_type, status, scheduled_for, executed_at, created_at, client_id, error_message', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);
        
      // Aplicar filtro de cliente se necessário
      if (!isAdmin && 'clientIds' in clientFilter) {
        query.in('client_id', clientFilter.clientIds);
      }
      
      const { data: automations, error, count } = await query;
      
      if (error) {
        throw new Error('Erro ao buscar automações recentes');
      }
      
      // Buscar nomes dos clientes
      if (automations && automations.length > 0) {
        const clientIds = [...new Set(automations.map(a => a.client_id))];
        
        const { data: clients, error: clientsError } = await supabase
          .from('clients')
          .select('id, name')
          .in('id', clientIds);
          
        if (!clientsError && clients) {
          // Mapear nomes dos clientes para as automações
          const automationsWithClientNames = automations.map(automation => {
            const client = clients.find(c => c.id === automation.client_id);
            return {
              ...automation,
              client_name: client?.name || 'Cliente desconhecido'
            };
          });
          
          setResult({
            automations: automationsWithClientNames,
            isLoading: false,
            error: null,
            totalCount: count || 0
          });
        } else {
          setResult({
            automations: automations,
            isLoading: false,
            error: null,
            totalCount: count || 0
          });
        }
      } else {
        setResult({
          automations: [],
          isLoading: false,
          error: null,
          totalCount: count || 0
        });
      }
      
    } catch (error) {
      console.error('Erro ao buscar automações recentes:', error);
      setResult(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      }));
    }
  };
  
  useEffect(() => {
    fetchRecentAutomations();
  }, [profile, limit, page]);
  
  const refreshAutomations = () => {
    fetchRecentAutomations();
  };
  
  return {
    ...result,
    refreshAutomations,
    page,
    limit,
    totalPages: Math.ceil(result.totalCount / limit)
  };
};

export default useRecentAutomations;
