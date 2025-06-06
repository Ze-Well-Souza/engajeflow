
import { supabase } from '@/integrations/supabase/client';

export interface SocialConnectorConfig {
  platform: string;
  credentials: {
    clientId?: string;
    clientSecret?: string;
    accessToken?: string;
    refreshToken?: string;
    apiKey?: string;
    botToken?: string;
  };
  scopes?: string[];
}

export interface PostContent {
  content: string;
  mediaUrls?: string[];
  hashtags?: string[];
  mentions?: string[];
  scheduledFor?: string;
}

export interface PostResult {
  success: boolean;
  platformPostId?: string;
  platformUrl?: string;
  error?: string;
}

export class SocialConnectorService {
  // Instagram Business API
  static async connectInstagram(accessToken: string, accountId: string) {
    try {
      // Verificar token e obter informações da conta
      const accountInfo = await this.getInstagramAccountInfo(accessToken, accountId);
      
      const user = await supabase.auth.getUser();
      if (!user.data.user) throw new Error('Usuário não autenticado');

      const { data, error } = await supabase
        .from('connected_accounts')
        .insert({
          user_id: user.data.user.id,
          platform: 'instagram',
          account_name: accountInfo.name,
          account_username: accountInfo.username,
          platform_user_id: accountId,
          access_token: accessToken,
          account_data: accountInfo,
          is_active: true
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erro ao conectar Instagram:', error);
      throw error;
    }
  }

  // Facebook Pages API
  static async connectFacebook(accessToken: string, pageId: string) {
    try {
      const pageInfo = await this.getFacebookPageInfo(accessToken, pageId);
      
      const user = await supabase.auth.getUser();
      if (!user.data.user) throw new Error('Usuário não autenticado');

      const { data, error } = await supabase
        .from('connected_accounts')
        .insert({
          user_id: user.data.user.id,
          platform: 'facebook',
          account_name: pageInfo.name,
          platform_user_id: pageId,
          access_token: accessToken,
          account_data: pageInfo,
          is_active: true
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erro ao conectar Facebook:', error);
      throw error;
    }
  }

  // WhatsApp Business API
  static async connectWhatsApp(accessToken: string, phoneNumberId: string) {
    try {
      const phoneInfo = await this.getWhatsAppPhoneInfo(accessToken, phoneNumberId);
      
      const user = await supabase.auth.getUser();
      if (!user.data.user) throw new Error('Usuário não autenticado');

      const { data, error } = await supabase
        .from('connected_accounts')
        .insert({
          user_id: user.data.user.id,
          platform: 'whatsapp',
          account_name: phoneInfo.display_phone_number,
          platform_user_id: phoneNumberId,
          access_token: accessToken,
          account_data: phoneInfo,
          is_active: true
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erro ao conectar WhatsApp:', error);
      throw error;
    }
  }

  // Telegram Bot API
  static async connectTelegram(botToken: string) {
    try {
      const botInfo = await this.getTelegramBotInfo(botToken);
      
      const user = await supabase.auth.getUser();
      if (!user.data.user) throw new Error('Usuário não autenticado');

      const { data, error } = await supabase
        .from('connected_accounts')
        .insert({
          user_id: user.data.user.id,
          platform: 'telegram',
          account_name: botInfo.first_name,
          account_username: botInfo.username,
          platform_user_id: botInfo.id.toString(),
          access_token: botToken,
          account_data: botInfo,
          is_active: true
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erro ao conectar Telegram:', error);
      throw error;
    }
  }

  // Métodos auxiliares para obter informações das contas
  private static async getInstagramAccountInfo(accessToken: string, accountId: string) {
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${accountId}?fields=id,name,username,followers_count,profile_picture_url&access_token=${accessToken}`
    );
    
    if (!response.ok) {
      throw new Error('Erro ao obter informações da conta Instagram');
    }
    
    return response.json();
  }

  private static async getFacebookPageInfo(accessToken: string, pageId: string) {
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${pageId}?fields=id,name,username,fan_count,picture&access_token=${accessToken}`
    );
    
    if (!response.ok) {
      throw new Error('Erro ao obter informações da página Facebook');
    }
    
    return response.json();
  }

  private static async getWhatsAppPhoneInfo(accessToken: string, phoneNumberId: string) {
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${phoneNumberId}?access_token=${accessToken}`
    );
    
    if (!response.ok) {
      throw new Error('Erro ao obter informações do WhatsApp Business');
    }
    
    return response.json();
  }

  private static async getTelegramBotInfo(botToken: string) {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/getMe`);
    
    if (!response.ok) {
      throw new Error('Erro ao obter informações do bot Telegram');
    }
    
    const data = await response.json();
    if (!data.ok) {
      throw new Error('Token do bot Telegram inválido');
    }
    
    return data.result;
  }

  // Publicar conteúdo
  static async publishToInstagram(accountId: string, content: PostContent): Promise<PostResult> {
    try {
      const account = await this.getConnectedAccount('instagram', accountId);
      if (!account) throw new Error('Conta Instagram não encontrada');

      // Implementar publicação no Instagram
      // Por enquanto, simular sucesso
      return {
        success: true,
        platformPostId: 'ig_' + Date.now(),
        platformUrl: `https://instagram.com/p/mock_${Date.now()}`
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      };
    }
  }

  static async publishToFacebook(accountId: string, content: PostContent): Promise<PostResult> {
    try {
      const account = await this.getConnectedAccount('facebook', accountId);
      if (!account) throw new Error('Página Facebook não encontrada');

      // Implementar publicação no Facebook
      return {
        success: true,
        platformPostId: 'fb_' + Date.now(),
        platformUrl: `https://facebook.com/mock_${Date.now()}`
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      };
    }
  }

  static async sendWhatsAppMessage(accountId: string, phoneNumber: string, message: string): Promise<PostResult> {
    try {
      const account = await this.getConnectedAccount('whatsapp', accountId);
      if (!account) throw new Error('Conta WhatsApp não encontrada');

      // Implementar envio via WhatsApp Business API
      return {
        success: true,
        platformPostId: 'wa_' + Date.now()
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      };
    }
  }

  static async sendTelegramMessage(accountId: string, chatId: string, message: string): Promise<PostResult> {
    try {
      const account = await this.getConnectedAccount('telegram', accountId);
      if (!account) throw new Error('Bot Telegram não encontrado');

      const response = await fetch(`https://api.telegram.org/bot${account.access_token}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML'
        })
      });

      const data = await response.json();
      
      if (!data.ok) {
        throw new Error(data.description || 'Erro ao enviar mensagem');
      }

      return {
        success: true,
        platformPostId: data.result.message_id.toString()
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      };
    }
  }

  private static async getConnectedAccount(platform: string, accountId: string) {
    const user = await supabase.auth.getUser();
    if (!user.data.user) throw new Error('Usuário não autenticado');

    const { data, error } = await supabase
      .from('connected_accounts')
      .select('*')
      .eq('user_id', user.data.user.id)
      .eq('platform', platform)
      .eq('id', accountId)
      .eq('is_active', true)
      .single();

    if (error) {
      console.error('Erro ao buscar conta conectada:', error);
      return null;
    }

    return data;
  }
}
