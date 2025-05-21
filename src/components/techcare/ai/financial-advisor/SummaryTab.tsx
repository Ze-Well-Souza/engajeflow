
import React from 'react';
import { DollarSign } from "lucide-react";
import { TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FinancialSummary } from './types';
import { toast } from "sonner";

interface SummaryTabProps {
  summary: FinancialSummary;
  query: string;
  setQuery: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const SummaryTab: React.FC<SummaryTabProps> = ({ summary, query, setQuery, onSubmit }) => {
  return (
    <TabsContent value="summary" className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-muted p-3 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Receitas</span>
            <DollarSign className="h-3 w-3 text-green-500" />
          </div>
          <p className="text-lg font-semibold text-green-600">
            R$ {summary.income.toLocaleString('pt-BR')}
          </p>
        </div>
        
        <div className="bg-muted p-3 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Despesas</span>
            <DollarSign className="h-3 w-3 text-red-500" />
          </div>
          <p className="text-lg font-semibold text-red-600">
            R$ {summary.expenses.toLocaleString('pt-BR')}
          </p>
        </div>
        
        <div className="bg-muted p-3 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Saldo</span>
            <DollarSign className="h-3 w-3 text-blue-500" />
          </div>
          <p className="text-lg font-semibold text-blue-600">
            R$ {summary.balance.toLocaleString('pt-BR')}
          </p>
        </div>
        
        <div className="bg-muted p-3 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Economia fiscal</span>
            <DollarSign className="h-3 w-3 text-purple-500" />
          </div>
          <p className="text-lg font-semibold text-purple-600">
            R$ {summary.taxSavings.toLocaleString('pt-BR')}
          </p>
        </div>
      </div>
      
      <div className="bg-amber-50 p-3 rounded-md">
        <h4 className="text-sm font-medium text-amber-800 mb-1">Análise Financeira</h4>
        <p className="text-xs text-amber-700">
          Este mês você obteve R$ {summary.balance.toLocaleString('pt-BR')} de lucro 
          estimado com uma margem de {Math.round((summary.balance / summary.income) * 100)}%. 
          Suas despesas representam {Math.round((summary.expenses / summary.income) * 100)}% 
          do faturamento, o que está dentro de uma faixa saudável para seu segmento.
        </p>
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-2">Tire dúvidas fiscais:</h4>
        <form onSubmit={onSubmit} className="flex gap-2">
          <Input
            placeholder="Ex: Quanto devo pagar de DAS este mês?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit">Perguntar</Button>
        </form>
      </div>
    </TabsContent>
  );
};

export default SummaryTab;
