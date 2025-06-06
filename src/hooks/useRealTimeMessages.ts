
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { MessagesService, Message } from '@/services/MessagesService';
import { useAuth } from '@/contexts/AuthContext';

export const useRealTimeMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const { currentUser } = useAuth();

  // Carregar mensagens iniciais
  useEffect(() => {
    if (!currentUser) return;

    const loadMessages = async () => {
      try {
        const data = await MessagesService.getMessages();
        setMessages(data);
        setUnreadCount(data.filter(msg => msg.status === 'unread').length);
      } catch (error) {
        console.error('Erro ao carregar mensagens:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
  }, [currentUser]);

  // Configurar listener de tempo real
  useEffect(() => {
    if (!currentUser) return;

    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'messages',
          filter: `user_id=eq.${currentUser.id}`,
        },
        (payload) => {
          console.log('Nova mensagem em tempo real:', payload);
          
          if (payload.eventType === 'INSERT') {
            const newMessage: Message = {
              id: payload.new.id,
              platform: payload.new.platform,
              conversationId: payload.new.conversation_id,
              senderName: payload.new.sender_name,
              senderPhone: payload.new.sender_phone,
              content: payload.new.content,
              messageType: payload.new.message_type,
              status: payload.new.status,
              metadata: payload.new.metadata,
              createdAt: payload.new.created_at,
              updatedAt: payload.new.updated_at,
            };
            
            setMessages(prev => [newMessage, ...prev]);
            
            if (newMessage.status === 'unread') {
              setUnreadCount(prev => prev + 1);
            }
          } else if (payload.eventType === 'UPDATE') {
            setMessages(prev => prev.map(msg => 
              msg.id === payload.new.id 
                ? {
                    ...msg,
                    status: payload.new.status,
                    updatedAt: payload.new.updated_at,
                  }
                : msg
            ));
            
            // Atualizar contador de não lidas
            setUnreadCount(prev => {
              if (payload.old.status === 'unread' && payload.new.status !== 'unread') {
                return prev - 1;
              }
              if (payload.old.status !== 'unread' && payload.new.status === 'unread') {
                return prev + 1;
              }
              return prev;
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentUser]);

  const markAsRead = async (messageId: string) => {
    try {
      await MessagesService.markAsRead(messageId);
    } catch (error) {
      console.error('Erro ao marcar como lida:', error);
    }
  };

  const sendReply = async (conversationId: string, platform: string, content: string, recipientName: string) => {
    try {
      const reply = await MessagesService.sendReply(conversationId, platform, content, recipientName);
      
      // Marcar mensagem original como respondida
      const originalMessage = messages.find(msg => 
        msg.conversationId === conversationId && msg.messageType === 'received'
      );
      if (originalMessage) {
        await MessagesService.markAsReplied(originalMessage.id);
      }
      
      return reply;
    } catch (error) {
      console.error('Erro ao enviar resposta:', error);
      throw error;
    }
  };

  return {
    messages,
    loading,
    unreadCount,
    markAsRead,
    sendReply,
  };
};
