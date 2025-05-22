import { Page } from 'puppeteer';
import { NavigationService } from '../../../services/techcare/NavigationService';
import { AuthService } from '../../../services/techcare/AuthService';

// Mock do Puppeteer
jest.mock('puppeteer', () => {
  return {
    launch: jest.fn().mockImplementation(() => {
      return {
        newPage: jest.fn().mockImplementation(() => {
          return {
            goto: jest.fn().mockResolvedValue({}),
            waitForSelector: jest.fn().mockResolvedValue({}),
            click: jest.fn().mockResolvedValue({}),
            type: jest.fn().mockResolvedValue({}),
            evaluate: jest.fn().mockResolvedValue({}),
            $: jest.fn().mockResolvedValue({}),
            $$: jest.fn().mockResolvedValue([]),
            $eval: jest.fn().mockResolvedValue({}),
            $$eval: jest.fn().mockResolvedValue([]),
            waitForNavigation: jest.fn().mockResolvedValue({}),
            url: jest.fn().mockReturnValue('https://app.techcare.com/dashboard'),
            close: jest.fn().mockResolvedValue({})
          };
        }),
        close: jest.fn().mockResolvedValue({})
      };
    })
  };
});

describe('NavigationService - Fluxo com Puppeteer mockado', () => {
  let navigationService: NavigationService;
  let mockPage: jest.Mocked<Page>;
  let mockAuthService: jest.Mocked<AuthService>;

  beforeEach(() => {
    // Limpar todos os mocks antes de cada teste
    jest.clearAllMocks();
    
    // Criar mock da página do Puppeteer
    mockPage = {
      goto: jest.fn().mockResolvedValue({}),
      waitForSelector: jest.fn().mockResolvedValue({}),
      click: jest.fn().mockResolvedValue({}),
      type: jest.fn().mockResolvedValue({}),
      evaluate: jest.fn().mockResolvedValue({}),
      $: jest.fn().mockResolvedValue({}),
      $$: jest.fn().mockResolvedValue([]),
      $eval: jest.fn().mockResolvedValue({}),
      $$eval: jest.fn().mockResolvedValue([]),
      waitForNavigation: jest.fn().mockResolvedValue({}),
      url: jest.fn().mockReturnValue('https://app.techcare.com/dashboard'),
      close: jest.fn().mockResolvedValue({})
    } as unknown as jest.Mocked<Page>;
    
    // Criar mock do AuthService
    mockAuthService = {
      login: jest.fn().mockResolvedValue(true),
      isLoggedIn: jest.fn().mockResolvedValue(true),
      refreshSession: jest.fn().mockResolvedValue(true),
      logout: jest.fn().mockResolvedValue()
    } as unknown as jest.Mocked<AuthService>;
    
    // Criar instância do serviço a ser testado
    navigationService = new NavigationService(mockPage, mockAuthService);
  });

  describe('goToDashboard', () => {
    it('deve navegar para o dashboard com sucesso', async () => {
      // Configurar mocks
      mockPage.url.mockReturnValue('https://app.techcare.com/clients');
      mockPage.click.mockResolvedValue();
      mockPage.waitForNavigation.mockResolvedValue({} as any);
      mockPage.waitForSelector.mockResolvedValue({} as any);
      
      // Executar método a ser testado
      await navigationService.goToDashboard();
      
      // Verificar resultados
      expect(mockPage.click).toHaveBeenCalledWith(expect.stringContaining('dashboard'));
      expect(mockPage.waitForNavigation).toHaveBeenCalled();
      expect(mockPage.waitForSelector).toHaveBeenCalled();
    });

    it('não deve navegar se já estiver no dashboard', async () => {
      // Configurar mock para já estar no dashboard
      mockPage.url.mockReturnValue('https://app.techcare.com/dashboard');
      
      // Executar método a ser testado
      await navigationService.goToDashboard();
      
      // Verificar que não houve navegação
      expect(mockPage.click).not.toHaveBeenCalled();
      expect(mockPage.waitForNavigation).not.toHaveBeenCalled();
    });

    it('deve verificar login antes de navegar', async () => {
      // Configurar mock para não estar logado
      mockAuthService.isLoggedIn.mockResolvedValueOnce(false);
      mockAuthService.login.mockResolvedValueOnce(true);
      
      // Executar método a ser testado
      await navigationService.goToDashboard();
      
      // Verificar que o login foi verificado e realizado
      expect(mockAuthService.isLoggedIn).toHaveBeenCalled();
      expect(mockAuthService.login).toHaveBeenCalled();
    });
  });

  describe('goToClients', () => {
    it('deve navegar para a seção de clientes com sucesso', async () => {
      // Configurar mocks
      mockPage.url.mockReturnValue('https://app.techcare.com/dashboard');
      mockPage.click.mockResolvedValue();
      mockPage.waitForNavigation.mockResolvedValue({} as any);
      mockPage.waitForSelector.mockResolvedValue({} as any);
      
      // Executar método a ser testado
      await navigationService.goToClients();
      
      // Verificar resultados
      expect(mockPage.click).toHaveBeenCalledWith(expect.stringContaining('clients'));
      expect(mockPage.waitForNavigation).toHaveBeenCalled();
      expect(mockPage.waitForSelector).toHaveBeenCalled();
    });

    it('deve lidar com erros de navegação', async () => {
      // Configurar mock para falhar na navegação
      mockPage.click.mockRejectedValueOnce(new Error('Elemento não encontrado'));
      
      // Verificar que o método lança o erro esperado
      await expect(navigationService.goToClients())
        .rejects
        .toThrow('Falha ao navegar para a seção de clientes');
    });
  });

  describe('goToReports', () => {
    it('deve navegar para a seção de relatórios com sucesso', async () => {
      // Configurar mocks
      mockPage.url.mockReturnValue('https://app.techcare.com/dashboard');
      mockPage.click.mockResolvedValue();
      mockPage.waitForNavigation.mockResolvedValue({} as any);
      mockPage.waitForSelector.mockResolvedValue({} as any);
      
      // Executar método a ser testado
      await navigationService.goToReports();
      
      // Verificar resultados
      expect(mockPage.click).toHaveBeenCalledWith(expect.stringContaining('reports'));
      expect(mockPage.waitForNavigation).toHaveBeenCalled();
      expect(mockPage.waitForSelector).toHaveBeenCalled();
    });
  });

  describe('goToFinancial', () => {
    it('deve navegar para a seção financeira com sucesso', async () => {
      // Configurar mocks
      mockPage.url.mockReturnValue('https://app.techcare.com/dashboard');
      mockPage.click.mockResolvedValue();
      mockPage.waitForNavigation.mockResolvedValue({} as any);
      mockPage.waitForSelector.mockResolvedValue({} as any);
      
      // Executar método a ser testado
      await navigationService.goToFinancial();
      
      // Verificar resultados
      expect(mockPage.click).toHaveBeenCalledWith(expect.stringContaining('financial'));
      expect(mockPage.waitForNavigation).toHaveBeenCalled();
      expect(mockPage.waitForSelector).toHaveBeenCalled();
    });
  });

  describe('waitForNavigation', () => {
    it('deve aguardar a navegação ser concluída', async () => {
      // Configurar mocks
      mockPage.waitForNavigation.mockResolvedValue({} as any);
      
      // Executar método a ser testado
      await navigationService.waitForNavigation();
      
      // Verificar resultados
      expect(mockPage.waitForNavigation).toHaveBeenCalled();
    });

    it('deve lidar com timeout na navegação', async () => {
      // Configurar mock para timeout
      mockPage.waitForNavigation.mockRejectedValueOnce(new Error('Navigation timeout'));
      
      // Verificar que o método lança o erro esperado
      await expect(navigationService.waitForNavigation())
        .rejects
        .toThrow('Timeout ao aguardar navegação');
    });
  });
});
