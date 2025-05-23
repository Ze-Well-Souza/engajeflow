
import { renderHook, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { useSocialAuth } from '../../hooks/useSocialAuth';
import SocialAuthService from '../../services/social/SocialAuthService';
import { toast } from 'sonner';

// Mock do SocialAuthService
vi.mock('../../services/social/SocialAuthService', () => {
  const mockService = {
    getConnectedAccounts: vi.fn(),
    handleAuthCallback: vi.fn(),
    disconnectAccount: vi.fn(),
    refreshToken: vi.fn(),
    getAuthorizationUrl: vi.fn(),
    connectAccount: vi.fn()
  };
  
  return {
    default: mockService
  };
});

// Mock do toast
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    warning: vi.fn()
  }
}));

describe('useSocialAuth', () => {
  const mockAccounts = [
    {
      id: '1',
      platform: 'instagram',
      username: 'user1',
      displayName: 'Instagram User',
      isConnected: true,
      isActive: true,
      accessToken: 'token1',
      expiresAt: new Date(Date.now() + 1000000).toISOString() // Não expirado
    },
    {
      id: '2',
      platform: 'facebook',
      username: 'user2',
      displayName: 'Facebook User',
      isConnected: true,
      isActive: true,
      accessToken: 'token2',
      expiresAt: new Date(Date.now() - 1000000).toISOString() // Expirado
    }
  ];
  
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Configurar mocks padrão
    (SocialAuthService.getConnectedAccounts as any).mockResolvedValue(mockAccounts);
    (SocialAuthService.disconnectAccount as any).mockResolvedValue(true);
    (SocialAuthService.refreshToken as any).mockResolvedValue(true);
    (SocialAuthService.handleAuthCallback as any).mockResolvedValue(mockAccounts[0]);
    (SocialAuthService.getAuthorizationUrl as any).mockReturnValue('https://mock-auth-url.com');
    (SocialAuthService.connectAccount as any).mockResolvedValue(mockAccounts[0]);
  });
  
  it('deve inicializar com as contas do serviço', () => {
    const { result } = renderHook(() => useSocialAuth());
    
    expect(result.current.accounts).toEqual(mockAccounts);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(SocialAuthService.getConnectedAccounts).toHaveBeenCalled();
  });
  
  it('deve conectar uma nova conta', async () => {
    const { result } = renderHook(() => useSocialAuth());
    
    await act(async () => {
      await result.current.connectAccount('instagram');
    });
    
    expect(SocialAuthService.getAuthorizationUrl).toHaveBeenCalledWith('instagram');
    expect(toast.success).toHaveBeenCalled();
  });
  
  it('deve desconectar uma conta existente', async () => {
    const { result } = renderHook(() => useSocialAuth());
    
    await act(async () => {
      await result.current.disconnectAccount('1');
    });
    
    expect(SocialAuthService.disconnectAccount).toHaveBeenCalledWith('1');
    expect(toast.success).toHaveBeenCalled();
  });
  
  it('deve renovar um token expirado', async () => {
    const { result } = renderHook(() => useSocialAuth());
    
    await act(async () => {
      await result.current.refreshToken('2');
    });
    
    expect(SocialAuthService.refreshToken).toHaveBeenCalledWith('2');
    expect(toast.success).toHaveBeenCalled();
  });
  
  it('deve detectar tokens expirados corretamente', () => {
    const { result } = renderHook(() => useSocialAuth());
    
    // Token não expirado
    expect(result.current.isTokenExpired(mockAccounts[0])).toBe(false);
    
    // Token expirado
    expect(result.current.isTokenExpired(mockAccounts[1])).toBe(true);
  });
  
  it('deve filtrar contas por plataforma', () => {
    const { result } = renderHook(() => useSocialAuth());
    
    // Utilizando o método do hook para filtragem
    expect(result.current.getAccountsByPlatform('instagram').length).toBe(1);
  });
  
  it('deve lidar com erros ao conectar conta', async () => {
    (SocialAuthService.handleAuthCallback as any).mockRejectedValueOnce(new Error('Erro de conexão'));
    (SocialAuthService.connectAccount as any).mockRejectedValueOnce(new Error('Erro de conexão'));
    
    const { result } = renderHook(() => useSocialAuth());
    
    await act(async () => {
      await result.current.connectAccount('instagram');
    });
    
    expect(toast.error).toHaveBeenCalled();
    expect(result.current.error).toBe('Falha ao conectar conta instagram');
  });
  
  it('deve lidar com erros ao desconectar conta', async () => {
    (SocialAuthService.disconnectAccount as any).mockRejectedValueOnce(new Error('Erro de desconexão'));
    
    const { result } = renderHook(() => useSocialAuth());
    
    await act(async () => {
      await result.current.disconnectAccount('1');
    });
    
    expect(toast.error).toHaveBeenCalled();
    expect(result.current.error).toBe('Falha ao desconectar conta');
  });
  
  it('deve lidar com erros ao renovar token', async () => {
    (SocialAuthService.refreshToken as any).mockRejectedValueOnce(new Error('Erro de renovação'));
    
    const { result } = renderHook(() => useSocialAuth());
    
    await act(async () => {
      await result.current.refreshToken('1');
    });
    
    expect(toast.error).toHaveBeenCalled();
    expect(result.current.error).toBe('Falha ao renovar token');
  });
});
