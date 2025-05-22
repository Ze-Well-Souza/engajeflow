import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { CheckCircle, Settings, Users, MessageSquare, Bell, Calendar } from "lucide-react";

interface GerenciamentoDemoProps {
  segment?: string;
}

const GerenciamentoDemo: React.FC<GerenciamentoDemo> = ({ segment = "default" }) => {
  const [activeTab, setActiveTab] = useState("clientes");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState<number | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
  const [messageText, setMessageText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Dados específicos por segmento
  const segmentData: Record<string, {
    title: string;
    clientLabel: string;
    messageTypes: string[];
    color: string;
    automationTypes: string[];
  }> = {
    beauty: {
      title: "Gerenciamento para Beleza e Estética",
      clientLabel: "Clientes",
      messageTypes: ["Confirmação", "Lembrete", "Aniversário", "Promoção", "Reagendamento"],
      color: "text-pink-500",
      automationTypes: ["Lembrete de agendamento", "Confirmação de horário", "Aniversário", "Cliente inativo", "Avaliação pós-atendimento"]
    },
    food: {
      title: "Gerenciamento para Alimentação",
      clientLabel: "Clientes",
      messageTypes: ["Confirmação", "Promoção", "Cardápio do Dia", "Evento", "Feedback"],
      color: "text-orange-500",
      automationTypes: ["Confirmação de reserva", "Promoção do dia", "Cliente inativo", "Aniversário", "Avaliação pós-atendimento"]
    },
    freelancer: {
      title: "Gerenciamento para Serviços Domésticos",
      clientLabel: "Clientes",
      messageTypes: ["Orçamento", "Confirmação", "Lembrete", "Promoção", "Feedback"],
      color: "text-blue-500",
      automationTypes: ["Lembrete de agendamento", "Confirmação de serviço", "Cliente inativo", "Promoção sazonal", "Avaliação pós-serviço"]
    },
    "content-creator": {
      title: "Gerenciamento para Eventos",
      clientLabel: "Clientes",
      messageTypes: ["Orçamento", "Confirmação", "Lembrete", "Evento", "Feedback"],
      color: "text-purple-500",
      automationTypes: ["Lembrete de evento", "Confirmação de contrato", "Cliente inativo", "Promoção sazonal", "Avaliação pós-evento"]
    },
    education: {
      title: "Gerenciamento para Educação",
      clientLabel: "Alunos",
      messageTypes: ["Material de Aula", "Lembrete", "Avaliação", "Evento", "Feedback"],
      color: "text-green-500",
      automationTypes: ["Lembrete de aula", "Envio de material", "Aluno inativo", "Avaliação pendente", "Feedback de curso"]
    },
    ecommerce: {
      title: "Gerenciamento para E-commerce",
      clientLabel: "Clientes",
      messageTypes: ["Pedido", "Envio", "Promoção", "Lançamento", "Feedback"],
      color: "text-yellow-500",
      automationTypes: ["Confirmação de pedido", "Atualização de envio", "Carrinho abandonado", "Cliente inativo", "Avaliação pós-compra"]
    },
    hr: {
      title: "Gerenciamento para RH",
      clientLabel: "Candidatos",
      messageTypes: ["Vaga", "Entrevista", "Feedback", "Onboarding", "Documentação"],
      color: "text-indigo-500",
      automationTypes: ["Confirmação de candidatura", "Lembrete de entrevista", "Feedback de processo", "Documentação pendente", "Onboarding"]
    },
    accounting: {
      title: "Gerenciamento para Contabilidade/Advocacia",
      clientLabel: "Clientes",
      messageTypes: ["Documentação", "Prazo", "Reunião", "Atualização", "Feedback"],
      color: "text-gray-500",
      automationTypes: ["Lembrete de prazo", "Documentação pendente", "Confirmação de reunião", "Atualização legal", "Feedback de serviço"]
    },
    default: {
      title: "Gerenciamento de Conteúdo",
      clientLabel: "Clientes",
      messageTypes: ["Informativo", "Lembrete", "Confirmação", "Promoção", "Feedback"],
      color: "text-primary",
      automationTypes: ["Lembrete automático", "Confirmação de serviço", "Cliente inativo", "Aniversário", "Avaliação de serviço"]
    }
  };

  // Obter dados do segmento atual ou usar padrão
  const data = segment && segmentData[segment] ? segmentData[segment] : segmentData.default;

  // Clientes simulados
  const clients = [
    { id: 1, name: "Ana Silva", email: "ana.silva@email.com", phone: "(11) 98765-4321", lastVisit: "15/05/2025", status: "Ativo" },
    { id: 2, name: "Carlos Oliveira", email: "carlos.oliveira@email.com", phone: "(11) 91234-5678", lastVisit: "10/05/2025", status: "Ativo" },
    { id: 3, name: "Mariana Santos", email: "mariana.santos@email.com", phone: "(11) 99876-5432", lastVisit: "05/05/2025", status: "Inativo" },
    { id: 4, name: "Roberto Alves", email: "roberto.alves@email.com", phone: "(11) 92345-6789", lastVisit: "01/05/2025", status: "Ativo" },
    { id: 5, name: "Juliana Lima", email: "juliana.lima@email.com", phone: "(11) 93456-7890", lastVisit: "25/04/2025", status: "Inativo" }
  ];

  // Mensagens simuladas
  const messages = [
    { id: 1, client: "Ana Silva", type: "Lembrete", date: "23/05/2025", status: "Agendada", content: "Olá Ana, não esqueça do seu agendamento amanhã às 14h. Confirme sua presença respondendo esta mensagem." },
    { id: 2, client: "Carlos Oliveira", type: "Confirmação", date: "22/05/2025", status: "Enviada", content: "Olá Carlos, seu agendamento para hoje às 10h foi confirmado. Agradecemos a preferência." },
    { id: 3, client: "Mariana Santos", type: "Promoção", date: "21/05/2025", status: "Enviada", content: "Olá Mariana, temos uma promoção especial para você! 20% de desconto no próximo agendamento." },
    { id: 4, client: "Roberto Alves", type: "Feedback", date: "20/05/2025", status: "Enviada", content: "Olá Roberto, como foi sua experiência conosco? Ficaríamos felizes em receber seu feedback." },
    { id: 5, client: "Juliana Lima", type: "Aniversário", date: "25/05/2025", status: "Agendada", content: "Olá Juliana, feliz aniversário! Temos um presente especial para você em sua próxima visita." }
  ];

  // Automações simuladas
  const automations = [
    { id: 1, name: "Lembrete de agendamento", status: true, trigger: "24h antes", message: "Olá {nome}, não esqueça do seu agendamento amanhã às {horario}. Confirme sua presença respondendo esta mensagem." },
    { id: 2, name: "Confirmação de horário", status: true, trigger: "Imediato", message: "Olá {nome}, seu agendamento para {data} às {horario} foi confirmado. Agradecemos a preferência." },
    { id: 3, name: "Cliente inativo", status: false, trigger: "30 dias sem visita", message: "Olá {nome}, sentimos sua falta! Que tal agendar uma visita? Temos novidades para você." },
    { id: 4, name: "Aniversário", status: true, trigger: "Data de aniversário", message: "Olá {nome}, feliz aniversário! Temos um presente especial para você em sua próxima visita." },
    { id: 5, name: "Avaliação pós-atendimento", status: true, trigger: "24h após atendimento", message: "Olá {nome}, como foi sua experiência conosco? Ficaríamos felizes em receber seu feedback." }
  ];

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm)
  );

  const handleSendMessage = () => {
    if (messageText.trim() !== "" && selectedClient !== null) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setMessageText("");
        setSelectedClient(null);
      }, 3000);
    }
  };

  const toggleAutomation = (id: number) => {
    // Simulação de toggle de automação
    console.log(`Automação ${id} alterada`);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className={data.color}>{data.title}</CardTitle>
        <CardDescription>
          Gerencie clientes, mensagens e automações em um só lugar
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="clientes">{data.clientLabel}</TabsTrigger>
            <TabsTrigger value="mensagens">Mensagens</TabsTrigger>
            <TabsTrigger value="automacoes">Automações</TabsTrigger>
          </TabsList>
          
          <TabsContent value="clientes">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Input 
                  placeholder={`Buscar ${data.clientLabel.toLowerCase()}...`} 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
                <Button>
                  <Users className="mr-2 h-4 w-4" />
                  Adicionar {data.clientLabel.slice(0, -1)}
                </Button>
              </div>
              
              <div className="border rounded-md">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50 dark:bg-gray-800">
                      <th className="text-left p-2">Nome</th>
                      <th className="text-left p-2">Contato</th>
                      <th className="text-left p-2">Última Visita</th>
                      <th className="text-left p-2">Status</th>
                      <th className="text-left p-2">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredClients.map((client) => (
                      <tr key={client.id} className="border-b">
                        <td className="p-2">{client.name}</td>
                        <td className="p-2">
                          {client.email}<br />
                          {client.phone}
                        </td>
                        <td className="p-2">{client.lastVisit}</td>
                        <td className="p-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            client.status === "Ativo" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }`}>
                            {client.status}
                          </span>
                        </td>
                        <td className="p-2">
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedClient(client.id)}
                            >
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Settings className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {selectedClient && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Nova Mensagem</CardTitle>
                    <CardDescription>
                      Para: {clients.find(c => c.id === selectedClient)?.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="messageType">Tipo de Mensagem</Label>
                        <Select>
                          <SelectTrigger id="messageType">
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            {data.messageTypes.map((type) => (
                              <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="messageContent">Mensagem</Label>
                        <Textarea
                          id="messageContent"
                          value={messageText}
                          onChange={(e) => setMessageText(e.target.value)}
                          placeholder="Digite sua mensagem aqui..."
                          rows={4}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => setSelectedClient(null)}>
                      Cancelar
                    </Button>
                    <Button onClick={handleSendMessage} disabled={messageText.trim() === ""}>
                      {isSubmitted ? (
                        <>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Enviado!
                        </>
                      ) : (
                        "Enviar Mensagem"
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="mensagens">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Histórico de Mensagens</h3>
                <Button>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Nova Mensagem
                </Button>
              </div>
              
              <div className="border rounded-md">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50 dark:bg-gray-800">
                      <th className="text-left p-2">Cliente</th>
                      <th className="text-left p-2">Tipo</th>
                      <th className="text-left p-2">Data</th>
                      <th className="text-left p-2">Status</th>
                      <th className="text-left p-2">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {messages.map((message) => (
                      <tr key={message.id} className="border-b">
                        <td className="p-2">{message.client}</td>
                        <td className="p-2">{message.type}</td>
                        <td className="p-2">{message.date}</td>
                        <td className="p-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            message.status === "Enviada" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {message.status}
                          </span>
                        </td>
                        <td className="p-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedMessage(message.id)}
                          >
                            Ver
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {selectedMessage && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Detalhes da Mensagem</CardTitle>
                    <CardDescription>
                      {messages.find(m => m.id === selectedMessage)?.type} para {messages.find(m => m.id === selectedMessage)?.client}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Data: {messages.find(m => m.id === selectedMessage)?.date}</span>
                        <span className="text-gray-500">Status: {messages.find(m => m.id === selectedMessage)?.status}</span>
                      </div>
                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                        {messages.find(m => m.id === selectedMessage)?.content}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => setSelectedMessage(null)}>
                      Fechar
                    </Button>
                    <div className="flex gap-2">
                      <Button variant="outline">
                        <Calendar className="mr-2 h-4 w-4" />
                        Reagendar
                      </Button>
                      <Button>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Responder
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="automacoes">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Automações Configuradas</h3>
                <Button>
                  <Bell className="mr-2 h-4 w-4" />
                  Nova Automação
                </Button>
              </div>
              
              <div className="space-y-4">
                {automations.map((automation) => (
                  <Card key={automation.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{automation.name}</h4>
                          <p className="text-sm text-gray-500 mt-1">
                            Gatilho: {automation.trigger}
                          </p>
                          <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-md text-sm">
                            {automation.message}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch 
                            checked={automation.status} 
                            onCheckedChange={() => toggleAutomation(automation.id)} 
                          />
                          <span className="text-sm">
                            {automation.status ? "Ativo" : "Inativo"}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button variant="outline" size="sm">
                        <Settings className="mr-2 h-4 w-4" />
                        Configurar
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default GerenciamentoDemo;
