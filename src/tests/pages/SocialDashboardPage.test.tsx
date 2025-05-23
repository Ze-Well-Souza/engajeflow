
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import SocialDashboardPage from '../../pages/SocialDashboardPage';
import { useSocialAuth } from '../../hooks/useSocialAuth';

// Mock para o componente SocialAuthManager
vi.mock('../../components/social/SocialAuthManager', () => ({
  default: ({ onAccountConnected }: any) => (
    <div data-testid="social-auth-manager">
      <button onClick={() => onAccountConnected({
        id: 'new-account',
        platform: 'instagram',
        username: 'newuser',
        displayName: 'New User',
        isConnected: true
      })}>
        Simular Nova Conta
      </button>
    </div>
  )
}));

// Mock para o hook useSocialAuth
vi.mock('../../hooks/useSocialAuth', () => ({
  useSocialAuth: vi.fn()
}));

describe('SocialDashboardPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock padrão para o useSocialAuth
    (useSocialAuth as any).mockReturnValue({
      accounts: [],
      isLoading: false,
      error: null,
      getAccountsByPlatform: vi.fn().mockReturnValue([])
    });
  });
  
  it('deve renderizar corretamente o dashboard', () => {
    render(<SocialDashboardPage />);
    
    expect(screen.getByText(/Dashboard de Redes Sociais/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Agendar Publicação/i })).toBeInTheDocument();
  });
  
  it('deve exibir as tabs corretamente', () => {
    render(<SocialDashboardPage />);
    
    expect(screen.getByRole('tab', { name: /Visão Geral/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Publicações/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Análises/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Contas/i })).toBeInTheDocument();
  });
  
  it('deve alternar entre tabs quando clicadas', () => {
    render(<SocialDashboardPage />);
    
    // A tab "Visão Geral" deve estar ativa por padrão
    const overviewTab = screen.getByRole('tab', { name: /Visão Geral/i });
    expect(overviewTab).toHaveAttribute('aria-selected', 'true');
    
    // Clicar na tab "Contas"
    const accountsTab = screen.getByRole('tab', { name: /Contas/i });
    fireEvent.click(accountsTab);
    
    // Verificar se a tab "Contas" está agora ativa
    expect(accountsTab).toHaveAttribute('aria-selected', 'true');
    expect(overviewTab).toHaveAttribute('aria-selected', 'false');
    
    // Verificar se o conteúdo da tab "Contas" está sendo exibido
    expect(screen.getByTestId('social-auth-manager')).toBeInTheDocument();
  });
  
  it('deve atualizar o contador de contas conectadas quando uma nova conta é adicionada', () => {
    render(<SocialDashboardPage />);
    
    // Inicialmente deve mostrar 0 contas conectadas
    expect(screen.getByText('0')).toBeInTheDocument(); // O contador de contas conectadas
    
    // Clicar na tab "Contas"
    const accountsTab = screen.getByRole('tab', { name: /Contas/i });
    fireEvent.click(accountsTab);
    
    // Simular a conexão de uma nova conta
    const connectButton = screen.getByText('Simular Nova Conta');
    fireEvent.click(connectButton);
    
    // Voltar para a tab "Visão Geral"
    const overviewTab = screen.getByRole('tab', { name: /Visão Geral/i });
    fireEvent.click(overviewTab);
    
    // Verificar se o contador foi atualizado para 1
    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
