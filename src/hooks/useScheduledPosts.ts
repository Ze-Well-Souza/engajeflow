
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface ScheduledPost {
  id: string;
  mediaId: string;
  platform: string;
  scheduledFor: string;
  caption?: string;
  hashtags?: string[];
  status: 'pending' | 'processing' | 'posted' | 'failed';
  errorMessage?: string;
  postUrl?: string;
  createdAt: string;
  updatedAt: string;
  mediaTitle?: string;
  mediaType?: string;
  thumbnailPath?: string;
}

export interface PostFilters {
  platform: string;
  status: string;
}

export const useScheduledPosts = (clientId?: string) => {
  const { toast } = useToast();
  const [filter, setFilter] = useState<PostFilters>({
    platform: 'all',
    status: 'all',
  });

  const fetchScheduledPosts = async (): Promise<ScheduledPost[]> => {
    try {
      // Primeiro verifica se o usuário está autenticado
      const { data: userData, error: userError } = await supabase.auth.getUser();
      
      if (userError || !userData.user) {
        throw new Error('Usuário não autenticado');
      }

      // Constrói a consulta base
      let query = supabase
        .from('scheduled_posts')
        .select(`
          *,
          social_media(id, title, media_type, thumbnail_path)
        `)
        .order('scheduled_for', { ascending: true });

      // Aplica filtro de cliente se fornecido
      if (clientId) {
        query = query.eq('client_id', clientId);
      }

      // Aplica filtros adicionais
      if (filter.platform !== 'all') {
        query = query.eq('platform', filter.platform);
      }

      if (filter.status !== 'all') {
        query = query.eq('status', filter.status);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      // Transforma os dados para o formato esperado
      return (data || []).map(post => ({
        id: post.id,
        mediaId: post.media_id,
        platform: post.platform,
        scheduledFor: post.scheduled_for,
        caption: post.caption || undefined,
        hashtags: post.hashtags || undefined,
        status: post.status as 'pending' | 'processing' | 'posted' | 'failed',
        errorMessage: post.error_message || undefined,
        postUrl: post.post_url || undefined,
        createdAt: post.created_at,
        updatedAt: post.updated_at,
        mediaTitle: post.social_media?.title,
        mediaType: post.social_media?.media_type,
        thumbnailPath: post.social_media?.thumbnail_path,
      }));
    } catch (error) {
      console.error('Erro ao buscar agendamentos:', error);
      toast({
        title: 'Erro ao carregar agendamentos',
        description: 'Não foi possível buscar os agendamentos de postagens.',
        variant: 'destructive',
      });
      return [];
    }
  };

  const { data: posts = [], isLoading, refetch } = useQuery({
    queryKey: ['scheduledPosts', clientId, filter],
    queryFn: fetchScheduledPosts,
    refetchOnWindowFocus: false,
  });

  const deleteScheduledPost = async (id: string): Promise<void> => {
    try {
      const { error } = await supabase
        .from('scheduled_posts')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      toast({
        title: 'Agendamento excluído',
        description: 'O agendamento foi excluído com sucesso.',
      });

      // Atualiza a lista após exclusão
      await refetch();
    } catch (error) {
      console.error('Erro ao excluir agendamento:', error);
      toast({
        title: 'Erro ao excluir',
        description: 'Não foi possível excluir o agendamento.',
        variant: 'destructive',
      });
    }
  };

  return {
    posts,
    isLoading,
    refetch,
    filter,
    setFilter,
    deleteScheduledPost,
  };
};
