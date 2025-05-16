
import React from "react";
import { ScheduledPost } from "@/hooks/useScheduledPosts";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import AgendamentoCalendarItem from "./AgendamentoCalendarItem";

interface DailyPostsListProps {
  date: Date | undefined;
  posts: ScheduledPost[];
  isLoading: boolean;
  onPostClick: (post: ScheduledPost) => void;
}

const DailyPostsList: React.FC<DailyPostsListProps> = ({
  date,
  posts,
  isLoading,
  onPostClick,
}) => {
  if (!date) {
    return (
      <div className="p-4">
        <h3 className="font-medium text-lg mb-4">Selecione uma data</h3>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h3 className="font-medium text-lg mb-4">
        {format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
      </h3>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full"></div>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-10 border rounded-md">
          <p className="text-muted-foreground">Não há agendamentos para esta data.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {posts
            .sort((a, b) => new Date(a.scheduledFor).getTime() - new Date(b.scheduledFor).getTime())
            .map(post => (
              <AgendamentoCalendarItem 
                key={post.id} 
                post={post} 
                onClick={onPostClick} 
              />
            ))}
        </ul>
      )}
    </div>
  );
};

export default DailyPostsList;
