
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Bell, Mail, Globe, Key, ShieldCheck, Palette } from "lucide-react";

const ConfiguracoesPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("perfil");

  const handleSaveProfile = () => {
    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram salvas com sucesso."
    });
  };

  const handleSavePreferences = () => {
    toast({
      title: "Preferências atualizadas",
      description: "Suas preferências foram salvas com sucesso."
    });
  };

  const handleSaveSecurity = () => {
    toast({
      title: "Configurações de segurança atualizadas",
      description: "Suas configurações de segurança foram salvas com sucesso."
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Configurações de notificações atualizadas",
      description: "Suas preferências de notificação foram salvas com sucesso."
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Configurações da Conta</h2>
        <p className="text-muted-foreground">
          Gerencie suas preferências e configurações do sistema
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="perfil" className="flex items-center gap-2">
            <Avatar className="h-4 w-4">
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            Perfil
          </TabsTrigger>
          <TabsTrigger value="notificacoes" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notificações
          </TabsTrigger>
          <TabsTrigger value="seguranca" className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" />
            Segurança
          </TabsTrigger>
          <TabsTrigger value="aparencia" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Aparência
          </TabsTrigger>
          <TabsTrigger value="integracao" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Integrações
          </TabsTrigger>
        </TabsList>
        
        {/* Tab de Perfil */}
        <TabsContent value="perfil" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Informações do Perfil</CardTitle>
              <CardDescription>
                Gerencie suas informações pessoais e de contato
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <h3 className="font-medium">Foto do Perfil</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Camera className="h-4 w-4" />
                      Alterar
                    </Button>
                    <Button variant="outline" size="sm">Remover</Button>
                  </div>
                </div>
              </div>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input id="name" placeholder="Seu nome completo" defaultValue="Administrador TechCare" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="seu@email.com" defaultValue="admin@techcare.com" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input id="phone" placeholder="(00) 00000-0000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Empresa</Label>
                    <Input id="company" placeholder="Nome da empresa" defaultValue="TechCare" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Sobre mim</Label>
                  <Textarea id="bio" placeholder="Uma breve descrição sobre você" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveProfile}>Salvar alterações</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Tab de Notificações */}
        <TabsContent value="notificacoes" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Preferências de Notificações</CardTitle>
              <CardDescription>
                Configure como e quando deseja receber notificações do sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-lg mb-3 flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notificações do Sistema
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="new-message" className="font-medium">Novas mensagens</Label>
                        <p className="text-sm text-muted-foreground">Receba notificações quando chegarem novas mensagens</p>
                      </div>
                      <Switch id="new-message" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="activity" className="font-medium">Atividades de clientes</Label>
                        <p className="text-sm text-muted-foreground">Receba notificações sobre atividades dos seus clientes</p>
                      </div>
                      <Switch id="activity" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="system-updates" className="font-medium">Atualizações do sistema</Label>
                        <p className="text-sm text-muted-foreground">Receba notificações sobre atualizações e manutenções</p>
                      </div>
                      <Switch id="system-updates" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-lg mb-3 flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Notificações por E-mail
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-messages" className="font-medium">Resumo diário</Label>
                        <p className="text-sm text-muted-foreground">Receba um resumo diário das atividades por email</p>
                      </div>
                      <Switch id="email-messages" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-marketing" className="font-medium">Comunicados e novidades</Label>
                        <p className="text-sm text-muted-foreground">Receba emails sobre novos recursos e atualizações</p>
                      </div>
                      <Switch id="email-marketing" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveNotifications}>Salvar preferências</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Tab de Segurança */}
        <TabsContent value="seguranca" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Segurança da Conta</CardTitle>
              <CardDescription>
                Gerencie suas configurações de segurança e proteção de conta
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium text-lg mb-3 flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  Alterar Senha
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Senha Atual</Label>
                    <Input id="current-password" type="password" placeholder="Digite sua senha atual" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">Nova Senha</Label>
                    <Input id="new-password" type="password" placeholder="Digite sua nova senha" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                    <Input id="confirm-password" type="password" placeholder="Confirme sua nova senha" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-lg mb-3 flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5" />
                  Configurações Adicionais
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="two-factor" className="font-medium">Autenticação de dois fatores</Label>
                      <p className="text-sm text-muted-foreground">Ative a verificação em duas etapas para maior segurança</p>
                    </div>
                    <Switch id="two-factor" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="login-alerts" className="font-medium">Alertas de login</Label>
                      <p className="text-sm text-muted-foreground">Receba alertas quando houver login em um novo dispositivo</p>
                    </div>
                    <Switch id="login-alerts" defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveSecurity}>Salvar configurações</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Tab de Aparência */}
        <TabsContent value="aparencia" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Aparência</CardTitle>
              <CardDescription>
                Personalize o visual e o comportamento da interface
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="theme">Tema</Label>
                  <Select defaultValue="light">
                    <SelectTrigger id="theme">
                      <SelectValue placeholder="Selecione um tema" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Claro</SelectItem>
                      <SelectItem value="dark">Escuro</SelectItem>
                      <SelectItem value="system">Sistema (automático)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="language">Idioma</Label>
                  <Select defaultValue="pt-BR">
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Selecione um idioma" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                      <SelectItem value="en-US">English (US)</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timezone">Fuso Horário</Label>
                  <Select defaultValue="America/Sao_Paulo">
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Selecione um fuso horário" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/Sao_Paulo">São Paulo (GMT-3)</SelectItem>
                      <SelectItem value="America/New_York">New York (GMT-5)</SelectItem>
                      <SelectItem value="Europe/London">London (GMT+0)</SelectItem>
                      <SelectItem value="Europe/Paris">Paris (GMT+1)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="dense-mode" className="font-medium">Modo compacto</Label>
                    <p className="text-sm text-muted-foreground">Reduz o espaçamento para exibir mais conteúdo</p>
                  </div>
                  <Switch id="dense-mode" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="animations" className="font-medium">Animações</Label>
                    <p className="text-sm text-muted-foreground">Ativar animações da interface</p>
                  </div>
                  <Switch id="animations" defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSavePreferences}>Salvar preferências</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Tab de Integrações */}
        <TabsContent value="integracao" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Integrações</CardTitle>
              <CardDescription>
                Gerencie todas as integrações e conecte outros serviços
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between border p-4 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-blue-100 rounded-md flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Facebook</h4>
                      <p className="text-sm text-muted-foreground">Conecte suas páginas do Facebook</p>
                    </div>
                  </div>
                  <Button variant="outline">Conectar</Button>
                </div>

                <div className="flex items-center justify-between border p-4 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-blue-100 rounded-md flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Twitter</h4>
                      <p className="text-sm text-muted-foreground">Conecte sua conta do Twitter</p>
                    </div>
                  </div>
                  <Button variant="outline">Conectar</Button>
                </div>

                <div className="flex items-center justify-between border p-4 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-md flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Instagram</h4>
                      <p className="text-sm text-muted-foreground">Conecte sua conta do Instagram</p>
                    </div>
                  </div>
                  <Button variant="outline">Conectar</Button>
                </div>

                <div className="flex items-center justify-between border p-4 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-green-100 rounded-md flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                    </div>
                    <div>
                      <h4 className="font-medium">WhatsApp</h4>
                      <p className="text-sm text-muted-foreground">Conecte sua conta de negócios do WhatsApp</p>
                    </div>
                  </div>
                  <Button variant="outline">Conectar</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConfiguracoesPage;
