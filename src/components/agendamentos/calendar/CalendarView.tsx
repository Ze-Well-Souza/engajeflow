
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScheduledPost } from "@/hooks/useScheduledPosts";
import { cn } from "@/lib/utils";
import CalendarDayContent from "./CalendarDayContent";
import DailyPostsList from "./DailyPostsList";

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
                      <CalendarDayContent 
                        date={date}
                        posts={getPostsByDate(date)}
                      />
                    </div>
                  )
                }}
              />
            </div>
          </div>

          <div className="col-span-1 md:col-span-4 lg:col-span-3 xl:col-span-4">
            <DailyPostsList 
              date={selectedDate}
              posts={selectedDatePosts}
              isLoading={isLoading}
              onPostClick={onPostClick}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarView;
