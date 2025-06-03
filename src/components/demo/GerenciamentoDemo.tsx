
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import GerenciamentoContentCreator from "@/components/fluxos/GerenciamentoContentCreator";
import GerenciamentoEventos from "@/components/fluxos/GerenciamentoEventos";

interface GerenciamentoDemoProps {
  segment?: string;
  title?: string;
  clients?: { id: string; name: string; email: string; phone: string; interest?: string; lastContact?: string }[];
  messages?: { id: string; client: string; date: string; subject: string; preview: string }[];
  automations?: { id: string; name: string; description: string; status: boolean }[];
}

const GerenciamentoDemo: React.FC<GerenciamentoDemoProps> = ({
  segment = "beauty",
  title,
  clients,
  messages,
  automations
}) => {
  // Conteúdo personalizado por segmento
  if (segment === "content-creator") {
    return <GerenciamentoContentCreator />;
  }
  
  if (segment === "events") {
    return <GerenciamentoEventos />;
  }
  
  // Título dinâmico baseado na prop ou no segmento
  const pageTitle = title || (
    segment === "beauty" ? "Gerenciamento de Clientes de Beleza" :
    segment === "food" ? "Gerenciamento de Clientes de Alimentação" :
    segment === "freelancer" ? "Gerenciamento de Clientes de Serviços" :
    segment === "education" ? "Gerenciamento de Alunos" :
    segment === "ecommerce" ? "Gerenciamento de Clientes de E-commerce" :
    segment === "hr" ? "Gerenciamento de Candidatos" :
    segment === "accounting" ? "Gerenciamento de Clientes Contábeis" :
    segment === "realestate" ? "Gerenciamento de Clientes Imobiliários" :
    "Gerenciamento de Clientes"
  );

  // Clientes padrão
  const defaultClients = clients || [
    { 
      id: "1", 
      name: "Maria Silva", 
      email: "maria.silva@email.com", 
      phone: "(11) 98765-4321",
      interest: "Cortes e coloração",
      lastContact: "18/05/2025"
    },
    { 
      id: "2", 
      name: "João Santos", 
      email: "joao.santos@email.com", 
      phone: "(11) 91234-5678",
      interest: "Barba e corte masculino",
      lastContact: "20/05/2025"
    },
    { 
      id: "3", 
      name: "Ana Oliveira", 
      email: "ana.oliveira@email.com", 
      phone: "(11) 99876-5432",
      interest: "Tratamentos capilares",
      lastContact: "15/05/2025"
    },
    { 
      id: "4", 
      name: "Carlos Pereira", 
      email: "carlos.pereira@email.com", 
      phone: "(11) 92345-6789",
      interest: "Manicure e pedicure",
      lastContact: "21/05/2025"
    }
  ];

  // Mensagens padrão
  const defaultMessages = messages || [
    {
      id: "1",
      client: "Maria Silva",
      date: "18/05/2025",
      subject: "Confirmação de Horário",
      preview: "Olá Maria, confirmamos seu horário para amanhã às 14h para o serviço de corte e coloração..."
    },
    {
      id: "2",
      client: "João Santos",
      date: "20/05/2025",
      subject: "Promoção de Corte Masculino",
      preview: "João, temos uma promoção especial de corte masculino e barba que pode te interessar..."
    },
    {
      id: "3",
      client: "Ana Oliveira",
      date: "15/05/2025",
      subject: "Dicas de Cuidados Pós-tratamento",
      preview: "Ana, segue algumas dicas para manter o resultado do seu tratamento capilar por mais tempo..."
    }
  ];

  // Automações padrão
  const defaultAutomations = automations || [
    {
      id: "1",
      name: "Lembrete de agendamento",
      description: "Envia lembrete 24h antes do horário marcado",
      status: true
    },
    {
      id: "2",
      name: "Mensagem pós-atendimento",
      description: "Envia mensagem 2 dias após o atendimento solicitando feedback",
      status: true
    },
    {
      id: "3",
      name: "Aniversário do cliente",
      description: "Envia mensagem de felicitações e cupom de desconto",
      status: false
    },
    {
      id: "4",
      name: "Cliente inativo",
      description: "Envia promoção para clientes sem visitas há mais de 60 dias",
      status: true
    }
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{pageTitle}</CardTitle>
        <CardDescription>
          Gerencie seus clientes, mensagens e automações
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="clients" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="clients">Clientes</TabsTrigger>
            <TabsTrigger value="messages">Mensagens</TabsTrigger>
            <TabsTrigger value="automations">Automações</TabsTrigger>
          </TabsList>
          
          <TabsContent value="clients" className="space-y-4 mt-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Lista de Clientes</h3>
              <Button size="sm">Novo Cliente</Button>
            </div>
            
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
              <input 
                type="text"
                placeholder="Buscar cliente..." 
                className="pl-9 pr-4 py-2 w-full border rounded-md mb-4"
              />
            </div>
            
            {defaultClients.map((client) => (
              <div key={client.id} className="border rounded-md p-4">
                <div className="flex justify-between">
                  <h4 className="font-medium">{client.name}</h4>
                  <Button variant="ghost" size="sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 text-sm">
                  <div className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mt-0.5 text-gray-500"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    <span>{client.phone}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mt-0.5 text-gray-500"><path d="M22 18.2V5.8a2 2 0 0 0-1.49-1.94L11.75 2.05a2 2 0 0 0-1.5 0L1.49 3.86A2 2 0 0 0 0 5.8v12.4a2 2 0 0 0 1.49 1.94L10.25 22a2 2 0 0 0 1.5 0l8.76-1.81A2 2 0 0 0 22 18.2z"></path><path d="M8 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"></path><path d="M14 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"></path><path d="M21 5.8v12.4"></path></svg>
                    <span>{client.email}</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-700 dark:text-gray-300">Interesse: {client.interest}</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Último contato: {client.lastContact}</span>
                  </div>
                  <div className="flex justify-between items-center gap-2 mt-3">
                    <Button variant="outline" size="sm" className="flex-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 h-4 w-4"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"></path><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"></path></svg>
                      Mensagem
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 h-4 w-4"><rect width="18" height="18" x="3" y="3" rx="2"></rect><path d="M3 9h18"></path><path d="M9 21V9"></path></svg>
                      Agendar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="messages" className="space-y-4 mt-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Mensagens Recentes</h3>
              <Button size="sm">Nova Mensagem</Button>
            </div>
            
            {defaultMessages.map((message) => (
              <div key={message.id} className="border rounded-md p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{message.subject}</h4>
                    <p className="text-sm text-gray-500 mt-1">Para: {message.client}</p>
                  </div>
                  <Badge>{message.date}</Badge>
                </div>
                
                <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-md text-sm">
                  {message.preview}
                </div>
                
                <div className="mt-3 flex justify-end gap-2">
                  <Button variant="outline" size="sm">Responder</Button>
                  <Button variant="outline" size="sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" x2="12" y1="15" y2="3"></line></svg>
                  </Button>
                </div>
              </div>
            ))}
            
            <Button variant="outline" className="w-full mt-4">Mostrar Mais</Button>
          </TabsContent>
          
          <TabsContent value="automations" className="space-y-4 mt-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Automações Configuradas</h3>
              <Button size="sm">Nova Automação</Button>
            </div>
            
            {defaultAutomations.map((automation) => (
              <div key={automation.id} className="border rounded-md p-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${automation.status ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <h4 className="font-medium">{automation.name}</h4>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={automation.status} readOnly />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <p className="text-sm text-gray-500 mt-2">
                  {automation.description}
                </p>
                
                <div className="mt-4 flex justify-end">
                  <Button variant="outline" size="sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 h-4 w-4"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                    Editar
                  </Button>
                </div>
              </div>
            ))}
            
            <div className="mt-6 p-4 border border-dashed rounded-md text-center">
              <h4 className="font-medium mb-2">Sugestão de Automação</h4>
              <p className="text-sm text-gray-500 mb-4">
                Relembrar clientes sem visita há mais de 30 dias com uma oferta especial
              </p>
              <Button variant="outline" size="sm">Adicionar Automação</Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default GerenciamentoDemo;
