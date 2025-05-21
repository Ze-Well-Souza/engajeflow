import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckSquare, Square, AlertTriangle, CheckCircle2, Clock, ShieldAlert, BarChart, HardDrive, FileText, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

type ChecklistItem = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  category: 'security' | 'performance' | 'monitoring' | 'documentation' | 'rollout';
  priority: 'high' | 'medium' | 'low';
};

const DeploymentPage: React.FC = () => {
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    // Segurança
    {
      id: 'sec-1',
      title: 'Testes de penetração',
      description: 'Executar testes de penetração (pentest) completos em todos os endpoints da API e interfaces de usuário',
      completed: false,
      category: 'security',
      priority: 'high'
    },
    {
      id: 'sec-2',
      title: 'Gerenciamento de tokens',
      description: 'Verificar o ciclo de vida completo dos tokens JWT, incluindo emissão, expiração e renovação',
      completed: false,
      category: 'security',
      priority: 'high'
    },
    {
      id: 'sec-3',
      title: 'Conformidade com LGPD/GDPR',
      description: 'Confirmar que todos os processos de tratamento de dados pessoais estão em conformidade com a legislação',
      completed: false,
      category: 'security',
      priority: 'high'
    },
    
    // Performance
    {
      id: 'perf-1',
      title: 'Testes de carga',
      description: 'Realizar testes de carga nas APIs e serviços críticos para validar o comportamento sob alto tráfego',
      completed: false,
      category: 'performance',
      priority: 'high'
    },
    {
      id: 'perf-2',
      title: 'Tempos de resposta',
      description: 'Verificar tempos de resposta sob diferentes condições de carga e otimizar pontos críticos',
      completed: false,
      category: 'performance',
      priority: 'medium'
    },
    {
      id: 'perf-3',
      title: 'Escalabilidade horizontal',
      description: 'Validar que o sistema pode escalar horizontalmente para atender ao aumento de demanda',
      completed: false,
      category: 'performance',
      priority: 'high'
    },
    
    // Monitoramento
    {
      id: 'mon-1',
      title: 'Sistema de backup',
      description: 'Configurar sistema automatizado de backup com verificação periódica de integridade',
      completed: false,
      category: 'monitoring',
      priority: 'high'
    },
    {
      id: 'mon-2',
      title: 'Monitoramento 24/7',
      description: 'Implementar monitoramento contínuo com alertas para eventos críticos',
      completed: false,
      category: 'monitoring',
      priority: 'high'
    },
    {
      id: 'mon-3',
      title: 'Dashboard de saúde',
      description: 'Configurar dashboard para visualização em tempo real do status do sistema',
      completed: false,
      category: 'monitoring',
      priority: 'medium'
    },
    
    // Documentação
    {
      id: 'doc-1',
      title: 'Manuais técnicos',
      description: 'Finalizar documentação técnica para desenvolvedores e administradores de sistema',
      completed: false,
      category: 'documentation',
      priority: 'medium'
    },
    {
      id: 'doc-2',
      title: 'Material de treinamento',
      description: 'Preparar material de treinamento para equipes internas e usuários finais',
      completed: false,
      category: 'documentation',
      priority: 'medium'
    },
    {
      id: 'doc-3',
      title: 'Documentação de API',
      description: 'Documentar todas as APIs públicas e pontos de extensão do sistema',
      completed: false,
      category: 'documentation',
      priority: 'high'
    },
    
    // Lançamento gradual
    {
      id: 'roll-1',
      title: 'Estratégia de rollout',
      description: 'Implementar plano detalhado para lançamento em fases',
      completed: false,
      category: 'rollout',
      priority: 'high'
    },
    {
      id: 'roll-2',
      title: 'Programa beta',
      description: 'Iniciar com grupo seleto de usuários beta para validação final',
      completed: false,
      category: 'rollout',
      priority: 'high'
    },
    {
      id: 'roll-3',
      title: 'Expansão controlada',
      description: 'Planejar crescimento gradual até atingir base completa de usuários',
      completed: false,
      category: 'rollout',
      priority: 'medium'
    }
  ]);

  const toggleItem = (id: string) => {
    setChecklist(items => 
      items.map(item => 
        item.id === id 
          ? { ...item, completed: !item.completed } 
          : item
      )
    );
    
    const item = checklist.find(item => item.id === id);
    if (item) {
      toast.success(`${item.completed ? 'Desmarcado' : 'Concluído'}: ${item.title}`);
    }
  };

  const getProgress = (category?: string) => {
    const filtered = category 
      ? checklist.filter(item => item.category === category)
      : checklist;
    
    const completed = filtered.filter(item => item.completed).length;
    const total = filtered.length;
    
    return total === 0 ? 0 : Math.round((completed / total) * 100);
  };

  const getCategoryItems = (category: string) => {
    return checklist.filter(item => item.category === category);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'security': return <ShieldAlert className="h-5 w-5 mr-2" />;
      case 'performance': return <BarChart className="h-5 w-5 mr-2" />;
      case 'monitoring': return <HardDrive className="h-5 w-5 mr-2" />;
      case 'documentation': return <FileText className="h-5 w-5 mr-2" />;
      case 'rollout': return <Rocket className="h-5 w-5 mr-2" />;
      default: return null;
    }
  };

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'security': return 'Revisão de Segurança Final';
      case 'performance': return 'Testes de Performance';
      case 'monitoring': return 'Backup e Monitoramento';
      case 'documentation': return 'Documentação';
      case 'rollout': return 'Lançamento Gradual';
      default: return 'Desconhecido';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Checklist de Deploy</h1>
          <p className="text-muted-foreground">Acompanhe e gerencie as etapas finais para o lançamento da plataforma</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
            <Clock size={14} />
            <span>Última atualização: {new Date().toLocaleDateString()}</span>
          </Badge>
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => toast.info("Relatório de progresso gerado!")}
          >
            <FileText size={16} />
            Exportar
          </Button>
        </div>
      </div>

      {/* Progresso Geral */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Progresso Geral</CardTitle>
          <CardDescription>Status de conclusão de todas as etapas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">{getProgress()}% completo</span>
              <span className="text-sm text-muted-foreground">
                {checklist.filter(item => item.completed).length}/{checklist.length} tarefas
              </span>
            </div>
            <Progress value={getProgress()} className="h-2" />
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
              {['security', 'performance', 'monitoring', 'documentation', 'rollout'].map((category) => (
                <Card key={category} className="bg-gray-800 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center mb-2">
                      {getCategoryIcon(category)}
                      <span className="text-xs font-medium">{getCategoryTitle(category)}</span>
                    </div>
                    <Progress value={getProgress(category)} className="h-1.5 mb-1" />
                    <div className="text-xs text-muted-foreground mt-1">
                      {getProgress(category)}% completo
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Categorias de tarefas */}
      <Tabs defaultValue="security" className="w-full">
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger value="security">Segurança</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoramento</TabsTrigger>
          <TabsTrigger value="documentation">Documentação</TabsTrigger>
          <TabsTrigger value="rollout">Lançamento</TabsTrigger>
        </TabsList>
        
        {['security', 'performance', 'monitoring', 'documentation', 'rollout'].map((category) => (
          <TabsContent key={category} value={category} className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    {getCategoryIcon(category)}
                    {getCategoryTitle(category)}
                  </CardTitle>
                  <Badge variant={getProgress(category) === 100 ? "default" : "secondary"}>
                    {getProgress(category)}% concluído
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {getCategoryItems(category).map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-start p-3 rounded-lg border ${
                      item.completed ? 'bg-green-500/10 border-green-500/20' : 'bg-card border-gray-700'
                    }`}
                  >
                    <div 
                      className="cursor-pointer"
                      onClick={() => toggleItem(item.id)}
                    >
                      {item.completed ? (
                        <CheckSquare className="h-5 w-5 text-green-500" />
                      ) : (
                        <Square className="h-5 w-5" />
                      )}
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className={`text-sm font-medium ${item.completed ? 'line-through text-green-400' : ''}`}>
                          {item.title}
                        </h4>
                        <Badge variant={
                          item.priority === 'high' ? "destructive" : 
                          item.priority === 'medium' ? "secondary" : 
                          "outline"
                        } className="text-xs">
                          {item.priority === 'high' ? 'Alta' : item.priority === 'medium' ? 'Média' : 'Baixa'}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            {category === 'security' && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Recursos de Segurança</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Button variant="outline" className="justify-start" onClick={() => toast.info("Iniciando verificação de segurança...")}>
                      <ShieldAlert className="mr-2 h-4 w-4" />
                      Executar Verificação
                    </Button>
                    <Button variant="outline" className="justify-start" onClick={() => toast.info("Gerando relatório LGPD...")}>
                      <FileText className="mr-2 h-4 w-4" />
                      Relatório LGPD
                    </Button>
                    <Button variant="outline" className="justify-start" onClick={() => toast.info("Analisando tokens ativos...")}>
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      Auditoria de Tokens
                    </Button>
                    <Button variant="outline" className="justify-start" onClick={() => toast.info("Executando testes de intrusão...")}>
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Iniciar Pentest
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {category === 'performance' && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Ferramentas de Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Button variant="outline" className="justify-start" onClick={() => toast.info("Iniciando teste de carga...")}>
                      <BarChart className="mr-2 h-4 w-4" />
                      Teste de Carga
                    </Button>
                    <Button variant="outline" className="justify-start" onClick={() => toast.info("Analisando tempos de resposta...")}>
                      <Clock className="mr-2 h-4 w-4" />
                      Análise de Resposta
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default DeploymentPage;
