
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import SocialAuthService from '../../services/social/SocialAuthService';

// Mock do localStorage para testes
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('SocialAuthService', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('deve armazenar um token de autenticação', () => {
    const token = 'facebook-test-token';
    const provider = 'facebook';
    
    SocialAuthService.storeToken(provider, token);
    
    expect(localStorageMock.getItem('auth_token_facebook')).toBe(token);
  });

  it('deve recuperar um token de autenticação', () => {
    const token = 'instagram-test-token';
    const provider = 'instagram';
    
    localStorageMock.setItem('auth_token_instagram', token);
    
    const retrievedToken = SocialAuthService.getToken(provider);
    expect(retrievedToken).toBe(token);
  });

  it('deve verificar corretamente se um token está presente', () => {
    expect(SocialAuthService.hasToken('twitter')).toBe(false);
    
    localStorageMock.setItem('auth_token_twitter', 'twitter-test-token');
    
    expect(SocialAuthService.hasToken('twitter')).toBe(true);
  });

  it('deve remover um token de autenticação', () => {
    localStorageMock.setItem('auth_token_whatsapp', 'whatsapp-test-token');
    
    expect(SocialAuthService.hasToken('whatsapp')).toBe(true);
    
    SocialAuthService.removeToken('whatsapp');
    
    expect(SocialAuthService.hasToken('whatsapp')).toBe(false);
    expect(localStorageMock.getItem('auth_token_whatsapp')).toBeNull();
  });
});
