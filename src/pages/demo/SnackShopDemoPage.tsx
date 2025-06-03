import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Cake, ArrowLeft, Calendar, MessageSquare, BarChart3, ShoppingBag } from "lucide-react";
import AgendamentoDemo from "@/components/demo/AgendamentoDemo";
import PostagemDemo from "@/components/demo/PostagemDemo";
import GerenciamentoDemo from "@/components/demo/GerenciamentoDemo";

const SnackShopDemoPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("postagem");
  
  // Dados específicos para o segmento de lojinha de salgados e doces
  const segmentData = {
    title: "Demonstração para Lojinha de Salgados e Doces",
    description: "Experimente as funcionalidades da plataforma adaptadas para pequenos negócios de alimentação",
    icon: <Cake className="h-6 w-6 text-pink-500" />,
    color: "pink",
    features: [
      {
        icon: <ShoppingBag className="h-6 w-6 text-pink-500" />,
        title: "Cardápio Digital",
        description: "Crie e compartilhe seu cardápio digital com fotos atraentes e preços atualizados"
      },
      {
        icon: <MessageSquare className="h-6 w-6 text-pink-500" />,
        title: "Pedidos por WhatsApp",
        description: "Receba pedidos diretamente pelo WhatsApp com confirmação automática"
      },
      {
        icon: <Calendar className="h-6 w-6 text-pink-500" />,
        title: "Gestão de Encomendas",
        description: "Organize suas encomendas com datas de entrega e status de produção"
      },
      {
        icon: <BarChart3 className="h-6 w-6 text-pink-500" />,
        title: "Controle Financeiro",
        description: "Acompanhe vendas, custos e lucros com relatórios detalhados e gráficos"
      }
    ],
    agendamentoConfig: {
      title: "Gestão de Encomendas",
      services: [
        { id: "1", name: "Salgados para Festa" },
        { id: "2", name: "Doces para Evento" },
        { id: "3", name: "Bolo Personalizado" },
        { id: "4", name: "Kit Lanche" },
        { id: "5", name: "Encomenda Especial" }
      ],
      professionals: [
        { id: "1", name: "Retirada na Loja" },
        { id: "2", name: "Entrega Local" },
        { id: "3", name: "Entrega por Aplicativo" }
      ],
      timeSlots: [
        "09:00", "10:00", "11:00", "12:00", 
        "14:00", "15:00", "16:00", "17:00", "18:00"
      ]
    },
    postagemConfig: {
      title: "Cardápio e Divulgação",
      postTypes: [
        { id: "1", name: "Produto Novo" },
        { id: "2", name: "Promoção" },
        { id: "3", name: "Cardápio do Dia" },
        { id: "4", name: "Depoimento de Cliente" }
      ],
      scheduledPosts: [
        { 
          id: "1", 
          title: "Novos Sabores de Coxinha", 
          type: "Produto Novo", 
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
          title: "Cardápio Especial de Fim de Semana", 
          type: "Cardápio do Dia", 
          date: "28/05/2025", 
          platforms: ["Instagram", "WhatsApp"]
        }
      ],
      publishedPosts: [
        { 
          id: "4", 
          title: "Brigadeiros Gourmet", 
          type: "Produto Novo", 
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
          title: "Depoimento da Cliente Ana", 
          type: "Depoimento de Cliente", 
          date: "05/05/2025", 
          platforms: ["Instagram", "Facebook"],
          stats: { likes: 64, comments: 18, shares: 9 }
        }
      ]
    },
    gerenciamentoConfig: {
      title: "Gerenciamento de Clientes e Pedidos",
      clients: [
        { 
          id: "1", 
          name: "Maria Silva", 
          email: "maria.silva@email.com", 
          phone: "(11) 98765-4321",
          lastOrder: "Salgados para Festa",
          lastOrderDate: "18/05/2025"
        },
        { 
          id: "2", 
          name: "João Santos", 
          email: "joao.santos@email.com", 
          phone: "(11) 91234-5678",
          lastOrder: "Bolo de Chocolate",
          lastOrderDate: "20/05/2025"
        },
        { 
          id: "3", 
          name: "Ana Oliveira", 
          email: "ana.oliveira@email.com", 
          phone: "(11) 99876-5432",
          lastOrder: "Kit Lanche",
          lastOrderDate: "15/05/2025"
        },
        { 
          id: "4", 
          name: "Carlos Pereira", 
          email: "carlos.pereira@email.com", 
          phone: "(11) 92345-6789",
          lastOrder: "Doces para Evento",
          lastOrderDate: "21/05/2025"
        }
      ],
      messages: [
        {
          id: "1",
          client: "Maria Silva",
          date: "18/05/2025",
          subject: "Confirmação de Pedido",
          preview: "Olá Maria, confirmamos seu pedido de 100 salgados para entrega no dia 25/05..."
        },
        {
          id: "2",
          client: "João Santos",
          date: "20/05/2025",
          subject: "Detalhes do Bolo",
          preview: "João, conforme conversamos, o bolo será de chocolate com recheio de brigadeiro..."
        },
        {
          id: "3",
          client: "Ana Oliveira",
          date: "15/05/2025",
          subject: "Agradecimento",
          preview: "Ana, muito obrigado pelo seu pedido! Esperamos que tenha gostado dos nossos produtos..."
        }
      ],
      automations: [
        {
          id: "1",
          name: "Confirmação de pedido",
          description: "Envia confirmação automática após recebimento do pedido",
          status: true
        },
        {
          id: "2",
          name: "Lembrete de retirada",
          description: "Envia lembrete 2h antes do horário de retirada",
          status: true
        },
        {
          id: "3",
          name: "Feedback pós-entrega",
          description: "Solicita avaliação após a entrega do pedido",
          status: true
        },
        {
          id: "4",
          name: "Promoções personalizadas",
          description: "Envia promoções baseadas no histórico de compras",
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
          <Link to="/landing/snack-shop">
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
            <Tabs defaultValue="postagem" onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="agendamento">Encomendas</TabsTrigger>
                <TabsTrigger value="postagem">Cardápio</TabsTrigger>
                <TabsTrigger value="gerenciamento">Clientes</TabsTrigger>
              </TabsList>
              <TabsContent value="agendamento">
                <AgendamentoDemo 
                  segment="snack-shop" 
                  title={segmentData.agendamentoConfig.title}
                  services={segmentData.agendamentoConfig.services}
                  professionals={segmentData.agendamentoConfig.professionals}
                  timeSlots={segmentData.agendamentoConfig.timeSlots}
                />
              </TabsContent>
              <TabsContent value="postagem">
                <PostagemDemo 
                  segment="snack-shop" 
                  title={segmentData.postagemConfig.title}
                  postTypes={segmentData.postagemConfig.postTypes}
                  scheduledPosts={segmentData.postagemConfig.scheduledPosts}
                  publishedPosts={segmentData.postagemConfig.publishedPosts}
                />
              </TabsContent>
              <TabsContent value="gerenciamento">
                <GerenciamentoDemo 
                  segment="snack-shop" 
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

export default SnackShopDemoPage;
