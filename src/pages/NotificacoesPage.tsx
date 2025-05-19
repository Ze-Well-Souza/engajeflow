
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Bell, MessageSquare, AlertTriangle, CheckCircle, Clock, Search,
  MoreVertical, Archive, Trash, EyeOff
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Dados de exemplo para notificações
const mockNotificacoes = [
  {
    id: 1,
    titulo: "Nova mensagem de cliente",
    descricao: "O cliente 'TechSolutions' enviou uma nova mensagem.",
    tipo: "mensagem",
    data: "2025-05-19T10:30:00",
    lido: false
  },
  {
    id: 2,
    titulo: "Agendamento confirmado",
    descricao: "O agendamento para o dia 20/05/2025 foi confirmado.",
    tipo: "sucesso",
    data: "2025-05-19T09:15:00",
    lido: true
  },
  {
    id: 3,
    titulo: "Erro na integração",
    descricao: "Ocorreu um erro na sincronização com a API externa.",
    tipo: "erro",
    data: "2025-05-19T08:45:00",
    lido: false
  },
  {
    id: 4,
    titulo: "Limite de uso próximo",
    descricao: "Sua conta está próxima do limite de uso mensal.",
    tipo: "alerta",
    data: "2025-05-18T16:20:00",
    lido: true
  },
  {
    id: 5,
    titulo: "Manutenção programada",
    descricao: "Haverá manutenção programada no dia 25/05/2025 das 2h às 4h.",
    tipo: "sistema",
    data: "2025-05-18T14:10:00",
    lido: false
  },
  {
    id: 6,
    titulo: "Novo recurso disponível",
    descricao: "O novo módulo de análise de campanhas já está disponível.",
    tipo: "sistema",
    data: "2025-05-17T11:00:00",
    lido: true
  }
];

const NotificacoesPage = () => {
  const [activeTab, setActiveTab] = useState("todas");
  const [notificacoes, setNotificacoes] = useState(mockNotificacoes);
  const [searchTerm, setSearchTerm] = useState("");

  const marcarComoLida = (id: number) => {
    setNotificacoes(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, lido: true } : notif
      )
    );
  };

  const marcarTodasComoLidas = () => {
    setNotificacoes(prev => 
      prev.map(notif => ({ ...notif, lido: true }))
    );
  };

  const arquivarNotificacao = (id: number) => {
    setNotificacoes(prev => 
      prev.filter(notif => notif.id !== id)
    );
  };

  const filtrarNotificacoes = () => {
    let filtradas = notificacoes;
    
    // Filtrar por tab selecionada
    if (activeTab !== "todas") {
      filtradas = filtradas.filter(n => n.tipo === activeTab);
    }
    
    // Filtrar por termo de busca
    if (searchTerm) {
      const termo = searchTerm.toLowerCase();
      filtradas = filtradas.filter(n => 
        n.titulo.toLowerCase().includes(termo) || 
        n.descricao.toLowerCase().includes(termo)
      );
    }
    
    return filtradas;
  };

  const getIconByType = (tipo: string) => {
    switch (tipo) {
      case "mensagem": return <MessageSquare className="h-5 w-5 text-blue-500" />;
      case "sucesso": return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "erro": return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "alerta": return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "sistema": return <Bell className="h-5 w-5 text-purple-500" />;
      default: return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getBadgeByType = (tipo: string) => {
    switch (tipo) {
      case "mensagem": return <Badge className="bg-blue-500">Mensagem</Badge>;
      case "sucesso": return <Badge className="bg-green-500">Sucesso</Badge>;
      case "erro": return <Badge className="bg-red-500">Erro</Badge>;
      case "alerta": return <Badge className="bg-amber-500">Alerta</Badge>;
      case "sistema": return <Badge className="bg-purple-500">Sistema</Badge>;
      default: return <Badge>Informação</Badge>;
    }
  };

  const formatarData = (data: string) => {
    const date = new Date(data);
    return new Intl.DateTimeFormat('pt-BR', { 
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const notificacoesFiltradas = filtrarNotificacoes();
  const totalNaoLidas = notificacoes.filter(n => !n.lido).length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Notificações</h2>
        <p className="text-muted-foreground">
          Gerencie suas notificações e alertas do sistema
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Centro de Notificações 
            {totalNaoLidas > 0 && (
              <Badge className="ml-2 bg-red-500">{totalNaoLidas}</Badge>
            )}
          </CardTitle>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={marcarTodasComoLidas}
              className="flex items-center gap-1"
              disabled={totalNaoLidas === 0}
            >
              <CheckCircle className="h-4 w-4" />
              Marcar todas como lidas
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4 items-end">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="search-notifications">Buscar Notificações</Label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="search-notifications" 
                    placeholder="Título ou descrição..." 
                    className="pl-8" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-6 w-full">
                <TabsTrigger value="todas">Todas</TabsTrigger>
                <TabsTrigger value="mensagem">Mensagens</TabsTrigger>
                <TabsTrigger value="sucesso">Sucessos</TabsTrigger>
                <TabsTrigger value="erro">Erros</TabsTrigger>
                <TabsTrigger value="alerta">Alertas</TabsTrigger>
                <TabsTrigger value="sistema">Sistema</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-4">
                {notificacoesFiltradas.length > 0 ? (
                  <div className="space-y-2">
                    {notificacoesFiltradas.map((notificacao) => (
                      <div 
                        key={notificacao.id} 
                        className={`p-4 border rounded-lg flex justify-between ${!notificacao.lido ? 'bg-muted/30' : ''}`}
                      >
                        <div className="flex gap-4">
                          <div className="mt-1">
                            {getIconByType(notificacao.tipo)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className={`font-medium ${!notificacao.lido ? 'font-semibold' : ''}`}>
                                {notificacao.titulo}
                              </h4>
                              {!notificacao.lido && (
                                <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                              )}
                              {getBadgeByType(notificacao.tipo)}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {notificacao.descricao}
                            </p>
                            <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {formatarData(notificacao.data)}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {!notificacao.lido && (
                                <DropdownMenuItem onClick={() => marcarComoLida(notificacao.id)}>
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Marcar como lida
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem onClick={() => arquivarNotificacao(notificacao.id)}>
                                <Archive className="h-4 w-4 mr-2" />
                                Arquivar
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                <Trash className="h-4 w-4 mr-2" />
                                Excluir
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <EyeOff className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-1">Nenhuma notificação encontrada</h3>
                    <p className="text-muted-foreground">
                      {searchTerm ? "Tente usar outros termos de busca" : "Você não tem notificações nesta categoria"}
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificacoesPage;
