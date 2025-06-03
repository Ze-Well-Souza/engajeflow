import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, ArrowLeft, Calendar, MessageSquare, BarChart3, Users } from "lucide-react";
import AgendamentoDemo from "@/components/demo/AgendamentoDemo";
import PostagemDemo from "@/components/demo/PostagemDemo";
import GerenciamentoDemo from "@/components/demo/GerenciamentoDemo";

const ContentCreatorDemoPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("agendamento");
  
  const segmentData = {
    title: "Demonstração para Criadores de Conteúdo",
    description: "Experimente as funcionalidades da plataforma adaptadas para gestão de conteúdo e engajamento de audiência",
    icon: <Video className="h-6 w-6 text-blue-500" />,
    color: "blue",
    features: [
      {
        icon: <Calendar className="h-6 w-6 text-blue-500" />,
        title: "Agendamento de Conteúdo",
        description: "Planeje e agende seus vídeos e posts com antecedência"
      },
      {
        icon: <Video className="h-6 w-6 text-blue-500" />,
        title: "Gestão de Múltiplas Plataformas",
        description: "Publique simultaneamente em YouTube, Instagram, TikTok e mais"
      },
      {
        icon: <MessageSquare className="h-6 w-6 text-blue-500" />,
        title: "Engajamento com a Audiência",
        description: "Responda comentários e mensagens diretamente da plataforma"
      },
      {
        icon: <BarChart3 className="h-6 w-6 text-blue-500" />,
        title: "Análise de Desempenho",
        description: "Acompanhe métricas de visualizações, likes, comentários e compartilhamentos"
      }
    ],
    postagemConfig: {
      title: "Gestão de Conteúdo para Criadores",
      postTypes: [
        { id: "1", name: "Vídeo Tutorial" },
        { id: "2", name: "Behind the Scenes" },
        { id: "3", name: "Colaboração" },
        { id: "4", name: "Produto/Review" }
      ],
      scheduledPosts: [
        { 
          id: "1", 
          title: "Tutorial de Maquiagem para Iniciantes", 
          type: "Vídeo Tutorial", 
          date: "24/05/2025", 
          platforms: ["YouTube", "Instagram", "TikTok"]
        },
        { 
          id: "2", 
          title: "Bastidores da Gravação", 
          type: "Behind the Scenes", 
          date: "26/05/2025", 
          platforms: ["Instagram", "TikTok"]
        },
        { 
          id: "3", 
          title: "Collab com @influencer", 
          type: "Colaboração", 
          date: "28/05/2025", 
          platforms: ["YouTube", "Instagram"]
        }
      ],
      publishedPosts: [
        { 
          id: "4", 
          title: "Review Produtos Skincare", 
          type: "Produto/Review", 
          date: "15/05/2025", 
          platforms: ["YouTube", "Instagram", "TikTok"],
          stats: { 
            views: 15420,
            likes: 1250, 
            comments: 89, 
            shares: 234 
          }
        },
        { 
          id: "5", 
          title: "Rotina Matinal de Verão", 
          type: "Vídeo Tutorial", 
          date: "10/05/2025", 
          platforms: ["YouTube", "Instagram"],
          stats: { 
            views: 8750,
            likes: 892, 
            comments: 156, 
            shares: 67 
          }
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
            <Tabs defaultValue="agendamento" onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="agendamento">Agendamento</TabsTrigger>
                <TabsTrigger value="postagem">Conteúdo</TabsTrigger>
                <TabsTrigger value="gerenciamento">Audiência</TabsTrigger>
              </TabsList>
              <TabsContent value="agendamento">
                <AgendamentoDemo />
              </TabsContent>
              <TabsContent value="postagem">
                <PostagemDemo 
                  title={segmentData.postagemConfig.title}
                  postTypes={segmentData.postagemConfig.postTypes}
                  scheduledPosts={segmentData.postagemConfig.scheduledPosts}
                  publishedPosts={segmentData.postagemConfig.publishedPosts}
                />
              </TabsContent>
              <TabsContent value="gerenciamento">
                <GerenciamentoDemo />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContentCreatorDemoPage;
