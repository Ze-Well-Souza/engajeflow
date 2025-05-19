
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, User, Store, Bell, Shield, Database, Globe, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const ConfiguracoesPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Configurações</h1>
        <Button variant="default" className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Salvar Alterações
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-x-6 gap-y-2">
        <div className="md:col-span-1">
          <div className="sticky top-4 space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground mb-2 px-4">CONFIGURAÇÕES</h3>
            
            <a href="#conta" className="flex items-center px-4 py-2 rounded-md bg-primary text-primary-foreground">
              <User className="h-4 w-4 mr-3" />
              Conta
            </a>
            
            <a href="#loja" className="flex items-center px-4 py-2 rounded-md hover:bg-muted text-foreground">
              <Store className="h-4 w-4 mr-3" />
              Loja
            </a>
            
            <a href="#notificacoes" className="flex items-center px-4 py-2 rounded-md hover:bg-muted text-foreground">
              <Bell className="h-4 w-4 mr-3" />
              Notificações
            </a>
            
            <a href="#seguranca" className="flex items-center px-4 py-2 rounded-md hover:bg-muted text-foreground">
              <Shield className="h-4 w-4 mr-3" />
              Segurança
            </a>
            
            <a href="#integracao" className="flex items-center px-4 py-2 rounded-md hover:bg-muted text-foreground">
              <Database className="h-4 w-4 mr-3" />
              Integração
            </a>
            
            <a href="#avancado" className="flex items-center px-4 py-2 rounded-md hover:bg-muted text-foreground">
              <Settings className="h-4 w-4 mr-3" />
              Avançado
            </a>
          </div>
        </div>

        <div className="md:col-span-3 space-y-6">
          <Card id="conta">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2 text-blue-500" />
                Configurações de Conta
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="space-y-4 flex-1">
                  <div>
                    <label className="block text-sm font-medium mb-1">Nome</label>
                    <Input defaultValue="Administrador" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <Input type="email" defaultValue="admin@techcare.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Telefone</label>
                    <Input type="tel" defaultValue="(11) 98765-4321" />
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="h-28 w-28 bg-muted rounded-full flex items-center justify-center mb-2">
                    <User className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <Button variant="link" size="sm">Alterar foto</Button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Idioma</label>
                <Select defaultValue="pt-br">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o idioma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pt-br">Português (Brasil)</SelectItem>
                    <SelectItem value="en-us">English (US)</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card id="loja">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Store className="h-5 w-5 mr-2 text-green-500" />
                Configurações da Loja
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nome da Loja</label>
                <Input defaultValue="TechCare" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Descrição</label>
                <Textarea 
                  rows={3}
                  defaultValue="Sua loja completa de tecnologia e acessórios."
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Moeda</label>
                  <Select defaultValue="BRL">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a moeda" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BRL">BRL (R$)</SelectItem>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Formato de Data</label>
                  <Select defaultValue="DD/MM/AAAA">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o formato" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DD/MM/AAAA">DD/MM/AAAA</SelectItem>
                      <SelectItem value="MM/DD/AAAA">MM/DD/AAAA</SelectItem>
                      <SelectItem value="AAAA-MM-DD">AAAA-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Logo da Loja</label>
                <div className="flex items-center mt-2">
                  <div className="h-16 w-16 bg-muted rounded-md flex items-center justify-center mr-4">
                    <Store className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <Button variant="outline">Fazer upload do logo</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card id="notificacoes">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2 text-yellow-500" />
                Configurações de Notificações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="notif-email" defaultChecked />
                  <label htmlFor="notif-email" className="text-sm">Notificações por e-mail</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="notif-system" defaultChecked />
                  <label htmlFor="notif-system" className="text-sm">Notificações no sistema</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="notif-summary" />
                  <label htmlFor="notif-summary" className="text-sm">Resumo diário de atividades</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="notif-estoque" defaultChecked />
                  <label htmlFor="notif-estoque" className="text-sm">Alertas de estoque baixo</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="notif-vendas" defaultChecked />
                  <label htmlFor="notif-vendas" className="text-sm">Novas vendas</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="notif-news" />
                  <label htmlFor="notif-news" className="text-sm">Novidades e atualizações do sistema</label>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card id="seguranca">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-red-500" />
                Segurança
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Alterar Senha</label>
                <Input 
                  type="password" 
                  className="mb-2"
                  placeholder="Senha atual"
                />
                <Input 
                  type="password" 
                  className="mb-2"
                  placeholder="Nova senha"
                />
                <Input 
                  type="password" 
                  placeholder="Confirmar nova senha"
                />
              </div>
              
              <div className="space-y-2 mt-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="two-factor" defaultChecked />
                  <label htmlFor="two-factor" className="text-sm">Autenticação de dois fatores</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="notify-login" />
                  <label htmlFor="notify-login" className="text-sm">Notificar sobre novos logins</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="require-auth" defaultChecked />
                  <label htmlFor="require-auth" className="text-sm">Exigir autenticação para ações sensíveis</label>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card id="integracao">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-5 w-5 mr-2 text-purple-500" />
                Integrações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 rounded-full flex items-center justify-center mr-3">
                    <Globe className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium">WhatsApp Business API</h3>
                    <p className="text-xs text-muted-foreground">Integração para envio e recebimento de mensagens</p>
                  </div>
                </div>
                <div>
                  <span className="px-2 py-0.5 bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 text-xs rounded-full border border-green-200 dark:border-green-700/50">
                    Conectado
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-full flex items-center justify-center mr-3">
                    <Globe className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium">Gateway de Pagamento</h3>
                    <p className="text-xs text-muted-foreground">Processamento de pagamentos online</p>
                  </div>
                </div>
                <div>
                  <span className="px-2 py-0.5 bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 text-xs rounded-full border border-green-200 dark:border-green-700/50">
                    Conectado
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 rounded-full flex items-center justify-center mr-3">
                    <Globe className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium">Automação de Marketing</h3>
                    <p className="text-xs text-muted-foreground">Criação de campanhas automatizadas</p>
                  </div>
                </div>
                <div>
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 dark:bg-gray-800/30 dark:text-gray-400 text-xs rounded-full border border-gray-200 dark:border-gray-700/50">
                    Desconectado
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400 rounded-full flex items-center justify-center mr-3">
                    <Globe className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium">Sistema de Logística</h3>
                    <p className="text-xs text-muted-foreground">Gerenciamento de envios e entregas</p>
                  </div>
                </div>
                <div>
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 dark:bg-gray-800/30 dark:text-gray-400 text-xs rounded-full border border-gray-200 dark:border-gray-700/50">
                    Desconectado
                  </span>
                </div>
              </div>
              
              <div className="flex justify-end mt-2">
                <Button>Adicionar Nova Integração</Button>
              </div>
            </CardContent>
          </Card>

          <Card id="avancado">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2 text-gray-500" />
                Configurações Avançadas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="maintenance-mode" defaultChecked />
                  <label htmlFor="maintenance-mode" className="text-sm">Modo de manutenção</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="advanced-logs" defaultChecked />
                  <label htmlFor="advanced-logs" className="text-sm">Logs avançados</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="auto-backup" />
                  <label htmlFor="auto-backup" className="text-sm">Backup automático diário</label>
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium mb-1">Intervalo de sessão (minutos)</label>
                <Input type="number" defaultValue="30" />
              </div>
              
              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <Button variant="destructive" size="sm">Resetar configurações</Button>
                <Button variant="outline" size="sm">Limpar cache</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ConfiguracoesPage;
