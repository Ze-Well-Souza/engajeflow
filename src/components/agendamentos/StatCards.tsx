
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar, Clock, Check, X } from "lucide-react";
import { ScheduledPost } from "@/hooks/useScheduledPosts";

interface StatCardsProps {
  posts: ScheduledPost[];
}

const StatCards: React.FC<StatCardsProps> = ({ posts }) => {
  // Contadores para o dashboard
  const pendingPosts = posts.filter(post => post.status === 'pending').length;
  const completedPosts = posts.filter(post => post.status === 'posted').length;
  const failedPosts = posts.filter(post => post.status === 'failed').length;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Calendar className="h-4 w-4 text-blue-500" />
            Total de Agendamentos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{posts.length}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Clock className="h-4 w-4 text-yellow-500" />
            Pendentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pendingPosts}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Check className="h-4 w-4 text-green-500" />
            Concluídos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{completedPosts}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <X className="h-4 w-4 text-red-500" />
            Falhas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{failedPosts}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatCards;
