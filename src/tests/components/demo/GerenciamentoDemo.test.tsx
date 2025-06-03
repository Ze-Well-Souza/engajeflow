import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GerenciamentoDemo from '@/components/demo/GerenciamentoDemo';

describe('GerenciamentoDemo Component', () => {
  test('renderiza corretamente com segmento padrão', () => {
    render(<GerenciamentoDemo />);
    expect(screen.getByText('Gerenciamento de Conteúdo')).toBeInTheDocument();
  });

  test('renderiza corretamente com segmento específico', () => {
    render(<GerenciamentoDemo segment="beauty" />);
    expect(screen.getByText('Gerenciamento para Beleza e Estética')).toBeInTheDocument();
  });

  test('exibe diferentes abas e permite navegação entre elas', () => {
    render(<GerenciamentoDemo />);
    
    // Verificar se as abas estão presentes
    expect(screen.getByText('Clientes')).toBeInTheDocument();
    expect(screen.getByText('Mensagens')).toBeInTheDocument();
    expect(screen.getByText('Automações')).toBeInTheDocument();
    
    // Navegar para a aba de mensagens
    fireEvent.click(screen.getByText('Mensagens'));
    expect(screen.getByText('Histórico de Mensagens')).toBeInTheDocument();
    
    // Navegar para a aba de automações
    fireEvent.click(screen.getByText('Automações'));
    expect(screen.getByText('Automações Configuradas')).toBeInTheDocument();
  });

  test('permite busca de clientes', () => {
    render(<GerenciamentoDemo />);
    
    // Buscar por um cliente específico
    fireEvent.change(screen.getByPlaceholderText('Buscar clientes...'), {
      target: { value: 'Ana' },
    });
    
    // Verificar se apenas o cliente buscado é exibido
    expect(screen.getByText('Ana Silva')).toBeInTheDocument();
    expect(screen.queryByText('Carlos Oliveira')).not.toBeInTheDocument();
  });

  test('exibe formulário de mensagem ao clicar em um cliente', () => {
    render(<GerenciamentoDemo />);
    
    // Clicar no botão de mensagem de um cliente
    const botoesMensagem = screen.getAllByRole('button', { name: '' });
    fireEvent.click(botoesMensagem[0]); // Primeiro botão de mensagem
    
    // Verificar se o formulário de mensagem é exibido
    expect(screen.getByText('Nova Mensagem')).toBeInTheDocument();
  });

  test('permite enviar mensagem para cliente', () => {
    render(<GerenciamentoDemo />);
    
    // Clicar no botão de mensagem de um cliente
    const botoesMensagem = screen.getAllByRole('button', { name: '' });
    fireEvent.click(botoesMensagem[0]); // Primeiro botão de mensagem
    
    // Preencher e enviar mensagem
    fireEvent.change(screen.getByPlaceholderText('Digite sua mensagem aqui...'), {
      target: { value: 'Mensagem de teste' },
    });
    
    fireEvent.click(screen.getByText('Enviar Mensagem'));
    
    // Verificar se a mensagem foi enviada (botão muda para "Enviado!")
    expect(screen.getByText('Enviado!')).toBeInTheDocument();
  });

  test('exibe detalhes da mensagem ao clicar em uma mensagem', () => {
    render(<GerenciamentoDemo />);
    
    // Navegar para a aba de mensagens
    fireEvent.click(screen.getByText('Mensagens'));
    
    // Clicar no botão "Ver" de uma mensagem
    const botoesVer = screen.getAllByRole('button', { name: 'Ver' });
    fireEvent.click(botoesVer[0]); // Primeiro botão Ver
    
    // Verificar se os detalhes da mensagem são exibidos
    expect(screen.getByText('Detalhes da Mensagem')).toBeInTheDocument();
  });

  test('permite alternar status de automações', () => {
    render(<GerenciamentoDemo />);
    
    // Navegar para a aba de automações
    fireEvent.click(screen.getByText('Automações'));
    
    // Verificar se as automações são exibidas
    expect(screen.getByText('Lembrete de agendamento')).toBeInTheDocument();
    expect(screen.getByText('Confirmação de horário')).toBeInTheDocument();
    expect(screen.getByText('Cliente inativo')).toBeInTheDocument();
  });
});
