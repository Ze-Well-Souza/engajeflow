
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { Play, Pause, RotateCcw, Activity, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import EnvSetupForm from '../setup/EnvSetupForm';
import { env } from '@/utils/EnvironmentConfig';
import { initializeSession } from '@/services/techcare';

interface AutomationTask {
  id: string;
  name: string;
  status: 'idle' | 'running' | 'completed' | 'failed';
  progress: number;
  lastRun: Date | null;
  nextRun: Date | null;
  duration: number | null;
  error?: string;
}

const AutomationDashboard: React.FC = () => {
  const [isConfigValid, setIsConfigValid] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<string>('overview');
  const [tasks, setTasks] = useState<AutomationTask[]>([
    {
      id: 'task1',
      name: 'Sincronização de Dados',
      status: 'idle',
      progress: 0,
      lastRun: null,
      nextRun: new Date(Date.now() + 3600000), // +1 hour
      duration: null
    },
    {
      id: 'task2',
      name: 'Processamento de Tickets',
      status: 'idle',
      progress: 0,
      lastRun: null,
      nextRun: new Date(Date.now() + 7200000), // +2 hours
      duration: null
    }
  ]);

  // Verificar configuração ao carregar
  useEffect(() => {
    const validation = env.validateRequiredVariables();
    setIsConfigValid(validation.valid);
  }, []);

  const handleConnect = async () => {
    if (!isConfigValid) {
      toast.error("Configure as variáveis de ambiente primeiro");
      return;
    }

    try {
      toast.loading("Conectando ao TechCare...");
      
      // Obter as variáveis de ambiente
      const username = env.get('TECHCARE_USER') || '';
      const password = env.get('TECHCARE_PASS') || '';
      const baseUrl = env.get('TECHCARE_BASE_URL') || 'https://app.techcare.com';
      
      // Inicializar a sessão
      const result = await initializeSession({
        username,
        password,
        baseUrl
      });
      
      if (result) {
        toast.success("Conectado com sucesso ao TechCare");
        setIsConnected(true);
      } else {
        toast.error("Falha ao conectar com o TechCare");
      }
    } catch (error) {
      toast.error(`Erro ao conectar: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  };

  const handleDisconnect = () => {
    // Lógica para desconectar
    setIsConnected(false);
    toast.success("Desconectado do TechCare");
  };

  const handleStartAutomation = () => {
    setIsRunning(true);
    simulateRunningTasks();
    toast.success("Automação iniciada");
  };

  const handleStopAutomation = () => {
    setIsRunning(false);
    resetTasks();
    toast.success("Automação interrompida");
  };

  const resetTasks = () => {
    setTasks(tasks.map(task => ({
      ...task,
      status: 'idle',
      progress: 0
    })));
  };

  const simulateRunningTasks = () => {
    // Simular execução de tarefas para demonstração
    const updatedTasks = [...tasks];
    
    // Iniciar primeira tarefa
    updatedTasks[0] = {
      ...updatedTasks[0],
      status: 'running',
      progress: 10,
      lastRun: new Date()
    };
    
    setTasks(updatedTasks);
    
    // Simular progresso
    let counter = 1;
    const intervalId = setInterval(() => {
      counter++;
      
      if (counter <= 5) {
        // Atualizar progresso da primeira tarefa
        setTasks(prev => {
          const updated = [...prev];
          
          if (updated[0].status === 'running') {
            updated[0] = {
              ...updated[0],
              progress: Math.min(100, updated[0].progress + 20)
            };
            
            // Completar após atingir 100%
            if (updated[0].progress >= 100) {
              updated[0] = {
                ...updated[0],
                status: 'completed',
                duration: Math.floor(Math.random() * 10) + 5
              };
              
              // Iniciar segunda tarefa quando a primeira for concluída
              if (updated[1].status === 'idle') {
                updated[1] = {
                  ...updated[1],
                  status: 'running',
                  progress: 10,
                  lastRun: new Date()
                };
              }
            }
          }
          
          // Atualizar progresso da segunda tarefa
          if (updated[1].status === 'running') {
            updated[1] = {
              ...updated[1],
              progress: Math.min(100, updated[1].progress + 15)
            };
            
            // Completar após atingir 100%
            if (updated[1].progress >= 100) {
              updated[1] = {
                ...updated[1],
                status: 'completed',
                duration: Math.floor(Math.random() * 15) + 10
              };
            }
          }
          
          return updated;
        });
      } else {
        // Após algumas interações, verificar se está completo
        setTasks(prev => {
          const allCompleted = prev.every(task => task.status === 'completed');
          
          if (allCompleted) {
            clearInterval(intervalId);
            setIsRunning(false);
            
            // Agendar para o próximo período
            return prev.map(task => ({
              ...task,
              status: 'idle',
              progress: 0,
              nextRun: new Date(Date.now() + Math.floor(Math.random() * 3600000 * 4) + 3600000)
            }));
          }
          
          return prev;
        });
      }
    }, 1000);
    
    return () => clearInterval(intervalId);
  };

  const handleConfigComplete = () => {
    setIsConfigValid(true);
  };

  // Renderização condicional baseada no estado de configuração
  if (!isConfigValid) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">TechCare Connect Automator</h1>
        <EnvSetupForm onComplete={handleConfigComplete} />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">TechCare Connect Automator</h1>
          <p className="text-muted-foreground">Dashboard de automação e monitoramento</p>
        </div>
        <div>
          {!isConnected ? (
            <Button onClick={handleConnect}>
              <Play className="mr-2 h-4 w-4" />
              Conectar
            </Button>
          ) : (
            <div className="flex space-x-2">
              {!isRunning ? (
                <Button onClick={handleStartAutomation}>
                  <Play className="mr-2 h-4 w-4" />
                  Iniciar Automação
                </Button>
              ) : (
                <Button onClick={handleStopAutomation} variant="destructive">
                  <Pause className="mr-2 h-4 w-4" />
                  Parar Automação
                </Button>
              )}
              <Button onClick={handleDisconnect} variant="outline">Desconectar</Button>
            </div>
          )}
        </div>
      </div>
      
      <Tabs defaultValue="overview" value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="tasks">Tarefas</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  {isConnected ? (
                    <>
                      <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                      <span className="font-medium text-green-600">Conectado</span>
                    </>
                  ) : (
                    <>
                      <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                      <span className="font-medium text-red-600">Desconectado</span>
                    </>
                  )}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {isConnected 
                    ? isRunning 
                      ? "Automação em execução" 
                      : "Pronto para automatizar"
                    : "Configure e conecte para iniciar"
                  }
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Tarefas Agendadas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{tasks.length}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Próxima execução em {tasks[0]?.nextRun ? new Date(tasks[0].nextRun).toLocaleTimeString() : 'N/A'}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Desempenho</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">98.5%</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Taxa de sucesso das últimas 24h
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Progresso das Tarefas</CardTitle>
              <CardDescription>
                Status atual das tarefas de automação
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {tasks.map(task => (
                  <div key={task.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{task.name}</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          {task.status === 'running' 
                            ? 'Em execução' 
                            : task.status === 'completed'
                              ? `Concluído em ${task.duration}s`
                              : task.status === 'failed'
                                ? 'Falhou'
                                : 'Aguardando'
                          }
                        </div>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={
                          task.status === 'running' 
                            ? 'bg-blue-50 text-blue-700 border-blue-200' 
                            : task.status === 'completed'
                              ? 'bg-green-50 text-green-700 border-green-200'
                              : task.status === 'failed'
                                ? 'bg-red-50 text-red-700 border-red-200'
                                : 'bg-gray-50 text-gray-700 border-gray-200'
                        }
                      >
                        {task.status === 'running' 
                          ? 'Em execução' 
                          : task.status === 'completed'
                            ? 'Concluído'
                            : task.status === 'failed'
                              ? 'Falhou'
                              : 'Aguardando'
                        }
                      </Badge>
                    </div>
                    <Progress value={task.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Atividades Recentes</CardTitle>
              <CardDescription>
                Últimas ações realizadas pelo automator
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <p className="font-medium">Sincronização concluída</p>
                    <p className="text-sm text-muted-foreground">
                      15 tickets processados em 3 minutos
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date().toLocaleString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <Activity className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="font-medium">Sessão iniciada</p>
                    <p className="text-sm text-muted-foreground">
                      Conexão estabelecida com o TechCare
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(Date.now() - 300000).toLocaleString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <AlertCircle className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <p className="font-medium">Aviso</p>
                    <p className="text-sm text-muted-foreground">
                      Resposta lenta do servidor, tentativa 2 de 3
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(Date.now() - 900000).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button variant="outline" className="w-full">
                Ver Todos os Logs
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="tasks">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciamento de Tarefas</CardTitle>
              <CardDescription>
                Configure e monitore tarefas automatizadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>Conteúdo do gerenciamento de tarefas...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <CardTitle>Logs do Sistema</CardTitle>
              <CardDescription>
                Registros de atividades e erros
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>Conteúdo dos logs...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Configurações de Ambiente</CardTitle>
              <CardDescription>
                Gerencie as variáveis de ambiente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EnvSetupForm onComplete={handleConfigComplete} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AutomationDashboard;
