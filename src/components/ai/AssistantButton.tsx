
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bot, X } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const AssistantButton: React.FC = () => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [assistantMessages, setAssistantMessages] = useState<{role: string, content: string}[]>([
    { role: "assistant", content: "Olá! Sou seu assistente virtual. Como posso ajudar você hoje?" }
  ]);
  const { toast } = useToast();

  const handleSendMessage = async () => {
    if (!query.trim()) return;
    
    // Adiciona a mensagem do usuário
    setAssistantMessages(prev => [...prev, { role: "user", content: query }]);
    
    // Simula processamento
    setIsLoading(true);
    
    // Em um ambiente real, aqui teríamos uma chamada para um serviço de IA
    setTimeout(() => {
      // Resposta simulada baseada em palavras-chave
      let response = "";
      
      if (query.toLowerCase().includes("cliente") || query.toLowerCase().includes("cadastro")) {
        response = "Para cadastrar um novo cliente, clique no botão 'Adicionar Cliente' no topo da página. Você pode gerenciar todos os seus clientes na seção Clientes.";
      } else if (query.toLowerCase().includes("venda") || query.toLowerCase().includes("pedido")) {
        response = "Para registrar uma nova venda, acesse a seção 'Vendas' no menu lateral e clique em 'Nova Venda'. Você pode visualizar relatórios detalhados na seção Relatórios.";
      } else if (query.toLowerCase().includes("relatório") || query.toLowerCase().includes("dados")) {
        response = "Você pode acessar todos os relatórios na seção 'Relatórios'. Temos análises de vendas, comportamento de clientes e desempenho de produtos.";
      } else if (query.toLowerCase().includes("ajuda") || query.toLowerCase().includes("suporte")) {
        response = "Estou aqui para ajudar! Você pode me perguntar sobre como usar o sistema, encontrar funcionalidades específicas ou solicitar assistência com problemas técnicos.";
      } else {
        response = "Não tenho informações específicas sobre isso, mas posso ajudar com dúvidas sobre clientes, vendas, relatórios e funcionalidades do sistema. Como posso ajudar?";
      }
      
      // Adiciona a resposta do assistente
      setAssistantMessages(prev => [...prev, { role: "assistant", content: response }]);
      setIsLoading(false);
      setQuery("");
    }, 1000);
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-4 right-4 rounded-full h-12 w-12 shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 z-50"
          title="Assistente Virtual"
        >
          <Bot className="h-6 w-6" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader>
          <DrawerTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            Assistente Virtual
          </DrawerTitle>
          <DrawerDescription>
            Tire suas dúvidas e receba sugestões personalizadas
          </DrawerDescription>
        </DrawerHeader>
        
        <div className="px-4 pb-0 max-h-[50vh] overflow-y-auto flex flex-col gap-4">
          {assistantMessages.map((message, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg ${
                message.role === "assistant"
                  ? "bg-muted text-foreground mr-12"
                  : "bg-primary text-primary-foreground ml-12"
              }`}
            >
              {message.content}
            </div>
          ))}
          
          {isLoading && (
            <div className="bg-muted p-3 rounded-lg mr-12 flex items-center gap-2">
              <div className="animate-pulse h-2 w-2 bg-foreground rounded-full"></div>
              <div className="animate-pulse h-2 w-2 bg-foreground rounded-full" style={{ animationDelay: "300ms" }}></div>
              <div className="animate-pulse h-2 w-2 bg-foreground rounded-full" style={{ animationDelay: "600ms" }}></div>
            </div>
          )}
        </div>
        
        <div className="p-4 flex gap-2">
          <Input
            placeholder="Digite sua pergunta..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1"
            disabled={isLoading}
          />
          <Button onClick={handleSendMessage} disabled={isLoading || !query.trim()}>
            {isLoading ? (
              <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Enviar"
            )}
          </Button>
        </div>
        
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Fechar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default AssistantButton;
