
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Server, Activity, AlertCircle, ArrowUpDown, Check, ArrowRight } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";

const providers = [
  {
    id: "whatsapp",
    name: "WhatsApp Business API",
    status: "ativo",
    messagesPerDay: 2450,
    responseTime: "1.2s",
    failureRate: 0.8,
  },
  {
    id: "email",
    name: "SendGrid",
    status: "ativo",
    messagesPerDay: 1850,
    responseTime: "0.8s",
    failureRate: 0.5,
  },
  {
    id: "sms",
    name: "Twilio SMS",
    status: "ativo",
    messagesPerDay: 980,
    responseTime: "1.5s",
    failureRate: 0.3,
  },
  {
    id: "telegram",
    name: "Telegram Bot API",
    status: "inativo",
    messagesPerDay: 0,
    responseTime: "0.0s",
    failureRate: 0,
  },
];

const recentLogs = [
  { time: "12:45:23", status: "success", message: "Mensagem WhatsApp enviada para +5511999999999" },
  { time: "12:44:15", status: "success", message: "Email enviado para cliente@example.com" },
  { time: "12:42:30", status: "error", message: "Falha no envio de SMS para +5511988888888" },
  { time: "12:40:12", status: "success", message: "Mensagem WhatsApp enviada para +5511977777777" },
  { time: "12:38:45", status: "warning", message: "Atraso no envio de email para suporte@example.com" },
];

const GatewayPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gateway de Mensagens</h1>
        <div className="flex items-center space-x-2">
          <StatusBadge status="ativo" />
          <span className="text-sm">Sistema operacional</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Server className="h-4 w-4 text-blue-500" />
              Provedores Conectados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{providers.filter(p => p.status === "ativo").length}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Activity className="h-4 w-4 text-green-500" />
              Mensagens Hoje
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {providers.reduce((sum, provider) => sum + provider.messagesPerDay, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-yellow-500" />
              Taxa de Falhas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(providers.reduce((sum, provider) => sum + provider.failureRate, 0) / providers.length).toFixed(1)}%
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle>Provedores de Serviço</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {providers.map((provider) => (
                <div 
                  key={provider.id} 
                  className="flex items-center justify-between p-3 bg-gray-750 rounded-md border border-gray-700"
                >
                  <div className="flex items-center">
                    <div className="mr-3">
                      <StatusBadge status={provider.status as "ativo" | "inativo" | "recurring"} className="w-auto" />
                    </div>
                    <div>
                      <div className="font-medium">{provider.name}</div>
                      <div className="text-xs text-gray-400">
                        {provider.messagesPerDay.toLocaleString()} msg/dia • {provider.responseTime} tempo resp.
                      </div>
                    </div>
                  </div>
                  <button className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">
                    Configurar
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle>Logs Recentes</CardTitle>
          </CardHeader>
          <CardContent className="max-h-64 overflow-y-auto">
            <div className="space-y-2">
              {recentLogs.map((log, index) => (
                <div 
                  key={index} 
                  className="flex items-start p-2 text-sm border-l-2 rounded-r-md bg-gray-750"
                  style={{ 
                    borderLeftColor: 
                      log.status === "success" ? "#10B981" : 
                      log.status === "warning" ? "#F59E0B" : 
                      "#EF4444"
                  }}
                >
                  <div className="text-gray-400 mr-2">{log.time}</div>
                  <div>
                    {log.status === "success" && <Check className="inline h-3 w-3 text-green-500 mr-1" />}
                    {log.status === "warning" && <AlertCircle className="inline h-3 w-3 text-yellow-500 mr-1" />}
                    {log.status === "error" && <AlertCircle className="inline h-3 w-3 text-red-500 mr-1" />}
                    {log.message}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle>Configuração de Gateway</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">URL do Gateway</label>
                <input 
                  type="text" 
                  value="https://api.techcare.com/gateway" 
                  className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Chave API</label>
                <input 
                  type="password" 
                  value="••••••••••••••••" 
                  className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Política de Fallback</label>
              <div className="flex items-center bg-gray-900 p-4 rounded-md border border-gray-700">
                <div className="p-2 bg-gray-750 border border-gray-600 rounded-md text-sm">
                  WhatsApp
                </div>
                <ArrowRight className="mx-3 h-4 w-4 text-gray-500" />
                <div className="p-2 bg-gray-750 border border-gray-600 rounded-md text-sm">
                  SMS
                </div>
                <ArrowRight className="mx-3 h-4 w-4 text-gray-500" />
                <div className="p-2 bg-gray-750 border border-gray-600 rounded-md text-sm">
                  Email
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Balanceamento de Carga</label>
              <select className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2">
                <option>Round Robin</option>
                <option>Least Connections</option>
                <option>Weighted</option>
              </select>
            </div>
            
            <div className="flex justify-end">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
                <ArrowUpDown className="h-4 w-4" />
                Testar Conexão
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GatewayPage;
