import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AgendamentoDemo from '@/components/demo/AgendamentoDemo';

describe('AgendamentoDemo Component', () => {
  test('renderiza corretamente com segmento padrão', () => {
    render(<AgendamentoDemo />);
    expect(screen.getByText('Agendamento de Serviço')).toBeInTheDocument();
  });

  test('renderiza corretamente com segmento específico', () => {
    render(<AgendamentoDemo segment="beauty" />);
    expect(screen.getByText('Agendamento de Serviços de Beleza')).toBeInTheDocument();
  });

  test('avança para o próximo passo ao clicar em próximo', () => {
    render(<AgendamentoDemo />);
    
    // Selecionar serviço e profissional
    fireEvent.click(screen.getByText('Selecione o serviço'));
    fireEvent.click(screen.getByText('Consultoria'));
    
    fireEvent.click(screen.getByText('Selecione o profissional'));
    fireEvent.click(screen.getByText('Equipe A'));
    
    // Clicar em próximo
    fireEvent.click(screen.getByText('Próximo'));
    
    // Verificar se avançou para o passo 2
    expect(screen.getByText('Selecione uma data')).toBeInTheDocument();
  });

  test('desabilita botão próximo quando campos obrigatórios não estão preenchidos', () => {
    render(<AgendamentoDemo />);
    
    const botaoProximo = screen.getByText('Próximo');
    expect(botaoProximo).toBeDisabled();
  });

  test('exibe confirmação após completar todos os passos', async () => {
    render(<AgendamentoDemo />);
    
    // Passo 1: Selecionar serviço e profissional
    fireEvent.click(screen.getByText('Selecione o serviço'));
    fireEvent.click(screen.getByText('Consultoria'));
    
    fireEvent.click(screen.getByText('Selecione o profissional'));
    fireEvent.click(screen.getByText('Equipe A'));
    
    fireEvent.click(screen.getByText('Próximo'));
    
    // Passo 2: Selecionar data e hora
    // Nota: A seleção de data via calendário é complexa para testar
    // Simulamos apenas a seleção de horário
    fireEvent.click(screen.getByText('Selecione o horário'));
    fireEvent.click(screen.getByText('08:00'));
    
    fireEvent.click(screen.getByText('Próximo'));
    
    // Passo 3: Preencher dados pessoais
    fireEvent.change(screen.getByPlaceholderText('Digite seu nome completo'), {
      target: { value: 'João Silva' },
    });
    
    fireEvent.change(screen.getByPlaceholderText('Digite seu e-mail'), {
      target: { value: 'joao.silva@email.com' },
    });
    
    fireEvent.change(screen.getByPlaceholderText('Digite seu telefone'), {
      target: { value: '(11) 98765-4321' },
    });
    
    fireEvent.click(screen.getByText('Confirmar agendamento'));
    
    // Verificar se a confirmação é exibida
    expect(await screen.findByText('Agendamento Confirmado!')).toBeInTheDocument();
  });
});
