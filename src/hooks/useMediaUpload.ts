
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';

export type MediaType = 'video' | 'image' | 'carousel';

export interface MediaUploadResult {
  id: string;
  title: string;
  description: string | null;
  mediaType: MediaType;
  storagePath: string;
  originalFilename: string;
  duration?: number;
  size: number;
  thumbnailPath?: string;
  dimensions?: { width: number; height: number };
}

export const useMediaUpload = (clientId: string) => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const uploadMedia = async (
    file: File,
    mediaType: MediaType,
    title: string,
    description?: string
  ): Promise<MediaUploadResult | null> => {
    try {
      setIsUploading(true);
      setProgress(0);

      const userId = (await supabase.auth.getUser()).data.user?.id;

      if (!userId) {
        toast({
          title: 'Erro no upload',
          description: 'Você precisa estar autenticado para fazer upload de mídia.',
          variant: 'destructive',
        });
        return null;
      }

      // Criar caminho no storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `${userId}/${fileName}`;

      // Upload do arquivo para o storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('social_media')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
          onUploadProgress: (progress) => {
            setProgress((progress.loaded / progress.total) * 100);
          },
        });

      if (uploadError) {
        console.error('Erro no upload:', uploadError);
        toast({
          title: 'Erro no upload',
          description: 'Não foi possível fazer upload do arquivo.',
          variant: 'destructive',
        });
        return null;
      }

      // Extrair informações sobre o arquivo
      const size = file.size;
      let dimensions: { width: number; height: number } | undefined;
      let duration: number | undefined;

      // Para imagens e vídeos, obter dimensões
      if (mediaType === 'image' || mediaType === 'video') {
        if (mediaType === 'image') {
          const img = new Image();
          img.src = URL.createObjectURL(file);
          await new Promise((resolve) => {
            img.onload = resolve;
          });
          dimensions = {
            width: img.width,
            height: img.height,
          };
        } else if (mediaType === 'video') {
          const video = document.createElement('video');
          video.preload = 'metadata';
          video.src = URL.createObjectURL(file);
          await new Promise((resolve) => {
            video.onloadedmetadata = resolve;
          });
          dimensions = {
            width: video.videoWidth,
            height: video.videoHeight,
          };
          duration = Math.round(video.duration);
        }
      }

      // Gerar URL pública do arquivo
      const storagePath = uploadData.path;

      // Salvar metadados no banco de dados
      const { data: mediaData, error: mediaError } = await supabase
        .from('social_media')
        .insert({
          user_id: userId,
          client_id: clientId,
          title,
          description,
          media_type: mediaType,
          storage_path: storagePath,
          original_filename: file.name,
          duration,
          size,
          dimensions: dimensions ? dimensions : null,
          thumbnail_path: null, // Será gerado posteriormente
        })
        .select()
        .single();

      if (mediaError) {
        console.error('Erro ao salvar metadados:', mediaError);
        toast({
          title: 'Erro ao salvar',
          description: 'O upload foi feito, mas não foi possível salvar os metadados.',
          variant: 'destructive',
        });
        return null;
      }

      toast({
        title: 'Upload concluído',
        description: 'O arquivo foi enviado com sucesso.',
      });

      return {
        id: mediaData.id,
        title: mediaData.title,
        description: mediaData.description,
        mediaType: mediaData.media_type as MediaType,
        storagePath: mediaData.storage_path,
        originalFilename: mediaData.original_filename || file.name,
        duration: mediaData.duration || undefined,
        size: mediaData.size || file.size,
        thumbnailPath: mediaData.thumbnail_path || undefined,
        dimensions: mediaData.dimensions as any,
      };
    } catch (error) {
      console.error('Erro no processo de upload:', error);
      toast({
        title: 'Erro no upload',
        description: 'Ocorreu um erro inesperado durante o upload.',
        variant: 'destructive',
      });
      return null;
    } finally {
      setIsUploading(false);
      setProgress(0);
    }
  };

  return {
    uploadMedia,
    isUploading,
    progress,
  };
};
