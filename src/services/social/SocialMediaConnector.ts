import { AuthConfig, PostContent, PostResult, SocialAccount } from './SocialMediaConnector';

/**
 * SocialMediaConnector - Classe base para conectores de mídias sociais
 * 
 * Esta classe define a interface comum e funcionalidades básicas para todos os conectores
 * de mídias sociais, garantindo uma implementação consistente e facilitando a adição
 * de novas plataformas no futuro.
 */

export { AuthConfig, PostContent, PostResult, SocialAccount };

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
  async disconnect(): Promise<boolean> {
    if (!this.isAuthenticated() || !this.account?.accessToken) {
      return false;
    }

    try {
      // Tenta revogar o token (simulação ou chamada real)
      await this.revokeToken(this.account.accessToken);
      this.clearAccountData();
      return true;
    } catch (error) {
      console.error(`Erro ao desconectar conta ${this.getPlatformName()}:`, error);
      // Mesmo em caso de erro na revogação, limpa os dados locais
      this.clearAccountData();
      return false;
    }
  }

  /**
   * Método abstrato para revogar o token (deve ser implementado por subclasses)
   */
  protected abstract revokeToken(token: string): Promise<void>;

  /**
   * Limpa os dados da conta localmente
   */
  protected clearAccountData(): void {
    this.account = null;
    // Subclasses podem precisar limpar dados adicionais (ex: pageId, channelId)
  }

  /**
   * Retorna o nome da plataforma (deve ser implementado por subclasses)
   */
  protected abstract getPlatformName(): string;

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

  // --- Métodos Auxiliares Comuns (Simulação) ---

  /**
   * Gera um estado aleatório para o fluxo OAuth
   */
  protected generateRandomState(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  /**
   * Simula a troca de código por token (comum em OAuth2)
   * Subclasses podem sobrescrever ou usar diretamente se a resposta for padrão.
   */
  protected async simulateTokenExchange(code: string, specificParams?: Record<string, string>): Promise<any> {
    console.warn(`[${this.getPlatformName()}] simulateTokenExchange chamado com código: ${code}. Em produção, substitua por chamada real.`);
    // Simulação genérica - subclasses devem ajustar conforme a API real
    return {
      access_token: `${this.getPlatformName().toLowerCase()}_atk_` + Math.random().toString(36).substring(2, 15),
      token_type: 'Bearer',
      expires_in: 3600 + Math.floor(Math.random() * 3600), // Entre 1 e 2 horas
      refresh_token: `${this.getPlatformName().toLowerCase()}_rtk_` + Math.random().toString(36).substring(2, 15),
      scope: this.authConfig.scopes.join(','),
      ...(specificParams || {})
    };
  }

  /**
   * Simula a atualização de token usando refresh token (comum em OAuth2)
   * Subclasses podem sobrescrever ou usar diretamente.
   */
  protected async simulateTokenRefresh(refreshToken: string): Promise<any> {
    console.warn(`[${this.getPlatformName()}] simulateTokenRefresh chamado. Em produção, substitua por chamada real.`);
    if (!refreshToken) throw new Error('Refresh token não fornecido para simulação.');
    // Simulação genérica
    return {
      access_token: `${this.getPlatformName().toLowerCase()}_atk_` + Math.random().toString(36).substring(2, 15),
      token_type: 'Bearer',
      expires_in: 3600 + Math.floor(Math.random() * 3600), // Novo token expira em 1-2 horas
      scope: this.authConfig.scopes.join(','),
      // Geralmente, o refresh token pode ou não ser retornado na atualização
      refresh_token: Math.random() > 0.5 ? refreshToken : undefined
    };
  }

  /**
   * Simula a revogação de um token (comum em OAuth2)
   * Implementação base - subclasses podem sobrescrever se necessário.
   */
  protected async simulateRevokeToken(token: string): Promise<void> {
    console.warn(`[${this.getPlatformName()}] simulateRevokeToken chamado para token. Em produção, substitua por chamada real.`);
    if (!token) throw new Error('Token não fornecido para simulação de revogação.');
    // Simulação: não faz nada, apenas resolve
    return Promise.resolve();
  }

  /**
   * Implementação base para refreshAccessTokenIfNeeded
   * Subclasses devem chamar este método ou implementar sua própria lógica.
   */
  protected async baseRefreshAccessTokenIfNeeded(minutesBeforeExpiry: number = 5): Promise<boolean> {
    if (!this.account || !this.account.refreshToken) {
      console.warn(`[${this.getPlatformName()}] Refresh de token não é possível: conta não conectada ou sem refresh token.`);
      return false;
    }

    if (!this.account.tokenExpiry) {
      console.warn(`[${this.getPlatformName()}] Data de expiração do token desconhecida. Tentando refresh.`);
      // Prossegue para tentar o refresh
    } else {
      const threshold = new Date(Date.now() + minutesBeforeExpiry * 60 * 1000);
      if (this.account.tokenExpiry > threshold) {
        // console.debug(`[${this.getPlatformName()}] Token ainda válido até ${this.account.tokenExpiry.toISOString()}.`);
        return true; // Token ainda é válido
      }
      console.info(`[${this.getPlatformName()}] Token expirando em breve (${this.account.tokenExpiry.toISOString()}). Tentando refresh.`);
    }

    try {
      const tokenResponse = await this.simulateTokenRefresh(this.account.refreshToken);

      // Atualiza os dados da conta com a resposta do refresh
      this.account.accessToken = tokenResponse.access_token;
      if (tokenResponse.refresh_token) {
        // Atualiza o refresh token apenas se um novo for retornado
        this.account.refreshToken = tokenResponse.refresh_token;
      }
      this.account.tokenExpiry = new Date(Date.now() + tokenResponse.expires_in * 1000);
      this.account.lastSyncTime = new Date();

      console.info(`[${this.getPlatformName()}] Token atualizado com sucesso. Nova expiração: ${this.account.tokenExpiry.toISOString()}`);
      return true;
    } catch (error) {
      console.error(`[${this.getPlatformName()}] Erro ao atualizar token de acesso:`, error);
      // Considerar desconectar a conta ou marcar como necessitando re-autenticação
      this.account.isConnected = false;
      return false;
    }
  }
}

export default SocialMediaConnector;

