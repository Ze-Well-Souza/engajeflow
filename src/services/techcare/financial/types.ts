
/**
 * Tipos para o serviço financeiro
 */

/**
 * Resultado de operações financeiras
 */
export interface FinancialResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Dados de fluxo de caixa
 */
export interface CashFlowData {
  period: {
    start: string;
    end: string;
  };
  summary: {
    income: number;
    expenses: number;
    balance: number;
  };
  transactions: {
    date: string;
    description: string;
    amount: number;
    type: 'income' | 'expense';
    category: string;
  }[];
}

/**
 * Conta a receber
 */
export interface AccountReceivable {
  invoiceId: string;
  clientName: string;
  amount: number;
  dueDate: string;
  status: 'open' | 'paid' | 'overdue' | 'partial';
  createdAt: string;
  paidAmount?: number;
  paidAt?: string;
}

/**
 * Conta a pagar
 */
export interface AccountPayable {
  billId: string;
  supplierName: string;
  amount: number;
  dueDate: string;
  status: 'open' | 'paid' | 'overdue' | 'partial';
  createdAt: string;
  paidAmount?: number;
  paidAt?: string;
  category: string;
}

/**
 * Relatório financeiro
 */
export interface FinancialReport {
  title: string;
  period: {
    start: string;
    end: string;
    type: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  };
  data: any[];
}

/**
 * Tipo de período para relatório
 */
export type PeriodType = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';

/**
 * Intervalo temporal
 */
export interface TimeInterval {
  date: Date;
  label: string;
}
