import SocialMediaConnector, { 
  AuthConfig, 
  PostContent, 
  PostResult, 
  SocialAccount 
} from './SocialMediaConnector";

/**
 * InstagramConnector - Implementação específica para integração com Instagram Graph API
 */
export class InstagramConnector extends SocialMediaConnector {
  private apiVersion = 'v17.0';
  private baseUrl = 'https://graph.facebook.com'; // Instagram API uses Facebook Graph
  private instagramBusinessAccountId: string | null = null;
  private facebookPageId: string | null = null; // Needed to find the IG Business Account

  constructor(authConfig: AuthConfig, instagramBusinessAccountId?: string, facebookPageId?: string) {
    super(authConfig);
    this.instagramBusinessAccountId = instagramBusinessAccountId || null;
    this.facebookPageId = facebookPageId || null;
  }

  protected getPlatformName(): string {
    return 'Instagram';
  }

  /**
   * Gera a URL de autorização para o fluxo OAuth do Facebook/Instagram
   */
  getAuthorizationUrl(): string {
    const params = new URLSearchParams({
      client_id: this.authConfig.clientId,
      redirect_uri: this.authConfig.redirectUri,
      scope: this.authConfig.scopes.join(','), // Scopes for Instagram/Facebook
      response_type: 'code',
      state: this.generateRandomState() // Método herdado
    });
    return `https://www.facebook.com/${this.apiVersion}/dialog/oauth?${params.toString()}`;
  }

  /**
   * Processa o código de autorização recebido após o redirecionamento OAuth
   */
  async handleAuthorizationCode(code: string): Promise<SocialAccount> {
    try {
      // Usa simulação da classe base para troca de código por token
      const tokenResponse = await this.simulateTokenExchange(code);

      // Simulação da obtenção de páginas do Facebook (necessário para encontrar a conta IG)
      const pagesResponse = await this.simulateGetPages(tokenResponse.access_token);

      let instagramAccountData = null;
      let associatedPageId = this.facebookPageId;

      // Tenta encontrar a conta IG associada à página especificada ou à primeira página encontrada
      if (associatedPageId) {
        instagramAccountData = await this.findInstagramAccountForPage(associatedPageId, pagesResponse.data, tokenResponse.access_token);
      } else if (pagesResponse.data.length > 0) {
        associatedPageId = pagesResponse.data[0].id;
        instagramAccountData = await this.findInstagramAccountForPage(associatedPageId, pagesResponse.data, tokenResponse.access_token);
      }

      if (!instagramAccountData) {
        throw new Error('Nenhuma conta de negócio do Instagram encontrada ou associada à página do Facebook.');
      }

      this.instagramBusinessAccountId = instagramAccountData.id;
      this.facebookPageId = associatedPageId; // Guarda o ID da página associada

      this.account = {
        id: instagramAccountData.id,
        platform: 'instagram',
        username: instagramAccountData.username,
        displayName: instagramAccountData.name || instagramAccountData.username,
        profilePictureUrl: instagramAccountData.profile_picture_url,
        isConnected: true,
        lastSyncTime: new Date(),
        accessToken: tokenResponse.access_token,
        refreshToken: tokenResponse.refresh_token,
        tokenExpiry: new Date(Date.now() + tokenResponse.expires_in * 1000)
      };

      return this.account;
    } catch (error) {
      console.error('Erro ao processar código de autorização Instagram:', error);
      throw new Error('Falha na autenticação com Instagram Graph API');
    }
  }

  /**
   * Atualiza o token de acesso se necessário, usando a lógica base
   */
  async refreshAccessTokenIfNeeded(): Promise<boolean> {
    // Instagram usa o mesmo fluxo de token do Facebook, threshold de 60 minutos
    return this.baseRefreshAccessTokenIfNeeded(60);
  }

  /**
   * Publica conteúdo no Instagram
   */
  async publishPost(content: PostContent): Promise<PostResult> {
    if (!this.isAuthenticated() || !this.instagramBusinessAccountId) {
      return this.createErrorResult('Não autenticado ou conta de negócio do Instagram não configurada');
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
      // Simulação da publicação (específico do Instagram)
      const result = await this.simulateCreatePost(postData);

      return {
        success: true,
        postId: result.id,
        url: `https://www.instagram.com/p/${result.shortcode}/`, // URL típica de post do Instagram
        timestamp: new Date(),
        platform: 'instagram'
      };
    } catch (error: any) {
      return this.createErrorResult(error.message || 'Erro ao publicar conteúdo');
    }
  }

  /**
   * Agenda uma publicação para um momento futuro no Instagram
   */
  async schedulePost(content: PostContent, scheduledTime: Date): Promise<PostResult> {
    if (!this.isAuthenticated() || !this.instagramBusinessAccountId) {
      return this.createErrorResult('Não autenticado ou conta de negócio do Instagram não configurada');
    }

    if (!await this.refreshAccessTokenIfNeeded()) {
      return this.createErrorResult('Falha ao atualizar token de acesso');
    }

    const validation = this.validateContent({ ...content, scheduledTime });
    if (!validation.isValid) {
      return this.createErrorResult(validation.errors.join(', '));
    }

    try {
      // Simulação do agendamento (específico do Instagram)
      const postData = {
        ...this.formatContent(content),
        // A API real pode exigir parâmetros diferentes para agendamento
        is_scheduled: true,
        publish_time: Math.floor(scheduledTime.getTime() / 1000)
      };

      const result = await this.simulateSchedulePost(postData);

      return {
        success: true,
        postId: result.id,
        url: `https://www.instagram.com/p/${result.shortcode}/`,
        timestamp: new Date(),
        platform: 'instagram'
      };
    } catch (error: any) {
      return this.createErrorResult(error.message || 'Erro ao agendar publicação');
    }
  }

  /**
   * Obtém métricas de uma publicação
   */
  async getPostMetrics(postId: string): Promise<any> {
    if (!this.isAuthenticated()) {
      throw new Error('Não autenticado');
    }

    if (!await this.refreshAccessTokenIfNeeded()) {
      throw new Error('Falha ao atualizar token de acesso');
    }

    try {
      // Simulação da obtenção de métricas (específico do Instagram)
      return await this.simulateGetPostInsights(postId);
    } catch (error) {
      console.error('Erro ao obter métricas da publicação Instagram:', error);
      throw new Error('Falha ao obter métricas da publicação');
    }
  }

  /**
   * Obtém informações da conta de negócio do Instagram
   */
  async getAccountInfo(): Promise<any> {
    if (!this.isAuthenticated() || !this.instagramBusinessAccountId || !this.account?.accessToken) {
      throw new Error('Não autenticado ou conta de negócio do Instagram não configurada');
    }

    if (!await this.refreshAccessTokenIfNeeded()) {
      throw new Error('Falha ao atualizar token de acesso');
    }

    try {
      // Simulação da obtenção de informações da conta (específico do Instagram)
      return await this.simulateGetAccountInfo();
    } catch (error) {
      console.error('Erro ao obter informações da conta Instagram:', error);
      throw new Error('Falha ao obter informações da conta');
    }
  }

  /**
   * Formata o conteúdo de acordo com as especificações da API do Instagram
   */
  protected formatContent(content: PostContent): any {
    const formattedContent: any = {
      caption: content.text || ''
    };
    if (content.media && content.media.length > 0) {
      // A API real exige upload prévio da mídia e uso do ID do container
      formattedContent.media_type = content.media[0].type === 'video' ? 'VIDEO' : 'IMAGE';
      formattedContent.media_url = content.media[0].url; // Simplificação para simulação
    }
    return formattedContent;
  }

  /**
   * Validação específica para conteúdo do Instagram
   */
  validateContent(content: PostContent): { isValid: boolean; errors: string[] } {
    const baseValidation = super.validateContent(content);
    const errors = [...baseValidation.errors];

    if (content.text && content.text.length > 2200) {
      errors.push('A legenda não pode exceder 2.200 caracteres');
    }
    if (!content.media || content.media.length === 0) {
      errors.push('É necessário incluir pelo menos uma mídia (imagem ou vídeo)');
    }
    if (content.media && content.media.length > 10) {
      errors.push('O Instagram permite no máximo 10 mídias (carrossel)');
    }
    if (content.scheduledTime) {
      const now = new Date();
      // Limites de agendamento da API do Instagram podem variar
      const twentyFiveMinutesFromNow = new Date(now.getTime() + 25 * 60 * 1000);
      const sixMonthsFromNow = new Date(now.getTime() + 6 * 30 * 24 * 60 * 60 * 1000);
      if (content.scheduledTime < twentyFiveMinutesFromNow) {
        errors.push('A data de agendamento deve ser pelo menos 25 minutos no futuro');
      }
      if (content.scheduledTime > sixMonthsFromNow) {
        errors.push('A data de agendamento não pode ser mais de 6 meses no futuro');
      }
    }
    return { isValid: errors.length === 0, errors };
  }

  /**
   * Implementação da revogação de token para Instagram (usa fluxo do Facebook)
   */
  protected async revokeToken(token: string): Promise<void> {
    // A revogação é feita pela API do Facebook
    await this.simulateRevokeToken(token);
  }

  /**
   * Limpa dados específicos do Instagram ao desconectar
   */
  protected clearAccountData(): void {
    super.clearAccountData();
    this.instagramBusinessAccountId = null;
    this.facebookPageId = null;
  }

  // --- Métodos Auxiliares Específicos (Simulação) ---

  private async simulateGetPages(accessToken: string): Promise<any> {
    // Simulação da API do Facebook para obter páginas
    return {
      data: [
        { id: 'fb_page_1', name: 'Página Empresa Simulada', category: 'Negócio', access_token: 'fb_page_token_1' + Math.random().toString(36).substring(2, 15) },
        { id: 'fb_page_2', name: 'Página Loja Simulada', category: 'Varejo', access_token: 'fb_page_token_2' + Math.random().toString(36).substring(2, 15) }
      ]
    };
  }

  private async findInstagramAccountForPage(pageId: string, pagesData: any[], userAccessToken: string): Promise<any | null> {
    const page = pagesData.find((p: any) => p.id === pageId);
    if (!page) return null;

    // Simula a chamada para obter a conta IG associada à página FB
    const instagramAccounts = await this.simulateGetInstagramAccounts(page.id, page.access_token);
    return instagramAccounts.data.length > 0 ? instagramAccounts.data[0] : null;
  }

  private async simulateGetInstagramAccounts(pageId: string, pageAccessToken: string): Promise<any> {
    // Simulação da API para obter contas IG associadas a uma página FB
    return {
      data: [
        {
          id: 'ig_biz_acc_' + Math.random().toString(36).substring(2, 15),
          username: 'negocio_simulado_ig',
          name: 'Negócio Simulado IG',
          profile_picture_url: 'https://placehold.co/400x400/E1306C/ffffff?text=IG',
          followers_count: Math.floor(Math.random() * 10000),
          media_count: Math.floor(Math.random() * 500)
        }
      ]
    };
  }

  private async simulateCreatePost(postData: any): Promise<any> {
    // Simulação da API do Instagram para criar post (requer upload prévio na real)
    const id = '17' + Math.random().toString().substring(2, 17); // Formato de ID do Instagram
    const shortcode = 'C' + Math.random().toString(36).substring(2, 12).toUpperCase();
    return { id, shortcode, created_time: new Date().toISOString() };
  }

  private async simulateSchedulePost(postData: any): Promise<any> {
    // Simulação da API do Instagram para agendar post
    const id = '17' + Math.random().toString().substring(2, 17);
    const shortcode = 'C' + Math.random().toString(36).substring(2, 12).toUpperCase();
    return { id, shortcode, status: 'SCHEDULED' };
  }

  private async simulateGetPostInsights(postId: string): Promise<any> {
    // Simulação da API do Instagram para obter métricas
    return {
      data: [
        { name: 'impressions', period: 'lifetime', values: [{ value: Math.floor(Math.random() * 5000) }] },
        { name: 'reach', period: 'lifetime', values: [{ value: Math.floor(Math.random() * 3000) }] },
        { name: 'engagement', period: 'lifetime', values: [{ value: Math.floor(Math.random() * 500) }] },
        { name: 'saved', period: 'lifetime', values: [{ value: Math.floor(Math.random() * 100) }] }
      ]
    };
  }

  private async simulateGetAccountInfo(): Promise<any> {
    // Simulação da API do Instagram para obter informações da conta
    return {
      id: this.instagramBusinessAccountId,
      username: this.account?.username,
      name: this.account?.displayName,
      profile_picture_url: this.account?.profilePictureUrl,
      biography: 'Descrição simulada da conta de negócio do Instagram.',
      followers_count: Math.floor(Math.random() * 10000),
      follows_count: Math.floor(Math.random() * 1000),
      media_count: Math.floor(Math.random() * 500),
      website: 'https://example.com'
    };
  }

  private createErrorResult(error: string): PostResult {
    return {
      success: false,
      error,
      timestamp: new Date(),
      platform: 'instagram'
    };
  }
}

export default InstagramConnector;

