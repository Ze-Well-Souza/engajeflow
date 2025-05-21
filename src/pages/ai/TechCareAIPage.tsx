
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Settings, Key } from "lucide-react";
import { toast } from "sonner";

import SentimentAnalysisWidget from "@/components/techcare/ai/SentimentAnalysisWidget";
import TicketClassifierWidget from "@/components/techcare/ai/TicketClassifierWidget";
import ResponseGeneratorWidget from "@/components/techcare/ai/ResponseGeneratorWidget";
import TextSummarizerWidget from "@/components/techcare/ai/TextSummarizerWidget";
import InsightsWidget from "@/components/techcare/ai/InsightsWidget";
import AIService from '@/services/techcare/AIService';

const TechCareAIPage: React.FC = () => {
  const [sampleText, setSampleText] = useState<string>(
    "Estou tendo problema para acessar minha conta. Já tentei redefinir a senha, mas não estou recebendo o e-mail de confirmação. Preciso acessar com urgência para verificar alguns dados importantes. Por favor, me ajudem a resolver isso o mais rápido possível."
  );
  const [conversationText, setConversationText] = useState<string>(
    "Atendente: Olá! Como posso ajudar?\n\nCliente: Estou com problema para acessar minha conta. Já tentei redefinir minha senha várias vezes.\n\nAtendente: Entendo sua frustração. Você está recebendo algum e-mail de confirmação?\n\nCliente: Não, não estou recebendo nenhum e-mail, já verifiquei minha caixa de spam também.\n\nAtendente: Vamos verificar se o e-mail cadastrado está correto. Poderia me informar qual e-mail você está usando?\n\nCliente: Estou usando o email cliente@exemplo.com, tenho certeza que está correto pois recebi outras comunicações antes.\n\nAtendente: Deixe-me verificar no sistema. Um momento, por favor.\n\nAtendente: Identifiquei que existe um problema no servidor de e-mails que está afetando alguns usuários. Nossa equipe técnica já está trabalhando para resolver.\n\nCliente: E quanto tempo vai demorar? Preciso acessar com urgência.\n\nAtendente: Entendo sua urgência. Estamos trabalhando para resolver nas próximas 2 horas. Posso oferecer uma solução alternativa temporária.\n\nCliente: Sim, por favor, preciso acessar hoje sem falta.\n\nAtendente: Vou criar um link de acesso temporário válido por 24 horas e enviar para um e-mail alternativo. Poderia me informar outro e-mail para enviar?\n\nCliente: Pode enviar para secundario@exemplo.com\n\nAtendente: Perfeito! Acabei de enviar o link. Você deve recebê-lo nos próximos minutos.\n\nCliente: Recebi o link e consegui acessar! Muito obrigado pela ajuda rápida!\n\nAtendente: Fico feliz em poder ajudar! Qualquer outra questão, estamos à disposição."
  );
  const [apiKey, setApiKey] = useState<string>("");
  const [isApiConfigured, setIsApiConfigured] = useState<boolean>(false);
  
  const handleConfigureAPI = () => {
    if (!apiKey.trim()) {
      toast.error("Por favor, insira uma chave de API válida");
      return;
    }
    
    try {
      AIService.configure({ apiKey });
      setIsApiConfigured(true);
      toast.success("API de IA configurada com sucesso");
    } catch (error) {
      toast.error("Erro ao configurar API de IA");
    }
  };
  
  const [generatedResponse, setGeneratedResponse] = useState<string>("");
  const handleInsertResponse = (text: string) => {
    setGeneratedResponse(text);
  };
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">TechCare AI - Módulos de Inteligência Artificial</h1>
      
      {!isApiConfigured && (
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-full bg-amber-500/20">
                <Key className="h-5 w-5 text-amber-500" />
              </div>
              <div className="space-y-2 flex-1">
                <h3 className="text-lg font-medium">Configuração da API de IA</h3>
                <p className="text-muted-foreground text-sm">
                  Para utilizar os recursos de IA, é necessário configurar uma chave de API válida.
                </p>
                <div className="flex gap-2 mt-4">
                  <div className="flex-1">
                    <Input
                      type="password"
                      placeholder="Insira sua chave de API"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                    />
                  </div>
                  <Button onClick={handleConfigureAPI}>
                    <Settings className="h-4 w-4 mr-2" />
                    Configurar
                  </Button>
                </div>
                <Alert variant="destructive" className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Ambiente de demonstração</AlertTitle>
                  <AlertDescription>
                    Esta é uma demonstração que simula o funcionamento da IA. Em produção, você precisará de uma chave de API válida de provedores como OpenAI, Azure ou outros serviços compatíveis.
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <Tabs defaultValue="sentiment" className="w-full">
        <TabsList className="w-full mb-6">
          <TabsTrigger value="sentiment" className="flex-1">Análise de Sentimentos</TabsTrigger>
          <TabsTrigger value="classifier" className="flex-1">Classificação de Tickets</TabsTrigger>
          <TabsTrigger value="response" className="flex-1">Geração de Respostas</TabsTrigger>
          <TabsTrigger value="summarizer" className="flex-1">Sumário Automático</TabsTrigger>
          <TabsTrigger value="insights" className="flex-1">Insights do Dashboard</TabsTrigger>
        </TabsList>
        
        <div className="mb-6">
          <Label htmlFor="sample-text">Texto de exemplo para análise (edite conforme necessário):</Label>
          <Textarea
            id="sample-text"
            value={sampleText}
            onChange={(e) => setSampleText(e.target.value)}
            className="mt-1"
            rows={4}
          />
        </div>
        
        <TabsContent value="sentiment">
          <div className="grid md:grid-cols-2 gap-6">
            <SentimentAnalysisWidget text={sampleText} />
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">Sobre a Análise de Sentimento</h3>
                <p className="text-muted-foreground mb-4">
                  A análise de sentimento utiliza inteligência artificial para determinar o tom emocional em uma mensagem de texto. 
                  Isso permite priorizar tickets com sentimentos negativos que podem precisar de atenção mais urgente.
                </p>
                <h4 className="font-medium mt-4 mb-2">Principais benefícios:</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  <li>Identificação automática de clientes insatisfeitos</li>
                  <li>Priorização de tickets com sentimentos negativos</li>
                  <li>Métricas de satisfação do cliente em tempo real</li>
                  <li>Detecção de problemas emergentes através de padrões</li>
                  <li>Adaptação do tom de resposta baseado no sentimento do cliente</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="classifier">
          <div className="grid md:grid-cols-2 gap-6">
            <TicketClassifierWidget text={sampleText} />
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">Sobre a Classificação de Tickets</h3>
                <p className="text-muted-foreground mb-4">
                  A classificação automática de tickets utiliza IA para categorizar as mensagens recebidas, 
                  facilitando o direcionamento para os departamentos corretos e agilizando o atendimento.
                </p>
                <h4 className="font-medium mt-4 mb-2">Principais benefícios:</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  <li>Categorização automática sem intervenção manual</li>
                  <li>Encaminhamento direto para equipes especializadas</li>
                  <li>Redução no tempo de resolução de tickets</li>
                  <li>Identificação de subcategorias para análise detalhada</li>
                  <li>Métricas sobre tipos de problemas mais comuns</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="response">
          <div className="grid md:grid-cols-2 gap-6">
            <ResponseGeneratorWidget 
              context={sampleText} 
              onInsert={handleInsertResponse}
            />
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-2">Resposta Gerada</h3>
                  <div className="bg-muted rounded-md p-4 min-h-[100px]">
                    {generatedResponse ? (
                      <p>{generatedResponse}</p>
                    ) : (
                      <p className="text-muted-foreground italic">
                        Use o botão "Inserir Resposta" ao lado para ver o resultado aqui
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-4">Sobre o Gerador de Respostas</h3>
                  <p className="text-muted-foreground mb-4">
                    O gerador de respostas inteligentes utiliza IA para criar respostas contextualizadas 
                    e profissionais para as mensagens recebidas, acelerando o tempo de resposta.
                  </p>
                  <h4 className="font-medium mt-4 mb-2">Principais benefícios:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    <li>Respostas rápidas para perguntas comuns</li>
                    <li>Manutenção de tom profissional e consistente</li>
                    <li>Múltiplas variações para escolha do atendente</li>
                    <li>Customização através de prompts personalizados</li>
                    <li>Economia de tempo para os atendentes</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="summarizer">
          <div className="grid md:grid-cols-2 gap-6">
            <TextSummarizerWidget text={conversationText} />
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-2">Conversa Original</h3>
                  <div className="bg-muted rounded-md p-4 max-h-[300px] overflow-y-auto">
                    <pre className="text-sm whitespace-pre-wrap font-sans">{conversationText}</pre>
                  </div>
                  <div className="mt-4">
                    <Label htmlFor="conversation-text">Você pode editar a conversa:</Label>
                    <Textarea
                      id="conversation-text"
                      value={conversationText}
                      onChange={(e) => setConversationText(e.target.value)}
                      className="mt-1"
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-4">Sobre o Sumário Automático</h3>
                  <p className="text-muted-foreground mb-4">
                    O sumário automático utiliza IA para condensar conversas longas em resumos concisos,
                    facilitando o acompanhamento de conversas extensas e o handoff entre atendentes.
                  </p>
                  <h4 className="font-medium mt-4 mb-2">Principais benefícios:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    <li>Resumo rápido de conversas extensas</li>
                    <li>Identificação dos pontos-chave da interação</li>
                    <li>Facilita a transferência de atendimento entre agentes</li>
                    <li>Melhora a eficiência na resolução de casos recorrentes</li>
                    <li>Economiza tempo na revisão de histórico de conversas</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="insights">
          <div className="grid md:grid-cols-2 gap-6">
            <InsightsWidget />
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">Sobre os Insights Inteligentes</h3>
                <p className="text-muted-foreground mb-4">
                  Os insights inteligentes analisam dados de atendimento e detectam padrões,
                  problemas emergentes e oportunidades de melhoria que poderiam passar despercebidos.
                </p>
                <h4 className="font-medium mt-4 mb-2">Principais benefícios:</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  <li>Identificação proativa de problemas recorrentes</li>
                  <li>Detecção de oportunidades de melhoria no atendimento</li>
                  <li>Análise de tendências em tempo real</li>
                  <li>Recomendações acionáveis baseadas em dados</li>
                  <li>Priorização de ações com maior impacto no negócio</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TechCareAIPage;
