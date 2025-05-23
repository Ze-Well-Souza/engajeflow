
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes } from 'react-router-dom';
import ContentRoutes from '../../routes/ContentRoutes';
import { vi } from 'vitest';

// Mock dos componentes necessários
vi.mock('@/layouts/DashboardLayout', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dashboard-layout">{children}</div>
  )
}));

vi.mock('@/pages/ContentPage', () => ({
  default: () => <div data-testid="content-page">Content Page</div>
}));

vi.mock('@/pages/SocialMediaPage', () => ({
  default: () => <div data-testid="social-media-page">Social Media Page</div>
}));

vi.mock('@/pages/RifaOnlinePage', () => ({
  default: () => <div data-testid="rifa-online-page">Rifa Online Page</div>
}));

describe('ContentRoutes', () => {
  it('deve renderizar a rota /content corretamente', () => {
    render(
      <MemoryRouter initialEntries={['/content']}>
        <Routes>
          {ContentRoutes({})}
        </Routes>
      </MemoryRouter>
    );
    
    expect(screen.getByTestId('dashboard-layout')).toBeInTheDocument();
    expect(screen.getByTestId('content-page')).toBeInTheDocument();
  });
  
  it('deve renderizar a rota /content/social corretamente', () => {
    render(
      <MemoryRouter initialEntries={['/content/social']}>
        <Routes>
          {ContentRoutes({})}
        </Routes>
      </MemoryRouter>
    );
    
    expect(screen.getByTestId('dashboard-layout')).toBeInTheDocument();
    expect(screen.getByTestId('social-media-page')).toBeInTheDocument();
  });
  
  it('deve renderizar a rota /content/rifa corretamente', () => {
    render(
      <MemoryRouter initialEntries={['/content/rifa']}>
        <Routes>
          {ContentRoutes({})}
        </Routes>
      </MemoryRouter>
    );
    
    expect(screen.getByTestId('dashboard-layout')).toBeInTheDocument();
    expect(screen.getByTestId('rifa-online-page')).toBeInTheDocument();
  });
});
