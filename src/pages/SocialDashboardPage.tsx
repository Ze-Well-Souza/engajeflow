
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CalendarClock, MessageCircle, BarChart3, Settings } from "lucide-react";
import SocialAuthManager from "@/components/social/SocialAuthManager";
import { SocialAccount } from "@/services/social/SocialAuthService";

const SocialDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [connectedAccounts, setConnectedAccounts] = useState<SocialAccount[]>([]);
  
  const handleAccountConnected = (account: SocialAccount) => {
    setConnectedAccounts(prev => {
      // Evitar duplicatas
      const filteredAccounts = prev.filter(acc => acc.id !== account.id);
      return [...filteredAccounts, account];
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard de Redes Sociais</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Gerencie todas as suas redes sociais em um só lugar
        </p>
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <TabsList className="mb-4 sm:mb-0">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="publish">Publicações</TabsTrigger>
            <TabsTrigger value="analytics">Análises</TabsTrigger>
            <TabsTrigger value="accounts">Contas</TabsTrigger>
          </TabsList>
          
          <Button className="gap-2">
            <CalendarClock className="h-4 w-4" /> Agendar Publicação
          </Button>
        </div>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Contas Conectadas</p>
                    <p className="text-2xl font-bold">{connectedAccounts.length}</p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-full">
                    <MessageCircle className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Publicações Agendadas</p>
                    <p className="text-2xl font-bold">6</p>
                  </div>
                  <div className="p-2 bg-green-100 rounded-full">
                    <CalendarClock className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Engajamento Total</p>
                    <p className="text-2xl font-bold">1,245</p>
                  </div>
                  <div className="p-2 bg-purple-100 rounded-full">
                    <BarChart3 className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Publicações Totais</p>
                    <p className="text-2xl font-bold">142</p>
                  </div>
                  <div className="p-2 bg-amber-100 rounded-full">
                    <MessageCircle className="h-5 w-5 text-amber-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Visão Geral das Redes Sociais</CardTitle>
              <CardDescription>
                Métricas combinadas de todas as suas contas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-muted/20 rounded-md">
                <p className="text-gray-500">Métricas e gráficos consolidados serão exibidos aqui</p>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Publicações Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map(index => (
                    <div key={index} className="p-3 border rounded-md">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-3">
                          <div className="h-10 w-10 bg-gray-100 rounded-full overflow-hidden">
                            <img 
                              src={`https://randomuser.me/api/portraits/men/${20 + index}.jpg`} 
                              alt="Profile" 
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">Publicação {index}</p>
                            <p className="text-sm text-gray-500">Há {index} dia(s)</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="px-2 py-1 text-xs bg-gray-100 rounded-full">
                            {index === 1 ? 'Instagram' : index === 2 ? 'Facebook' : 'Twitter'}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm mt-2">
                        Exemplo de texto para a publicação {index} nas redes sociais...
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <span>❤️ {35 * index} curtidas</span>
                        <span>💬 {12 * index} comentários</span>
                        <span>🔄 {5 * index} compartilhamentos</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Publicações Agendadas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map(index => (
                    <div key={index} className="p-3 border rounded-md">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">Publicação Agendada {index}</p>
                          <p className="text-sm text-gray-500">
                            {index === 1 ? 'Hoje, 18:00' : index === 2 ? 'Amanhã, 10:00' : 'Em 3 dias, 14:30'}
                          </p>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                            {index === 1 ? 'Instagram, Facebook' : index === 2 ? 'Twitter' : 'Todas as plataformas'}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm mt-2">
                        Conteúdo da publicação agendada {index}...
                      </p>
                      <div className="flex justify-end mt-2">
                        <Button variant="outline" size="sm">Editar</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="publish" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciador de Publicações</CardTitle>
              <CardDescription>
                Crie, agende e gerencie suas publicações em múltiplas redes sociais
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 flex items-center justify-center bg-muted/20 rounded-md">
                <div className="text-center">
                  <p className="text-gray-500 mb-4">Interface de publicação será implementada aqui</p>
                  <Button>Criar Nova Publicação</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Análise Unificada</CardTitle>
              <CardDescription>
                Métricas e análises consolidadas de todas as suas redes sociais
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 flex items-center justify-center bg-muted/20 rounded-md">
                <p className="text-gray-500">Análises detalhadas serão exibidas aqui</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accounts">
          <SocialAuthManager 
            onAccountConnected={handleAccountConnected}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SocialDashboardPage;
