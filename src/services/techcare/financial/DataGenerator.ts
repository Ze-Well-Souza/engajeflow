
/**
 * Gerador de dados financeiros simulados
 */
import { 
  CashFlowData, 
  AccountReceivable, 
  AccountPayable, 
  FinancialReport, 
  PeriodType, 
  TimeInterval 
} from './types';

export class DataGenerator {
  /**
   * Gera dados simulados de fluxo de caixa
   */
  static generateCashFlowData(startDate: string, endDate: string): CashFlowData {
    const transactions = [];
    let currentDate = new Date(startDate);
    const endDateTime = new Date(endDate);
    
    let totalIncome = 0;
    let totalExpense = 0;
    
    // Gerar transações para cada dia no período
    while (currentDate <= endDateTime) {
      const dateStr = currentDate.toISOString().split('T')[0];
      
      // Simular entrada
      if (Math.random() > 0.3) {
        const incomeAmount = Math.round(Math.random() * 1000) + 500;
        totalIncome += incomeAmount;
        transactions.push({
          date: dateStr,
          description: `Venda de serviço #${Math.floor(Math.random() * 1000)}`,
          amount: incomeAmount,
          type: 'income' as const,
          category: 'Vendas'
        });
      }
      
      // Simular saída
      if (Math.random() > 0.5) {
        const expenseAmount = Math.round(Math.random() * 500) + 100;
        totalExpense += expenseAmount;
        transactions.push({
          date: dateStr,
          description: `Pagamento de fornecedor #${Math.floor(Math.random() * 1000)}`,
          amount: expenseAmount,
          type: 'expense' as const,
          category: 'Fornecedores'
        });
      }
      
      // Próximo dia
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return {
      period: {
        start: startDate,
        end: endDate
      },
      summary: {
        income: totalIncome,
        expenses: totalExpense,
        balance: totalIncome - totalExpense
      },
      transactions: transactions
    };
  }

  /**
   * Gera dados simulados de contas a receber
   */
  static generateAccountsReceivableData(status?: string): AccountReceivable[] {
    const accounts: AccountReceivable[] = [];
    const statuses: ('open' | 'paid' | 'overdue' | 'partial')[] = ['open', 'paid', 'overdue', 'partial'];
    
    // Se um status específico foi solicitado, filtrar para esse status
    const statusesToUse = status ? [status as 'open' | 'paid' | 'overdue' | 'partial'] : statuses;
    
    // Gerar entre 5 e 15 contas
    const count = Math.floor(Math.random() * 10) + 5;
    
    for (let i = 0; i < count; i++) {
      const randomStatus = statusesToUse[Math.floor(Math.random() * statusesToUse.length)];
      const amount = Math.round(Math.random() * 2000) + 500;
      
      // Criar data de vencimento
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + Math.floor(Math.random() * 30) - 15); // -15 a +15 dias
      
      // Criar data de criação
      const createdAt = new Date();
      createdAt.setDate(createdAt.getDate() - Math.floor(Math.random() * 30) - 5); // -5 a -35 dias
      
      const account: AccountReceivable = {
        invoiceId: `INV-${1000 + i}`,
        clientName: `Cliente ${i + 1}`,
        amount: amount,
        dueDate: dueDate.toISOString().split('T')[0],
        status: randomStatus,
        createdAt: createdAt.toISOString().split('T')[0]
      };
      
      // Adicionar informações de pagamento para contas pagas ou parcialmente pagas
      if (randomStatus === 'paid' || randomStatus === 'partial') {
        const paidDate = new Date();
        paidDate.setDate(paidDate.getDate() - Math.floor(Math.random() * 10)); // 0 a -10 dias
        
        account.paidAt = paidDate.toISOString().split('T')[0];
        account.paidAmount = randomStatus === 'paid' ? amount : Math.round(amount * (Math.random() * 0.7 + 0.1)); // 10% a 80% do valor
      }
      
      accounts.push(account);
    }
    
    return accounts;
  }

  /**
   * Gera dados simulados de contas a pagar
   */
  static generateAccountsPayableData(status?: string, category?: string): AccountPayable[] {
    const accounts: AccountPayable[] = [];
    const statuses: ('open' | 'paid' | 'overdue' | 'partial')[] = ['open', 'paid', 'overdue', 'partial'];
    const categories = ['Fornecedores', 'Serviços', 'Infraestrutura', 'Salários', 'Marketing', 'Impostos'];
    
    // Se um status específico foi solicitado, filtrar para esse status
    const statusesToUse = status ? [status as 'open' | 'paid' | 'overdue' | 'partial'] : statuses;
    
    // Se uma categoria específica foi solicitada, filtrar para essa categoria
    const categoriesToUse = category ? [category] : categories;
    
    // Gerar entre 5 e 15 contas
    const count = Math.floor(Math.random() * 10) + 5;
    
    for (let i = 0; i < count; i++) {
      const randomStatus = statusesToUse[Math.floor(Math.random() * statusesToUse.length)];
      const randomCategory = categoriesToUse[Math.floor(Math.random() * categoriesToUse.length)];
      const amount = Math.round(Math.random() * 1500) + 300;
      
      // Criar data de vencimento
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + Math.floor(Math.random() * 30) - 10); // -10 a +20 dias
      
      // Criar data de criação
      const createdAt = new Date();
      createdAt.setDate(createdAt.getDate() - Math.floor(Math.random() * 20) - 5); // -5 a -25 dias
      
      const account: AccountPayable = {
        billId: `BILL-${2000 + i}`,
        supplierName: `Fornecedor ${i + 1}`,
        amount: amount,
        dueDate: dueDate.toISOString().split('T')[0],
        status: randomStatus,
        createdAt: createdAt.toISOString().split('T')[0],
        category: randomCategory
      };
      
      // Adicionar informações de pagamento para contas pagas ou parcialmente pagas
      if (randomStatus === 'paid' || randomStatus === 'partial') {
        const paidDate = new Date();
        paidDate.setDate(paidDate.getDate() - Math.floor(Math.random() * 8)); // 0 a -8 dias
        
        account.paidAt = paidDate.toISOString().split('T')[0];
        account.paidAmount = randomStatus === 'paid' ? amount : Math.round(amount * (Math.random() * 0.7 + 0.2)); // 20% a 90% do valor
      }
      
      accounts.push(account);
    }
    
    return accounts;
  }
}
