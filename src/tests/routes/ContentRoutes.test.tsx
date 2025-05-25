
import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ContentRoutes from '../../routes/ContentRoutes';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Mock dos componentes para evitar erros de dependências
vi.mock('../../pages/content/ContentPage', () => ({
  default: () => <div data-testid="content-page">Content Page</div>
}));

vi.mock('../../pages/content/ContentAssistantPage', () => ({
  default: () => <div data-testid="content-assistant-page">Content Assistant Page</div>
}));

vi.mock('../../layouts/DashboardLayout', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dashboard-layout">{children}</div>
  )
}));

describe('ContentRoutes', () => {
  const renderWithRouter = (initialEntries: string[] = ['/content']) => {
    const routes = ContentRoutes();
    const router = createBrowserRouter(routes, {
      initialEntries,
    });
    
    return render(<RouterProvider router={router} />);
  };

  it('should render content page route', () => {
    const { getByTestId } = renderWithRouter(['/content']);
    expect(getByTestId('dashboard-layout')).toBeInTheDocument();
    expect(getByTestId('content-page')).toBeInTheDocument();
  });

  it('should render content assistant page route', () => {
    const { getByTestId } = renderWithRouter(['/content/assistant']);
    expect(getByTestId('dashboard-layout')).toBeInTheDocument();
    expect(getByTestId('content-assistant-page')).toBeInTheDocument();
  });

  it('should return valid route objects', () => {
    const routes = ContentRoutes();
    expect(Array.isArray(routes)).toBe(true);
    expect(routes.length).toBeGreaterThan(0);
    expect(routes[0]).toHaveProperty('path');
    expect(routes[0]).toHaveProperty('element');
  });
});
