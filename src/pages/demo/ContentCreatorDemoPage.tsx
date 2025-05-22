import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, ArrowLeft, Calendar, MessageSquare, BarChart3, Camera } from "lucide-react";
import AgendamentoDemo from "@/components/demo/AgendamentoDemo";
import PostagemDemo from "@/components/demo/PostagemDemo";
import GerenciamentoDemo from "@/components/demo/GerenciamentoDemo";

const ContentCreatorDemoPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("postagem");
  
  // Dados específicos para o segmento de criador de conteúdo
  const segmentData = {
    title: "Demonstração para Criadores de Conteúdo",
    description: "Experimente as funcionalidades da plataforma adaptadas para criadores de conteúdo digital",
    icon: <Video className="h-6 w-6 text-blue-500" />,
    color: "blue",
    features: [
      {
        icon: <Calendar className="h-6 w-6 text-blue-500" />,
        title: "Agendamento de Posts",
        description: "Programe conteúdo para todas as suas redes sociais com semanas de antecedência"
      },
      {
        icon: <Camera className="h-6 w-6 text-blue-500" />,
        title: "Banco de Mídia",
        description: "Organize e acesse suas fotos e vídeos em um repositório centralizado na nuvem"
      },
      {
        icon: <MessageSquare className="h-6 w-6 text-blue-500" />,
        title: "Assistente IA",
        description: "Gere ideias, legendas e hashtags otimizados para cada plataforma"
      },
      {
        icon: <BarChart3 className="h-6 w-6 text-blue-500" />,
        title: "Analytics Avançado",
        description: "Acompanhe métricas de engajamento, crescimento e conversão em todas as plataformas"
      }
    ],
    agendamentoConfig: {
      title: "Agendamento de Conteúdo",
      services: [
        { id: "1", name: "Post no Instagram" },
        { id: "2", name: "Vídeo para TikTok" },
        { id: "3", name: "Vídeo para YouTube" },
        { id: "4", name: "Post no Facebook" },
        { id: "5", name: "Tweet" }
      ],
      professionals: [
        { id: "1", name: "Publicação Imediata" },
        { id: "2", name: "Agendamento Único" },
        { id: "3", name: "Agendamento Recorrente" }
      ],
      timeSlots: [
        "08:00", "10:00", "12:00", 
        "14:00", "16:00", "18:00", "20:00", "22:00"
      ]
    },
    postagemConfig: {
      title: "Gestão de Conteúdo Digital",
      postTypes: [
        { id: "1", name: "Foto/Carrossel" },
        { id: "2", name: "Vídeo Curto" },
        { id: "3", name: "Vídeo Longo" },
        { id: "4", name: "Stories" },
        { id: "5", name: "Texto" }
      ],
      scheduledPosts: [
        { 
          id: "1", 
          title: "Dicas de Produtividade", 
          type: "Carrossel", 
          date: "24/05/2025", 
          platforms: ["Instagram", "Facebook"]
        },
        { 
          id: "2", 
          title: "Tutorial de Maquiagem", 
          type: "Vídeo Curto", 
          date: "26/05/2025", 
          platforms: ["TikTok", "Instagram", "YouTube"]
        },
        { 
          id: "3", 
          title: "Review do Novo iPhone", 
          type: "Vídeo Longo", 
          date: "28/05/2025", 
          platforms: ["YouTube"]
        }
      ],
      publishedPosts: [
        { 
          id: "4", 
          title: "10 Dicas de Fotografia", 
          type: "Carrossel", 
          date: "15/05/2025", 
          platforms: ["Instagram", "Facebook"],
          stats: { likes: 1245, comments: 87, shares: 230 }
        },
        { 
          id: "5", 
          title: "Desafio de Dança", 
          type: "Vídeo Curto", 
          date: "10/05/2025", 
          platforms: ["TikTok", "Instagram"],
          stats: { likes: 3580, comments: 412, shares: 1245 }
        },
        { 
          id: "6", 
          title: "Como Ganhar Dinheiro Online", 
          type: "Vídeo Longo", 
          date: "05/05/2025", 
          platforms: ["YouTube"],
          stats: { views: 12876, likes: 876, comments: 134 }
        }
      ]
    },
    gerenciamentoConfig: {
      title: "Gerenciamento de Comunidade",
      clients: [
        { 
          id: "1", 
          name: "Instagram", 
          followers: "45.2K",
          engagement: "3.8%",
          growth: "+2.3%",
          lastPost: "18/05/2025"
        },
        { 
          id: "2", 
          name: "TikTok", 
          followers: "78.5K",
          engagement: "5.2%",
          growth: "+4.7%",
          lastPost: "20/05/2025"
        },
        { 
          id: "3", 
          name: "YouTube", 
          followers: "12.8K",
          engagement: "8.1%",
          growth: "+1.2%",
          lastPost: "15/05/2025"
        },
        { 
          id: "4", 
          name: "Facebook", 
          followers: "32.1K",
          engagement: "1.9%",
          growth: "+0.5%",
          lastPost: "21/05/2025"
        }
      ],
      messages: [
        {
          id: "1",
          client: "Instagram",
          date: "18/05/2025",
          subject: "Comentário de @maria.silva",
          preview: "Amei esse conteúdo! Você poderia fazer um tutorial sobre como editar fotos?"
        },
        {
          id: "2",
          client: "YouTube",
          date: "15/05/2025",
          subject: "Comentário de @tech_lover",
          preview: "Ótimo vídeo! Qual câmera você usa para gravar? A qualidade está incrível!"
        },
        {
          id: "3",
          client: "TikTok",
          date: "20/05/2025",
          subject: "Mensagem Direta de @danca_brasil",
          preview: "Adorei seu último vídeo! Gostaria de fazer uma parceria para divulgar minha marca..."
        }
      ],
      automations: [
        {
          id: "1",
          name: "Resposta a comentários",
          description: "Responde automaticamente a comentários frequentes",
          status: true
        },
        {
          id: "2",
          name: "Agradecimento a novos seguidores",
          description: "Envia mensagem de boas-vindas para novos seguidores",
          status: true
        },
        {
          id: "3",
          name: "Relatório semanal de desempenho",
          description: "Envia relatório com métricas de crescimento toda segunda-feira",
          status: true
        },
        {
          id: "4",
          name: "Sugestão de conteúdo",
          description: "Sugere ideias de conteúdo com base nas tendências atuais",
          status: false
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {/* Header */}
      <header className="bg-white dark:bg-gray-950 border-b dark:border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            {segmentData.icon}
            <h1 className="text-2xl font-bold">{segmentData.title}</h1>
          </div>
          <Link to="/landing/content-creator">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Voltar
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              {segmentData.description}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/register">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Começar gratuitamente
                </Button>
              </Link>
              <Link to="/landing/pricing">
                <Button variant="outline">Ver planos e preços</Button>
              </Link>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {segmentData.features.map((feature, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    {feature.icon}
                    <CardTitle>{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Demo Tabs */}
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
            <Tabs defaultValue="postagem" onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="agendamento">Calendário</TabsTrigger>
                <TabsTrigger value="postagem">Conteúdo</TabsTrigger>
                <TabsTrigger value="gerenciamento">Analytics</TabsTrigger>
              </TabsList>
              <TabsContent value="agendamento">
                <AgendamentoDemo 
                  segment="content-creator" 
                  title={segmentData.agendamentoConfig.title}
                  services={segmentData.agendamentoConfig.services}
                  professionals={segmentData.agendamentoConfig.professionals}
                  timeSlots={segmentData.agendamentoConfig.timeSlots}
                />
              </TabsContent>
              <TabsContent value="postagem">
                <PostagemDemo 
                  segment="content-creator" 
                  title={segmentData.postagemConfig.title}
                  postTypes={segmentData.postagemConfig.postTypes}
                  scheduledPosts={segmentData.postagemConfig.scheduledPosts}
                  publishedPosts={segmentData.postagemConfig.publishedPosts}
                />
              </TabsContent>
              <TabsContent value="gerenciamento">
                <GerenciamentoDemo 
                  segment="content-creator" 
                  title={segmentData.gerenciamentoConfig.title}
                  clients={segmentData.gerenciamentoConfig.clients}
                  messages={segmentData.gerenciamentoConfig.messages}
                  automations={segmentData.gerenciamentoConfig.automations}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-950 border-t dark:border-gray-800 mt-12 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} EngageFlow. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ContentCreatorDemoPage;
