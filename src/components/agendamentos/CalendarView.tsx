
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ScheduledPost } from "@/hooks/useScheduledPosts";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Instagram, Youtube, Facebook } from "lucide-react";

interface CalendarViewProps {
  posts: ScheduledPost[];
  isLoading: boolean;
  onPostClick: (post: ScheduledPost) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({
  posts,
  isLoading,
  onPostClick,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Função para agrupar posts por data
  const getPostsByDate = (date: Date | undefined) => {
    if (!date) return [];
    
    return posts.filter(post => {
      const postDate = new Date(post.scheduledFor);
      return (
        postDate.getDate() === date.getDate() &&
        postDate.getMonth() === date.getMonth() &&
        postDate.getFullYear() === date.getFullYear()
      );
    });
  };

  // Posts correspondentes à data selecionada
  const selectedDatePosts = getPostsByDate(selectedDate);

  // Datas que possuem posts agendados
  const datesWithPosts = posts.map(post => new Date(post.scheduledFor));

  // Função para renderizar conteúdo personalizado do dia no calendário
  const renderDayContent = (day: Date) => {
    const postsOnDay = getPostsByDate(day);
    if (postsOnDay.length === 0) return null;

    // Agrupar por plataforma
    const platforms: Record<string, number> = {};
    postsOnDay.forEach(post => {
      platforms[post.platform] = (platforms[post.platform] || 0) + 1;
    });

    return (
      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-0.5 pb-0.5">
        {Object.entries(platforms).map(([platform, count], index) => (
          <div 
            key={index}
            className={`h-1.5 w-1.5 rounded-full ${
              platform === 'instagram' ? 'bg-pink-500' :
              platform === 'facebook' ? 'bg-blue-500' :
              platform === 'youtube' ? 'bg-red-500' : 'bg-gray-500'
            }`}
            title={`${count} post(s) no ${platform}`}
          />
        ))}
      </div>
    );
  };

  // Função para renderizar o ícone da plataforma
  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram':
        return <Instagram className="h-4 w-4" />;
      case 'youtube':
        return <Youtube className="h-4 w-4" />;
      case 'facebook':
        return <Facebook className="h-4 w-4" />;
      default:
        return null;
    }
  };

  // Função para formatar horário
  const formatTime = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return format(date, "HH:mm", { locale: ptBR });
    } catch (e) {
      return "";
    }
  };

  // Função para obter classe de cor com base no status
  const getStatusColorClass = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50';
      case 'processing': return 'bg-blue-500/20 text-blue-500 border-blue-500/50';
      case 'posted': return 'bg-green-500/20 text-green-500 border-green-500/50';
      case 'failed': return 'bg-red-500/20 text-red-500 border-red-500/50';
      default: return 'bg-gray-500/20 text-gray-500 border-gray-500/50';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Visualização em Calendário</CardTitle>
        <CardDescription>
          Clique em uma data para ver os agendamentos programados para esse dia.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-7 lg:grid-cols-5 xl:grid-cols-7 gap-6">
          <div className="col-span-1 md:col-span-3 lg:col-span-2 xl:col-span-3">
            <div className="p-4">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className={cn("p-3 pointer-events-auto rounded-md border")}
                modifiers={{
                  hasPosts: datesWithPosts,
                }}
                modifiersStyles={{
                  hasPosts: { 
                    fontWeight: 'bold',
                    textDecoration: 'underline',
                  }
                }}
                components={{
                  DayContent: ({ date }) => (
                    <div className="relative h-full w-full">
                      <div>{date.getDate()}</div>
                      {renderDayContent(date)}
                    </div>
                  )
                }}
              />
            </div>
          </div>

          <div className="col-span-1 md:col-span-4 lg:col-span-3 xl:col-span-4">
            <div className="p-4">
              <h3 className="font-medium text-lg mb-4">
                {selectedDate ? format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : "Selecione uma data"}
              </h3>

              {isLoading ? (
                <div className="flex justify-center py-10">
                  <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full"></div>
                </div>
              ) : selectedDatePosts.length === 0 ? (
                <div className="text-center py-10 border rounded-md">
                  <p className="text-muted-foreground">Não há agendamentos para esta data.</p>
                </div>
              ) : (
                <ul className="space-y-3">
                  {selectedDatePosts
                    .sort((a, b) => new Date(a.scheduledFor).getTime() - new Date(b.scheduledFor).getTime())
                    .map(post => (
                      <li 
                        key={post.id} 
                        className="flex items-center gap-3 p-3 border rounded-md hover:bg-gray-900/50 cursor-pointer transition-colors"
                        onClick={() => onPostClick(post)}
                      >
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          post.platform === 'instagram' ? 'bg-pink-900/30 text-pink-500' : 
                          post.platform === 'youtube' ? 'bg-red-900/30 text-red-500' : 
                          post.platform === 'facebook' ? 'bg-blue-900/30 text-blue-500' :
                          'bg-gray-900/30 text-gray-500'
                        }`}>
                          {getPlatformIcon(post.platform)}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{post.mediaTitle || "Mídia sem título"}</div>
                          <div className="text-sm text-muted-foreground">
                            Agendado para às {formatTime(post.scheduledFor)}
                          </div>
                        </div>
                        <Badge variant="outline" className={`${getStatusColorClass(post.status)}`}>
                          {post.status === 'pending' ? 'Pendente' : 
                           post.status === 'processing' ? 'Processando' : 
                           post.status === 'posted' ? 'Publicado' : 'Falha'}
                        </Badge>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarView;
