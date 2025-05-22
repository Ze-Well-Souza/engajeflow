import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, Image, Upload, Calendar, Clock, AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface GerenciamentoContentCreatorProps {
  onActionComplete: (data: any) => void;
}

const GerenciamentoContentCreator: React.FC<GerenciamentoContentCreatorProps> = ({ onActionComplete }) => {
  const [activeTab, setActiveTab] = useState("calendario");
  const [selectedContent, setSelectedContent] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Dados simulados para o calendário de conteúdo
  const calendarContent = [
    {
      id: "1",
      title: "Vídeo Tutorial de Maquiagem",
      date: "2025-05-24",
      time: "10:00",
      type: "Vídeo",
      platforms: ["Instagram", "TikTok", "YouTube"],
      status: "scheduled",
      thumbnail: "https://placehold.co/300x200/e9d5ff/4c1d95?text=Maquiagem+Tutorial"
    },
    {
      id: "2",
      title: "Carrossel: 10 Dicas de Fotografia",
      date: "2025-05-26",
      time: "14:00",
      type: "Carrossel",
      platforms: ["Instagram", "Facebook"],
      status: "scheduled",
      thumbnail: "https://placehold.co/300x200/dbeafe/1e40af?text=Dicas+Fotografia"
    },
    {
      id: "3",
      title: "Review do Novo iPhone",
      date: "2025-05-28",
      time: "16:00",
      type: "Vídeo Longo",
      platforms: ["YouTube"],
      status: "scheduled",
      thumbnail: "https://placehold.co/300x200/fef3c7/92400e?text=Review+iPhone"
    },
    {
      id: "4",
      title: "Desafio de Dança",
      date: "2025-05-22",
      time: "09:00",
      type: "Vídeo Curto",
      platforms: ["TikTok", "Instagram"],
      status: "draft",
      thumbnail: "https://placehold.co/300x200/fee2e2/991b1b?text=Desafio+Dança"
    }
  ];

  // Dados simulados para a biblioteca de mídia
  const mediaLibrary = [
    {
      id: "1",
      name: "Sessão de Fotos - Maio",
      type: "folder",
      items: 12,
      updatedAt: "2025-05-15"
    },
    {
      id: "2",
      name: "Vídeos Tutoriais",
      type: "folder",
      items: 8,
      updatedAt: "2025-05-10"
    },
    {
      id: "3",
      name: "Produto_1.jpg",
      type: "image",
      size: "2.4 MB",
      dimensions: "1920x1080",
      updatedAt: "2025-05-18",
      url: "https://placehold.co/300x200/dbeafe/1e40af?text=Produto+1"
    },
    {
      id: "4",
      name: "Tutorial_Maquiagem.mp4",
      type: "video",
      size: "45.8 MB",
      duration: "5:24",
      updatedAt: "2025-05-17",
      url: "https://placehold.co/300x200/e9d5ff/4c1d95?text=Tutorial+Vídeo"
    },
    {
      id: "5",
      name: "Banner_Instagram.png",
      type: "image",
      size: "1.2 MB",
      dimensions: "1080x1080",
      updatedAt: "2025-05-16",
      url: "https://placehold.co/300x200/fef3c7/92400e?text=Banner+Instagram"
    }
  ];

  // Dados simulados para análise de desempenho
  const analyticsData = {
    platforms: [
      {
        name: "Instagram",
        followers: "45.2K",
        engagement: "3.8%",
        growth: "+2.3%",
        posts: 124
      },
      {
        name: "TikTok",
        followers: "78.5K",
        engagement: "5.2%",
        growth: "+4.7%",
        posts: 87
      },
      {
        name: "YouTube",
        followers: "12.8K",
        engagement: "8.1%",
        growth: "+1.2%",
        posts: 32
      },
      {
        name: "Facebook",
        followers: "32.1K",
        engagement: "1.9%",
        growth: "+0.5%",
        posts: 56
      }
    ],
    topContent: [
      {
        id: "1",
        title: "Desafio de Dança Viral",
        platform: "TikTok",
        views: "1.2M",
        likes: "245K",
        comments: "12.3K",
        shares: "56.7K"
      },
      {
        id: "2",
        title: "10 Dicas de Fotografia com Celular",
        platform: "Instagram",
        views: "87.5K",
        likes: "15.2K",
        comments: "1.8K",
        shares: "4.3K"
      },
      {
        id: "3",
        title: "Review Completo: Novo iPhone",
        platform: "YouTube",
        views: "156K",
        likes: "12.4K",
        comments: "2.1K",
        shares: "3.5K"
      }
    ],
    recentActivity: [
      {
        id: "1",
        type: "comment",
        platform: "Instagram",
        user: "maria.silva",
        content: "Amei esse conteúdo! Você poderia fazer um tutorial sobre como editar fotos?",
        time: "2h atrás"
      },
      {
        id: "2",
        type: "message",
        platform: "Instagram",
        user: "marca_oficial",
        content: "Olá! Gostaríamos de fazer uma parceria para divulgar nossos produtos. Podemos conversar?",
        time: "5h atrás"
      },
      {
        id: "3",
        type: "comment",
        platform: "YouTube",
        user: "tech_lover",
        content: "Ótimo vídeo! Qual câmera você usa para gravar? A qualidade está incrível!",
        time: "1d atrás"
      }
    ]
  };

  const handleContentClick = (content: any) => {
    setSelectedContent(content);
    setIsDialogOpen(true);
  };

  const handleUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulação de upload com progresso
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          
          // Notificar componente pai sobre a ação concluída
          onActionComplete({
            action: "upload",
            status: "success",
            message: "Arquivo enviado com sucesso",
            timestamp: new Date().toISOString()
          });
          
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="calendario">Calendário</TabsTrigger>
          <TabsTrigger value="midia">Biblioteca de Mídia</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        {/* Calendário de Conteúdo */}
        <TabsContent value="calendario">
          <Card>
            <CardHeader>
              <CardTitle>Calendário de Conteúdo</CardTitle>
              <CardDescription>
                Gerencie seu cronograma de publicações em todas as plataformas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Maio 2025</h3>
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    Nova Publicação
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {calendarContent.map((content) => (
                    <Card 
                      key={content.id} 
                      className="cursor-pointer hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
                      onClick={() => handleContentClick(content)}
                    >
                      <div className="relative">
                        <img 
                          src={content.thumbnail} 
                          alt={content.title}
                          className="w-full h-32 object-cover rounded-t-lg"
                        />
                        {content.status === "draft" && (
                          <Badge variant="secondary" className="absolute top-2 right-2">
                            Rascunho
                          </Badge>
                        )}
                      </div>
                      <CardContent className="pt-4">
                        <h4 className="font-medium line-clamp-1">{content.title}</h4>
                        <div className="flex justify-between items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>{formatDate(content.date)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            <span>{content.time}</span>
                          </div>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-1">
                          <Badge variant="outline" className="text-xs">
                            {content.type}
                          </Badge>
                          {content.platforms.map((platform, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {platform}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Biblioteca de Mídia */}
        <TabsContent value="midia">
          <Card>
            <CardHeader>
              <CardTitle>Biblioteca de Mídia</CardTitle>
              <CardDescription>
                Organize e acesse suas fotos e vídeos em um repositório centralizado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Input 
                      placeholder="Buscar arquivos..." 
                      className="w-64"
                    />
                    <Select>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Filtrar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="images">Imagens</SelectItem>
                        <SelectItem value="videos">Vídeos</SelectItem>
                        <SelectItem value="folders">Pastas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Upload className="h-4 w-4 mr-2" />
                        Enviar Arquivo
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Enviar Novo Arquivo</DialogTitle>
                        <DialogDescription>
                          Selecione um arquivo do seu computador para enviar à biblioteca
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4 py-4">
                        <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 dark:hover:border-blue-600 transition-colors">
                          <div className="flex flex-col items-center gap-2">
                            <Upload className="h-8 w-8 text-gray-400" />
                            <p className="font-medium">Clique para selecionar ou arraste arquivos aqui</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Suporta JPG, PNG, GIF, MP4 e MOV até 100MB
                            </p>
                          </div>
                        </div>
                        
                        {isUploading && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Enviando arquivo...</span>
                              <span>{uploadProgress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${uploadProgress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <DialogFooter>
                        <Button variant="outline" onClick={() => {}}>Cancelar</Button>
                        <Button onClick={handleUpload} disabled={isUploading}>
                          {isUploading ? "Enviando..." : "Enviar"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mediaLibrary.map((item) => (
                    <Card key={item.id} className="cursor-pointer hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                      {item.type === "folder" ? (
                        <CardContent className="p-4 flex items-center gap-3">
                          <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded">
                            <Image className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {item.items} itens • Atualizado em {formatDate(item.updatedAt)}
                            </p>
                          </div>
                        </CardContent>
                      ) : (
                        <>
                          {item.type === "image" && (
                            <div className="relative">
                              <img 
                                src={item.url} 
                                alt={item.name}
                                className="w-full h-32 object-cover rounded-t-lg"
                              />
                            </div>
                          )}
                          {item.type === "video" && (
                            <div className="relative">
                              <img 
                                src={item.url} 
                                alt={item.name}
                                className="w-full h-32 object-cover rounded-t-lg"
                              />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-black bg-opacity-50 rounded-full p-2">
                                  <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          )}
                          <CardContent className="pt-4">
                            <p className="font-medium line-clamp-1">{item.name}</p>
                            <div className="flex justify-between items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
                              <span>{item.type === "image" ? item.dimensions : item.duration}</span>
                              <span>{item.size}</span>
                            </div>
                          </CardContent>
                        </>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Analytics */}
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics de Desempenho</CardTitle>
              <CardDescription>
                Acompanhe métricas de engajamento, crescimento e conversão em todas as plataformas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Resumo das Plataformas */}
                <div>
                  <h3 className="text-lg font-medium mb-3">Resumo das Plataformas</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {analyticsData.platforms.map((platform, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <h4 className="font-medium">{platform.name}</h4>
                          <div className="mt-2 space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-500 dark:text-gray-400">Seguidores:</span>
                              <span className="font-medium">{platform.followers}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500 dark:text-gray-400">Engajamento:</span>
                              <span className="font-medium">{platform.engagement}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500 dark:text-gray-400">Crescimento:</span>
                              <span className={`font-medium ${platform.growth.startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                {platform.growth}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500 dark:text-gray-400">Publicações:</span>
                              <span className="font-medium">{platform.posts}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                {/* Conteúdo de Melhor Desempenho */}
                <div>
                  <h3 className="text-lg font-medium mb-3">Conteúdo de Melhor Desempenho</h3>
                  <div className="space-y-4">
                    {analyticsData.topContent.map((content, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{content.title}</h4>
                              <Badge variant="outline" className="mt-1">
                                {content.platform}
                              </Badge>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">{content.views} visualizações</p>
                            </div>
                          </div>
                          
                          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                            <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded">
                              <p className="text-xs text-gray-500 dark:text-gray-400">Curtidas</p>
                              <p className="font-medium">{content.likes}</p>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded">
                              <p className="text-xs text-gray-500 dark:text-gray-400">Comentários</p>
                              <p className="font-medium">{content.comments}</p>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded">
                              <p className="text-xs text-gray-500 dark:text-gray-400">Compartilhamentos</p>
                              <p className="font-medium">{content.shares}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                {/* Atividade Recente */}
                <div>
                  <h3 className="text-lg font-medium mb-3">Atividade Recente</h3>
                  <Card>
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        {analyticsData.recentActivity.map((activity, index) => (
                          <div key={index} className="flex gap-3 pb-4 border-b border-gray-100 dark:border-gray-800 last:border-0 last:pb-0">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{activity.user.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">@{activity.user}</span>
                                <Badge variant="outline" className="text-xs">
                                  {activity.platform}
                                </Badge>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {activity.time}
                                </span>
                              </div>
                              <p className="text-sm">{activity.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Dialog para visualização de conteúdo */}
      {selectedContent && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedContent.title}</DialogTitle>
              <DialogDescription>
                Detalhes do conteúdo agendado
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <img 
                src={selectedContent.thumbnail} 
                alt={selectedContent.title}
                className="w-full h-48 object-cover rounded-lg"
              />
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Data e Hora</Label>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>{formatDate(selectedContent.date)} às {selectedContent.time}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Tipo de Conteúdo</Label>
                  <div className="flex items-center gap-2 text-sm">
                    <Badge variant="outline">{selectedContent.type}</Badge>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Plataformas</Label>
                  <div className="flex flex-wrap gap-1">
                    {selectedContent.platforms.map((platform: string, i: number) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {platform}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Status</Label>
                  <div className="flex items-center gap-2 text-sm">
                    {selectedContent.status === "scheduled" ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300">
                        Agendado
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300">
                        Rascunho
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              
              {selectedContent.status === "draft" && (
                <div className="bg-yellow-50 dark:bg-yellow-900/30 p-3 rounded-md flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    Este conteúdo está em rascunho e precisa ser finalizado antes da publicação.
                  </p>
                </div>
              )}
            </div>
            
            <DialogFooter className="gap-2">
              <Button variant="outline">Editar</Button>
              <Button variant="default">
                {selectedContent.status === "scheduled" ? "Publicar Agora" : "Finalizar e Agendar"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default GerenciamentoContentCreator;
