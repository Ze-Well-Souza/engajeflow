
import { describe, it, expect, vi, beforeEach } from 'vitest';
import NavigationService from '../../services/techcare/NavigationService';

interface MockNavigationState {
  url: string;
  isLoaded: boolean;
}

describe('NavigationService', () => {
  let mockNavigationState: MockNavigationState;

  beforeEach(() => {
    // Reset mock state
    mockNavigationState = {
      url: 'https://example.com',
      isLoaded: true
    };
    
    // Mock the internal methods that would interact with Puppeteer
    vi.spyOn(NavigationService as any, 'getCurrentUrl').mockImplementation(() => {
      return Promise.resolve(mockNavigationState.url);
    });
    
    vi.spyOn(NavigationService as any, 'isPageLoaded').mockImplementation(() => {
      return Promise.resolve(mockNavigationState.isLoaded);
    });
    
    vi.spyOn(NavigationService as any, 'navigateTo').mockImplementation((url: string) => {
      mockNavigationState.url = url;
      mockNavigationState.isLoaded = true;
      return Promise.resolve(true);
    });
  });

  it('should navigate to a URL', async () => {
    const result = await NavigationService.goToUrl('https://newsite.com');
    
    expect(result).toBe(true);
    expect(mockNavigationState.url).toBe('https://newsite.com');
    expect(mockNavigationState.isLoaded).toBe(true);
  });

  it('should get the current URL', async () => {
    mockNavigationState.url = 'https://currentsite.com';
    
    const url = await NavigationService.getUrl();
    
    expect(url).toBe('https://currentsite.com');
  });

  it('should wait for the page to load', async () => {
    mockNavigationState.isLoaded = false;
    
    // Simulate page loading after a delay
    setTimeout(() => {
      mockNavigationState.isLoaded = true;
    }, 50);
    
    const result = await NavigationService.waitForPageLoad();
    
    expect(result).toBe(true);
    expect(mockNavigationState.isLoaded).toBe(true);
  });

  it('should execute a script in the page context', async () => {
    const mockResult = 'script result';
    
    vi.spyOn(NavigationService as any, 'executeScript').mockImplementation(() => {
      return Promise.resolve(mockResult);
    });
    
    const result = await NavigationService.executeJavaScript('2 + 2');
    
    expect(result).toBe(mockResult);
  });
});
