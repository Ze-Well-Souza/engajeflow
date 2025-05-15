
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Users, ShoppingCart, BarChart2 } from "lucide-react";

const statsCards = [
  {
    title: "Total de Mensagens",
    value: "2,345",
    icon: MessageCircle,
    change: "+12.3%",
    positive: true,
  },
  {
    title: "Clientes Ativos",
    value: "543",
    icon: Users,
    change: "+5.7%",
    positive: true,
  },
  {
    title: "Vendas Concluídas",
    value: "876",
    icon: ShoppingCart,
    change: "+18.2%",
    positive: true,
  },
  {
    title: "Taxa de Conversão",
    value: "24.8%",
    icon: BarChart2,
    change: "-2.1%",
    positive: false,
  },
];

const DashboardPage: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Bem-vindo ao painel de controle do TechCare Bot Vendas</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statsCards.map((card, index) => (
          <Card key={index} className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">
                {card.title}
              </CardTitle>
              <card.icon className="h-5 w-5 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p
                className={`text-xs ${
                  card.positive ? "text-green-500" : "text-red-500"
                }`}
              >
                {card.change} desde o mês passado
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle>Mensagens Populares</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Boas-vindas</p>
                  <p className="text-xs text-gray-400">Taxa de abertura: 78%</p>
                </div>
                <div className="h-2 w-24 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: "78%" }}></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Promoção de Produtos</p>
                  <p className="text-xs text-gray-400">Taxa de abertura: 65%</p>
                </div>
                <div className="h-2 w-24 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: "65%" }}></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Confirmação de Pedido</p>
                  <p className="text-xs text-gray-400">Taxa de abertura: 92%</p>
                </div>
                <div className="h-2 w-24 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: "92%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle>Canais de Comunicação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">WhatsApp</p>
                  <p className="text-xs text-gray-400">4,256 mensagens enviadas</p>
                </div>
                <div className="h-2 w-24 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-green-600 rounded-full" style={{ width: "65%" }}></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-xs text-gray-400">3,127 mensagens enviadas</p>
                </div>
                <div className="h-2 w-24 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: "48%" }}></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">SMS</p>
                  <p className="text-xs text-gray-400">1,845 mensagens enviadas</p>
                </div>
                <div className="h-2 w-24 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-600 rounded-full" style={{ width: "28%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
