
export interface FinancialAdvice {
  type: "das" | "irpf" | "cash_flow" | "planning";
  title: string;
  description: string;
  action: string;
  deadline?: string;
}

export interface FinancialSummary {
  income: number;
  expenses: number;
  balance: number;
  taxSavings: number;
}

export interface FinancialAdvisorWidgetProps {
  businessType?: string;
  onAdviceGenerated?: (advice: any) => void;
}
