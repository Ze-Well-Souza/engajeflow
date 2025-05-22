import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, ArrowLeft, Calendar, MessageSquare, BarChart3, Broom } from "lucide-react";
import AgendamentoDemo from "@/components/demo/AgendamentoDemo";
import PostagemDemo from "@/components/demo/PostagemDemo";
import GerenciamentoDemo from "@/components/demo/GerenciamentoDemo";

const HousekeeperDemoPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("agendamento");
  
  // Dados específicos para o segmento de diarista
  const segmentData = {
    title: "Demonstração para Diaristas",
    description: "Experimente as funcionalidades da plataforma adaptadas para profissionais de limpeza doméstica",
    icon: <Broom className="h-6 w-6 text-teal-500" />,
    color: "teal",
    features: [
      {
        icon: <Calendar className="h-6 w-6 text-teal-500" />,
        title: "Agendamento de Serviços",
        description: "Organize sua agenda com confirmação automática para clientes"
      },
      {
        icon: <Home className="h-6 w-6 text-teal-500" />,
        title: "Portfólio de Trabalhos",
        description: "Mostre seus serviços com fotos antes e depois da limpeza"
      },
      {
        icon: <MessageSquare className="h-6 w-6 text-teal-500" />,
        title: "Automação de Mensagens",
        description: "Envie lembretes e confirmações para seus clientes"
      },
      {
        icon: <BarChart3 className="h-6 w-6 text-teal-500" />,
        title: "Análise de Desempenho",
        description: "Acompanhe métricas de agendamentos, fidelização e receitas"
      }
    ],
    agendamentoConfig: {
      title: "Agendamento de Serviços de Limpeza",
      services: [
        { id: "1", name: "Limpeza Residencial" },
        { id: "2", name: "Limpeza Pós-obra" },
        { id: "3", name: "Limpeza de Escritório" },
        { id: "4", name: "Passadoria" },
        { id: "5", name: "Limpeza de Vidros" }
      ],
      professionals: [
        { id: "1", name: "Diária Completa (8h)" },
        { id: "2", name: "Meia Diária (4h)" },
        { id: "3", name: "Serviço Específico" }
      ],
      timeSlots: [
        "08:00", "09:00", "10:00", "11:00", 
        "13:00", "14:00", "15:00", "16:00"
      ]
    },
    postagemConfig: {
      title: "Portfólio de Serviços",
      postTypes: [
        { id: "1", name: "Antes e Depois" },
        { id: "2", name: "Promoção" },
        { id: "3", name: "Dica de Limpeza" },
        { id: "4", name: "Depoimento de Cliente" }
      ],
      scheduledPosts: [
        { 
          id: "1", 
          title: "Transformação Sala Pós-festa", 
          type: "Antes e Depois", 
          date: "24/05/2025", 
          platforms: ["Instagram", "Facebook", "WhatsApp"]
        },
        { 
          id: "2", 
          title: "Promoção de Maio: 15% OFF", 
          type: "Promoção", 
          date: "26/05/2025", 
          platforms: ["Instagram", "Facebook", "WhatsApp"]
        },
        { 
          id: "3", 
          title: "5 Dicas para Limpeza de Vidros", 
          type: "Dica de Limpeza", 
          date: "28/05/2025", 
          platforms: ["Instagram", "Facebook"]
        }
      ],
      publishedPosts: [
        { 
          id: "4", 
          title: "Limpeza Pós-obra Completa", 
          type: "Antes e Depois", 
          date: "15/05/2025", 
          platforms: ["Instagram", "Facebook", "WhatsApp"],
          stats: { likes: 67, comments: 13, shares: 8 }
        },
        { 
          id: "5", 
          title: "Pacote Semanal com Desconto", 
          type: "Promoção", 
          date: "10/05/2025", 
          platforms: ["Instagram", "Facebook", "WhatsApp"],
          stats: { likes: 82, comments: 25, shares: 18 }
        },
        { 
          id: "6", 
          title: "Depoimento da Cliente Sandra", 
          type: "Depoimento de Cliente", 
          date: "05/05/2025", 
          platforms: ["Instagram", "Facebook"],
          stats: { likes: 54, comments: 11, shares: 5 }
        }
      ]
    },
    gerenciamentoConfig: {
      title: "Gerenciamento de Clientes",
      clients: [
        { 
          id: "1", 
          name: "Renata Alves", 
          email: "renata.alves@email.com", 
          phone: "(11) 98765-4321",
          address: "Rua das Flores, 123",
          frequency: "Semanal"
        },
        { 
          id: "2", 
          name: "Marcelo Santos", 
          email: "marcelo.santos@email.com", 
          phone: "(11) 91234-5678",
          address: "Av. Paulista, 1000",
          frequency: "Quinzenal"
        },
        { 
          id: "3", 
          name: "Juliana Costa", 
          email: "juliana.costa@email.com", 
          phone: "(11) 99876-5432",
          address: "Rua Augusta, 500",
          frequency: "Mensal"
        },
        { 
          id: "4", 
          name: "Roberto Lima", 
          email: "roberto.lima@email.com", 
          phone: "(11) 92345-6789",
          address: "Rua Oscar Freire, 200",
          frequency: "Eventual"
        }
      ],
      messages: [
        {
          id: "1",
          client: "Renata Alves",
          date: "18/05/2025",
          subject: "Confirmação de Agendamento",
          preview: "Olá Renata, confirmamos seu agendamento para limpeza residencial amanhã às 8h..."
        },
        {
          id: "2",
          client: "Marcelo Santos",
          date: "20/05/2025",
          subject: "Alteração de Horário",
          preview: "Prezado Marcelo, conforme solicitado, alteramos seu horário de limpeza para 14h..."
        },
        {
          id: "3",
          client: "Juliana Costa",
          date: "15/05/2025",
          subject: "Lembrete de Agendamento",
          preview: "Juliana, não esqueça que amanhã teremos a limpeza mensal agendada às 9h..."
        }
      ],
      automations: [
        {
          id: "1",
          name: "Lembrete de agendamento",
          description: "Envia lembrete 24h antes do serviço agendado",
          status: true
        },
        {
          id: "2",
          name: "Confirmação de presença",
          description: "Envia mensagem quando diarista chega ao local",
          status: true
        },
        {
          id: "3",
          name: "Feedback pós-serviço",
          description: "Solicita avaliação após conclusão do serviço",
          status: true
        },
        {
          id: "4",
          name: "Lembrete de reagendamento",
          description: "Sugere novo agendamento para clientes eventuais",
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
                <Button className="bg-teal-600 hover:bg-teal-700">
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
                <AgendamentoDemo 
                  segment="housekeeper" 
                  title={segmentData.agendamentoConfig.title}
                  services={segmentData.agendamentoConfig.services}
                  professionals={segmentData.agendamentoConfig.professionals}
                  timeSlots={segmentData.agendamentoConfig.timeSlots}
                />
              </TabsContent>
              <TabsContent value="postagem">
                <PostagemDemo 
                  segment="housekeeper" 
                  title={segmentData.postagemConfig.title}
                  postTypes={segmentData.postagemConfig.postTypes}
                  scheduledPosts={segmentData.postagemConfig.scheduledPosts}
                  publishedPosts={segmentData.postagemConfig.publishedPosts}
                />
              </TabsContent>
              <TabsContent value="gerenciamento">
                <GerenciamentoDemo 
                  segment="housekeeper" 
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

export default HousekeeperDemoPage;
