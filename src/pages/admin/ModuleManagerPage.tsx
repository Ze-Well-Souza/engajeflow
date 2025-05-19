
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Settings, Users, Building, Calendar, ShoppingBag, MessageCircle } from "lucide-react";
import SearchInput from "@/components/search/SearchInput";

// Tipos para módulos
interface Module {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  status: "active" | "inactive" | "development";
  clientCount: number;
  features: string[];
}

const ModuleManagerPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Dados de exemplo para módulos
  const modules: Module[] = [
    {
      id: "beauty-salon",
      name: "Salões de Beleza",
      description: "Módulo especializado para gestão de salões de beleza, com agendamento, controle de clientes e fidelidade.",
      icon: <Calendar className="h-5 w-5" />,
      status: "active",
      clientCount: 12,
      features: ["Agendamento", "Controle de Clientes", "Fidelidade", "Marketing Automatizado"]
    },
    {
      id: "auto-repair",
      name: "Oficinas Mecânicas",
      description: "Módulo para gestão de oficinas, com controle de ordens de serviço, estoque e agendamento.",
      icon: <ShoppingBag className="h-5 w-5" />,
      status: "active",
      clientCount: 8,
      features: ["Ordens de Serviço", "Estoque", "Agendamento", "Notificações Automáticas"]
    },
    {
      id: "clinic",
      name: "Clínicas",
      description: "Módulo para gestão de clínicas médicas e odontológicas, com prontuário, agendamento e faturamento.",
      icon: <Users className="h-5 w-5" />,
      status: "development",
      clientCount: 5,
      features: ["Prontuário Eletrônico", "Agendamento", "Faturamento", "Lembretes de Consulta"]
    },
    {
      id: "restaurant",
      name: "Restaurantes",
      description: "Módulo para gestão de restaurantes, com cardápio digital, reservas e delivery.",
      icon: <Building className="h-5 w-5" />,
      status: "inactive",
      clientCount: 0,
      features: ["Cardápio Digital", "Reservas", "Delivery", "Fidelidade"]
    }
  ];

  // Filtrar módulos com base na busca e na aba ativa
  const filteredModules = modules.filter(module => {
    const matchesSearch = 
      module.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === "all" || module.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-600">Ativo</Badge>;
      case "inactive":
        return <Badge variant="outline" className="text-gray-400 border-gray-500">Inativo</Badge>;
      case "development":
        return <Badge className="bg-amber-600">Em Desenvolvimento</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Gerenciamento de Módulos</h2>
        <p className="text-muted-foreground">
          Configure e gerencie os módulos disponíveis para seus clientes
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Módulos SaaS</CardTitle>
            <CardDescription>Gerencie os módulos disponíveis na plataforma</CardDescription>
          </div>
          <Button className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Novo Módulo
          </Button>
        </CardHeader>
        <CardContent>
          <SearchInput
            id="module-search"
            label="Buscar Módulo"
            placeholder="Nome ou descrição..."
            value={searchTerm}
            onChange={setSearchTerm}
            className="mb-6"
          />

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="active">Ativos</TabsTrigger>
              <TabsTrigger value="development">Em Desenvolvimento</TabsTrigger>
              <TabsTrigger value="inactive">Inativos</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredModules.map((module) => (
                  <Card key={module.id} className="bg-gray-800 border-gray-700 hover:border-blue-500/50 cursor-pointer transition-all">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-gray-700 p-2 rounded-md">
                          {module.icon}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{module.name}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            {getStatusBadge(module.status)}
                            {module.clientCount > 0 && (
                              <Badge variant="outline" className="border-gray-500">
                                {module.clientCount} clientes
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-400 mb-3">{module.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {module.features.map((feature, index) => (
                          <Badge key={index} variant="secondary" className="bg-gray-700">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Card 
                  className="bg-gray-800/50 border-gray-700 border-dashed flex flex-col items-center justify-center h-[200px] cursor-pointer hover:bg-gray-800/70 transition-colors"
                >
                  <PlusCircle className="h-8 w-8 text-gray-500 mb-2" />
                  <p className="text-sm text-gray-500">Adicionar novo módulo</p>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Configurações Globais de Módulos</CardTitle>
          <CardDescription>Configurações que se aplicam a todos os módulos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-800 p-4 rounded-md border border-gray-700">
                <h3 className="text-md font-medium flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-blue-400" />
                  Integração de Comunicação
                </h3>
                <p className="text-sm text-gray-400 mt-2">
                  Configure as APIs e integrações para comunicação multicanal em todos os módulos.
                </p>
                <Button variant="outline" size="sm" className="mt-3">
                  Configurar
                </Button>
              </div>

              <div className="bg-gray-800 p-4 rounded-md border border-gray-700">
                <h3 className="text-md font-medium flex items-center gap-2">
                  <Users className="h-4 w-4 text-green-400" />
                  Perfis e Permissões
                </h3>
                <p className="text-sm text-gray-400 mt-2">
                  Defina perfis de acesso e permissões padrão para cada módulo.
                </p>
                <Button variant="outline" size="sm" className="mt-3">
                  Configurar
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModuleManagerPage;
