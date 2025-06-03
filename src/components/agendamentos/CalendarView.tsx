
import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCalendarPosts } from "@/hooks/useCalendarPosts";
import { ScheduledPost } from "@/hooks/useScheduledPosts";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface CalendarViewProps {
  posts: ScheduledPost[];
}

export const CalendarView: React.FC<CalendarViewProps> = ({ posts }) => {
  const {
    selectedDate,
    setSelectedDate,
    selectedDatePosts,
    datesWithPosts
  } = useCalendarPosts(posts);

  // Função para verificar se uma data tem posts
  const hasPostsOnDate = (date: Date) => {
    return datesWithPosts.some(postDate => {
      const dateToCheck = new Date(date);
      const postDateObj = new Date(postDate);
      return (
        dateToCheck.getDate() === postDateObj.getDate() &&
        dateToCheck.getMonth() === postDateObj.getMonth() &&
        dateToCheck.getFullYear() === postDateObj.getFullYear()
      );
    });
  };

  // Função para obter a cor do status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Calendário */}
      <Card>
        <CardHeader>
          <CardTitle>Calendário de Publicações</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            locale={ptBR}
            className="rounded-md border"
            modifiers={{
              hasPosts: (date) => hasPostsOnDate(date)
            }}
            modifiersStyles={{
              hasPosts: {
                backgroundColor: '#dbeafe',
                color: '#1e40af',
                fontWeight: 'bold'
              }
            }}
          />
        </CardContent>
      </Card>

      {/* Posts do dia selecionado */}
      <Card>
        <CardHeader>
          <CardTitle>
            {selectedDate 
              ? `Publicações para ${format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}`
              : "Selecione uma data"
            }
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedDatePosts.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <p>Nenhuma publicação agendada para esta data</p>
            </div>
          ) : (
            <div className="space-y-4">
              {selectedDatePosts.map((post) => (
                <div key={post.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-sm">
                      {post.media_title || `Publicação ${post.id.substring(0, 8)}`}
                    </h4>
                    <Badge className={getStatusColor(post.status)}>
                      {post.status}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                    {post.caption || "Sem legenda"}
                  </p>
                  
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>
                      Horário: {format(new Date(post.scheduled_for), "HH:mm")}
                    </span>
                    <span className="capitalize">
                      {post.platform}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarView;
