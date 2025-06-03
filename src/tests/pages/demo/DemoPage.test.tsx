import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import DemoPage from '@/pages/demo/DemoPage';

// Mock dos componentes necessários
jest.mock('@/pages/demo/DemoFluxos', () => {
  return function MockedDemoFluxos() {
    return <div data-testid="demo-fluxos">Demo Fluxos Component</div>;
  };
});

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('DemoPage Component', () => {
  test('renderiza corretamente sem segmento específico', () => {
    renderWithRouter(<DemoPage />);
    expect(screen.getByText('Demonstração do EngageFlow')).toBeInTheDocument();
    expect(screen.getByText('Explore as funcionalidades da nossa plataforma')).toBeInTheDocument();
    expect(screen.getByTestId('demo-fluxos')).toBeInTheDocument();
  });

  test('exibe botões de chamada para ação', () => {
    renderWithRouter(<DemoPage />);
    expect(screen.getByText('Começar gratuitamente')).toBeInTheDocument();
    expect(screen.getByText('Ver planos e preços')).toBeInTheDocument();
  });

  test('exibe botão de voltar para a página anterior', () => {
    renderWithRouter(<DemoPage />);
    expect(screen.getByText('Voltar')).toBeInTheDocument();
  });

  test('exibe rodapé com informações de copyright', () => {
    renderWithRouter(<DemoPage />);
    const anoAtual = new Date().getFullYear();
    expect(screen.getByText(`© ${anoAtual} EngageFlow. Todos os direitos reservados.`)).toBeInTheDocument();
  });
});
