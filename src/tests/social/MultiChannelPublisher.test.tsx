```typescript
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import MultiChannelPublisher from '../../components/social/MultiChannelPublisher';
import { useSocialAuth } from '../../hooks/useSocialAuth';
import { toast } from 'sonner';

// Mock para useSocialAuth
vi.mock('../../hooks/useSocialAuth', () => ({
  useSocialAuth: vi.fn()
}));

// Mock para toast
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    warning: vi.fn()
  }
}));

describe('MultiChannelPublisher', () => {
  const mockAccounts = [
    {
      id: '1',
      platform: 'instagram',
      username: 'instauser',
      displayName: 'Instagram User',
      isConnected: true
    },
    {
      id: '2',
      platform: 'facebook',
      username: 'fbuser',
      displayName: 'Facebook User',
      isConnected: true
    },
    {
      id: '3',
      platform: 'twitter',
      username: 'twitteruser',
      displayName: 'Twitter User',
      isConnected: true
    },
    {
      id: '4',
      platform: 'youtube',
      username: 'youtubeuser',
      displayName: 'Youtube User',
      isConnected: true
    }
  ];
  
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock padrão para o useSocialAuth
    (useSocialAuth as any).mockReturnValue({
      accounts: mockAccounts,
      isLoading: false,
      error: null,
      getAccountsByPlatform: vi.fn().mockReturnValue(mockAccounts)
    });
  });
  
  it('deve renderizar corretamente', () => {
    render(<MultiChannelPublisher />);
    
    expect(screen.getByRole('heading', { name: /Publicação Multicanal/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/O que você gostaria de compartilhar\?/i)).toBeInTheDocument();
    expect(screen.getByText(/Plataformas/i)).toBeInTheDocument();
  });
  
  it('deve listar as plataformas disponíveis', () => {
    render(<MultiChannelPublisher />);
    
    expect(screen.getByText(/Instagram/i)).toBeInTheDocument();
    expect(screen.getByText(/Facebook/i)).toBeInTheDocument();
    expect(screen.getByText(/Twitter/i)).toBeInTheDocument();
    expect(screen.getByText(/YouTube/i)).toBeInTheDocument();
  });
  
  it('deve permitir digitar mensagem', () => {
    render(<MultiChannelPublisher />);
    
    const messageInput = screen.getByPlaceholderText(/O que você gostaria de compartilhar\?/i);
    fireEvent.change(messageInput, { target: { value: 'Teste de mensagem' } });
    
    expect(messageInput).toHaveValue('Teste de mensagem');
  });
  
  it('deve permitir selecionar plataformas', () => {
    render(<MultiChannelPublisher />);
    
    const instagramCheckbox = screen.getByRole('checkbox', { name: /Instagram/i });
    const facebookCheckbox = screen.getByRole('checkbox', { name: /Facebook/i });
    
    fireEvent.click(instagramCheckbox);
    fireEvent.click(facebookCheckbox);
    
    expect(instagramCheckbox).toBeChecked();
    expect(facebookCheckbox).toBeChecked();
  });
  
  it('deve desabilitar o botão publicar quando não há plataformas selecionadas e nem conteúdo', () => {
    render(<MultiChannelPublisher />);
    
    const publishButton = screen.getByRole('button', { name: /Publicar Agora/i });
    expect(publishButton).toBeDisabled();
  });
  
  it('deve habilitar o botão publicar quando há texto e plataforma selecionada', () => {
    render(<MultiChannelPublisher />);
    
    // Digitar mensagem
    const messageInput = screen.getByPlaceholderText(/O que você gostaria de compartilhar\?/i);
    fireEvent.change(messageInput, { target: { value: 'Teste de mensagem' } });
    
    // Selecionar uma plataforma
    const instagramCheckbox = screen.getByRole('checkbox', { name: /Instagram/i });
    fireEvent.click(instagramCheckbox);
    
    // Verificar se o botão está habilitado
    const publishButton = screen.getByRole('button', { name: /Publicar Agora/i });
    expect(publishButton).not.toBeDisabled();
  });
  
  it('deve mostrar mensagem de sucesso ao publicar', async () => {
    render(<MultiChannelPublisher />);
    
    // Digitar mensagem
    const messageInput = screen.getByPlaceholderText(/O que você gostaria de compartilhar\?/i);
    fireEvent.change(messageInput, { target: { value: 'Teste de mensagem' } });
    
    // Selecionar plataformas
    const instagramCheckbox = screen.getByRole('checkbox', { name: /Instagram/i });
    const facebookCheckbox = screen.getByRole('checkbox', { name: /Facebook/i });
    fireEvent.click(instagramCheckbox);
    fireEvent.click(facebookCheckbox);
    
    // Publicar
    const publishButton = screen.getByRole('button', { name: /Publicar Agora/i });
    fireEvent.click(publishButton);
    
    // Verificar toast de sucesso
    await waitFor(() => expect(toast.success).toHaveBeenCalledWith(expect.stringContaining('Publicação imediata enviada')));
  });
  
  it('deve mostrar caixas de seleção para agendamento', () => {
    render(<MultiChannelPublisher />);
    
    // Ativar opção de agendamento
    const scheduleCheckbox = screen.getByRole('checkbox', { name: /Agendar publicação/i });
    fireEvent.click(scheduleCheckbox);
    
    // Verificar se os campos de data e hora apareceram
    expect(screen.getByRole('button', { name: /Selecione uma data/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Hora/i)).toBeInTheDocument();
  });
  
  it('deve mostrar opção para carregar mídia', () => {
    render(<MultiChannelPublisher />);
    
    expect(screen.getByText(/Adicionar Mídia/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Adicionar/i)).toBeInTheDocument();
  });

  // Testes adicionais sugeridos:
  // 1. Testar o upload de mídias e a exibição das previews.  (Requer mocks para File e URL.createObjectURL)
  // 2. Testar o cenário de erro ao tentar publicar sem conteúdo e sem plataformas selecionadas.
  // 3. Testar a funcionalidade de agendamento com data e hora selecionadas. (Requer mocking do componente Calendar)
  // 4. Testar a remoção de mídia.
  // 5. Testar o comportamento com diferentes quantidades de contas em `mockAccounts`.
  // 6. Adicionar testes para melhor cobertura de código e cenários de edge cases.  


});
```