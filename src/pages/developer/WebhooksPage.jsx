
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle, Plus, RefreshCcw, Trash2, Copy, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLocalization } from "@/contexts/LocalizationContext";

// Dados de exemplo para demonstração
const exampleWebhooks = [
  { 
    id: "wh_1", 
    url: "https://exemplo.com/webhooks/techcare", 
    events: ["post.created", "post.updated"], 
    active: true,
    lastTriggered: "2025-05-17T14:30:00Z",
    status: "success"
  },
  { 
    id: "wh_2", 
    url: "https://meuapp.com.br/api/callbacks", 
    events: ["user.login", "user.logout"], 
    active: false,
    lastTriggered: "2025-05-15T10:15:00Z",
    status: "failed"
  }
];

const availableEvents = [
  { value: "post.created", label: "Post Criado" },
  { value: "post.updated", label: "Post Atualizado" },
  { value: "post.deleted", label: "Post Excluído" },
  { value: "user.login", label: "Usuário Logou" },
  { value: "user.logout", label: "Usuário Deslogou" },
  { value: "campaign.started", label: "Campanha Iniciada" },
  { value: "campaign.ended", label: "Campanha Finalizada" },
  { value: "message.sent", label: "Mensagem Enviada" },
  { value: "message.delivered", label: "Mensagem Entregue" },
];

const WebhooksPage = () => {
  const { toast } = useToast();
  const { t } = useLocalization();
  const [webhooks, setWebhooks] = useState(exampleWebhooks);
  const [newWebhookUrl, setNewWebhookUrl] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);

  const handleToggleWebhook = (id, currentStatus) => {
    setWebhooks(webhooks.map(webhook => 
      webhook.id === id ? { ...webhook, active: !currentStatus } : webhook
    ));
    
    toast({
      title: currentStatus 
        ? "Webhook desativado" 
        : "Webhook ativado",
      description: "O status do webhook foi atualizado com sucesso.",
    });
  };

  const handleDeleteWebhook = (id) => {
    setWebhooks(webhooks.filter(webhook => webhook.id !== id));
    toast({
      title: "Webhook removido",
      description: "O webhook foi removido com sucesso.",
    });
  };

  const handleAddWebhook = () => {
    if (!newWebhookUrl || selectedEvents.length === 0) {
      toast({
        title: "Erro ao adicionar webhook",
        description: "Por favor, insira uma URL e selecione pelo menos um evento.",
        variant: "destructive",
      });
      return;
    }
    
    // Em um app real, isso enviaria para a API
    const newWebhook = {
      id: `wh_${Math.random().toString(36).substr(2, 9)}`,
      url: newWebhookUrl,
      events: selectedEvents,
      active: true,
      lastTriggered: null,
      status: null
    };
    
    setWebhooks([...webhooks, newWebhook]);
    setNewWebhookUrl("");
    setSelectedEvents([]);
    setShowAddForm(false);
    
    toast({
      title: "Webhook adicionado",
      description: "O novo webhook foi adicionado com sucesso.",
    });
  };

  const handleToggleEvent = (event) => {
    if (selectedEvents.includes(event)) {
      setSelectedEvents(selectedEvents.filter(e => e !== event));
    } else {
      setSelectedEvents([...selectedEvents, event]);
    }
  };

  const handleTestWebhook = (id) => {
    toast({
      title: "Teste enviado",
      description: "Um evento de teste foi enviado para este webhook.",
    });
  };

  const copySecret = () => {
    navigator.clipboard.writeText("whsec_bF9nW8vE1hY3xZ2qP4jL5tK7mD0cR6");
    toast({
      title: "Secret copiado!",
      description: "O secret do webhook foi copiado para a área de transferência.",
    });
  };

  return (
    <div className="container max-w-6xl mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Webhooks</h1>
        <Button onClick={() => setShowAddForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Novo Webhook
        </Button>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Sobre Webhooks</CardTitle>
          <CardDescription>
            Webhooks permitem que sua aplicação receba notificações em tempo real 
            sobre eventos que ocorrem na sua conta TechCare.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Para usar webhooks de forma segura, autentique as requisições usando o secret abaixo. 
            Mantenha este secret seguro e nunca o compartilhe.
          </p>
          <div className="bg-secondary/30 p-4 rounded-md flex justify-between items-center">
            <code className="text-sm font-mono">whsec_bF9nW8vE1hY3xZ2qP4jL5tK7mD0cR6</code>
            <Button variant="ghost" size="sm" onClick={copySecret} className="flex items-center gap-1">
              <Copy className="h-3.5 w-3.5" />
              Copiar
            </Button>
          </div>
        </CardContent>
      </Card>

      {showAddForm && (
        <Card className="mb-6 border border-primary/50">
          <CardHeader>
            <CardTitle>Adicionar Novo Webhook</CardTitle>
            <CardDescription>
              Configure um novo endpoint para receber notificações.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="webhook-url">URL do Endpoint</Label>
              <Input
                id="webhook-url"
                placeholder="https://seu-site.com/webhook"
                value={newWebhookUrl}
                onChange={(e) => setNewWebhookUrl(e.target.value)}
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Este endpoint deve estar acessível publicamente e aceitar requisições POST.
              </p>
            </div>
            
            <div>
              <Label className="block mb-2">Eventos</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {availableEvents.map((event) => (
                  <div key={event.value} className="flex items-center space-x-2">
                    <Switch 
                      id={`event-${event.value}`}
                      checked={selectedEvents.includes(event.value)}
                      onCheckedChange={() => handleToggleEvent(event.value)}
                    />
                    <Label htmlFor={`event-${event.value}`}>{event.label}</Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-4">
            <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancelar</Button>
            <Button onClick={handleAddWebhook}>Adicionar Webhook</Button>
          </CardFooter>
        </Card>
      )}

      <h2 className="text-xl font-semibold mb-4">Webhooks Configurados</h2>
      
      {webhooks.length > 0 ? (
        <div className="space-y-4">
          {webhooks.map((webhook) => (
            <Card key={webhook.id}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div className="mb-2 md:mb-0">
                    <h3 className="font-medium flex items-center">
                      {webhook.active ? (
                        <Badge className="mr-2 bg-green-600">Ativo</Badge>
                      ) : (
                        <Badge className="mr-2 bg-gray-400">Inativo</Badge>
                      )}
                      {webhook.url}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      ID: {webhook.id}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleTestWebhook(webhook.id)}
                      className="flex items-center gap-1"
                    >
                      <RefreshCcw className="h-3.5 w-3.5" />
                      Testar
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleToggleWebhook(webhook.id, webhook.active)}
                    >
                      {webhook.active ? "Desativar" : "Ativar"}
                    </Button>
                    <Button 
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteWebhook(webhook.id)}
                      className="flex items-center gap-1"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Remover
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Eventos</h4>
                    <div className="flex flex-wrap gap-2">
                      {webhook.events.map((event) => (
                        <Badge key={event} variant="secondary">
                          {event}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Último acionamento</h4>
                    <p className="text-sm">
                      {webhook.lastTriggered ? new Date(webhook.lastTriggered).toLocaleString() : "Nunca acionado"}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Status</h4>
                    {webhook.status === "success" ? (
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-sm text-green-600">Sucesso</span>
                      </div>
                    ) : webhook.status === "failed" ? (
                      <div className="flex items-center">
                        <AlertTriangle className="h-4 w-4 text-red-500 mr-1" />
                        <span className="text-sm text-red-600">Falha</span>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">Sem dados</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">Nenhum webhook configurado.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => setShowAddForm(true)}
            >
              Adicionar seu primeiro webhook
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WebhooksPage;
