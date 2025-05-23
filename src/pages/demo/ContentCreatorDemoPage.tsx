
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, Plus, Upload, Video, Image as ImageIcon, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

// Interfaces
interface ContentItem {
  id: string;
  title: string;
  type: string;
  date: string;
  platforms: string[];
  stats?: {
    views?: number;
    likes: number;
    comments: number;
    shares: number;
  };
}

const ContentCreatorDemoPage: React.FC = () => {
  // Estado para os posts recentes
  const [recentPosts, setRecentPosts] = useState<ContentItem[]>([
    {
      id: '1',
      title: 'Lançamento de Primavera',
      type: 'image',
      date: '2025-04-15T14:30:00',
      platforms: ['instagram', 'facebook'],
      stats: {
        likes: 245,
        comments: 48,
        shares: 15
      }
    },
    {
      id: '2',
      title: 'Tutorial de Maquiagem',
      type: 'video',
      date: '2025-04-20T10:00:00',
      platforms: ['instagram', 'youtube'],
      stats: {
        views: 1240,
        likes: 156,
        comments: 32
      }
    },
    {
      id: '3',
      title: 'Dicas de Cuidados com a Pele',
      type: 'post',
      date: '2025-04-22T16:45:00',
      platforms: ['facebook', 'blog'],
      stats: {
        likes: 87,
        comments: 23,
        shares: 9
      }
    }
  ]);

  // Estados para a criação de conteúdo
  const [isCreatingContent, setIsCreatingContent] = useState(false);
  const [contentType, setContentType] = useState<string>('post');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  // Estado para upload de arquivo
  const [file, setFile] = useState<File | null>(null);
  
  // Estados para agendamento
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');

  const handlePlatformChange = (platform: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleContentSubmit = () => {
    if (!title) {
      toast.error('Por favor, adicione um título para o conteúdo');
      return;
    }

    if (selectedPlatforms.length === 0) {
      toast.error('Selecione pelo menos uma plataforma para publicação');
      return;
    }

    const newContent: ContentItem = {
      id: `${Date.now()}`,
      title,
      type: contentType,
      date: isScheduled && scheduledDate && scheduledTime 
        ? `${scheduledDate}T${scheduledTime}:00` 
        : new Date().toISOString(),
      platforms: selectedPlatforms,
      stats: {
        likes: 0,
        comments: 0,
        shares: 0
      }
    };
    
    // Adicionar visualizações se for vídeo
    if (contentType === 'video') {
      newContent.stats = {
        ...newContent.stats,
        views: 0
      };
    }

    setRecentPosts([newContent, ...recentPosts]);
    toast.success(isScheduled ? 'Conteúdo agendado com sucesso!' : 'Conteúdo publicado com sucesso!');
    
    // Reset form
    setIsCreatingContent(false);
    setContentType('post');
    setTitle('');
    setDescription('');
    setSelectedPlatforms([]);
    setFile(null);
    setIsScheduled(false);
    setScheduledDate('');
    setScheduledTime('');
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'image': return <ImageIcon className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "dd 'de' MMMM 'às' HH:mm", { locale: ptBR });
  };

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Criador de Conteúdo</h1>
          <p className="text-muted-foreground">Crie e publique conteúdo em várias plataformas</p>
        </div>
        <Dialog open={isCreatingContent} onOpenChange={setIsCreatingContent}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" /> Criar Conteúdo
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Criar Novo Conteúdo</DialogTitle>
            </DialogHeader>
            <div className="py-4 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="content-type">Tipo de Conteúdo</Label>
                <RadioGroup 
                  id="content-type" 
                  value={contentType} 
                  onValueChange={setContentType}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="post" id="post" />
                    <Label htmlFor="post" className="flex items-center gap-1">
                      <FileText className="h-4 w-4" /> Post
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="image" id="image" />
                    <Label htmlFor="image" className="flex items-center gap-1">
                      <ImageIcon className="h-4 w-4" /> Imagem
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="video" id="video" />
                    <Label htmlFor="video" className="flex items-center gap-1">
                      <Video className="h-4 w-4" /> Vídeo
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content-title">Título</Label>
                <Input 
                  id="content-title"
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  placeholder="Digite o título do conteúdo"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content-description">Descrição</Label>
                <Textarea 
                  id="content-description"
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  placeholder="Digite a descrição ou legenda..."
                  rows={4}
                />
              </div>

              {(contentType === 'image' || contentType === 'video') && (
                <div className="space-y-2">
                  <Label htmlFor="content-file">Upload de {contentType === 'image' ? 'Imagem' : 'Vídeo'}</Label>
                  <div className="flex items-center gap-2">
                    <Input 
                      id="content-file" 
                      type="file" 
                      accept={contentType === 'image' ? "image/*" : "video/*"}
                      onChange={handleFileChange}
                      className="flex-1"
                    />
                    <Button variant="outline" type="button" size="icon">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                  {file && (
                    <p className="text-sm text-muted-foreground">Arquivo selecionado: {file.name}</p>
                  )}
                </div>
              )}

              <Separator />

              <div className="space-y-2">
                <Label>Plataformas</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="platform-instagram" 
                      checked={selectedPlatforms.includes('instagram')}
                      onCheckedChange={() => handlePlatformChange('instagram')}
                    />
                    <label htmlFor="platform-instagram" className="text-sm font-medium">
                      Instagram
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="platform-facebook" 
                      checked={selectedPlatforms.includes('facebook')}
                      onCheckedChange={() => handlePlatformChange('facebook')}
                    />
                    <label htmlFor="platform-facebook" className="text-sm font-medium">
                      Facebook
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="platform-twitter" 
                      checked={selectedPlatforms.includes('twitter')}
                      onCheckedChange={() => handlePlatformChange('twitter')}
                    />
                    <label htmlFor="platform-twitter" className="text-sm font-medium">
                      Twitter
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="platform-linkedin" 
                      checked={selectedPlatforms.includes('linkedin')}
                      onCheckedChange={() => handlePlatformChange('linkedin')}
                    />
                    <label htmlFor="platform-linkedin" className="text-sm font-medium">
                      LinkedIn
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="platform-youtube" 
                      checked={selectedPlatforms.includes('youtube')}
                      onCheckedChange={() => handlePlatformChange('youtube')}
                    />
                    <label htmlFor="platform-youtube" className="text-sm font-medium">
                      YouTube
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="platform-blog" 
                      checked={selectedPlatforms.includes('blog')}
                      onCheckedChange={() => handlePlatformChange('blog')}
                    />
                    <label htmlFor="platform-blog" className="text-sm font-medium">
                      Blog
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="is-scheduled" 
                  checked={isScheduled}
                  onCheckedChange={(checked) => setIsScheduled(!!checked)}
                />
                <label htmlFor="is-scheduled" className="text-sm font-medium">
                  Agendar publicação
                </label>
              </div>

              {isScheduled && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="scheduled-date" className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" /> Data
                    </Label>
                    <Input 
                      id="scheduled-date" 
                      type="date" 
                      value={scheduledDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setScheduledDate(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="scheduled-time" className="flex items-center gap-1">
                      <Clock className="h-4 w-4" /> Hora
                    </Label>
                    <Input 
                      id="scheduled-time" 
                      type="time" 
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreatingContent(false)}>Cancelar</Button>
              <Button onClick={handleContentSubmit} disabled={!title || selectedPlatforms.length === 0}>
                {isScheduled ? 'Agendar' : 'Publicar'} Conteúdo
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="recent" className="mt-6">
        <TabsList>
          <TabsTrigger value="recent">Conteúdos Recentes</TabsTrigger>
          <TabsTrigger value="scheduled">Agendados</TabsTrigger>
          <TabsTrigger value="analytics">Análises</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recent">
          <Card>
            <CardHeader>
              <CardTitle>Conteúdos Recentes</CardTitle>
              <CardDescription>
                Gerenciamento de conteúdos recentemente publicados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPosts.map(post => (
                  <div key={post.id} className="flex items-center justify-between p-4 border rounded-md hover:bg-accent/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`flex items-center justify-center h-10 w-10 rounded-full
                        ${post.type === 'video' ? 'bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400' : 
                          post.type === 'image' ? 'bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400' : 
                          'bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400'}`}
                      >
                        {getTypeIcon(post.type)}
                      </div>
                      <div>
                        <h3 className="font-medium">{post.title}</h3>
                        <p className="text-xs text-muted-foreground">
                          {formatDateTime(post.date)} • {post.platforms.join(', ')}
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className="flex gap-2 text-xs text-muted-foreground">
                        {post.stats?.views && (
                          <span>{post.stats.views} visualizações</span>
                        )}
                        <span>{post.stats?.likes} curtidas</span>
                        <span>{post.stats?.comments} comentários</span>
                        <span>{post.stats?.shares} compartilhamentos</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="scheduled">
          <Card>
            <CardHeader>
              <CardTitle>Conteúdos Agendados</CardTitle>
              <CardDescription>
                Gerenciar publicações agendadas para datas futuras
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <p>Você verá aqui suas publicações agendadas</p>
                <Button 
                  className="mt-4" 
                  variant="outline" 
                  onClick={() => {
                    setIsScheduled(true);
                    setIsCreatingContent(true);
                  }}
                >
                  Agendar Nova Publicação
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Análises de Desempenho</CardTitle>
              <CardDescription>
                Visualize o desempenho do seu conteúdo em diferentes plataformas
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <p>Os gráficos de análise aparecerão aqui</p>
                <Button variant="outline" className="mt-4">Gerar Relatório</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentCreatorDemoPage;
