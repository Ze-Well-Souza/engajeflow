import SocialMediaConnector, { 
  AuthConfig, 
  PostContent, 
  PostResult, 
  SocialAccount 
} from './SocialMediaConnector");

/**
 * YouTubeConnector - Implementação específica para integração com YouTube Data API
 */
export class YouTubeConnector extends SocialMediaConnector {
  private apiVersion = 'v3';
  private baseUrl = 'https://www.googleapis.com/youtube';
  private channelId: string | null = null;

  constructor(authConfig: AuthConfig, channelId?: string) {
    super(authConfig);
    this.channelId = channelId || null;
  }

  protected getPlatformName(): string {
    return 'YouTube';
  }

  /**
   * Gera a URL de autorização para o fluxo OAuth do Google/YouTube
   */
  getAuthorizationUrl(): string {
    const params = new URLSearchParams({
      client_id: this.authConfig.clientId,
      redirect_uri: this.authConfig.redirectUri,
      scope: this.authConfig.scopes.join(' '), // Google usa espaço como separador
      response_type: 'code',
      access_type: 'offline', // Solicita refresh token
      prompt: 'consent', // Garante que o usuário veja a tela de consentimento
      state: this.generateRandomState() // Método herdado
    });
    return `https://accounts.google.com/o/oauth2/auth?${params.toString()}`;
  }

  /**
   * Processa o código de autorização recebido após o redirecionamento OAuth
   */
  async handleAuthorizationCode(code: string): Promise<SocialAccount> {
    try {
      // Usa simulação da classe base para troca de código por token
      // A API real do Google requer parâmetros específicos no corpo da requisição
      const tokenResponse = await this.simulateTokenExchange(code, { grant_type: 'authorization_code' });

      // Simulação da obtenção de informações do canal (específico do YouTube)
      const channelInfo = await this.simulateGetChannelInfo(tokenResponse.access_token);

      if (!channelInfo || !channelInfo.id) {
        throw new Error('Não foi possível obter informações do canal do YouTube.');
      }

      this.channelId = channelInfo.id;

      this.account = {
        id: channelInfo.id,
        platform: 'youtube',
        username: channelInfo.snippet.title, // YouTube usa 'title' para nome do canal
        displayName: channelInfo.snippet.title,
        profilePictureUrl: channelInfo.snippet.thumbnails?.default?.url,
        isConnected: true,
        lastSyncTime: new Date(),
        accessToken: tokenResponse.access_token,
        refreshToken: tokenResponse.refresh_token,
        tokenExpiry: new Date(Date.now() + tokenResponse.expires_in * 1000)
      };

      return this.account;
    } catch (error) {
      console.error('Erro ao processar código de autorização YouTube:', error);
      throw new Error('Falha na autenticação com YouTube Data API');
    }
  }

  /**
   * Atualiza o token de acesso se necessário, usando a lógica base
   */
  async refreshAccessTokenIfNeeded(): Promise<boolean> {
    // Google tokens geralmente expiram em 1 hora, usamos threshold de 5 minutos
    return this.baseRefreshAccessTokenIfNeeded(5);
  }

  /**
   * Publica um vídeo no YouTube
   */
  async publishPost(content: PostContent): Promise<PostResult> {
    if (!this.isAuthenticated() || !this.channelId) {
      return this.createErrorResult('Não autenticado ou channelId não configurado');
    }

    if (!await this.refreshAccessTokenIfNeeded()) {
      return this.createErrorResult('Falha ao atualizar token de acesso');
    }

    const validation = this.validateContent(content);
    if (!validation.isValid) {
      return this.createErrorResult(validation.errors.join(', '));
    }

    try {
      const videoData = this.formatContent(content);
      // Simulação da publicação (específico do YouTube)
      const result = await this.simulateUploadVideo(videoData);

      return {
        success: true,
        postId: result.id,
        url: `https://www.youtube.com/watch?v=${result.id}`,
        timestamp: new Date(),
        platform: 'youtube'
      };
    } catch (error: any) {
      return this.createErrorResult(error.message || 'Erro ao publicar vídeo');
    }
  }

  /**
   * Agenda um vídeo para publicação futura no YouTube
   */
  async schedulePost(content: PostContent, scheduledTime: Date): Promise<PostResult> {
    if (!this.isAuthenticated() || !this.channelId) {
      return this.createErrorResult('Não autenticado ou channelId não configurado');
    }

    if (!await this.refreshAccessTokenIfNeeded()) {
      return this.createErrorResult('Falha ao atualizar token de acesso');
    }

    const validation = this.validateContent({ ...content, scheduledTime });
    if (!validation.isValid) {
      return this.createErrorResult(validation.errors.join(', '));
    }

    try {
      // Simulação do agendamento (específico do YouTube)
      const videoData = {
        ...this.formatContent(content),
        status: {
          ...(this.formatContent(content).status || {}),
          privacyStatus: 'private', // Vídeos agendados começam como privados
          publishAt: scheduledTime.toISOString()
        }
      };

      const result = await this.simulateUploadVideo(videoData);

      return {
        success: true,
        postId: result.id,
        url: `https://www.youtube.com/watch?v=${result.id}`,
        timestamp: new Date(),
        platform: 'youtube'
      };
    } catch (error: any) {
      return this.createErrorResult(error.message || 'Erro ao agendar vídeo');
    }
  }

  /**
   * Obtém métricas de um vídeo
   */
  async getPostMetrics(videoId: string): Promise<any> {
    if (!this.isAuthenticated()) {
      throw new Error('Não autenticado');
    }

    if (!await this.refreshAccessTokenIfNeeded()) {
      throw new Error('Falha ao atualizar token de acesso');
    }

    try {
      // Simulação da obtenção de métricas (específico do YouTube)
      return await this.simulateGetVideoMetrics(videoId);
    } catch (error) {
      console.error('Erro ao obter métricas do vídeo YouTube:', error);
      throw new Error('Falha ao obter métricas do vídeo');
    }
  }

  /**
   * Obtém informações do canal do YouTube
   */
  async getChannelInfo(): Promise<any> {
    if (!this.isAuthenticated() || !this.channelId || !this.account?.accessToken) {
      throw new Error('Não autenticado ou channelId não configurado');
    }

    if (!await this.refreshAccessTokenIfNeeded()) {
      throw new Error('Falha ao atualizar token de acesso');
    }

    try {
      // Simulação da obtenção de informações do canal (específico do YouTube)
      return await this.simulateGetChannelInfo(this.account.accessToken);
    } catch (error) {
      console.error('Erro ao obter informações do canal YouTube:', error);
      throw new Error('Falha ao obter informações do canal');
    }
  }

  /**
   * Obtém vídeos do canal do YouTube
   */
  async getVideos(maxResults: number = 10): Promise<any[]> {
    if (!this.isAuthenticated() || !this.channelId || !this.account?.accessToken) {
      throw new Error('Não autenticado ou channelId não configurado');
    }

    if (!await this.refreshAccessTokenIfNeeded()) {
      throw new Error('Falha ao atualizar token de acesso');
    }

    try {
      // Simulação da obtenção de vídeos (específico do YouTube)
      const response = await this.simulateGetVideos(maxResults);
      return response.items;
    } catch (error) {
      console.error('Erro ao obter vídeos YouTube:', error);
      throw new Error('Falha ao obter vídeos');
    }
  }

  /**
   * Formata o conteúdo de acordo com as especificações da API do YouTube
   */
  protected formatContent(content: PostContent): any {
    const formattedContent: any = {
      snippet: {
        title: content.text?.split('\n')[0].substring(0, 100) || 'Vídeo sem título',
        description: content.text?.substring(0, 5000) || '',
        tags: [],
        categoryId: '22' // Default: People & Blogs
      },
      status: {
        privacyStatus: 'public', // Default: public
        selfDeclaredMadeForKids: false
      }
    };

    if (content.text) {
      const hashtags = content.text.match(/#\w+/g);
      if (hashtags) {
        formattedContent.snippet.tags = hashtags.map(tag => tag.substring(1));
      }
    }

    if (content.media && content.media.length > 0 && content.media[0].type === 'video') {
      // A API real requer upload do vídeo, aqui simulamos com a URL
      formattedContent.mediaUrl = content.media[0].url;
      if (content.media[0].altText) {
        // Adiciona altText ao início da descrição se não houver descrição principal
        if (!formattedContent.snippet.description) {
            formattedContent.snippet.description = content.media[0].altText;
        }
      }
    }

    return formattedContent;
  }

  /**
   * Validação específica para conteúdo do YouTube
   */
  validateContent(content: PostContent): { isValid: boolean; errors: string[] } {
    const baseValidation = super.validateContent(content);
    const errors = [...baseValidation.errors];

    if (!content.text?.split('\n')[0]) {
      errors.push('É necessário fornecer um título para o vídeo (primeira linha do texto)');
    } else if (content.text.split('\n')[0].length > 100) {
      errors.push('O título do vídeo (primeira linha) não pode exceder 100 caracteres');
    }
    if (content.text && content.text.length > 5000) {
      errors.push('A descrição do vídeo não pode exceder 5.000 caracteres');
    }
    if (!content.media || content.media.length === 0) {
      errors.push('É necessário incluir um vídeo');
    } else if (content.media.length > 1) {
      errors.push('O YouTube permite apenas um vídeo por publicação');
    } else if (content.media[0].type !== 'video') {
      errors.push('O YouTube só aceita conteúdo do tipo vídeo');
    }
    if (content.scheduledTime) {
      const now = new Date();
      // YouTube pode ter limites diferentes, mas usamos estes para simulação
      const fifteenMinutesFromNow = new Date(now.getTime() + 15 * 60 * 1000);
      const oneYearFromNow = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);
      if (content.scheduledTime < fifteenMinutesFromNow) {
        errors.push('A data de agendamento deve ser pelo menos 15 minutos no futuro');
      }
      if (content.scheduledTime > oneYearFromNow) {
        errors.push('A data de agendamento não pode ser mais de 1 ano no futuro');
      }
    }
    return { isValid: errors.length === 0, errors };
  }

  /**
   * Implementação da revogação de token para Google/YouTube (usa simulação base)
   */
  protected async revokeToken(token: string): Promise<void> {
    // Em produção, faria uma chamada POST para https://oauth2.googleapis.com/revoke?token={token}
    await this.simulateRevokeToken(token);
  }

  /**
   * Limpa dados específicos do YouTube ao desconectar
   */
  protected clearAccountData(): void {
    super.clearAccountData();
    this.channelId = null;
  }

  // --- Métodos Auxiliares Específicos (Simulação) ---

  private async simulateGetChannelInfo(accessToken: string): Promise<any> {
    // Simulação da API do YouTube para obter informações do canal
    const channelId = 'UC' + Math.random().toString(36).substring(2, 20).toUpperCase();
    return {
      kind: 'youtube#channelListResponse',
      items: [
        {
          kind: 'youtube#channel',
          id: channelId,
          snippet: {
            title: 'Canal YouTube Simulado',
            description: 'Descrição simulada do canal.',
            publishedAt: '2020-01-01T00:00:00Z',
            thumbnails: {
              default: { url: 'https://placehold.co/88x88/FF0000/ffffff?text=YT', width: 88, height: 88 },
              medium: { url: 'https://placehold.co/240x240/FF0000/ffffff?text=YT', width: 240, height: 240 },
              high: { url: 'https://placehold.co/800x800/FF0000/ffffff?text=YT', width: 800, height: 800 }
            }
          },
          statistics: {
            viewCount: Math.floor(Math.random() * 100000).toString(),
            subscriberCount: Math.floor(Math.random() * 10000).toString(),
            videoCount: Math.floor(Math.random() * 100).toString()
          }
        }
      ]
    };
  }

  private async simulateUploadVideo(videoData: any): Promise<any> {
    // Simulação da API do YouTube para upload de vídeo
    const videoId = Math.random().toString(36).substring(2, 13);
    return {
      kind: 'youtube#video',
      id: videoId,
      snippet: {
        publishedAt: new Date().toISOString(),
        channelId: this.channelId,
        title: videoData.snippet.title,
        description: videoData.snippet.description,
        tags: videoData.snippet.tags,
        categoryId: videoData.snippet.categoryId,
        channelTitle: this.account?.displayName || 'Canal Simulado',
        thumbnails: {
            default: { url: `https://i.ytimg.com/vi/${videoId}/default.jpg` },
            medium: { url: `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg` },
            high: { url: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` }
        }
      },
      status: {
        uploadStatus: 'processed',
        privacyStatus: videoData.status?.privacyStatus || 'public',
        publishAt: videoData.status?.publishAt,
        license: 'youtube',
        embeddable: true,
        publicStatsViewable: true
      }
    };
  }

  private async simulateGetVideoMetrics(videoId: string): Promise<any> {
    // Simulação da API do YouTube para obter métricas de vídeo
    const views = Math.floor(Math.random() * 10000);
    const likes = Math.floor(views * (Math.random() * 0.1 + 0.01)); // 1-11% likes
    const comments = Math.floor(views * (Math.random() * 0.05 + 0.005)); // 0.5-5.5% comments
    return {
      kind: 'youtube#videoListResponse',
      items: [
        {
          kind: 'youtube#video',
          id: videoId,
          statistics: {
            viewCount: views.toString(),
            likeCount: likes.toString(),
            commentCount: comments.toString(),
            favoriteCount: '0' // Favorite count is deprecated
          }
        }
      ]
    };
  }

  private async simulateGetVideos(maxResults: number): Promise<any> {
    // Simulação da API do YouTube para listar vídeos do canal
    const items = [];
    for (let i = 0; i < maxResults; i++) {
      const videoId = Math.random().toString(36).substring(2, 13);
      items.push({
        kind: 'youtube#searchResult',
        id: { kind: 'youtube#video', videoId },
        snippet: {
          publishedAt: new Date(Date.now() - i * 86400000).toISOString(),
          channelId: this.channelId,
          title: `Vídeo Simulado ${i + 1}`,
          description: `Descrição do vídeo simulado ${i + 1}.`,
          thumbnails: {
            default: { url: `https://i.ytimg.com/vi/${videoId}/default.jpg` },
            medium: { url: `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg` },
            high: { url: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` }
          },
          channelTitle: this.account?.displayName || 'Canal Simulado'
        }
      });
    }
    return { kind: 'youtube#searchListResponse', items };
  }

  private createErrorResult(error: string): PostResult {
    return {
      success: false,
      error,
      timestamp: new Date(),
      platform: 'youtube'
    };
  }
}

export default YouTubeConnector;

