
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface SchedulePostParams {
  mediaId: string;
  clientId: string;
  platform: string;
  scheduledFor: Date;
  caption?: string;
  hashtags?: string[];
}

export const useSchedulePost = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const schedulePost = async (params: SchedulePostParams) => {
    try {
      setIsSubmitting(true);

      const userId = (await supabase.auth.getUser()).data.user?.id;

      if (!userId) {
        toast({
          title: 'Erro no agendamento',
          description: 'Você precisa estar autenticado para agendar postagens.',
          variant: 'destructive',
        });
        return null;
      }

      const { data, error } = await supabase
        .from('scheduled_posts')
        .insert({
          user_id: userId,
          client_id: params.clientId,
          media_id: params.mediaId,
          platform: params.platform,
          scheduled_for: params.scheduledFor.toISOString(),
          caption: params.caption,
          hashtags: params.hashtags,
          status: 'pending',
        })
        .select()
        .single();

      if (error) {
        console.error('Erro ao agendar post:', error);
        toast({
          title: 'Erro no agendamento',
          description: 'Não foi possível agendar a postagem.',
          variant: 'destructive',
        });
        return null;
      }

      toast({
        title: 'Post agendado com sucesso',
        description: `A postagem foi agendada para ${params.scheduledFor.toLocaleDateString()} às ${params.scheduledFor.toLocaleTimeString()}.`,
      });

      return data;
    } catch (error) {
      console.error('Erro no processo de agendamento:', error);
      toast({
        title: 'Erro no agendamento',
        description: 'Ocorreu um erro inesperado durante o agendamento.',
        variant: 'destructive',
      });
      return null;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    schedulePost,
    isSubmitting,
  };
};
