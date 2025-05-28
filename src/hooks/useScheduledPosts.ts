
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface ScheduledPost {
  id: string;
  caption: string | null;
  platform: string;
  scheduled_for: string;
  status: string;
  media_id: string;
  client_id: string;
  user_id: string;
  client_name?: string;
  media_url?: string;
  media_title?: string;
  error_message?: string | null;
  hashtags?: string[];
  created_at: string;
  updated_at: string;
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

export const useScheduledPosts = (clientId?: string, limit: number = 10, page: number = 1) => {
  const [result, setResult] = useState<ScheduledPostsResult>({
    posts: [],
    isLoading: true,
    error: null,
    totalCount: 0
  });
  
  const { currentUser } = useAuth();
  
  const fetchScheduledPosts = useCallback(async () => {
    if (!currentUser) {
      setResult(prev => ({ ...prev, isLoading: false }));
      return;
    }

    try {
      setResult(prev => ({ ...prev, isLoading: true, error: null }));
      
      const offset = (page - 1) * limit;
      
      let query = supabase
        .from('scheduled_posts')
        .select(`
          *,
          clients!inner(name)
        `, { count: 'exact' })
        .eq('user_id', currentUser.id)
        .order('scheduled_for', { ascending: true })
        .range(offset, offset + limit - 1);
        
      if (clientId) {
        query = query.eq('client_id', clientId);
      }
      
      const { data: posts, error, count } = await query;
      
      if (error) {
        throw new Error('Erro ao buscar publicações agendadas: ' + error.message);
      }
      
      const postsWithClientNames = posts?.map(post => ({
        ...post,
        client_name: (post as any).clients?.name || 'Cliente desconhecido',
        media_title: `Mídia ${post.id.substring(0, 8)}`,
        hashtags: post.hashtags || []
      })) || [];
      
      setResult({
        posts: postsWithClientNames,
        isLoading: false,
        error: null,
        totalCount: count || 0
      });
      
    } catch (error) {
      console.error('Erro ao buscar publicações agendadas:', error);
      setResult(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      }));
    }
  }, [currentUser, limit, page, clientId]);
  
  useEffect(() => {
    fetchScheduledPosts();
  }, [fetchScheduledPosts]);
  
  const deleteScheduledPost = async (postId: string) => {
    try {
      const { error } = await supabase
        .from('scheduled_posts')
        .delete()
        .eq('id', postId)
        .eq('user_id', currentUser?.id);
      
      if (error) throw new Error(error.message);
      
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

  const createScheduledPost = async (postData: {
    platform: string;
    caption: string;
    scheduled_for: string;
    hashtags?: string[];
    client_id?: string;
  }) => {
    try {
      if (!currentUser) {
        throw new Error('Usuário não autenticado');
      }

      const { data, error } = await supabase
        .from('scheduled_posts')
        .insert({
          user_id: currentUser.id,
          client_id: postData.client_id || currentUser.id,
          platform: postData.platform,
          caption: postData.caption,
          scheduled_for: postData.scheduled_for,
          hashtags: postData.hashtags || [],
          media_id: crypto.randomUUID(), // Temporário até implementar upload de mídia
          status: 'pending'
        })
        .select()
        .single();

      if (error) throw new Error(error.message);
      
      fetchScheduledPosts();
      return { success: true, data };
    } catch (error) {
      console.error('Erro ao criar publicação:', error);
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
    createScheduledPost,
    page,
    limit,
    totalPages: Math.ceil(result.totalCount / limit)
  };
};

export default useScheduledPosts;
