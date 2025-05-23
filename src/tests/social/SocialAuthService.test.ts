
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { SocialAuthService } from '../../services/social/SocialAuthService';

describe('SocialAuthService', () => {
  let service: SocialAuthService;
  
  // Mock localStorage
  const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => { store[key] = value; },
      removeItem: (key: string) => { delete store[key]; },
      clear: () => { store = {}; }
    };
  })();
  
  beforeEach(() => {
    // Configurar mock do localStorage global
    Object.defineProperty(window, 'localStorage', { 
      value: localStorageMock,
      writable: true
    });
    
    // Limpar localStorage para cada teste
    localStorageMock.clear();
    
    // Criar nova instância do serviço para cada teste
    service = new SocialAuthService();
  });
  
  afterEach(() => {
    vi.clearAllMocks();
  });
  
  it('deve inicializar sem nenhuma conta', () => {
    expect(service.getAccountsByPlatform().length).toBe(0);
  });
  
  it('deve gerar URLs de autorização corretamente para diferentes plataformas', () => {
    const instagramUrl = service.getAuthorizationUrl('instagram');
    const facebookUrl = service.getAuthorizationUrl('facebook');
    const twitterUrl = service.getAuthorizationUrl('twitter');
    const youtubeUrl = service.getAuthorizationUrl('youtube');
    
    expect(instagramUrl).toContain('api.instagram.com/oauth/authorize');
    expect(facebookUrl).toContain('www.facebook.com/v11.0/dialog/oauth');
    expect(twitterUrl).toContain('twitter.com/i/oauth2/authorize');
    expect(youtubeUrl).toContain('accounts.google.com/o/oauth2/auth');
  });
  
  it('deve lançar erro para uma plataforma não suportada', () => {
    expect(() => {
      service.getAuthorizationUrl('tiktok' as any);
    }).toThrow('Plataforma não suportada');
  });
  
  it('deve manipular processo de callback e criar conta', async () => {
    const account = await service.handleAuthCallback('instagram', 'test_code');
    
    expect(account).toBeDefined();
    expect(account.platform).toBe('instagram');
    expect(account.isConnected).toBe(true);
    expect(account.accessToken).toBeDefined();
    expect(account.refreshToken).toBeDefined();
    
    // Verificar se a conta foi salva
    const accounts = service.getAccountsByPlatform('instagram');
    expect(accounts.length).toBe(1);
    expect(accounts[0].id).toBe(account.id);
  });
  
  it('deve renovar token corretamente', async () => {
    // Criar uma conta primeiro
    const account = await service.handleAuthCallback('facebook', 'test_code');
    const originalToken = account.accessToken;
    const originalExpiry = account.tokenExpiry;
    
    // Esperar um momento para garantir que o timestamp seja diferente
    await new Promise(resolve => setTimeout(resolve, 10));
    
    // Renovar token
    const success = await service.refreshToken(account.id);
    
    // Verificar se a renovação foi bem-sucedida
    expect(success).toBe(true);
    
    // Verificar se o token foi atualizado
    const updatedAccount = service.getAccountById(account.id);
    expect(updatedAccount).toBeDefined();
    expect(updatedAccount?.accessToken).not.toBe(originalToken);
    expect(updatedAccount?.lastSyncTime).not.toBe(account.lastSyncTime);
    expect(updatedAccount?.tokenExpiry).not.toEqual(originalExpiry);
  });
  
  it('deve falhar ao renovar token para uma conta inexistente', async () => {
    const success = await service.refreshToken('non-existent-id');
    expect(success).toBe(false);
  });
  
  it('deve desconectar conta corretamente', async () => {
    // Criar uma conta primeiro
    const account = await service.handleAuthCallback('twitter', 'test_code');
    
    // Verificar se a conta foi criada
    expect(service.getAccountsByPlatform('twitter').length).toBe(1);
    
    // Desconectar a conta
    const success = await service.disconnectAccount(account.id);
    
    // Verificar se a desconexão foi bem-sucedida
    expect(success).toBe(true);
    
    // Verificar se a conta foi removida
    expect(service.getAccountsByPlatform('twitter').length).toBe(0);
    expect(service.getAccountById(account.id)).toBeUndefined();
  });
  
  it('deve falhar ao desconectar uma conta inexistente', async () => {
    const success = await service.disconnectAccount('non-existent-id');
    expect(success).toBe(false);
  });
  
  it('deve filtrar contas por plataforma corretamente', async () => {
    // Criar contas de várias plataformas
    await service.handleAuthCallback('instagram', 'code1');
    await service.handleAuthCallback('facebook', 'code2');
    await service.handleAuthCallback('twitter', 'code3');
    
    // Verificar a filtragem
    expect(service.getAccountsByPlatform().length).toBe(3); // Todas as contas
    expect(service.getAccountsByPlatform('instagram').length).toBe(1);
    expect(service.getAccountsByPlatform('facebook').length).toBe(1);
    expect(service.getAccountsByPlatform('youtube').length).toBe(0); // Nenhuma conta do YouTube
  });
  
  it('deve limpar todas as contas', async () => {
    // Criar algumas contas
    await service.handleAuthCallback('instagram', 'code1');
    await service.handleAuthCallback('facebook', 'code2');
    
    // Verificar que as contas foram criadas
    expect(service.getAccountsByPlatform().length).toBe(2);
    
    // Limpar todas as contas
    service.clearAllAccounts();
    
    // Verificar que todas as contas foram removidas
    expect(service.getAccountsByPlatform().length).toBe(0);
  });
  
  it('deve carregar contas do localStorage', async () => {
    // Criar e salvar contas
    await service.handleAuthCallback('instagram', 'code1');
    await service.handleAuthCallback('facebook', 'code2');
    
    // Criar nova instância do serviço (deve carregar do localStorage)
    const newService = new SocialAuthService();
    
    // Verificar se as contas foram carregadas
    expect(newService.getAccountsByPlatform().length).toBe(2);
  });
});
