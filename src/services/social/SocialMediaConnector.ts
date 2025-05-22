/**
 * SocialMediaConnector - Classe base para conectores de mídias sociais
 * 
 * Esta classe define a interface comum e funcionalidades básicas para todos os conectores
 * de mídias sociais, garantindo uma implementação consistente e facilitando a adição
 * de novas plataformas no futuro.
 */

export interface AuthConfig {
  clientId: string;
  clientSecret?: string;
  redirectUri: string;
  scopes: string[];
  apiKey?: string;
}

export interface PostContent {
  text?: string;
  media?: {
    type: 'image' | 'video' | 'audio' | 'document';
    url: string;
    altText?: string;
  }[];
  link?: {
    url: string;
    title?: string;
    description?: string;
    thumbnailUrl?: string;
  };
  scheduledTime?: Date;
}

export interface PostResult {
  success: boolean;
  postId?: string;
  url?: string;
  error?: string;
  timestamp: Date;
  platform: string;
}

export interface SocialAccount {
  id: string;
  platform: string;
  username: string;
  displayName: string;
  profilePictureUrl?: string;
  isConnected: boolean;
  lastSyncTime?: Date;
  accessToken?: string;
  refreshToken?: string;
  tokenExpiry?: Date;
}

export abstract class SocialMediaConnector {
  protected authConfig: AuthConfig;
  protected account: SocialAccount | null = null;
  
  constructor(authConfig: AuthConfig) {
    this.authConfig = authConfig;
  }
  
  /**
   * Gera a URL de autorização para o fluxo OAuth
   */
  abstract getAuthorizationUrl(): string;
  
  /**
   * Processa o código de autorização recebido após o redirecionamento OAuth
   */
  abstract handleAuthorizationCode(code: string): Promise<SocialAccount>;
  
  /**
   * Verifica se o token de acesso atual é válido e o atualiza se necessário
   */
  abstract refreshAccessTokenIfNeeded(): Promise<boolean>;
  
  /**
   * Publica conteúdo na plataforma
   */
  abstract publishPost(content: PostContent): Promise<PostResult>;
  
  /**
   * Agenda uma publicação para um momento futuro
   */
  abstract schedulePost(content: PostContent, scheduledTime: Date): Promise<PostResult>;
  
  /**
   * Obtém métricas e estatísticas de uma publicação
   */
  abstract getPostMetrics(postId: string): Promise<any>;
  
  /**
   * Desconecta a conta atual
   */
  abstract disconnect(): Promise<boolean>;
  
  /**
   * Verifica se o conector está autenticado
   */
  isAuthenticated(): boolean {
    return this.account !== null && this.account.isConnected;
  }
  
  /**
   * Obtém informações da conta conectada
   */
  getAccount(): SocialAccount | null {
    return this.account;
  }
  
  /**
   * Valida o conteúdo antes da publicação
   */
  validateContent(content: PostContent): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    // Validações básicas comuns a todas as plataformas
    if (!content.text && !content.media?.length && !content.link) {
      errors.push('O conteúdo da publicação não pode estar vazio');
    }
    
    // Validação específica para agendamento
    if (content.scheduledTime && content.scheduledTime < new Date()) {
      errors.push('A data de agendamento não pode ser no passado');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
  
  /**
   * Formata o conteúdo de acordo com as especificações da plataforma
   */
  protected formatContent(content: PostContent): any {
    // Implementação base que será sobrescrita por cada plataforma
    return content;
  }
}

export default SocialMediaConnector;
