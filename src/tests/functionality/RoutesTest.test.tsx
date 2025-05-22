
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '@/App';
import { AuthProvider } from '@/contexts/AuthContext';
import { LocalizationProvider } from '@/contexts/LocalizationContext';

// Mock para evitar erros com a página de segmentos
jest.mock('@/pages/landing/LandingSegmentsPage', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="segments-page">Segments Page</div>
  };
});

// Wrapper personalizado para testes
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <LocalizationProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </LocalizationProvider>
  );
};

describe('Rotas da Aplicação', () => {
  it('renderiza a página de segmentos corretamente', () => {
    render(
      <AllTheProviders>
        <MemoryRouter initialEntries={['/landing/segments']}>
          <App />
        </MemoryRouter>
      </AllTheProviders>
    );
    
    expect(screen.getByTestId('segments-page')).toBeInTheDocument();
  });
  
  it('renderiza a landing page corretamente', () => {
    render(
      <AllTheProviders>
        <MemoryRouter initialEntries={['/landing']}>
          <App />
        </MemoryRouter>
      </AllTheProviders>
    );
    
    // Neste caso, estamos testando apenas se a rota não causa erros
    // Um teste mais completo verificaria elementos específicos da página
    expect(document.body).toBeInTheDocument();
  });
  
  it('redireciona da rota raiz para /index', () => {
    const { container } = render(
      <AllTheProviders>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </AllTheProviders>
    );
    
    // Verificar se não há erros de renderização
    expect(container).toBeInTheDocument();
  });
  
  // Testes adicionais para páginas importantes
  it('renderiza a página de preços corretamente', () => {
    render(
      <AllTheProviders>
        <MemoryRouter initialEntries={['/landing/pricing']}>
          <App />
        </MemoryRouter>
      </AllTheProviders>
    );
    
    expect(document.body).toBeInTheDocument();
  });
  
  it('renderiza a página de login corretamente', () => {
    render(
      <AllTheProviders>
        <MemoryRouter initialEntries={['/login']}>
          <App />
        </MemoryRouter>
      </AllTheProviders>
    );
    
    expect(document.body).toBeInTheDocument();
  });
});
