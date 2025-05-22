import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Check, MessageSquare, Share2, Instagram, Facebook, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface PostagemWhatsAppSellerProps {
  onPostComplete: (data: any) => void;
}

const PostagemWhatsAppSeller: React.FC<PostagemWhatsAppSellerProps> = ({ onPostComplete }) => {
  const [activeTab, setActiveTab] = useState("nova-postagem");
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postType, setPostType] = useState("");
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["whatsapp"]);
  const [schedulePost, setSchedulePost] = useState(false);
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [isGeneratingSuggestion, setIsGeneratingSuggestion] = useState(false);

  const postTypes = [
    { value: "product", label: "Produto" },
    { value: "promotion", label: "Promoção" },
    { value: "announcement", label: "Comunicado" },
    { value: "testimonial", label: "Depoimento" }
  ];

  const whatsappGroups = [
    { id: "1", name: "Ofertas Diárias", members: 245, lastActivity: "Hoje" },
    { id: "2", name: "Compra e Venda SP", members: 387, lastActivity: "Hoje" },
    { id: "3", name: "Produtos Importados", members: 156, lastActivity: "Ontem" },
    { id: "4", name: "Moda Feminina", members: 298, lastActivity: "Hoje" },
    { id: "5", name: "Eletrônicos Brasil", members: 412, lastActivity: "Ontem" }
  ];

  const platforms = [
    { id: "whatsapp", name: "WhatsApp", icon: <MessageSquare className="h-4 w-4" /> },
    { id: "telegram", name: "Telegram", icon: <Send className="h-4 w-4" /> },
    { id: "instagram", name: "Instagram", icon: <Instagram className="h-4 w-4" /> },
    { id: "facebook", name: "Facebook", icon: <Facebook className="h-4 w-4" /> }
  ];

  const scheduledPosts = [
    { 
      id: "1", 
      title: "Novos Produtos da Semana", 
      type: "Produto", 
      date: "24/05/2025", 
      time: "10:00",
      platforms: ["WhatsApp", "Telegram", "Instagram"],
      groups: ["Ofertas Diárias", "Moda Feminina"]
    },
    { 
      id: "2", 
      title: "Promoção de Fim de Semana: 30% OFF", 
      type: "Promoção", 
      date: "26/05/2025", 
      time: "09:00",
      platforms: ["WhatsApp", "Telegram", "Facebook"],
      groups: ["Ofertas Diárias", "Compra e Venda SP", "Produtos Importados"]
    },
    { 
      id: "3", 
      title: "Depoimento da Cliente Márcia", 
      type: "Depoimento", 
      date: "28/05/2025", 
      time: "14:00",
      platforms: ["WhatsApp", "Instagram"],
      groups: ["Moda Feminina"]
    }
  ];

  const publishedPosts = [
    { 
      id: "4", 
      title: "Lançamento Coleção Verão", 
      type: "Produto", 
      date: "15/05/2025", 
      time: "10:00",
      platforms: ["WhatsApp", "Telegram", "Instagram"],
      stats: { views: 1245, responses: 87, conversions: 23 }
    },
    { 
      id: "5", 
      title: "Promoção Relâmpago 24h", 
      type: "Promoção", 
      date: "10/05/2025", 
      time: "09:00",
      platforms: ["WhatsApp", "Telegram"],
      stats: { views: 980, responses: 112, conversions: 45 }
    },
    { 
      id: "6", 
      title: "Novidades da Próxima Semana", 
      type: "Comunicado", 
      date: "05/05/2025", 
      time: "14:00",
      platforms: ["WhatsApp", "Telegram", "Facebook"],
      stats: { views: 876, responses: 34, conversions: 12 }
    }
  ];

  const toggleGroup = (groupId: string) => {
    setSelectedGroups(prev => 
      prev.includes(groupId) 
        ? prev.filter(id => id !== groupId) 
        : [...prev, groupId]
    );
  };

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(id => id !== platformId) 
        : [...prev, platformId]
    );
  };

  const generateAiSuggestion = () => {
    setIsGeneratingSuggestion(true);
    
    // Simulação de chamada à API de IA
    setTimeout(() => {
      const suggestions = [
        "🔥 SUPER OFERTA! 🔥\nAproveitando para compartilhar essa promoção incrível que está acabando hoje! Produtos com até 50% de desconto. Não perca essa chance! Clique no link para ver todos os itens: [link]",
        "✨ NOVIDADE EXCLUSIVA! ✨\nAcabou de chegar e já está fazendo sucesso! Nosso novo produto está disponível por tempo limitado. Garanta o seu antes que acabe! Detalhes completos: [link]",
        "👑 CLIENTE SATISFEITO! 👑\n\"Comprei na semana passada e já estou apaixonada! Qualidade incrível e entrega super rápida. Recomendo demais!\" - Maria S.\nQuer ter a mesma experiência? Acesse agora: [link]"
      ];
      
      const selectedSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
      setAiSuggestion(selectedSuggestion);
      setIsGeneratingSuggestion(false);
    }, 1500);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulação de envio para API
    setTimeout(() => {
      setIsSubmitting(false);
      setIsComplete(true);
      
      // Dados para enviar ao componente pai
      const postData = {
        title: postTitle,
        content: postContent || aiSuggestion,
        type: postType,
        groups: selectedGroups.map(id => whatsappGroups.find(g => g.id === id)?.name),
        platforms: selectedPlatforms.map(id => platforms.find(p => p.id === id)?.name),
        scheduled: schedulePost,
        scheduleDate: schedulePost ? scheduleDate : new Date().toLocaleDateString(),
        scheduleTime: schedulePost ? scheduleTime : new Date().toLocaleTimeString(),
        status: schedulePost ? 'scheduled' : 'published',
        createdAt: new Date().toISOString()
      };
      
      onPostComplete(postData);
    }, 1500);
  };

  const isFormValid = () => {
    return (
      postTitle !== "" && 
      (postContent !== "" || aiSuggestion !== "") && 
      postType !== "" && 
      selectedGroups.length > 0 && 
      selectedPlatforms.length > 0 && 
      (!schedulePost || (scheduleDate !== "" && scheduleTime !== ""))
    );
  };

  const useAiSuggestion = () => {
    setPostContent(aiSuggestion);
  };

  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="nova-postagem">Nova Divulgação</TabsTrigger>
          <TabsTrigger value="agendadas">Agendadas</TabsTrigger>
          <TabsTrigger value="publicadas">Publicadas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="nova-postagem">
          {!isComplete ? (
            <Card>
              <CardHeader>
                <CardTitle>Criar Nova Divulgação</CardTitle>
                <CardDescription>
                  Crie uma mensagem para enviar aos seus grupos de WhatsApp e outras plataformas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="postTitle">Título da Divulgação</Label>
                    <Input
                      id="postTitle"
                      placeholder="Ex: Promoção de Fim de Semana"
                      value={postTitle}
                      onChange={(e) => setPostTitle(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="postContent">Conteúdo da Mensagem</Label>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={generateAiSuggestion}
                        disabled={isGeneratingSuggestion}
                      >
                        {isGeneratingSuggestion ? "Gerando..." : "Sugerir com IA"}
                      </Button>
                    </div>
                    
                    {aiSuggestion && (
                      <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-md mb-2 border border-blue-200 dark:border-blue-800">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-blue-700 dark:text-blue-400">Sugestão da IA</span>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={useAiSuggestion}
                          >
                            Usar
                          </Button>
                        </div>
                        <p className="text-sm whitespace-pre-line">{aiSuggestion}</p>
                      </div>
                    )}
                    
                    <Textarea
                      id="postContent"
                      placeholder="Digite o conteúdo da sua mensagem..."
                      rows={5}
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="postType">Tipo de Conteúdo</Label>
                    <Select value={postType} onValueChange={setPostType}>
                      <SelectTrigger id="postType">
                        <SelectValue placeholder="Selecione o tipo de conteúdo" />
                      </SelectTrigger>
                      <SelectContent>
                        {postTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-3">
                    <Label>Grupos do WhatsApp</Label>
                    <div className="grid grid-cols-1 gap-2">
                      {whatsappGroups.map((group) => (
                        <div 
                          key={group.id}
                          className={`flex items-center justify-between p-3 rounded-md border cursor-pointer ${
                            selectedGroups.includes(group.id) 
                              ? 'bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800' 
                              : 'bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700'
                          }`}
                          onClick={() => toggleGroup(group.id)}
                        >
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{group.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{group.name}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {group.members} membros • Ativo: {group.lastActivity}
                              </p>
                            </div>
                          </div>
                          {selectedGroups.includes(group.id) && (
                            <Check className="h-5 w-5 text-blue-600" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Label>Plataformas</Label>
                    <div className="flex flex-wrap gap-2">
                      {platforms.map((platform) => (
                        <Badge
                          key={platform.id}
                          variant={selectedPlatforms.includes(platform.id) ? "default" : "outline"}
                          className={`cursor-pointer ${
                            selectedPlatforms.includes(platform.id) 
                              ? 'bg-blue-600 hover:bg-blue-700' 
                              : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                          }`}
                          onClick={() => togglePlatform(platform.id)}
                        >
                          <div className="flex items-center gap-1">
                            {platform.icon}
                            <span>{platform.name}</span>
                          </div>
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="schedule" 
                        checked={schedulePost}
                        onCheckedChange={setSchedulePost}
                      />
                      <Label htmlFor="schedule">Agendar envio</Label>
                    </div>
                    
                    {schedulePost && (
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="space-y-2">
                          <Label htmlFor="scheduleDate">Data</Label>
                          <Input
                            id="scheduleDate"
                            type="date"
                            value={scheduleDate}
                            onChange={(e) => setScheduleDate(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="scheduleTime">Horário</Label>
                          <Input
                            id="scheduleTime"
                            type="time"
                            value={scheduleTime}
                            onChange={(e) => setScheduleTime(e.target.value)}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button 
                  onClick={handleSubmit} 
                  disabled={!isFormValid() || isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : schedulePost ? "Agendar Divulgação" : "Publicar Agora"}
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-green-600">
                  {schedulePost ? "Divulgação Agendada!" : "Divulgação Publicada!"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  
                  <p className="text-lg">
                    {schedulePost 
                      ? `Sua divulgação foi agendada para ${scheduleDate} às ${scheduleTime}.`
                      : "Sua divulgação foi publicada com sucesso!"
                    }
                  </p>
                  
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-left">
                    <h3 className="font-medium">{postTitle}</h3>
                    <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line mt-2">
                      {postContent || aiSuggestion}
                    </p>
                    
                    <div className="mt-4 flex flex-wrap gap-2">
                      {selectedPlatforms.map(id => {
                        const platform = platforms.find(p => p.id === id);
                        return platform ? (
                          <Badge key={platform.id} variant="secondary">
                            <div className="flex items-center gap-1">
                              {platform.icon}
                              <span>{platform.name}</span>
                            </div>
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button onClick={() => window.location.reload()}>
                  Criar Nova Divulgação
                </Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="agendadas">
          <Card>
            <CardHeader>
              <CardTitle>Divulgações Agendadas</CardTitle>
              <CardDescription>
                Gerencie suas divulgações programadas para envio futuro
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduledPosts.map((post) => (
                  <Card key={post.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-base">{post.title}</CardTitle>
                        <Badge>{post.type}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-1">
                          <span className="text-gray-500 dark:text-gray-400">Data:</span>
                          <span>{post.date} às {post.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-gray-500 dark:text-gray-400">Grupos:</span>
                          <span>{post.groups.length}</span>
                        </div>
                      </div>
                      
                      <div className="mt-3 flex flex-wrap gap-1">
                        {post.platforms.map((platform, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {platform}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0 flex justify-end gap-2">
                      <Button variant="ghost" size="sm">Editar</Button>
                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">Cancelar</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="publicadas">
          <Card>
            <CardHeader>
              <CardTitle>Divulgações Publicadas</CardTitle>
              <CardDescription>
                Veja o desempenho das suas divulgações anteriores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {publishedPosts.map((post) => (
                  <Card key={post.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-base">{post.title}</CardTitle>
                        <Badge>{post.type}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-1">
                          <span className="text-gray-500 dark:text-gray-400">Publicado:</span>
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-gray-500 dark:text-gray-400">Plataformas:</span>
                          <span>{post.platforms.length}</span>
                        </div>
                      </div>
                      
                      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                        <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded">
                          <p className="text-xs text-gray-500 dark:text-gray-400">Visualizações</p>
                          <p className="font-medium">{post.stats.views}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded">
                          <p className="text-xs text-gray-500 dark:text-gray-400">Respostas</p>
                          <p className="font-medium">{post.stats.responses}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded">
                          <p className="text-xs text-gray-500 dark:text-gray-400">Conversões</p>
                          <p className="font-medium">{post.stats.conversions}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0 flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4 mr-1" />
                        Republicar
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PostagemWhatsAppSeller;
