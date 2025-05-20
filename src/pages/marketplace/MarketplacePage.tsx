
import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, ChevronRight, Package, RefreshCw } from "lucide-react";
import ExtensionCard, { Extension } from "@/components/marketplace/ExtensionCard";
import { useToast } from "@/hooks/use-toast";

const categories = [
  { value: "all", label: "Todas Categorias" },
  { value: "analytics", label: "Análise e Relatórios" },
  { value: "marketing", label: "Marketing" },
  { value: "communication", label: "Comunicação" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "customer-service", label: "Atendimento" },
  { value: "ai", label: "Inteligência Artificial" },
  { value: "automation", label: "Automação" },
  { value: "integration", label: "Integrações" },
  { value: "security", label: "Segurança" },
  { value: "utilities", label: "Utilidades" },
];

const sortOptions = [
  { value: "popular", label: "Mais Populares" },
  { value: "recent", label: "Mais Recentes" },
  { value: "ratings", label: "Melhor Avaliados" },
  { value: "price-asc", label: "Preço: Menor para Maior" },
  { value: "price-desc", label: "Preço: Maior para Menor" },
];

// Dados de exemplo para extensões
const mockExtensions: Extension[] = [
  {
    id: "1",
    name: "Mailchimp Connector",
    description: "Integre o EngageFlow com o Mailchimp para sincronizar contatos e campanhas.",
    icon: "https://cdn.example.com/mailchimp-icon.png",
    author: "EngageFlow",
    rating: 4.7,
    reviews: 132,
    price: "free",
    installed: true,
    version: "1.2.3",
    lastUpdate: "2025-05-15",
    category: "marketing",
    tags: ["email", "marketing", "integração"],
    downloads: 15642,
    verified: true,
    compatibility: "full"
  },
  {
    id: "2",
    name: "Social Media Suite",
    description: "Agende, publique e analise todas as suas redes sociais em um só lugar.",
    icon: "https://cdn.example.com/social-icon.png",
    author: "SocialBoost",
    rating: 4.5,
    reviews: 89,
    price: 29.90,
    installed: false,
    version: "2.0.1",
    lastUpdate: "2025-06-03",
    category: "marketing",
    tags: ["redes sociais", "marketing", "agendamento"],
    downloads: 8972,
    verified: true,
    compatibility: "full"
  },
  {
    id: "3",
    name: "Advanced Analytics",
    description: "Análises avançadas e relatórios personalizáveis para suas campanhas.",
    icon: "https://cdn.example.com/analytics-icon.png",
    author: "DataViz",
    rating: 4.8,
    reviews: 215,
    price: 49.90,
    installed: false,
    version: "3.1.0",
    lastUpdate: "2025-06-10",
    category: "analytics",
    tags: ["analytics", "relatórios", "dados"],
    downloads: 22145,
    verified: true,
    compatibility: "full"
  },
  {
    id: "4",
    name: "WhatsApp Business API",
    description: "Integre o WhatsApp Business API com o EngageFlow para atendimento multicanal.",
    icon: "https://cdn.example.com/whatsapp-icon.png",
    author: "ConnectAPI",
    rating: 4.6,
    reviews: 98,
    price: 79.90,
    installed: false,
    version: "1.5.2",
    lastUpdate: "2025-05-28",
    category: "communication",
    tags: ["whatsapp", "chat", "atendimento"],
    downloads: 7436,
    verified: true,
    compatibility: "full"
  },
  {
    id: "5",
    name: "AI Content Generator",
    description: "Gere conteúdo com IA para suas campanhas de marketing e redes sociais.",
    icon: "https://cdn.example.com/ai-content-icon.png",
    author: "AIWriter",
    rating: 4.3,
    reviews: 67,
    price: 39.90,
    installed: false,
    version: "2.2.0",
    lastUpdate: "2025-06-05",
    category: "ai",
    tags: ["IA", "conteúdo", "marketing"],
    downloads: 5821,
    verified: true,
    compatibility: "full"
  },
  {
    id: "6",
    name: "Appointment Scheduler",
    description: "Sistema de agendamento com lembretes automáticos e confirmações.",
    icon: "https://cdn.example.com/scheduler-icon.png",
    author: "TimeWise",
    rating: 4.4,
    reviews: 45,
    price: "free",
    installed: false,
    version: "1.0.8",
    lastUpdate: "2025-05-20",
    category: "automation",
    tags: ["agendamento", "automação", "lembretes"],
    downloads: 3574,
    verified: false,
    compatibility: "full"
  },
  {
    id: "7",
    name: "Customer Feedback Manager",
    description: "Colete, analise e responda a feedbacks de clientes em um só lugar.",
    icon: "https://cdn.example.com/feedback-icon.png",
    author: "FeedbackLoop",
    rating: 4.2,
    reviews: 29,
    price: 19.90,
    installed: false,
    version: "1.3.5",
    lastUpdate: "2025-06-01",
    category: "customer-service",
    tags: ["feedback", "clientes", "avaliações"],
    downloads: 2183,
    verified: true,
    compatibility: "partial"
  },
  {
    id: "8",
    name: "Form Builder Pro",
    description: "Crie formulários personalizados com validação e integração com seu CRM.",
    icon: "https://cdn.example.com/forms-icon.png",
    author: "FormCraft",
    rating: 3.9,
    reviews: 18,
    price: "free",
    installed: false,
    version: "0.9.2",
    lastUpdate: "2025-05-18",
    category: "utilities",
    tags: ["formulários", "CRM", "leads"],
    downloads: 1542,
    verified: false,
    compatibility: "partial"
  },
];

const MarketplacePage: React.FC = () => {
  const [extensions, setExtensions] = useState<Extension[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  
  const { toast } = useToast();
  
  useEffect(() => {
    // Simula carregamento inicial da API
    const timer = setTimeout(() => {
      setExtensions(mockExtensions);
      setIsLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleInstall = (id: string) => {
    const extension = extensions.find(ext => ext.id === id);
    if (extension) {
      // Atualizar o estado local
      setExtensions(prev =>
        prev.map(ext =>
          ext.id === id ? { ...ext, installed: true } : ext
        )
      );
      
      // Mostrar notificação
      toast({
        title: "Extensão instalada",
        description: `${extension.name} foi instalado com sucesso.`,
      });
    }
  };
  
  const handleUninstall = (id: string) => {
    const extension = extensions.find(ext => ext.id === id);
    if (extension) {
      // Atualizar o estado local
      setExtensions(prev =>
        prev.map(ext =>
          ext.id === id ? { ...ext, installed: false } : ext
        )
      );
      
      // Mostrar notificação
      toast({
        title: "Extensão desinstalada",
        description: `${extension.name} foi desinstalado.`,
      });
    }
  };
  
  const handleDetails = (id: string) => {
    // No futuro, isso pode abrir uma modal ou navegar para a página de detalhes
    const extension = extensions.find(ext => ext.id === id);
    if (extension) {
      toast({
        title: "Detalhes da extensão",
        description: `Mostrando detalhes de ${extension.name}.`,
      });
    }
  };
  
  const filterExtensions = () => {
    let filtered = [...extensions];
    
    // Filtrar por tab
    if (activeTab === "installed") {
      filtered = filtered.filter(ext => ext.installed);
    } else if (activeTab === "recommended") {
      filtered = filtered.filter(ext => ext.verified && ext.rating >= 4.5);
    }
    
    // Filtrar por categoria
    if (category !== "all") {
      filtered = filtered.filter(ext => ext.category === category);
    }
    
    // Filtrar por termo de busca
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        ext =>
          ext.name.toLowerCase().includes(term) ||
          ext.description.toLowerCase().includes(term) ||
          ext.author.toLowerCase().includes(term) ||
          ext.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }
    
    // Ordenar
    switch (sortBy) {
      case "recent":
        filtered.sort((a, b) => new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime());
        break;
      case "ratings":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "price-asc":
        filtered.sort((a, b) => {
          if (a.price === "free") return -1;
          if (b.price === "free") return 1;
          return (a.price as number) - (b.price as number);
        });
        break;
      case "price-desc":
        filtered.sort((a, b) => {
          if (a.price === "free") return 1;
          if (b.price === "free") return -1;
          return (b.price as number) - (a.price as number);
        });
        break;
      case "popular":
      default:
        filtered.sort((a, b) => b.downloads - a.downloads);
        break;
    }
    
    return filtered;
  };
  
  const filteredExtensions = filterExtensions();
  
  const getInstalledCount = () => extensions.filter(ext => ext.installed).length;
  
  return (
    <div className="container max-w-7xl mx-auto py-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Marketplace</h1>
          <div className="text-muted-foreground flex items-center text-sm">
            <span>Extensões e integrações para o EngageFlow</span>
            <ChevronRight className="h-4 w-4 mx-1" />
            <Badge variant="outline" className="font-normal">
              {extensions.length} Disponíveis
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <a href="#" className="text-sm text-primary hover:underline">
            Gerenciar Minha Conta
          </a>
          <Button variant="outline" className="gap-1">
            <Package className="h-4 w-4" />
            Minhas Extensões
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <TabsList>
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="installed">
              Instaladas
              <Badge variant="secondary" className="ml-2 bg-primary/20">
                {getInstalledCount()}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="recommended">Recomendadas</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                type="text"
                placeholder="Buscar extensões..."
                className="pl-9"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <div className="bg-card border rounded-lg overflow-hidden">
          <div className="p-4 border-b flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="min-w-[180px]">
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="min-w-[180px]">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <TabsContent value="all" className="m-0">
            {isLoading ? (
              <div className="p-12 flex flex-col items-center justify-center">
                <RefreshCw className="h-8 w-8 animate-spin text-primary mb-4" />
                <p className="text-muted-foreground">Carregando extensões...</p>
              </div>
            ) : filteredExtensions.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
                {filteredExtensions.map(extension => (
                  <ExtensionCard
                    key={extension.id}
                    extension={extension}
                    onInstall={handleInstall}
                    onUninstall={handleUninstall}
                    onDetails={handleDetails}
                  />
                ))}
              </div>
            ) : (
              <div className="p-12 text-center">
                <p className="text-muted-foreground">
                  Nenhuma extensão encontrada para os filtros selecionados.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="installed" className="m-0">
            {isLoading ? (
              <div className="p-12 flex flex-col items-center justify-center">
                <RefreshCw className="h-8 w-8 animate-spin text-primary mb-4" />
                <p className="text-muted-foreground">Carregando extensões...</p>
              </div>
            ) : filteredExtensions.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
                {filteredExtensions.map(extension => (
                  <ExtensionCard
                    key={extension.id}
                    extension={extension}
                    onInstall={handleInstall}
                    onUninstall={handleUninstall}
                    onDetails={handleDetails}
                  />
                ))}
              </div>
            ) : (
              <div className="p-12 text-center">
                <p className="text-muted-foreground">
                  Você ainda não tem extensões instaladas.
                </p>
                <Button variant="outline" className="mt-4" onClick={() => setActiveTab("all")}>
                  Explorar marketplace
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="recommended" className="m-0">
            {isLoading ? (
              <div className="p-12 flex flex-col items-center justify-center">
                <RefreshCw className="h-8 w-8 animate-spin text-primary mb-4" />
                <p className="text-muted-foreground">Carregando extensões...</p>
              </div>
            ) : filteredExtensions.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
                {filteredExtensions.map(extension => (
                  <ExtensionCard
                    key={extension.id}
                    extension={extension}
                    onInstall={handleInstall}
                    onUninstall={handleUninstall}
                    onDetails={handleDetails}
                  />
                ))}
              </div>
            ) : (
              <div className="p-12 text-center">
                <p className="text-muted-foreground">
                  Nenhuma extensão recomendada encontrada.
                </p>
              </div>
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default MarketplacePage;
