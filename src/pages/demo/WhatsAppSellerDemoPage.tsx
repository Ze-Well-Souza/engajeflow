import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, ArrowLeft, Share2, Calendar, BarChart3 } from "lucide-react";
import AgendamentoDemo from "@/components/demo/AgendamentoDemo";
import PostagemDemo from "@/components/demo/PostagemDemo";
import GerenciamentoDemo from "@/components/demo/GerenciamentoDemo";

const WhatsAppSellerDemoPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("postagem");
  
  // Dados específicos para o segmento de vendedor de WhatsApp
  const segmentData = {
    title: "Demonstração para Vendedores de WhatsApp",
    description: "Experimente as funcionalidades da plataforma adaptadas para vendas e marketing via WhatsApp",
    icon: <MessageSquare className="h-6 w-6 text-green-500" />,
    color: "green",
    features: [
      {
        icon: <MessageSquare className="h-6 w-6 text-green-500" />,
        title: "Envio em Massa",
        description: "Envie mensagens para múltiplos grupos e contatos com personalização automática"
      },
      {
        icon: <Share2 className="h-6 w-6 text-green-500" />,
        title: "Integração Multicanal",
        description: "Sincronize suas vendas em WhatsApp, Telegram, Facebook e Instagram"
      },
      {
        icon: <Calendar className="h-6 w-6 text-green-500" />,
        title: "Agendamento de Mensagens",
        description: "Programe envios para os melhores horários e aumente suas taxas de conversão"
      },
      {
        icon: <BarChart3 className="h-6 w-6 text-green-500" />,
        title: "Análise de Desempenho",
        description: "Acompanhe métricas de engajamento, conversão e vendas em tempo real"
      }
    ],
    agendamentoConfig: {
      title: "Agendamento de Mensagens",
      services: [
        { id: "1", name: "Divulgação de Produtos" },
        { id: "2", name: "Promoção Relâmpago" },
        { id: "3", name: "Lançamento de Produto" },
        { id: "4", name: "Mensagem Personalizada" }
      ],
      professionals: [
        { id: "1", name: "Automático" },
        { id: "2", name: "Manual com Aprovação" }
      ],
      timeSlots: [
        "08:00", "10:00", "12:00", 
        "14:00", "16:00", "18:00", "20:00"
      ]
    },
    postagemConfig: {
      title: "Gestão de Conteúdo para WhatsApp",
      postTypes: [
        { id: "1", name: "Catálogo de Produtos" },
        { id: "2", name: "Promoção" },
        { id: "3", name: "Depoimento de Cliente" },
        { id: "4", name: "Informativo" }
      ],
      scheduledPosts: [
        { 
          id: "1", 
          title: "Novos Produtos da Semana", 
          type: "Catálogo de Produtos", 
          date: "24/05/2025", 
          platforms: ["WhatsApp", "Telegram", "Instagram"]
        },
        { 
          id: "2", 
          title: "Promoção de Fim de Semana: 30% OFF", 
          type: "Promoção", 
          date: "26/05/2025", 
          platforms: ["WhatsApp", "Telegram", "Facebook"]
        },
        { 
          id: "3", 
          title: "Depoimento da Cliente Márcia", 
          type: "Depoimento de Cliente", 
          date: "28/05/2025", 
          platforms: ["WhatsApp", "Instagram"]
        }
      ],
      publishedPosts: [
        { 
          id: "4", 
          title: "Lançamento Coleção Verão", 
          type: "Catálogo de Produtos", 
          date: "15/05/2025", 
          platforms: ["WhatsApp", "Telegram", "Instagram"],
          stats: { likes: 1245, comments: 87, shares: 23 }
        },
        { 
          id: "5", 
          title: "Promoção Relâmpago 24h", 
          type: "Promoção", 
          date: "10/05/2025", 
          platforms: ["WhatsApp", "Telegram"],
          stats: { likes: 980, comments: 112, shares: 45 }
        },
        { 
          id: "6", 
          title: "Novidades da Próxima Semana", 
          type: "Informativo", 
          date: "05/05/2025", 
          platforms: ["WhatsApp", "Telegram", "Facebook"],
          stats: { likes: 876, comments: 34, shares: 12 }
        }
      ]
    },
    gerenciamentoConfig: {
      title: "Gerenciamento de Leads e Clientes",
      clients: [
        { 
          id: "1", 
          name: "Ana Oliveira", 
          email: "ana.oliveira@email.com",
          phone: "(11) 99876-5432",
          interest: "Roupas femininas",
          lastContact: "15/05/2025"
        },
        { 
          id: "2", 
          name: "Carlos Santos", 
          email: "carlos.santos@email.com",
          phone: "(11) 92345-6789",
          interest: "Acessórios",
          lastContact: "21/05/2025"
        },
        { 
          id: "3", 
          name: "Mariana Costa", 
          email: "mariana.costa@email.com",
          phone: "(11) 98765-4321",
          interest: "Moda feminina",
          lastContact: "18/05/2025"
        },
        { 
          id: "4", 
          name: "João Silva", 
          email: "joao.silva@email.com",
          phone: "(11) 91234-5678",
          interest: "Promoções",
          lastContact: "20/05/2025"
        }
      ],
      messages: [
        {
          id: "1",
          client: "Grupo Moda Feminina",
          date: "18/05/2025",
          subject: "Lançamento Coleção Verão",
          preview: "Olá pessoal! Acabaram de chegar as novidades da coleção verão 2025! Confiram..."
        },
        {
          id: "2",
          client: "Ana Oliveira",
          date: "15/05/2025",
          subject: "Dúvida sobre produto",
          preview: "Oi Ana! O vestido floral está disponível nos tamanhos P, M e G. O preço é..."
        },
        {
          id: "3",
          client: "Carlos Santos",
          date: "21/05/2025",
          subject: "Confirmação de pedido",
          preview: "Carlos, seu pedido #4578 foi confirmado e será enviado amanhã. O código de rastreio..."
        }
      ],
      automations: [
        {
          id: "1",
          name: "Resposta automática",
          description: "Responde perguntas frequentes sobre produtos e entregas",
          status: true
        },
        {
          id: "2",
          name: "Recuperação de carrinho",
          description: "Envia lembrete 3h após cliente abandonar carrinho",
          status: true
        },
        {
          id: "3",
          name: "Divulgação semanal",
          description: "Envia catálogo atualizado toda segunda-feira",
          status: true
        },
        {
          id: "4",
          name: "Pesquisa de satisfação",
          description: "Envia pesquisa 3 dias após a entrega do produto",
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
          <Link to="/landing/whatsapp-seller">
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
                <Button className="bg-green-600 hover:bg-green-700">
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
                <TabsTrigger value="agendamento">Agendamento</TabsTrigger>
                <TabsTrigger value="postagem">Divulgação</TabsTrigger>
                <TabsTrigger value="gerenciamento">Leads</TabsTrigger>
              </TabsList>
              <TabsContent value="agendamento">
                <AgendamentoDemo 
                  segment="whatsapp-seller" 
                  title={segmentData.agendamentoConfig.title}
                  services={segmentData.agendamentoConfig.services}
                  professionals={segmentData.agendamentoConfig.professionals}
                  timeSlots={segmentData.agendamentoConfig.timeSlots}
                />
              </TabsContent>
              <TabsContent value="postagem">
                <PostagemDemo 
                  segment="whatsapp-seller" 
                  title={segmentData.postagemConfig.title}
                  postTypes={segmentData.postagemConfig.postTypes}
                  scheduledPosts={segmentData.postagemConfig.scheduledPosts}
                  publishedPosts={segmentData.postagemConfig.publishedPosts}
                />
              </TabsContent>
              <TabsContent value="gerenciamento">
                <GerenciamentoDemo 
                  segment="whatsapp-seller" 
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

export default WhatsAppSellerDemoPage;
