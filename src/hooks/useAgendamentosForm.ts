
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useMediaUpload } from '@/hooks/useMediaUpload';
import { useSchedulePost } from '@/hooks/useSchedulePost';
import { useScheduledPosts } from '@/hooks/useScheduledPosts';

// Cliente temporário fixo para demonstração
// Em uma aplicação real, isso viria de um contexto ou rota
const DEMO_CLIENT_ID = "00000000-0000-0000-0000-000000000000";

export const useAgendamentosForm = () => {
  // Estados para formulários
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [mediaTitle, setMediaTitle] = useState("");
  const [mediaDescription, setMediaDescription] = useState("");
  const [mediaType, setMediaType] = useState<"video" | "image" | "carousel">("video");
  const [selectedPlatform, setSelectedPlatform] = useState("instagram");
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [postCaption, setPostCaption] = useState("");
  const [postHashtags, setPostHashtags] = useState("");
  
  // Hooks personalizados
  const { toast } = useToast();
  const { uploadMedia, isUploading, progress } = useMediaUpload(DEMO_CLIENT_ID);
  const { schedulePost, isSubmitting } = useSchedulePost();
  const { refetch } = useScheduledPosts(DEMO_CLIENT_ID);
  
  // Função para lidar com o upload e agendamento
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadFile(e.target.files[0]);
    }
  };
  
  const resetForm = () => {
    setUploadFile(null);
    setMediaTitle("");
    setMediaDescription("");
    setScheduledDate("");
    setScheduledTime("");
    setPostCaption("");
    setPostHashtags("");
  };
  
  const handleUploadAndSchedule = async () => {
    if (!uploadFile || !mediaTitle) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, selecione um arquivo e informe um título.",
        variant: "destructive",
      });
      return;
    }
    
    if (!scheduledDate || !scheduledTime) {
      toast({
        title: "Data e hora obrigatórias",
        description: "Por favor, informe a data e hora do agendamento.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // 1. Upload da mídia
      const mediaResult = await uploadMedia(
        uploadFile,
        mediaType,
        mediaTitle,
        mediaDescription || undefined
      );
      
      if (!mediaResult) {
        return;
      }
      
      // 2. Agendamento do post
      const scheduledDateTime = new Date(`${scheduledDate}T${scheduledTime}`);
      
      const hashtagArray = postHashtags
        .split(' ')
        .filter(tag => tag.startsWith('#'))
        .map(tag => tag.substring(1));
      
      const result = await schedulePost({
        mediaId: mediaResult.id,
        clientId: DEMO_CLIENT_ID,
        platform: selectedPlatform,
        scheduledFor: scheduledDateTime,
        caption: postCaption || undefined,
        hashtags: hashtagArray.length > 0 ? hashtagArray : undefined
      });
      
      if (result) {
        // Reset do formulário
        resetForm();
        
        // Atualiza a lista
        refetch();
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("Erro no processo:", error);
      toast({
        title: "Erro no processo",
        description: "Ocorreu um erro ao tentar agendar sua postagem.",
        variant: "destructive",
      });
      return false;
    }
  };
  
  return {
    // Estados do formulário
    uploadFile,
    mediaTitle,
    mediaDescription,
    mediaType,
    selectedPlatform,
    scheduledDate,
    scheduledTime,
    postCaption,
    postHashtags,
    
    // Estados de carregamento
    isUploading,
    isSubmitting,
    progress,
    
    // Funções
    handleFileChange,
    handleUploadAndSchedule,
    
    // Setters
    setMediaTitle,
    setMediaDescription,
    setMediaType,
    setSelectedPlatform,
    setScheduledDate,
    setScheduledTime,
    setPostCaption,
    setPostHashtags,
    resetForm,
  };
};
