
import { useState, useEffect, useMemo } from 'react';
import { startOfDay, isSameDay } from 'date-fns';
import { ScheduledPost } from './useScheduledPosts';

export const useCalendarPosts = (posts: ScheduledPost[]) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // Obter postagens para a data selecionada
  const selectedDatePosts = useMemo(() => {
    if (!selectedDate) return [];
    return posts.filter(post => {
      const postDate = new Date(post.scheduledFor);
      return isSameDay(postDate, selectedDate);
    });
  }, [posts, selectedDate]);
  
  // Obter todas as datas que possuem postagens
  const datesWithPosts = useMemo(() => {
    return posts.map(post => {
      const date = new Date(post.scheduledFor);
      return startOfDay(date);
    });
  }, [posts]);

  // Função para obter postagens por data específica
  const getPostsByDate = (date: Date) => {
    return posts.filter(post => {
      const postDate = new Date(post.scheduledFor);
      return isSameDay(postDate, date);
    });
  };
  
  return {
    selectedDate,
    setSelectedDate,
    selectedDatePosts,
    datesWithPosts,
    getPostsByDate
  };
};
