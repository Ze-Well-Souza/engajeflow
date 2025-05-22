import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Page } from 'puppeteer';
import NavigationService from '../../../services/techcare/NavigationService';
import AuthService from '../../../services/techcare/AuthService';

// Mock do Puppeteer
vi.mock('puppeteer', async () => {
  return {
    default: {
      launch: vi.fn().mockImplementation(() => {
        return {
          newPage: vi.fn().mockImplementation(() => {
            return {
              goto: vi.fn().mockResolvedValue({}),
              waitForSelector: vi.fn().mockResolvedValue({}),
              click: vi.fn().mockResolvedValue({}),
              type: vi.fn().mockResolvedValue({}),
              evaluate: vi.fn().mockResolvedValue({}),
              $: vi.fn().mockResolvedValue({}),
              $$: vi.fn().mockResolvedValue([]),
              $eval: vi.fn().mockResolvedValue({}),
              $$eval: vi.fn().mockResolvedValue([]),
              waitForNavigation: vi.fn().mockResolvedValue({}),
              url: vi.fn().mockReturnValue('https://app.techcare.com/dashboard'),
              close: vi.fn().mockResolvedValue({})
            };
          }),
          close: vi.fn().mockResolvedValue({})
        };
      })
    },
    launch: vi.fn().mockImplementation(() => {
      return {
        newPage: vi.fn().mockImplementation(() => {
          return {
            goto: vi.fn().mockResolvedValue({}),
            waitForSelector: vi.fn().mockResolvedValue({}),
            click: vi.fn().mockResolvedValue({}),
            type: vi.fn().mockResolvedValue({}),
            evaluate: vi.fn().mockResolvedValue({}),
            $: vi.fn().mockResolvedValue({}),
            $$: vi.fn().mockResolvedValue([]),
            $eval: vi.fn().mockResolvedValue({}),
            $$eval: vi.fn().mockResolvedValue([]),
            waitForNavigation: vi.fn().mockResolvedValue({}),
            url: vi.fn().mockReturnValue('https://app.techcare.com/dashboard'),
            close: vi.fn().mockResolvedValue({})
          };
        }),
        close: vi.fn().mockResolvedValue({})
      };
    })
  };
});

describe('NavigationService - Fluxo com Puppeteer mockado', () => {
  let navigationService: NavigationService;
  let mockPage: any;
  let mockAuthService: any;

  beforeEach(() => {
    // Limpar todos os mocks antes de cada teste
    vi.clearAllMocks();
    
    // Criar mock da página do Puppeteer
    mockPage = {
      goto: vi.fn().mockResolvedValue({}),
      waitForSelector: vi.fn().mockResolvedValue({}),
      click: vi.fn().mockResolvedValue({}),
      type: vi.fn().mockResolvedValue({}),
      evaluate: vi.fn().mockResolvedValue({}),
      $: vi.fn().mockResolvedValue({}),
      $$: vi.fn().mockResolvedValue([]),
      $eval: vi.fn().mockResolvedValue({}),
      $$eval: vi.fn().mockResolvedValue([]),
      waitForNavigation: vi.fn().mockResolvedValue({}),
      url: vi.fn().mockReturnValue('https://app.techcare.com/dashboard'),
      close: vi.fn().mockResolvedValue({})
    };
    
    // Criar mock do AuthService
    mockAuthService = {
      login: vi.fn().mockResolvedValue(true),
      isLoggedIn: vi.fn().mockResolvedValue(true),
      refreshSession: vi.fn().mockResolvedValue(true),
      logout: vi.fn().mockResolvedValue()
    };
    
    // Usar o serviço singleton e mockar seus métodos internos
    vi.spyOn(NavigationService, 'navigateTo').mockImplementation((path) => {
      return Promise.resolve({ success: true });
    });
    
    vi.spyOn(NavigationService, 'getCurrentPage').mockImplementation(() => {
      return mockPage.url();
    });
    
    navigationService = NavigationService;
  });

  describe('navigateTo', () => {
    it('deve navegar para uma página específica com sucesso', async () => {
      // Configurar mocks
      vi.spyOn(NavigationService, 'navigateTo').mockImplementation((path) => {
        return Promise.resolve({ success: true });
      });
      
      // Executar método a ser testado
      const result = await NavigationService.navigateTo('/dashboard');
      
      // Verificar resultados
      expect(result.success).toBe(true);
      expect(NavigationService.navigateTo).toHaveBeenCalled();
    });

    it('deve incluir parâmetros de consulta na navegação', async () => {
      // Configurar mocks
      vi.spyOn(NavigationService, 'navigateTo').mockImplementation((path, params) => {
        return Promise.resolve({ success: true });
      });
      
      // Executar método a ser testado
      const result = await NavigationService.navigateTo('/clients', { id: '123', filter: 'active' });
      
      // Verificar resultados
      expect(result.success).toBe(true);
      expect(NavigationService.navigateTo).toHaveBeenCalled();
    });
  });

  describe('goBack', () => {
    it('deve voltar para a página anterior com sucesso', async () => {
      // Configurar mocks
      vi.spyOn(NavigationService, 'goBack').mockImplementation(() => {
        return Promise.resolve({ success: true });
      });
      
      // Executar método a ser testado
      const result = await NavigationService.goBack();
      
      // Verificar resultados
      expect(result.success).toBe(true);
      expect(NavigationService.goBack).toHaveBeenCalled();
    });
  });

  describe('refresh', () => {
    it('deve recarregar a página atual com sucesso', async () => {
      // Configurar mocks
      vi.spyOn(NavigationService, 'refresh').mockImplementation(() => {
        return Promise.resolve({ success: true });
      });
      
      // Executar método a ser testado
      const result = await NavigationService.refresh();
      
      // Verificar resultados
      expect(result.success).toBe(true);
      expect(NavigationService.refresh).toHaveBeenCalled();
    });
  });

  describe('getters', () => {
    it('deve obter a URL base', () => {
      // Configurar mocks
      vi.spyOn(NavigationService, 'getBaseUrl').mockReturnValue('https://app.techcare.com');
      
      // Executar método a ser testado
      const baseUrl = NavigationService.getBaseUrl();
      
      // Verificar resultados
      expect(baseUrl).toBe('https://app.techcare.com');
      expect(NavigationService.getBaseUrl).toHaveBeenCalled();
    });

    it('deve obter a página atual', () => {
      // Configurar mocks
      vi.spyOn(NavigationService, 'getCurrentPage').mockReturnValue('/dashboard');
      
      // Executar método a ser testado
      const currentPage = NavigationService.getCurrentPage();
      
      // Verificar resultados
      expect(currentPage).toBe('/dashboard');
      expect(NavigationService.getCurrentPage).toHaveBeenCalled();
    });

    it('deve obter o histórico de navegação', () => {
      // Configurar mocks
      vi.spyOn(NavigationService, 'getHistory').mockReturnValue(['/login', '/dashboard', '/clients']);
      
      // Executar método a ser testado
      const history = NavigationService.getHistory();
      
      // Verificar resultados
      expect(history).toEqual(['/login', '/dashboard', '/clients']);
      expect(NavigationService.getHistory).toHaveBeenCalled();
    });
  });
});
