
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Users, ArrowRight, PlusCircle } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";

const automations = [
  {
    id: 1,
    name: "Boas-vindas para novos clientes",
    trigger: "Novo cadastro",
    action: "Enviar mensagem WhatsApp",
    status: "ativo",
    lastRun: "2023-05-12T13:25:00",
    executions: 145,
  },
  {
    id: 2,
    name: "Lembrete de carrinho abandonado",
    trigger: "Carrinho abandonado",
    action: "Enviar email após 1 hora",
    status: "ativo",
    lastRun: "2023-05-12T11:45:00",
    executions: 87,
  },
  {
    id: 3,
    name: "Aniversário do cliente",
    trigger: "Data de aniversário",
    action: "Enviar cupom de desconto via email",
    status: "ativo",
    lastRun: "2023-05-10T09:15:00",
    executions: 28,
  },
  {
    id: 4,
    name: "Follow-up após compra",
    trigger: "Compra finalizada",
    action: "Sequência de 3 mensagens",
    status: "inativo",
    lastRun: "2023-05-08T14:05:00",
    executions: 203,
  }
];

const AutomationPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Automação de Mensagens</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Nova Automação
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-500" />
              Automações Ativas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4 text-green-500" />
              Execuções Hoje
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-purple-500" />
              Clientes Impactados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.247</div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle>Automações Configuradas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {automations.map((automation) => (
              <div 
                key={automation.id} 
                className="p-4 bg-gray-750 border border-gray-700 rounded-lg hover:border-blue-500/50 cursor-pointer transition-all"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{automation.name}</h3>
                    <div className="flex items-center text-sm text-gray-400 mt-2">
                      <span>{automation.trigger}</span>
                      <ArrowRight className="h-3 w-3 mx-2" />
                      <span>{automation.action}</span>
                    </div>
                  </div>
                  <StatusBadge status={automation.status as "ativo" | "inativo" | "recurring"} />
                </div>
                <div className="mt-4 flex justify-between text-xs text-gray-400">
                  <span>Execuções: {automation.executions}</span>
                  <span>Última execução: {new Date(automation.lastRun).toLocaleString('pt-BR')}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AutomationPage;
