
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import SocialAuthManager from '../../components/social/SocialAuthManager';
import { useSocialAuth } from '../../hooks/useSocialAuth';

// Mock do hook useSocialAuth
vi.mock('../../hooks/useSocialAuth', () => ({
  useSocialAuth: vi.fn()
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
    
    expect(screen.getByText(/Suas Contas Conectadas/i)).toBeInTheDocument();
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
    
    expect(screen.getByText(/Carregando contas.../i)).toBeInTheDocument();
  });
  
  it('deve mostrar mensagem de erro quando houver erro', () => {
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
    
    expect(screen.getByText(new RegExp(errorMessage, "i"))).toBeInTheDocument();
  });
  
  it('deve listar as contas conectadas', () => {
    const mockAccounts = [
      {
        id: '1',
        platform: 'instagram',
        username: 'testuser',
        displayName: 'Test User',
        isConnected: true,
        profilePictureUrl: 'https://example.com/pic.jpg'
      },
      {
        id: '2',
        platform: 'facebook',
        username: 'fbuser',
        displayName: 'FB User',
        isConnected: true
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
    
    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('@testuser')).toBeInTheDocument();
    expect(screen.getByText('FB User')).toBeInTheDocument();
    expect(screen.getByText('@fbuser')).toBeInTheDocument();
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
    const connectButton = screen.getByText(/Instagram/i);
    fireEvent.click(connectButton);
    
    // Verificar se a função foi chamada com o parâmetro correto
    expect(mockConnectAccount).toHaveBeenCalledWith('instagram');
  });
  
  it('deve chamar disconnectAccount ao clicar em desconectar', async () => {
    const mockDisconnectAccount = vi.fn();
    const mockAccounts = [
      {
        id: '1',
        platform: 'instagram',
        username: 'testuser',
        displayName: 'Test User',
        isConnected: true
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
    const disconnectButton = screen.getByLabelText(/Desconectar conta/i);
    fireEvent.click(disconnectButton);
    
    // Verificar se a função foi chamada com o parâmetro correto
    expect(mockDisconnectAccount).toHaveBeenCalledWith('1');
  });
  
  it('deve mostrar indicador de token expirado quando aplicável', () => {
    const mockAccounts = [
      {
        id: '1',
        platform: 'instagram',
        username: 'testuser',
        displayName: 'Test User',
        isConnected: true
      }
    ];
    
    (useSocialAuth as any).mockReturnValue({
      accounts: mockAccounts,
      isLoading: false,
      error: null,
      connectAccount: vi.fn(),
      disconnectAccount: vi.fn(),
      refreshToken: vi.fn(),
      isTokenExpired: vi.fn().mockReturnValue(true), // Token está expirado
      getAccountsByPlatform: vi.fn().mockReturnValue(mockAccounts)
    });
    
    render(<SocialAuthManager />);
    
    expect(screen.getByText(/Token expirado/i)).toBeInTheDocument();
  });
});
