
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const GerenciamentoEventos: React.FC = () => {
  const [activeTab, setActiveTab] = useState("calendario");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // Lista de eventos
  const eventos = [
    {
      id: "1",
      nome: "Casamento Silva",
      data: "2025-05-28",
      horario: "18:00",
      local: "Espaço Jardim das Flores",
      tipo: "Casamento",
      status: "confirmado",
      convidados: 150
    },
    {
      id: "2",
      nome: "Aniversário 15 Anos - Maria",
      data: "2025-06-12",
      horario: "20:00",
      local: "Buffet Estrela",
      tipo: "Aniversário",
      status: "pendente",
      convidados: 80
    },
    {
      id: "3",
      nome: "Formatura Turma 2025",
      data: "2025-07-03",
      horario: "19:30",
      local: "Centro de Convenções",
      tipo: "Formatura",
      status: "confirmado",
      convidados: 200
    }
  ];
  
  // Lista de fornecedores
  const fornecedores = [
    {
      id: "1",
      nome: "Buffet Delícias Gourmet",
      tipo: "Alimentação",
      contato: "(11) 98765-4321",
      avaliacao: 4.8
    },
    {
      id: "2",
      nome: "Flores & Decorações",
      tipo: "Decoração",
      contato: "(11) 91234-5678",
      avaliacao: 4.9
    },
    {
      id: "3",
      nome: "DJ Marcos Silva",
      tipo: "Música",
      contato: "(11) 99876-5432",
      avaliacao: 4.7
    },
    {
      id: "4",
      nome: "Fotos Perfeitas",
      tipo: "Fotografia",
      contato: "(11) 92345-6789",
      avaliacao: 4.5
    }
  ];
  
  // Tarefas pendentes
  const tarefas = [
    {
      id: "1",
      titulo: "Confirmar menu com buffet",
      evento: "Casamento Silva",
      prazo: "2025-05-10",
      prioridade: "alta"
    },
    {
      id: "2",
      titulo: "Enviar convites digitais",
      evento: "Aniversário 15 Anos - Maria",
      prazo: "2025-05-20",
      prioridade: "média"
    },
    {
      id: "3",
      titulo: "Definir lista de músicas",
      evento: "Casamento Silva",
      prazo: "2025-05-15",
      prioridade: "baixa"
    },
    {
      id: "4",
      titulo: "Prova final do vestido",
      evento: "Aniversário 15 Anos - Maria",
      prazo: "2025-05-25",
      prioridade: "alta"
    }
  ];
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmado":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "pendente":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "cancelado":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };
  
  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case "alta":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "média":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "baixa":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };
  
  // Eventos para a data selecionada
  const eventosDoDia = selectedDate 
    ? eventos.filter(evento => evento.data === format(selectedDate, 'yyyy-MM-dd'))
    : [];

  return (
    <Card className="w-full">
      <CardHeader className="bg-purple-50 dark:bg-purple-900/20 border-b">
        <CardTitle className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 text-purple-500"
          >
            <path d="M3 2v7c0 1.1.9 2 2 2h16a2 2 0 0 0 2-2V2"></path>
            <path d="M7 2v7"></path>
            <path d="M17 2v7"></path>
            <path d="M12 12v3"></path>
            <path d="M17 17a5 5 0 0 0-10 0"></path>
            <path d="M19 21a7 7 0 1 0-14 0"></path>
          </svg>
          Gerenciamento de Eventos
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="calendario">Calendário</TabsTrigger>
            <TabsTrigger value="fornecedores">Fornecedores</TabsTrigger>
            <TabsTrigger value="tarefas">Tarefas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="calendario">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <h3 className="text-lg font-medium">Agenda de Eventos</h3>
                </div>
                <div className="border rounded-md p-4">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    locale={ptBR}
                    className="mx-auto"
                  />
                </div>
                <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>
                  Novo Evento
                </Button>
              </div>
              
              <div>
                <div className="mb-4 flex justify-between items-center">
                  <h3 className="text-lg font-medium">
                    {selectedDate ? format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : "Selecione uma data"}
                  </h3>
                </div>
                
                {eventosDoDia.length > 0 ? (
                  <div className="space-y-4">
                    {eventosDoDia.map((evento) => (
                      <Card key={evento.id} className="border">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium">{evento.nome}</h4>
                            <Badge className={getStatusColor(evento.status)}>
                              {evento.status.charAt(0).toUpperCase() + evento.status.slice(1)}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
                            <div className="flex items-center gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z"></path><path d="M12 6v6l4 2"></path></svg>
                              <span>{evento.horario}</span>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path><path d="M2 12h20"></path></svg>
                              <span>{evento.tipo}</span>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500"><path d="m21 10-8-6-8 6v8h16v-8Z"></path><path d="M10 21v-5a2 2 0 1 1 4 0v5"></path></svg>
                              <span>{evento.local}</span>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                              <span>{evento.convidados} convidados</span>
                            </div>
                          </div>
                          
                          <div className="flex gap-2 mt-4">
                            <Button size="sm" variant="outline" className="flex-1">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 h-4 w-4"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                              Editar
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 h-4 w-4"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"></path><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"></path></svg>
                              Mensagem
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="border rounded-md p-8 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 h-12 w-12 text-gray-400"><path d="M12 8a2.83 2.83 0 0 0-4 4 2.83 2.83 0 0 0 4 4 2.83 2.83 0 0 0 4-4 2.83 2.83 0 0 0-4-4M12 8V3m0 13v3m9-9h-3m-13 0H2"></path></svg>
                    <h4 className="text-lg font-medium mb-2">Nenhum evento para esta data</h4>
                    <p className="text-gray-500 mb-4">Selecione outra data ou crie um novo evento</p>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>
                      Criar Evento
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="fornecedores">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Lista de Fornecedores</h3>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>
                  Novo Fornecedor
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fornecedores.map((fornecedor) => (
                  <Card key={fornecedor.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{fornecedor.nome}</h4>
                        <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                          {fornecedor.tipo}
                        </Badge>
                      </div>
                      
                      <div className="mt-2 flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i}
                            xmlns="http://www.w3.org/2000/svg" 
                            width="16" 
                            height="16" 
                            viewBox="0 0 24 24" 
                            fill={i < Math.floor(fornecedor.avaliacao) ? "currentColor" : "none"}
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            className={i < Math.floor(fornecedor.avaliacao) ? "text-yellow-500" : "text-gray-300"}
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                          </svg>
                        ))}
                        <span className="ml-2 text-sm text-gray-600">{fornecedor.avaliacao.toFixed(1)}</span>
                      </div>
                      
                      <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                        <span>{fornecedor.contato}</span>
                      </div>
                      
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline" className="flex-1">
                          Ver Detalhes
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 h-4 w-4"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                          Contato
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="space-y-4 mt-8 border-t pt-6">
                <h3 className="text-lg font-medium">Adicionar Fornecedor</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fornecedor-nome">Nome da Empresa</Label>
                    <Input id="fornecedor-nome" placeholder="Digite o nome do fornecedor" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="fornecedor-tipo">Categoria</Label>
                    <Select>
                      <SelectTrigger id="fornecedor-tipo">
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="alimentacao">Alimentação</SelectItem>
                        <SelectItem value="decoracao">Decoração</SelectItem>
                        <SelectItem value="musica">Música</SelectItem>
                        <SelectItem value="fotografia">Fotografia</SelectItem>
                        <SelectItem value="outros">Outros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fornecedor-contato">Telefone de Contato</Label>
                    <Input id="fornecedor-contato" placeholder="(00) 00000-0000" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="fornecedor-email">E-mail</Label>
                    <Input id="fornecedor-email" type="email" placeholder="email@exemplo.com" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="fornecedor-notas">Observações</Label>
                  <Textarea id="fornecedor-notas" placeholder="Detalhes adicionais sobre o fornecedor..." />
                </div>
                
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Salvar Fornecedor
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="tarefas">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Tarefas Pendentes</h3>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>
                  Nova Tarefa
                </Button>
              </div>
              
              <div className="space-y-3">
                {tarefas.map((tarefa) => (
                  <div key={tarefa.id} className="flex items-start gap-3 border rounded-md p-3">
                    <input type="checkbox" className="mt-1 rounded" />
                    
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <h4 className="font-medium">{tarefa.titulo}</h4>
                        <Badge className={getPrioridadeColor(tarefa.prioridade)}>
                          {tarefa.prioridade.charAt(0).toUpperCase() + tarefa.prioridade.slice(1)}
                        </Badge>
                      </div>
                      
                      <div className="text-sm text-gray-500 mt-1">
                        <span>Evento: {tarefa.evento}</span>
                        <span className="inline-block mx-2">•</span>
                        <span>Prazo: {format(new Date(tarefa.prazo), "dd/MM/yyyy")}</span>
                      </div>
                    </div>
                    
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="space-y-4 mt-8 border-t pt-6">
                <h3 className="text-lg font-medium">Adicionar Tarefa</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="tarefa-titulo">Título da Tarefa</Label>
                  <Input id="tarefa-titulo" placeholder="Digite o título da tarefa" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tarefa-evento">Evento Relacionado</Label>
                    <Select>
                      <SelectTrigger id="tarefa-evento">
                        <SelectValue placeholder="Selecione um evento" />
                      </SelectTrigger>
                      <SelectContent>
                        {eventos.map((evento) => (
                          <SelectItem key={evento.id} value={evento.id}>{evento.nome}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="tarefa-prioridade">Prioridade</Label>
                    <Select defaultValue="media">
                      <SelectTrigger id="tarefa-prioridade">
                        <SelectValue placeholder="Selecione a prioridade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="baixa">Baixa</SelectItem>
                        <SelectItem value="media">Média</SelectItem>
                        <SelectItem value="alta">Alta</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tarefa-prazo">Data Limite</Label>
                    <Input id="tarefa-prazo" type="date" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="tarefa-responsavel">Responsável</Label>
                    <Select defaultValue="eu">
                      <SelectTrigger id="tarefa-responsavel">
                        <SelectValue placeholder="Selecione o responsável" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="eu">Eu mesmo</SelectItem>
                        <SelectItem value="assistente">Assistente</SelectItem>
                        <SelectItem value="equipe">Equipe</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tarefa-descricao">Descrição</Label>
                  <Textarea id="tarefa-descricao" placeholder="Detalhes adicionais sobre a tarefa..." />
                </div>
                
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Salvar Tarefa
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default GerenciamentoEventos;
