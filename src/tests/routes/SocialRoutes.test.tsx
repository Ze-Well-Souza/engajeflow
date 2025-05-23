
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes } from 'react-router-dom';
import SocialRoutes from '../../routes/SocialRoutes';
import { vi } from 'vitest';

// Mock dos componentes necessários
vi.mock('@/layouts/DashboardLayout', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dashboard-layout">{children}</div>
  )
}));

vi.mock('@/pages/SocialDashboardPage', () => ({
  default: () => <div data-testid="social-dashboard-page">Social Dashboard Page</div>
}));

describe('SocialRoutes', () => {
  it('deve renderizar a rota /social corretamente', () => {
    render(
      <MemoryRouter initialEntries={['/social']}>
        <Routes>
          {SocialRoutes({})}
        </Routes>
      </MemoryRouter>
    );
    
    expect(screen.getByTestId('dashboard-layout')).toBeInTheDocument();
    expect(screen.getByTestId('social-dashboard-page')).toBeInTheDocument();
  });
});
