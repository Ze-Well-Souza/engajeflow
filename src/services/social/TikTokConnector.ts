import SocialMediaConnector, { 
  AuthConfig, 
  PostContent, 
  PostResult, 
  SocialAccount 
} from './SocialMediaConnector");

/**
 * TikTokConnector - Implementação específica para integração com TikTok API
 */
export class TikTokConnector extends SocialMediaConnector {
  private apiVersion = 'v2';
  private baseUrl = 'https://open.tiktokapis.com';
  private openId: string | null = null;

  constructor(authConfig: AuthConfig, openId?: string) {
    super(authConfig);
    this.openId = openId || null;
  }

  protected getPlatformName(): string {
    return 'TikTok';
  }

  /**
   * Gera a URL de autorização para o fluxo OAuth do TikTok
   */
  getAuthorizationUrl(): string {
    const params = new URLSearchParams({
      client_key: this.authConfig.clientId, // TikTok usa client_key
      redirect_uri: this.authConfig.redirectUri,
      scope: this.authConfig.scopes.join(','), // TikTok usa vírgula
      response_type: 'code',
      state: this.generateRandomState() // Método herdado
    });
    return `https://www.tiktok.com/auth/authorize?${params.toString()}`;
  }

  /**
   * Processa o código de autorização recebido após o redirecionamento OAuth
   */
  async handleAuthorizationCode(code: string): Promise<SocialAccount> {
    try {
      // Usa simulação da classe base para troca de código por token
      // A API real do TikTok requer client_key e client_secret
      const tokenResponse = await this.simulateTokenExchange(code, { grant_type: 'authorization_code' });

      if (!tokenResponse.open_id) {
        throw new Error('Resposta da API do TikTok não contém open_id.');
      }
      this.openId = tokenResponse.open_id;

      // Simulação da obtenção de informações do usuário (específico do TikTok)
      const userInfo = await this.simulateGetUserInfo(tokenResponse.access_token, this.openId);

      this.account = {
        id: this.openId,
        platform: 'tiktok',
        username: userInfo.display_name, // TikTok usa display_name
        displayName: userInfo.display_name,
        profilePictureUrl: userInfo.avatar_url_100, // Usar avatar menor
        isConnected: true,
        lastSyncTime: new Date(),
        accessToken: tokenResponse.access_token,
        refreshToken: tokenResponse.refresh_token,
        tokenExpiry: new Date(Date.now() + tokenResponse.expires_in * 1000)
      };

      return this.account;
    } catch (error) {
      console.error('Erro ao processar código de autorização TikTok:', error);
      throw new Error('Falha na autenticação com TikTok API');
    }
  }

  /**
   * Atualiza o token de acesso se necessário, usando a lógica base
   */
  async refreshAccessTokenIfNeeded(): Promise<boolean> {
    // TikTok tokens geralmente expiram em 24h, usamos threshold de 1 hora
    return this.baseRefreshAccessTokenIfNeeded(60);
  }

  /**
   * Publica conteúdo no TikTok (simulação)
   * Nota: A API real tem limitações e requer upload prévio.
   */
  async publishPost(content: PostContent): Promise<PostResult> {
    if (!this.isAuthenticated() || !this.openId || !this.account?.accessToken) {
      return this.createErrorResult('Não autenticado, openId não configurado ou token ausente');
    }

    if (!await this.refreshAccessTokenIfNeeded()) {
      return this.createErrorResult('Falha ao atualizar token de acesso');
    }

    const validation = this.validateContent(content);
    if (!validation.isValid) {
      return this.createErrorResult(validation.errors.join(', '));
    }

    try {
      const postData = this.formatContent(content);
      // Simulação da publicação (específico do TikTok)
      const result = await this.simulateCreatePost(postData);

      return {
        success: true,
        postId: result.data?.video?.id, // ID do vídeo retornado pela API simulada
        url: `https://www.tiktok.com/@${this.account?.username}/video/${result.data?.video?.id}`,
        timestamp: new Date(),
        platform: 'tiktok'
      };
    } catch (error: any) {
      return this.createErrorResult(error.message || 'Erro ao publicar conteúdo');
    }
  }

  /**
   * Agenda uma publicação para um momento futuro no TikTok (simulação)
   * Nota: A API oficial não suporta agendamento nativo.
   */
  async schedulePost(content: PostContent, scheduledTime: Date): Promise<PostResult> {
    console.warn(`[${this.getPlatformName()}] Agendamento não suportado nativamente pela API. A lógica deve ser implementada externamente.`);
    const validation = this.validateContent({ ...content, scheduledTime });
    if (!validation.isValid) {
      return this.createErrorResult(validation.errors.join(', '));
    }
    // Simula um ID de agendamento
    return {
      success: true,
      postId: 'schedule_tt_' + this.generateRandomState(),
      timestamp: new Date(),
      platform: 'tiktok',
      error: 'Agendamento simulado. Implementação real necessária no backend.'
    };
  }

  /**
   * Obtém métricas de uma publicação (vídeo)
   */
  async getPostMetrics(videoId: string): Promise<any> {
    if (!this.isAuthenticated() || !this.account?.accessToken) {
      throw new Error('Não autenticado ou token ausente');
    }

    if (!await this.refreshAccessTokenIfNeeded()) {
      throw new Error('Falha ao atualizar token de acesso');
    }

    try {
      // Simulação da obtenção de métricas (específico do TikTok)
      return await this.simulateGetVideoMetrics(videoId);
    } catch (error) {
      console.error('Erro ao obter métricas da publicação TikTok:', error);
      throw new Error('Falha ao obter métricas da publicação');
    }
  }

  /**
   * Obtém informações da conta do TikTok
   */
  async getAccountInfo(): Promise<any> {
    if (!this.isAuthenticated() || !this.openId || !this.account?.accessToken) {
      throw new Error('Não autenticado, openId não configurado ou token ausente');
    }

    if (!await this.refreshAccessTokenIfNeeded()) {
      throw new Error('Falha ao atualizar token de acesso');
    }

    try {
      // Simulação da obtenção de informações da conta (específico do TikTok)
      return await this.simulateGetUserInfo(this.account.accessToken, this.openId);
    } catch (error) {
      console.error('Erro ao obter informações da conta TikTok:', error);
      throw new Error('Falha ao obter informações da conta');
    }
  }

  /**
   * Obtém vídeos da conta do TikTok
   */
  async getVideos(limit: number = 10): Promise<any[]> {
    if (!this.isAuthenticated() || !this.openId || !this.account?.accessToken) {
      throw new Error('Não autenticado, openId não configurado ou token ausente');
    }

    if (!await this.refreshAccessTokenIfNeeded()) {
      throw new Error('Falha ao atualizar token de acesso');
    }

    try {
      // Simulação da obtenção de vídeos (específico do TikTok)
      const response = await this.simulateGetVideos(limit);
      return response.data?.videos || [];
    } catch (error) {
      console.error('Erro ao obter vídeos TikTok:', error);
      throw new Error('Falha ao obter vídeos');
    }
  }

  /**
   * Formata o conteúdo de acordo com as especificações da API do TikTok
   */
  protected formatContent(content: PostContent): any {
    const formattedContent: any = {
      post_info: {
        title: content.text?.substring(0, 150) || '', // Título é opcional e limitado
        description: content.text || '',
        // Outros campos como privacy_level, comment_disabled, etc.
      },
      source_info: {
        source: 'FILE_UPLOAD', // Ou PULL_FROM_URL
        video_url: (content.media && content.media[0]?.type === 'video') ? content.media[0].url : undefined
      }
    };
    return formattedContent;
  }

  /**
   * Validação específica para conteúdo do TikTok
   */
  validateContent(content: PostContent): { isValid: boolean; errors: string[] } {
    const baseValidation = super.validateContent(content);
    const errors = [...baseValidation.errors];

    if (content.text && content.text.length > 2200) {
      errors.push('A descrição não pode exceder 2.200 caracteres');
    }
    if (!content.media || content.media.length === 0) {
      errors.push('É necessário incluir um vídeo');
    } else if (content.media.length > 1) {
      errors.push('O TikTok permite apenas um vídeo por publicação');
    } else if (content.media[0].type !== 'video') {
      errors.push('O TikTok só aceita conteúdo do tipo vídeo');
    }
    // TikTok não suporta agendamento via API padrão
    if (content.scheduledTime) {
        errors.push('Agendamento não é suportado nativamente pela API do TikTok.');
    }

    return { isValid: errors.length === 0, errors };
  }

  /**
   * Implementação da revogação de token para TikTok (usa simulação base)
   */
  protected async revokeToken(token: string): Promise<void> {
    // A API real pode ter um endpoint específico ou a revogação ser feita pelo usuário
    await this.simulateRevokeToken(token);
  }

  /**
   * Limpa dados específicos do TikTok ao desconectar
   */
  protected clearAccountData(): void {
    super.clearAccountData();
    this.openId = null;
  }

  // --- Métodos Auxiliares Específicos (Simulação) ---

  private async simulateGetUserInfo(accessToken: string, openId: string): Promise<any> {
    // Simulação da API /user/info/
    return {
      data: {
        user: {
          open_id: openId,
          union_id: 'union_tt_' + this.generateRandomState(),
          avatar_url: 'https://placehold.co/400x400/000000/ffffff?text=TT',
          avatar_url_100: 'https://placehold.co/100x100/000000/ffffff?text=TT',
          display_name: 'Usuário TikTok Simulado',
          bio_description: 'Bio simulada.',
          profile_deep_link: `https://www.tiktok.com/@simulateduser_${openId.substring(0, 5)}`,
          is_verified: false,
          follower_count: Math.floor(Math.random() * 10000),
          following_count: Math.floor(Math.random() * 1000),
          likes_count: Math.floor(Math.random() * 50000)
        }
      },
      error: { code: 0, message: 'Success' }
    };
  }

  private async simulateCreatePost(postData: any): Promise<any> {
    // Simulação da API /share/video/upload/
    console.debug(`[${this.getPlatformName()}] Simulando criação de post com dados:`, postData);
    const videoId = Math.floor(Math.random() * 1000000000000000000).toString();
    return {
      data: {
        share_id: 'share_' + this.generateRandomState(),
        video: {
          id: videoId
        }
      },
      error: { code: 0, message: 'Success', log_id: this.generateRandomState() }
    };
  }

  private async simulateGetVideoMetrics(videoId: string): Promise<any> {
    // Simulação da API /video/query/
    const views = Math.floor(Math.random() * 10000);
    const likes = Math.floor(views * (Math.random() * 0.2 + 0.05)); // 5-25% likes
    const comments = Math.floor(views * (Math.random() * 0.1 + 0.01)); // 1-11% comments
    const shares = Math.floor(views * (Math.random() * 0.05 + 0.005)); // 0.5-5.5% shares
    return {
      data: {
        videos: [
          {
            id: videoId,
            create_time: Math.floor(Date.now() / 1000) - Math.floor(Math.random() * 86400 * 7),
            // ... outros dados do vídeo
            stats: {
              view_count: views,
              like_count: likes,
              comment_count: comments,
              share_count: shares,
              favorite_count: Math.floor(likes * 0.1) // Simulação
            }
          }
        ]
      },
      error: { code: 0, message: 'Success' }
    };
  }

  private async simulateGetVideos(limit: number): Promise<any> {
    // Simulação da API /video/list/
    const videos = [];
    for (let i = 0; i < limit; i++) {
      const videoId = Math.floor(Math.random() * 1000000000000000000).toString();
      videos.push({
        id: videoId,
        create_time: Math.floor(Date.now() / 1000) - i * 86400,
        cover_image_url: `https://placehold.co/400x720/000000/ffffff?text=TT_Vid_${i + 1}`,
        share_url: `https://www.tiktok.com/@simulateduser/video/${videoId}`,
        video_description: `Descrição simulada vídeo ${i + 1}`,
        duration: Math.floor(Math.random() * 50) + 10,
        stats: {
          view_count: Math.floor(Math.random() * 10000),
          like_count: Math.floor(Math.random() * 1000),
          comment_count: Math.floor(Math.random() * 100),
          share_count: Math.floor(Math.random() * 50)
        }
      });
    }
    return {
      data: {
        videos,
        cursor: Math.random() > 0.3 ? Math.floor(Date.now() / 1000) - limit * 86400 : 0,
        has_more: Math.random() > 0.3
      },
      error: { code: 0, message: 'Success' }
    };
  }

  private createErrorResult(error: string): PostResult {
    return {
      success: false,
      error,
      timestamp: new Date(),
      platform: 'tiktok'
    };
  }
}

export default TikTokConnector;

