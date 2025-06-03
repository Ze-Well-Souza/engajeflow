import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

// Types
export interface Automation {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  trigger_type: 'schedule' | 'event' | 'webhook' | 'manual' | 'ai_suggestion';
  trigger_config: any;
  conditions?: any;
  actions: any[];
  is_active?: boolean;
  max_executions?: number;
  execution_count?: number;
  cron_expression?: string;
  timezone?: string;
  next_execution_at?: string;
  last_execution_at?: string;
  status?: 'active' | 'paused' | 'error' | 'completed';
  error_message?: string;
  created_at: string;
  updated_at: string;
}

export interface AutomationExecution {
  id: string;
  automation_id: string;
  triggered_by: string;
  trigger_data?: any;
  status: 'running' | 'completed' | 'failed' | 'cancelled';
  result?: any;
  error_message?: string;
  started_at: string;
  completed_at?: string;
  duration_ms?: number;
}

export interface CreateAutomationData {
  name: string;
  description?: string;
  trigger_type: Automation['trigger_type'];
  trigger_config: any;
  conditions?: any;
  actions: any[];
  is_active?: boolean;
  max_executions?: number;
  cron_expression?: string;
  timezone?: string;
}

export interface AutomationFilters {
  status?: Automation['status'];
  trigger_type?: Automation['trigger_type'];
  is_active?: boolean;
  search?: string;
}

export const useAutomations = () => {
  const { user } = useAuth();
  const [automations, setAutomations] = useState<Automation[]>([]);
  const [executions, setExecutions] = useState<AutomationExecution[]>([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Fetch automations
  const fetchAutomations = async (filters?: AutomationFilters) => {
    if (!user?.id) return;

    setLoading(true);
    try {
      let query = supabase
        .from('automations')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      // Apply filters
      if (filters?.status) {
        query = query.eq('status', filters.status);
      }
      if (filters?.trigger_type) {
        query = query.eq('trigger_type', filters.trigger_type);
      }
      if (filters?.is_active !== undefined) {
        query = query.eq('is_active', filters.is_active);
      }
      if (filters?.search) {
        query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
      }

      const { data, error } = await query;

      if (error) throw error;

      setAutomations(data || []);
    } catch (error: any) {
      console.error('Error fetching automations:', error);
      toast.error(`Erro ao carregar automações: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Fetch automation executions
  const fetchExecutions = async (automationId?: string) => {
    if (!user?.id) return;

    try {
      let query = supabase
        .from('automation_executions')
        .select(`
          *,
          automations!automation_executions_automation_id_fkey(name, trigger_type)
        `)
        .order('started_at', { ascending: false })
        .limit(50);

      if (automationId) {
        query = query.eq('automation_id', automationId);
      }

      const { data, error } = await query;

      if (error) throw error;

      setExecutions(data || []);
    } catch (error: any) {
      console.error('Error fetching executions:', error);
      toast.error(`Erro ao carregar execuções: ${error.message}`);
    }
  };

  // Create automation
  const createAutomation = async (data: CreateAutomationData): Promise<Automation | null> => {
    if (!user?.id) return null;

    setCreating(true);
    try {
      const automation = {
        user_id: user.id,
        ...data,
        timezone: data.timezone || 'America/Sao_Paulo',
        is_active: data.is_active ?? true,
      };

      const { data: createdAutomation, error } = await supabase
        .from('automations')
        .insert([automation])
        .select()
        .single();

      if (error) throw error;

      setAutomations(prev => [createdAutomation, ...prev]);
      toast.success('Automação criada com sucesso!');

      return createdAutomation;
    } catch (error: any) {
      console.error('Error creating automation:', error);
      toast.error(`Erro ao criar automação: ${error.message}`);
      return null;
    } finally {
      setCreating(false);
    }
  };

  // Update automation
  const updateAutomation = async (id: string, updates: Partial<CreateAutomationData>): Promise<boolean> => {
    setUpdating(true);
    try {
      const { data, error } = await supabase
        .from('automations')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user?.id)
        .select()
        .single();

      if (error) throw error;

      setAutomations(prev => 
        prev.map(automation => 
          automation.id === id ? { ...automation, ...data } : automation
        )
      );

      toast.success('Automação atualizada com sucesso!');
      return true;
    } catch (error: any) {
      console.error('Error updating automation:', error);
      toast.error(`Erro ao atualizar automação: ${error.message}`);
      return false;
    } finally {
      setUpdating(false);
    }
  };

  // Toggle automation status
  const toggleAutomation = async (id: string, is_active: boolean): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('automations')
        .update({ is_active, status: is_active ? 'active' : 'paused' })
        .eq('id', id)
        .eq('user_id', user?.id);

      if (error) throw error;

      setAutomations(prev => 
        prev.map(automation => 
          automation.id === id 
            ? { ...automation, is_active, status: is_active ? 'active' : 'paused' }
            : automation
        )
      );

      toast.success(`Automação ${is_active ? 'ativada' : 'pausada'} com sucesso!`);
      return true;
    } catch (error: any) {
      console.error('Error toggling automation:', error);
      toast.error(`Erro ao ${is_active ? 'ativar' : 'pausar'} automação: ${error.message}`);
      return false;
    }
  };

  // Delete automation
  const deleteAutomation = async (id: string): Promise<boolean> => {
    setDeleting(true);
    try {
      const { error } = await supabase
        .from('automations')
        .delete()
        .eq('id', id)
        .eq('user_id', user?.id);

      if (error) throw error;

      setAutomations(prev => prev.filter(automation => automation.id !== id));
      toast.success('Automação excluída com sucesso!');
      return true;
    } catch (error: any) {
      console.error('Error deleting automation:', error);
      toast.error(`Erro ao excluir automação: ${error.message}`);
      return false;
    } finally {
      setDeleting(false);
    }
  };

  // Execute automation manually
  const executeAutomation = async (id: string, triggerData?: any): Promise<boolean> => {
    try {
      // Create execution record
      const execution = {
        automation_id: id,
        triggered_by: 'manual',
        trigger_data: triggerData || {},
        status: 'running' as const,
      };

      const { data: executionRecord, error: executionError } = await supabase
        .from('automation_executions')
        .insert([execution])
        .select()
        .single();

      if (executionError) throw executionError;

      // Update automation execution count
      const { error: updateError } = await supabase.rpc('increment_automation_execution', {
        automation_id: id
      });

      if (updateError) {
        console.warn('Warning: Could not increment execution count:', updateError);
      }

      // TODO: Here you would integrate with your automation engine
      // For now, we'll just mark as completed
      setTimeout(async () => {
        await supabase
          .from('automation_executions')
          .update({ 
            status: 'completed',
            completed_at: new Date().toISOString(),
            duration_ms: 1000,
            result: { message: 'Automation executed successfully' }
          })
          .eq('id', executionRecord.id);
      }, 2000);

      setExecutions(prev => [executionRecord, ...prev]);
      toast.success('Automação executada com sucesso!');
      return true;
    } catch (error: any) {
      console.error('Error executing automation:', error);
      toast.error(`Erro ao executar automação: ${error.message}`);
      return false;
    }
  };

  // Duplicate automation
  const duplicateAutomation = async (id: string): Promise<Automation | null> => {
    try {
      const original = automations.find(a => a.id === id);
      if (!original) throw new Error('Automação não encontrada');

      const duplicate = {
        name: `${original.name} (Cópia)`,
        description: original.description,
        trigger_type: original.trigger_type,
        trigger_config: original.trigger_config,
        conditions: original.conditions,
        actions: original.actions,
        is_active: false, // Start inactive
        max_executions: original.max_executions,
        cron_expression: original.cron_expression,
        timezone: original.timezone,
      };

      return await createAutomation(duplicate);
    } catch (error: any) {
      console.error('Error duplicating automation:', error);
      toast.error(`Erro ao duplicar automação: ${error.message}`);
      return null;
    }
  };

  // Get automation stats
  const getAutomationStats = () => {
    const total = automations.length;
    const active = automations.filter(a => a.is_active).length;
    const paused = automations.filter(a => !a.is_active).length;
    const withErrors = automations.filter(a => a.status === 'error').length;

    const recentExecutions = executions.slice(0, 10);
    const successRate = executions.length > 0 
      ? (executions.filter(e => e.status === 'completed').length / executions.length) * 100
      : 0;

    return {
      total,
      active,
      paused,
      withErrors,
      recentExecutions,
      successRate: Math.round(successRate),
    };
  };

  // Load automations on mount
  useEffect(() => {
    fetchAutomations();
    fetchExecutions();
  }, [user?.id]);

  return {
    // Data
    automations,
    executions,
    
    // Loading states
    loading,
    creating,
    updating,
    deleting,
    
    // Methods
    fetchAutomations,
    fetchExecutions,
    createAutomation,
    updateAutomation,
    toggleAutomation,
    deleteAutomation,
    executeAutomation,
    duplicateAutomation,
    
    // Utils
    getAutomationStats,
  };
}; 