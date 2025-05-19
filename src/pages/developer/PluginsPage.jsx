
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Download, Code, Shield, Settings, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";

const PluginCard = ({
  title,
  description,
  author,
  downloads,
  version,
  category,
  icon,
  installed
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start gap-4">
        <div className="bg-primary/10 p-3 rounded-md">
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg">{title}</CardTitle>
            <Badge variant={installed ? "outline" : "default"}>
              {installed ? "Instalado" : "Disponível"}
            </Badge>
          </div>
          <div className="flex gap-2 mt-1">
            <Badge variant="secondary" className="text-xs">{category}</Badge>
            <span className="text-xs text-gray-500">v{version}</span>
          </div>
          <CardDescription className="mt-2 line-clamp-2">{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>Por: {author}</span>
          <span>{downloads.toLocaleString()} downloads</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant={installed ? "outline" : "default"} className="w-full">
          {installed ? "Configurar" : "Instalar"}
        </Button>
      </CardFooter>
    </Card>
  );
};

const PluginsPage = () => {
  const plugins = [
    {
      title: "Analytics Avançado",
      description: "Exibe métricas avançadas e visualizações personalizáveis para seus dados.",
      author: "TechZe Labs",
      downloads: 5280,
      version: "1.2.3",
      category: "Análise",
      icon: <Settings className="h-6 w-6 text-primary" />,
      installed: true
    },
    {
      title: "Integração Shopify",
      description: "Conecta sua loja Shopify diretamente à plataforma TechZe.",
      author: "Commerce Solutions",
      downloads: 3421,
      version: "2.0.1",
      category: "Integração",
      icon: <Code className="h-6 w-6 text-primary" />
    },
    {
      title: "Segurança Avançada",
      description: "Adiciona camadas extras de segurança e validação para sua conta.",
      author: "SecureTech",
      downloads: 9876,
      version: "1.5.0",
      category: "Segurança",
      icon: <Shield className="h-6 w-6 text-primary" />
    },
    {
      title: "Auto Responder",
      description: "Configura respostas automáticas baseadas em regras personalizadas.",
      author: "MessagePro",
      downloads: 7532,
      version: "3.1.2",
      category: "Mensagens",
      icon: <MessageSquare className="h-6 w-6 text-primary" />,
      installed: true
    },
  ];

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Sistema de Plugins e Extensões</h1>
      
      <div className="flex justify-between items-center mb-6">
        <div className="text-muted-foreground">
          Encontre e instale plugins para expandir as funcionalidades da plataforma TechZe
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar plugins..."
              className="pl-8 w-[250px]"
            />
          </div>
          <Button variant="outline">Categorias</Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plugins.map((plugin, index) => (
          <PluginCard
            key={index}
            title={plugin.title}
            description={plugin.description}
            author={plugin.author}
            downloads={plugin.downloads}
            version={plugin.version}
            category={plugin.category}
            icon={plugin.icon}
            installed={plugin.installed}
          />
        ))}
      </div>
      
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Desenvolva seu próprio plugin</CardTitle>
          <CardDescription>
            Crie plugins personalizados e distribua na plataforma TechZe
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Com o SDK de desenvolvimento de plugins da TechZe, você pode criar extensões personalizadas
            para adicionar novas funcionalidades, integrações ou melhorias à plataforma.
          </p>
          <div className="flex gap-4 mt-4">
            <Button className="flex items-center gap-2">
              <Download size={16} />
              Baixar SDK
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Code size={16} />
              Documentação
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PluginsPage;
