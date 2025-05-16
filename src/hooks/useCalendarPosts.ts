
import { useState } from "react";
import { ScheduledPost } from "@/hooks/useScheduledPosts";

export const useCalendarPosts = (posts: ScheduledPost[]) => {
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

  return {
    selectedDate,
    setSelectedDate,
    selectedDatePosts,
    datesWithPosts,
    getPostsByDate,
  };
};
