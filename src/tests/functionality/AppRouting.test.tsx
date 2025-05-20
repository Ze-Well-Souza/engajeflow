
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

jest.mock('@/pages/Index', () => {
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

jest.mock('@/pages/system/ConfiguracoesPage', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="configuracoes-page">Configurações Page</div>
  };
});

jest.mock('@/pages/landing/LandingPage', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="landing-page">Landing Page</div>
  };
});

jest.mock('@/pages/landing/BeautyLandingPage', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="beauty-landing-page">Beauty Landing Page</div>
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
      <AllTheProviders>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </AllTheProviders>
    );
    
    expect(screen.getByTestId('dashboard-page')).toBeInTheDocument();
  });
  
  it('renderiza a página de agendamentos na rota /agendamentos', () => {
    render(
      <AllTheProviders>
        <MemoryRouter initialEntries={['/agendamentos']}>
          <App />
        </MemoryRouter>
      </AllTheProviders>
    );
    
    expect(screen.getByTestId('dashboard-layout')).toBeInTheDocument();
    expect(screen.getByTestId('agendamentos-page')).toBeInTheDocument();
  });
  
  it('renderiza a página de redes sociais na rota /social-media', () => {
    render(
      <AllTheProviders>
        <MemoryRouter initialEntries={['/social-media']}>
          <App />
        </MemoryRouter>
      </AllTheProviders>
    );
    
    expect(screen.getByTestId('dashboard-layout')).toBeInTheDocument();
    expect(screen.getByTestId('social-media-page')).toBeInTheDocument();
  });

  it('renderiza a página de configurações na rota /configuracoes', () => {
    render(
      <AllTheProviders>
        <MemoryRouter initialEntries={['/configuracoes']}>
          <App />
        </MemoryRouter>
      </AllTheProviders>
    );
    
    expect(screen.getByTestId('dashboard-layout')).toBeInTheDocument();
    expect(screen.getByTestId('configuracoes-page')).toBeInTheDocument();
  });
  
  it('renderiza a página inicial do landing page', () => {
    render(
      <AllTheProviders>
        <MemoryRouter initialEntries={['/landing']}>
          <App />
        </MemoryRouter>
      </AllTheProviders>
    );
    
    expect(screen.getByTestId('landing-page')).toBeInTheDocument();
  });
  
  it('renderiza a landing page de beleza', () => {
    render(
      <AllTheProviders>
        <MemoryRouter initialEntries={['/landing/beauty']}>
          <App />
        </MemoryRouter>
      </AllTheProviders>
    );
    
    expect(screen.getByTestId('beauty-landing-page')).toBeInTheDocument();
  });
});
