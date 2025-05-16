
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Server, MessageCircle, Mail, Bell, Database, Code, Zap, Globe, Shield } from "lucide-react";

const GatewayIntegrationsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gateway de Integração</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md flex items-center gap-2">
          <Zap className="h-4 w-4" /> Nova Conexão
        </button>
      </div>
      
      <Tabs defaultValue="messagingapis">
        <TabsList className="mb-4">
          <TabsTrigger value="messagingapis">APIs de Mensagens</TabsTrigger>
          <TabsTrigger value="crm">Sistemas CRM</TabsTrigger>
          <TabsTrigger value="payments">Gateways de Pagamento</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="auth">Autenticação</TabsTrigger>
        </TabsList>
        
        <TabsContent value="messagingapis">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <IntegrationCard
              title="WhatsApp Business API"
              description="Integração oficial com a API do WhatsApp Business"
              icon={MessageCircle}
              status="connected"
              color="green"
            />
            
            <IntegrationCard
              title="Facebook Messenger"
              description="Conexão com Facebook Messenger para páginas"
              icon={MessageCircle}
              status="disconnected"
              color="blue"
            />
            
            <IntegrationCard
              title="SMS Gateway"
              description="Envio de mensagens SMS em massa"
              icon={MessageCircle}
              status="connected"
              color="purple"
            />
            
            <IntegrationCard
              title="Telegram Bot API"
              description="Criação de bots e canais no Telegram"
              icon={MessageCircle}
              status="disconnected"
              color="blue"
            />
            
            <IntegrationCard
              title="Email SMTP"
              description="Servidor SMTP para envio de emails"
              icon={Mail}
              status="connected"
              color="orange"
            />
            
            <IntegrationCard
              title="Push Notifications"
              description="Envio de notificações push para apps"
              icon={Bell}
              status="disconnected"
              color="red"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="crm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <IntegrationCard
              title="Salesforce"
              description="Integração com Salesforce CRM"
              icon={Database}
              status="disconnected"
              color="blue"
            />
            
            <IntegrationCard
              title="HubSpot"
              description="Sincronização com HubSpot CRM"
              icon={Database}
              status="disconnected"
              color="orange"
            />
            
            <IntegrationCard
              title="Pipedrive"
              description="Gerenciamento de pipeline de vendas"
              icon={Database}
              status="disconnected"
              color="green"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="payments">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <IntegrationCard
              title="Stripe"
              description="Processamento de pagamentos online"
              icon={Banknote}
              status="disconnected"
              color="purple"
            />
            
            <IntegrationCard
              title="PayPal"
              description="Integração com carteiras digitais"
              icon={Banknote}
              status="disconnected"
              color="blue"
            />
            
            <IntegrationCard
              title="PagSeguro"
              description="Gateway de pagamento brasileiro"
              icon={Banknote}
              status="disconnected"
              color="green"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="webhooks">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <IntegrationCard
              title="Webhook Receptor"
              description="Endpoint para receber callbacks"
              icon={Code}
              status="connected"
              color="gray"
            />
            
            <IntegrationCard
              title="Webhook Emissor"
              description="Envio de eventos para sistemas externos"
              icon={Code}
              status="connected"
              color="gray"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="auth">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <IntegrationCard
              title="OAuth 2.0"
              description="Autenticação para APIs de terceiros"
              icon={Shield}
              status="connected"
              color="blue"
            />
            
            <IntegrationCard
              title="SAML"
              description="Single Sign-On corporativo"
              icon={Shield}
              status="disconnected"
              color="gray"
            />
          </div>
        </TabsContent>
      </Tabs>
      
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle>Monitoramento de Gateway</CardTitle>
          <CardDescription>Status e métricas em tempo real das integrações</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Tempo de Resposta API WhatsApp</span>
                <span className="text-green-500">235ms</span>
              </div>
              <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-green-600 rounded-full" style={{ width: "87%" }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Uso de Recursos</span>
                <span className="text-yellow-500">67%</span>
              </div>
              <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-600 rounded-full" style={{ width: "67%" }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Taxa de Sucesso de Envio</span>
                <span className="text-green-500">99.2%</span>
              </div>
              <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-green-600 rounded-full" style={{ width: "99.2%" }}></div>
              </div>
            </div>
            
            <div className="pt-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-400">
                    <th className="pb-2">Evento</th>
                    <th className="pb-2">Timestamp</th>
                    <th className="pb-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-700">
                    <td className="py-2">Webhook recebido - WhatsApp</td>
                    <td>16/05/2025 15:42:12</td>
                    <td><span className="text-green-500">Sucesso</span></td>
                  </tr>
                  <tr className="border-t border-gray-700">
                    <td className="py-2">Envio de email em massa</td>
                    <td>16/05/2025 15:38:05</td>
                    <td><span className="text-green-500">Sucesso</span></td>
                  </tr>
                  <tr className="border-t border-gray-700">
                    <td className="py-2">API de SMS - Falha de conexão</td>
                    <td>16/05/2025 15:36:47</td>
                    <td><span className="text-red-500">Erro</span></td>
                  </tr>
                  <tr className="border-t border-gray-700">
                    <td className="py-2">Auth Token renovado</td>
                    <td>16/05/2025 15:30:00</td>
                    <td><span className="text-green-500">Sucesso</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

interface IntegrationCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  status: "connected" | "disconnected";
  color: string;
}

const IntegrationCard = ({ title, description, icon: Icon, status, color }: IntegrationCardProps) => {
  const getColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: "bg-blue-800/30 text-blue-500 border-blue-700/50",
      green: "bg-green-800/30 text-green-500 border-green-700/50",
      red: "bg-red-800/30 text-red-500 border-red-700/50",
      purple: "bg-purple-800/30 text-purple-500 border-purple-700/50",
      orange: "bg-orange-800/30 text-orange-500 border-orange-700/50",
      gray: "bg-gray-800/30 text-gray-500 border-gray-700/50",
    };
    return colorMap[color] || colorMap.gray;
  };

  return (
    <div className="p-4 bg-gray-750 border border-gray-700 rounded-lg hover:border-blue-500/50 cursor-pointer transition-all">
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <div className={`w-8 h-8 ${getColorClass(color)} rounded-full flex items-center justify-center mr-3`}>
            <Icon className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-gray-400">{description}</p>
          </div>
        </div>
        <div>
          <span className={`px-2 py-0.5 text-xs rounded-full border ${
            status === "connected" 
              ? "bg-green-900/30 text-green-400 border-green-700/50" 
              : "bg-gray-800/30 text-gray-400 border-gray-700/50"
          }`}>
            {status === "connected" ? "Conectado" : "Desconectado"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GatewayIntegrationsPage;
