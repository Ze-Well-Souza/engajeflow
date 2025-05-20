
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  MessageSquare,
  Settings,
  Play,
  Pause,
  Mic,
  Star,
  Upload,
  PenTool,
  Users,
  Shield,
  BarChart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface AutomationRule {
  id: string;
  name: string;
  trigger: string;
  action: string;
  status: "active" | "inactive";
  priority: number;
}

const CustomerServiceAutomation: React.FC = () => {
  const [isActivated, setIsActivated] = useState(true);
  const [activeTab, setActiveTab] = useState("rules");
  const [selectedLanguage, setSelectedLanguage] = useState("pt-BR");
  const [confidenceThreshold, setConfidenceThreshold] = useState(75);
  const [rules, setRules] = useState<AutomationRule[]>([
    {
      id: "rule1",
      name: "Saudação automática",
      trigger: "new_conversation",
      action: "send_greeting",
      status: "active",
      priority: 1,
    },
    {
      id: "rule2",
      name: "Resposta fora do horário",
      trigger: "outside_business_hours",
      action: "send_schedule_message",
      status: "active",
      priority: 2,
    },
    {
      id: "rule3",
      name: "FAQ sobre entregas",
      trigger: "keyword_delivery",
      action: "send_shipping_info",
      status: "active",
      priority: 3,
    },
    {
      id: "rule4",
      name: "Transferência para humano",
      trigger: "negative_sentiment",
      action: "transfer_to_agent",
      status: "active",
      priority: 4,
    },
  ]);
  
  const [newRuleName, setNewRuleName] = useState("");
  const [newRuleTrigger, setNewRuleTrigger] = useState("");
  const [newRuleAction, setNewRuleAction] = useState("");
  const [newRulePriority, setNewRulePriority] = useState(5);
  
  const { toast } = useToast();
  
  const handleToggleActivation = () => {
    setIsActivated(!isActivated);
    toast({
      title: !isActivated ? "Automação ativada" : "Automação desativada",
      description: !isActivated
        ? "O sistema de atendimento automatizado está agora em operação."
        : "O sistema de atendimento automatizado foi pausado.",
    });
  };
  
  const handleToggleRuleStatus = (id: string) => {
    setRules(
      rules.map(rule =>
        rule.id === id
          ? { ...rule, status: rule.status === "active" ? "inactive" : "active" }
          : rule
      )
    );
    
    const targetRule = rules.find(rule => rule.id === id);
    if (targetRule) {
      toast({
        title: `Regra ${targetRule.status === "active" ? "desativada" : "ativada"}`,
        description: `A regra "${targetRule.name}" foi ${
          targetRule.status === "active" ? "desativada" : "ativada"
        } com sucesso.`,
      });
    }
  };
  
  const handleAddRule = () => {
    if (!newRuleName || !newRuleTrigger || !newRuleAction) {
      toast({
        title: "Erro ao adicionar regra",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }
    
    const newRule: AutomationRule = {
      id: `rule${rules.length + 1}`,
      name: newRuleName,
      trigger: newRuleTrigger,
      action: newRuleAction,
      status: "active",
      priority: newRulePriority,
    };
    
    setRules([...rules, newRule]);
    
    // Reset form
    setNewRuleName("");
    setNewRuleTrigger("");
    setNewRuleAction("");
    setNewRulePriority(5);
    
    toast({
      title: "Regra adicionada",
      description: `A regra "${newRuleName}" foi adicionada com sucesso.`,
    });
  };
  
  const handleDeleteRule = (id: string) => {
    const targetRule = rules.find(rule => rule.id === id);
    
    setRules(rules.filter(rule => rule.id !== id));
    
    if (targetRule) {
      toast({
        title: "Regra excluída",
        description: `A regra "${targetRule.name}" foi excluída com sucesso.`,
      });
    }
  };
  
  const handleUpdateSettings = () => {
    toast({
      title: "Configurações atualizadas",
      description: "As configurações do assistente foram salvas com sucesso.",
    });
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Automação de Atendimento
            </CardTitle>
            <CardDescription>
              Configure seu assistente virtual para atendimento ao cliente
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-sm ${isActivated ? "text-green-500" : "text-red-500"}`}>
              {isActivated ? "Ativo" : "Inativo"}
            </span>
            <Button
              variant={isActivated ? "outline" : "default"}
              size="sm"
              onClick={handleToggleActivation}
              className="gap-1"
            >
              {isActivated ? (
                <>
                  <Pause className="h-4 w-4" /> Pausar
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" /> Iniciar
                </>
              )}
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="rules">Regras</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
            <TabsTrigger value="analytics">Análise</TabsTrigger>
          </TabsList>
          
          <TabsContent value="rules" className="space-y-4 mt-4">
            <div className="border rounded-md">
              <div className="bg-muted p-3 border-b text-sm font-medium flex items-center justify-between">
                <div>Regras de Automação</div>
                <Badge variant="outline">Total: {rules.length}</Badge>
              </div>
              
              <div className="divide-y">
                {rules.map(rule => (
                  <div key={rule.id} className="p-3 flex items-center justify-between">
                    <div>
                      <div className="font-medium">{rule.name}</div>
                      <div className="text-sm text-muted-foreground flex flex-col sm:flex-row sm:gap-2">
                        <span>
                          Gatilho: <span className="font-medium">{rule.trigger}</span>
                        </span>
                        <span className="hidden sm:inline">•</span>
                        <span>
                          Ação: <span className="font-medium">{rule.action}</span>
                        </span>
                        <span className="hidden sm:inline">•</span>
                        <span>
                          Prioridade: <span className="font-medium">{rule.priority}</span>
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={rule.status === "active"}
                        onCheckedChange={() => handleToggleRuleStatus(rule.id)}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDeleteRule(rule.id)}
                      >
                        Excluir
                      </Button>
                    </div>
                  </div>
                ))}
                
                {rules.length === 0 && (
                  <div className="p-8 text-center text-muted-foreground">
                    Nenhuma regra configurada. Adicione sua primeira regra abaixo.
                  </div>
                )}
              </div>
            </div>
            
            <div className="space-y-4 border rounded-md p-4">
              <h3 className="font-medium mb-2">Adicionar Nova Regra</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="rule-name" className="text-sm font-medium">
                    Nome da Regra
                  </label>
                  <Input
                    id="rule-name"
                    placeholder="Ex: Saudação Automática"
                    value={newRuleName}
                    onChange={e => setNewRuleName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="rule-priority" className="text-sm font-medium">
                    Prioridade
                  </label>
                  <Select 
                    value={String(newRulePriority)}
                    onValueChange={(value) => setNewRulePriority(Number(value))}
                  >
                    <SelectTrigger id="rule-priority">
                      <SelectValue placeholder="Selecione a prioridade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 - Máxima</SelectItem>
                      <SelectItem value="2">2 - Alta</SelectItem>
                      <SelectItem value="3">3 - Média</SelectItem>
                      <SelectItem value="4">4 - Baixa</SelectItem>
                      <SelectItem value="5">5 - Mínima</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="rule-trigger" className="text-sm font-medium">
                  Gatilho
                </label>
                <Select
                  value={newRuleTrigger}
                  onValueChange={setNewRuleTrigger}
                >
                  <SelectTrigger id="rule-trigger">
                    <SelectValue placeholder="Selecione um gatilho" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Eventos</SelectLabel>
                      <SelectItem value="new_conversation">Nova conversa</SelectItem>
                      <SelectItem value="conversation_idle">Conversa inativa</SelectItem>
                      <SelectItem value="outside_business_hours">Fora do horário comercial</SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Detecção</SelectLabel>
                      <SelectItem value="keyword_delivery">Palavras-chave: Entregas</SelectItem>
                      <SelectItem value="keyword_payment">Palavras-chave: Pagamentos</SelectItem>
                      <SelectItem value="keyword_support">Palavras-chave: Suporte</SelectItem>
                      <SelectItem value="negative_sentiment">Sentimento negativo</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="rule-action" className="text-sm font-medium">
                  Ação
                </label>
                <Select
                  value={newRuleAction}
                  onValueChange={setNewRuleAction}
                >
                  <SelectTrigger id="rule-action">
                    <SelectValue placeholder="Selecione uma ação" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Mensagens</SelectLabel>
                      <SelectItem value="send_greeting">Enviar saudação</SelectItem>
                      <SelectItem value="send_schedule_message">Informar horário de atendimento</SelectItem>
                      <SelectItem value="send_shipping_info">Enviar informações de entrega</SelectItem>
                      <SelectItem value="send_payment_info">Enviar informações de pagamento</SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Fluxo</SelectLabel>
                      <SelectItem value="transfer_to_agent">Transferir para atendente</SelectItem>
                      <SelectItem value="create_support_ticket">Criar ticket de suporte</SelectItem>
                      <SelectItem value="escalate_priority">Escalar prioridade</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
              <Button onClick={handleAddRule}>Adicionar Regra</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-6 mt-4">
            <div className="space-y-4">
              <h3 className="font-medium">Configurações Gerais</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="bot-name" className="text-sm font-medium">
                    Nome do Assistente
                  </label>
                  <Input
                    id="bot-name"
                    placeholder="Ex: Suporte EngageFlow"
                    defaultValue="Assistente EngageFlow"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="bot-language" className="text-sm font-medium">
                    Idioma Principal
                  </label>
                  <Select
                    value={selectedLanguage}
                    onValueChange={setSelectedLanguage}
                  >
                    <SelectTrigger id="bot-language">
                      <SelectValue placeholder="Selecione um idioma" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                      <SelectItem value="en-US">Inglês (EUA)</SelectItem>
                      <SelectItem value="es-ES">Espanhol</SelectItem>
                      <SelectItem value="fr-FR">Francês</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="welcome-message" className="text-sm font-medium">
                  Mensagem de Boas-vindas
                </label>
                <Textarea
                  id="welcome-message"
                  placeholder="Ex: Olá! Sou o assistente virtual da EngageFlow. Como posso ajudar?"
                  defaultValue="Olá! Sou o assistente virtual da EngageFlow. Como posso te ajudar hoje?"
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="fallback-message" className="text-sm font-medium">
                  Mensagem de Fallback
                </label>
                <Textarea
                  id="fallback-message"
                  placeholder="Ex: Desculpe, não entendi. Pode reformular sua pergunta?"
                  defaultValue="Desculpe, não entendi completamente. Poderia reformular sua pergunta ou escolher uma das opções abaixo?"
                  rows={3}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium">Configurações Avançadas</h3>
              
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-sm">Detectar sentimento</div>
                    <div className="text-sm text-muted-foreground">
                      Analisar o sentimento das mensagens dos clientes
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-sm">Sugestões de resposta</div>
                    <div className="text-sm text-muted-foreground">
                      Exibir sugestões de resposta para os atendentes
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-sm">Aprendizado automático</div>
                    <div className="text-sm text-muted-foreground">
                      Aprender com interações anteriores para melhorar respostas
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label htmlFor="confidence" className="text-sm font-medium">
                      Limite de confiança: {confidenceThreshold}%
                    </label>
                    <span className="text-xs text-muted-foreground">
                      {confidenceThreshold < 50 ? "Baixo" : confidenceThreshold < 75 ? "Médio" : "Alto"}
                    </span>
                  </div>
                  <Input
                    id="confidence"
                    type="range"
                    min="30"
                    max="95"
                    value={confidenceThreshold}
                    onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-xs text-muted-foreground">
                    Determina quando o assistente deve responder automaticamente
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-2">
              <Button onClick={handleUpdateSettings}>Salvar Configurações</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-6 mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <Users className="h-8 w-8 text-blue-500 mb-2" />
                    <div className="text-2xl font-bold">1,248</div>
                    <p className="text-sm text-muted-foreground">Conversas este mês</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <Shield className="h-8 w-8 text-green-500 mb-2" />
                    <div className="text-2xl font-bold">73%</div>
                    <p className="text-sm text-muted-foreground">Resolução automática</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <Star className="h-8 w-8 text-amber-500 mb-2" />
                    <div className="text-2xl font-bold">4.6/5</div>
                    <p className="text-sm text-muted-foreground">Satisfação do cliente</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <BarChart className="h-8 w-8 text-purple-500 mb-2" />
                    <div className="text-2xl font-bold">8.3min</div>
                    <p className="text-sm text-muted-foreground">Tempo médio economizado</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Desempenho por Tópico</h3>
                <Select defaultValue="30d">
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">7 dias</SelectItem>
                    <SelectItem value="30d">30 dias</SelectItem>
                    <SelectItem value="90d">90 dias</SelectItem>
                    <SelectItem value="365d">1 ano</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Dúvidas sobre entrega</span>
                  <span className="font-medium">86% de resolução</span>
                </div>
                <div className="bg-secondary h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-500 h-full rounded-full"
                    style={{ width: "86%" }}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Problemas com pagamento</span>
                  <span className="font-medium">65% de resolução</span>
                </div>
                <div className="bg-secondary h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-500 h-full rounded-full"
                    style={{ width: "65%" }}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Informações sobre produtos</span>
                  <span className="font-medium">92% de resolução</span>
                </div>
                <div className="bg-secondary h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-500 h-full rounded-full"
                    style={{ width: "92%" }}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Solicitações de reembolso</span>
                  <span className="font-medium">41% de resolução</span>
                </div>
                <div className="bg-secondary h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-500 h-full rounded-full"
                    style={{ width: "41%" }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="text-center border-t pt-4 mt-4 text-sm text-muted-foreground">
              <Button variant="outline" className="gap-1">
                <Upload className="h-4 w-4" />
                Exportar relatório detalhado
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="border-t pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <div className="text-sm text-muted-foreground flex items-center gap-2 mb-4 sm:mb-0">
          <Mic className="h-4 w-4 text-indigo-500" />
          <span>
            Assistente treinado com dados específicos do seu negócio para resultados personalizados
          </span>
        </div>
        <Button variant="outline" size="sm" className="gap-1">
          <PenTool className="h-4 w-4" />
          Personalizar respostas
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CustomerServiceAutomation;
