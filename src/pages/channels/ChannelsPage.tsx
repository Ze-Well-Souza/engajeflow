
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Mail, Phone, MessageSquare, PlusCircle } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";

const channels = [
  {
    id: 1,
    name: "WhatsApp Business",
    type: "whatsapp",
    status: "ativo",
    messages: 1245,
    lastSync: "2023-05-12T13:25:00",
  },
  {
    id: 2,
    name: "Email Marketing",
    type: "email",
    status: "ativo",
    messages: 3678,
    lastSync: "2023-05-12T11:45:00",
  },
  {
    id: 3,
    name: "SMS Broadcast",
    type: "sms",
    status: "inativo",
    messages: 892,
    lastSync: "2023-05-10T09:15:00",
  },
  {
    id: 4,
    name: "Telegram Bot",
    type: "telegram",
    status: "ativo",
    messages: 547,
    lastSync: "2023-05-12T14:05:00",
  }
];

const ChannelsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Canais de Comunicação</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Adicionar Canal
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {channels.map((channel) => (
          <Card key={channel.id} className="bg-gray-800 border-gray-700 hover:border-blue-500/50 cursor-pointer transition-all">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                {channel.type === "whatsapp" && <MessageCircle className="h-5 w-5 text-green-500" />}
                {channel.type === "email" && <Mail className="h-5 w-5 text-blue-500" />}
                {channel.type === "sms" && <Phone className="h-5 w-5 text-yellow-500" />}
                {channel.type === "telegram" && <MessageSquare className="h-5 w-5 text-blue-400" />}
                {channel.name}
              </CardTitle>
              <StatusBadge status={channel.status as "ativo" | "inativo" | "recurring"} />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">{channel.messages.toLocaleString()}</div>
              <p className="text-xs text-gray-400">
                Última sincronização: {new Date(channel.lastSync).toLocaleString('pt-BR')}
              </p>
            </CardContent>
          </Card>
        ))}
        
        <Card className="bg-gray-800/50 border-gray-700 border-dashed flex flex-col items-center justify-center h-[148px] cursor-pointer hover:bg-gray-800/70 transition-colors">
          <PlusCircle className="h-8 w-8 text-gray-500 mb-2" />
          <p className="text-sm text-gray-500">Adicionar novo canal</p>
        </Card>
      </div>
      
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle>Configurações de Gateway</CardTitle>
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
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">API Key</label>
                <input 
                  type="password" 
                  value="••••••••••••••••" 
                  className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2"
                  readOnly
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                Configurar Gateway
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChannelsPage;
