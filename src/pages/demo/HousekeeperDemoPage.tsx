import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, ArrowLeft, Calendar, MessageSquare, BarChart3, Home } from "lucide-react";
import AgendamentoDemo from "@/components/demo/AgendamentoDemo";
import PostagemDemo from "@/components/demo/PostagemDemo";
import GerenciamentoDemo from "@/components/demo/GerenciamentoDemo";

const HousekeeperDemoPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("agendamento");
  
  const segmentData = {
    title: "Demonstração para Profissionais de Limpeza",
    description: "Experimente as funcionalidades da plataforma adaptadas para serviços de limpeza doméstica e comercial",
    icon: <Sparkles className="h-6 w-6 text-purple-500" />,
    color: "purple",
    features: [
      {
        icon: <Calendar className="h-6 w-6 text-purple-500" />,
        title: "Agendamento de Serviços",
        description: "Organize sua agenda com confirmação automática para clientes"
      },
      {
        icon: <Home className="h-6 w-6 text-purple-500" />,
        title: "Gerenciamento de Imóveis",
        description: "Cadastre e gerencie os imóveis dos seus clientes"
      },
      {
        icon: <MessageSquare className="h-6 w-6 text-purple-500" />,
        title: "Automação de Mensagens",
        description: "Envie lembretes e promoções para sua base de clientes"
      },
      {
        icon: <BarChart3 className="h-6 w-6 text-purple-500" />,
        title: "Análise de Desempenho",
        description: "Acompanhe métricas de agendamentos, fidelização e vendas"
      }
    ],
    agendamentoConfig: {
      title: "Agendamento de Serviços de Limpeza",
      services: [
        { id: "1", name: "Limpeza Residencial" },
        { id: "2", name: "Limpeza de Apartamento" },
        { id: "3", name: "Limpeza Comercial" },
        { id: "4", name: "Limpeza Pós-Festa" }
      ],
      timeSlots: [
        "08:00", "09:00", "10:00", "14:00", "15:00", "16:00"
      ]
    },
    postagemConfig: {
      title: "Gestão de Conteúdo para Limpeza",
      postTypes: [
        { id: "1", name: "Dicas de Limpeza" },
        { id: "2", name: "Promoções" },
        { id: "3", name: "Antes e Depois" },
        { id: "4", name: "Serviços" }
      ],
      scheduledPosts: [
        { 
          id: "1", 
          title: "Dicas para Limpar a Casa", 
          type: "Dicas de Limpeza", 
          date: "24/05/2025", 
          platforms: ["Instagram", "Facebook", "WhatsApp"]
        },
        { 
          id: "2", 
          title: "Promoção de Primavera", 
          type: "Promoções", 
          date: "26/05/2025", 
          platforms: ["Instagram", "Facebook", "WhatsApp"]
        },
        { 
          id: "3", 
          title: "Limpeza Pós-Obra", 
          type: "Serviços", 
          date: "28/05/2025", 
          platforms: ["Instagram", "Facebook"]
        }
      ],
      publishedPosts: [
        { 
          id: "4", 
          title: "Limpeza de Sofá Antes e Depois", 
          type: "Antes e Depois", 
          date: "15/05/2025", 
          platforms: ["Instagram", "Facebook", "WhatsApp"],
          stats: { likes: 87, comments: 23, shares: 12 }
        },
        { 
          id: "5", 
          title: "Promoção de Aniversário", 
          type: "Promoções", 
          date: "10/05/2025", 
          platforms: ["Instagram", "Facebook", "WhatsApp"],
          stats: { likes: 112, comments: 45, shares: 38 }
        },
        { 
          id: "6", 
          title: "Limpeza Comercial", 
          type: "Serviços", 
          date: "05/05/2025", 
          platforms: ["Instagram", "Facebook"],
          stats: { likes: 64, comments: 18, shares: 9 }
        }
      ]
    },
    gerenciamentoConfig: {
      title: "Gerenciamento de Clientes de Limpeza",
      clients: [
        { 
          id: "1", 
          name: "Fernanda Lima", 
          email: "fernanda.lima@email.com", 
          phone: "(11) 98765-4321",
          interest: "Limpeza residencial",
          lastContact: "18/05/2025"
        },
        { 
          id: "2", 
          name: "Roberto Martins", 
          email: "roberto.martins@email.com", 
          phone: "(11) 91234-5678",
          interest: "Limpeza comercial",
          lastContact: "20/05/2025"
        },
        { 
          id: "3", 
          name: "Carla Souza", 
          email: "carla.souza@email.com", 
          phone: "(11) 99876-5432",
          interest: "Limpeza pós-obra",
          lastContact: "15/05/2025"
        },
        { 
          id: "4", 
          name: "Marcelo Costa", 
          email: "marcelo.costa@email.com", 
          phone: "(11) 92345-6789",
          interest: "Limpeza de apartamento",
          lastContact: "21/05/2025"
        }
      ],
      messages: [
        {
          id: "1",
          client: "Fernanda Lima",
          date: "18/05/2025",
          subject: "Confirmação de Agendamento",
          preview: "Olá Fernanda, confirmamos seu agendamento para limpeza residencial amanhã às 14h..."
        },
        {
          id: "2",
          client: "Roberto Martins",
          date: "20/05/2025",
          subject: "Lembrete de Retorno",
          preview: "Roberto, já faz um mês desde sua última limpeza. Que tal agendar um retorno?..."
        },
        {
          id: "3",
          client: "Carla Souza",
          date: "15/05/2025",
          subject: "Promoção Especial",
          preview: "Carla, temos uma promoção especial de limpeza pós-obra que pode te interessar..."
        }
      ],
      automations: [
        {
          id: "1",
          name: "Lembrete de agendamento",
          description: "Envia lembrete 24h antes do horário marcado",
          status: true
        },
        {
          id: "2",
          name: "Retorno mensal",
          description: "Convida cliente para retorno após 30 dias",
          status: true
        },
        {
          id: "3",
          name: "Feedback pós-atendimento",
          description: "Solicita avaliação 2 dias após o serviço",
          status: true
        },
        {
          id: "4",
          name: "Aniversário do cliente",
          description: "Envia mensagem de felicitações e desconto especial",
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
          <Link to="/landing/housekeeper">
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
                <Button className="bg-purple-600 hover:bg-purple-700">
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
                <TabsTrigger value="postagem">Portfólio</TabsTrigger>
                <TabsTrigger value="gerenciamento">Clientes</TabsTrigger>
              </TabsList>
              <TabsContent value="agendamento">
                <AgendamentoDemo />
              </TabsContent>
              <TabsContent value="postagem">
                <PostagemDemo />
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

export default HousekeeperDemoPage;
