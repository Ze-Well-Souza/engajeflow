import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

// Types
export interface Post {
  id: string;
  user_id: string;
  title?: string;
  content: string;
  content_type: 'text' | 'image' | 'video' | 'carousel' | 'story' | 'reel';
  media_urls?: string[];
  media_metadata?: any;
  thumbnail_url?: string;
  platforms: string[];
  target_accounts?: string[];
  scheduled_for?: string;
  timezone?: string;
  status: 'draft' | 'scheduled' | 'publishing' | 'published' | 'failed' | 'cancelled';
  published_at?: string;
  failed_at?: string;
  failure_reason?: string;
  ai_generated?: boolean;
  ai_metadata?: any;
  hashtags?: string[];
  mentions?: string[];
  engagement_metrics?: any;
  metadata?: any;
  created_at: string;
  updated_at: string;
}

export interface CreatePostData {
  title?: string;
  content: string;
  content_type?: Post['content_type'];
  media_urls?: string[];
  platforms: string[];
  scheduled_for?: string;
  hashtags?: string[];
  mentions?: string[];
  ai_generated?: boolean;
}

export interface PostMetrics {
  id: string;
  post_id: string;
  platform: string;
  likes_count: number;
  comments_count: number;
  shares_count: number;
  saves_count: number;
  views_count: number;
  reach: number;
  impressions: number;
  engagement_rate?: number;
  collected_at: string;
  metric_date: string;
}

export const usePosts = () => {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch posts for current user
  const fetchPosts = async (filters?: {
    status?: Post['status'];
    platforms?: string[];
    dateRange?: { start: string; end: string };
    limit?: number;
  }) => {
    if (!currentUser?.id) return;

    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('posts')
        .select('*')
        .eq('user_id', currentUser.id)
        .order('created_at', { ascending: false });

      // Apply filters
      if (filters?.status) {
        query = query.eq('status', filters.status);
      }

      if (filters?.platforms && filters.platforms.length > 0) {
        query = query.overlaps('platforms', filters.platforms);
      }

      if (filters?.dateRange) {
        query = query
          .gte('created_at', filters.dateRange.start)
          .lte('created_at', filters.dateRange.end);
      }

      if (filters?.limit) {
        query = query.limit(filters.limit);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      setPosts(data || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar posts';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Create new post
  const createPost = async (postData: CreatePostData): Promise<Post | null> => {
    if (!currentUser?.id) {
      toast.error('Usuário não autenticado');
      return null;
    }

    try {
      setLoading(true);
      setError(null);

      const newPost = {
        user_id: currentUser.id,
        title: postData.title,
        content: postData.content,
        content_type: postData.content_type || 'text',
        media_urls: postData.media_urls,
        platforms: postData.platforms,
        scheduled_for: postData.scheduled_for,
        hashtags: postData.hashtags,
        mentions: postData.mentions,
        ai_generated: postData.ai_generated || false,
        status: postData.scheduled_for ? 'scheduled' : 'draft',
        timezone: 'America/Sao_Paulo'
      };

      const { data, error } = await supabase
        .from('posts')
        .insert([newPost])
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Update local state
      setPosts(prev => [data, ...prev]);
      
      toast.success(
        postData.scheduled_for 
          ? 'Post agendado com sucesso!' 
          : 'Rascunho salvo com sucesso!'
      );

      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar post';
      setError(errorMessage);
      toast.error(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Update existing post
  const updatePost = async (postId: string, updates: Partial<CreatePostData>): Promise<Post | null> => {
    if (!currentUser?.id) {
      toast.error('Usuário não autenticado');
      return null;
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('posts')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', postId)
        .eq('user_id', currentUser.id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Update local state
      setPosts(prev => prev.map(post => 
        post.id === postId ? data : post
      ));

      toast.success('Post atualizado com sucesso!');
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar post';
      setError(errorMessage);
      toast.error(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Delete post
  const deletePost = async (postId: string): Promise<boolean> => {
    if (!currentUser?.id) {
      toast.error('Usuário não autenticado');
      return false;
    }

    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId)
        .eq('user_id', currentUser.id);

      if (error) {
        throw error;
      }

      // Update local state
      setPosts(prev => prev.filter(post => post.id !== postId));
      
      toast.success('Post excluído com sucesso!');
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao excluir post';
      setError(errorMessage);
      toast.error(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Duplicate post
  const duplicatePost = async (postId: string): Promise<Post | null> => {
    const originalPost = posts.find(p => p.id === postId);
    if (!originalPost) {
      toast.error('Post não encontrado');
      return null;
    }

    const duplicateData: CreatePostData = {
      title: `${originalPost.title || 'Post'} (Cópia)`,
      content: originalPost.content,
      content_type: originalPost.content_type,
      media_urls: originalPost.media_urls,
      platforms: originalPost.platforms,
      hashtags: originalPost.hashtags,
      mentions: originalPost.mentions,
      ai_generated: originalPost.ai_generated
    };

    return await createPost(duplicateData);
  };

  // Schedule post for immediate publishing
  const publishNow = async (postId: string): Promise<boolean> => {
    const updated = await updatePost(postId, {
      scheduled_for: new Date().toISOString()
    });
    return updated !== null;
  };

  // Cancel scheduled post
  const cancelScheduled = async (postId: string): Promise<boolean> => {
    const updated = await updatePost(postId, {
      scheduled_for: undefined
    });
    return updated !== null;
  };

  // Get post metrics
  const getPostMetrics = async (postId: string): Promise<PostMetrics[]> => {
    try {
      const { data, error } = await supabase
        .from('post_metrics')
        .select('*')
        .eq('post_id', postId)
        .order('collected_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data || [];
    } catch (err) {
      console.error('Erro ao carregar métricas:', err);
      return [];
    }
  };

  // Get scheduled posts for next 24 hours
  const getUpcomingScheduled = async (): Promise<Post[]> => {
    if (!currentUser?.id) return [];

    try {
      const now = new Date();
      const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('user_id', currentUser.id)
        .eq('status', 'scheduled')
        .gte('scheduled_for', now.toISOString())
        .lte('scheduled_for', tomorrow.toISOString())
        .order('scheduled_for', { ascending: true });

      if (error) {
        throw error;
      }

      return data || [];
    } catch (err) {
      console.error('Erro ao carregar posts agendados:', err);
      return [];
    }
  };

  // Get posts statistics
  const getPostsStats = async () => {
    if (!currentUser?.id) return null;

    try {
      const { data, error } = await supabase
        .from('posts')
        .select('status, platforms, created_at')
        .eq('user_id', currentUser.id);

      if (error) {
        throw error;
      }

      const stats = {
        total: data.length,
        drafts: data.filter(p => p.status === 'draft').length,
        scheduled: data.filter(p => p.status === 'scheduled').length,
        published: data.filter(p => p.status === 'published').length,
        failed: data.filter(p => p.status === 'failed').length,
        byPlatform: {} as Record<string, number>
      };

      // Count by platform
      data.forEach(post => {
        post.platforms?.forEach(platform => {
          stats.byPlatform[platform] = (stats.byPlatform[platform] || 0) + 1;
        });
      });

      return stats;
    } catch (err) {
      console.error('Erro ao carregar estatísticas:', err);
      return null;
    }
  };

  // Auto-fetch posts when user changes
  useEffect(() => {
    if (currentUser?.id) {
      fetchPosts();
    }
  }, [currentUser?.id]);

  return {
    // State
    posts,
    loading,
    error,

    // Actions
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
    duplicatePost,
    publishNow,
    cancelScheduled,

    // Metrics and analytics
    getPostMetrics,
    getUpcomingScheduled,
    getPostsStats,

    // Computed values
    drafts: posts.filter(p => p.status === 'draft'),
    scheduled: posts.filter(p => p.status === 'scheduled'),
    published: posts.filter(p => p.status === 'published'),
    failed: posts.filter(p => p.status === 'failed')
  };
}; 