
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bot, MessageSquare, Settings, TrendingUp } from 'lucide-react';

const CustomerServiceAutomation: React.FC = () => {
  const [activeBot, setActiveBot] = useState(true);
  const [responses, setResponses] = useState([
    { trigger: 'horário', response: 'Nosso horário de funcionamento é de segunda a sexta, das 9h às 18h.' },
    { trigger: 'preço', response: 'Para informações sobre preços, entre em contato com nossa equipe comercial.' },
    { trigger: 'entrega', response: 'O prazo de entrega é de 3 a 5 dias úteis após a confirmação do pedido.' }
  ]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              Automação de Atendimento
            </div>
            <Badge variant={activeBot ? 'default' : 'secondary'}>
              {activeBot ? 'Ativo' : 'Inativo'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="responses" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="responses">Respostas</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="settings">Configurações</TabsTrigger>
            </TabsList>
            
            <TabsContent value="responses" className="space-y-4">
              <div className="space-y-3">
                {responses.map((item, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{item.trigger}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.response}</p>
                  </div>
                ))}
              </div>
              <Button className="w-full">
                <MessageSquare className="mr-2 h-4 w-4" />
                Adicionar Nova Resposta
              </Button>
            </TabsContent>
            
            <TabsContent value="analytics" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold">1,234</div>
                    <p className="text-xs text-muted-foreground">Mensagens Processadas</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold">89%</div>
                    <p className="text-xs text-muted-foreground">Taxa de Resolução</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Tom de Voz do Bot</label>
                  <Input placeholder="Ex: Amigável e profissional" />
                </div>
                <div>
                  <label className="text-sm font-medium">Idiomas Suportados</label>
                  <div className="flex gap-2 mt-2">
                    <Badge>Português</Badge>
                    <Badge variant="outline">Inglês</Badge>
                    <Badge variant="outline">Espanhol</Badge>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerServiceAutomation;
