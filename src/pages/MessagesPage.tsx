import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search, Filter, Plus } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import MessageTypeTag from "@/components/MessageTypeTag";
import ActionsMenu from "@/components/ActionsMenu";
import { toast } from "sonner";
import SentimentAnalysis from "@/components/ai/SentimentAnalysis";
import ThemeSelector from "@/components/ThemeSelector";

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
  
  const handleNewMessage = () => {
    toast.success("Criando nova mensagem automatizada...");
    // This would open a form to create a new message
  };
  
  const handleEdit = (id: string) => {
    const message = messages.find(msg => msg.id === id);
    if (message) {
      setSelectedMessage(message);
      toast("Editando mensagem: " + id);
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
      
      {selectedMessage && selectedMessage.text && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Análise de Sentimento</h3>
          <SentimentAnalysis text={selectedMessage.text} />
        </div>
      )}
    </div>
  );
};

export default MessagesPage;
