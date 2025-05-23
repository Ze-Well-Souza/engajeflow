import { toast } from "sonner";

// Modificado para usar importações default corretamente
import NavigationService from "./NavigationService";
import ScrapingService from "./ScrapingService";

export interface Transaction {
  id: string;
  date: Date;
  description: string;
  amount: number;
  category: string;
  type: "income" | "expense";
  accountId: string;
  tags?: string[];
  status: "pending" | "completed" | "failed";
  metadata?: Record<string, any>;
}

export interface FinancialAccount {
  id: string;
  name: string;
  type: "checking" | "savings" | "investment" | "credit";
  balance: number;
  currency: string;
  institution: string;
  accountNumber?: string;
  lastSync?: Date;
  isActive: boolean;
}

export interface FinancialReport {
  id: string;
  title: string;
  dateRange: {
    start: Date;
    end: Date;
  };
  summary: {
    totalIncome: number;
    totalExpenses: number;
    netCashflow: number;
  };
  categories: Array<{
    name: string;
    amount: number;
    percentage: number;
  }>;
  generatedAt: Date;
}

export interface Budget {
  id: string;
  name: string;
  amount: number;
  spent: number;
  period: "weekly" | "monthly" | "yearly";
  category: string;
  startDate: Date;
  endDate?: Date;
  isActive: boolean;
}

export class FinancialServiceImpl {
  private accounts: FinancialAccount[] = [];
  private transactions: Transaction[] = [];
  private budgets: Budget[] = [];
  private reports: FinancialReport[] = [];
  
  // Adicionando instâncias dos serviços que estão sendo usados
  private navigationService = NavigationService;
  private scrapingService = ScrapingService;

  constructor() {
    // Inicializar com dados de exemplo
    this.initializeMockData();
  }

  private initializeMockData() {
    // Contas
    this.accounts = [
      {
        id: "acc-001",
        name: "Conta Corrente Principal",
        type: "checking",
        balance: 5432.10,
        currency: "BRL",
        institution: "Banco TechCare",
        accountNumber: "12345-6",
        lastSync: new Date(),
        isActive: true
      },
      {
        id: "acc-002",
        name: "Poupança",
        type: "savings",
        balance: 12500.00,
        currency: "BRL",
        institution: "Banco TechCare",
        accountNumber: "12345-7",
        lastSync: new Date(),
        isActive: true
      }
    ];

    // Transações de exemplo
    const today = new Date();
    this.transactions = [
      {
        id: "tx-001",
        date: new Date(today.setDate(today.getDate() - 1)),
        description: "Supermercado TechCare",
        amount: -275.50,
        category: "Alimentação",
        type: "expense",
        accountId: "acc-001",
        tags: ["essencial"],
        status: "completed"
      },
      {
        id: "tx-002",
        date: new Date(today.setDate(today.getDate() - 3)),
        description: "Salário",
        amount: 4500.00,
        category: "Salário",
        type: "income",
        accountId: "acc-001",
        status: "completed"
      },
      {
        id: "tx-003",
        date: new Date(today.setDate(today.getDate() - 7)),
        description: "Restaurante Bom Sabor",
        amount: -120.00,
        category: "Alimentação",
        type: "expense",
        accountId: "acc-001",
        tags: ["lazer"],
        status: "completed"
      },
      {
        id: "tx-004",
        date: new Date(today.setDate(today.getDate() - 10)),
        description: "Investimento CDB",
        amount: 1000.00,
        category: "Investimentos",
        type: "income",
        accountId: "acc-002",
        status: "completed"
      },
      {
        id: "tx-005",
        date: new Date(today.setDate(today.getDate() - 14)),
        description: "Aluguel Apartamento",
        amount: -1500.00,
        category: "Moradia",
        type: "expense",
        accountId: "acc-001",
        status: "completed"
      }
    ];

    // Orçamentos de exemplo
    this.budgets = [
      {
        id: "bud-001",
        name: "Alimentação Mensal",
        amount: 1000.00,
        spent: 450.00,
        period: "monthly",
        category: "Alimentação",
        startDate: new Date(today.getFullYear(), today.getMonth(), 1),
        isActive: true
      },
      {
        id: "bud-002",
        name: "Transporte Semanal",
        amount: 200.00,
        spent: 120.00,
        period: "weekly",
        category: "Transporte",
        startDate: new Date(today.setDate(today.getDate() - today.getDay())),
        isActive: true
      }
    ];

    // Relatórios de exemplo
    this.reports = [
      {
        id: "rep-001",
        title: "Relatório Financeiro Mensal",
        dateRange: {
          start: new Date(today.getFullYear(), today.getMonth(), 1),
          end: new Date(today.getFullYear(), today.getMonth() + 1, 0)
        },
        summary: {
          totalIncome: 4500.00,
          totalExpenses: 3200.00,
          netCashflow: 1300.00
        },
        categories: [
          { name: "Alimentação", amount: 800.00, percentage: 25 },
          { name: "Transporte", amount: 500.00, percentage: 15.6 },
          { name: "Moradia", amount: 1200.00, percentage: 37.5 },
          { name: "Entretenimento", amount: 400.00, percentage: 12.5 },
          { name: "Outros", amount: 300.00, percentage: 9.4 }
        ],
        generatedAt: new Date()
      }
    ];
  }

  async syncBankAccounts(): Promise<boolean> {
    try {
      // Simulação de sincronização com navegação web automatizada
      this.navigationService.openBrowser();
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      this.navigationService.navigateToUrl("https://banco.exemplo.com.br");
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Restante do processo...
      toast.success("Contas bancárias sincronizadas com sucesso");
      return true;
    } catch (error) {
      console.error("Erro ao sincronizar contas:", error);
      toast.error("Falha ao sincronizar contas bancárias");
      return false;
    }
  }

  async importTransactionsFromCSV(fileContent: string): Promise<number> {
    try {
      // Simulação de processamento de CSV
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const numImported = Math.floor(Math.random() * 15) + 5;
      toast.success(`${numImported} transações importadas com sucesso`);
      return numImported;
    } catch (error) {
      console.error("Erro ao importar transações:", error);
      toast.error("Falha ao importar transações");
      return 0;
    }
  }

  async fetchTransactions(
    dateRange?: { start: Date; end: Date },
    categories?: string[],
    accountIds?: string[]
  ): Promise<Transaction[]> {
    // Simulação de busca de transações com filtros
    await new Promise(resolve => setTimeout(resolve, 800));
    
    let filtered = [...this.transactions];
    
    if (dateRange) {
      filtered = filtered.filter(
        t => t.date >= dateRange.start && t.date <= dateRange.end
      );
    }
    
    if (categories && categories.length > 0) {
      filtered = filtered.filter(t => categories.includes(t.category));
    }
    
    if (accountIds && accountIds.length > 0) {
      filtered = filtered.filter(t => accountIds.includes(t.accountId));
    }
    
    return filtered;
  }

  async generateFinancialReport(
    options: {
      startDate: Date;
      endDate: Date;
      includeCategories?: boolean;
      includeTags?: boolean;
    }
  ): Promise<FinancialReport> {
    try {
      // Simulação de geração de relatório
      this.navigationService.openBrowser();
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Processar dados...
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Fechar navegador
      this.navigationService.closeBrowser();
      
      // Criar relatório
      const report: FinancialReport = {
        id: `report-${Date.now()}`,
        title: `Relatório Financeiro ${options.startDate.toLocaleDateString()} - ${options.endDate.toLocaleDateString()}`,
        dateRange: {
          start: options.startDate,
          end: options.endDate
        },
        summary: {
          totalIncome: 4500.00,
          totalExpenses: 3200.00,
          netCashflow: 1300.00
        },
        categories: [
          { name: "Alimentação", amount: 800.00, percentage: 25 },
          { name: "Transporte", amount: 500.00, percentage: 15.6 },
          { name: "Moradia", amount: 1200.00, percentage: 37.5 },
          { name: "Entretenimento", amount: 400.00, percentage: 12.5 },
          { name: "Outros", amount: 300.00, percentage: 9.4 }
        ],
        generatedAt: new Date()
      };
      
      this.reports.push(report);
      toast.success("Relatório financeiro gerado com sucesso");
      
      return report;
    } catch (error) {
      console.error("Erro ao gerar relatório:", error);
      toast.error("Falha ao gerar relatório financeiro");
      throw error;
    }
  }

  async fetchAccountBalance(accountId: string): Promise<number> {
    try {
      // Simulação de obtenção de saldo atualizado
      this.navigationService.openBrowser();
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      const account = this.accounts.find(acc => acc.id === accountId);
      
      if (!account) {
        throw new Error("Conta não encontrada");
      }
      
      // Atualizar saldo
      account.balance = Math.round(account.balance * (1 + (Math.random() * 0.02 - 0.01)) * 100) / 100;
      account.lastSync = new Date();
      
      return account.balance;
    } catch (error) {
      console.error("Erro ao buscar saldo:", error);
      throw error;
    }
  }

  async createBudget(budget: Omit<Budget, "id">): Promise<Budget> {
    try {
      const newBudget: Budget = {
        ...budget,
        id: `budget-${Date.now()}`,
        spent: 0
      };
      
      this.budgets.push(newBudget);
      toast.success("Orçamento criado com sucesso");
      
      return newBudget;
    } catch (error) {
      console.error("Erro ao criar orçamento:", error);
      toast.error("Falha ao criar orçamento");
      throw error;
    }
  }

  getFinancialAccounts(): FinancialAccount[] {
    return this.accounts;
  }

  getTransactions(): Transaction[] {
    return this.transactions;
  }

  getBudgets(): Budget[] {
    return this.budgets;
  }

  getReports(): FinancialReport[] {
    return this.reports;
  }

  updateAccount(accountId: string, updates: Partial<FinancialAccount>): FinancialAccount | undefined {
    const accountIndex = this.accounts.findIndex(acc => acc.id === accountId);
    if (accountIndex === -1) {
      console.warn(`Conta com ID ${accountId} não encontrada`);
      return undefined;
    }

    this.accounts[accountIndex] = {
      ...this.accounts[accountIndex],
      ...updates
    };

    toast.success(`Conta ${this.accounts[accountIndex].name} atualizada com sucesso`);
    return this.accounts[accountIndex];
  }

  deleteAccount(accountId: string): boolean {
    const initialLength = this.accounts.length;
    this.accounts = this.accounts.filter(acc => acc.id !== accountId);

    if (this.accounts.length < initialLength) {
      toast.success("Conta removida com sucesso");
      return true;
    } else {
      toast.error("Falha ao remover conta");
      return false;
    }
  }
}

const FinancialService = new FinancialServiceImpl();
export default FinancialService;
