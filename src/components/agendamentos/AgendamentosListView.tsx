
import React from "react";
import { ScheduledPost } from "@/hooks/useScheduledPosts";
import { Button } from "@/components/ui/button";
import AgendamentoItem from "./AgendamentoItem";

interface AgendamentosListViewProps {
  posts: ScheduledPost[];
  isLoading: boolean;
  onCreateNew: () => void;
  onDeletePost: (id: string) => Promise<void>;
}

const AgendamentosListView: React.FC<AgendamentosListViewProps> = ({ 
  posts, 
  isLoading, 
  onCreateNew, 
  onDeletePost 
}) => {
  return (
    <div className="space-y-4">
      {isLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
          <p>Carregando agendamentos...</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <p>Nenhum agendamento encontrado.</p>
          <Button 
            variant="outline" 
            onClick={onCreateNew} 
            className="mt-2"
          >
            Criar agendamento
          </Button>
        </div>
      ) : (
        posts.map((post) => (
          <AgendamentoItem 
            key={post.id} 
            post={post} 
            onDeletePost={onDeletePost} 
          />
        ))
      )}
    </div>
  );
};

export default AgendamentosListView;
