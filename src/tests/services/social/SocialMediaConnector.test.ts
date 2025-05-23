import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import SocialMediaConnector, { AuthConfig, PostContent, PostResult } from '../../../services/social/SocialMediaConnector';

// Implementação concreta para testes
class TestSocialConnector extends SocialMediaConnector {
  getAuthorizationUrl(): string {
    return `https://test-social.com/auth?client_id=${this.authConfig.clientId}&redirect_uri=${encodeURIComponent(this.authConfig.redirectUri)}`;
  }

  async handleAuthorizationCode(code: string) {
    const tokenResponse = await this.simulateTokenExchange(code);
    this.account = {
      id: 'test-user-123',
      platform: 'test-platform',
      username: 'testuser',
      displayName: 'Test User',
      profilePictureUrl: 'https://example.com/profile.jpg',
      isConnected: true,
      lastSyncTime: new Date(),
      accessToken: tokenResponse.access_token,
      refreshToken: tokenResponse.refresh_token,
      tokenExpiry: new Date(Date.now() + tokenResponse.expires_in * 1000)
    };
    return this.account;
  }

  async refreshAccessTokenIfNeeded(): Promise<boolean> {
    return this.baseRefreshAccessTokenIfNeeded(10);
  }

  async publishPost(content: PostContent): Promise<PostResult> {
    if (!this.isAuthenticated()) {
      return { success: false, error: 'Não autenticado', timestamp: new Date(), platform: 'test-platform' };
    }
    
    const validation = this.validateContent(content);
    if (!validation.isValid) {
      return { success: false, error: validation.errors.join(', '), timestamp: new Date(), platform: 'test-platform' };
    }
    
    return {
      success: true,
      postId: 'post-' + Math.random().toString(36).substring(2, 10),
      url: 'https://test-social.com/posts/123',
      timestamp: new Date(),
      platform: 'test-platform'
    };
  }

  async schedulePost(content: PostContent, scheduledTime: Date): Promise<PostResult> {
    if (!this.isAuthenticated()) {
      return { success: false, error: 'Não autenticado', timestamp: new Date(), platform: 'test-platform' };
    }
    
    const validation = this.validateContent({...content, scheduledTime});
    if (!validation.isValid) {
      return { success: false, error: validation.errors.join(', '), timestamp: new Date(), platform: 'test-platform' };
    }
    
    return {
      success: true,
      postId: 'scheduled-' + Math.random().toString(36).substring(2, 10),
      scheduledTime,
      timestamp: new Date(),
      platform: 'test-platform'
    };
  }

  async getPostMetrics(postId: string): Promise<any> {
    if (!this.isAuthenticated()) {
      throw new Error('Não autenticado');
    }
    
    return {
      likes: 42,
      comments: 7,
      shares: 3,
      views: 120
    };
  }

  protected getPlatformName(): string {
    return 'TestPlatform';
  }

  protected async revokeToken(token: string): Promise<void> {
    return this.simulateRevokeToken(token);
  }
}

describe('SocialMediaConnector', () => {
  let connector: TestSocialConnector;
  const authConfig: AuthConfig = {
    clientId: 'test-client-id',
    clientSecret: 'test-client-secret',
    redirectUri: 'https://app.example.com/auth/callback',
    scopes: ['read', 'write', 'publish']
  };
  
  beforeEach(() => {
    connector = new TestSocialConnector(authConfig);
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'info').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });
  
  afterEach(() => {
    vi.restoreAllMocks();
  });
  
  describe('Autenticação', () => {
    it('deve gerar URL de autorização correta', () => {
      const url = connector.getAuthorizationUrl();
      expect(url).toContain(authConfig.clientId);
      expect(url).toContain(encodeURIComponent(authConfig.redirectUri));
    });
    
    it('deve processar código de autorização e configurar conta', async () => {
      const account = await connector.handleAuthorizationCode('test-auth-code');
      
      expect(account).toBeDefined();
      expect(account.id).toBe('test-user-123');
      expect(account.platform).toBe('test-platform');
      expect(account.isConnected).toBe(true);
      expect(account.accessToken).toBeDefined();
      expect(account.refreshToken).toBeDefined();
      expect(account.tokenExpiry).toBeInstanceOf(Date);
    });
    
    it('deve verificar autenticação corretamente', async () => {
      expect(connector.isAuthenticated()).toBe(false);
      
      await connector.handleAuthorizationCode('test-auth-code');
      expect(connector.isAuthenticated()).toBe(true);
      
      await connector.disconnect();
      expect(connector.isAuthenticated()).toBe(false);
    });
    
    it('deve atualizar token quando necessário', async () => {
      await connector.handleAuthorizationCode('test-auth-code');
      
      // Manipular data de expiração para forçar refresh
      const account = connector.getAccount();
      if (account) {
        account.tokenExpiry = new Date(Date.now() - 1000); // Já expirado
      }
      
      const result = await connector.refreshAccessTokenIfNeeded();
      expect(result).toBe(true);
      
      const updatedAccount = connector.getAccount();
      expect(updatedAccount?.accessToken).toBeDefined();
      expect(updatedAccount?.tokenExpiry).toBeInstanceOf(Date);
      expect(updatedAccount?.tokenExpiry.getTime()).toBeGreaterThan(Date.now());
    });
    
    it('deve desconectar conta corretamente', async () => {
      await connector.handleAuthorizationCode('test-auth-code');
      expect(connector.isAuthenticated()).toBe(true);
      
      const result = await connector.disconnect();
      expect(result).toBe(true);
      expect(connector.isAuthenticated()).toBe(false);
      expect(connector.getAccount()).toBeNull();
    });
  });
  
  describe('Publicação de conteúdo', () => {
    beforeEach(async () => {
      await connector.handleAuthorizationCode('test-auth-code');
    });
    
    it('deve publicar conteúdo com sucesso', async () => {
      const content: PostContent = {
        text: 'Teste de publicação via API',
        media: [
          { type: 'image', url: 'https://example.com/image.jpg', altText: 'Descrição da imagem' }
        ]
      };
      
      const result = await connector.publishPost(content);
      expect(result.success).toBe(true);
      expect(result.postId).toBeDefined();
      expect(result.url).toBeDefined();
      expect(result.timestamp).toBeInstanceOf(Date);
    });
    
    it('deve falhar ao publicar conteúdo vazio', async () => {
      const emptyContent: PostContent = {};
      
      const result = await connector.publishPost(emptyContent);
      expect(result.success).toBe(false);
      expect(result.error).toContain('não pode estar vazio');
    });
    
    it('deve agendar publicação com sucesso', async () => {
      const content: PostContent = {
        text: 'Publicação agendada para teste'
      };
      
      const scheduledTime = new Date(Date.now() + 24 * 60 * 60 * 1000); // Amanhã
      const result = await connector.schedulePost(content, scheduledTime);
      
      expect(result.success).toBe(true);
      expect(result.postId).toBeDefined();
      expect(result.scheduledTime).toEqual(scheduledTime);
    });
    
    it('deve falhar ao agendar para data no passado', async () => {
      const content: PostContent = {
        text: 'Publicação com data inválida'
      };
      
      const pastDate = new Date(Date.now() - 24 * 60 * 60 * 1000); // Ontem
      const result = await connector.schedulePost(content, pastDate);
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('não pode ser no passado');
    });
    
    it('deve obter métricas de publicação', async () => {
      const metrics = await connector.getPostMetrics('test-post-id');
      
      expect(metrics).toBeDefined();
      expect(metrics.likes).toBeDefined();
      expect(metrics.comments).toBeDefined();
      expect(metrics.views).toBeDefined();
    });
    
    it('deve falhar ao obter métricas sem autenticação', async () => {
      await connector.disconnect();
      
      await expect(connector.getPostMetrics('test-post-id')).rejects.toThrow('Não autenticado');
    });
  });
  
  describe('Métodos auxiliares', () => {
    it('deve validar conteúdo corretamente', () => {
      const validContent: PostContent = {
        text: 'Conteúdo válido'
      };
      
      const emptyContent: PostContent = {};
      
      const pastScheduledContent: PostContent = {
        text: 'Conteúdo com agendamento no passado',
        scheduledTime: new Date(Date.now() - 1000)
      };
      
      expect(connector.validateContent(validContent).isValid).toBe(true);
      expect(connector.validateContent(emptyContent).isValid).toBe(false);
      expect(connector.validateContent(pastScheduledContent).isValid).toBe(false);
    });
  });
});
