
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search, Filter, Plus } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import MessageTypeTag from "@/components/MessageTypeTag";
import ActionsMenu from "@/components/ActionsMenu";
import { toast } from "sonner";
import SentimentAnalysis from "@/components/ai/SentimentAnalysis";
import AdvancedSentimentAnalysis from "@/components/ai/AdvancedSentimentAnalysis";
import ContentGenerator from "@/components/ai/ContentGenerator";
import ThemeSelector from "@/components/ThemeSelector";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CustomerServiceAutomation from "@/components/ai/CustomerServiceAutomation";

// Define the message data type
interface MessageData {
  id: string;
  title: string;
  type: "boas-vindas" | "promocao" | "confirmacao" | "agradecimento" | "notificacao" | "instrucoes" | "personalizada";
  status: "ativo" | "inativo" | "recurring";
  scheduled: boolean;
  createdAt: string;
  channels: string[];
  text?: string;
}

// Sample data
const initialMessages: MessageData[] = [
  {
    id: "1",
    title: "Mensagem de Boas-vindas",
    type: "boas-vindas",
    status: "ativo",
    scheduled: false,
    createdAt: "14 de maio de 2025, 15:07",
    channels: ["whatsapp", "email"],
    text: "Olá! Seja bem-vindo à nossa plataforma. Estamos muito felizes em ter você conosco!"
  },
  {
    id: "2",
    title: "Promoção do Dia",
    type: "promocao",
    status: "ativo",
    scheduled: false,
    createdAt: "14 de maio de 2025, 15:07",
    channels: ["whatsapp", "sms", "email"],
    text: "Aproveite nossa promoção especial! Todos os produtos com 30% de desconto hoje."
  },
  {
    id: "3",
    title: "Confirmação de Compra",
    type: "confirmacao",
    status: "ativo",
    scheduled: false,
    createdAt: "14 de maio de 2025, 15:07",
    channels: ["email", "whatsapp"],
    text: "Sua compra foi confirmada e está sendo processada. Obrigado pela preferência!"
  },
  {
    id: "4",
    title: "Agradecimento",
    type: "agradecimento",
    status: "ativo",
    scheduled: false,
    createdAt: "14 de maio de 2025, 15:07",
    channels: ["email"],
    text: "Agradecemos a sua compra! Esperamos que você aproveite o produto."
  },
  {
    id: "5",
    title: "Lembrete de Produtos",
    type: "notificacao",
    status: "ativo",
    scheduled: false,
    createdAt: "14 de maio de 2025, 15:07",
    channels: ["whatsapp", "sms"],
    text: "Lembre-se dos produtos em seu carrinho! Finalize sua compra hoje mesmo."
  },
  {
    id: "6",
    title: "Instruções de Uso",
    type: "instrucoes",
    status: "ativo",
    scheduled: false,
    createdAt: "14 de maio de 2025, 15:07",
    channels: ["email"],
    text: "Confira as instruções de uso do seu produto para aproveitar ao máximo."
  },
  {
    id: "7",
    title: "Mensagem de Aniversário",
    type: "personalizada",
    status: "recurring",
    scheduled: true,
    createdAt: "14 de maio de 2025, 15:07",
    channels: ["email", "whatsapp"],
    text: "Feliz aniversário! 🎉 Aproveite um desconto especial em sua próxima compra."
  },
  {
    id: "8",
    title: "Oferta Exclusiva de Eletrônicos",
    type: "promocao",
    status: "ativo",
    scheduled: false,
    createdAt: "14 de maio de 2025, 15:07",
    channels: ["email", "whatsapp", "sms"],
    text: "Oferta exclusiva! Eletrônicos com até 50% de desconto. Não perca!"
  },
  {
    id: "9",
    title: "Mensagem de Boas-vindas",
    type: "boas-vindas",
    status: "ativo",
    scheduled: false,
    createdAt: "14 de maio de 2025, 15:07", 
    channels: ["whatsapp"],
    text: "Bem-vindo! Estamos felizes por você se juntar à nossa comunidade."
  },
  {
    id: "10",
    title: "Promoção do Dia",
    type: "promocao",
    status: "ativo",
    scheduled: false,
    createdAt: "14 de maio de 2025, 15:07",
    channels: ["email", "whatsapp"],
    text: "Promoção imperdível! Produtos selecionados com preços incríveis."
  }
];

const MessagesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [messages, setMessages] = useState<MessageData[]>(initialMessages);
  const [selectedMessage, setSelectedMessage] = useState<MessageData | null>(null);
  const [activeTab, setActiveTab] = useState("messages");
  const [analysisMode, setAnalysisMode] = useState<"basic" | "advanced">("advanced");
  
  const handleNewMessage = () => {
    toast.success("Criando nova mensagem automatizada...");
    // This would open a form to create a new message
  };
  
  const handleEdit = (id: string) => {
    const message = messages.find(msg => msg.id === id);
    if (message) {
      setSelectedMessage(message);
      setActiveTab("analysis");
      toast("Analisando mensagem: " + message.title);
    }
    // This would open an edit form
  };
  
  const handleDuplicate = (id: string) => {
    toast.success("Mensagem duplicada com sucesso!");
    const messageToDuplicate = messages.find(msg => msg.id === id);
    if (messageToDuplicate) {
      const newMessage = {
        ...messageToDuplicate,
        id: Date.now().toString(),
        title: `${messageToDuplicate.title} (cópia)`,
      };
      setMessages([...messages, newMessage]);
    }
  };
  
  const handleDelete = (id: string) => {
    toast.success("Mensagem excluída com sucesso!");
    setMessages(messages.filter(message => message.id !== id));
  };
  
  const handleToggleActive = (id: string) => {
    setMessages(messages.map(message => {
      if (message.id === id) {
        const newStatus = message.status === "ativo" ? "inativo" : "ativo";
        toast.success(`Mensagem ${newStatus === "ativo" ? "ativada" : "desativada"} com sucesso!`);
        return { ...message, status: newStatus as "ativo" | "inativo" };
      }
      return message;
    }));
  };
  
  const handleContentSelected = (content: string, type: string) => {
    if (selectedMessage) {
      const updatedMessage = { ...selectedMessage, text: content };
      setSelectedMessage(updatedMessage);
      setMessages(prev => prev.map(msg => msg.id === selectedMessage.id ? updatedMessage : msg));
      toast.success(`Conteúdo de ${type} aplicado à mensagem!`);
    } else {
      toast.error("Selecione uma mensagem primeiro");
    }
  };
  
  const filteredMessages = messages.filter(message => 
    message.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Mensagens</h2>
          <p className="text-muted-foreground">
            Gerenciamento de mensagens automatizadas do bot
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <ThemeSelector />
          <Button onClick={handleNewMessage} className="transition-all flex items-center gap-2">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Nova Mensagem</span>
            <span className="sm:hidden">Adicionar</span>
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="messages">Mensagens</TabsTrigger>
          <TabsTrigger value="analysis" disabled={!selectedMessage}>Análise</TabsTrigger>
          <TabsTrigger value="generator">Gerador de Conteúdo</TabsTrigger>
          <TabsTrigger value="automation">Automação</TabsTrigger>
        </TabsList>
        
        <TabsContent value="messages" className="space-y-6">
          <div className="bg-card rounded-lg overflow-hidden border shadow-sm">
            <div className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-border gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar mensagens"
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs border-b border-border">
                    <th className="px-4 py-3 font-medium">Título</th>
                    <th className="px-4 py-3 font-medium">Tipo</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Agendamento</th>
                    <th className="px-4 py-3 font-medium">Criado em</th>
                    <th className="px-4 py-3 font-medium text-right">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMessages.map((message) => (
                    <tr key={message.id} className="border-b border-border hover:bg-muted/40">
                      <td className="px-4 py-3">{message.title}</td>
                      <td className="px-4 py-3">
                        <MessageTypeTag type={message.type} />
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={message.status} />
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {message.scheduled ? 'Agendado' : 'Não agendado'}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{message.createdAt}</td>
                      <td className="px-4 py-3 text-right">
                        <ActionsMenu 
                          onEdit={() => handleEdit(message.id)} 
                          onDuplicate={() => handleDuplicate(message.id)} 
                          onDelete={() => handleDelete(message.id)} 
                          onToggleActive={() => handleToggleActive(message.id)} 
                          isActive={message.status === "ativo"}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="analysis" className="space-y-6">
          {selectedMessage && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h3 className="text-xl font-semibold">Análise de Sentimento: {selectedMessage.title}</h3>
                <div className="flex items-center gap-3">
                  <div className="text-sm text-muted-foreground">Modo de análise:</div>
                  <div className="flex gap-1">
                    <Button 
                      size="sm" 
                      variant={analysisMode === "basic" ? "default" : "outline"}
                      onClick={() => setAnalysisMode("basic")}
                    >
                      Básico
                    </Button>
                    <Button 
                      size="sm" 
                      variant={analysisMode === "advanced" ? "default" : "outline"}
                      onClick={() => setAnalysisMode("advanced")}
                    >
                      Avançado
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-muted/40 border rounded-md">
                <h4 className="font-medium mb-2">Texto da Mensagem:</h4>
                <div className="p-3 bg-card rounded border">
                  {selectedMessage.text}
                </div>
              </div>
              
              {analysisMode === "basic" ? (
                <SentimentAnalysis text={selectedMessage.text || ""} />
              ) : (
                <AdvancedSentimentAnalysis text={selectedMessage.text || ""} />
              )}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="generator" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ContentGenerator 
                defaultProduct={selectedMessage ? { 
                  name: selectedMessage.title,
                  description: selectedMessage.text 
                } : undefined}
                onContentSelected={handleContentSelected}
              />
            </div>
            
            <div>
              <div className="bg-card border rounded-lg p-4 space-y-4">
                <h3 className="font-medium">Mensagem Atual</h3>
                {selectedMessage ? (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">{selectedMessage.title}</h4>
                    <div className="text-sm p-3 bg-muted/40 rounded border">
                      {selectedMessage.text || "Sem conteúdo"}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedMessage.channels.map((channel, i) => (
                        <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                          {channel}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    <p className="mb-2">Nenhuma mensagem selecionada</p>
                    <Button variant="outline" size="sm" onClick={() => setActiveTab("messages")}>
                      Selecionar mensagem
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="automation" className="space-y-6">
          <CustomerServiceAutomation />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MessagesPage;
