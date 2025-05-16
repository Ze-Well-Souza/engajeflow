
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Server, Globe, Zap, MessageCircle, Database, ArrowUp, ShoppingCart } from "lucide-react";

const GatewayPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gateway de Integração</h1>
        <Link to="/gateway/integracoes" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md flex items-center gap-2">
          <Server className="h-4 w-4" /> Ver Integrações
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-blue-500" />
              Canais Conectados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-sm text-gray-400">WhatsApp, SMS, Email</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              Taxa de Entrega
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.7%</div>
            <p className="text-xs text-green-500 flex items-center">
              <ArrowUp className="h-3 w-3 mr-1" /> 2.1% que o mês anterior
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Database className="h-4 w-4 text-purple-500" />
              Integrações Ativas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-sm text-gray-400">CRMs, Pagamentos, APIs</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle>Resumo de Status</CardTitle>
            <CardDescription>Status dos serviços do gateway</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-750 rounded-md">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-800/30 text-green-500 rounded-full flex items-center justify-center mr-3">
                    <MessageCircle className="h-4 w-4" />
                  </div>
                  <span>API de Mensagens</span>
                </div>
                <div>
                  <span className="px-2 py-0.5 bg-green-900/30 text-green-400 text-xs rounded-full border border-green-700/50">
                    Operacional
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-750 rounded-md">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-800/30 text-green-500 rounded-full flex items-center justify-center mr-3">
                    <Database className="h-4 w-4" />
                  </div>
                  <span>Serviço de Webhook</span>
                </div>
                <div>
                  <span className="px-2 py-0.5 bg-green-900/30 text-green-400 text-xs rounded-full border border-green-700/50">
                    Operacional
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-750 rounded-md">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-yellow-800/30 text-yellow-500 rounded-full flex items-center justify-center mr-3">
                    <ShoppingCart className="h-4 w-4" />
                  </div>
                  <span>Gateway de Pagamento</span>
                </div>
                <div>
                  <span className="px-2 py-0.5 bg-yellow-900/30 text-yellow-400 text-xs rounded-full border border-yellow-800/50">
                    Degradado
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-750 rounded-md">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-800/30 text-green-500 rounded-full flex items-center justify-center mr-3">
                    <Globe className="h-4 w-4" />
                  </div>
                  <span>Sincronização CRM</span>
                </div>
                <div>
                  <span className="px-2 py-0.5 bg-green-900/30 text-green-400 text-xs rounded-full border border-green-700/50">
                    Operacional
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle>Tráfego de API</CardTitle>
            <CardDescription>Volume de requisições nas últimas 24h</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center">
              <div className="space-y-4 w-full">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>WhatsApp API</span>
                    <span>5,234 requisições</span>
                  </div>
                  <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: "65%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Email API</span>
                    <span>2,841 requisições</span>
                  </div>
                  <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-green-600 rounded-full" style={{ width: "35%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>SMS API</span>
                    <span>1,652 requisições</span>
                  </div>
                  <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-600 rounded-full" style={{ width: "20%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>CRM API</span>
                    <span>876 requisições</span>
                  </div>
                  <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-600 rounded-full" style={{ width: "10%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle>Configuração Rápida</CardTitle>
          <CardDescription>Acesso rápido às configurações do gateway</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/gateway/integracoes" className="p-4 bg-gray-750 border border-gray-700 rounded-lg hover:border-blue-500/50 cursor-pointer transition-all">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-800/30 text-blue-500 rounded-full flex items-center justify-center mr-3">
                  <Server className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium">Gerenciar Integrações</h3>
                  <p className="text-xs text-gray-400 mt-1">Adicionar ou remover serviços</p>
                </div>
              </div>
            </Link>
            
            <div className="p-4 bg-gray-750 border border-gray-700 rounded-lg hover:border-blue-500/50 cursor-pointer transition-all">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-800/30 text-green-500 rounded-full flex items-center justify-center mr-3">
                  <Zap className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium">Fluxos de Trabalho</h3>
                  <p className="text-xs text-gray-400 mt-1">Configurar automações</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-gray-750 border border-gray-700 rounded-lg hover:border-blue-500/50 cursor-pointer transition-all">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-purple-800/30 text-purple-500 rounded-full flex items-center justify-center mr-3">
                  <Globe className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium">Logs e Eventos</h3>
                  <p className="text-xs text-gray-400 mt-1">Monitorar atividade</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GatewayPage;
