
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Users, ShoppingCart, BarChart2, PlusCircle } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";

const botFlows = [
  {
    id: 1,
    name: "Fluxo de Boas-Vindas",
    description: "Inicia conversa com clientes novos",
    status: "ativo",
    interactions: 245,
    conversionRate: 28,
  },
  {
    id: 2,
    name: "Qualificação de Leads",
    description: "Perguntas para qualificação de potenciais clientes",
    status: "ativo",
    interactions: 178,
    conversionRate: 45,
  },
  {
    id: 3,
    name: "Recomendação de Produtos",
    description: "Sugestão de produtos baseada no perfil",
    status: "inativo",
    interactions: 103,
    conversionRate: 32,
  },
  {
    id: 4,
    name: "Suporte Técnico",
    description: "Respostas para perguntas frequentes",
    status: "ativo",
    interactions: 315,
    conversionRate: 15,
  }
];

const SalesBotPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Bot de Vendas</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Novo Fluxo
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-blue-500" />
              Conversas Ativas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-green-500" />
              Leads Gerados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">187</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <ShoppingCart className="h-4 w-4 text-purple-500" />
              Vendas Realizadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BarChart2 className="h-4 w-4 text-yellow-500" />
              Taxa de Conversão
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23.4%</div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle>Fluxos de Conversação</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {botFlows.map((flow) => (
              <div 
                key={flow.id} 
                className="p-4 bg-gray-750 border border-gray-700 rounded-lg hover:border-blue-500/50 cursor-pointer transition-all"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{flow.name}</h3>
                    <p className="text-sm text-gray-400 mt-1">{flow.description}</p>
                  </div>
                  <StatusBadge status={flow.status as "ativo" | "inativo" | "recurring"} />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <div className="text-xs text-gray-400">Interações</div>
                    <div className="font-medium">{flow.interactions}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Conversão</div>
                    <div className="font-medium">{flow.conversionRate}%</div>
                  </div>
                  <button className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">
                    Editar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle>Integrações Disponíveis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-750 rounded-md">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-800/30 text-green-500 rounded-full flex items-center justify-center mr-3">
                    <MessageCircle className="h-4 w-4" />
                  </div>
                  <span>WhatsApp</span>
                </div>
                <div>
                  <span className="px-2 py-0.5 bg-green-900/30 text-green-400 text-xs rounded-full border border-green-700/50">
                    Conectado
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-750 rounded-md">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-800/30 text-blue-500 rounded-full flex items-center justify-center mr-3">
                    <MessageCircle className="h-4 w-4" />
                  </div>
                  <span>Telegram</span>
                </div>
                <div>
                  <span className="px-2 py-0.5 bg-gray-800/30 text-gray-400 text-xs rounded-full border border-gray-700/50">
                    Desconectado
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-750 rounded-md">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-purple-800/30 text-purple-500 rounded-full flex items-center justify-center mr-3">
                    <MessageCircle className="h-4 w-4" />
                  </div>
                  <span>Instagram</span>
                </div>
                <div>
                  <span className="px-2 py-0.5 bg-gray-800/30 text-gray-400 text-xs rounded-full border border-gray-700/50">
                    Desconectado
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle>Configurações do Bot</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nome do Bot</label>
                <input 
                  type="text" 
                  value="TechCare Assistant" 
                  className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Tempo de resposta (segundos)</label>
                <input 
                  type="number" 
                  value="3" 
                  className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Mensagem de boas-vindas</label>
                <textarea 
                  rows={3}
                  value="Olá! Sou o assistente virtual da TechCare. Como posso te ajudar hoje?" 
                  className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2"
                />
              </div>
              
              <div className="flex justify-end">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                  Salvar Configurações
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SalesBotPage;
