
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ShieldCheck,
  ShieldAlert,
  FileLock,
  FileKey,
  Lock,
  Key,
  AlertCircle,
  CheckCircle,
  Users,
  Clock
} from "lucide-react";
import { toast } from "sonner";

interface SecurityItem {
  id: string;
  title: string;
  description: string;
  status: 'passed' | 'warning' | 'failed' | 'pending';
  category: 'auth' | 'data' | 'api' | 'compliance';
  details?: string;
}

const SecurityReview: React.FC = () => {
  const [securityItems] = React.useState<SecurityItem[]>([
    {
      id: 'auth-1',
      title: 'Proteção de senhas',
      description: 'Verificação do algoritmo de hash e armazenamento seguro',
      status: 'passed',
      category: 'auth',
      details: 'Usando Argon2id com fatores de custo adequados'
    },
    {
      id: 'auth-2',
      title: 'Autenticação de dois fatores',
      description: 'Implementação e disponibilidade do 2FA',
      status: 'passed',
      category: 'auth',
      details: 'Implementado via TOTP'
    },
    {
      id: 'auth-3',
      title: 'Gestão de sessões',
      description: 'Validade, revogação e controle de sessões',
      status: 'warning',
      category: 'auth',
      details: 'Sessões não expiram automaticamente em dispositivos inativos'
    },
    {
      id: 'data-1',
      title: 'Criptografia de dados sensíveis',
      description: 'Verificação de dados em repouso',
      status: 'passed',
      category: 'data',
      details: 'AES-256 para dados em repouso'
    },
    {
      id: 'data-2',
      title: 'Comunicação segura',
      description: 'Verificação de transporte de dados',
      status: 'passed',
      category: 'data',
      details: 'TLS 1.3 com certificados válidos'
    },
    {
      id: 'data-3',
      title: 'Backups criptografados',
      description: 'Proteção dos dados de backup',
      status: 'warning',
      category: 'data',
      details: 'Implementação parcial, falta rotação automática de chaves'
    },
    {
      id: 'api-1',
      title: 'Validação de entrada',
      description: 'Proteção contra injeção e entrada maliciosa',
      status: 'passed',
      category: 'api',
      details: 'Validação implementada com Zod e sanitização'
    },
    {
      id: 'api-2',
      title: 'Rate limiting',
      description: 'Proteção contra abuso de API',
      status: 'passed',
      category: 'api',
      details: 'Implementado com token bucket por IP e por usuário'
    },
    {
      id: 'api-3',
      title: 'CORS configurado',
      description: 'Verificação de política de CORS',
      status: 'warning',
      category: 'api',
      details: 'Configuração muito permissiva'
    },
    {
      id: 'comp-1',
      title: 'Política de privacidade',
      description: 'Verificação de conformidade legal',
      status: 'pending',
      category: 'compliance',
      details: 'Aguardando revisão legal'
    },
    {
      id: 'comp-2',
      title: 'Gestão de consentimento',
      description: 'Verificação LGPD/GDPR',
      status: 'warning',
      category: 'compliance',
      details: 'Rastreamento de consentimento implementado mas falta funcionalidade de revogação'
    },
    {
      id: 'comp-3',
      title: 'Direito ao esquecimento',
      description: 'Funcionalidade de exclusão de dados',
      status: 'pending',
      category: 'compliance',
      details: 'Em desenvolvimento'
    },
  ]);

  const getStatusIcon = (status: SecurityItem['status']) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: SecurityItem['status']) => {
    switch (status) {
      case 'passed':
        return <Badge className="bg-green-500/20 text-green-500">Aprovado</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-500/20 text-yellow-500">Atenção</Badge>;
      case 'failed':
        return <Badge className="bg-red-500/20 text-red-500">Falhou</Badge>;
      case 'pending':
        return <Badge className="bg-blue-500/20 text-blue-500">Pendente</Badge>;
      default:
        return null;
    }
  };

  const getCategoryIcon = (category: SecurityItem['category']) => {
    switch (category) {
      case 'auth':
        return <Key className="h-5 w-5" />;
      case 'data':
        return <FileLock className="h-5 w-5" />;
      case 'api':
        return <Lock className="h-5 w-5" />;
      case 'compliance':
        return <FileKey className="h-5 w-5" />;
      default:
        return null;
    }
  };

  const getPassRate = (category?: SecurityItem['category']) => {
    const items = category 
      ? securityItems.filter(item => item.category === category)
      : securityItems;
    
    const passed = items.filter(item => item.status === 'passed').length;
    const total = items.length;
    
    return {
      rate: Math.round((passed / total) * 100),
      passed,
      total
    };
  };

  const getCategoryItems = (category: SecurityItem['category']) => {
    return securityItems.filter(item => item.category === category);
  };

  const handleRunSecurityScan = () => {
    toast.info("Iniciando verificação de segurança completa...");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">Revisão de Segurança</h2>
          <p className="text-muted-foreground">Análise das medidas de segurança implementadas</p>
        </div>
        <div>
          <Button onClick={handleRunSecurityScan} variant="outline" className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" />
            Executar Verificação
          </Button>
        </div>
      </div>
      
      {/* Visão geral */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5" />
              Visão Geral
            </CardTitle>
            <Badge variant="outline" className="flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              <span>{getPassRate().rate}% concluído</span>
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {(['auth', 'data', 'api', 'compliance'] as const).map((category) => {
              const stats = getPassRate(category);
              return (
                <Card key={category} className="bg-gray-800 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        {getCategoryIcon(category)}
                        <span className="ml-2 text-xs font-medium">
                          {category === 'auth' && 'Autenticação'}
                          {category === 'data' && 'Dados'}
                          {category === 'api' && 'APIs'}
                          {category === 'compliance' && 'Conformidade'}
                        </span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {stats.passed}/{stats.total}
                      </Badge>
                    </div>
                    <Progress value={stats.rate} className="h-1.5" />
                    <div className="text-xs mt-1">{stats.rate}% aprovado</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(['auth', 'data', 'api', 'compliance'] as const).map((category) => (
              <div key={category} className="space-y-3">
                <h3 className="text-sm font-medium flex items-center gap-2">
                  {getCategoryIcon(category)}
                  {category === 'auth' && 'Autenticação e Autorização'}
                  {category === 'data' && 'Proteção de Dados'}
                  {category === 'api' && 'Segurança de APIs'}
                  {category === 'compliance' && 'Conformidade Legal'}
                </h3>
                {getCategoryItems(category).map((item) => (
                  <div 
                    key={item.id} 
                    className="p-3 rounded-lg border border-gray-700 space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium flex items-center gap-2">
                        {getStatusIcon(item.status)}
                        {item.title}
                      </span>
                      {getStatusBadge(item.status)}
                    </div>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                    {item.details && (
                      <p className="text-xs border-t border-gray-700 pt-2 mt-2">{item.details}</p>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ferramentas de segurança adicionais */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Relatórios de Conformidade</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Button variant="outline" className="justify-start" onClick={() => toast.info("Gerando relatório LGPD...")}>
                <Users className="mr-2 h-4 w-4" />
                Gerar Relatório LGPD
              </Button>
              <Button variant="outline" className="justify-start" onClick={() => toast.info("Gerando relatório GDPR...")}>
                <Users className="mr-2 h-4 w-4" />
                Gerar Relatório GDPR
              </Button>
              <Button variant="outline" className="justify-start" onClick={() => toast.info("Verificando consentimentos...")}>
                <FileKey className="mr-2 h-4 w-4" />
                Verificar Consentimentos
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Ferramentas de Auditoria</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Button variant="outline" className="justify-start" onClick={() => toast.info("Iniciando varredura de vulnerabilidades...")}>
                <ShieldAlert className="mr-2 h-4 w-4" />
                Verificar Vulnerabilidades
              </Button>
              <Button variant="outline" className="justify-start" onClick={() => toast.info("Iniciando auditoria de tokens...")}>
                <Key className="mr-2 h-4 w-4" />
                Auditoria de Tokens
              </Button>
              <Button variant="outline" className="justify-start" onClick={() => toast.info("Exportando logs de segurança...")}>
                <FileLock className="mr-2 h-4 w-4" />
                Exportar Logs de Segurança
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SecurityReview;
