```typescript
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import SocialAuthManager from '../../components/social/SocialAuthManager';
import { useSocialAuth } from '../../hooks/useSocialAuth';
import { toast } from 'sonner';

// Mock do hook useSocialAuth
vi.mock('../../hooks/useSocialAuth', () => ({
  useSocialAuth: vi.fn()
}));

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn()
  }
}));

describe('SocialAuthManager', () => {
  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();
    
    // Mock padrão para o useSocialAuth
    (useSocialAuth as any).mockReturnValue({
      accounts: [],
      isLoading: false,
      error: null,
      connectAccount: vi.fn(),
      disconnectAccount: vi.fn(),
      refreshToken: vi.fn(),
      isTokenExpired: vi.fn().mockReturnValue(false),
      getAccountsByPlatform: vi.fn().mockReturnValue([])
    });
  });

  it('deve renderizar corretamente o componente sem contas conectadas', () => {
    render(<SocialAuthManager />);
    
    expect(screen.getByRole('heading', { name: /Contas Conectadas/i })).toBeInTheDocument();
    expect(screen.getByText(/Conecte suas redes sociais/i)).toBeInTheDocument();
  });
  
  it('deve mostrar o loader quando estiver carregando', () => {
    (useSocialAuth as any).mockReturnValue({
      accounts: [],
      isLoading: true,
      error: null,
      connectAccount: vi.fn(),
      disconnectAccount: vi.fn(),
      refreshToken: vi.fn(),
      isTokenExpired: vi.fn(),
      getAccountsByPlatform: vi.fn()
    });
    
    render(<SocialAuthManager />);
    
    expect(screen.getByLabelText(/Carregando contas.../i)).toBeInTheDocument();
  });
  
  it('deve mostrar mensagem de erro quando houver erro', async () => {
    const errorMessage = "Erro ao carregar contas";
    (useSocialAuth as any).mockReturnValue({
      accounts: [],
      isLoading: false,
      error: errorMessage,
      connectAccount: vi.fn(),
      disconnectAccount: vi.fn(),
      refreshToken: vi.fn(),
      isTokenExpired: vi.fn(),
      getAccountsByPlatform: vi.fn()
    });
    
    render(<SocialAuthManager />);
    
    await waitFor(() => expect(screen.getByText(new RegExp(errorMessage, "i"))).toBeInTheDocument());
    expect(toast.error).toHaveBeenCalledWith('Erro ao carregar contas conectadas');
  });
  
  it('deve listar as contas conectadas', () => {
    const mockAccounts = [
      {
        id: '1',
        platform: 'instagram',
        username: '@testuser',
        accessToken: 'mock_token_1',
        isActive: true,
        profile_picture_url: 'https://example.com/pic.jpg'
      },
      {
        id: '2',
        platform: 'facebook',
        username: 'fbuser',
        accessToken: 'mock_token_2',
        isActive: true,
        profile_picture_url: 'https://example.com/pic.jpg'
      }
    ];
    
    (useSocialAuth as any).mockReturnValue({
      accounts: mockAccounts,
      isLoading: false,
      error: null,
      connectAccount: vi.fn(),
      disconnectAccount: vi.fn(),
      refreshToken: vi.fn(),
      isTokenExpired: vi.fn().mockReturnValue(false),
      getAccountsByPlatform: vi.fn().mockReturnValue(mockAccounts)
    });
    
    render(<SocialAuthManager />);
    
    expect(screen.getByText(/@testuser/i)).toBeInTheDocument();
    expect(screen.getByText(/instagram/i)).toBeInTheDocument();
    expect(screen.getByText(/fbuser/i)).toBeInTheDocument();
    expect(screen.getByText(/facebook/i)).toBeInTheDocument();
  });
  
  it('deve chamar connectAccount ao clicar em conectar', async () => {
    const mockConnectAccount = vi.fn();
    
    (useSocialAuth as any).mockReturnValue({
      accounts: [],
      isLoading: false,
      error: null,
      connectAccount: mockConnectAccount,
      disconnectAccount: vi.fn(),
      refreshToken: vi.fn(),
      isTokenExpired: vi.fn(),
      getAccountsByPlatform: vi.fn().mockReturnValue([])
    });
    
    render(<SocialAuthManager />);
    
    // Clicar no botão de conectar Instagram
    const connectButton = screen.getByRole('button', { name: /Instagram/i });
    fireEvent.click(connectButton);
    
    // Verificar se a função foi chamada com o parâmetro correto
    await waitFor(() => expect(mockConnectAccount).toHaveBeenCalledWith('instagram'));
    expect(toast.success).toHaveBeenCalled();
  });
  
  it('deve chamar disconnectAccount ao clicar em desconectar', async () => {
    const mockDisconnectAccount = vi.fn();
    const mockAccounts = [
      {
        id: '1',
        platform: 'instagram',
        username: 'testuser',
        accessToken: 'mock_token_1',
        isActive: true,
        profile_picture_url: 'https://example.com/pic.jpg'
      }
    ];
    
    (useSocialAuth as any).mockReturnValue({
      accounts: mockAccounts,
      isLoading: false,
      error: null,
      connectAccount: vi.fn(),
      disconnectAccount: mockDisconnectAccount,
      refreshToken: vi.fn(),
      isTokenExpired: vi.fn().mockReturnValue(false),
      getAccountsByPlatform: vi.fn().mockReturnValue(mockAccounts)
    });
    
    render(<SocialAuthManager />);
    
    // Clicar no botão de desconectar
    const disconnectButton = screen.getByRole('button', { name: /Desativar/i });
    fireEvent.click(disconnectButton);
    
    // Verificar se a função foi chamada com o parâmetro correto
    await waitFor(() => expect(mockDisconnectAccount).toHaveBeenCalledWith('1'));
    expect(toast.success).toHaveBeenCalled();
  });

  it('deve chamar toggleAccountStatus ao clicar em Ativar/Desativar', async () => {
    const mockToggleAccountStatus = vi.fn();
    const mockAccounts = [
      {
        id: '1',
        platform: 'instagram',
        username: 'testuser',
        accessToken: 'mock_token_1',
        isActive: true,
        profile_picture_url: 'https://example.com/pic.jpg'
      }
    ];

    (useSocialAuth as any).mockReturnValue({
      accounts: mockAccounts,
      isLoading: false,
      error: null,
      connectAccount: vi.fn(),
      disconnectAccount: vi.fn(),
      refreshToken: vi.fn(),
      isTokenExpired: vi.fn().mockReturnValue(false),
      getAccountsByPlatform: vi.fn().mockReturnValue(mockAccounts),
      toggleAccountStatus: mockToggleAccountStatus
    });

    render(<SocialAuthManager />);

    const toggleButton = screen.getByRole('button', { name: /Desativar/i });
    fireEvent.click(toggleButton);
    await waitFor(() => expect(mockToggleAccountStatus).toHaveBeenCalledWith('1'));
    expect(toast.success).toHaveBeenCalled();
  });


});
```