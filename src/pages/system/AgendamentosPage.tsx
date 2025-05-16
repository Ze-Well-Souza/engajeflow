
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useMediaUpload } from "@/hooks/useMediaUpload";
import { useSchedulePost } from "@/hooks/useSchedulePost";
import { useScheduledPosts, PostFilters } from "@/hooks/useScheduledPosts";

// Componentes refatorados
import AgendamentosHeader from "@/components/agendamentos/AgendamentosHeader";
import StatCards from "@/components/agendamentos/StatCards";
import AgendamentosLista from "@/components/agendamentos/AgendamentosLista";
import MediaUploadForm from "@/components/agendamentos/MediaUploadForm";
import ScheduleForm from "@/components/agendamentos/ScheduleForm";

// Cliente temporário fixo para demonstração
// Em uma aplicação real, isso viria de um contexto ou rota
const DEMO_CLIENT_ID = "00000000-0000-0000-0000-000000000000";

const AgendamentosPage = () => {
  // Estado para formulários
  const [activeTab, setActiveTab] = useState("agendamentos");
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
  const { 
    posts, 
    isLoading: isLoadingPosts, 
    refetch, 
    deleteScheduledPost,
    filter,
    setFilter
  } = useScheduledPosts(DEMO_CLIENT_ID);
  
  // Função para lidar com o upload e agendamento
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadFile(e.target.files[0]);
    }
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
      
      await schedulePost({
        mediaId: mediaResult.id,
        clientId: DEMO_CLIENT_ID,
        platform: selectedPlatform,
        scheduledFor: scheduledDateTime,
        caption: postCaption || undefined,
        hashtags: hashtagArray.length > 0 ? hashtagArray : undefined
      });
      
      // 3. Limpar o formulário e atualizar lista
      setUploadFile(null);
      setMediaTitle("");
      setMediaDescription("");
      setScheduledDate("");
      setScheduledTime("");
      setPostCaption("");
      setPostHashtags("");
      
      // 4. Mudar para a aba de agendamentos e atualizar
      setActiveTab("agendamentos");
      refetch();
      
    } catch (error) {
      console.error("Erro no processo:", error);
      toast({
        title: "Erro no processo",
        description: "Ocorreu um erro ao tentar agendar sua postagem.",
        variant: "destructive",
      });
    }
  };
  
  // Handlers para os filtros
  const handlePlatformFilterChange = (value: string) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      platform: value
    }));
  };
  
  const handleStatusFilterChange = (value: string) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      status: value
    }));
  };

  return (
    <div className="space-y-6">
      <AgendamentosHeader onCreateNew={() => setActiveTab("novo")} />
      
      <StatCards posts={posts} />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="agendamentos">Agendamentos</TabsTrigger>
          <TabsTrigger value="novo">Novo Agendamento</TabsTrigger>
        </TabsList>
        
        <TabsContent value="agendamentos">
          <AgendamentosLista 
            posts={posts} 
            isLoading={isLoadingPosts} 
            onCreateNew={() => setActiveTab("novo")}
            onDeletePost={deleteScheduledPost}
            platformFilter={filter.platform}
            statusFilter={filter.status}
            onPlatformFilterChange={handlePlatformFilterChange}
            onStatusFilterChange={handleStatusFilterChange}
          />
        </TabsContent>
        
        <TabsContent value="novo">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MediaUploadForm 
              uploadFile={uploadFile}
              mediaTitle={mediaTitle}
              mediaDescription={mediaDescription}
              mediaType={mediaType}
              onFileChange={handleFileChange}
              onTitleChange={setMediaTitle}
              onDescriptionChange={setMediaDescription}
              onMediaTypeChange={setMediaType}
            />

            <ScheduleForm 
              selectedPlatform={selectedPlatform}
              scheduledDate={scheduledDate}
              scheduledTime={scheduledTime}
              postCaption={postCaption}
              postHashtags={postHashtags}
              isSubmitting={isSubmitting}
              isUploading={isUploading}
              progress={progress}
              onPlatformChange={setSelectedPlatform}
              onDateChange={setScheduledDate}
              onTimeChange={setScheduledTime}
              onCaptionChange={setPostCaption}
              onHashtagsChange={setPostHashtags}
              onSubmit={handleUploadAndSchedule}
              disabled={!uploadFile}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AgendamentosPage;
