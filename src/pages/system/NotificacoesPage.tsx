
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Bell, Mail, MessageSquare, AlertCircle, CheckCircle, Calendar, Clock, X, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLocalization } from "@/contexts/LocalizationContext";

const NotificacoesPage: React.FC = () => {
  const { toast } = useToast();
  const { t } = useLocalization();
  
  const handleToggleNotification = (type: string, enabled: boolean) => {
    toast({
      title: enabled ? "Notificação ativada" : "Notificação desativada",
      description: `${type} ${enabled ? 'ativado' : 'desativado'} com sucesso`
    });
  };
  
  const getTimeAgo = (minutes: number): string => {
    if (minutes < 60) {
      return `${minutes}m atrás`;
    }
    if (minutes < 1440) {
      return `${Math.floor(minutes / 60)}h atrás`;
    }
    return `${Math.floor(minutes / 1440)}d atrás`;
  };
  
  return (
    <div className="container p-6 max-w-4xl space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Bell className="h-6 w-6 text-primary" />
          Notificações
        </h1>
        <p className="text-muted-foreground">
          Gerencie suas preferências de notificações e visualize mensagens recentes
        </p>
      </div>

      <Tabs defaultValue="all">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="unread" className="relative">
              Não lidas
              <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center">4</Badge>
            </TabsTrigger>
            <TabsTrigger value="archived">Arquivadas</TabsTrigger>
          </TabsList>
          
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Configurações
          </Button>
        </div>
        
        <TabsContent value="all" className="space-y-4">
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-blue-500" />
                    <CardTitle className="text-base">Nova mensagem recebida</CardTitle>
                  </div>
                  <Badge variant="outline" className="font-normal">
                    {getTimeAgo(15)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p>Você recebeu uma nova mensagem de <span className="font-medium">João Silva</span> sobre o pedido #1234.</p>
              </CardContent>
              <CardFooter className="flex justify-between pt-0">
                <Button variant="ghost" size="sm">Marcar como lida</Button>
                <Button variant="outline" size="sm">Ver mensagem</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-indigo-500" />
                    <CardTitle className="text-base">Lembrete de agendamento</CardTitle>
                  </div>
                  <Badge variant="outline" className="font-normal">
                    {getTimeAgo(120)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p>Lembrete: Você tem um post agendado para publicação em 1 hora.</p>
              </CardContent>
              <CardFooter className="flex justify-between pt-0">
                <Button variant="ghost" size="sm">Marcar como lida</Button>
                <Button variant="outline" size="sm">Ver agendamento</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <CardTitle className="text-base">Pagamento confirmado</CardTitle>
                  </div>
                  <Badge variant="outline" className="font-normal">
                    {getTimeAgo(540)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p>O pagamento de R$ 1.250,00 referente ao pedido #9876 foi confirmado.</p>
              </CardContent>
              <CardFooter className="flex justify-between pt-0">
                <Button variant="ghost" size="sm">Arquivar</Button>
                <Button variant="outline" size="sm">Ver detalhes</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-amber-500" />
                    <CardTitle className="text-base">Alerta de segurança</CardTitle>
                  </div>
                  <Badge variant="outline" className="font-normal">
                    {getTimeAgo(1240)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p>Foi detectado um login na sua conta a partir de um novo dispositivo. Se não foi você, verifique a segurança da conta.</p>
              </CardContent>
              <CardFooter className="flex justify-between pt-0">
                <Button variant="ghost" size="sm">Ignorar</Button>
                <Button variant="outline" size="sm">Revisar segurança</Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="flex justify-center pt-4">
            <Button variant="outline">Carregar mais</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="unread" className="space-y-4">
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-blue-500" />
                    <CardTitle className="text-base">Nova mensagem recebida</CardTitle>
                  </div>
                  <Badge variant="outline" className="font-normal">
                    {getTimeAgo(15)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p>Você recebeu uma nova mensagem de <span className="font-medium">João Silva</span> sobre o pedido #1234.</p>
              </CardContent>
              <CardFooter className="flex justify-end pt-0">
                <Button variant="outline" size="sm">Ver mensagem</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-indigo-500" />
                    <CardTitle className="text-base">Lembrete de agendamento</CardTitle>
                  </div>
                  <Badge variant="outline" className="font-normal">
                    {getTimeAgo(120)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p>Lembrete: Você tem um post agendado para publicação em 1 hora.</p>
              </CardContent>
              <CardFooter className="flex justify-end pt-0">
                <Button variant="outline" size="sm">Ver agendamento</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="archived" className="space-y-4">
          <div className="space-y-4">
            <Card className="opacity-80">
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <CardTitle className="text-base">Término de teste</CardTitle>
                  </div>
                  <Badge variant="outline" className="font-normal">
                    {getTimeAgo(10080)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Seu período de teste gratuito termina em 3 dias. Atualize para continuar usando todos os recursos.</p>
              </CardContent>
              <CardFooter className="flex justify-between pt-0">
                <Button variant="ghost" size="sm">
                  <X className="h-4 w-4 mr-1" />
                  Remover
                </Button>
                <Button variant="outline" size="sm" className="opacity-70">Ver planos</Button>
              </CardFooter>
            </Card>
            
            <Card className="opacity-80">
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-muted-foreground" />
                    <CardTitle className="text-base">Atualizações disponíveis</CardTitle>
                  </div>
                  <Badge variant="outline" className="font-normal">
                    {getTimeAgo(20160)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Uma nova versão do sistema está disponível com melhorias de segurança.</p>
              </CardContent>
              <CardFooter className="flex justify-between pt-0">
                <Button variant="ghost" size="sm">
                  <X className="h-4 w-4 mr-1" />
                  Remover
                </Button>
                <Button variant="outline" size="sm" className="opacity-70">Atualizar</Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="flex justify-center pt-4">
            <Button variant="outline">Limpar histórico arquivado</Button>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="pt-8">
        <h2 className="text-xl font-semibold mb-4">Preferências de notificações</h2>
        
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-primary" />
                    <h3 className="font-medium">Mensagens</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Notificações sobre novas mensagens recebidas
                  </p>
                </div>
                <Switch defaultChecked onCheckedChange={(checked) => handleToggleNotification('Mensagens', checked)} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <h3 className="font-medium">Email</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Notificações via email para eventos importantes
                  </p>
                </div>
                <Switch defaultChecked onCheckedChange={(checked) => handleToggleNotification('Email', checked)} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <h3 className="font-medium">Agendamentos</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Lembretes de publicações e eventos agendados
                  </p>
                </div>
                <Switch defaultChecked onCheckedChange={(checked) => handleToggleNotification('Agendamentos', checked)} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-primary" />
                    <h3 className="font-medium">Alertas</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Alertas de segurança e informações críticas
                  </p>
                </div>
                <Switch defaultChecked onCheckedChange={(checked) => handleToggleNotification('Alertas', checked)} />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-6">
            <Button variant="outline">Redefinir padrões</Button>
            <Button>Salvar preferências</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default NotificacoesPage;
