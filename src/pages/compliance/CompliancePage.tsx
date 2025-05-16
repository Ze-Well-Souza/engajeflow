
import React from 'react';
import { useLocalization } from '@/contexts/LocalizationContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Shield, FileCheck, AlertTriangle, CheckCircle2, Globe } from "lucide-react";

const CompliancePage: React.FC = () => {
  const { t } = useLocalization();
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Shield className="text-primary" />
            {t('compliance.dataProtection')}
          </h1>
          <p className="text-muted-foreground">
            Gerenciamento e conformidade com regulamentações internacionais
          </p>
        </div>
      </div>

      <Tabs defaultValue="gdpr">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="gdpr">GDPR</TabsTrigger>
          <TabsTrigger value="ccpa">CCPA</TabsTrigger>
          <TabsTrigger value="lgpd">LGPD</TabsTrigger>
        </TabsList>
        
        <TabsContent value="gdpr">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-500" />
                {t('compliance.gdpr')}
              </CardTitle>
              <CardDescription>
                Regulamento Geral de Proteção de Dados (União Europeia)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ComplianceItem 
                  title="Consentimento Explícito" 
                  description="Mecanismos para obter e rastrear consentimento explícito dos usuários para processamento de dados"
                  status="compliant" 
                />
                <ComplianceItem 
                  title="Direito ao Esquecimento" 
                  description="Capacidade de excluir dados de usuários mediante solicitação"
                  status="compliant" 
                />
                <ComplianceItem 
                  title="Portabilidade de Dados" 
                  description="Funcionalidade para exportação de dados em formato legível por máquina"
                  status="inprogress" 
                />
                <ComplianceItem 
                  title="Notificação de Violações" 
                  description="Sistema para notificação de violações de dados em até 72 horas"
                  status="compliant" 
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="mr-2">
                <FileCheck className="mr-2 h-4 w-4" />
                Gerar Relatório de Conformidade
              </Button>
              <Button variant="outline">
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Verificar Atualizações
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="ccpa">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-red-500" />
                {t('compliance.ccpa')}
              </CardTitle>
              <CardDescription>
                California Consumer Privacy Act (Estados Unidos)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ComplianceItem 
                  title="Direito de Saber" 
                  description="Informações sobre quais dados são coletados e para quais fins"
                  status="compliant" 
                />
                <ComplianceItem 
                  title="Opt-Out de Venda" 
                  description="Opção para usuários impedirem a venda de seus dados pessoais"
                  status="compliant" 
                />
                <ComplianceItem 
                  title="Não-Discriminação" 
                  description="Proteção para usuários que exercem seus direitos de privacidade"
                  status="compliant" 
                />
                <ComplianceItem 
                  title="Política de Privacidade" 
                  description="Documento atualizado que atende às exigências do CCPA"
                  status="inprogress" 
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="mr-2">
                <FileCheck className="mr-2 h-4 w-4" />
                Gerar Relatório de Conformidade
              </Button>
              <Button variant="outline">
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Verificar Atualizações
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="lgpd">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-green-500" />
                {t('compliance.lgpd')}
              </CardTitle>
              <CardDescription>
                Lei Geral de Proteção de Dados (Brasil)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ComplianceItem 
                  title="Finalidades Específicas" 
                  description="Dados coletados apenas para propósitos específicos e legítimos"
                  status="compliant" 
                />
                <ComplianceItem 
                  title="Bases Legais" 
                  description="Processamento de dados baseado em uma das dez bases legais da LGPD"
                  status="compliant" 
                />
                <ComplianceItem 
                  title="DPO Designado" 
                  description="Encarregado de proteção de dados nomeado e disponível aos titulares"
                  status="inprogress" 
                />
                <ComplianceItem 
                  title="Relatório de Impacto" 
                  description="Documentação de impacto à proteção de dados pessoais"
                  status="pending" 
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="mr-2">
                <FileCheck className="mr-2 h-4 w-4" />
                Gerar Relatório de Conformidade
              </Button>
              <Button variant="outline">
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Verificar Atualizações
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle>Sistema de Gerenciamento de Consentimento</CardTitle>
          <CardDescription>
            Gerencie o consentimento dos usuários para diferentes usos de dados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border border-border rounded-md space-y-2">
              <h3 className="font-medium">Widget de Consentimento de Cookies</h3>
              <p className="text-sm text-muted-foreground">
                Banner personalizado para consentimento de cookies, com opções detalhadas para diferentes categorias de cookies
              </p>
              <Button size="sm" variant="outline">Configurar</Button>
            </div>
            
            <div className="p-4 border border-border rounded-md space-y-2">
              <h3 className="font-medium">Centro de Preferências de Privacidade</h3>
              <p className="text-sm text-muted-foreground">
                Painel para usuários gerenciarem suas preferências de privacidade e permissões de uso de dados
              </p>
              <Button size="sm" variant="outline">Configurar</Button>
            </div>
            
            <div className="p-4 border border-border rounded-md space-y-2">
              <h3 className="font-medium">Registros de Consentimento</h3>
              <p className="text-sm text-muted-foreground">
                Histórico completo e auditável de todos os consentimentos dados e retirados
              </p>
              <Button size="sm" variant="outline">Visualizar Registros</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

interface ComplianceItemProps {
  title: string;
  description: string;
  status: 'compliant' | 'inprogress' | 'pending' | 'noncompliant';
}

const ComplianceItem: React.FC<ComplianceItemProps> = ({ title, description, status }) => {
  const getStatusInfo = () => {
    switch (status) {
      case 'compliant':
        return {
          icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
          text: 'Conforme',
          color: 'text-green-500',
          bg: 'bg-green-500/10'
        };
      case 'inprogress':
        return {
          icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
          text: 'Em Progresso',
          color: 'text-yellow-500',
          bg: 'bg-yellow-500/10'
        };
      case 'pending':
        return {
          icon: <AlertTriangle className="h-5 w-5 text-orange-500" />,
          text: 'Pendente',
          color: 'text-orange-500',
          bg: 'bg-orange-500/10'
        };
      case 'noncompliant':
        return {
          icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
          text: 'Não Conforme',
          color: 'text-red-500',
          bg: 'bg-red-500/10'
        };
      default:
        return {
          icon: <AlertTriangle className="h-5 w-5 text-gray-500" />,
          text: 'Desconhecido',
          color: 'text-gray-500',
          bg: 'bg-gray-500/10'
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <div className="border border-border rounded-md p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium">{title}</h3>
        <div className={`flex items-center px-2 py-1 rounded-full ${statusInfo.bg}`}>
          {statusInfo.icon}
          <span className={`text-xs ml-1 ${statusInfo.color}`}>{statusInfo.text}</span>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default CompliancePage;
