
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { vi } from 'vitest';

// Mock de componentes necessários
vi.mock('../routes/MainRoutes', () => ({
  default: () => <div data-testid="main-routes">Main Routes</div>
}));

vi.mock('../routes/AdminRoutes', () => ({
  default: () => <div data-testid="admin-routes">Admin Routes</div>
}));

vi.mock('../routes/LandingRoutes', () => ({
  default: () => <div data-testid="landing-routes">Landing Routes</div>
}));

vi.mock('../routes/AuthRoutes', () => ({
  default: () => <div data-testid="auth-routes">Auth Routes</div>
}));

vi.mock('../routes/ContentRoutes', () => ({
  default: () => <div data-testid="content-routes">Content Routes</div>
}));

vi.mock('../routes/SocialRoutes', () => ({
  default: () => <div data-testid="social-routes">Social Routes</div>
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    Navigate: () => <div data-testid="navigate">Navigate Component</div>,
  };
});

describe('App', () => {
  it('deve renderizar os componentes de rota', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    
    // Verificar que o componente Navigate (redirecionamento) está presente
    expect(screen.getByTestId('navigate')).toBeInTheDocument();
    
    // Verificar que os componentes de rota foram renderizados
    expect(screen.getByTestId('main-routes')).toBeInTheDocument();
    expect(screen.getByTestId('admin-routes')).toBeInTheDocument();
    expect(screen.getByTestId('landing-routes')).toBeInTheDocument();
    expect(screen.getByTestId('auth-routes')).toBeInTheDocument();
    expect(screen.getByTestId('content-routes')).toBeInTheDocument();
    expect(screen.getByTestId('social-routes')).toBeInTheDocument();
  });
});
