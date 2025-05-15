
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search, Filter, Plus } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import MessageTypeTag from "@/components/MessageTypeTag";
import ActionsMenu from "@/components/ActionsMenu";
import { toast } from "sonner";

// Define the message data type
interface MessageData {
  id: string;
  title: string;
  type: "boas-vindas" | "promocao" | "confirmacao" | "agradecimento" | "notificacao" | "instrucoes" | "personalizada";
  status: "ativo" | "inativo" | "recurring";
  scheduled: boolean;
  createdAt: string;
  channels: string[];
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
    channels: ["whatsapp", "email"]
  },
  {
    id: "2",
    title: "Promoção do Dia",
    type: "promocao",
    status: "ativo",
    scheduled: false,
    createdAt: "14 de maio de 2025, 15:07",
    channels: ["whatsapp", "sms", "email"]
  },
  {
    id: "3",
    title: "Confirmação de Compra",
    type: "confirmacao",
    status: "ativo",
    scheduled: false,
    createdAt: "14 de maio de 2025, 15:07",
    channels: ["email", "whatsapp"]
  },
  {
    id: "4",
    title: "Agradecimento",
    type: "agradecimento",
    status: "ativo",
    scheduled: false,
    createdAt: "14 de maio de 2025, 15:07",
    channels: ["email"]
  },
  {
    id: "5",
    title: "Lembrete de Produtos",
    type: "notificacao",
    status: "ativo",
    scheduled: false,
    createdAt: "14 de maio de 2025, 15:07",
    channels: ["whatsapp", "sms"]
  },
  {
    id: "6",
    title: "Instruções de Uso",
    type: "instrucoes",
    status: "ativo",
    scheduled: false,
    createdAt: "14 de maio de 2025, 15:07",
    channels: ["email"]
  },
  {
    id: "7",
    title: "Mensagem de Aniversário",
    type: "personalizada",
    status: "recurring",
    scheduled: true,
    createdAt: "14 de maio de 2025, 15:07",
    channels: ["email", "whatsapp"]
  },
  {
    id: "8",
    title: "Oferta Exclusiva de Eletrônicos",
    type: "promocao",
    status: "ativo",
    scheduled: false,
    createdAt: "14 de maio de 2025, 15:07",
    channels: ["email", "whatsapp", "sms"]
  },
  {
    id: "9",
    title: "Mensagem de Boas-vindas",
    type: "boas-vindas",
    status: "ativo",
    scheduled: false,
    createdAt: "14 de maio de 2025, 15:07", 
    channels: ["whatsapp"]
  },
  {
    id: "10",
    title: "Promoção do Dia",
    type: "promocao",
    status: "ativo",
    scheduled: false,
    createdAt: "14 de maio de 2025, 15:07",
    channels: ["email", "whatsapp"]
  }
];

const MessagesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [messages, setMessages] = useState<MessageData[]>(initialMessages);
  
  const handleNewMessage = () => {
    toast.success("Criando nova mensagem automatizada...");
    // This would open a form to create a new message
  };
  
  const handleEdit = (id: string) => {
    toast("Editando mensagem: " + id);
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
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Mensagens</h1>
          <p className="text-gray-400">Gerenciamento de mensagens automatizadas do bot</p>
        </div>
        <Button onClick={handleNewMessage} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Nova Mensagem
        </Button>
      </div>

      <div className="bg-gray-800 rounded-xl overflow-hidden">
        <div className="p-4 flex justify-between items-center border-b border-gray-700">
          <div className="relative w-80">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Buscar mensagens"
              className="pl-9 bg-gray-700 border-gray-600 focus:border-blue-500 focus:ring-blue-500 text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm" className="border-gray-600 text-gray-300">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-400 border-b border-gray-700">
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
                <tr key={message.id} className="border-b border-gray-700 hover:bg-gray-750">
                  <td className="px-4 py-3">{message.title}</td>
                  <td className="px-4 py-3">
                    <MessageTypeTag type={message.type} />
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={message.status} />
                  </td>
                  <td className="px-4 py-3 text-gray-400">
                    {message.scheduled ? 'Agendado' : 'Não agendado'}
                  </td>
                  <td className="px-4 py-3 text-gray-400">{message.createdAt}</td>
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
    </div>
  );
};

export default MessagesPage;
