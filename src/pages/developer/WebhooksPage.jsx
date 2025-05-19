
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Copy, RefreshCw, Send, Check, AlertTriangle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const WebhooksPage = () => {
  const [webhooks, setWebhooks] = useState([
    {
      id: "wh-1",
      name: "CRM Sync",
      url: "https://api.crmsystem.com/webhooks/techze",
      events: ["message.sent", "message.received"],
      active: true,
      lastDelivery: {
        success: true,
        timestamp: "2025-05-16T14:23:45Z",
      },
    },
    {
      id: "wh-2",
      name: "Customer Support",
      url: "https://support.example.com/incoming",
      events: ["customer.created", "support.ticket"],
      active: false,
      lastDelivery: {
        success: false,
        timestamp: "2025-05-15T09:12:30Z",
      },
    },
  ]);
  
  const [selectedEvents, setSelectedEvents] = useState([]);
  
  const handleAddEvent = (event) => {
    if (event && !selectedEvents.includes(event)) {
      setSelectedEvents([...selectedEvents, event]);
    }
  };
  
  const handleRemoveEvent = (event) => {
    setSelectedEvents(selectedEvents.filter(e => e !== event));
  };
  
  const testWebhook = (id) => {
    toast.success(`Teste enviado para webhook ${id}`);
  };
  
  const toggleWebhook = (id) => {
    setWebhooks(webhooks.map(wh => 
      wh.id === id ? { ...wh, active: !wh.active } : wh
    ));
    toast.success(`Webhook ${id} ${webhooks.find(wh => wh.id === id)?.active ? 'desativado' : 'ativado'}`);
  };
  
  const deleteWebhook = (id) => {
    setWebhooks(webhooks.filter(wh => wh.id !== id));
    toast.success(`Webhook ${id} excluído`);
  };
  
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Webhooks Personalizados</h1>
      
      <Tabs defaultValue="configured">
        <TabsList className="mb-4">
          <TabsTrigger value="configured">Webhooks Configurados</TabsTrigger>
          <TabsTrigger value="create">Criar Webhook</TabsTrigger>
          <TabsTrigger value="logs">Logs de Envio</TabsTrigger>
        </TabsList>
        
        <TabsContent value="configured">
          <div className="space-y-4">
            {webhooks.length > 0 ? (
              webhooks.map((webhook) => (
                <Card key={webhook.id}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {webhook.name}
                          <Badge variant={webhook.active ? "default" : "outline"}>
                            {webhook.active ? "Ativo" : "Inativo"}
                          </Badge>
                        </CardTitle>
                        <CardDescription className="mt-1.5">
                          <span className="font-mono text-xs">{webhook.url}</span>
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch 
                          checked={webhook.active}
                          onCheckedChange={() => toggleWebhook(webhook.id)} 
                        />
                      </div>
                    </div>
                  </CardHeader>
                  {/* Mais conteúdo do card aqui */}
                </Card>
              ))
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Nenhum webhook configurado</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Você ainda não configurou nenhum webhook. Crie seu primeiro webhook na aba "Criar Webhook".</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
        
        {/* Outros TabsContent aqui */}
      </Tabs>
    </div>
  );
};

export default WebhooksPage;
