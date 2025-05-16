
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarIcon, 
         Plus, 
         Clock, 
         Check, 
         X, 
         Trash, 
         Edit, 
         Upload, 
         Instagram, 
         Youtube, 
         Facebook,
         Calendar } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useMediaUpload } from "@/hooks/useMediaUpload";
import { useSchedulePost } from "@/hooks/useSchedulePost";
import { useScheduledPosts } from "@/hooks/useScheduledPosts";

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
  const { posts, isLoading: isLoadingPosts, refetch, deleteScheduledPost } = useScheduledPosts(DEMO_CLIENT_ID);
  
  // Contadores para o dashboard
  const pendingPosts = posts.filter(post => post.status === 'pending').length;
  const completedPosts = posts.filter(post => post.status === 'posted').length;
  const failedPosts = posts.filter(post => post.status === 'failed').length;
  
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
  
  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram':
        return <Instagram className="h-4 w-4" />;
      case 'youtube':
        return <Youtube className="h-4 w-4" />;
      case 'facebook':
        return <Facebook className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };
  
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-900/30 text-yellow-500 border border-yellow-700/50';
      case 'processing':
        return 'bg-blue-900/30 text-blue-500 border border-blue-700/50';
      case 'posted':
        return 'bg-green-900/30 text-green-500 border border-green-700/50';
      case 'failed':
        return 'bg-red-900/30 text-red-500 border border-red-700/50';
      default:
        return 'bg-gray-900/30 text-gray-500 border border-gray-700/50';
    }
  };
  
  const formatScheduledDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return format(date, "dd 'de' MMMM 'às' HH:mm", { locale: ptBR });
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Agendamentos</h1>
        <Button 
          variant="default" 
          onClick={() => setActiveTab("novo")}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Novo Agendamento
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-500" />
              Total de Agendamentos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{posts.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4 text-yellow-500" />
              Pendentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingPosts}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              Concluídos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedPosts}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <X className="h-4 w-4 text-red-500" />
              Falhas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{failedPosts}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="agendamentos">Agendamentos</TabsTrigger>
          <TabsTrigger value="novo">Novo Agendamento</TabsTrigger>
        </TabsList>
        
        <TabsContent value="agendamentos">
          <Card>
            <CardHeader>
              <CardTitle>Agendamentos Programados</CardTitle>
              <CardDescription>
                Gerencie seus posts agendados para redes sociais.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {isLoadingPosts ? (
                  <div className="text-center py-8">
                    <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
                    <p>Carregando agendamentos...</p>
                  </div>
                ) : posts.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>Nenhum agendamento encontrado.</p>
                    <Button 
                      variant="outline" 
                      onClick={() => setActiveTab("novo")} 
                      className="mt-2"
                    >
                      Criar agendamento
                    </Button>
                  </div>
                ) : (
                  posts.map((post) => (
                    <div 
                      key={post.id} 
                      className={`p-4 border rounded-lg flex justify-between ${
                        post.status === 'posted' ? 'border-green-700 bg-green-950/10' : 
                        post.status === 'failed' ? 'border-red-700 bg-red-950/10' : 
                        'border-gray-700 bg-gray-850'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-4 ${
                          post.platform === 'instagram' ? 'bg-pink-900/30 text-pink-500' : 
                          post.platform === 'youtube' ? 'bg-red-900/30 text-red-500' : 
                          post.platform === 'facebook' ? 'bg-blue-900/30 text-blue-500' :
                          'bg-gray-900/30 text-gray-500'
                        }`}>
                          {getPlatformIcon(post.platform)}
                        </div>
                        <div>
                          <h3 className="font-medium">{post.mediaTitle || 'Mídia sem título'}</h3>
                          <div className="flex items-center gap-3 text-sm text-gray-400 mt-1">
                            <span className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" /> {formatScheduledDate(post.scheduledFor)}
                            </span>
                            <span className={`px-1.5 py-0.5 text-xs rounded-full ${getStatusBadgeClass(post.status)}`}>
                              {post.status === 'pending' ? 'Pendente' : 
                               post.status === 'processing' ? 'Processando' : 
                               post.status === 'posted' ? 'Publicado' : 'Falha'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {post.status === 'pending' && (
                          <>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Marcar como concluído">
                              <Check className="h-4 w-4 text-green-500" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Cancelar">
                              <X className="h-4 w-4 text-red-500" />
                            </Button>
                          </>
                        )}
                        {post.status === 'failed' && (
                          <span className="text-xs text-red-400">
                            {post.errorMessage || 'Erro de publicação'}
                          </span>
                        )}
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Editar" 
                          disabled={post.status === 'posted' || post.status === 'processing'}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0" 
                          title="Excluir"
                          onClick={() => deleteScheduledPost(post.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="novo">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload de Mídia</CardTitle>
                <CardDescription>
                  Selecione o arquivo que deseja programar para publicação.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
                    <input
                      type="file"
                      id="media-upload"
                      accept="image/*,video/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <label
                      htmlFor="media-upload"
                      className="flex flex-col items-center justify-center cursor-pointer"
                    >
                      <Upload className="h-10 w-10 text-gray-500 mb-2" />
                      <p className="text-sm font-medium mb-1">
                        {uploadFile ? uploadFile.name : 'Clique para selecionar um arquivo'}
                      </p>
                      <p className="text-xs text-gray-500">
                        Formatos suportados: JPG, PNG, MP4, MOV
                      </p>
                    </label>
                  </div>

                  <div>
                    <Label htmlFor="media-type">Tipo de Mídia</Label>
                    <Select value={mediaType} onValueChange={(value) => setMediaType(value as any)}>
                      <SelectTrigger id="media-type">
                        <SelectValue placeholder="Selecione o tipo de mídia" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="image">Imagem</SelectItem>
                        <SelectItem value="video">Vídeo</SelectItem>
                        <SelectItem value="carousel">Carrossel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="media-title">Título</Label>
                    <Input
                      id="media-title"
                      value={mediaTitle}
                      onChange={(e) => setMediaTitle(e.target.value)}
                      placeholder="Digite um título para identificação"
                    />
                  </div>

                  <div>
                    <Label htmlFor="media-description">Descrição (opcional)</Label>
                    <Textarea
                      id="media-description"
                      value={mediaDescription}
                      onChange={(e) => setMediaDescription(e.target.value)}
                      placeholder="Digite uma descrição para identificação interna"
                      rows={3}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Agendamento</CardTitle>
                <CardDescription>
                  Configure quando e onde sua mídia será publicada.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="platform">Plataforma</Label>
                    <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                      <SelectTrigger id="platform">
                        <SelectValue placeholder="Selecione a plataforma" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="instagram">Instagram</SelectItem>
                        <SelectItem value="facebook">Facebook</SelectItem>
                        <SelectItem value="youtube">YouTube</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="scheduled-date">Data</Label>
                      <Input
                        id="scheduled-date"
                        type="date"
                        value={scheduledDate}
                        onChange={(e) => setScheduledDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div>
                      <Label htmlFor="scheduled-time">Hora</Label>
                      <Input
                        id="scheduled-time"
                        type="time"
                        value={scheduledTime}
                        onChange={(e) => setScheduledTime(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="post-caption">Legenda</Label>
                    <Textarea
                      id="post-caption"
                      value={postCaption}
                      onChange={(e) => setPostCaption(e.target.value)}
                      placeholder="Digite a legenda que será postada junto com sua mídia"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="post-hashtags">Hashtags</Label>
                    <Input
                      id="post-hashtags"
                      value={postHashtags}
                      onChange={(e) => setPostHashtags(e.target.value)}
                      placeholder="#hashtag1 #hashtag2 #hashtag3"
                    />
                  </div>

                  <div className="pt-4">
                    <Button 
                      className="w-full" 
                      onClick={handleUploadAndSchedule}
                      disabled={isUploading || isSubmitting || !uploadFile}
                    >
                      {(isUploading || isSubmitting) && (
                        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-foreground"></span>
                      )}
                      {isUploading 
                        ? `Enviando... ${Math.round(progress)}%` 
                        : isSubmitting 
                          ? 'Agendando...' 
                          : 'Agendar Publicação'
                      }
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AgendamentosPage;
