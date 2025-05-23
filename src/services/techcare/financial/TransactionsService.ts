
import logger from "../../../utils/logger";
import AuthService from "../AuthService";
import MonitoringService from "../MonitoringService";

export interface Transaction {
  id: string;
  date: Date;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
}

export class TransactionsService {
  /**
   * Busca transações para um período especificado
   */
  public static async fetchTransactions(period: { start: Date; end: Date }): Promise<Transaction[]> {
    return MonitoringService.monitorOperation('fetch-transactions', async () => {
      // Verificar se o usuário está autenticado
      if (!AuthService.isAuthenticated()) {
        throw new Error("Usuário não autenticado para buscar transações");
      }

      logger.info(`[TransactionsService] Buscando transações de ${period.start.toLocaleDateString()} a ${period.end.toLocaleDateString()}`);
      
      // Simular uma operação assíncrona
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Dados simulados para demonstração
      const transactions: Transaction[] = [];
      const daySpan = (period.end.getTime() - period.start.getTime()) / (1000 * 3600 * 24);
      
      // Gerar dados simulados para o período
      for (let i = 0; i < daySpan; i++) {
        const currentDate = new Date(period.start.getTime() + i * 86400000);
        
        // Adicionar 0-3 transações por dia
        const transactionsForDay = Math.floor(Math.random() * 4);
        for (let j = 0; j < transactionsForDay; j++) {
          const isIncome = Math.random() > 0.4;
          const amount = isIncome ? 
            Math.round(Math.random() * 1000 * 100) / 100 : 
            -Math.round(Math.random() * 500 * 100) / 100;
          
          transactions.push({
            id: `tx-${i}-${j}`,
            date: currentDate,
            description: isIncome ? 
              `Venda #${Math.floor(Math.random() * 10000)}` : 
              `Despesa #${Math.floor(Math.random() * 10000)}`,
            amount: amount,
            type: isIncome ? "income" : "expense",
            category: isIncome ? "Vendas" : "Despesas Gerais"
          });
        }
      }
      
      logger.info(`[TransactionsService] ${transactions.length} transações encontradas`);
      return transactions;
    });
  }
}
