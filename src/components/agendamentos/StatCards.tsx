import React from "react";
import { CalendarCheck, MessageSquare, TrendingUp, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ScheduledPost } from "@/hooks/useScheduledPosts";

interface StatCardsProps {
  posts: ScheduledPost[];
}

const StatCards: React.FC<StatCardsProps> = ({ posts }) => {
  // Calcular estatísticas
  const totalPosts = posts.length;
  const pendingPosts = posts.filter(post => post.status === 'pending').length;
  const postedPosts = posts.filter(post => post.status === 'posted').length;
  
  // Estatística fictícia de engajamento
  const engagementRate = Math.floor(Math.random() * 20) + 65; // Entre 65-85%
  
  // Estatística fictícia de avaliação média
  const averageRating = 4.7;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">Total de Agendamentos</p>
            <p className="text-2xl font-bold">{totalPosts}</p>
          </div>
          <CalendarCheck className="h-8 w-8 text-muted-foreground/60" />
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">Pendentes</p>
            <p className="text-2xl font-bold">{pendingPosts}</p>
          </div>
          <MessageSquare className="h-8 w-8 text-muted-foreground/60" />
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">Taxa de Engajamento</p>
            <p className="text-2xl font-bold">{engagementRate}%</p>
          </div>
          <TrendingUp className="h-8 w-8 text-muted-foreground/60" />
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">Avaliação Média</p>
            <p className="text-2xl font-bold">{averageRating}</p>
          </div>
          <Star className="h-8 w-8 text-muted-foreground/60" />
        </CardContent>
      </Card>
    </div>
  );
};

export default StatCards;
