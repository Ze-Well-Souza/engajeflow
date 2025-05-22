import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Brush, ArrowLeft, Calendar, MessageSquare, BarChart3, Scissors } from "lucide-react";
import AgendamentoDemo from "@/components/demo/AgendamentoDemo";
import PostagemDemo from "@/components/demo/PostagemDemo";
import GerenciamentoDemo from "@/components/demo/GerenciamentoDemo";

const BeautyDemoPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("agendamento");
  
  // Dados específicos para o segmento de beleza e estética
  const segmentData = {
    title: "Demonstração para Profissionais de Beleza",
    description: "Experimente as funcionalidades da plataforma adaptadas para salões de beleza e profissionais de estética",
    icon: <Scissors className="h-6 w-6 text-pink-500" />,
    color: "pink",
    features: [
      {
        icon: <Calendar className="h-6 w-6 text-pink-500" />,
        title: "Agendamento de Serviços",
        description: "Organize sua agenda com confirmação automática para clientes"
      },
      {
        icon: <Brush className="h-6 w-6 text-pink-500" />,
        title: "Portfólio de Trabalhos",
        description: "Mostre seus melhores trabalhos com fotos antes e depois"
      },
      {
        icon: <MessageSquare className="h-6 w-6 text-pink-500" />,
        title: "Automação de Mensagens",
        description: "Envie lembretes e promoções para sua base de clientes"
      },
      {
        icon: <BarChart3 className="h-6 w-6 text-pink-500" />,
        title: "Análise de Desempenho",
        description: "Acompanhe métricas de agendamentos, fidelização e vendas"
      }
    ],
    agendamentoConfig: {
      title: "Agendamento de Serviços de Beleza",
      services: [
        { id: "1", name: "Corte de Cabelo" },
        { id: "2", name: "Coloração" },
        { id: "3", name: "Manicure e Pedicure" },
        { id: "4", name: "Design de Sobrancelhas" },
        { id: "5", name: "Tratamento Facial" }
      ],
      professionals: [
        { id: "1", name: "Juliana Almeida" },
        { id: "2", name: "Ricardo Santos" },
        { id: "3", name: "Camila Oliveira" }
      ],
      timeSlots: [
        "09:00", "10:00", "11:00", "12:00", 
        "14:00", "15:00", "16:00", "17:00", "18:00"
      ]
    },
    postagemConfig: {
      title: "Gestão de Conteúdo para Beleza",
      postTypes: [
        { id: "1", name: "Antes e Depois" },
        { id: "2", name: "Promoção" },
        { id: "3", name: "Dica de Beleza" },
        { id: "4", name: "Novos Serviços" }
      ],
      scheduledPosts: [
        { 
          id: "1", 
          title: "Transformação Loiro Platinado", 
          type: "Antes e Depois", 
          date: "24/05/2025", 
          platforms: ["Instagram", "Facebook", "WhatsApp"]
        },
        { 
          id: "2", 
          title: "Promoção de Quinta: 20% OFF", 
          type: "Promoção", 
          date: "26/05/2025", 
          platforms: ["Instagram", "Facebook", "WhatsApp"]
        },
        { 
          id: "3", 
          title: "5 Dicas para Cabelos Saudáveis", 
          type: "Dica de Beleza", 
          date: "28/05/2025", 
          platforms: ["Instagram", "Facebook"]
        }
      ],
      publishedPosts: [
        { 
          id: "4", 
          title: "Corte Moderno Masculino", 
          type: "Antes e Depois", 
          date: "15/05/2025", 
          platforms: ["Instagram", "Facebook", "WhatsApp"],
          stats: { likes: 87, comments: 23, shares: 12 }
        },
        { 
          id: "5", 
          title: "Promoção de Aniversário", 
          type: "Promoção", 
          date: "10/05/2025", 
          platforms: ["Instagram", "Facebook", "WhatsApp"],
          stats: { likes: 112, comments: 45, shares: 38 }
        },
        { 
          id: "6", 
          title: "Novos Tratamentos Capilares", 
          type: "Novos Serviços", 
          date: "05/05/2025", 
          platforms: ["Instagram", "Facebook"],
          stats: { likes: 64, comments: 18, shares: 9 }
        }
      ]
    },
    gerenciamentoConfig: {
      title: "Gerenciamento de Clientes de Beleza",
      clients: [
        { 
          id: "1", 
          name: "Fernanda Lima", 
          email: "fernanda.lima@email.com", 
          phone: "(11) 98765-4321",
          interest: "Coloração e tratamentos",
          lastContact: "18/05/2025"
        },
        { 
          id: "2", 
          name: "Roberto Martins", 
          email: "roberto.martins@email.com", 
          phone: "(11) 91234-5678",
          interest: "Corte masculino",
          lastContact: "20/05/2025"
        },
        { 
          id: "3", 
          name: "Carla Souza", 
          email: "carla.souza@email.com", 
          phone: "(11) 99876-5432",
          interest: "Manicure e pedicure",
          lastContact: "15/05/2025"
        },
        { 
          id: "4", 
          name: "Marcelo Costa", 
          email: "marcelo.costa@email.com", 
          phone: "(11) 92345-6789",
          interest: "Barba e cabelo",
          lastContact: "21/05/2025"
        }
      ],
      messages: [
        {
          id: "1",
          client: "Fernanda Lima",
          date: "18/05/2025",
          subject: "Confirmação de Agendamento",
          preview: "Olá Fernanda, confirmamos seu agendamento para coloração amanhã às 14h..."
        },
        {
          id: "2",
          client: "Roberto Martins",
          date: "20/05/2025",
          subject: "Lembrete de Retorno",
          preview: "Roberto, já faz um mês desde seu último corte. Que tal agendar um retorno?..."
        },
        {
          id: "3",
          client: "Carla Souza",
          date: "15/05/2025",
          subject: "Promoção Especial",
          preview: "Carla, temos uma promoção especial de manicure e pedicure que pode te interessar..."
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
          <Link to="/landing/beauty">
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
                <Button className="bg-pink-600 hover:bg-pink-700">
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
                  segment="beauty" 
                  title={segmentData.agendamentoConfig.title}
                  services={segmentData.agendamentoConfig.services}
                  professionals={segmentData.agendamentoConfig.professionals}
                  timeSlots={segmentData.agendamentoConfig.timeSlots}
                />
              </TabsContent>
              <TabsContent value="postagem">
                <PostagemDemo 
                  segment="beauty" 
                  title={segmentData.postagemConfig.title}
                  postTypes={segmentData.postagemConfig.postTypes}
                  scheduledPosts={segmentData.postagemConfig.scheduledPosts}
                  publishedPosts={segmentData.postagemConfig.publishedPosts}
                />
              </TabsContent>
              <TabsContent value="gerenciamento">
                <GerenciamentoDemo 
                  segment="beauty" 
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

export default BeautyDemoPage;
