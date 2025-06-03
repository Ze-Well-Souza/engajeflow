import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Utensils, ArrowLeft, Calendar, MessageSquare, BarChart3, ChefHat } from "lucide-react";
import AgendamentoDemo from "@/components/demo/AgendamentoDemo";
import PostagemDemo from "@/components/demo/PostagemDemo";
import GerenciamentoDemo from "@/components/demo/GerenciamentoDemo";

const ChefDemoPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("agendamento");
  
  // Dados específicos para o segmento de cozinheira/buffet
  const segmentData = {
    title: "Demonstração para Cozinheiros e Buffets",
    description: "Experimente as funcionalidades da plataforma adaptadas para serviços de alimentação e buffet",
    icon: <ChefHat className="h-6 w-6 text-orange-500" />,
    color: "orange",
    features: [
      {
        icon: <Calendar className="h-6 w-6 text-orange-500" />,
        title: "Agendamento de Eventos",
        description: "Organize sua agenda de eventos e serviços com confirmação automática"
      },
      {
        icon: <Utensils className="h-6 w-6 text-orange-500" />,
        title: "Cardápio Personalizado",
        description: "Crie e compartilhe cardápios personalizados para cada tipo de evento"
      },
      {
        icon: <MessageSquare className="h-6 w-6 text-orange-500" />,
        title: "Automação de Mensagens",
        description: "Envie orçamentos, confirmações e lembretes para seus clientes"
      },
      {
        icon: <BarChart3 className="h-6 w-6 text-orange-500" />,
        title: "Análise de Desempenho",
        description: "Acompanhe métricas de eventos, fidelização e receitas"
      }
    ],
    agendamentoConfig: {
      title: "Agendamento de Serviços de Buffet",
      services: [
        { id: "1", name: "Buffet Completo" },
        { id: "2", name: "Coffee Break" },
        { id: "3", name: "Jantar Privativo" },
        { id: "4", name: "Festa Infantil" },
        { id: "5", name: "Coquetel Corporativo" }
      ],
      professionals: [
        { id: "1", name: "Até 50 pessoas" },
        { id: "2", name: "51-100 pessoas" },
        { id: "3", name: "101-200 pessoas" },
        { id: "4", name: "Acima de 200 pessoas" }
      ],
      timeSlots: [
        "09:00", "10:00", "11:00", "12:00", 
        "14:00", "15:00", "16:00", "17:00", "18:00"
      ]
    },
    postagemConfig: {
      title: "Portfólio Gastronômico",
      postTypes: [
        { id: "1", name: "Prato do Dia" },
        { id: "2", name: "Evento Realizado" },
        { id: "3", name: "Promoção" },
        { id: "4", name: "Dica Culinária" }
      ],
      scheduledPosts: [
        { 
          id: "1", 
          title: "Buffet Casamento Jardim", 
          type: "Evento Realizado", 
          date: "24/05/2025", 
          platforms: ["Instagram", "Facebook", "WhatsApp"]
        },
        { 
          id: "2", 
          title: "Promoção para Eventos Corporativos", 
          type: "Promoção", 
          date: "26/05/2025", 
          platforms: ["Instagram", "Facebook", "WhatsApp"]
        },
        { 
          id: "3", 
          title: "5 Dicas para Escolher o Menu Perfeito", 
          type: "Dica Culinária", 
          date: "28/05/2025", 
          platforms: ["Instagram", "Facebook"]
        }
      ],
      publishedPosts: [
        { 
          id: "4", 
          title: "Festa de 15 Anos - Menu Completo", 
          type: "Evento Realizado", 
          date: "15/05/2025", 
          platforms: ["Instagram", "Facebook", "WhatsApp"],
          stats: { likes: 127, comments: 33, shares: 18 }
        },
        { 
          id: "5", 
          title: "Especial de Inverno: Sopas e Caldos", 
          type: "Prato do Dia", 
          date: "10/05/2025", 
          platforms: ["Instagram", "Facebook", "WhatsApp"],
          stats: { likes: 92, comments: 25, shares: 14 }
        },
        { 
          id: "6", 
          title: "Desconto para Reservas Antecipadas", 
          type: "Promoção", 
          date: "05/05/2025", 
          platforms: ["Instagram", "Facebook"],
          stats: { likes: 84, comments: 21, shares: 29 }
        }
      ]
    },
    gerenciamentoConfig: {
      title: "Gerenciamento de Eventos e Clientes",
      clients: [
        { 
          id: "1", 
          name: "Empresa ABC", 
          contact: "Carlos Mendes",
          email: "carlos.mendes@abc.com", 
          phone: "(11) 98765-4321",
          lastEvent: "Coffee Break Corporativo",
          lastEventDate: "18/05/2025"
        },
        { 
          id: "2", 
          name: "Família Silva", 
          contact: "Mariana Silva",
          email: "mariana.silva@email.com", 
          phone: "(11) 91234-5678",
          lastEvent: "Aniversário de 40 anos",
          lastEventDate: "20/05/2025"
        },
        { 
          id: "3", 
          name: "Escola Novo Saber", 
          contact: "Patrícia Santos",
          email: "patricia.santos@novosaber.edu", 
          phone: "(11) 99876-5432",
          lastEvent: "Formatura Ensino Médio",
          lastEventDate: "15/05/2025"
        },
        { 
          id: "4", 
          name: "Casal Oliveira", 
          contact: "João Oliveira",
          email: "joao.oliveira@email.com", 
          phone: "(11) 92345-6789",
          lastEvent: "Casamento",
          lastEventDate: "21/05/2025"
        }
      ],
      messages: [
        {
          id: "1",
          client: "Empresa ABC",
          date: "18/05/2025",
          subject: "Orçamento para Evento",
          preview: "Prezado Carlos, conforme solicitado, segue o orçamento para o coffee break de 100 pessoas..."
        },
        {
          id: "2",
          client: "Família Silva",
          date: "20/05/2025",
          subject: "Confirmação de Menu",
          preview: "Olá Mariana, confirmamos o menu escolhido para seu aniversário. Teremos entrada de..."
        },
        {
          id: "3",
          client: "Escola Novo Saber",
          date: "15/05/2025",
          subject: "Agradecimento",
          preview: "Prezada Patrícia, agradecemos a confiança em nosso trabalho para a formatura. Foi um prazer..."
        }
      ],
      automations: [
        {
          id: "1",
          name: "Envio de orçamento",
          description: "Envia orçamento personalizado após solicitação",
          status: true
        },
        {
          id: "2",
          name: "Confirmação de evento",
          description: "Envia confirmação após pagamento de sinal",
          status: true
        },
        {
          id: "3",
          name: "Lembrete de degustação",
          description: "Envia lembrete 2 dias antes da degustação agendada",
          status: true
        },
        {
          id: "4",
          name: "Feedback pós-evento",
          description: "Solicita avaliação após a realização do evento",
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
          <Link to="/landing/chef">
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
                <Button className="bg-orange-600 hover:bg-orange-700">
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
                <TabsTrigger value="agendamento">Eventos</TabsTrigger>
                <TabsTrigger value="postagem">Cardápio</TabsTrigger>
                <TabsTrigger value="gerenciamento">Clientes</TabsTrigger>
              </TabsList>
              <TabsContent value="agendamento">
                <AgendamentoDemo 
                  segment="chef" 
                  title={segmentData.agendamentoConfig.title}
                  services={segmentData.agendamentoConfig.services}
                  professionals={segmentData.agendamentoConfig.professionals}
                  timeSlots={segmentData.agendamentoConfig.timeSlots}
                />
              </TabsContent>
              <TabsContent value="postagem">
                <PostagemDemo 
                  segment="chef" 
                  title={segmentData.postagemConfig.title}
                  postTypes={segmentData.postagemConfig.postTypes}
                  scheduledPosts={segmentData.postagemConfig.scheduledPosts}
                  publishedPosts={segmentData.postagemConfig.publishedPosts}
                />
              </TabsContent>
              <TabsContent value="gerenciamento">
                <GerenciamentoDemo 
                  segment="chef" 
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

export default ChefDemoPage;
