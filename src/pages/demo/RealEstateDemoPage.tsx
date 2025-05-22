import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, ArrowLeft, Home, Calendar, MessageSquare, BarChart3 } from "lucide-react";
import AgendamentoDemo from "@/components/demo/AgendamentoDemo";
import PostagemDemo from "@/components/demo/PostagemDemo";
import GerenciamentoDemo from "@/components/demo/GerenciamentoDemo";

const RealEstateDemoPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("agendamento");
  
  // Dados específicos para o segmento de corretor de imóveis
  const segmentData = {
    title: "Demonstração para Corretores de Imóveis",
    description: "Experimente as funcionalidades da plataforma adaptadas para o mercado imobiliário",
    icon: <Building className="h-6 w-6 text-blue-500" />,
    color: "blue",
    features: [
      {
        icon: <Calendar className="h-6 w-6 text-blue-500" />,
        title: "Agendamento de Visitas",
        description: "Organize visitas aos imóveis com confirmação automática para clientes"
      },
      {
        icon: <Home className="h-6 w-6 text-blue-500" />,
        title: "Portfólio de Imóveis",
        description: "Gerencie seu catálogo com fotos, vídeos e informações detalhadas"
      },
      {
        icon: <MessageSquare className="h-6 w-6 text-blue-500" />,
        title: "Automação de Mensagens",
        description: "Envie atualizações e novidades para clientes interessados"
      },
      {
        icon: <BarChart3 className="h-6 w-6 text-blue-500" />,
        title: "Análise de Desempenho",
        description: "Acompanhe métricas de visitas, contatos e vendas"
      }
    ],
    agendamentoConfig: {
      title: "Agendamento de Visitas a Imóveis",
      services: [
        { id: "1", name: "Visita a Apartamento" },
        { id: "2", name: "Visita a Casa" },
        { id: "3", name: "Avaliação de Imóvel" },
        { id: "4", name: "Consultoria" }
      ],
      professionals: [
        { id: "1", name: "Carlos Silva" },
        { id: "2", name: "Ana Oliveira" },
        { id: "3", name: "Roberto Santos" }
      ],
      timeSlots: [
        "08:00", "09:00", "10:00", "11:00", 
        "13:00", "14:00", "15:00", "16:00", "17:00"
      ]
    },
    postagemConfig: {
      title: "Gestão de Conteúdo Imobiliário",
      postTypes: [
        { id: "1", name: "Novo Imóvel" },
        { id: "2", name: "Destaque da Semana" },
        { id: "3", name: "Dica de Decoração" },
        { id: "4", name: "Notícia do Mercado" }
      ],
      scheduledPosts: [
        { 
          id: "1", 
          title: "Lançamento Residencial Jardins", 
          type: "Novo Imóvel", 
          date: "24/05/2025", 
          platforms: ["Instagram", "Facebook", "WhatsApp"]
        },
        { 
          id: "2", 
          title: "Apartamento com Vista para o Mar", 
          type: "Destaque da Semana", 
          date: "26/05/2025", 
          platforms: ["Instagram", "Facebook"]
        },
        { 
          id: "3", 
          title: "5 Dicas para Valorizar seu Imóvel", 
          type: "Dica de Decoração", 
          date: "28/05/2025", 
          platforms: ["Instagram", "Facebook", "WhatsApp"]
        }
      ],
      publishedPosts: [
        { 
          id: "4", 
          title: "Casa em Condomínio Fechado", 
          type: "Novo Imóvel", 
          date: "15/05/2025", 
          platforms: ["Instagram", "Facebook", "WhatsApp"],
          stats: { likes: 45, comments: 12, shares: 8 }
        },
        { 
          id: "5", 
          title: "Cobertura Duplex no Centro", 
          type: "Destaque da Semana", 
          date: "10/05/2025", 
          platforms: ["Instagram", "Facebook"],
          stats: { likes: 67, comments: 23, shares: 15 }
        },
        { 
          id: "6", 
          title: "Tendências do Mercado Imobiliário 2025", 
          type: "Notícia do Mercado", 
          date: "05/05/2025", 
          platforms: ["Instagram", "Facebook", "WhatsApp"],
          stats: { likes: 38, comments: 7, shares: 12 }
        }
      ]
    },
    gerenciamentoConfig: {
      title: "Gerenciamento de Clientes Imobiliários",
      clients: [
        { 
          id: "1", 
          name: "João Silva", 
          email: "joao.silva@email.com", 
          phone: "(11) 98765-4321",
          interest: "Apartamentos 2-3 quartos",
          lastContact: "18/05/2025"
        },
        { 
          id: "2", 
          name: "Maria Oliveira", 
          email: "maria.oliveira@email.com", 
          phone: "(11) 91234-5678",
          interest: "Casas em condomínio",
          lastContact: "20/05/2025"
        },
        { 
          id: "3", 
          name: "Pedro Santos", 
          email: "pedro.santos@email.com", 
          phone: "(11) 99876-5432",
          interest: "Imóveis comerciais",
          lastContact: "15/05/2025"
        },
        { 
          id: "4", 
          name: "Ana Costa", 
          email: "ana.costa@email.com", 
          phone: "(11) 92345-6789",
          interest: "Apartamentos de luxo",
          lastContact: "21/05/2025"
        }
      ],
      messages: [
        {
          id: "1",
          client: "João Silva",
          date: "18/05/2025",
          subject: "Visita ao Apartamento",
          preview: "Olá João, confirmo nossa visita ao apartamento no Jardins amanhã às 10h..."
        },
        {
          id: "2",
          client: "Maria Oliveira",
          date: "20/05/2025",
          subject: "Proposta de Compra",
          preview: "Prezada Maria, recebi sua proposta para a casa no condomínio Bosque Verde..."
        },
        {
          id: "3",
          client: "Pedro Santos",
          date: "15/05/2025",
          subject: "Novos Imóveis Comerciais",
          preview: "Pedro, temos novas opções de salas comerciais que podem te interessar..."
        }
      ],
      automations: [
        {
          id: "1",
          name: "Lembrete de visita",
          description: "Envia lembrete 24h antes da visita agendada",
          status: true
        },
        {
          id: "2",
          name: "Acompanhamento pós-visita",
          description: "Envia mensagem 2 dias após a visita para feedback",
          status: true
        },
        {
          id: "3",
          name: "Novidades mensais",
          description: "Envia novos imóveis de acordo com o perfil do cliente",
          status: false
        },
        {
          id: "4",
          name: "Aniversário do cliente",
          description: "Envia mensagem de felicitações no aniversário",
          status: true
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
          <Link to="/landing/realestate">
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
                <Button className={`bg-${segmentData.color}-600 hover:bg-${segmentData.color}-700`}>
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
                <TabsTrigger value="postagem">Postagem</TabsTrigger>
                <TabsTrigger value="gerenciamento">Gerenciamento</TabsTrigger>
              </TabsList>
              <TabsContent value="agendamento">
                <AgendamentoDemo 
                  segment="realestate" 
                  title={segmentData.agendamentoConfig.title}
                  services={segmentData.agendamentoConfig.services}
                  professionals={segmentData.agendamentoConfig.professionals}
                  timeSlots={segmentData.agendamentoConfig.timeSlots}
                />
              </TabsContent>
              <TabsContent value="postagem">
                <PostagemDemo 
                  segment="realestate" 
                  title={segmentData.postagemConfig.title}
                  postTypes={segmentData.postagemConfig.postTypes}
                  scheduledPosts={segmentData.postagemConfig.scheduledPosts}
                  publishedPosts={segmentData.postagemConfig.publishedPosts}
                />
              </TabsContent>
              <TabsContent value="gerenciamento">
                <GerenciamentoDemo 
                  segment="realestate" 
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

export default RealEstateDemoPage;
