
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUserProfile } from './useUserProfile';

export interface ScheduledPost {
  id: string;
  caption: string | null;
  platform: string;
  scheduled_for: string;
  status: string;
  media_id: string;
  client_id: string;
  client_name?: string;
  media_url?: string;
  media_title?: string;
  error_message?: string | null;
}

export interface PostFilters {
  platform: string;
  status: string;
}

export interface ScheduledPostsResult {
  posts: ScheduledPost[];
  isLoading: boolean;
  error: string | null;
  totalCount: number;
}

export const useScheduledPosts = (clientId: string, limit: number = 5, page: number = 1) => {
  const [result, setResult] = useState<ScheduledPostsResult>({
    posts: [],
    isLoading: true,
    error: null,
    totalCount: 0
  });
  
  const { profile } = useUserProfile();
  
  // Função para carregar contas
  const fetchScheduledPosts = useCallback(async () => {
    try {
      setResult(prev => ({ ...prev, isLoading: true, error: null }));
      
      // Determinar se o usuário é admin ou não para filtrar por cliente
      const isAdmin = profile?.is_admin || false;
      let clientFilter: { clientIds?: string[] } = {};
      
      if (!isAdmin && profile) {
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
      
      // Buscar publicações agendadas
      let query = supabase
        .from('scheduled_posts')
        .select('id, caption, platform, scheduled_for, status, media_id, client_id, error_message', { count: 'exact' })
        .order('scheduled_for', { ascending: true })
        .range(offset, offset + limit - 1);
        
      // Aplicar filtro de cliente se necessário
      if (!isAdmin && 'clientIds' in clientFilter && clientFilter.clientIds && clientFilter.clientIds.length > 0) {
        query = query.in('client_id', clientFilter.clientIds);
      } else if (clientId) {
        query = query.eq('client_id', clientId);
      }
      
      const { data: posts, error, count } = await query;
      
      if (error) {
        throw new Error('Erro ao buscar publicações agendadas');
      }
      
      // Buscar nomes dos clientes
      if (posts && posts.length > 0) {
        const clientIds = [...new Set(posts.map(p => p.client_id))];
        
        const { data: clients, error: clientsError } = await supabase
          .from('clients')
          .select('id, name')
          .in('id', clientIds);
          
        if (!clientsError && clients) {
          // Mapear nomes dos clientes para as publicações
          const postsWithClientNames = posts.map(post => {
            const client = clients.find(c => c.id === post.client_id);
            return {
              ...post,
              client_name: client?.name || 'Cliente desconhecido',
              media_title: `Mídia ${post.id.substring(0, 5)}` // Adicionando um título de mídia padrão
            };
          });
          
          setResult({
            posts: postsWithClientNames,
            isLoading: false,
            error: null,
            totalCount: count || 0
          });
        } else {
          setResult({
            posts: posts.map(post => ({
              ...post,
              media_title: `Mídia ${post.id.substring(0, 5)}`
            })),
            isLoading: false,
            error: null,
            totalCount: count || 0
          });
        }
      } else {
        setResult({
          posts: [],
          isLoading: false,
          error: null,
          totalCount: count || 0
        });
      }
      
    } catch (error) {
      console.error('Erro ao buscar publicações agendadas:', error);
      setResult(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      }));
    }
  }, [profile, limit, page, clientId]);
  
  useEffect(() => {
    fetchScheduledPosts();
  }, [fetchScheduledPosts]);
  
  const deleteScheduledPost = async (postId: string) => {
    try {
      const { error } = await supabase
        .from('scheduled_posts')
        .delete()
        .eq('id', postId);
      
      if (error) throw new Error(error.message);
      
      // Atualizar lista após exclusão
      fetchScheduledPosts();
      return { success: true };
    } catch (error) {
      console.error('Erro ao excluir publicação:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erro desconhecido' 
      };
    }
  };
  
  return {
    ...result,
    refreshPosts: fetchScheduledPosts,
    deleteScheduledPost,
    page,
    limit,
    totalPages: Math.ceil(result.totalCount / limit)
  };
};

export default useScheduledPosts;
