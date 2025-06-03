
import { useState, useCallback, useMemo } from 'react';
import { ScheduledPost } from '@/hooks/useScheduledPosts';

export const useCalendarPosts = (posts: ScheduledPost[]) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Função para agrupar posts por data
  const getPostsByDate = useCallback((date: Date | undefined) => {
    if (!date) return [];
    
    return posts.filter(post => {
      const postDate = new Date(post.scheduled_for);
      return (
        postDate.getDate() === date.getDate() &&
        postDate.getMonth() === date.getMonth() &&
        postDate.getFullYear() === date.getFullYear()
      );
    });
  }, [posts]);

  // Posts correspondentes à data selecionada
  const selectedDatePosts = useMemo(() => 
    getPostsByDate(selectedDate), [getPostsByDate, selectedDate]);

  // Datas que possuem posts agendados
  const datesWithPosts = useMemo(() => 
    posts.map(post => new Date(post.scheduled_for)),
    [posts]);

  return {
    selectedDate,
    setSelectedDate,
    selectedDatePosts,
    datesWithPosts,
    getPostsByDate
  };
};

export default useCalendarPosts;
