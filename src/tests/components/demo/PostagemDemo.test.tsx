import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PostagemDemo from '@/components/demo/PostagemDemo';

describe('PostagemDemo Component', () => {
  test('renderiza corretamente com segmento padrão', () => {
    render(<PostagemDemo />);
    expect(screen.getByText('Gestão de Conteúdo')).toBeInTheDocument();
  });

  test('renderiza corretamente com segmento específico', () => {
    render(<PostagemDemo segment="beauty" />);
    expect(screen.getByText('Gestão de Conteúdo para Beleza e Estética')).toBeInTheDocument();
  });

  test('exibe diferentes abas e permite navegação entre elas', () => {
    render(<PostagemDemo />);
    
    // Verificar se as abas estão presentes
    expect(screen.getByText('Criar Post')).toBeInTheDocument();
    expect(screen.getByText('Agendados')).toBeInTheDocument();
    expect(screen.getByText('Publicados')).toBeInTheDocument();
    
    // Navegar para a aba de posts agendados
    fireEvent.click(screen.getByText('Agendados'));
    expect(screen.getByText('Posts Agendados')).toBeInTheDocument();
    
    // Navegar para a aba de posts publicados
    fireEvent.click(screen.getByText('Publicados'));
    expect(screen.getByText('Posts Publicados')).toBeInTheDocument();
  });

  test('avança para o próximo passo ao clicar em próximo', () => {
    render(<PostagemDemo />);
    
    // Selecionar tipo de post
    fireEvent.click(screen.getByText('Selecione o tipo de post'));
    fireEvent.click(screen.getByText('Informativo'));
    
    // Preencher título e conteúdo
    fireEvent.change(screen.getByPlaceholderText('Digite um título atrativo'), {
      target: { value: 'Título de teste' },
    });
    
    fireEvent.change(screen.getByPlaceholderText(/Compartilhe informações relevantes/), {
      target: { value: 'Conteúdo de teste' },
    });
    
    // Clicar em próximo
    fireEvent.click(screen.getByText('Próximo'));
    
    // Verificar se avançou para o passo 2 (seleção de imagem)
    expect(screen.getByText('Upload de imagem')).toBeInTheDocument();
  });

  test('desabilita botão próximo quando campos obrigatórios não estão preenchidos', () => {
    render(<PostagemDemo />);
    
    const botaoProximo = screen.getByText('Próximo');
    expect(botaoProximo).toBeDisabled();
  });

  test('exibe posts agendados na aba correspondente', () => {
    render(<PostagemDemo />);
    
    // Navegar para a aba de posts agendados
    fireEvent.click(screen.getByText('Agendados'));
    
    // Verificar se os posts agendados são exibidos
    expect(screen.getByText('Promoção de Fim de Semana')).toBeInTheDocument();
    expect(screen.getByText('Dica Profissional')).toBeInTheDocument();
    expect(screen.getByText('Novidades da Semana')).toBeInTheDocument();
  });

  test('exibe posts publicados na aba correspondente', () => {
    render(<PostagemDemo />);
    
    // Navegar para a aba de posts publicados
    fireEvent.click(screen.getByText('Publicados'));
    
    // Verificar se os posts publicados são exibidos
    expect(screen.getByText('Lançamento da Nova Coleção')).toBeInTheDocument();
    expect(screen.getByText('Dica do Especialista')).toBeInTheDocument();
    expect(screen.getByText('Depoimento de Cliente')).toBeInTheDocument();
  });
});
