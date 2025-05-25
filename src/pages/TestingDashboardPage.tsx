
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock, Play, Settings } from "lucide-react";
import IntelligentChatbot from "@/components/ai/IntelligentChatbot";
import RealTimeSentimentAnalysis from "@/components/ai/RealTimeSentimentAnalysis";

interface TestItem {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'testing' | 'passed' | 'failed';
  category: string;
  priority: 'high' | 'medium' | 'low';
}

const TestingDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [testItems, setTestItems] = useState<TestItem[]>([
    // Testes de IA
    {
      id: 'ai-chatbot',
      name: 'Chatbot Inteligente',
      description: 'Testar conversação com IA, reconhecimento de voz e análise de sentimento',
      status: 'pending',
      category: 'AI',
      priority: 'high'
    },
    {
      id: 'ai-sentiment',
      name: 'Análise de Sentimento',
      description: 'Testar análise em tempo real e histórico de sentimentos',
      status: 'pending',
      category: 'AI',
      priority: 'high'
    },
    
    // Testes de Redes Sociais
    {
      id: 'social-auth',
      name: 'Autenticação Social',
      description: 'Conectar contas do WhatsApp, Instagram, Facebook, etc.',
      status: 'pending',
      category: 'Social',
      priority: 'high'
    },
    {
      id: 'social-posting',
      name: 'Publicação Automática',
      description: 'Testar agendamento e publicação em múltiplas plataformas',
      status: 'pending',
      category: 'Social',
      priority: 'medium'
    },
    {
      id: 'whatsapp-integration',
      name: 'Integração WhatsApp',
      description: 'Testar WhatsApp pessoal e business',
      status: 'pending',
      category: 'Social',
      priority: 'high'
    },
    
    // Testes de Dashboard
    {
      id: 'dashboard-navigation',
      name: 'Navegação do Dashboard',
      description: 'Testar todas as rotas e páginas do sistema',
      status: 'pending',
      category: 'UI/UX',
      priority: 'medium'
    },
    {
      id: 'dashboard-responsive',
      name: 'Responsividade',
      description: 'Testar em diferentes tamanhos de tela',
      status: 'pending',
      category: 'UI/UX',
      priority: 'medium'
    },
    
    // Testes de Automação
    {
      id: 'automation-tasks',
      name: 'Tarefas Automatizadas',
      description: 'Testar criação e execução de automações',
      status: 'pending',
      category: 'Automation',
      priority: 'medium'
    },
    {
      id: 'automation-scheduling',
      name: 'Agendamento',
      description: 'Testar agendamento de mensagens e publicações',
      status: 'pending',
      category: 'Automation',
      priority: 'medium'
    },
    
    // Testes de Relatórios
    {
      id: 'reports-generation',
      name: 'Geração de Relatórios',
      description: 'Testar criação de relatórios personalizados',
      status: 'pending',
      category: 'Reports',
      priority: 'low'
    },
    {
      id: 'reports-analytics',
      name: 'Analytics Avançados',
      description: 'Testar métricas e insights automáticos',
      status: 'pending',
      category: 'Reports',
      priority: 'low'
    }
  ]);

  const updateTestStatus = (id: string, status: TestItem['status']) => {
    setTestItems(prev => prev.map(item => 
      item.id === id ? { ...item, status } : item
    ));
  };

  const getStatusIcon = (status: TestItem['status']) => {
    switch (status) {
      case 'passed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'testing': return <Clock className="h-4 w-4 text-yellow-500 animate-spin" />;
      default: return <Play className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: TestItem['status']) => {
    switch (status) {
      case 'passed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'testing': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: TestItem['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  const categories = ['AI', 'Social', 'UI/UX', 'Automation', 'Reports'];
  const testsByCategory = categories.map(category => ({
    category,
    tests: testItems.filter(item => item.category === category),
    passed: testItems.filter(item => item.category === category && item.status === 'passed').length,
    total: testItems.filter(item => item.category === category).length
  }));

  const totalTests = testItems.length;
  const passedTests = testItems.filter(t => t.status === 'passed').length;
  const failedTests = testItems.filter(t => t.status === 'failed').length;
  const pendingTests = testItems.filter(t => t.status === 'pending').length;

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Central de Testes</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Execute e monitore todos os testes do sistema de forma assíncrona
        </p>
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="ai-tests">Testes de IA</TabsTrigger>
          <TabsTrigger value="social-tests">Redes Sociais</TabsTrigger>
          <TabsTrigger value="ui-tests">UI/UX</TabsTrigger>
          <TabsTrigger value="automation-tests">Automação</TabsTrigger>
          <TabsTrigger value="deployment">Implantação</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total de Testes</p>
                    <p className="text-2xl font-bold">{totalTests}</p>
                  </div>
                  <Settings className="h-8 w-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Aprovados</p>
                    <p className="text-2xl font-bold text-green-600">{passedTests}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Reprovados</p>
                    <p className="text-2xl font-bold text-red-600">{failedTests}</p>
                  </div>
                  <XCircle className="h-8 w-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Pendentes</p>
                    <p className="text-2xl font-bold text-yellow-600">{pendingTests}</p>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {testsByCategory.map(({ category, tests, passed, total }) => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {category}
                    <Badge variant="outline">
                      {passed}/{total}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {tests.map(test => (
                      <div key={test.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(test.status)}
                          <div>
                            <p className="font-medium">{test.name}</p>
                            <p className="text-sm text-gray-500">{test.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getPriorityColor(test.priority)}>
                            {test.priority}
                          </Badge>
                          <Badge className={getStatusColor(test.status)}>
                            {test.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ai-tests" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Testes de Inteligência Artificial</CardTitle>
              <CardDescription>
                Teste as funcionalidades de IA implementadas com Gemini
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <IntelligentChatbot />
                <RealTimeSentimentAnalysis />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social-tests" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Testes de Redes Sociais</CardTitle>
              <CardDescription>
                Configure e teste as integrações com redes sociais
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {testItems.filter(t => t.category === 'Social').map(test => (
                  <div key={test.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{test.name}</h3>
                      {getStatusIcon(test.status)}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{test.description}</p>
                    <div className="flex gap-2">
                      <Button 
                        size="sm"
                        onClick={() => updateTestStatus(test.id, 'testing')}
                        disabled={test.status === 'testing'}
                      >
                        Iniciar Teste
                      </Button>
                      <Button 
                        size="sm"
                        variant="outline"
                        onClick={() => updateTestStatus(test.id, 'passed')}
                      >
                        Marcar como Aprovado
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ui-tests" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Testes de Interface</CardTitle>
              <CardDescription>
                Teste a usabilidade e responsividade do sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-blue-50">
                  <h3 className="font-semibold mb-2">📱 Teste de Responsividade</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Teste em diferentes tamanhos de tela usando as ferramentas do desenvolvedor do navegador
                  </p>
                  <div className="flex gap-2">
                    <Badge variant="outline">Desktop (1920x1080)</Badge>
                    <Badge variant="outline">Tablet (768x1024)</Badge>
                    <Badge variant="outline">Mobile (375x667)</Badge>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg bg-green-50">
                  <h3 className="font-semibold mb-2">🧭 Teste de Navegação</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Navegue por todas as páginas e verifique se todos os links funcionam
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <Badge variant="outline">/social - Dashboard Social</Badge>
                    <Badge variant="outline">/automation - Automação</Badge>
                    <Badge variant="outline">/reports - Relatórios</Badge>
                    <Badge variant="outline">/content - Gestão de Conteúdo</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automation-tests" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Testes de Automação</CardTitle>
              <CardDescription>
                Teste as funcionalidades de automação e agendamento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">⚡ Testes Automatizados</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Execute os testes automatizados através dos comandos:
                  </p>
                  <div className="bg-gray-100 p-3 rounded font-mono text-sm">
                    <p>npm run test</p>
                    <p>npm run test:coverage</p>
                    <p>npm run test:watch</p>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">📅 Teste de Agendamento</h3>
                  <p className="text-sm text-gray-600">
                    Crie publicações agendadas e verifique se são executadas nos horários corretos
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deployment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Próximos Passos - Implantação</CardTitle>
              <CardDescription>
                Siga estes passos após concluir todos os testes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                  <h3 className="font-semibold mb-2">🔧 1. Configuração de Ambiente</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Configure as chaves da API (Gemini, WhatsApp, Instagram)</li>
                    <li>• Configure variáveis de ambiente de produção</li>
                    <li>• Teste todas as integrações em ambiente de staging</li>
                  </ul>
                </div>
                
                <div className="p-4 border-l-4 border-green-500 bg-green-50">
                  <h3 className="font-semibold mb-2">🚀 2. Deploy em Produção</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Deploy via Lovable (clique em "Publish")</li>
                    <li>• Ou deploy manual: Vercel, Netlify, ou seu servidor</li>
                    <li>• Configure domínio personalizado</li>
                    <li>• Configure SSL/HTTPS</li>
                  </ul>
                </div>
                
                <div className="p-4 border-l-4 border-purple-500 bg-purple-50">
                  <h3 className="font-semibold mb-2">📊 3. Monitoramento</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Configure monitoramento de performance</li>
                    <li>• Configure alertas de erro</li>
                    <li>• Monitore uso de APIs</li>
                    <li>• Configure backup de dados</li>
                  </ul>
                </div>
                
                <div className="p-4 border-l-4 border-orange-500 bg-orange-50">
                  <h3 className="font-semibold mb-2">👥 4. Treinamento de Usuários</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Crie documentação para usuários finais</li>
                    <li>• Faça treinamento da equipe</li>
                    <li>• Configure suporte técnico</li>
                    <li>• Colete feedback inicial</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TestingDashboardPage;
