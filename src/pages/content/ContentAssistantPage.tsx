
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Wand2, Lightbulb, Calendar, Instagram, Facebook, Youtube } from "lucide-react";

const ContentAssistantPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("gerador");
  const [platform, setPlatform] = useState("");
  const [contentType, setContentType] = useState("");
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [suggestedTimes, setSuggestedTimes] = useState<string[]>([]);

  const platforms = [
    { value: "instagram", label: "Instagram", icon: <Instagram className="h-4 w-4" /> },
    { value: "facebook", label: "Facebook", icon: <Facebook className="h-4 w-4" /> },
    { value: "youtube", label: "YouTube", icon: <Youtube className="h-4 w-4" /> },
    { value: "whatsapp", label: "WhatsApp", icon: 
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"></path>
      </svg>
    },
    { value: "tiktok", label: "TikTok", icon: 
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <path d="M12 2c0 2-1 5.5-1 8.5v5.5c0 .5-1.5 1-2 1s-1.5-.5-2-1c-.5-.5-1-1.5-1-2s.5-1.5 1-2 1.5-1 2-1V9.5C9 8 8.5 6 8 5S6 2 6 2s7 0 7.5 2C14 4.5 14 7 14 9c0 2.5-.5 4-.5 6 0 .5 1.5 1 2 1s1.5-.5 2-1 1-1.5 1-2-1-1.5-1-1-1.5-.5-2-.5V8c0-1 1-5.5 1-6 0-.5-2-1.5-4.5-1.5S8 2 8 2"></path>
      </svg>
    }
  ];

  const contentTypes = [
    { value: "post", label: "Postagem" },
    { value: "story", label: "Story" },
    { value: "reel", label: "Reel/Vídeo curto" },
    { value: "video", label: "Vídeo longo" },
    { value: "promo", label: "Promoção" }
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    
    // Simulação de geração de conteúdo com IA
    setTimeout(() => {
      const platformName = platforms.find(p => p.value === platform)?.label || platform;
      const typeName = contentTypes.find(t => t.value === contentType)?.label || contentType;
      
      setGeneratedContent(
        `✨ ${typeName} para ${platformName} ✨\n\n` +
        `📱 ${getRandomTitle()}\n\n` +
        `${getRandomContent(platformName, typeName)}\n\n` +
        `${getRandomHashtags()}`
      );
      
      // Gerar horários sugeridos
      setSuggestedTimes([
        "Quarta-feira às 18:30 - Engajamento alto esperado",
        "Quinta-feira às 12:15 - Horário de almoço com bom alcance",
        "Domingo às 10:00 - Melhor momento do fim de semana"
      ]);
      
      setIsGenerating(false);
    }, 1500);
  };

  // Funções auxiliares para gerar conteúdo simulado
  const getRandomTitle = () => {
    const titles = [
      "Descubra o que ninguém te conta sobre...",
      "O segredo para transformar seu negócio",
      "7 dicas que vão revolucionar sua rotina",
      "Novo lançamento que está conquistando todos",
      "Como aumentar seus resultados em 30 dias"
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  };

  const getRandomContent = (platform: string, type: string) => {
    const contents = [
      `Você sabia que 78% das pessoas decidem comprar baseado em conteúdos autênticos? É por isso que estamos sempre buscando trazer o melhor para você! 🔍\n\nHoje queremos compartilhar nossa jornada e mostrar como nossos produtos podem transformar sua experiência. Descubra agora mesmo! ⬇️`,
      `🚀 NOVIDADE IMPERDÍVEL! 🚀\n\nEstamos super empolgados para anunciar nossa nova coleção que chega para revolucionar o mercado. Produtos exclusivos, desenvolvidos pensando em você e nas suas necessidades.\n\nFicha técnica:\n✅ Qualidade premium\n✅ Garantia estendida\n✅ Entrega expressa`,
      `Quer saber como aumentar sua produtividade em 3x?\n\nNosso método exclusivo tem ajudado centenas de profissionais a alcançarem resultados extraordinários sem precisar trabalhar mais horas.\n\nComentários de clientes:\n"Mudou minha vida profissional!" - Maria S.\n"Resultados desde a primeira semana!" - João P.`,
      `📢 ATENÇÃO! Promoção relâmpago! 📢\n\nApenas hoje, todos os produtos da linha premium com 40% OFF!\n\nCorra porque é por tempo MUITO limitado e o estoque está acabando rapidamente! Clique no link na bio para aproveitar.`
    ];
    return contents[Math.floor(Math.random() * contents.length)];
  };

  const getRandomHashtags = () => {
    const tags = [
      "#Marketing #Crescimento #Sucesso #Empreendedorismo",
      "#Inovação #Tendência #Qualidade #Exclusividade",
      "#Dicas #Transformação #Resultados #MudançaDeVida",
      "#Promoção #Oferta #Imperdível #Economia"
    ];
    return tags[Math.floor(Math.random() * tags.length)];
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-start gap-8">
        <div className="w-full md:w-2/3">
          <div className="flex items-center gap-2 mb-4">
            <Wand2 className="h-6 w-6 text-purple-500" />
            <h1 className="text-3xl font-bold">Assistente de Conteúdo</h1>
          </div>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            Utilize nossa inteligência artificial para criar conteúdos impactantes para suas redes sociais
          </p>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="gerador">Gerador de Conteúdo</TabsTrigger>
              <TabsTrigger value="agenda">Agenda Inteligente</TabsTrigger>
            </TabsList>

            <TabsContent value="gerador" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Gerar Novo Conteúdo</CardTitle>
                  <CardDescription>
                    Escolha a plataforma, tipo de conteúdo e forneça detalhes para o nosso assistente criar postagens otimizadas
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="platform">Plataforma</Label>
                      <Select value={platform} onValueChange={setPlatform}>
                        <SelectTrigger id="platform">
                          <SelectValue placeholder="Selecione a plataforma" />
                        </SelectTrigger>
                        <SelectContent>
                          {platforms.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              <div className="flex items-center gap-2">
                                {item.icon}
                                <span>{item.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="type">Tipo de Conteúdo</Label>
                      <Select value={contentType} onValueChange={setContentType}>
                        <SelectTrigger id="type">
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          {contentTypes.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="prompt">Detalhes do Conteúdo</Label>
                    <Textarea
                      id="prompt"
                      placeholder="Ex: Quero um post sobre os benefícios do nosso novo produto, destacando a qualidade e durabilidade"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="pt-2">
                    <Button
                      onClick={handleGenerate}
                      disabled={!platform || !contentType || !prompt || isGenerating}
                      className="bg-purple-600 hover:bg-purple-700 w-full"
                    >
                      {isGenerating ? "Gerando..." : "Gerar Conteúdo"}
                    </Button>
                  </div>

                  {generatedContent && (
                    <div className="mt-6 space-y-4">
                      <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-md border border-purple-200 dark:border-purple-800">
                        <h3 className="font-medium mb-2 text-purple-700 dark:text-purple-300">Conteúdo Gerado:</h3>
                        <div className="whitespace-pre-wrap">{generatedContent}</div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 h-4 w-4"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>
                          Copiar
                        </Button>
                        <Button variant="outline" size="sm">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 h-4 w-4"><path d="M12 5v14"></path><path d="m5 12 7 7 7-7"></path></svg>
                          Baixar
                        </Button>
                        <Button variant="outline" size="sm">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 h-4 w-4"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" x2="12" y1="3" y2="15"></line></svg>
                          Compartilhar
                        </Button>
                        <Button variant="outline" size="sm">
                          <Calendar className="mr-1 h-4 w-4" />
                          Agendar
                        </Button>
                      </div>
                      
                      {suggestedTimes.length > 0 && (
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-200 dark:border-blue-800">
                          <h3 className="font-medium mb-2 flex items-center text-blue-700 dark:text-blue-300">
                            <Lightbulb className="h-4 w-4 mr-2" />
                            Melhores horários para publicação:
                          </h3>
                          <ul className="space-y-2">
                            {suggestedTimes.map((time, index) => (
                              <li key={index} className="flex items-center">
                                <button className="bg-blue-100 dark:bg-blue-800/50 hover:bg-blue-200 dark:hover:bg-blue-700/50 text-left rounded p-2 flex-grow flex items-center">
                                  <Calendar className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
                                  {time}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="agenda" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Agenda Inteligente</CardTitle>
                  <CardDescription>
                    Configure sua estratégia de publicação e deixe nosso sistema sugerir os melhores horários
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Configurações de Publicação</h3>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="frequency">Frequência de Postagem</Label>
                          <Select defaultValue="medium">
                            <SelectTrigger id="frequency">
                              <SelectValue placeholder="Selecione a frequência" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Baixa (1-2 vezes por semana)</SelectItem>
                              <SelectItem value="medium">Média (3-4 vezes por semana)</SelectItem>
                              <SelectItem value="high">Alta (5-7 vezes por semana)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="audience">Perfil da Audiência</Label>
                          <Select defaultValue="general">
                            <SelectTrigger id="audience">
                              <SelectValue placeholder="Selecione o tipo de audiência" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="general">Geral</SelectItem>
                              <SelectItem value="professional">Profissional</SelectItem>
                              <SelectItem value="youth">Jovens (18-25)</SelectItem>
                              <SelectItem value="adult">Adultos (26-45)</SelectItem>
                              <SelectItem value="senior">Seniores (46+)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="content-mix">Mix de Conteúdo</Label>
                          <Select defaultValue="balanced">
                            <SelectTrigger id="content-mix">
                              <SelectValue placeholder="Selecione o mix de conteúdo" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="educational">Educativo</SelectItem>
                              <SelectItem value="promotional">Promocional</SelectItem>
                              <SelectItem value="engagement">Engajamento</SelectItem>
                              <SelectItem value="balanced">Balanceado</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <Button className="mt-2 bg-purple-600 hover:bg-purple-700">
                          Gerar Calendário Sugerido
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium mb-3">Métricas de Performance</h3>
                      
                      <div className="p-4 rounded-md bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Para receber sugestões personalizadas baseadas no seu histórico de performance,
                          conecte suas contas de redes sociais no painel de integrações.
                        </div>
                        
                        <Button variant="outline" className="mt-4">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 h-4 w-4"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" x2="3" y1="12" y2="12"></line></svg>
                          Conectar Redes Sociais
                        </Button>
                      </div>
                      
                      <div className="p-4 rounded-md bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                        <h4 className="font-medium mb-2 text-purple-700 dark:text-purple-300">Dicas de Otimização</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600 mt-0.5"><path d="m12 15 2 2 4-4"></path><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>
                            <span>Utilize hashtags relevantes para aumentar o alcance</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600 mt-0.5"><path d="m12 15 2 2 4-4"></path><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>
                            <span>Posts com imagens têm 150% mais engajamento</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600 mt-0.5"><path d="m12 15 2 2 4-4"></path><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>
                            <span>Vídeos curtos aumentam a taxa de conversão em até 80%</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="w-full md:w-1/3 space-y-6 mt-8 md:mt-0">
          {/* Templates */}
          <Card>
            <CardHeader>
              <CardTitle>Templates Populares</CardTitle>
              <CardDescription>
                Modelos prontos para usar em suas campanhas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <Instagram className="h-4 w-4 mr-2" />
                Carrossel de Produtos
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Facebook className="h-4 w-4 mr-2" />
                Promoção Exclusiva
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2">
                  <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"></path>
                </svg>
                Lista de Benefícios
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Youtube className="h-4 w-4 mr-2" />
                Tutorial em Vídeo
              </Button>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Suas Estatísticas</CardTitle>
              <CardDescription>
                Desempenho dos últimos 30 dias
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Conteúdos Gerados</span>
                  <span className="font-medium">28</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Posts Publicados</span>
                  <span className="font-medium">15</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Engajamento Médio</span>
                  <span className="font-medium text-green-500">+12.5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Sugestões Utilizadas</span>
                  <span className="font-medium">86%</span>
                </div>
              </div>
              <div className="mt-4">
                <Button variant="link" className="p-0 h-auto text-sm">
                  Ver relatório completo →
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContentAssistantPage;
