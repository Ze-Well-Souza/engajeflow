import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PartyPopper, ArrowLeft, Calendar, MessageSquare, BarChart3, Users } from "lucide-react";
import AgendamentoDemo from "@/components/demo/AgendamentoDemo";
import PostagemDemo from "@/components/demo/PostagemDemo";
import GerenciamentoDemo from "@/components/demo/GerenciamentoDemo";

const EventsDemoPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("agendamento");
  
  // Dados específicos para o segmento de eventos
  const segmentData = {
    title: "Demonstração para Organizadores de Eventos",
    description: "Experimente as funcionalidades da plataforma adaptadas para organização e gestão de eventos",
    icon: <PartyPopper className="h-6 w-6 text-purple-500" />,
    color: "purple",
    features: [
      {
        icon: <Calendar className="h-6 w-6 text-purple-500" />,
        title: "Gestão de Eventos",
        description: "Organize todos os detalhes do seu evento em um só lugar, desde convites até check-in"
      },
      {
        icon: <Users className="h-6 w-6 text-purple-500" />,
        title: "Gestão de Convidados",
        description: "Controle lista de convidados, confirmações e check-in no dia do evento"
      },
      {
        icon: <MessageSquare className="h-6 w-6 text-purple-500" />,
        title: "Automação de Mensagens",
        description: "Envie convites, confirmações e lembretes automaticamente via WhatsApp e e-mail"
      },
      {
        icon: <BarChart3 className="h-6 w-6 text-purple-500" />,
        title: "Análise de Resultados",
        description: "Acompanhe métricas de engajamento, presença e satisfação dos convidados"
      }
    ],
    agendamentoConfig: {
      title: "Agendamento e Planejamento de Eventos",
      services: [
        { id: "1", name: "Casamento" },
        { id: "2", name: "Aniversário" },
        { id: "3", name: "Evento Corporativo" },
        { id: "4", name: "Formatura" },
        { id: "5", name: "Confraternização" }
      ],
      professionals: [
        { id: "1", name: "Espaço Jardim" },
        { id: "2", name: "Salão de Festas" },
        { id: "3", name: "Centro de Convenções" },
        { id: "4", name: "Buffet Estrela" }
      ],
      timeSlots: [
        "10:00", "12:00", "14:00", 
        "16:00", "18:00", "20:00"
      ]
    },
    postagemConfig: {
      title: "Portfólio de Eventos",
      postTypes: [
        { id: "1", name: "Evento Realizado" },
        { id: "2", name: "Serviço Disponível" },
        { id: "3", name: "Promoção" },
        { id: "4", name: "Dica de Organização" }
      ],
      scheduledPosts: [
        { 
          id: "1", 
          title: "Casamento Jardim - Fotos", 
          type: "Evento Realizado", 
          date: "24/05/2025", 
          platforms: ["Instagram", "Facebook", "WhatsApp"]
        },
        { 
          id: "2", 
          title: "Pacote Especial para Formaturas", 
          type: "Promoção", 
          date: "26/05/2025", 
          platforms: ["Instagram", "Facebook", "WhatsApp"]
        },
        { 
          id: "3", 
          title: "5 Dicas para Organizar seu Evento", 
          type: "Dica de Organização", 
          date: "28/05/2025", 
          platforms: ["Instagram", "Facebook"]
        }
      ],
      publishedPosts: [
        { 
          id: "4", 
          title: "Aniversário de 15 Anos - Maria", 
          type: "Evento Realizado", 
          date: "15/05/2025", 
          platforms: ["Instagram", "Facebook"],
          stats: { likes: 245, comments: 37, shares: 18 }
        },
        { 
          id: "5", 
          title: "Conferência Tech 2025", 
          type: "Evento Realizado", 
          date: "10/05/2025", 
          platforms: ["Instagram", "Facebook", "LinkedIn"],
          stats: { likes: 312, comments: 45, shares: 67 }
        },
        { 
          id: "6", 
          title: "Novos Serviços de Decoração", 
          type: "Serviço Disponível", 
          date: "05/05/2025", 
          platforms: ["Instagram", "Facebook", "WhatsApp"],
          stats: { likes: 178, comments: 23, shares: 15 }
        }
      ]
    },
    gerenciamentoConfig: {
      title: "Gerenciamento de Eventos e Convidados",
      clients: [
        { 
          id: "1", 
          name: "João Silva", 
          email: "joao.silva@email.com",
          phone: "(11) 99999-0001",
          interest: "Casamento para 150 pessoas",
          lastContact: "15/06/2025"
        },
        { 
          id: "2", 
          name: "TechCorp", 
          email: "eventos@techcorp.com",
          phone: "(11) 99999-0002",
          interest: "Conferência anual",
          lastContact: "22/07/2025"
        },
        { 
          id: "3", 
          name: "Maria Santos", 
          email: "maria.santos@email.com",
          phone: "(11) 99999-0003",
          interest: "Aniversário de 15 anos",
          lastContact: "10/08/2025"
        },
        { 
          id: "4", 
          name: "Universidade ABC", 
          email: "formatura@uniabc.edu",
          phone: "(11) 99999-0004",
          interest: "Formatura de Engenharia",
          lastContact: "20/12/2025"
        }
      ],
      messages: [
        {
          id: "1",
          client: "Casamento Silva",
          date: "18/05/2025",
          subject: "Confirmação de Fornecedores",
          preview: "Olá! Confirmamos que todos os fornecedores para o casamento já estão agendados..."
        },
        {
          id: "2",
          client: "Conferência Tech 2025",
          date: "20/05/2025",
          subject: "Atualização de Palestrantes",
          preview: "Prezado cliente, temos o prazer de informar que confirmamos mais dois palestrantes..."
        },
        {
          id: "3",
          client: "Aniversário 15 Anos - Júlia",
          date: "15/05/2025",
          subject: "Prova de Decoração",
          preview: "Olá! Gostaríamos de agendar a prova de decoração para o aniversário da Júlia..."
        }
      ],
      automations: [
        {
          id: "1",
          name: "Envio de convites",
          description: "Envia convites personalizados para a lista de convidados",
          status: true
        },
        {
          id: "2",
          name: "Confirmação de presença",
          description: "Processa confirmações e envia agradecimento",
          status: true
        },
        {
          id: "3",
          name: "Lembrete de evento",
          description: "Envia lembrete 3 dias antes do evento",
          status: true
        },
        {
          id: "4",
          name: "Pesquisa pós-evento",
          description: "Envia pesquisa de satisfação após o evento",
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
          <Link to="/landing/events">
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
                <TabsTrigger value="agendamento">Planejamento</TabsTrigger>
                <TabsTrigger value="postagem">Portfólio</TabsTrigger>
                <TabsTrigger value="gerenciamento">Convidados</TabsTrigger>
              </TabsList>
              <TabsContent value="agendamento">
                <AgendamentoDemo 
                  segment="events" 
                  title={segmentData.agendamentoConfig.title}
                  services={segmentData.agendamentoConfig.services}
                  professionals={segmentData.agendamentoConfig.professionals}
                  timeSlots={segmentData.agendamentoConfig.timeSlots}
                />
              </TabsContent>
              <TabsContent value="postagem">
                <PostagemDemo 
                  segment="events" 
                  title={segmentData.postagemConfig.title}
                  postTypes={segmentData.postagemConfig.postTypes}
                  scheduledPosts={segmentData.postagemConfig.scheduledPosts}
                  publishedPosts={segmentData.postagemConfig.publishedPosts}
                />
              </TabsContent>
              <TabsContent value="gerenciamento">
                <GerenciamentoDemo 
                  segment="events" 
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

export default EventsDemoPage;
