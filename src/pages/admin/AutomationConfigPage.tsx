
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Plus, 
  Trash2, 
  MessageCircle, 
  Mail, 
  Phone, 
  Instagram, 
  Facebook, 
  Calendar,
  Bot,
  FileText,
  Clock
} from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

const AutomationConfigPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("messaging");
  
  // Estados para os diferentes tipos de automação
  const [postAutomations, setPostAutomations] = useState([
    {
      id: 1,
      channelId: 1,
      platform: "Instagram",
      frequency: "daily",
      templates: ["Template 1", "Template 3"],
      enabled: true
    },
    {
      id: 2,
      channelId: 2,
      platform: "Facebook",
      frequency: "weekly",
      templates: ["Template 2"],
      enabled: false
    }
  ]);

  const [autoResponses, setAutoResponses] = useState([
    {
      id: 1,
      channelId: 1,
      triggers: ["olá", "oi", "bom dia"],
      responses: ["Olá! Como posso ajudar?"],
      enabled: true
    },
    {
      id: 2,
      channelId: 1,
      triggers: ["preço", "valor", "quanto custa"],
      responses: ["Temos opções a partir de R$50. Gostaria de conhecer nossos planos?"],
      enabled: true
    }
  ]);

  // Função para adicionar nova automação de postagem
  const addPostAutomation = () => {
    const newAutomation = {
      id: postAutomations.length + 1,
      channelId: 1,
      platform: "Instagram",
      frequency: "daily",
      templates: [],
      enabled: false
    };
    
    setPostAutomations([...postAutomations, newAutomation]);
  };

  // Função para remover automação de postagem
  const removePostAutomation = (id: number) => {
    setPostAutomations(postAutomations.filter(item => item.id !== id));
  };

  // Função para adicionar nova automação de resposta
  const addAutoResponse = () => {
    const newResponse = {
      id: autoResponses.length + 1,
      channelId: 1,
      triggers: [],
      responses: [],
      enabled: false
    };
    
    setAutoResponses([...autoResponses, newResponse]);
  };

  // Função para remover automação de resposta
  const removeAutoResponse = (id: number) => {
    setAutoResponses(autoResponses.filter(item => item.id !== id));
  };

  // Função para alternar status de ativação
  const toggleEnabled = (type: 'post' | 'response', id: number) => {
    if (type === 'post') {
      setPostAutomations(postAutomations.map(item => 
        item.id === id ? { ...item, enabled: !item.enabled } : item
      ));
    } else {
      setAutoResponses(autoResponses.map(item => 
        item.id === id ? { ...item, enabled: !item.enabled } : item
      ));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Configuração de Automação</h2>
        <p className="text-muted-foreground">
          Configure automações de comunicação para múltiplos canais
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="messaging" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            Mensagens
          </TabsTrigger>
          <TabsTrigger value="social" className="flex items-center gap-2">
            <Instagram className="h-4 w-4" />
            Redes Sociais
          </TabsTrigger>
          <TabsTrigger value="scheduler" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Agendamento
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Templates
          </TabsTrigger>
        </TabsList>

        <TabsContent value="messaging" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Respostas Automáticas</CardTitle>
              <CardDescription>Configure mensagens automáticas com base em palavras-chave</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Button onClick={addAutoResponse} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Nova Resposta Automática
                </Button>
              </div>

              <div className="space-y-6">
                {autoResponses.map(response => (
                  <Card key={response.id} className="bg-gray-800 border-gray-700">
                    <CardHeader className="flex flex-row items-center justify-between py-3">
                      <CardTitle className="text-md flex items-center gap-2">
                        <MessageCircle className="h-4 w-4 text-green-400" />
                        Resposta Automática #{response.id}
                      </CardTitle>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id={`response-switch-${response.id}`} 
                            checked={response.enabled}
                            onCheckedChange={() => toggleEnabled('response', response.id)}
                          />
                          <Label htmlFor={`response-switch-${response.id}`}>
                            {response.enabled ? 'Ativo' : 'Inativo'}
                          </Label>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => removeAutoResponse(response.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Canal</Label>
                        <Select defaultValue="1">
                          <SelectTrigger>
                            <SelectValue placeholder="Selecionar canal" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">WhatsApp Business</SelectItem>
                            <SelectItem value="2">Telegram Bot</SelectItem>
                            <SelectItem value="3">SMS Broadcast</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Palavras-chave de gatilho (separadas por vírgula)</Label>
                        <Input 
                          defaultValue={response.triggers.join(", ")} 
                          placeholder="Ex: olá, bom dia, atendimento"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Resposta Automática</Label>
                        <Input 
                          defaultValue={response.responses.join(" ")} 
                          placeholder="Mensagem de resposta automática"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Automação de Postagens</CardTitle>
              <CardDescription>Configure postagens automáticas para redes sociais</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Button onClick={addPostAutomation} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Nova Automação de Postagem
                </Button>
              </div>

              <div className="space-y-6">
                {postAutomations.map(automation => (
                  <Card key={automation.id} className="bg-gray-800 border-gray-700">
                    <CardHeader className="flex flex-row items-center justify-between py-3">
                      <CardTitle className="text-md flex items-center gap-2">
                        {automation.platform === "Instagram" ? (
                          <Instagram className="h-4 w-4 text-pink-400" />
                        ) : (
                          <Facebook className="h-4 w-4 text-blue-400" />
                        )}
                        Automação {automation.platform}
                      </CardTitle>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id={`post-switch-${automation.id}`} 
                            checked={automation.enabled}
                            onCheckedChange={() => toggleEnabled('post', automation.id)}
                          />
                          <Label htmlFor={`post-switch-${automation.id}`}>
                            {automation.enabled ? 'Ativo' : 'Inativo'}
                          </Label>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => removePostAutomation(automation.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Plataforma</Label>
                          <Select defaultValue={automation.platform.toLowerCase()}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecionar plataforma" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="instagram">Instagram</SelectItem>
                              <SelectItem value="facebook">Facebook</SelectItem>
                              <SelectItem value="tiktok">TikTok</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Frequência</Label>
                          <Select defaultValue={automation.frequency}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecionar frequência" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="daily">Diária</SelectItem>
                              <SelectItem value="weekly">Semanal</SelectItem>
                              <SelectItem value="custom">Personalizada</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Templates Selecionados</Label>
                        <Select defaultValue={automation.templates.length > 0 ? "template-1" : undefined}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecionar template" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="template-1">Template 1</SelectItem>
                            <SelectItem value="template-2">Template 2</SelectItem>
                            <SelectItem value="template-3">Template 3</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {automation.templates.length > 0 && (
                        <div className="pt-2">
                          <Label className="mb-2 block">Templates Adicionados</Label>
                          <div className="flex flex-wrap gap-2">
                            {automation.templates.map((template, index) => (
                              <div key={index} className="bg-gray-700 text-sm rounded px-2 py-1 flex items-center gap-1">
                                {template}
                                <Button variant="ghost" size="icon" className="h-4 w-4 p-0 hover:bg-transparent">
                                  <Trash2 className="h-3 w-3 text-red-400" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduler" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Automação de Agendamentos</CardTitle>
              <CardDescription>Configure lembretes e confirmações automáticas</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Canal</TableHead>
                    <TableHead>Antecedência</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-400" />
                      Lembrete de Consulta
                    </TableCell>
                    <TableCell>WhatsApp</TableCell>
                    <TableCell>24 horas</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Switch id="schedule-1" defaultChecked />
                        <Label htmlFor="schedule-1">Ativo</Label>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">Editar</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-green-400" />
                      Confirmação de Agendamento
                    </TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Imediato</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Switch id="schedule-2" defaultChecked />
                        <Label htmlFor="schedule-2">Ativo</Label>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">Editar</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="flex items-center gap-2">
                      <Bot className="h-4 w-4 text-amber-400" />
                      Follow-up Pós Atendimento
                    </TableCell>
                    <TableCell>SMS</TableCell>
                    <TableCell>2 dias depois</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Switch id="schedule-3" />
                        <Label htmlFor="schedule-3">Inativo</Label>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">Editar</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Button className="mt-4 flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Nova Automação de Agendamento
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Templates de Comunicação</CardTitle>
              <CardDescription>Gerencie templates para comunicação multicanal</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-md flex items-center gap-2">
                      <MessageCircle className="h-4 w-4 text-green-400" />
                      Boas-vindas WhatsApp
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-300">Olá {"{{nome}}"}, seja bem-vindo(a)! Como posso ajudar?</p>
                    <Button variant="ghost" size="sm" className="mt-2">Editar</Button>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-md flex items-center gap-2">
                      <Mail className="h-4 w-4 text-blue-400" />
                      Confirmação de Agendamento
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-300">Olá {"{{nome}}"}, sua consulta foi agendada para {"{{data}}"} às {"{{hora}}"}.</p>
                    <Button variant="ghost" size="sm" className="mt-2">Editar</Button>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-md flex items-center gap-2">
                      <Instagram className="h-4 w-4 text-pink-400" />
                      Post Promocional
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-300">✨ PROMOÇÃO! ✨ Aproveite nosso desconto especial de {"{{desconto}}"} em todos os serviços!</p>
                    <Button variant="ghost" size="sm" className="mt-2">Editar</Button>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700 border-dashed flex flex-col items-center justify-center h-[150px] cursor-pointer hover:bg-gray-800/70 transition-colors">
                  <Plus className="h-6 w-6 text-gray-500 mb-2" />
                  <p className="text-sm text-gray-500">Novo Template</p>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AutomationConfigPage;
