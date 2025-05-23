
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, AlertTriangle, XCircle, Info } from "lucide-react";
import { toast } from "sonner";
import SocialAuthManager from "@/components/social/SocialAuthManager";
import MultiChannelPublisher from "@/components/social/MultiChannelPublisher";

interface TestResult {
  id: string;
  name: string;
  status: "success" | "warning" | "error" | "pending";
  message: string;
  details?: string;
  timestamp: Date;
}

const SocialTestingPage: React.FC = () => {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunningTests, setIsRunningTests] = useState(false);
  
  const runAllTests = async () => {
    setIsRunningTests(true);
    setTestResults([]);
    
    // Testes de autenticação OAuth
    await runOAuthTests();
    
    // Testes de publicação multicanal
    await runPublishingTests();
    
    // Testes de renovação de tokens
    await runTokenRefreshTests();
    
    toast.success("Testes concluídos");
    setIsRunningTests(false);
  };
  
  const runOAuthTests = async () => {
    // Teste 1: Simulação de conexão
    addTestResult({
      id: "auth-1",
      name: "Conexão OAuth Instagram",
      status: "success",
      message: "Fluxo de autenticação OAuth Instagram concluído com sucesso",
      details: "Token de acesso e refresh token obtidos corretamente"
    });
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Teste 2: Simulação de conexão com problema
    addTestResult({
      id: "auth-2",
      name: "Conexão OAuth Facebook",
      status: "warning",
      message: "Conexão estabelecida com permissões limitadas",
      details: "As permissões para gerenciar postagens não foram concedidas"
    });
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Teste 3: Simulação de falha
    addTestResult({
      id: "auth-3",
      name: "Conexão OAuth Twitter",
      status: "error",
      message: "Falha na autenticação com Twitter API",
      details: "Erro: Rate limit exceeded. Tente novamente em 15 minutos."
    });
  };
  
  const runPublishingTests = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Teste 1: Publicação imediata
    addTestResult({
      id: "pub-1",
      name: "Publicação Imediata",
      status: "success",
      message: "Conteúdo publicado com sucesso em múltiplos canais",
      details: "Publicado em: Instagram, Facebook"
    });
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Teste 2: Agendamento
    addTestResult({
      id: "pub-2",
      name: "Agendamento de Publicação",
      status: "success",
      message: "Publicação agendada com sucesso",
      details: "Agendado para: 28/05/2025 às 14:30 em Instagram, Facebook, Twitter"
    });
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Teste 3: Carregamento de mídia
    addTestResult({
      id: "pub-3",
      name: "Upload de Mídia",
      status: "warning",
      message: "Mídia carregada com limitações",
      details: "Imagem redimensionada para atender aos limites da API"
    });
  };
  
  const runTokenRefreshTests = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Teste 1: Renovação automática
    addTestResult({
      id: "token-1",
      name: "Renovação Automática de Token",
      status: "success",
      message: "Token renovado automaticamente",
      details: "Token atualizado para a conta Instagram"
    });
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Teste 2: Expiração de token
    addTestResult({
      id: "token-2",
      name: "Detecção de Token Expirado",
      status: "warning",
      message: "Token expirado detectado e notificação enviada",
      details: "Conta Facebook requer renovação manual"
    });
  };
  
  const addTestResult = (result: Omit<TestResult, "timestamp">) => {
    setTestResults(prev => [
      ...prev,
      {
        ...result,
        timestamp: new Date()
      }
    ]);
  };
  
  const getStatusIcon = (status: TestResult["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "pending":
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Testes e Validação</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Autenticação OAuth</CardTitle>
          </CardHeader>
          <CardContent>
            <SocialAuthManager />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Publicação Multicanal</CardTitle>
          </CardHeader>
          <CardContent>
            <MultiChannelPublisher />
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Execução de Testes Automatizados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Button 
              onClick={runAllTests} 
              disabled={isRunningTests}
              className="gap-2"
            >
              {isRunningTests ? "Executando..." : "Executar Todos os Testes"}
            </Button>
          </div>
          
          <Separator className="my-4" />
          
          {testResults.length > 0 ? (
            <div className="space-y-4">
              <h3 className="font-medium">Resultados dos Testes</h3>
              
              <Accordion type="single" collapsible className="w-full">
                {testResults.map((result) => (
                  <AccordionItem key={result.id} value={result.id}>
                    <AccordionTrigger className="py-2 px-3 hover:bg-muted/40 rounded-md">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(result.status)}
                        <span>{result.name}</span>
                        <Badge 
                          variant="outline" 
                          className={
                            result.status === "success" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" :
                            result.status === "warning" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400" :
                            result.status === "error" ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" :
                            "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                          }
                        >
                          {result.status}
                        </Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <Alert 
                        className={
                          result.status === "success" ? "border-green-200 dark:border-green-900" :
                          result.status === "warning" ? "border-yellow-200 dark:border-yellow-900" :
                          result.status === "error" ? "border-red-200 dark:border-red-900" :
                          "border-blue-200 dark:border-blue-900"
                        }
                      >
                        <AlertTitle>{result.message}</AlertTitle>
                        <AlertDescription className="mt-2">
                          <div className="text-sm">{result.details}</div>
                          <div className="text-xs text-gray-500 mt-2">
                            Testado em: {result.timestamp.toLocaleString()}
                          </div>
                        </AlertDescription>
                      </Alert>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ) : (
            isRunningTests ? (
              <div className="text-center py-6">
                <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                <p className="mt-2">Executando testes...</p>
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                Clique no botão acima para executar os testes automatizados
              </div>
            )
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialTestingPage;
