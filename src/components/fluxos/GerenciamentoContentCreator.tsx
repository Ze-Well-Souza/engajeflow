
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Instagram, Facebook, Youtube, TwitterIcon } from "lucide-react";

const GerenciamentoContentCreator: React.FC = () => {
  const [activeTab, setActiveTab] = useState("calendario");
  
  // Lista de projetos
  const projetos = [
    {
      id: "1",
      titulo: "Campanha Primavera 2025",
      cliente: "ModaStyle",
      prazo: "2025-05-30",
      status: "em_andamento",
      progresso: 60,
      plataformas: ["instagram", "facebook"]
    },
    {
      id: "2",
      titulo: "Lançamento Produto X",
      cliente: "TechNova",
      prazo: "2025-06-15",
      status: "planejamento",
      progresso: 25,
      plataformas: ["youtube", "instagram"]
    },
    {
      id: "3",
      titulo: "Cobertura Evento Anual",
      cliente: "Corporação ABC",
      prazo: "2025-07-05",
      status: "aprovado",
      progresso: 40,
      plataformas: ["instagram", "facebook", "youtube", "twitter"]
    }
  ];
  
  // Lista de conteúdos
  const conteudos = [
    {
      id: "1",
      titulo: "Lookbook Coleção Verão",
      tipo: "Fotografia",
      cliente: "ModaStyle",
      entrega: "2025-05-25",
      status: "editando"
    },
    {
      id: "2",
      titulo: "Unboxing Produto X",
      tipo: "Vídeo",
      cliente: "TechNova",
      entrega: "2025-06-10",
      status: "aguardando"
    },
    {
      id: "3",
      titulo: "Entrevista com CEO",
      tipo: "Vídeo",
      cliente: "Corporação ABC",
      entrega: "2025-06-20",
      status: "finalizado"
    },
    {
      id: "4",
      titulo: "Fotos Produtos Primavera",
      tipo: "Fotografia",
      cliente: "ModaStyle",
      entrega: "2025-05-20",
      status: "revisao"
    }
  ];
  
  // Lista de equipamentos
  const equipamentos = [
    {
      id: "1",
      nome: "Canon EOS R5",
      tipo: "Camera",
      status: "disponivel"
    },
    {
      id: "2",
      nome: "Ring Light 18\"",
      tipo: "Iluminação",
      status: "em_uso"
    },
    {
      id: "3",
      nome: "DJI Ronin-S",
      tipo: "Estabilizador",
      status: "disponivel"
    },
    {
      id: "4",
      nome: "MacBook Pro M2",
      tipo: "Computador",
      status: "em_uso"
    },
    {
      id: "5",
      nome: "Sony A7III",
      tipo: "Camera",
      status: "manutenção"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "em_andamento":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "planejamento":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "aprovado":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "finalizado":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "editando":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "revisao":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
      case "aguardando":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };
  
  const getEquipamentoStatusColor = (status: string) => {
    switch (status) {
      case "disponivel":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "em_uso":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "manutenção":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };
  
  const socialIcon = (platform: string) => {
    switch (platform) {
      case "instagram":
        return <Instagram className="h-4 w-4 text-pink-500" />;
      case "facebook":
        return <Facebook className="h-4 w-4 text-blue-500" />;
      case "youtube":
        return <Youtube className="h-4 w-4 text-red-500" />;
      case "twitter":
        return <TwitterIcon className="h-4 w-4 text-sky-500" />;
      default:
        return null;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="bg-purple-50 dark:bg-purple-900/20 border-b">
        <CardTitle className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 text-purple-500"
          >
            <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path>
            <path d="M9 18h6"></path>
            <path d="M10 22h4"></path>
          </svg>
          Gerenciamento de Conteúdo
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="calendario">Projetos</TabsTrigger>
            <TabsTrigger value="conteudos">Conteúdos</TabsTrigger>
            <TabsTrigger value="equipamentos">Equipamentos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="calendario">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Projetos Ativos</h3>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>
                  Novo Projeto
                </Button>
              </div>
              
              <div className="space-y-4">
                {projetos.map((projeto) => (
                  <Card key={projeto.id} className="border">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{projeto.titulo}</h4>
                        <Badge className={getStatusColor(projeto.status)}>
                          {projeto.status === "em_andamento" 
                            ? "Em andamento" 
                            : projeto.status.charAt(0).toUpperCase() + projeto.status.slice(1).replace("_", " ")}
                        </Badge>
                      </div>
                      
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">Cliente: {projeto.cliente}</p>
                        <p className="text-sm text-gray-500">Prazo: {projeto.prazo.split('-').reverse().join('/')}</p>
                      </div>
                      
                      <div className="mt-4">
                        <div className="flex justify-between items-center mb-1 text-sm">
                          <span>Progresso</span>
                          <span>{projeto.progresso}%</span>
                        </div>
                        <Progress value={projeto.progresso} className="h-2" />
                      </div>
                      
                      <div className="mt-4 flex justify-between items-center">
                        <div className="flex items-center gap-1">
                          {projeto.plataformas.map((plataforma) => (
                            <div key={plataforma} className="rounded-full bg-gray-100 dark:bg-gray-800 p-1">
                              {socialIcon(plataforma)}
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="h-8">
                            Detalhes
                          </Button>
                          <Button size="sm" variant="outline" className="h-8">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="space-y-4 mt-8 border-t pt-6">
                <h3 className="text-lg font-medium">Adicionar Projeto</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="projeto-titulo">Título do Projeto</Label>
                  <Input id="projeto-titulo" placeholder="Digite o título do projeto" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="projeto-cliente">Cliente</Label>
                    <Input id="projeto-cliente" placeholder="Nome do cliente" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="projeto-prazo">Data de Entrega</Label>
                    <Input id="projeto-prazo" type="date" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Plataformas</Label>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="instagram" className="rounded" />
                      <Label htmlFor="instagram" className="flex items-center gap-1.5">
                        <Instagram className="h-4 w-4 text-pink-500" /> Instagram
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="facebook" className="rounded" />
                      <Label htmlFor="facebook" className="flex items-center gap-1.5">
                        <Facebook className="h-4 w-4 text-blue-500" /> Facebook
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="youtube" className="rounded" />
                      <Label htmlFor="youtube" className="flex items-center gap-1.5">
                        <Youtube className="h-4 w-4 text-red-500" /> YouTube
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="twitter" className="rounded" />
                      <Label htmlFor="twitter" className="flex items-center gap-1.5">
                        <TwitterIcon className="h-4 w-4 text-sky-500" /> Twitter
                      </Label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="projeto-descricao">Descrição</Label>
                  <Textarea id="projeto-descricao" placeholder="Descreva os detalhes do projeto..." />
                </div>
                
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Salvar Projeto
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="conteudos">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Lista de Conteúdos</h3>
                <div className="flex gap-2">
                  <Select defaultValue="todos">
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Filtrar por tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos os tipos</SelectItem>
                      <SelectItem value="fotografia">Fotografia</SelectItem>
                      <SelectItem value="video">Vídeo</SelectItem>
                      <SelectItem value="texto">Texto</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>
                    Novo Conteúdo
                  </Button>
                </div>
              </div>
              
              <div className="space-y-3">
                {conteudos.map((conteudo) => (
                  <div key={conteudo.id} className="flex items-center gap-3 border rounded-md p-4">
                    <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                      {conteudo.tipo === "Fotografia" ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><circle cx="9" cy="9" r="2"></circle><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path></svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect width="15" height="14" x="1" y="5" rx="2" ry="2"></rect></svg>
                      )}
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                        <h4 className="font-medium">{conteudo.titulo}</h4>
                        <Badge className={getStatusColor(conteudo.status)}>
                          {conteudo.status.charAt(0).toUpperCase() + conteudo.status.slice(1)}
                        </Badge>
                      </div>
                      
                      <div className="text-sm text-gray-500 mt-1 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                        <span>Cliente: {conteudo.cliente}</span>
                        <span className="hidden sm:inline">•</span>
                        <span>Entrega: {conteudo.entrega.split('-').reverse().join('/')}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="h-8">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                      </Button>
                      <Button variant="outline" size="sm" className="h-8">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-4 mt-8 border-t pt-6">
                <h3 className="text-lg font-medium">Adicionar Conteúdo</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="conteudo-titulo">Título do Conteúdo</Label>
                  <Input id="conteudo-titulo" placeholder="Digite o título do conteúdo" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="conteudo-tipo">Tipo</Label>
                    <Select>
                      <SelectTrigger id="conteudo-tipo">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fotografia">Fotografia</SelectItem>
                        <SelectItem value="video">Vídeo</SelectItem>
                        <SelectItem value="texto">Texto</SelectItem>
                        <SelectItem value="audio">Áudio</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="conteudo-projeto">Projeto</Label>
                    <Select>
                      <SelectTrigger id="conteudo-projeto">
                        <SelectValue placeholder="Selecione o projeto" />
                      </SelectTrigger>
                      <SelectContent>
                        {projetos.map((projeto) => (
                          <SelectItem key={projeto.id} value={projeto.id}>{projeto.titulo}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="conteudo-cliente">Cliente</Label>
                    <Select>
                      <SelectTrigger id="conteudo-cliente">
                        <SelectValue placeholder="Selecione o cliente" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="modastyle">ModaStyle</SelectItem>
                        <SelectItem value="technova">TechNova</SelectItem>
                        <SelectItem value="corporacao-abc">Corporação ABC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="conteudo-entrega">Data de Entrega</Label>
                    <Input id="conteudo-entrega" type="date" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="conteudo-descricao">Descrição</Label>
                  <Textarea id="conteudo-descricao" placeholder="Detalhes sobre o conteúdo a ser produzido..." />
                </div>
                
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Adicionar Conteúdo
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="equipamentos">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Equipamentos</h3>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>
                  Novo Equipamento
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {equipamentos.map((equipamento) => (
                  <Card key={equipamento.id} className="border">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{equipamento.nome}</h4>
                        <Badge className={getEquipamentoStatusColor(equipamento.status)}>
                          {equipamento.status === "em_uso" 
                            ? "Em uso" 
                            : equipamento.status.charAt(0).toUpperCase() + equipamento.status.slice(1)}
                        </Badge>
                      </div>
                      
                      <div className="text-sm text-gray-500 mt-1">
                        <span>Tipo: {equipamento.tipo}</span>
                      </div>
                      
                      <div className="flex justify-between mt-4">
                        {equipamento.status === "disponivel" && (
                          <Button size="sm" variant="outline">Reservar</Button>
                        )}
                        {equipamento.status === "em_uso" && (
                          <Button size="sm" variant="outline">Devolver</Button>
                        )}
                        {equipamento.status === "manutenção" && (
                          <Button size="sm" variant="outline" disabled>Indisponível</Button>
                        )}
                        
                        <Button variant="ghost" size="sm">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="space-y-4 mt-8 border-t pt-6">
                <h3 className="text-lg font-medium">Reservar Equipamento</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="equipamento">Equipamento</Label>
                    <Select>
                      <SelectTrigger id="equipamento">
                        <SelectValue placeholder="Selecione o equipamento" />
                      </SelectTrigger>
                      <SelectContent>
                        {equipamentos
                          .filter(eq => eq.status === "disponivel")
                          .map((eq) => (
                            <SelectItem key={eq.id} value={eq.id}>{eq.nome}</SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="projeto-reserva">Projeto</Label>
                    <Select>
                      <SelectTrigger id="projeto-reserva">
                        <SelectValue placeholder="Selecione o projeto" />
                      </SelectTrigger>
                      <SelectContent>
                        {projetos.map((projeto) => (
                          <SelectItem key={projeto.id} value={projeto.id}>{projeto.titulo}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="data-inicio">Data de Início</Label>
                    <Input id="data-inicio" type="date" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="data-fim">Data de Devolução</Label>
                    <Input id="data-fim" type="date" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="observacoes">Observações</Label>
                  <Textarea id="observacoes" placeholder="Informações adicionais sobre a reserva..." />
                </div>
                
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Confirmar Reserva
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default GerenciamentoContentCreator;
