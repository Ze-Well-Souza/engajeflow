
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export type EmailSequence = {
  id: string;
  name: string;
  subject: string;
  delay: number; // em dias
  status: 'ativo' | 'inativo' | 'rascunho';
  content: string;
  sendAfter?: string; // ID do email anterior na sequência
};

export type EmailSequenceGroup = {
  id: string;
  name: string;
  description?: string;
  status: 'ativo' | 'inativo';
  emails: EmailSequence[];
  stats?: {
    enviados: number;
    abertos: number;
    clicados: number;
  };
};

// Dados mockados para desenvolvimento
const mockSequences: EmailSequenceGroup[] = [
  {
    id: "seq-001",
    name: "Boas-vindas e Apresentação",
    description: "Sequência para novos leads apresentando a empresa",
    status: "ativo",
    stats: {
      enviados: 1432,
      abertos: 876,
      clicados: 342
    },
    emails: [
      {
        id: "email-001",
        name: "Boas-vindas",
        subject: "Bem-vindo à nossa comunidade!",
        delay: 0,
        status: "ativo",
        content: "Olá {nome},\n\nSeja bem-vindo à comunidade TechCare! Estamos felizes em ter você conosco..."
      },
      {
        id: "email-002",
        name: "Produtos Principais",
        subject: "Conheça nossos produtos principais",
        delay: 2,
        status: "ativo",
        sendAfter: "email-001",
        content: "Olá {nome},\n\nAgora que você já conhece um pouco sobre nós, queremos apresentar nossos principais produtos..."
      },
      {
        id: "email-003",
        name: "Depoimentos",
        subject: "O que nossos clientes dizem sobre nós",
        delay: 4,
        status: "ativo",
        sendAfter: "email-002",
        content: "Olá {nome},\n\nSaiba o que nossos clientes estão falando sobre nossas soluções..."
      }
    ]
  },
  {
    id: "seq-002",
    name: "Recuperação de Carrinho",
    description: "Para clientes que abandonaram o carrinho",
    status: "ativo",
    stats: {
      enviados: 857,
      abertos: 523,
      clicados: 278
    },
    emails: [
      {
        id: "email-004",
        name: "Lembrete de Carrinho",
        subject: "Você esqueceu algo no seu carrinho!",
        delay: 0,
        status: "ativo",
        content: "Olá {nome},\n\nVimos que você deixou alguns itens no seu carrinho. Está com alguma dúvida?"
      },
      {
        id: "email-005",
        name: "Oferta Especial",
        subject: "Oferta especial para finalizar sua compra",
        delay: 1,
        status: "ativo",
        sendAfter: "email-004",
        content: "Olá {nome},\n\nQueremos ajudar você a finalizar sua compra. Que tal um cupom de 10% de desconto?"
      }
    ]
  }
];

export function useEmailSequence() {
  const [sequences, setSequences] = useState<EmailSequenceGroup[]>(mockSequences);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const addSequence = async (newSequence: Omit<EmailSequenceGroup, 'id'>) => {
    setIsLoading(true);
    
    try {
      // Simulando chamada de API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const sequenceWithId = {
        ...newSequence,
        id: `seq-${Date.now().toString(36)}`,
      };
      
      setSequences(prev => [...prev, sequenceWithId]);
      
      toast({
        title: "Sequência criada",
        description: `A sequência "${newSequence.name}" foi criada com sucesso.`,
      });
      
      return sequenceWithId;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao criar sequência",
        description: "Ocorreu um erro ao processar sua solicitação.",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const updateSequence = async (id: string, updates: Partial<EmailSequenceGroup>) => {
    setIsLoading(true);
    
    try {
      // Simulando chamada de API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setSequences(prev => 
        prev.map(seq => 
          seq.id === id ? { ...seq, ...updates } : seq
        )
      );
      
      toast({
        title: "Sequência atualizada",
        description: "As alterações foram salvas com sucesso.",
      });
      
      return true;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao atualizar",
        description: "Ocorreu um erro ao salvar as alterações.",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteSequence = async (id: string) => {
    setIsLoading(true);
    
    try {
      // Simulando chamada de API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setSequences(prev => prev.filter(seq => seq.id !== id));
      
      toast({
        title: "Sequência removida",
        description: "A sequência foi removida com sucesso.",
      });
      
      return true;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao remover",
        description: "Ocorreu um erro ao remover a sequência.",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    sequences,
    isLoading,
    addSequence,
    updateSequence,
    deleteSequence
  };
}
