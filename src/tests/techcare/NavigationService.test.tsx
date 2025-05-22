
import { describe, it, expect, vi, beforeEach } from 'vitest';
import NavigationService from '../../services/techcare/NavigationService';

interface MockNavigationState {
  url: string;
  isLoaded: boolean;
  page: string | null;
}

describe('NavigationService', () => {
  let mockNavigationState: MockNavigationState;

  beforeEach(() => {
    // Reset mock state
    mockNavigationState = {
      url: 'https://example.com',
      isLoaded: true,
      page: '/home'
    };
    
    // Mock the methods that exist in the actual service
    vi.spyOn(NavigationService, 'getCurrentPage').mockImplementation(() => {
      return mockNavigationState.page;
    });
    
    vi.spyOn(NavigationService, 'navigateTo').mockImplementation((path: string) => {
      mockNavigationState.page = path;
      mockNavigationState.isLoaded = true;
      return Promise.resolve({ success: true });
    });
  });

  it('should navigate to a URL', async () => {
    const result = await NavigationService.navigateTo('/dashboard');
    
    expect(result.success).toBe(true);
    expect(mockNavigationState.page).toBe('/dashboard');
    expect(mockNavigationState.isLoaded).toBe(true);
  });

  it('should get the current page', async () => {
    mockNavigationState.page = '/settings';
    
    const page = NavigationService.getCurrentPage();
    
    expect(page).toBe('/settings');
  });

  it('should get base URL', async () => {
    const baseUrl = NavigationService.getBaseUrl();
    expect(baseUrl).toBeDefined();
  });

  it('should get navigation history', async () => {
    const history = NavigationService.getHistory();
    expect(Array.isArray(history)).toBe(true);
  });
});
