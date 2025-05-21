
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { 
  Bot, 
  Calendar, 
  CheckCircle, 
  Clock, 
  Code, 
  Database, 
  ExternalLink, 
  Link as LinkIcon, 
  Loader2, 
  Settings, 
  Shield, 
  Timer, 
  Activity,
  BarChart,
  Brain,
  ChevronRight
} from "lucide-react";

const AutomationDashboard: React.FC = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">TechCare Connect Automator</h1>
          <p className="text-muted-foreground mt-1">Painel de controle e monitoramento de automações</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Configurações
          </Button>
          <Button>
            <Bot className="h-4 w-4 mr-2" />
            Nova Automação
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <Bot className="h-5 w-5 mr-2 text-primary" />
              Automações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
            <p className="text-sm text-muted-foreground">5 ativas, 7 agendadas</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
              Taxa de Sucesso
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">98.2%</div>
            <p className="text-sm text-muted-foreground">+2.4% em relação à semana passada</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <Clock className="h-5 w-5 mr-2 text-amber-500" />
              Tempo Médio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1.8s</div>
            <p className="text-sm text-muted-foreground">Por operação automatizada</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <Timer className="h-5 w-5 mr-2 text-blue-500" />
              Economia
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">42h</div>
            <p className="text-sm text-muted-foreground">Tempo economizado este mês</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Status das Automações</CardTitle>
            <CardDescription>Monitoramento em tempo real das automações ativas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Login Automático", status: "success", progress: 100, lastRun: "2 min atrás", runtime: "1.2s" },
                { name: "Coleta de Dados", status: "running", progress: 65, lastRun: "Em execução", runtime: "0.8s" },
                { name: "Sincronização de Tickets", status: "pending", progress: 0, lastRun: "Agendado", runtime: "~3.5s" },
                { name: "Relatório Diário", status: "error", progress: 35, lastRun: "Falha", runtime: "N/A" },
                { name: "Atualização de Status", status: "success", progress: 100, lastRun: "1h atrás", runtime: "2.4s" }
              ].map((automation, index) => (
                <div key={index} className="border p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <h3 className="font-medium">{automation.name}</h3>
                      <Badge 
                        variant={
                          automation.status === "success" ? "default" :
                          automation.status === "running" ? "secondary" :
                          automation.status === "pending" ? "outline" : "destructive"
                        }
                        className="ml-2"
                      >
                        {automation.status === "success" ? "Completo" :
                         automation.status === "running" ? "Em execução" :
                         automation.status === "pending" ? "Agendado" : "Erro"}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {automation.status === "running" ? (
                        <div className="flex items-center">
                          <Loader2 className="h-3 w-3 animate-spin mr-1" />
                          <span>Em execução</span>
                        </div>
                      ) : (
                        <span>Última execução: {automation.lastRun}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="w-full mb-2">
                    <Progress
                      value={automation.progress}
                      className="h-2"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{automation.progress}% completo</span>
                    <span className="text-muted-foreground">Tempo de execução: {automation.runtime}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="justify-between">
            <Button variant="ghost" size="sm">Ver todas as automações</Button>
            <Button size="sm">Atualizar Status</Button>
          </CardFooter>
        </Card>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Conexões</CardTitle>
              <CardDescription>Status das integrações configuradas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between py-1">
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  <span>TechCare API</span>
                </div>
                <Badge variant="outline">Conectado</Badge>
              </div>
              <div className="flex items-center justify-between py-1">
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  <span>Banco de Dados</span>
                </div>
                <Badge variant="outline">Conectado</Badge>
              </div>
              <div className="flex items-center justify-between py-1">
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-amber-500 mr-2"></div>
                  <span>Sistema de Arquivos</span>
                </div>
                <Badge variant="outline">Parcial</Badge>
              </div>
              <div className="flex items-center justify-between py-1">
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
                  <span>Email SMTP</span>
                </div>
                <Badge variant="outline">Desconectado</Badge>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                <LinkIcon className="h-4 w-4 mr-2" />
                Gerenciar Conexões
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recursos</CardTitle>
              <CardDescription>Links úteis e documentação</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-between" asChild>
                <Link to="/ai/techcare">
                  <div className="flex items-center">
                    <Brain className="h-4 w-4 mr-2 text-purple-500" />
                    <span>IA Generativa</span>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-between">
                <div className="flex items-center">
                  <Code className="h-4 w-4 mr-2 text-blue-500" />
                  <span>Documentação API</span>
                </div>
                <ExternalLink className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-between">
                <div className="flex items-center">
                  <Database className="h-4 w-4 mr-2 text-green-500" />
                  <span>Editor de Scripts</span>
                </div>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-between">
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-amber-500" />
                  <span>Segurança</span>
                </div>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Tabs defaultValue="agenda" className="w-full">
        <TabsList className="w-full mb-6">
          <TabsTrigger value="agenda" className="flex-1">
            <Calendar className="h-4 w-4 mr-2" />
            Agenda
          </TabsTrigger>
          <TabsTrigger value="logs" className="flex-1">
            <Activity className="h-4 w-4 mr-2" />
            Logs
          </TabsTrigger>
          <TabsTrigger value="stats" className="flex-1">
            <BarChart className="h-4 w-4 mr-2" />
            Estatísticas
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="agenda">
          <Card>
            <CardHeader>
              <CardTitle>Automações Agendadas</CardTitle>
              <CardDescription>Próximas execuções programadas</CardDescription>
            </CardHeader>
            <CardContent>
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b">
                    <th className="pb-2 font-medium">Automação</th>
                    <th className="pb-2 font-medium">Agendamento</th>
                    <th className="pb-2 font-medium">Próxima Execução</th>
                    <th className="pb-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "Relatório Diário", schedule: "Diário - 07:00", next: "Amanhã, 07:00", status: "ativo" },
                    { name: "Backup de Dados", schedule: "Semanal - Segunda", next: "Segunda, 01:00", status: "ativo" },
                    { name: "Sincronização", schedule: "A cada 4h", next: "Hoje, 16:00", status: "ativo" },
                    { name: "Validação de Tickets", schedule: "Diário - 09:00", next: "Amanhã, 09:00", status: "pausado" }
                  ].map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-3">{item.name}</td>
                      <td className="py-3">{item.schedule}</td>
                      <td className="py-3">{item.next}</td>
                      <td className="py-3">
                        <Badge variant={item.status === "ativo" ? "default" : "secondary"}>
                          {item.status === "ativo" ? "Ativo" : "Pausado"}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <CardTitle>Logs do Sistema</CardTitle>
              <CardDescription>Atividades recentes e mensagens de log</CardDescription>
            </CardHeader>
            <CardContent className="max-h-80 overflow-y-auto">
              <div className="space-y-2 font-mono text-sm">
                {[
                  { time: "10:15:22", level: "info", message: "Login automático realizado com sucesso" },
                  { time: "10:14:36", level: "info", message: "Iniciando sessão automática" },
                  { time: "10:14:30", level: "info", message: "Cron job iniciado: login_automático" },
                  { time: "09:32:15", level: "error", message: "Falha na extração de dados: elemento não encontrado" },
                  { time: "09:30:05", level: "warn", message: "Tempo limite de carregamento excedido para a página de tickets" },
                  { time: "09:22:44", level: "info", message: "Backup de dados concluído: 1432 registros" },
                  { time: "09:00:00", level: "info", message: "Cron job iniciado: sincronização_diária" }
                ].map((log, index) => (
                  <div key={index} className={`p-2 rounded ${
                    log.level === "error" ? "bg-red-500/10" :
                    log.level === "warn" ? "bg-amber-500/10" : "bg-muted"
                  }`}>
                    <span className="text-muted-foreground">[{log.time}]</span> 
                    <span className={`mx-2 px-1 rounded text-xs ${
                      log.level === "error" ? "bg-red-500/20 text-red-700" :
                      log.level === "warn" ? "bg-amber-500/20 text-amber-700" : 
                      "bg-blue-500/20 text-blue-700"
                    }`}>
                      {log.level.toUpperCase()}
                    </span>
                    <span>{log.message}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                Ver Todos os Logs
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="stats">
          <Card>
            <CardHeader>
              <CardTitle>Estatísticas de Uso</CardTitle>
              <CardDescription>Métricas e desempenho do sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Total de Execuções</h3>
                  <p className="text-2xl font-bold">1,248</p>
                  <span className="text-sm text-green-600">+12% este mês</span>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Tempo Médio</h3>
                  <p className="text-2xl font-bold">2.4s</p>
                  <span className="text-sm text-green-600">-0.3s vs. último mês</span>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Taxa de Sucesso</h3>
                  <p className="text-2xl font-bold">97.8%</p>
                  <span className="text-sm text-amber-600">-0.4% vs. último mês</span>
                </div>
              </div>
              
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">Distribuição de Operações</h3>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Login e Navegação</span>
                      <span>38%</span>
                    </div>
                    <Progress value={38} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Extração de Dados</span>
                      <span>24%</span>
                    </div>
                    <Progress value={24} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Processamento</span>
                      <span>20%</span>
                    </div>
                    <Progress value={20} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Geração de Relatórios</span>
                      <span>18%</span>
                    </div>
                    <Progress value={18} className="h-2" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                Ver Relatório Completo
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AutomationDashboard;
