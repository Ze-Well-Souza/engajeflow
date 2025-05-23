
import { useState, useCallback } from 'react';
import { useScheduledPosts } from './useScheduledPosts';
import { toast } from 'sonner';

export interface AgendamentoFormData {
  title: string;
  description: string;
  date: string;
  time: string;
  platform: string;
  media?: File | null;
}

export const useAgendamentosForm = (clientId: string = '') => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { refreshPosts } = useScheduledPosts(clientId, 10, 1);

  const [formData, setFormData] = useState<AgendamentoFormData>({
    title: '',
    description: '',
    date: '',
    time: '',
    platform: '',
    media: null
  });

  const updateFormData = useCallback((field: keyof AgendamentoFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      platform: '',
      media: null
    });
  }, []);

  const submitForm = useCallback(async (data: AgendamentoFormData) => {
    setIsSubmitting(true);
    try {
      // Simular envio de dados
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Publicação agendada com sucesso!');
      resetForm();
      
      // Atualizar lista de posts
      await refreshPosts();
      
      return { success: true };
    } catch (error) {
      console.error('Erro ao agendar publicação:', error);
      toast.error('Erro ao agendar publicação');
      return { success: false, error: 'Falha no agendamento' };
    } finally {
      setIsSubmitting(false);
    }
  }, [refreshPosts, resetForm]);

  return {
    formData,
    updateFormData,
    resetForm,
    submitForm,
    isSubmitting,
    refetch: refreshPosts // Alias para compatibilidade
  };
};

export default useAgendamentosForm;
