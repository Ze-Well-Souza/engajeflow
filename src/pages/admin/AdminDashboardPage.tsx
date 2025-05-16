
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, UsersRound, UserCheck, ShieldCheck, 
  FileText, ArrowRight, BarChart2, AlertCircle 
} from "lucide-react";

const AdminDashboardPage = () => {
  // Mock statistics for the admin dashboard
  const stats = {
    totalClients: 42,
    activeClients: 38,
    newClientsLastMonth: 8,
    totalPermissionSets: 15,
    securityAlerts: 3,
    apiUsage: 87,
    averageUptime: 99.8,
    dataStorageUsed: "1.8 TB"
  };

  // Mock recent activities
  const recentActivities = [
    {
      id: 1,
      user: "admin@techcare.com",
      action: "Adicionou novo cliente",
      target: "MegaStore Ltda",
      timestamp: "Hoje, 14:32"
    },
    {
      id: 2,
      user: "suporte@comerciofacil.com",
      action: "Modificou permissões",
      target: "Módulo de Vendas",
      timestamp: "Hoje, 11:45"
    },
    {
      id: 3,
      user: "ana.ferreira@email.com",
      action: "Gerou relatório",
      target: "Vendas Mensais",
      timestamp: "Ontem, 17:12"
    },
    {
      id: 4,
      user: "admin@techcare.com",
      action: "Configurou webhook",
      target: "Gateway de Pagamento",
      timestamp: "Ontem, 10:08"
    },
    {
      id: 5,
      user: "marcelo.silva@email.com",
      action: "Enviou mensagem em massa",
      target: "120 clientes",
      timestamp: "15/05/2025"
    }
  ];

  // Mock security alerts
  const securityAlerts = [
    {
      id: 1,
      type: "Login Suspeito",
      description: "Várias tentativas de login mal sucedidas",
      source: "IP: 203.0.113.42",
      severity: "high",
      timestamp: "Hoje, 05:47"
    },
    {
      id: 2,
      type: "Permissão Incomum",
      description: "Acesso à área administrativa por usuário não autorizado",
      source: "Usuário: cliente3@example.com",
      severity: "medium",
      timestamp: "14/05/2025"
    },
    {
      id: 3,
      type: "API Rate Limit",
      description: "Excesso de requisições à API",
      source: "Aplicação: Mobile App",
      severity: "low",
      timestamp: "12/05/2025"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Administração do Sistema</h2>
        <p className="text-muted-foreground">
          Gerencie clientes, permissões e monitore as atividades do sistema
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
            <UsersRound className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalClients}</div>
            <p className="text-xs text-muted-foreground">
              {stats.activeClients} ativos ({Math.round(stats.activeClients / stats.totalClients * 100)}%)
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Novos Clientes</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{stats.newClientsLastMonth}</div>
            <p className="text-xs text-muted-foreground">
              No último mês
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertas de Segurança</CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.securityAlerts}</div>
            <p className="text-xs text-muted-foreground">
              Requer atenção
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uso da API</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.apiUsage}%</div>
            <p className="text-xs text-muted-foreground">
              Da capacidade total
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Admin Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Gerenciar Clientes</CardTitle>
            <CardDescription>
              Cadastre, edite e gerencie os clientes do sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UsersRound className="h-8 w-8 mb-4 text-primary" />
            <p className="text-sm">
              Acesso a todas as informações de clientes, com opções para cadastro e edição.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link to="/admin/clientes">
                Acessar <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Gerenciar Permissões</CardTitle>
            <CardDescription>
              Configure as permissões de acesso para cada cliente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ShieldCheck className="h-8 w-8 mb-4 text-primary" />
            <p className="text-sm">
              Defina quais módulos e funcionalidades cada cliente pode acessar de forma granular.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link to="/admin/permissoes">
                Acessar <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Logs de Atividades</CardTitle>
            <CardDescription>
              Monitore as ações realizadas no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FileText className="h-8 w-8 mb-4 text-primary" />
            <p className="text-sm">
              Visualize registros detalhados de todas as atividades dos usuários no sistema.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link to="/admin/logs">
                Acessar <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <Tabs defaultValue="activities" className="w-full">
        <TabsList>
          <TabsTrigger value="activities">Atividades Recentes</TabsTrigger>
          <TabsTrigger value="security">Alertas de Segurança</TabsTrigger>
        </TabsList>
        
        <TabsContent value="activities">
          <Card>
            <CardHeader>
              <CardTitle>Atividades Recentes</CardTitle>
              <CardDescription>
                Últimas ações realizadas no sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {recentActivities.map(activity => (
                  <li key={activity.id} className="flex justify-between items-center border-b pb-2 last:border-0">
                    <div>
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">
                        <span className="font-semibold">{activity.user}</span> • {activity.target}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild className="w-full">
                <Link to="/admin/logs">
                  Ver Todos os Logs <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Alertas de Segurança</CardTitle>
              <CardDescription>
                Potenciais problemas de segurança detectados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {securityAlerts.map(alert => (
                  <li key={alert.id} className="flex items-start gap-4 border-b pb-4 last:border-0">
                    <div className={`p-2 rounded-full ${
                      alert.severity === 'high' ? 'bg-red-100' : 
                      alert.severity === 'medium' ? 'bg-yellow-100' : 
                      'bg-blue-100'
                    }`}>
                      <AlertCircle className={`h-4 w-4 ${
                        alert.severity === 'high' ? 'text-red-600' : 
                        alert.severity === 'medium' ? 'text-yellow-600' : 
                        'text-blue-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="font-medium">{alert.type}</p>
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          alert.severity === 'high' ? 'bg-red-100 text-red-800' : 
                          alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {alert.severity === 'high' ? 'Alta' : 
                           alert.severity === 'medium' ? 'Média' : 
                           'Baixa'}
                        </span>
                      </div>
                      <p className="text-sm">{alert.description}</p>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-muted-foreground">{alert.source}</span>
                        <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboardPage;
