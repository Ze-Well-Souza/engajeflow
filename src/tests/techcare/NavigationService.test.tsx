
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import NavigationService from '../../services/techcare/NavigationService';

// Mock do toast
vi.mock('sonner', () => ({
  toast: {
    error: vi.fn()
  }
}));

describe('NavigationService', () => {
  // Reset mocks after each test
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should be a singleton', () => {
    const instance1 = NavigationService;
    const instance2 = NavigationService;
    expect(instance1).toBe(instance2);
  });

  it('should initialize with empty state', () => {
    expect(NavigationService.getCurrentPage()).toBeNull();
    expect(NavigationService.getHistory()).toEqual([]);
  });

  it('should configure properly', () => {
    NavigationService.configure('https://example.com');
    
    // Since baseUrl is private, we can only test indirectly
    expect(NavigationService).toBeDefined();
  });

  it('should navigate to a page and update history', async () => {
    NavigationService.configure('https://example.com');
    
    const result = await NavigationService.navigateTo('/dashboard');
    
    expect(result.success).toBe(true);
    
    const currentPage = NavigationService.getCurrentPage();
    expect(currentPage).not.toBeNull();
    expect(currentPage?.url).toBe('https://example.com/dashboard');
    expect(currentPage?.isLoaded).toBe(true);
    
    const history = NavigationService.getHistory();
    expect(history.length).toBe(1);
    expect(history[0].url).toBe('https://example.com/dashboard');
  });

  it('should fail when navigating to error page', async () => {
    NavigationService.configure('https://example.com');
    
    const result = await NavigationService.navigateTo('/error-page');
    
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });

  it('should refresh current page', async () => {
    NavigationService.configure('https://example.com');
    
    // First navigate to a page
    await NavigationService.navigateTo('/dashboard');
    
    // Then refresh
    const result = await NavigationService.refresh();
    
    expect(result.success).toBe(true);
    
    const currentPage = NavigationService.getCurrentPage();
    expect(currentPage).not.toBeNull();
    expect(currentPage?.url).toBe('https://example.com/dashboard');
  });

  it('should clear history', async () => {
    NavigationService.configure('https://example.com');
    
    // Navigate to a few pages
    await NavigationService.navigateTo('/dashboard');
    await NavigationService.navigateTo('/profile');
    
    // Check history has entries
    expect(NavigationService.getHistory().length).toBe(2);
    
    // Clear history
    NavigationService.clearHistory();
    
    // Check history is empty
    expect(NavigationService.getHistory().length).toBe(0);
  });
});
