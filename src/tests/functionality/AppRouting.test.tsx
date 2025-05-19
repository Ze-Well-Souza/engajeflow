
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '@/App';
import { AuthProvider } from '@/contexts/AuthContext';
import { LocalizationProvider } from '@/contexts/LocalizationContext';

// Mock dos componentes de página para facilitar o teste
jest.mock('@/components/DashboardLayout', () => {
  return {
    __esModule: true,
    default: ({ children }) => <div data-testid="dashboard-layout">{children}</div>
  };
});

jest.mock('@/pages/DashboardPage', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="dashboard-page">Dashboard Page</div>
  };
});

jest.mock('@/pages/AgendamentosPage', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="agendamentos-page">Agendamentos Page</div>
  };
});

jest.mock('@/pages/SocialMediaPage', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="social-media-page">Social Media Page</div>
  };
});

// Wrapper personalizado para testes que inclui os providers necessários
const AllTheProviders = ({ children }) => {
  return (
    <LocalizationProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </LocalizationProvider>
  );
};

describe('App Routing', () => {
  it('renderiza a página de dashboard na rota raiz', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    
    expect(screen.getByTestId('dashboard-layout')).toBeInTheDocument();
    expect(screen.getByTestId('dashboard-page')).toBeInTheDocument();
  });
  
  it('renderiza a página de agendamentos na rota /agendamentos', () => {
    render(
      <MemoryRouter initialEntries={['/agendamentos']}>
        <App />
      </MemoryRouter>
    );
    
    expect(screen.getByTestId('dashboard-layout')).toBeInTheDocument();
    expect(screen.getByTestId('agendamentos-page')).toBeInTheDocument();
  });
  
  it('renderiza a página de redes sociais na rota /social-media', () => {
    render(
      <MemoryRouter initialEntries={['/social-media']}>
        <App />
      </MemoryRouter>
    );
    
    expect(screen.getByTestId('dashboard-layout')).toBeInTheDocument();
    expect(screen.getByTestId('social-media-page')).toBeInTheDocument();
  });
  
  it('redireciona /login para a rota raiz enquanto estiver no modo de bypass', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    );
    
    expect(screen.getByTestId('dashboard-layout')).toBeInTheDocument();
    expect(screen.getByTestId('dashboard-page')).toBeInTheDocument();
  });
});
