
/**
 * Serviço de operações financeiras para o TechCare Connect Automator
 */
import AuthService from './AuthService';
import NavigationService from './NavigationService';
import logger from '../../utils/logger';
import { CircuitBreaker } from '../../utils/circuit-breaker';
import { 
  FinancialResult, 
  CashFlowData, 
  AccountReceivable, 
  AccountPayable, 
  FinancialReport 
} from './financial/types';
import { DataGenerator } from './financial/DataGenerator';
import { ReportGenerator } from './financial/ReportGenerator';

/**
 * Serviço responsável pelas operações financeiras no sistema TechCare
 */
class FinancialService {
  private static instance: FinancialService;
  private circuitBreaker: CircuitBreaker;

  private constructor() {
    // Configurar circuit breaker para evitar sobrecarga
    this.circuitBreaker = new CircuitBreaker({
      failureThreshold: 3,
      resetTimeout: 30000
    });
    
    logger.info('[FinancialService] Inicializado');
  }

  /**
   * Obtém a instância singleton do serviço
   */
  public static getInstance(): FinancialService {
    if (!FinancialService.instance) {
      FinancialService.instance = new FinancialService();
    }
    return FinancialService.instance;
  }

  /**
   * Obtém dados de fluxo de caixa para um período
   * @param startDate Data de início
   * @param endDate Data de fim
   */
  public async getCashFlow(startDate: Date, endDate: Date): Promise<FinancialResult<CashFlowData>> {
    return this.executeWithRetry(async () => {
      // Validar autenticação
      if (!AuthService.isAuthenticated()) {
        logger.warn('[FinancialService] Tentativa de obter fluxo de caixa sem autenticação');
        return { success: false, error: 'Não autenticado' };
      }

      // Formatar datas para parâmetros
      const formattedStart = startDate.toISOString().split('T')[0];
      const formattedEnd = endDate.toISOString().split('T')[0];
      
      // Navegar para página de fluxo de caixa
      await NavigationService.navigateTo('/financial/cash-flow', {
        start: formattedStart,
        end: formattedEnd
      });
      
      // Simular extração de dados
      const cashFlowData = await this.simulateFinancialData('cash-flow', {
        startDate: formattedStart,
        endDate: formattedEnd
      });
      
      logger.info('[FinancialService] Dados de fluxo de caixa obtidos com sucesso');
      
      return {
        success: true,
        data: cashFlowData as CashFlowData
      };
    });
  }

  /**
   * Obtém contas a receber
   * @param status Filtro de status opcional
   */
  public async getAccountsReceivable(status?: string): Promise<FinancialResult<AccountReceivable[]>> {
    return this.executeWithRetry(async () => {
      // Validar autenticação
      if (!AuthService.isAuthenticated()) {
        logger.warn('[FinancialService] Tentativa de obter contas a receber sem autenticação');
        return { success: false, error: 'Não autenticado' };
      }
      
      // Parâmetros para navegação
      const params: Record<string, any> = {};
      if (status) {
        params.status = status;
      }
      
      // Navegar para página de contas a receber
      await NavigationService.navigateTo('/financial/accounts-receivable', params);
      
      // Simular extração de dados
      const accountsData = await this.simulateFinancialData('accounts-receivable', { status });
      
      logger.info('[FinancialService] Dados de contas a receber obtidos com sucesso');
      
      return {
        success: true,
        data: accountsData as AccountReceivable[]
      };
    });
  }

  /**
   * Obtém contas a pagar
   * @param status Filtro de status opcional
   * @param category Filtro de categoria opcional
   */
  public async getAccountsPayable(status?: string, category?: string): Promise<FinancialResult<AccountPayable[]>> {
    return this.executeWithRetry(async () => {
      // Validar autenticação
      if (!AuthService.isAuthenticated()) {
        logger.warn('[FinancialService] Tentativa de obter contas a pagar sem autenticação');
        return { success: false, error: 'Não autenticado' };
      }
      
      // Parâmetros para navegação
      const params: Record<string, any> = {};
      if (status) params.status = status;
      if (category) params.category = category;
      
      // Navegar para página de contas a pagar
      await NavigationService.navigateTo('/financial/accounts-payable', params);
      
      // Simular extração de dados
      const accountsData = await this.simulateFinancialData('accounts-payable', { status, category });
      
      logger.info('[FinancialService] Dados de contas a pagar obtidos com sucesso');
      
      return {
        success: true,
        data: accountsData as AccountPayable[]
      };
    });
  }

  /**
   * Obtém relatórios financeiros
   * @param reportType Tipo de relatório
   * @param period Período do relatório
   */
  public async getFinancialReport(reportType: string, period: string): Promise<FinancialResult<FinancialReport>> {
    return this.executeWithRetry(async () => {
      // Validar autenticação
      if (!AuthService.isAuthenticated()) {
        logger.warn('[FinancialService] Tentativa de obter relatório sem autenticação');
        return { success: false, error: 'Não autenticado' };
      }
      
      // Navegar para página de relatórios
      await NavigationService.navigateTo('/financial/reports', {
        type: reportType,
        period: period
      });
      
      // Simular extração de dados
      const reportData = await this.simulateFinancialData('report', { reportType, period });
      
      logger.info('[FinancialService] Relatório financeiro obtido com sucesso');
      
      return {
        success: true,
        data: reportData as FinancialReport
      };
    });
  }

  /**
   * Registra um pagamento
   * @param invoiceId ID da fatura/conta
   * @param amount Valor pago
   * @param method Método de pagamento
   */
  public async registerPayment(invoiceId: string, amount: number, method: string): Promise<FinancialResult<any>> {
    return this.executeWithRetry(async () => {
      // Validar autenticação
      if (!AuthService.isAuthenticated()) {
        logger.warn('[FinancialService] Tentativa de registrar pagamento sem autenticação');
        return { success: false, error: 'Não autenticado' };
      }
      
      // Navegar para página de pagamentos
      await NavigationService.navigateTo('/financial/register-payment', { invoiceId });
      
      // Simular registro de pagamento
      logger.info(`[FinancialService] Registrando pagamento para fatura ${invoiceId} no valor de ${amount}`);
      
      // Em produção, aqui seria implementada a lógica real de pagamento
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const receiptId = `REC-${Date.now().toString().substring(7)}`;
      
      logger.info(`[FinancialService] Pagamento registrado com sucesso, recibo ${receiptId}`);
      
      return {
        success: true,
        data: {
          invoiceId,
          amountPaid: amount,
          method,
          receiptId,
          date: new Date().toISOString()
        }
      };
    });
  }

  /**
   * Exporta dados financeiros
   * @param dataType Tipo de dados para exportação
   * @param period Período dos dados
   * @param format Formato de exportação
   */
  public async exportFinancialData(dataType: string, period: string, format: 'csv' | 'pdf' | 'excel'): Promise<FinancialResult<any>> {
    return this.executeWithRetry(async () => {
      // Validar autenticação
      if (!AuthService.isAuthenticated()) {
        logger.warn('[FinancialService] Tentativa de exportar dados sem autenticação');
        return { success: false, error: 'Não autenticado' };
      }
      
      // Navegar para página de exportação
      await NavigationService.navigateTo('/financial/export', {
        type: dataType,
        period,
        format
      });
      
      // Simular exportação
      logger.info(`[FinancialService] Exportando dados financeiros do tipo ${dataType} em formato ${format}`);
      
      // Em produção, aqui seria implementada a lógica real de exportação
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const fileName = `financial-${dataType}-${period}-${Date.now()}.${format}`;
      
      logger.info(`[FinancialService] Dados exportados com sucesso para ${fileName}`);
      
      return {
        success: true,
        data: {
          type: dataType,
          period,
          format,
          url: `https://downloads.techcare.com/exports/${fileName}`,
          fileName
        }
      };
    });
  }

  /**
   * Executa uma função com retry e circuit breaker
   */
  private async executeWithRetry<T>(fn: () => Promise<FinancialResult<T>>): Promise<FinancialResult<T>> {
    try {
      // Executar com circuit breaker
      return await this.circuitBreaker.execute(fn);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido durante operação financeira';
      
      if (errorMessage.includes('Circuit Breaker')) {
        logger.error('[FinancialService] Circuit Breaker aberto, muitas falhas recentes');
      } else {
        logger.error('[FinancialService] Erro:', errorMessage);
      }
      
      return { success: false, error: errorMessage };
    }
  }

  /**
   * Simula obtenção de dados financeiros (para demonstração)
   * Em produção, isto seria substituído por scraping real
   */
  private async simulateFinancialData(dataType: string, params: Record<string, any> = {}): Promise<any> {
    return new Promise((resolve) => {
      // Simular delay de processamento
      setTimeout(() => {
        // Gerar dados baseados no tipo solicitado
        switch (dataType) {
          case 'cash-flow':
            resolve(DataGenerator.generateCashFlowData(params.startDate, params.endDate));
            break;
          case 'accounts-receivable':
            resolve(DataGenerator.generateAccountsReceivableData(params.status));
            break;
          case 'accounts-payable':
            resolve(DataGenerator.generateAccountsPayableData(params.status, params.category));
            break;
          case 'report':
            resolve(ReportGenerator.generateReportData(params.reportType, params.period));
            break;
          default:
            resolve({ message: 'Tipo de dados desconhecido' });
        }
      }, 800);
    });
  }
}

export default FinancialService.getInstance();
