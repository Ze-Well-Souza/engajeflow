
import React from "react";
import useScheduledPosts, { PostFilters } from "@/hooks/useScheduledPosts";
import { useState } from "react";
import AgendamentosLista from "./AgendamentosLista";
import { toast } from "sonner";

// Cliente temporário fixo para demonstração
const DEMO_CLIENT_ID = "00000000-0000-0000-0000-000000000000";

interface AgendamentosListaWrapperProps {
  onCreateNew: () => void;
}

const AgendamentosListaWrapper: React.FC<AgendamentosListaWrapperProps> = ({ 
  onCreateNew 
}) => {
  const [filter, setFilter] = useState<PostFilters>({
    platform: 'all',
    status: 'all',
  });

  const { 
    posts, 
    isLoading, 
    refreshPosts, 
    deleteScheduledPost 
  } = useScheduledPosts(DEMO_CLIENT_ID);

  // Handlers para os filtros
  const handlePlatformFilterChange = (value: string) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      platform: value
    }));
  };
  
  const handleStatusFilterChange = (value: string) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      status: value
    }));
  };

  // Adaptador para garantir que o tipo de retorno seja Promise<void>
  const handleDeletePost = async (id: string): Promise<void> => {
    const result = await deleteScheduledPost(id);
    
    if (!result.success) {
      toast.error(`Erro ao excluir: ${result.error || 'Falha desconhecida'}`);
    } else {
      toast.success("Agendamento excluído com sucesso");
    }
  };

  return (
    <AgendamentosLista 
      posts={posts} 
      isLoading={isLoading} 
      onCreateNew={onCreateNew}
      onDeletePost={handleDeletePost}
      platformFilter={filter.platform}
      statusFilter={filter.status}
      onPlatformFilterChange={handlePlatformFilterChange}
      onStatusFilterChange={handleStatusFilterChange}
    />
  );
};

export default AgendamentosListaWrapper;
