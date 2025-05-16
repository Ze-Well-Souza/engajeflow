
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ScheduledPost } from "@/hooks/useScheduledPosts";
import AgendamentosFilter from "./AgendamentosFilter";
import CalendarView from "./CalendarView";
import ViewModeSelector from "./ViewModeSelector";
import AgendamentosListView from "./AgendamentosListView";

interface AgendamentosListaProps {
  posts: ScheduledPost[];
  isLoading: boolean;
  onCreateNew: () => void;
  onDeletePost: (id: string) => Promise<void>;
  platformFilter: string;
  statusFilter: string;
  onPlatformFilterChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
}

const AgendamentosLista: React.FC<AgendamentosListaProps> = ({ 
  posts, 
  isLoading, 
  onCreateNew, 
  onDeletePost,
  platformFilter,
  statusFilter,
  onPlatformFilterChange,
  onStatusFilterChange 
}) => {
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');

  // Aplicar filtros
  const filteredPosts = posts.filter((post) => {
    const matchesPlatform = platformFilter === 'all' || post.platform === platformFilter;
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    return matchesPlatform && matchesStatus;
  });

  // Função para lidar com cliques em posts no calendário
  const handlePostClick = (post: ScheduledPost) => {
    console.log("Post clicado:", post);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>Agendamentos Programados</CardTitle>
            <CardDescription>
              Gerencie seus posts agendados para redes sociais.
            </CardDescription>
          </div>
          <ViewModeSelector viewMode={viewMode} setViewMode={setViewMode} />
        </div>
      </CardHeader>
      <CardContent>
        <AgendamentosFilter 
          platformFilter={platformFilter}
          statusFilter={statusFilter}
          onPlatformFilterChange={onPlatformFilterChange}
          onStatusFilterChange={onStatusFilterChange}
        />
        
        {viewMode === 'list' ? (
          <AgendamentosListView 
            posts={filteredPosts} 
            isLoading={isLoading} 
            onCreateNew={onCreateNew} 
            onDeletePost={onDeletePost} 
          />
        ) : (
          <CalendarView 
            posts={filteredPosts} 
            isLoading={isLoading} 
            onPostClick={handlePostClick} 
          />
        )}
      </CardContent>
    </Card>
  );
};

export default AgendamentosLista;
