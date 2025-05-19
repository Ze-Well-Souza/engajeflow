
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, ExternalLink, Grid2X2, Settings, Shield, Star, Calendar, Image, MessageSquare } from "lucide-react";
import { useLocalization } from "@/contexts/LocalizationContext";

// Dados de exemplo para plugins
const marketplacePlugins = [
  {
    id: "plugin1",
    name: "Advanced Calendar",
    description: "Melhor controle de calendário com visualizações personalizadas",
    icon: Calendar,
    author: "TechCare Labs",
    rating: 4.5,
    reviews: 128,
    price: "Grátis",
    installs: "5.2k+",
    installed: false
  },
  {
    id: "plugin2",
    name: "AI Image Generator",
    description: "Crie imagens para suas campanhas usando inteligência artificial",
    icon: Image,
    author: "Digital Wizards",
    rating: 4.7,
    reviews: 236,
    price: "R$ 49,90/mês",
    installs: "10k+",
    installed: true
  },
  {
    id: "plugin3",
    name: "Chatbot Avançado",
    description: "Adicione um chatbot inteligente ao seu atendimento",
    icon: MessageSquare,
    author: "ChatMaster",
    rating: 4.2,
    reviews: 89,
    price: "R$ 29,90/mês",
    installs: "3.7k+",
    installed: false
  },
];

const installedPlugins = [
  {
    id: "plugin2",
    name: "AI Image Generator",
    description: "Crie imagens para suas campanhas usando inteligência artificial",
    icon: Image,
    version: "2.3.1",
    author: "Digital Wizards",
    active: true,
    lastUpdated: "2025-04-15"
  },
  {
    id: "plugin4",
    name: "Analytics Pro",
    description: "Análises avançadas e relatórios para suas campanhas",
    icon: Grid2X2,
    version: "1.5.0",
    author: "DataInsight",
    active: true,
    lastUpdated: "2025-05-02"
  }
];

const PluginsPage = () => {
  const { toast } = useToast();
  const { t } = useLocalization();
  const [searchTerm, setSearchTerm] = useState("");
  const [installedList, setInstalledList] = useState(installedPlugins);
  const [marketplaceList, setMarketplaceList] = useState(marketplacePlugins);

  const handleTogglePlugin = (id) => {
    setInstalledList(installedList.map(plugin => 
      plugin.id === id ? { ...plugin, active: !plugin.active } : plugin
    ));
    
    const plugin = installedList.find(p => p.id === id);
    if (plugin) {
      toast({
        title: plugin.active 
          ? `${plugin.name} desativado` 
          : `${plugin.name} ativado`,
        description: plugin.active
          ? "O plugin foi desativado com sucesso."
          : "O plugin foi ativado com sucesso."
      });
    }
  };

  const handleInstall = (plugin) => {
    // Em um app real, isso faria uma chamada de API para instalar o plugin
    
    // Atualiza a lista de marketplace
    setMarketplaceList(marketplaceList.map(p => 
      p.id === plugin.id ? { ...p, installed: true } : p
    ));
    
    // Adiciona à lista de instalados
    const newPlugin = {
      id: plugin.id,
      name: plugin.name,
      description: plugin.description,
      icon: plugin.icon,
      version: "1.0.0", // Versão inicial
      author: plugin.author,
      active: true,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    
    setInstalledList([...installedList, newPlugin]);
    
    toast({
      title: `${plugin.name} instalado`,
      description: "O plugin foi instalado com sucesso e está ativo.",
    });
  };

  const handleUninstall = (id) => {
    // Remove da lista de instalados
    setInstalledList(installedList.filter(plugin => plugin.id !== id));
    
    // Atualiza o status no marketplace
    setMarketplaceList(marketplaceList.map(plugin => 
      plugin.id === id ? { ...plugin, installed: false } : plugin
    ));
    
    toast({
      title: "Plugin desinstalado",
      description: "O plugin foi removido com sucesso.",
    });
  };

  const filteredMarketplace = searchTerm 
    ? marketplaceList.filter(plugin => 
        plugin.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        plugin.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : marketplaceList;

  return (
    <div className="container max-w-6xl mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Plugins</h1>
      
      <Tabs defaultValue="installed" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="installed" className="px-8">
            Plugins Instalados
          </TabsTrigger>
          <TabsTrigger value="marketplace" className="px-8">
            Marketplace
          </TabsTrigger>
          <TabsTrigger value="developer" className="px-8">
            Desenvolvedor
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="installed">
          <div className="mb-6">
            <Input 
              placeholder="Buscar plugins instalados..." 
              className="max-w-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {installedList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {installedList.map((plugin) => (
                <Card key={plugin.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
                          {plugin.icon && <plugin.icon className="h-6 w-6 text-primary" />}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{plugin.name}</CardTitle>
                          <CardDescription>v{plugin.version} por {plugin.author}</CardDescription>
                        </div>
                      </div>
                      <Switch 
                        checked={plugin.active}
                        onCheckedChange={() => handleTogglePlugin(plugin.id)}
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{plugin.description}</p>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Atualizado em {plugin.lastUpdated}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4 flex justify-between">
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Settings className="h-3.5 w-3.5" />
                      Configurar
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleUninstall(plugin.id)}
                    >
                      Desinstalar
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">Nenhum plugin instalado.</p>
                <Button variant="outline" className="mt-4">
                  Explorar Marketplace
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="marketplace">
          <div className="mb-6">
            <Input 
              placeholder="Buscar plugins no marketplace..." 
              className="max-w-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMarketplace.map((plugin) => (
              <Card key={plugin.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
                      {plugin.icon && <plugin.icon className="h-6 w-6 text-primary" />}
                    </div>
                    <div>
                      <div className="flex items-center">
                        <CardTitle className="text-lg">{plugin.name}</CardTitle>
                        {plugin.installed && (
                          <Badge variant="secondary" className="ml-2">Instalado</Badge>
                        )}
                      </div>
                      <div className="flex items-center mt-1">
                        <Star className="h-3.5 w-3.5 text-amber-400 mr-1" />
                        <span className="text-sm mr-1">{plugin.rating}</span>
                        <span className="text-xs text-muted-foreground">
                          ({plugin.reviews} avaliações)
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{plugin.description}</p>
                  <div className="flex justify-between text-xs">
                    <span>Autor: {plugin.author}</span>
                    <span>{plugin.installs} instalações</span>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4 flex justify-between">
                  <span className="font-medium">{plugin.price}</span>
                  {plugin.installed ? (
                    <Button variant="secondary" className="flex items-center gap-1">
                      <Settings className="h-3.5 w-3.5" />
                      Configurar
                    </Button>
                  ) : (
                    <Button onClick={() => handleInstall(plugin)} className="flex items-center gap-1">
                      <Download className="h-3.5 w-3.5" />
                      Instalar
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="developer">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Desenvolvimento de Plugins</CardTitle>
              <CardDescription>
                Crie plugins personalizados para estender as funcionalidades da plataforma TechCare.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Nossa plataforma de desenvolvimento permite que você crie plugins personalizados para
                integrar e estender as funcionalidades do TechCare.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-2 flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-primary" />
                    Acesso Seguro
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Nosso SDK fornece acesso seguro às APIs do TechCare com permissões granulares.
                  </p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-2 flex items-center">
                    <ExternalLink className="h-5 w-5 mr-2 text-primary" />
                    Integrações Poderosas
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Integre facilmente suas ferramentas e serviços ao ecossistema TechCare.
                  </p>
                </div>
              </div>
              
              <div className="flex justify-center">
                <Button className="mr-4">Baixar SDK</Button>
                <Button variant="outline">Ver Documentação</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Meus Plugins de Desenvolvimento</CardTitle>
              <CardDescription>
                Gerencie os plugins que você está desenvolvendo.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center p-12">
              <p className="text-muted-foreground mb-4">
                Você ainda não tem nenhum plugin em desenvolvimento.
              </p>
              <Button>Criar Novo Plugin</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PluginsPage;
