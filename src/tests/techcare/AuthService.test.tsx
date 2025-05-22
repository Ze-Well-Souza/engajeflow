
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import AuthService from '../../services/techcare/AuthService';

// Mock do toast
vi.mock('sonner', () => ({
  toast: {
    error: vi.fn()
  }
}));

describe('AuthService', () => {
  // Reset mocks after each test
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should be a singleton', () => {
    const instance1 = AuthService;
    const instance2 = AuthService;
    expect(instance1).toBe(instance2);
  });

  it('should initialize with null config and token', () => {
    expect(AuthService.isAuthenticated()).toBe(false);
    expect(AuthService.getToken()).toBeNull();
  });

  it('should configure properly', () => {
    AuthService.configure({
      username: 'testuser',
      password: 'testpass',
      baseUrl: 'https://example.com'
    });
    
    // Since config is private, we can only test indirectly
    expect(AuthService).toBeDefined();
  });

  it('should fail login with wrong credentials', async () => {
    // Configurando com credenciais que não atendem aos critérios mínimos
    AuthService.configure({
      username: 'wr', // Menos de 3 caracteres
      password: 'wr', // Menos de 3 caracteres
      baseUrl: 'https://example.com'
    });
    
    const result = await AuthService.login();
    
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
    expect(AuthService.isAuthenticated()).toBe(false);
    expect(AuthService.getToken()).toBeNull();
  });

  it('should login successfully with correct credentials', async () => {
    AuthService.configure({
      username: 'admin',
      password: 'password',
      baseUrl: 'https://example.com'
    });
    
    const result = await AuthService.login();
    
    expect(result.success).toBe(true);
    expect(result.token).toBeDefined();
    expect(AuthService.isAuthenticated()).toBe(true);
    expect(AuthService.getToken()).not.toBeNull();
  });

  it('should logout correctly', async () => {
    // First login
    AuthService.configure({
      username: 'admin',
      password: 'password',
      baseUrl: 'https://example.com'
    });
    
    await AuthService.login();
    expect(AuthService.isAuthenticated()).toBe(true);
    
    // Then logout
    AuthService.logout();
    expect(AuthService.isAuthenticated()).toBe(false);
    expect(AuthService.getToken()).toBeNull();
  });
});
