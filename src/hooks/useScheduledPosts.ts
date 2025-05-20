
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface ScheduledPost {
  id: string;
  clientId: string;
  mediaId: string;
  mediaType: 'image' | 'video' | 'carousel';
  mediaTitle: string;
  mediaUrl?: string;
  platform: string;
  scheduledFor: string;
  status: 'pending' | 'processing' | 'posted' | 'failed';
  errorMessage?: string;
  caption?: string;
  hashtags?: string[];
}

export interface PostFilters {
  platform: string;
  status: string;
}

// Dados de mock para demonstração
const MOCK_SCHEDULED_POSTS: ScheduledPost[] = [
  {
    id: '1',
    clientId: '00000000-0000-0000-0000-000000000000',
    mediaId: 'media-1',
    mediaType: 'image',
    mediaTitle: 'Lançamento de Produto',
    mediaUrl: '/placeholder.svg',
    platform: 'instagram',
    scheduledFor: '2025-05-25T14:30:00',
    status: 'pending',
    caption: 'Estamos muito animados para compartilhar nosso novo produto!',
    hashtags: ['novidade', 'lancamento', 'produto']
  },
  {
    id: '2',
    clientId: '00000000-0000-0000-0000-000000000000',
    mediaId: 'media-2',
    mediaType: 'video',
    mediaTitle: 'Tutorial de Uso',
    platform: 'youtube',
    scheduledFor: '2025-05-27T10:00:00',
    status: 'processing',
  },
  {
    id: '3',
    clientId: '00000000-0000-0000-0000-000000000000',
    mediaId: 'media-3',
    mediaType: 'image',
    mediaTitle: 'Promoção Especial',
    platform: 'facebook',
    scheduledFor: '2025-05-22T18:15:00',
    status: 'posted',
  },
  {
    id: '4',
    clientId: '00000000-0000-0000-0000-000000000000',
    mediaId: 'media-4',
    mediaType: 'carousel',
    mediaTitle: 'Retrospectiva do Mês',
    platform: 'instagram',
    scheduledFor: '2025-05-20T09:00:00',
    status: 'failed',
    errorMessage: 'Falha na conexão com a API do Instagram'
  }
];

export const useScheduledPosts = (clientId: string) => {
  const [posts, setPosts] = useState<ScheduledPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Função para buscar os posts agendados
  const fetchPosts = async () => {
    setIsLoading(true);
    // Em uma implementação real, aqui seria feita uma chamada à API
    try {
      // Simulação de delay de carregamento
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      // Filtrando posts pelo ID do cliente
      const filteredPosts = MOCK_SCHEDULED_POSTS.filter(
        post => post.clientId === clientId
      );
      
      setPosts(filteredPosts);
    } catch (error) {
      console.error("Erro ao buscar posts agendados:", error);
      toast.error("Não foi possível carregar os agendamentos");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Função para refetch
  const refetch = () => fetchPosts();
  
  // Função para deletar um post agendado
  const deleteScheduledPost = async (id: string) => {
    try {
      // Em uma implementação real, aqui seria feita uma chamada à API
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // Removendo o post da lista local
      setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
      
      toast.success("Agendamento removido com sucesso");
    } catch (error) {
      console.error("Erro ao deletar post:", error);
      toast.error("Não foi possível remover o agendamento");
    }
  };
  
  // Carregar os posts agendados na montagem do componente
  useEffect(() => {
    fetchPosts();
  }, [clientId]);
  
  return {
    posts,
    isLoading,
    refetch,
    deleteScheduledPost
  };
};
