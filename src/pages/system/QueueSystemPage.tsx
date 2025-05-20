
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Clock,
  List,
  BarChart,
  AlertCircle,
  Play,
  Pause,
  Plus,
  XCircle,
  Settings,
  ArrowUpDown,
  RefreshCw,
  Filter,
  Search,
  Trash2,
  Activity,
  Terminal,
  ChevronRight
} from "lucide-react";

const QueueSystemPage: React.FC = () => {
  const [selectedQueue, setSelectedQueue] = useState<string | null>(null);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <List className="text-primary" />
            Sistema de Filas
          </h1>
          <p className="text-muted-foreground">
            Gerenciamento de processamento assíncrono e operações em segundo plano
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Terminal className="h-4 w-4" />
            Console
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Nova Fila
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard 
          title="Mensagens Processadas"
          value="32,845"
          trend="+12% desde ontem"
          icon={<Activity className="h-5 w-5" />}
          trendPositive={true}
        />
        <StatCard 
          title="Mensagens na Fila"
          value="1,247"
          trend="-8% desde ontem"
          icon={<List className="h-5 w-5" />}
          trendPositive={true}
        />
        <StatCard 
          title="Tempo Médio de Processamento"
          value="1.2s"
          trend="-0.3s desde ontem"
          icon={<Clock className="h-5 w-5" />}
          trendPositive={true}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Filas Ativas</CardTitle>
              <CardDescription>
                Filas de processamento configuradas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <QueueItem 
                  name="email-notifications"
                  description="Envio de emails"
                  status="active"
                  messages={156}
                  isSelected={selectedQueue === "email-notifications"}
                  onSelect={() => setSelectedQueue("email-notifications")}
                />
                <QueueItem 
                  name="payment-processing"
                  description="Processamento de pagamentos"
                  status="active"
                  messages={42}
                  isSelected={selectedQueue === "payment-processing"}
                  onSelect={() => setSelectedQueue("payment-processing")}
                />
                <QueueItem 
                  name="report-generation"
                  description="Geração de relatórios"
                  status="paused"
                  messages={987}
                  isSelected={selectedQueue === "report-generation"}
                  onSelect={() => setSelectedQueue("report-generation")}
                />
                <QueueItem 
                  name="data-export"
                  description="Exportação de dados"
                  status="active"
                  messages={62}
                  isSelected={selectedQueue === "data-export"}
                  onSelect={() => setSelectedQueue("data-export")}
                />
                <QueueItem 
                  name="image-processing"
                  description="Processamento de imagens"
                  status="error"
                  messages={0}
                  isSelected={selectedQueue === "image-processing"}
                  onSelect={() => setSelectedQueue("image-processing")}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Nova Fila
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          {selectedQueue ? (
            <QueueDetailsPanel queueId={selectedQueue} />
          ) : (
            <Card className="h-full flex items-center justify-center">
              <div className="text-center p-8">
                <List className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">Selecione uma fila</h3>
                <p className="text-muted-foreground max-w-md">
                  Selecione uma fila à esquerda para visualizar seus detalhes, 
                  configurações e mensagens pendentes.
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  trend: string;
  icon: React.ReactNode;
  trendPositive: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, trend, icon, trendPositive }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold">{value}</div>
          <div className="p-2 rounded-full bg-primary/10 text-primary">
            {icon}
          </div>
        </div>
        <div className={`mt-2 text-sm ${trendPositive ? 'text-green-600' : 'text-red-600'}`}>
          {trend}
        </div>
      </CardContent>
    </Card>
  );
};

interface QueueItemProps {
  name: string;
  description: string;
  status: "active" | "paused" | "error";
  messages: number;
  isSelected: boolean;
  onSelect: () => void;
}

const QueueItem: React.FC<QueueItemProps> = ({ name, description, status, messages, isSelected, onSelect }) => {
  const getBadgeClasses = () => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-600 border-green-600";
      case "paused":
        return "bg-amber-500/10 text-amber-600 border-amber-600";
      case "error":
        return "bg-red-500/10 text-red-600 border-red-600";
      default:
        return "";
    }
  };
  
  const getStatusLabel = () => {
    switch (status) {
      case "active": return "Ativa";
      case "paused": return "Pausada";
      case "error": return "Erro";
      default: return "Desconhecido";
    }
  };
  
  return (
    <div 
      className={`p-3 rounded-md cursor-pointer ${isSelected ? 'bg-primary/10 border border-primary/30' : 'hover:bg-muted/80 border border-transparent'}`}
      onClick={onSelect}
    >
      <div className="flex justify-between mb-1">
        <h3 className="font-medium">{name}</h3>
        <Badge variant="outline" className={getBadgeClasses()}>
          {getStatusLabel()}
        </Badge>
      </div>
      <p className="text-sm text-muted-foreground mb-1">{description}</p>
      <div className="flex justify-between items-center text-xs">
        <span>{messages} mensagens</span>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </div>
    </div>
  );
};

interface QueueDetailsPanelProps {
  queueId: string;
}

const QueueDetailsPanel: React.FC<QueueDetailsPanelProps> = ({ queueId }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2">
              <List className="h-5 w-5 text-primary" />
              {queueId}
            </CardTitle>
            <CardDescription>
              {queueId === "email-notifications" && "Fila para envio de emails e notificações"}
              {queueId === "payment-processing" && "Fila para processamento assíncrono de pagamentos"}
              {queueId === "report-generation" && "Geração de relatórios em segundo plano"}
              {queueId === "data-export" && "Exportação de dados em formatos diversos"}
              {queueId === "image-processing" && "Processamento e otimização de imagens"}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            {queueId === "report-generation" ? (
              <Button size="sm" className="flex items-center gap-1">
                <Play className="h-4 w-4" />
                Iniciar
              </Button>
            ) : queueId === "image-processing" ? (
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <RefreshCw className="h-4 w-4" />
                Tentar Novamente
              </Button>
            ) : (
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Pause className="h-4 w-4" />
                Pausar
              </Button>
            )}
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="messages">
          <TabsList className="w-full rounded-none px-6">
            <TabsTrigger value="messages">Mensagens</TabsTrigger>
            <TabsTrigger value="metrics">Métricas</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="messages" className="p-6 pt-4">
            <div className="flex justify-between mb-4">
              <div className="flex gap-2">
                <Input placeholder="Buscar mensagens..." className="w-64" />
                <Button variant="outline" size="icon">
                  <Search className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os status</SelectItem>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="processing">Em Processamento</SelectItem>
                  <SelectItem value="completed">Concluído</SelectItem>
                  <SelectItem value="failed">Falhou</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="border rounded-md">
              <div className="bg-muted/50 p-3 grid grid-cols-12 gap-4 text-sm font-medium">
                <div className="col-span-1">#ID</div>
                <div className="col-span-3">Assunto</div>
                <div className="col-span-2">Prioridade</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2">Adicionada</div>
                <div className="col-span-2">Ações</div>
              </div>
              
              {queueId !== "image-processing" && (
                <>
                  <QueueMessageItem 
                    id="1a2b3c"
                    subject="Confirmação de Pagamento #12345"
                    priority="high"
                    status="pending"
                    added="há 5 minutos"
                  />
                  <QueueMessageItem 
                    id="2c3d4e"
                    subject="Boas-vindas para novo usuário"
                    priority="normal"
                    status="processing"
                    added="há 10 minutos"
                  />
                  <QueueMessageItem 
                    id="3e4f5g"
                    subject="Recuperação de senha"
                    priority="high"
                    status="pending"
                    added="há 12 minutos"
                  />
                  <QueueMessageItem 
                    id="4g5h6i"
                    subject="Newsletter semanal"
                    priority="low"
                    status="pending"
                    added="há 30 minutos"
                  />
                </>
              )}
              
              {queueId === "image-processing" && (
                <div className="p-8 text-center">
                  <AlertCircle className="mx-auto mb-2 h-8 w-8 text-amber-500" />
                  <h3 className="font-medium mb-1">Serviço temporariamente indisponível</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Esta fila está indisponível devido a um erro no processador de imagens.
                  </p>
                  <Button variant="outline" size="sm" className="mx-auto">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Tentar Novamente
                  </Button>
                </div>
              )}
            </div>
            
            {queueId !== "image-processing" && (
              <div className="flex justify-between items-center mt-4">
                <Button variant="outline" size="sm">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Atualizar
                </Button>
                <div className="text-sm text-muted-foreground">
                  Mostrando 1-4 de 42 mensagens
                </div>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" disabled>Anterior</Button>
                  <Button variant="outline" size="sm">Próxima</Button>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="metrics" className="p-6 pt-4">
            <div className="space-y-6">
              <div className="h-64 bg-muted/50 rounded-md flex items-center justify-center">
                <BarChart className="h-12 w-12 text-muted-foreground/50" />
                <span className="ml-2 text-muted-foreground">Gráfico de processamento</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-muted/30 rounded">
                  <div className="text-sm text-muted-foreground">Taxa de processamento</div>
                  <div className="text-2xl font-bold">23.5/min</div>
                  <div className="text-sm text-green-600">↑ 10% vs. média</div>
                </div>
                <div className="p-4 bg-muted/30 rounded">
                  <div className="text-sm text-muted-foreground">Tempo médio</div>
                  <div className="text-2xl font-bold">1.2s</div>
                  <div className="text-sm text-green-600">↓ 0.3s vs. ontem</div>
                </div>
                <div className="p-4 bg-muted/30 rounded">
                  <div className="text-sm text-muted-foreground">Taxa de falhas</div>
                  <div className="text-2xl font-bold">0.8%</div>
                  <div className="text-sm text-green-600">↓ 0.5% vs. média</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Distribuição por status</h3>
                  <div className="h-40 bg-muted/50 rounded-md flex items-center justify-center">
                    <div className="text-muted-foreground text-sm">Gráfico de distribuição</div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Processamento por hora</h3>
                  <div className="h-40 bg-muted/50 rounded-md flex items-center justify-center">
                    <div className="text-muted-foreground text-sm">Gráfico de processamento</div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="p-6 pt-4">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-1">Nome da Fila</h3>
                    <Input value={queueId} />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-1">Descrição</h3>
                    <Input value={
                      queueId === "email-notifications" ? "Fila para envio de emails e notificações" :
                      queueId === "payment-processing" ? "Fila para processamento assíncrono de pagamentos" :
                      queueId === "report-generation" ? "Geração de relatórios em segundo plano" :
                      queueId === "data-export" ? "Exportação de dados em formatos diversos" :
                      "Processamento e otimização de imagens"
                    } />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-1">Concorrência</h3>
                    <Select defaultValue="5">
                      <SelectTrigger>
                        <SelectValue placeholder="Concorrência" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground mt-1">
                      Número máximo de mensagens processadas simultaneamente
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-1">Timeout</h3>
                    <div className="flex gap-2">
                      <Input type="number" defaultValue="300" />
                      <Select defaultValue="seconds">
                        <SelectTrigger className="w-[110px]">
                          <SelectValue placeholder="Unidade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="seconds">segundos</SelectItem>
                          <SelectItem value="minutes">minutos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Tempo máximo para processamento de uma mensagem
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-1">Tentativas</h3>
                    <Input type="number" defaultValue="3" />
                    <p className="text-xs text-muted-foreground mt-1">
                      Número de tentativas em caso de falha
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-1">Delay entre Tentativas</h3>
                    <div className="flex gap-2">
                      <Input type="number" defaultValue="60" />
                      <Select defaultValue="seconds">
                        <SelectTrigger className="w-[110px]">
                          <SelectValue placeholder="Unidade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="seconds">segundos</SelectItem>
                          <SelectItem value="minutes">minutos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Tempo de espera entre tentativas
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4 flex justify-end gap-2">
                <Button variant="destructive" className="flex items-center gap-1">
                  <Trash2 className="h-4 w-4" />
                  Excluir Fila
                </Button>
                <Button variant="outline">Cancelar</Button>
                <Button>Salvar Alterações</Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="logs" className="p-6 pt-4">
            <div className="space-y-4">
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Nível do Log" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os níveis</SelectItem>
                      <SelectItem value="info">Info</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                      <SelectItem value="error">Error</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
                <Button variant="outline" size="sm">
                  Baixar Logs
                </Button>
              </div>
              
              <div className="border rounded overflow-hidden">
                <div className="h-80 overflow-y-auto bg-muted/30 font-mono text-sm p-4">
                  <div className="text-green-600">[2025-05-20 09:45:22] [INFO] Processamento iniciado para ID: 4g5h6i</div>
                  <div className="text-green-600">[2025-05-20 09:45:23] [INFO] Mensagem processada com sucesso: 4g5h6i</div>
                  <div className="text-green-600">[2025-05-20 09:44:15] [INFO] Processamento iniciado para ID: 3e4f5g</div>
                  <div className="text-amber-600">[2025-05-20 09:44:18] [WARNING] Atraso no processamento: 3e4f5g (3s)</div>
                  <div className="text-green-600">[2025-05-20 09:44:20] [INFO] Mensagem processada com sucesso: 3e4f5g</div>
                  <div className="text-green-600">[2025-05-20 09:42:01] [INFO] Processamento iniciado para ID: 2c3d4e</div>
                  <div className="text-green-600">[2025-05-20 09:42:03] [INFO] Mensagem processada com sucesso: 2c3d4e</div>
                  <div className="text-red-600">[2025-05-20 09:40:12] [ERROR] Falha no processamento: 1a2b3c</div>
                  <div className="text-amber-600">[2025-05-20 09:40:13] [WARNING] Reagendando para nova tentativa: 1a2b3c</div>
                  <div className="text-green-600">[2025-05-20 09:40:00] [INFO] Processamento iniciado para ID: 1a2b3c</div>
                  <div className="text-green-600">[2025-05-20 09:39:45] [INFO] Iniciando worker #3</div>
                  <div className="text-green-600">[2025-05-20 09:39:45] [INFO] Iniciando worker #2</div>
                  <div className="text-green-600">[2025-05-20 09:39:45] [INFO] Iniciando worker #1</div>
                  <div className="text-green-600">[2025-05-20 09:39:44] [INFO] Fila iniciada com configurações: concorrência=3, timeout=300s</div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

interface QueueMessageItemProps {
  id: string;
  subject: string;
  priority: "high" | "normal" | "low";
  status: "pending" | "processing" | "completed" | "failed";
  added: string;
}

const QueueMessageItem: React.FC<QueueMessageItemProps> = ({ id, subject, priority, status, added }) => {
  const getPriorityBadge = () => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-500/10 text-red-600 border-red-600/20">Alta</Badge>;
      case "normal":
        return <Badge className="bg-blue-500/10 text-blue-600 border-blue-600/20">Normal</Badge>;
      case "low":
        return <Badge className="bg-green-500/10 text-green-600 border-green-600/20">Baixa</Badge>;
      default:
        return null;
    }
  };
  
  const getStatusBadge = () => {
    switch (status) {
      case "pending":
        return <Badge className="bg-amber-500/10 text-amber-600 border-amber-600/20">Pendente</Badge>;
      case "processing":
        return <Badge className="bg-blue-500/10 text-blue-600 border-blue-600/20">Processando</Badge>;
      case "completed":
        return <Badge className="bg-green-500/10 text-green-600 border-green-600/20">Concluído</Badge>;
      case "failed":
        return <Badge className="bg-red-500/10 text-red-600 border-red-600/20">Falhou</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <div className="p-3 grid grid-cols-12 gap-4 text-sm border-b items-center">
      <div className="col-span-1 font-mono">{id}</div>
      <div className="col-span-3">{subject}</div>
      <div className="col-span-2">{getPriorityBadge()}</div>
      <div className="col-span-2">{getStatusBadge()}</div>
      <div className="col-span-2 text-muted-foreground">{added}</div>
      <div className="col-span-2 flex gap-1">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Play className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <XCircle className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default QueueSystemPage;
