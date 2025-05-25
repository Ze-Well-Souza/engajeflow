
import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import ContentRoutes from '../../routes/ContentRoutes';
import { describe, it, expect, vi } from 'vitest';

// Mock dos componentes para evitar erros de dependências
vi.mock('../../pages/content/ContentPage', () => ({
  default: () => <div data-testid="content-page">Content Page</div>
}));

vi.mock('../../pages/SocialMediaPage', () => ({
  default: () => <div data-testid="social-media-page">Social Media Page</div>
}));

vi.mock('../../pages/RifaOnlinePage', () => ({
  default: () => <div data-testid="rifa-online-page">Rifa Online Page</div>
}));

vi.mock('../../layouts/DashboardLayout', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dashboard-layout">{children}</div>
  )
}));

describe('ContentRoutes', () => {
  const renderWithRouter = (initialEntries: string[] = ['/content']) => {
    const routes = ContentRoutes();
    const router = createMemoryRouter(routes, {
      initialEntries,
    });
    
    return render(<RouterProvider router={router} />);
  };

  it('should render content page route', () => {
    const { getByTestId } = renderWithRouter(['/content']);
    expect(getByTestId('dashboard-layout')).toBeInTheDocument();
    expect(getByTestId('content-page')).toBeInTheDocument();
  });

  it('should render social media page route', () => {
    const { getByTestId } = renderWithRouter(['/content/social']);
    expect(getByTestId('dashboard-layout')).toBeInTheDocument();
    expect(getByTestId('social-media-page')).toBeInTheDocument();
  });

  it('should render rifa online page route', () => {
    const { getByTestId } = renderWithRouter(['/content/rifa']);
    expect(getByTestId('dashboard-layout')).toBeInTheDocument();
    expect(getByTestId('rifa-online-page')).toBeInTheDocument();
  });

  it('should return valid route objects', () => {
    const routes = ContentRoutes();
    expect(Array.isArray(routes)).toBe(true);
    expect(routes.length).toBeGreaterThan(0);
    expect(routes[0]).toHaveProperty('path');
    expect(routes[0]).toHaveProperty('element');
  });
});
