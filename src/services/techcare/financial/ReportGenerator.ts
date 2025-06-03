
/**
 * Gerador de relatórios financeiros
 */
import { FinancialReport, PeriodType, TimeInterval } from './types';

export class ReportGenerator {
  /**
   * Gera dados simulados de relatórios
   */
  static generateReportData(reportType: string, period: string): FinancialReport {
    // Definir período com base no parâmetro
    let startDate = new Date();
    let endDate = new Date();
    let periodType: PeriodType = 'monthly';
    
    switch (period) {
      case 'daily':
        periodType = 'daily';
        startDate = new Date();
        endDate = new Date();
        break;
      case 'weekly':
        periodType = 'weekly';
        startDate.setDate(startDate.getDate() - 7);
        break;
      case 'monthly':
        periodType = 'monthly';
        startDate.setMonth(startDate.getMonth() - 1);
        break;
      case 'quarterly':
        periodType = 'quarterly';
        startDate.setMonth(startDate.getMonth() - 3);
        break;
      case 'yearly':
        periodType = 'yearly';
        startDate.setFullYear(startDate.getFullYear() - 1);
        break;
      case 'last-quarter':
        periodType = 'quarterly';
        const currentMonth = startDate.getMonth();
        const quarterStartMonth = Math.floor(currentMonth / 3) * 3 - 3;
        startDate.setMonth(quarterStartMonth);
        startDate.setDate(1);
        endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + 3);
        endDate.setDate(0);
        break;
      default:
        // Padrão: mensal
        startDate.setMonth(startDate.getMonth() - 1);
    }
    
    // Formatar datas
    const formattedStart = startDate.toISOString().split('T')[0];
    const formattedEnd = endDate.toISOString().split('T')[0];
    
    // Gerar dados com base no tipo de relatório
    const reportTitle = `Relatório Financeiro: ${reportType.charAt(0).toUpperCase() + reportType.slice(1)}`;
    let reportData: any[] = [];
    
    switch (reportType) {
      case 'income':
        reportData = ReportGenerator.generateIncomeReportData(startDate, endDate, periodType);
        break;
      case 'expense':
        reportData = ReportGenerator.generateExpenseReportData(startDate, endDate, periodType);
        break;
      case 'profit':
        reportData = ReportGenerator.generateProfitReportData(startDate, endDate, periodType);
        break;
      case 'tax':
        reportData = ReportGenerator.generateTaxReportData(startDate, endDate, periodType);
        break;
      default:
        reportData = ReportGenerator.generateGenericReportData(startDate, endDate, periodType);
    }
    
    return {
      title: reportTitle,
      period: {
        start: formattedStart,
        end: formattedEnd,
        type: periodType
      },
      data: reportData
    };
  }

  /**
   * Gera dados de relatório de receitas
   */
  static generateIncomeReportData(startDate: Date, endDate: Date, periodType: PeriodType): any[] {
    const data = [];
    const categories = ['Vendas', 'Serviços', 'Assinaturas', 'Outras Receitas'];
    
    // Gerar dados para categorias
    for (const category of categories) {
      const amount = Math.round(Math.random() * 5000) + 1000;
      data.push({
        category,
        amount,
        percentage: 0 // Será calculado abaixo
      });
    }
    
    // Calcular porcentagens
    const total = data.reduce((sum, item) => sum + item.amount, 0);
    data.forEach(item => {
      item.percentage = Math.round((item.amount / total) * 100);
    });
    
    return data;
  }

  /**
   * Gera dados de relatório de despesas
   */
  static generateExpenseReportData(startDate: Date, endDate: Date, periodType: PeriodType): any[] {
    const data = [];
    const categories = ['Salários', 'Aluguel', 'Marketing', 'Fornecedores', 'Infraestrutura', 'Impostos', 'Outros'];
    
    // Gerar dados para categorias
    for (const category of categories) {
      const amount = Math.round(Math.random() * 4000) + 500;
      data.push({
        category,
        amount,
        percentage: 0 // Será calculado abaixo
      });
    }
    
    // Calcular porcentagens
    const total = data.reduce((sum, item) => sum + item.amount, 0);
    data.forEach(item => {
      item.percentage = Math.round((item.amount / total) * 100);
    });
    
    return data;
  }

  /**
   * Gera dados de relatório de lucros
   */
  static generateProfitReportData(startDate: Date, endDate: Date, periodType: PeriodType): any[] {
    const data = [];
    
    // Definir intervalo com base no tipo de período
    const intervals = ReportGenerator.getIntervals(startDate, endDate, periodType);
    
    // Para cada intervalo, gerar valor de receita e despesa
    for (const interval of intervals) {
      const revenue = Math.round(Math.random() * 8000) + 3000;
      const expenses = Math.round(Math.random() * 6000) + 2000;
      const profit = revenue - expenses;
      const margin = Math.round((profit / revenue) * 100);
      
      data.push({
        period: interval.label,
        revenue,
        expenses,
        profit,
        margin
      });
    }
    
    return data;
  }

  /**
   * Gera dados de relatório de impostos
   */
  static generateTaxReportData(startDate: Date, endDate: Date, periodType: PeriodType): any[] {
    const data = [];
    const taxTypes = ['ICMS', 'ISS', 'PIS', 'COFINS', 'IRPJ', 'CSLL'];
    
    // Gerar dados por tipo de imposto
    for (const taxType of taxTypes) {
      const baseAmount = Math.round(Math.random() * 10000) + 5000;
      const taxRate = (Math.random() * 15 + 2).toFixed(2);
      const taxAmount = Math.round(baseAmount * (parseFloat(taxRate) / 100));
      
      data.push({
        taxType,
        baseAmount,
        taxRate: `${taxRate}%`,
        taxAmount,
        dueDate: ReportGenerator.getRandomFutureDate(30).toISOString().split('T')[0]
      });
    }
    
    return data;
  }

  /**
   * Gera dados genéricos de relatório
   */
  static generateGenericReportData(startDate: Date, endDate: Date, periodType: PeriodType): any[] {
    const data = [];
    
    // Definir intervalo com base no tipo de período
    const intervals = ReportGenerator.getIntervals(startDate, endDate, periodType);
    
    // Para cada intervalo, gerar valores aleatórios
    for (const interval of intervals) {
      data.push({
        period: interval.label,
        value: Math.round(Math.random() * 5000) + 1000
      });
    }
    
    return data;
  }

  /**
   * Obtém intervalos para relatórios com base no tipo de período
   */
  static getIntervals(startDate: Date, endDate: Date, periodType: PeriodType): TimeInterval[] {
    const intervals: TimeInterval[] = [];
    const current = new Date(startDate);
    
    while (current <= endDate) {
      let label = '';
      
      switch (periodType) {
        case 'daily':
          label = current.toISOString().split('T')[0];
          current.setDate(current.getDate() + 1);
          break;
        case 'weekly':
          label = `Semana ${Math.ceil((current.getDate() + (current.getDay() + 6) % 7) / 7)}`;
          current.setDate(current.getDate() + 7);
          break;
        case 'monthly':
          label = `${current.getFullYear()}/${(current.getMonth() + 1).toString().padStart(2, '0')}`;
          current.setMonth(current.getMonth() + 1);
          break;
        case 'quarterly':
          const quarter = Math.floor(current.getMonth() / 3) + 1;
          label = `${current.getFullYear()} Q${quarter}`;
          current.setMonth(current.getMonth() + 3);
          break;
        case 'yearly':
          label = current.getFullYear().toString();
          current.setFullYear(current.getFullYear() + 1);
          break;
      }
      
      intervals.push({ date: new Date(current), label });
    }
    
    return intervals;
  }

  /**
   * Gera uma data futura aleatória
   */
  static getRandomFutureDate(maxDays: number): Date {
    const date = new Date();
    date.setDate(date.getDate() + Math.floor(Math.random() * maxDays) + 1);
    return date;
  }
}
