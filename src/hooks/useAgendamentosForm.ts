
import { useState, useCallback } from 'react';
import { useScheduledPosts } from './useScheduledPosts';
import { useMediaUpload } from './useMediaUpload';
import { useSchedulePost } from './useSchedulePost';
import { toast } from 'sonner';

export interface AgendamentoFormData {
  title: string;
  description: string;
  date: string;
  time: string;
  platform: string;
  media?: File | null;
}

export const useAgendamentosForm = (clientId: string = '') => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [mediaTitle, setMediaTitle] = useState('');
  const [mediaDescription, setMediaDescription] = useState('');
  const [mediaType, setMediaType] = useState<'video' | 'image' | 'carousel'>('image');
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [postCaption, setPostCaption] = useState('');
  const [postHashtags, setPostHashtags] = useState('');
  
  const { refreshPosts } = useScheduledPosts(clientId, 10, 1);
  const { uploadMedia, isUploading, progress } = useMediaUpload(clientId);
  const { schedulePost } = useSchedulePost();

  const [formData, setFormData] = useState<AgendamentoFormData>({
    title: '',
    description: '',
    date: '',
    time: '',
    platform: '',
    media: null
  });

  const updateFormData = useCallback((field: keyof AgendamentoFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      platform: '',
      media: null
    });
    setUploadFile(null);
    setMediaTitle('');
    setMediaDescription('');
    setMediaType('image');
    setSelectedPlatform('');
    setScheduledDate('');
    setScheduledTime('');
    setPostCaption('');
    setPostHashtags('');
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadFile(file);
    }
  }, []);

  const handleUploadAndSchedule = useCallback(async (): Promise<boolean> => {
    if (!uploadFile || !selectedPlatform || !scheduledDate || !scheduledTime) {
      toast.error('Preencha todos os campos obrigatórios');
      return false;
    }

    setIsSubmitting(true);
    try {
      // Upload da mídia
      const uploadResult = await uploadMedia(uploadFile, mediaType, mediaTitle, mediaDescription);
      
      if (!uploadResult) {
        return false;
      }

      // Agendar publicação
      const scheduledFor = new Date(`${scheduledDate}T${scheduledTime}`);
      const hashtags = postHashtags.split(' ').filter(tag => tag.trim());
      
      const scheduleResult = await schedulePost({
        mediaId: uploadResult.id,
        clientId: clientId || 'demo-client',
        platform: selectedPlatform,
        scheduledFor,
        caption: postCaption,
        hashtags
      });

      if (scheduleResult) {
        resetForm();
        await refreshPosts();
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Erro ao processar agendamento:', error);
      toast.error('Erro ao processar agendamento');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [uploadFile, selectedPlatform, scheduledDate, scheduledTime, mediaType, mediaTitle, mediaDescription, postCaption, postHashtags, uploadMedia, schedulePost, clientId, resetForm, refreshPosts]);

  const submitForm = useCallback(async (data: AgendamentoFormData) => {
    setIsSubmitting(true);
    try {
      // Simular envio de dados
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Publicação agendada com sucesso!');
      resetForm();
      
      // Atualizar lista de posts
      await refreshPosts();
      
      return { success: true };
    } catch (error) {
      console.error('Erro ao agendar publicação:', error);
      toast.error('Erro ao agendar publicação');
      return { success: false, error: 'Falha no agendamento' };
    } finally {
      setIsSubmitting(false);
    }
  }, [refreshPosts, resetForm]);

  return {
    formData,
    updateFormData,
    resetForm,
    submitForm,
    isSubmitting,
    refetch: refreshPosts,
    // Propriedades específicas para upload e agendamento
    uploadFile,
    mediaTitle,
    mediaDescription,
    mediaType,
    selectedPlatform,
    scheduledDate,
    scheduledTime,
    postCaption,
    postHashtags,
    isUploading,
    progress,
    handleFileChange,
    handleUploadAndSchedule,
    setMediaTitle,
    setMediaDescription,
    setMediaType,
    setSelectedPlatform,
    setScheduledDate,
    setScheduledTime,
    setPostCaption,
    setPostHashtags,
  };
};

export default useAgendamentosForm;
