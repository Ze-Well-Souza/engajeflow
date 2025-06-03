
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Shield, AlertTriangle, CheckCircle, XCircle, FileCheck, Download } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const SecurityAuditPage: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Shield className="text-primary" />
            Auditoria de Segurança
          </h1>
          <p className="text-muted-foreground">
            Análise de vulnerabilidades e recomendações de segurança
          </p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Exportar Relatório
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SecurityScoreCard 
          title="Pontuação Geral" 
          score={86} 
          trend={+3}
          description="Pontuação de segurança do sistema"
        />
        <VulnerabilityCard 
          title="Vulnerabilidades" 
          high={2}
          medium={4}
          low={7}
          fixed={12}
        />
        <ComplianceCard 
          title="Conformidade" 
          compliant={85}
          description="Conformidade com padrões de segurança"
        />
      </div>

      <Tabs defaultValue="vulnerabilities" className="space-y-4">
        <TabsList>
          <TabsTrigger value="vulnerabilities">Vulnerabilidades</TabsTrigger>
          <TabsTrigger value="compliance">Conformidade</TabsTrigger>
          <TabsTrigger value="recommendations">Recomendações</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
        </TabsList>
        <TabsContent value="vulnerabilities" className="space-y-4">
          <VulnerabilitiesList />
        </TabsContent>
        <TabsContent value="compliance">
          <ComplianceChecklist />
        </TabsContent>
        <TabsContent value="recommendations">
          <RecommendationsList />
        </TabsContent>
        <TabsContent value="history">
          <AuditHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface SecurityScoreCardProps {
  title: string;
  score: number;
  trend: number;
  description: string;
}

const SecurityScoreCard: React.FC<SecurityScoreCardProps> = ({ title, score, trend, description }) => {
  let scoreColor = "text-amber-500";
  
  if (score >= 90) {
    scoreColor = "text-green-500";
  } else if (score < 70) {
    scoreColor = "text-red-500";
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className={`text-5xl font-bold ${scoreColor}`}>
          {score}
        </div>
        <Progress value={score} className="mt-2" />
        <div className="mt-2 flex items-center text-sm">
          {trend > 0 ? (
            <span className="text-green-500 flex items-center">
              ↑ {trend} pontos desde última auditoria
            </span>
          ) : trend < 0 ? (
            <span className="text-red-500 flex items-center">
              ↓ {Math.abs(trend)} pontos desde última auditoria
            </span>
          ) : (
            <span className="text-muted-foreground flex items-center">
              Sem alteração desde última auditoria
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

interface VulnerabilityCardProps {
  title: string;
  high: number;
  medium: number;
  low: number;
  fixed: number;
}

const VulnerabilityCard: React.FC<VulnerabilityCardProps> = ({ title, high, medium, low, fixed }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Vulnerabilidades detectadas</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-red-500/10 p-3 rounded flex flex-col items-center">
            <span className="text-sm text-muted-foreground">Alta</span>
            <span className="text-2xl font-bold text-red-500">{high}</span>
          </div>
          <div className="bg-amber-500/10 p-3 rounded flex flex-col items-center">
            <span className="text-sm text-muted-foreground">Média</span>
            <span className="text-2xl font-bold text-amber-500">{medium}</span>
          </div>
          <div className="bg-blue-500/10 p-3 rounded flex flex-col items-center">
            <span className="text-sm text-muted-foreground">Baixa</span>
            <span className="text-2xl font-bold text-blue-500">{low}</span>
          </div>
          <div className="bg-green-500/10 p-3 rounded flex flex-col items-center">
            <span className="text-sm text-muted-foreground">Corrigidas</span>
            <span className="text-2xl font-bold text-green-500">{fixed}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface ComplianceCardProps {
  title: string;
  compliant: number;
  description: string;
}

const ComplianceCard: React.FC<ComplianceCardProps> = ({ title, compliant, description }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#e9ecef"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#12b886"
                strokeWidth="3"
                strokeDasharray={`${compliant}, 100`}
              />
              <text x="18" y="20.5" textAnchor="middle" fontSize="10" fill="currentColor" fontWeight="bold">
                {compliant}%
              </text>
            </svg>
          </div>
        </div>
        <div className="mt-4 flex justify-around text-center text-sm">
          <div>
            <div className="text-muted-foreground">Padrões</div>
            <div className="font-medium">4/5</div>
          </div>
          <div>
            <div className="text-muted-foreground">Requisitos</div>
            <div className="font-medium">42/50</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const VulnerabilitiesList: React.FC = () => {
  const vulnerabilities = [
    {
      id: 1, 
      title: "Exposição de credenciais em código fonte",
      description: "Credenciais de acesso armazenadas em arquivos de configuração não criptografados",
      severity: "high",
      status: "open",
      component: "AuthService",
      discoveredAt: "2025-05-12"
    },
    {
      id: 2, 
      title: "Ausência de validação de entrada nos endpoints da API",
      description: "Endpoints da API não validam adequadamente os dados de entrada, expondo a possíveis injeções",
      severity: "high",
      status: "open",
      component: "API Gateway",
      discoveredAt: "2025-05-14"
    },
    {
      id: 3, 
      title: "Cabeçalhos de segurança HTTP faltando",
      description: "Faltam cabeçalhos de segurança HTTP como X-Content-Type-Options e X-XSS-Protection",
      severity: "medium",
      status: "open",
      component: "Frontend Server",
      discoveredAt: "2025-05-10"
    },
    {
      id: 4, 
      title: "Cross-Site Request Forgery (CSRF)",
      description: "Ausência de tokens CSRF em formulários críticos da aplicação",
      severity: "medium",
      status: "fixed",
      component: "Form Handling",
      discoveredAt: "2025-04-28",
      fixedAt: "2025-05-05"
    },
  ];

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return <Badge variant="destructive">Alta</Badge>;
      case "medium":
        return <Badge variant="outline" className="bg-amber-500/20 text-amber-700 border-amber-500">Média</Badge>;
      case "low":
        return <Badge variant="outline" className="bg-blue-500/20 text-blue-700 border-blue-500">Baixa</Badge>;
      default:
        return <Badge variant="outline">Desconhecida</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge variant="outline" className="bg-red-500/20 text-red-700 border-red-500">Aberto</Badge>;
      case "in_progress":
        return <Badge variant="outline" className="bg-amber-500/20 text-amber-700 border-amber-500">Em Progresso</Badge>;
      case "fixed":
        return <Badge variant="outline" className="bg-green-500/20 text-green-700 border-green-500">Corrigido</Badge>;
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      {vulnerabilities.map((vulnerability) => (
        <Card key={vulnerability.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between">
              <CardTitle className="text-lg">{vulnerability.title}</CardTitle>
              <div className="flex space-x-2">
                {getSeverityBadge(vulnerability.severity)}
                {getStatusBadge(vulnerability.status)}
              </div>
            </div>
            <CardDescription>
              Componente: {vulnerability.component} | Descoberto em: {vulnerability.discoveredAt}
              {vulnerability.fixedAt && ` | Corrigido em: ${vulnerability.fixedAt}`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{vulnerability.description}</p>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="outline" size="sm">Detalhes</Button>
            {vulnerability.status !== "fixed" && <Button size="sm">Corrigir</Button>}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

const ComplianceChecklist: React.FC = () => {
  const complianceItems = [
    { id: 1, name: "GDPR", progress: 92, items: [
      { check: "Direito à exclusão", status: "compliant" },
      { check: "Consentimento explícito", status: "compliant" },
      { check: "Notificação de vazamento", status: "compliant" },
      { check: "Portabilidade de dados", status: "in_progress" },
    ]},
    { id: 2, name: "PCI DSS", progress: 75, items: [
      { check: "Criptografia de dados sensíveis", status: "compliant" },
      { check: "Controle de acesso", status: "compliant" },
      { check: "Testes de intrusão regulares", status: "non_compliant" },
    ]},
    { id: 3, name: "LGPD", progress: 88, items: [
      { check: "Base legal para processamento", status: "compliant" },
      { check: "DPO designado", status: "compliant" },
      { check: "Relatório de impacto", status: "in_progress" },
    ]},
    { id: 4, name: "ISO 27001", progress: 65, items: [
      { check: "Gestão de riscos", status: "compliant" },
      { check: "Política de segurança", status: "in_progress" },
      { check: "Gestão de incidentes", status: "non_compliant" },
      { check: "Continuidade de negócios", status: "non_compliant" },
    ]},
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "compliant":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "in_progress":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case "non_compliant":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-4">
      {complianceItems.map((item) => (
        <Card key={item.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle>{item.name}</CardTitle>
              <Badge variant="outline" className="ml-2">
                {item.progress}% conforme
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={item.progress} className="mb-4" />
            <div className="space-y-2">
              {item.items.map((checkItem, index) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(checkItem.status)}
                    <span>{checkItem.check}</span>
                  </div>
                  <Button variant="ghost" size="sm">Detalhes</Button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">
              <FileCheck className="h-4 w-4 mr-2" />
              Ver relatório completo
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

const RecommendationsList: React.FC = () => {
  const recommendations = [
    {
      id: 1,
      title: "Implementar autenticação de dois fatores",
      description: "Adicionar uma camada extra de segurança exigindo um segundo fator de autenticação para todos os usuários administrativos.",
      priority: "high",
      effort: "medium",
      impact: "high"
    },
    {
      id: 2,
      title: "Criptografar dados sensíveis em repouso",
      description: "Implementar criptografia para todos os dados sensíveis armazenados em bancos de dados e sistemas de arquivos.",
      priority: "high",
      effort: "high",
      impact: "high"
    },
    {
      id: 3,
      title: "Adicionar cabeçalhos de segurança HTTP",
      description: "Configurar corretamente cabeçalhos de segurança HTTP para mitigar ataques como XSS e clickjacking.",
      priority: "medium",
      effort: "low",
      impact: "medium"
    },
  ];

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">Prioridade Alta</Badge>;
      case "medium":
        return <Badge variant="outline" className="bg-amber-500/20 text-amber-700 border-amber-500">Prioridade Média</Badge>;
      case "low":
        return <Badge variant="outline" className="bg-blue-500/20 text-blue-700 border-blue-500">Prioridade Baixa</Badge>;
      default:
        return <Badge variant="outline">Prioridade Desconhecida</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      {recommendations.map((recommendation) => (
        <Card key={recommendation.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{recommendation.title}</CardTitle>
              {getPriorityBadge(recommendation.priority)}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">{recommendation.description}</p>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center p-2 border rounded">
                <div className="font-medium mr-2">Esforço:</div>
                <div className="capitalize">{recommendation.effort}</div>
              </div>
              <div className="flex items-center p-2 border rounded">
                <div className="font-medium mr-2">Impacto:</div>
                <div className="capitalize">{recommendation.impact}</div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="outline" size="sm">Ignorar</Button>
            <Button size="sm">Implementar</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

const AuditHistory: React.FC = () => {
  const auditEntries = [
    {
      id: 1,
      date: "2025-05-15",
      type: "Auditoria Completa",
      score: 86,
      findings: 13,
      auditor: "Sistema Automático"
    },
    {
      id: 2,
      date: "2025-04-15",
      type: "Auditoria Completa",
      score: 83,
      findings: 16,
      auditor: "Sistema Automático"
    },
    {
      id: 3,
      date: "2025-03-15",
      type: "Auditoria Completa",
      score: 78,
      findings: 21,
      auditor: "Sistema Automático"
    },
  ];

  return (
    <div className="space-y-4">
      {auditEntries.map((entry) => (
        <Card key={entry.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between">
              <CardTitle>{entry.type}</CardTitle>
              <Badge variant="outline">
                {entry.date}
              </Badge>
            </div>
            <CardDescription>
              Realizada por: {entry.auditor}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-muted/30 rounded-lg text-center">
                <div className="text-sm font-medium text-muted-foreground">Pontuação</div>
                <div className="text-2xl font-bold">{entry.score}</div>
              </div>
              <div className="p-3 bg-muted/30 rounded-lg text-center">
                <div className="text-sm font-medium text-muted-foreground">Problemas</div>
                <div className="text-2xl font-bold">{entry.findings}</div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="outline" size="sm">
              <FileCheck className="h-4 w-4 mr-2" />
              Ver relatório
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Baixar PDF
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default SecurityAuditPage;
