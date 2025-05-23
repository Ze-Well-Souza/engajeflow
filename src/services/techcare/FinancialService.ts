
import AuthService from './AuthService';
import logger from '../../utils/logger';
import { BankSyncService } from './financial/BankSyncService';
import { ReportsService, type FinancialReport } from './financial/ReportsService';
import { TransactionsService, type Transaction } from './financial/TransactionsService';

// Re-exportar tipos para compatibilidade
export type { FinancialReport, Transaction };

/**
 * Serviço principal para gerenciar operações financeiras no TechCare Connect
 */
class FinancialService {
  private static instance: FinancialService;

  // Construtor privado para padrão Singleton
  private constructor() {
    logger.info('[FinancialService] Inicializado');
  }

  /**
   * Obtém a instância única do serviço (Padrão Singleton)
   */
  public static getInstance(): FinancialService {
    if (!FinancialService.instance) {
      FinancialService.instance = new FinancialService();
    }
    return FinancialService.instance;
  }

  /**
   * Sincroniza contas bancárias com o sistema
   */
  public async syncBankAccounts(): Promise<boolean> {
    return BankSyncService.syncBankAccounts();
  }

  /**
   * Gera relatório financeiro para o período especificado
   */
  public async generateFinancialReport(period: { startDate: Date; endDate: Date }): Promise<FinancialReport> {
    return ReportsService.generateFinancialReport(period);
  }

  /**
   * Busca transações para um período especificado
   */
  public async fetchTransactions(period: { start: Date; end: Date }): Promise<Transaction[]> {
    return TransactionsService.fetchTransactions(period);
  }

  /**
   * Retorna as contas financeiras disponíveis
   */
  public getFinancialAccounts(): any[] {
    try {
      // Verificar se o usuário está autenticado
      if (!AuthService.isAuthenticated()) {
        throw new Error("Usuário não autenticado para acessar contas financeiras");
      }
      
      logger.info("[FinancialService] Obtendo contas financeiras");
      
      // Dados simulados para demonstração
      const accounts = [
        {
          id: "acc-001",
          name: "Conta Corrente Principal",
          type: "checking",
          institution: "Banco ABC",
          balance: 15420.78,
          currency: "BRL",
          lastSync: new Date(Date.now() - 86400000) // ontem
        },
        {
          id: "acc-002",
          name: "Poupança",
          type: "savings",
          institution: "Banco ABC",
          balance: 45750.00,
          currency: "BRL",
          lastSync: new Date(Date.now() - 86400000) // ontem
        },
        {
          id: "acc-003",
          name: "Cartão de Crédito",
          type: "creditCard",
          institution: "Banco XYZ",
          balance: -2340.50,
          limit: 10000.00,
          currency: "BRL",
          lastSync: new Date(Date.now() - 86400000 * 2) // dois dias atrás
        }
      ];
      
      return accounts;
    } catch (error) {
      logger.error("[FinancialService] Erro ao obter contas financeiras:", error);
      throw error;
    }
  }

  /**
   * Busca o saldo de uma conta específica
   */
  public async fetchAccountBalance(accountId: string): Promise<number> {
    return BankSyncService.fetchAccountBalance(accountId);
  }

  /**
   * Cria um orçamento para uma categoria específica
   */
  public async createBudget(budgetData: {
    name: string;
    amount: number;
    spent: number;
    period: 'monthly' | 'yearly' | 'custom';
    category: string;
    startDate: Date;
    isActive: boolean;
  }): Promise<any> {
    try {
      // Verificar se o usuário está autenticado
      if (!AuthService.isAuthenticated()) {
        throw new Error("Usuário não autenticado para criar orçamento");
      }
      
      logger.info(`[FinancialService] Criando orçamento: ${budgetData.name}`);
      
      // Simular uma operação assíncrona
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Gerar ID único para o novo orçamento
      const budgetId = `budget-${Date.now().toString(36)}`;
      
      // Criar objeto do orçamento com os dados fornecidos
      const budget = {
        id: budgetId,
        ...budgetData,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      logger.info(`[FinancialService] Orçamento ${budgetId} criado com sucesso`);
      return budget;
    } catch (error) {
      logger.error("[FinancialService] Erro ao criar orçamento:", error);
      throw error;
    }
  }
}

// Exportar singleton
export default FinancialService.getInstance();
