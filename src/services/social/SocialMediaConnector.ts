
export interface AuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scopes: string[];
}

export interface PostContent {
  text: string;
  media?: File[];
  hashtags?: string[];
  link?: string;
}

export interface PostResult {
  success: boolean;
  postId?: string;
  error?: string;
}

export interface SocialAccount {
  id: string;
  platform: string;
  username: string;
  displayName: string;
  isConnected: boolean;
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: string;
}

export abstract class SocialMediaConnector {
  protected platform: string;
  
  constructor(platform: string) {
    this.platform = platform;
  }
  
  abstract authenticate(): Promise<boolean>;
  abstract post(content: string, media?: File[]): Promise<boolean>;
  abstract getMetrics(): Promise<any>;
  
  // Métodos opcionais com implementação padrão
  getAuthorizationUrl?(): string;
  handleAuthorizationCode?(code: string): Promise<SocialAccount>;
  refreshAccessTokenIfNeeded?(account: SocialAccount): Promise<boolean>;
  publishPost?(content: PostContent): Promise<PostResult>;
  revokeToken?(accountId: string): Promise<boolean>;
  getPlatformName?(): string;
  
  getPlatform(): string {
    return this.platform;
  }
}
