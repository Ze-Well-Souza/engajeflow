
import { supabase } from '@/integrations/supabase/client';

export interface Message {
  id: string;
  platform: string;
  conversationId: string;
  senderName: string;
  senderPhone?: string;
  content: string;
  messageType: 'sent' | 'received';
  status: 'read' | 'unread' | 'replied';
  metadata: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export class MessagesService {
  // Buscar mensagens do usuário
  static async getMessages(platform?: string, status?: string): Promise<Message[]> {
    let query = supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (platform) {
      query = query.eq('platform', platform);
    }

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;
    
    if (error) throw error;
    
    return data.map(msg => ({
      id: msg.id,
      platform: msg.platform,
      conversationId: msg.conversation_id,
      senderName: msg.sender_name,
      senderPhone: msg.sender_phone,
      content: msg.content,
      messageType: msg.message_type,
      status: msg.status,
      metadata: msg.metadata,
      createdAt: msg.created_at,
      updatedAt: msg.updated_at,
    }));
  }

  // Marcar mensagem como lida
  static async markAsRead(messageId: string) {
    const { error } = await supabase
      .from('messages')
      .update({ status: 'read' })
      .eq('id', messageId);
    
    if (error) throw error;
  }

  // Marcar mensagem como respondida
  static async markAsReplied(messageId: string) {
    const { error } = await supabase
      .from('messages')
      .update({ status: 'replied' })
      .eq('id', messageId);
    
    if (error) throw error;
  }

  // Enviar resposta
  static async sendReply(conversationId: string, platform: string, content: string, recipientName: string) {
    const { data, error } = await supabase
      .from('messages')
      .insert({
        platform,
        conversation_id: conversationId,
        sender_name: 'Você',
        content,
        message_type: 'sent',
        status: 'read',
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  // Obter estatísticas de mensagens
  static async getMessageStats() {
    const { data, error } = await supabase
      .from('messages')
      .select('status, platform, created_at');
    
    if (error) throw error;
    
    const today = new Date().toISOString().split('T')[0];
    const todayMessages = data.filter(msg => msg.created_at.startsWith(today));
    
    return {
      total: data.length,
      unread: data.filter(msg => msg.status === 'unread').length,
      today: todayMessages.length,
      byPlatform: data.reduce((acc, msg) => {
        acc[msg.platform] = (acc[msg.platform] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
    };
  }
}
