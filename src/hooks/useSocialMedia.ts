
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

export interface SocialMedia {
  id: string;
  title: string;
  description?: string;
  mediaType: string;
  storagePath: string;
  thumbnailPath?: string;
  dimensions?: { width: number; height: number };
  duration?: number;
  size: number;
  createdAt: string;
}

export const useSocialMedia = (clientId?: string) => {
  const { toast } = useToast();
  const [filter, setFilter] = useState({
    mediaType: 'all',
    searchTerm: '',
  });

  const fetchSocialMedia = async (): Promise<SocialMedia[]> => {
    try {
      // Primeiro verifica se o usuário está autenticado
      const { data: userData, error: userError } = await supabase.auth.getUser();
      
      if (userError || !userData.user) {
        throw new Error('Usuário não autenticado');
      }

      // Constrói a consulta base
      let query = supabase
        .from('social_media')
        .select('*')
        .order('created_at', { ascending: false });

      // Aplica filtro de cliente se fornecido
      if (clientId) {
        query = query.eq('client_id', clientId);
      }

      // Aplica filtros adicionais
      if (filter.mediaType !== 'all') {
        query = query.eq('media_type', filter.mediaType);
      }

      if (filter.searchTerm) {
        query = query.or(`title.ilike.%${filter.searchTerm}%,description.ilike.%${filter.searchTerm}%`);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      // Para cada mídia, gera URL de visualização
      const mediaWithUrls = await Promise.all((data || []).map(async (media) => {
        // Gerar URL para visualização da mídia
        const { data: urlData } = await supabase.storage
          .from('social_media')
          .createSignedUrl(media.storage_path, 3600); // URL válida por 1 hora

        // Gerar URL para visualização da thumbnail se existir
        let thumbnailUrl = undefined;
        if (media.thumbnail_path) {
          const { data: thumbData } = await supabase.storage
            .from('social_media')
            .createSignedUrl(media.thumbnail_path, 3600);
          thumbnailUrl = thumbData?.signedUrl;
        }

        return {
          id: media.id,
          title: media.title,
          description: media.description || undefined,
          mediaType: media.media_type,
          storagePath: urlData?.signedUrl || media.storage_path,
          thumbnailPath: thumbnailUrl,
          dimensions: media.dimensions as any,
          duration: media.duration || undefined,
          size: media.size || 0,
          createdAt: media.created_at,
        };
      }));

      return mediaWithUrls;
    } catch (error) {
      console.error('Erro ao buscar mídias:', error);
      toast({
        title: 'Erro ao carregar mídias',
        description: 'Não foi possível buscar as mídias sociais.',
        variant: 'destructive',
      });
      return [];
    }
  };

  const { data: media = [], isLoading, refetch } = useQuery({
    queryKey: ['socialMedia', clientId, filter],
    queryFn: fetchSocialMedia,
    refetchOnWindowFocus: false,
  });

  const deleteSocialMedia = async (id: string) => {
    try {
      // Primeiro busca o registro para obter o caminho do arquivo
      const { data: mediaData, error: fetchError } = await supabase
        .from('social_media')
        .select('storage_path, thumbnail_path')
        .eq('id', id)
        .single();

      if (fetchError) {
        throw fetchError;
      }

      // Deleta o arquivo do storage
      if (mediaData.storage_path) {
        const { error: storageError } = await supabase.storage
          .from('social_media')
          .remove([mediaData.storage_path]);

        if (storageError) {
          console.error('Erro ao remover arquivo do storage:', storageError);
        }
      }

      // Deleta a thumbnail se existir
      if (mediaData.thumbnail_path) {
        const { error: thumbError } = await supabase.storage
          .from('social_media')
          .remove([mediaData.thumbnail_path]);

        if (thumbError) {
          console.error('Erro ao remover thumbnail do storage:', thumbError);
        }
      }

      // Deleta o registro da mídia
      const { error: deleteError } = await supabase
        .from('social_media')
        .delete()
        .eq('id', id);

      if (deleteError) {
        throw deleteError;
      }

      toast({
        title: 'Mídia excluída',
        description: 'A mídia foi excluída com sucesso.',
      });

      // Atualiza a lista após exclusão
      return refetch();
    } catch (error) {
      console.error('Erro ao excluir mídia:', error);
      toast({
        title: 'Erro ao excluir',
        description: 'Não foi possível excluir a mídia.',
        variant: 'destructive',
      });
    }
  };

  return {
    media,
    isLoading,
    refetch,
    filter,
    setFilter,
    deleteSocialMedia,
  };
};
