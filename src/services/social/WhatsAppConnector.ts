import SocialMediaConnector, { 
  AuthConfig, 
  PostContent, 
  PostResult, 
  SocialAccount 
} from './SocialMediaConnector");

/**
 * WhatsAppConnector - Implementação específica para integração com WhatsApp Business API (via Meta)
 */
export class WhatsAppConnector extends SocialMediaConnector {
  private apiVersion = 'v17.0'; // Versão da API do WhatsApp Business (Meta)
  private baseUrl = 'https://graph.facebook.com'; // API do WhatsApp é hospedada pela Meta
  private phoneNumberId: string | null = null;
  private businessAccountId: string | null = null;

  constructor(authConfig: AuthConfig, phoneNumberId?: string, businessAccountId?: string) {
    super(authConfig);
    this.phoneNumberId = phoneNumberId || null;
    this.businessAccountId = businessAccountId || null;
  }

  protected getPlatformName(): string {
    return 'WhatsApp';
  }

  /**
   * Gera a URL de autorização para o fluxo OAuth do Facebook/WhatsApp Business
   * Nota: A autenticação real geralmente envolve configuração no Meta Business Suite
   * e uso de tokens de sistema ou tokens de acesso de longa duração.
   * Este fluxo OAuth é mais para obter permissões iniciais.
   */
  getAuthorizationUrl(): string {
    const params = new URLSearchParams({
      client_id: this.authConfig.clientId,
      redirect_uri: this.authConfig.redirectUri,
      scope: this.authConfig.scopes.join(','), // Scopes para WhatsApp Business Management
      response_type: 'code',
      state: this.generateRandomState() // Método herdado
    });
    // A URL de diálogo pode variar dependendo da configuração da App
    return `https://www.facebook.com/${this.apiVersion}/dialog/oauth?${params.toString()}`;
  }

  /**
   * Processa o código de autorização (simulação)
   * A obtenção real do token para WhatsApp Business API é diferente.
   */
  async handleAuthorizationCode(code: string): Promise<SocialAccount> {
    try {
      // Simulação - A API real não usa troca de código dessa forma para tokens de API
      // Geralmente, o token é gerado no Meta Business Suite.
      // Simulamos a obtenção de um token e dados da conta.
      const tokenResponse = await this.simulateWhatsAppApiTokenAcquisition();

      this.phoneNumberId = tokenResponse.phone_number_id;
      this.businessAccountId = tokenResponse.business_id;

      this.account = {
        id: tokenResponse.phone_number_id, // Usando phone_number_id como ID principal
        platform: 'whatsapp',
        username: `+${tokenResponse.phone_number}`, // Número de telefone como username
        displayName: tokenResponse.display_name || `WhatsApp (${tokenResponse.phone_number})`,
        profilePictureUrl: tokenResponse.profile_picture_url,
        isConnected: true,
        lastSyncTime: new Date(),
        accessToken: tokenResponse.access_token, // Este é o token da API
        refreshToken: undefined, // API do WhatsApp geralmente não usa refresh tokens
        tokenExpiry: undefined // Tokens da API podem ser permanentes ou ter longa duração
      };

      return this.account;
    } catch (error) {
      console.error('Erro ao processar código de autorização (simulação) WhatsApp:', error);
      throw new Error('Falha na autenticação simulada com WhatsApp Business API');
    }
  }

  /**
   * Atualiza o token de acesso se necessário.
   * Para WhatsApp API, os tokens são geralmente de longa duração ou permanentes.
   */
  async refreshAccessTokenIfNeeded(): Promise<boolean> {
    // Tokens da WhatsApp Business API geralmente não expiram ou têm longa duração.
    // Não há fluxo de refresh padrão como OAuth2.
    if (!this.isAuthenticated() || !this.account?.accessToken) {
      return false;
    }
    // Assume que o token é válido se a conta estiver conectada.
    // Uma verificação real poderia fazer uma chamada simples à API (ex: verificar status da conta).
    console.debug(`[${this.getPlatformName()}] Verificação de token não aplicável ou simplificada.`);
    return true;
  }

  /**
   * Envia uma mensagem no WhatsApp (para contato ou grupo)
   */
  async publishPost(content: PostContent): Promise<PostResult> {
    if (!this.isAuthenticated() || !this.phoneNumberId || !this.account?.accessToken) {
      return this.createErrorResult('Não autenticado, phoneNumberId não configurado ou token ausente');
    }

    // Não há refresh de token no sentido OAuth2
    // await this.refreshAccessTokenIfNeeded();

    const validation = this.validateContent(content);
    if (!validation.isValid) {
      return this.createErrorResult(validation.errors.join(', '));
    }

    try {
      const messageData = this.formatContent(content);
      // Simulação do envio de mensagem (específico do WhatsApp)
      const result = await this.simulateSendMessage(messageData);

      return {
        success: true,
        postId: result.messages[0]?.id, // ID da mensagem retornada pela API
        timestamp: new Date(),
        platform: 'whatsapp'
        // URL não aplicável para mensagens do WhatsApp
      };
    } catch (error: any) {
      return this.createErrorResult(error.message || 'Erro ao enviar mensagem');
    }
  }

  /**
   * Agenda uma mensagem para envio futuro no WhatsApp
   * Nota: A API oficial não suporta agendamento nativo. Isso deve ser feito pela aplicação.
   */
  async schedulePost(content: PostContent, scheduledTime: Date): Promise<PostResult> {
    // A API do WhatsApp não suporta agendamento. A lógica deve ser externa.
    console.warn(`[${this.getPlatformName()}] Agendamento não suportado nativamente pela API. A lógica deve ser implementada externamente.`);
    // Simulamos um ID de agendamento para fins de exemplo
    const validation = this.validateContent({ ...content, scheduledTime });
    if (!validation.isValid) {
      return this.createErrorResult(validation.errors.join(', '));
    }

    return {
      success: true,
      postId: 'schedule_' + this.generateRandomState(), // ID de agendamento simulado
      timestamp: new Date(),
      platform: 'whatsapp',
      error: 'Agendamento simulado. Implementação real necessária no backend.'
    };
  }

  /**
   * Obtém métricas de uma mensagem enviada (status)
   */
  async getPostMetrics(messageId: string): Promise<any> {
    if (!this.isAuthenticated() || !this.account?.accessToken) {
      throw new Error('Não autenticado ou token ausente');
    }

    try {
      // Simulação da obtenção de status da mensagem (específico do WhatsApp)
      return await this.simulateGetMessageStatus(messageId);
    } catch (error) {
      console.error('Erro ao obter métricas/status da mensagem WhatsApp:', error);
      throw new Error('Falha ao obter métricas/status da mensagem');
    }
  }

  /**
   * Desconecta a conta atual (apenas localmente, token pode continuar válido)
   */
  async disconnect(): Promise<boolean> {
    // Não há um endpoint padrão para revogar tokens da WhatsApp Business API.
    // A desconexão é principalmente local.
    console.warn(`[${this.getPlatformName()}] Desconectando localmente. O token da API pode permanecer ativo.`);
    this.clearAccountData();
    return true;
  }

  /**
   * Implementação vazia para revogar token (não aplicável)
   */
  protected async revokeToken(token: string): Promise<void> {
    console.warn(`[${this.getPlatformName()}] Revogação de token não aplicável/suportada.`);
    return Promise.resolve();
  }

  /**
   * Limpa dados específicos do WhatsApp ao desconectar
   */
  protected clearAccountData(): void {
    super.clearAccountData();
    this.phoneNumberId = null;
    this.businessAccountId = null;
  }

  /**
   * Envia mensagem para um grupo do WhatsApp (requer API específica ou soluções alternativas)
   */
  async sendToGroup(groupId: string, content: PostContent): Promise<PostResult> {
    console.warn(`[${this.getPlatformName()}] Envio para grupos requer configuração específica ou pode não ser suportado diretamente pela API Business padrão.`);
    // Adapta o 'recipient' para a simulação
    const groupContent = {
      ...content,
      recipient: { type: 'group', id: groupId }
    };
    // Reutiliza a lógica de envio individual para simulação
    return this.publishPost(groupContent);
  }

  /**
   * Formata o conteúdo de acordo com as especificações da API do WhatsApp
   */
  protected formatContent(content: PostContent): any {
    const recipientId = (content as any).recipient?.id;
    if (!recipientId) {
      throw new Error('Destinatário (recipient.id) não especificado no conteúdo.');
    }

    const formattedContent: any = {
      messaging_product: 'whatsapp',
      recipient_type: (content as any).recipient?.type === 'group' ? 'group' : 'individual',
      to: recipientId,
    };

    if (content.text) {
      formattedContent.type = 'text';
      formattedContent.text = { preview_url: true, body: content.text.substring(0, 4096) };
    } else if (content.media && content.media.length > 0) {
      const media = content.media[0];
      // A API real requer ID da mídia (após upload) ou link público
      formattedContent.type = media.type; // 'image', 'video', 'audio', 'document'
      formattedContent[media.type] = {
        link: media.url, // Assume link público para simulação
        caption: media.altText?.substring(0, 1024) || undefined
      };
    } else if (content.link) {
        // Envio de links geralmente é feito no corpo do texto com preview_url=true
        formattedContent.type = 'text';
        let body = content.link.title ? `${content.link.title}\n` : '';
        body += content.link.description ? `${content.link.description}\n` : '';
        body += content.link.url;
        formattedContent.text = { preview_url: true, body: body.substring(0, 4096) };
    } else {
        throw new Error('Conteúdo inválido para WhatsApp: deve conter texto, mídia ou link.');
    }

    return formattedContent;
  }

  /**
   * Validação específica para conteúdo do WhatsApp
   */
  validateContent(content: PostContent): { isValid: boolean; errors: string[] } {
    const baseValidation = super.validateContent(content);
    const errors = [...baseValidation.errors];

    if (!(content as any).recipient?.id) {
      errors.push('É necessário especificar um destinatário (recipient.id: número ou ID de grupo)');
    }
    if (content.text && content.text.length > 4096) {
      errors.push('O texto da mensagem não pode exceder 4096 caracteres');
    }
    if (content.media && content.media.length > 1) {
      errors.push('O WhatsApp permite apenas uma mídia por mensagem via API padrão');
    }
    if (content.media && content.media[0]?.altText && content.media[0].altText.length > 1024) {
        errors.push('A legenda da mídia não pode exceder 1024 caracteres');
    }
    // Validação de tipo de mídia (exemplo)
    const allowedMediaTypes = ['image', 'video', 'audio', 'document'];
    if (content.media && !allowedMediaTypes.includes(content.media[0].type)) {
        errors.push(`Tipo de mídia inválido: ${content.media[0].type}. Permitidos: ${allowedMediaTypes.join(', ')}`);
    }

    return { isValid: errors.length === 0, errors };
  }

  // --- Métodos Auxiliares Específicos (Simulação) ---

  private async simulateWhatsAppApiTokenAcquisition(): Promise<any> {
    // Simula a obtenção de um token de API e dados associados
    console.warn(`[${this.getPlatformName()}] simulateWhatsAppApiTokenAcquisition chamado. Em produção, use o token real da API.`);
    const phoneNumber = '55119' + Math.floor(Math.random() * 100000000).toString().padStart(8, '0');
    return {
      access_token: 'WA_API_TOKEN_' + this.generateRandomState(),
      phone_number: phoneNumber,
      phone_number_id: Math.floor(Math.random() * 1000000000000000).toString(),
      business_id: Math.floor(Math.random() * 1000000000000000).toString(),
      display_name: 'Empresa Simulada WhatsApp',
      profile_picture_url: 'https://placehold.co/400x400/25D366/ffffff?text=WA'
      // Não há refresh token ou expiry padrão para tokens de API
    };
  }

  private async simulateSendMessage(messageData: any): Promise<any> {
    // Simulação da API de envio de mensagens
    console.debug(`[${this.getPlatformName()}] Simulando envio para: ${messageData.to}, tipo: ${messageData.type}`);
    return {
      messaging_product: 'whatsapp',
      contacts: [{ input: messageData.to, wa_id: messageData.to }],
      messages: [{ id: 'wamid.' + this.generateRandomState() + this.generateRandomState() }]
    };
  }

  private async simulateGetMessageStatus(messageId: string): Promise<any> {
    // Simulação da API para obter status da mensagem
    const statuses = ['sent', 'delivered', 'read', 'failed', 'deleted'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    return {
      id: messageId,
      status: randomStatus,
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 60000)).toISOString(), // Timestamp recente
      conversation: randomStatus !== 'failed' ? { id: 'conv_' + this.generateRandomState() } : undefined,
      pricing: randomStatus !== 'failed' ? { billable: true, pricing_model: 'CBP', category: 'business_initiated' } : undefined,
      errors: randomStatus === 'failed' ? [{ code: 131026, title: 'Message Undeliverable' }] : undefined
    };
  }

  private createErrorResult(error: string): PostResult {
    return {
      success: false,
      error,
      timestamp: new Date(),
      platform: 'whatsapp'
    };
  }
}

export default WhatsAppConnector;

