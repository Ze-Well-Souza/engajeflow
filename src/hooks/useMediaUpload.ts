
import { useState } from 'react';
import { toast } from 'sonner';

interface MediaUploadResult {
  id: string;
  type: 'image' | 'video' | 'carousel';
  title: string;
  description?: string;
  url: string;
}

export const useMediaUpload = (clientId: string) => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const uploadMedia = async (
    file: File,
    type: 'image' | 'video' | 'carousel',
    title: string,
    description?: string
  ): Promise<MediaUploadResult | null> => {
    setIsUploading(true);
    setProgress(0);
    
    try {
      // Simulação de upload de arquivo
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 300));
        setProgress(i);
      }
      
      // Gerar um ID fictício para a mídia
      const mediaId = `media-${Date.now()}`;
      
      // Em uma implementação real, aqui retornaria a resposta da API
      const result: MediaUploadResult = {
        id: mediaId,
        type,
        title,
        description,
        url: URL.createObjectURL(file)
      };
      
      toast.success("Mídia enviada com sucesso!");
      return result;
      
    } catch (error) {
      console.error("Erro ao fazer upload da mídia:", error);
      toast.error("Falha ao enviar o arquivo");
      return null;
    } finally {
      setIsUploading(false);
    }
  };
  
  return {
    uploadMedia,
    isUploading,
    progress
  };
};
