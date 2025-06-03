
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface ServiceRating {
  id: string;
  serviceId: string;
  clientId: string;
  professionalId: string;
  rating: number;
  comment: string;
  response?: string;
  createdAt: string;
  highlighted: boolean;
}

interface RatingFilters {
  rating?: number;
  highlighted?: boolean;
}

// Dados mockados para demonstração
const MOCK_RATINGS: ServiceRating[] = [
  {
    id: '1',
    serviceId: 'post-1',
    clientId: 'client-1',
    professionalId: '00000000-0000-0000-0000-000000000000',
    rating: 5,
    comment: 'Excelente serviço! Profissional pontual e muito competente.',
    createdAt: '2025-05-15T14:30:00',
    highlighted: true
  },
  {
    id: '2',
    serviceId: 'post-2',
    clientId: 'client-2',
    professionalId: '00000000-0000-0000-0000-000000000000',
    rating: 4,
    comment: 'Muito bom, apenas um pequeno atraso na entrega.',
    createdAt: '2025-05-14T10:15:00',
    highlighted: false
  },
  {
    id: '3',
    serviceId: 'post-3',
    clientId: 'client-3',
    professionalId: '00000000-0000-0000-0000-000000000000',
    rating: 3,
    comment: 'O serviço foi satisfatório, mas poderia melhorar na comunicação.',
    response: 'Agradecemos o feedback e vamos trabalhar para melhorar nossa comunicação!',
    createdAt: '2025-05-12T16:45:00',
    highlighted: false
  }
];

export const useServiceRatings = (professionalId: string) => {
  const [ratings, setRatings] = useState<ServiceRating[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<RatingFilters>({});
  
  const fetchRatings = async () => {
    setIsLoading(true);
    try {
      // Simulação de carregamento
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Filtrar as avaliações pelo ID do profissional
      let filteredRatings = MOCK_RATINGS.filter(
        rating => rating.professionalId === professionalId
      );
      
      // Aplicar filtros adicionais
      if (filters.rating) {
        filteredRatings = filteredRatings.filter(rating => rating.rating === filters.rating);
      }
      
      if (filters.highlighted !== undefined) {
        filteredRatings = filteredRatings.filter(rating => rating.highlighted === filters.highlighted);
      }
      
      setRatings(filteredRatings);
    } catch (error) {
      console.error("Erro ao carregar avaliações:", error);
      toast.error("Não foi possível carregar as avaliações");
    } finally {
      setIsLoading(false);
    }
  };
  
  const addRatingResponse = async (ratingId: string, response: string) => {
    try {
      // Simulação de requisição
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Atualizar o estado local
      setRatings(prevRatings => 
        prevRatings.map(rating => 
          rating.id === ratingId ? { ...rating, response } : rating
        )
      );
      
      toast.success("Resposta adicionada com sucesso");
      return true;
    } catch (error) {
      console.error("Erro ao adicionar resposta:", error);
      toast.error("Não foi possível adicionar sua resposta");
      return false;
    }
  };
  
  const toggleHighlight = async (ratingId: string) => {
    try {
      // Simulação de requisição
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Atualizar o estado local
      setRatings(prevRatings => 
        prevRatings.map(rating => 
          rating.id === ratingId ? { ...rating, highlighted: !rating.highlighted } : rating
        )
      );
      
      const rating = ratings.find(r => r.id === ratingId);
      const action = rating?.highlighted ? "removido dos destaques" : "destacado";
      
      toast.success(`Comentário ${action} com sucesso`);
      return true;
    } catch (error) {
      console.error("Erro ao destacar avaliação:", error);
      toast.error("Não foi possível atualizar o destaque");
      return false;
    }
  };
  
  // Buscar avaliações quando o componente montar ou quando os filtros mudarem
  useEffect(() => {
    fetchRatings();
  }, [professionalId, filters]);
  
  return {
    ratings,
    isLoading,
    filters,
    setFilters,
    addRatingResponse,
    toggleHighlight,
    refetchRatings: fetchRatings
  };
};
