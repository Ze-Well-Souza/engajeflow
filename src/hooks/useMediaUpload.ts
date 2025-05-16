
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface UploadMediaResult {
  id: string;
  title: string;
  storagePath: string;
  thumbnailPath?: string;
  mediaType: string;
}

export const useMediaUpload = (clientId: string) => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const uploadMedia = async (
    file: File,
    mediaType: 'video' | 'image' | 'carousel',
    title: string,
    description?: string
  ): Promise<UploadMediaResult | null> => {
    if (!file) {
      toast({
        title: 'Erro no upload',
        description: 'Nenhum arquivo selecionado.',
        variant: 'destructive',
      });
      return null;
    }

    try {
      setIsUploading(true);
      setProgress(0);

      // Primeiro verifica se o usuário está autenticado
      const { data: userData, error: userError } = await supabase.auth.getUser();
      
      if (userError || !userData.user) {
        throw new Error('Usuário não autenticado');
      }

      const userId = userData.user.id;
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}/${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload do arquivo
      const { error: uploadError, data } = await supabase.storage
        .from('social_media')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
          // Removendo a opção onUploadProgress que não existe no tipo FileOptions
        });

      if (uploadError) {
        throw uploadError;
      }

      // Criar entrada no banco de dados
      const { data: mediaData, error: mediaError } = await supabase
        .from('social_media')
        .insert({
          user_id: userId,
          client_id: clientId,
          title: title,
          description: description || null,
          media_type: mediaType,
          storage_path: filePath,
          original_filename: file.name,
          size: file.size,
          // Adicione dimensões para imagens ou duração para vídeos se necessário
        })
        .select()
        .single();

      if (mediaError) {
        throw mediaError;
      }

      toast({
        title: 'Upload concluído',
        description: 'Arquivo enviado com sucesso.',
      });

      return {
        id: mediaData.id,
        title: mediaData.title,
        storagePath: filePath,
        thumbnailPath: mediaData.thumbnail_path || undefined,
        mediaType: mediaData.media_type,
      };
    } catch (error) {
      console.error('Erro no upload:', error);
      toast({
        title: 'Erro no upload',
        description: 'Não foi possível enviar o arquivo.',
        variant: 'destructive',
      });
      return null;
    } finally {
      setIsUploading(false);
      setProgress(100); // Considerando upload concluído
    }
  };

  return {
    uploadMedia,
    isUploading,
    progress,
  };
};
