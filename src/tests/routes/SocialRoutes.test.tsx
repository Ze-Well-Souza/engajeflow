
import React from 'react';
import { render } from '@testing-library/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SocialRoutes from '../../routes/SocialRoutes';

// Mock dos componentes
vi.mock('../../pages/SocialMediaPage', () => ({
  default: () => <div data-testid="social-media-page">Social Media Page</div>
}));

vi.mock('../../pages/SocialDashboardPage', () => ({
  default: () => <div data-testid="social-dashboard-page">Social Dashboard Page</div>
}));

vi.mock('../../layouts/DashboardLayout', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dashboard-layout">{children}</div>
  )
}));

describe('SocialRoutes', () => {
  const renderWithRouter = (initialEntries: string[] = ['/social']) => {
    const routes = SocialRoutes();
    const router = createBrowserRouter(routes, {
      initialEntries,
    });
    
    return render(<RouterProvider router={router} />);
  };

  it('should return valid route objects', () => {
    const routes = SocialRoutes();
    expect(Array.isArray(routes)).toBe(true);
    expect(routes.length).toBeGreaterThan(0);
    expect(routes[0]).toHaveProperty('path');
    expect(routes[0]).toHaveProperty('element');
  });
});
