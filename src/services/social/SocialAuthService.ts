
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

export interface AuthConfig {
  clientId: string;
  clientSecret?: string;
  redirectUri: string;
  scopes: string[];
}

export class SocialAuthService {
  private accounts: Map<string, SocialAccount> = new Map();
  private authConfig: Record<string, AuthConfig> = {
    instagram: {
      clientId: "instagram_client_id",
      clientSecret: "instagram_client_secret",
      redirectUri: `${window.location.origin}/auth/callback`,
      scopes: ["user_profile", "user_media"]
    },
    facebook: {
      clientId: "facebook_client_id",
      clientSecret: "facebook_client_secret",
      redirectUri: `${window.location.origin}/auth/callback`,
      scopes: ["pages_show_list", "pages_read_engagement", "pages_manage_posts"]
    },
    twitter: {
      clientId: "twitter_client_id",
      clientSecret: "twitter_client_secret",
      redirectUri: `${window.location.origin}/auth/callback`,
      scopes: ["tweet.read", "tweet.write", "users.read"]
    },
    youtube: {
      clientId: "youtube_client_id",
      clientSecret: "youtube_client_secret",
      redirectUri: `${window.location.origin}/auth/callback`,
      scopes: ["https://www.googleapis.com/auth/youtube"]
    }
  };
  
  constructor() {
    // Carregar contas do localStorage se existirem
    this.loadAccounts();
  }
  
  private loadAccounts(): void {
    try {
      const savedAccounts = localStorage.getItem('socialAccounts');
      if (savedAccounts) {
        const parsed = JSON.parse(savedAccounts);
        Object.keys(parsed).forEach(id => {
          const account = parsed[id];
          if (account.lastSyncTime) {
            account.lastSyncTime = new Date(account.lastSyncTime);
          }
          if (account.tokenExpiry) {
            account.tokenExpiry = new Date(account.tokenExpiry);
          }
          this.accounts.set(id, account);
        });
      }
    } catch (error) {
      console.error("Erro ao carregar contas salvas:", error);
    }
  }
  
  private saveAccounts(): void {
    try {
      const accountsObject: Record<string, SocialAccount> = {};
      this.accounts.forEach((account, id) => {
        accountsObject[id] = account;
      });
      localStorage.setItem('socialAccounts', JSON.stringify(accountsObject));
    } catch (error) {
      console.error("Erro ao salvar contas:", error);
    }
  }
  
  public getAuthorizationUrl(platform: string): string {
    const config = this.authConfig[platform];
    if (!config) {
      throw new Error(`Plataforma não suportada: ${platform}`);
    }
    
    // Implementação de mock para gerar URLs de autorização
    switch (platform) {
      case 'instagram':
        return `https://api.instagram.com/oauth/authorize?client_id=${config.clientId}&redirect_uri=${encodeURIComponent(config.redirectUri)}&scope=${encodeURIComponent(config.scopes.join(','))}&response_type=code`;
      
      case 'facebook':
        return `https://www.facebook.com/v11.0/dialog/oauth?client_id=${config.clientId}&redirect_uri=${encodeURIComponent(config.redirectUri)}&scope=${encodeURIComponent(config.scopes.join(','))}&response_type=code`;
      
      case 'twitter':
        return `https://twitter.com/i/oauth2/authorize?client_id=${config.clientId}&redirect_uri=${encodeURIComponent(config.redirectUri)}&scope=${encodeURIComponent(config.scopes.join(' '))}&response_type=code&state=state&code_challenge=challenge&code_challenge_method=plain`;
      
      case 'youtube':
        return `https://accounts.google.com/o/oauth2/auth?client_id=${config.clientId}&redirect_uri=${encodeURIComponent(config.redirectUri)}&scope=${encodeURIComponent(config.scopes.join(' '))}&response_type=code&access_type=offline`;
      
      default:
        throw new Error(`Plataforma não suportada: ${platform}`);
    }
  }
  
  public async handleAuthCallback(platform: string, code: string): Promise<SocialAccount> {
    // Simulação do processo de troca de código por tokens
    console.log(`Trocando código por tokens para plataforma ${platform}`);
    
    // Gerar conta simulada
    const newId = Math.random().toString(36).substring(2, 15);
    const account: SocialAccount = {
      id: newId,
      platform,
      username: `user_${platform}_${newId.substring(0, 5)}`,
      displayName: `Conta ${platform.charAt(0).toUpperCase() + platform.slice(1)}`,
      profilePictureUrl: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 99)}.jpg`,
      isConnected: true,
      lastSyncTime: new Date(),
      accessToken: `mock_access_token_${newId}`,
      refreshToken: `mock_refresh_token_${newId}`,
      tokenExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 dias no futuro
    };
    
    this.accounts.set(newId, account);
    this.saveAccounts();
    
    return account;
  }
  
  public async refreshToken(accountId: string): Promise<boolean> {
    const account = this.accounts.get(accountId);
    if (!account || !account.refreshToken) {
      return false;
    }
    
    try {
      console.log(`Renovando token para ${account.platform}, conta ${account.username}`);
      
      // Simulação de renovação
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedAccount: SocialAccount = {
        ...account,
        accessToken: `new_access_token_${Math.random().toString(36).substring(7)}`,
        lastSyncTime: new Date(),
        tokenExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 dias no futuro
      };
      
      this.accounts.set(accountId, updatedAccount);
      this.saveAccounts();
      
      return true;
    } catch (error) {
      console.error("Erro ao renovar token:", error);
      return false;
    }
  }
  
  public async disconnectAccount(accountId: string): Promise<boolean> {
    const account = this.accounts.get(accountId);
    if (!account) {
      return false;
    }
    
    try {
      // Simulação de desconexão com API
      console.log(`Desconectando conta ${account.username} da plataforma ${account.platform}`);
      
      this.accounts.delete(accountId);
      this.saveAccounts();
      
      return true;
    } catch (error) {
      console.error("Erro ao desconectar conta:", error);
      return false;
    }
  }
  
  public getAccountsByPlatform(platform?: string): SocialAccount[] {
    const accounts: SocialAccount[] = [];
    
    this.accounts.forEach(account => {
      if (!platform || account.platform === platform) {
        accounts.push({ ...account });
      }
    });
    
    return accounts;
  }
  
  public getAccountById(id: string): SocialAccount | undefined {
    const account = this.accounts.get(id);
    return account ? { ...account } : undefined;
  }
  
  public clearAllAccounts(): void {
    this.accounts.clear();
    this.saveAccounts();
  }
}

export default new SocialAuthService();
