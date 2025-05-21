
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Calculator, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { 
  FinancialAdvice, 
  FinancialSummary, 
  FinancialAdvisorWidgetProps 
} from './financial-advisor/types';
import LoadingState from './financial-advisor/LoadingState';
import ErrorState from './financial-advisor/ErrorState';
import EmptyState from './financial-advisor/EmptyState';
import SummaryTab from './financial-advisor/SummaryTab';
import AdviceTab from './financial-advisor/AdviceTab';

const FinancialAdvisorWidget: React.FC<FinancialAdvisorWidgetProps> = ({
  businessType = "mei",
  onAdviceGenerated
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [advice, setAdvice] = useState<FinancialAdvice[] | null>(null);
  const [summary, setSummary] = useState<FinancialSummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const generateAdvice = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Em produção, isso seria uma chamada real à API de IA
      // Dados simulados para demonstração
      setTimeout(() => {
        const demoAdvice: FinancialAdvice[] = [
          {
            type: "das",
            title: "Pagamento DAS-MEI",
            description: "O DAS (Documento de Arrecadação do Simples Nacional) para MEI vence no dia 20 deste mês.",
            action: "Separar R$ 66,00 para pagamento",
            deadline: "20/05/2025"
          },
          {
            type: "irpf",
            title: "Declaração de Imposto de Renda",
            description: "Com faturamento anual superior a R$ 28.559,70, você precisa declarar o IR como pessoa física.",
            action: "Organizar notas fiscais e documentos",
            deadline: "31/05/2025"
          },
          {
            type: "cash_flow",
            title: "Gestão de Fluxo de Caixa",
            description: "Suas despesas fixas representam 35% do faturamento mensal, o que está dentro do recomendado.",
            action: "Manter controle sobre custos fixos",
          },
          {
            type: "planning",
            title: "Planejamento Fiscal",
            description: "Você está próximo do limite de faturamento anual do MEI (R$ 81.000). Considere planejar a transição para ME.",
            action: "Consultar contador para simular tributação como ME",
          }
        ];
        
        const demoSummary: FinancialSummary = {
          income: 7850,
          expenses: 3250,
          balance: 4600,
          taxSavings: 850
        };
        
        setAdvice(demoAdvice);
        setSummary(demoSummary);
        setIsLoading(false);
        
        if (onAdviceGenerated) {
          onAdviceGenerated({
            advice: demoAdvice,
            summary: demoSummary
          });
        }
      }, 2000);
      
    } catch (error) {
      setError("Erro ao gerar consultoria fiscal");
      setIsLoading(false);
    }
  };
  
  const handleQuerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) {
      return;
    }
    
    // Aqui seria feita a integração com o serviço de IA para responder a pergunta
    toast.success("Função disponível em breve");
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Consultoria Fiscal IA
        </CardTitle>
        <CardDescription>
          Orientação financeira personalizada para seu negócio
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState error={error} onRetry={generateAdvice} />
        ) : advice && summary ? (
          <div>
            <Tabs defaultValue="summary" className="w-full">
              <TabsList className="w-full grid grid-cols-2 mb-4">
                <TabsTrigger value="summary">Resumo Fiscal</TabsTrigger>
                <TabsTrigger value="advice">Recomendações</TabsTrigger>
              </TabsList>
              
              <SummaryTab 
                summary={summary} 
                query={query}
                setQuery={setQuery}
                onSubmit={handleQuerySubmit}
              />
              <AdviceTab advice={advice} />
            </Tabs>
          </div>
        ) : (
          <EmptyState onGenerate={generateAdvice} />
        )}
      </CardContent>
      {advice && summary && (
        <>
          <Separator />
          <CardFooter className="pt-4">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={generateAdvice}
            >
              <RefreshCcw className="h-4 w-4 mr-2" /> Atualizar análise
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export default FinancialAdvisorWidget;
