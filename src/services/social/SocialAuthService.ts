
/**
 * Serviço de autenticação para redes sociais
 */

export interface SocialAccount {
  id: string;
  platform: string;
  username: string;
  accessToken: string;
  refreshToken?: string;
  expiresAt?: string;
  isActive: boolean;
  profile_picture_url?: string;
  displayName: string;
  isConnected: boolean;
}

class SocialAuthService {
  async connectAccount(platform: string): Promise<SocialAccount> {
    // Simulação de conexão de conta
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      id: Math.random().toString(36).substr(2, 9),
      platform,
      username: `usuario_${platform}`,
      accessToken: 'token_simulado',
      isActive: true,
      displayName: `Usuário ${platform}`,
      isConnected: true
    };
  }

  async disconnectAccount(accountId: string): Promise<boolean> {
    // Simulação de desconexão
    await new Promise(resolve => setTimeout(resolve, 500));
    return true;
  }

  async getConnectedAccounts(): Promise<SocialAccount[]> {
    // Simulação de contas conectadas
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return [
      {
        id: '1',
        platform: 'instagram',
        username: 'minha_conta_insta',
        accessToken: 'token1',
        isActive: true,
        displayName: 'Minha Conta Instagram',
        isConnected: true
      },
      {
        id: '2',
        platform: 'facebook',
        username: 'minha_pagina_fb',
        accessToken: 'token2',
        isActive: true,
        displayName: 'Minha Página Facebook',
        isConnected: true
      }
    ];
  }

  async refreshToken(accountId: string): Promise<string> {
    // Simulação de renovação de token
    await new Promise(resolve => setTimeout(resolve, 500));
    return 'novo_token_' + Math.random().toString(36).substr(2, 9);
  }
}

export default new SocialAuthService();
