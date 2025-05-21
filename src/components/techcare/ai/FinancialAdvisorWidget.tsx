
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Calculator, Loader2, AlertTriangle, RefreshCcw, Calendar, DollarSign, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface FinancialAdvisorWidgetProps {
  businessType?: string;
  onAdviceGenerated?: (advice: any) => void;
}

interface FinancialAdvice {
  type: "das" | "irpf" | "cash_flow" | "planning";
  title: string;
  description: string;
  action: string;
  deadline?: string;
}

interface FinancialSummary {
  income: number;
  expenses: number;
  balance: number;
  taxSavings: number;
}

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
  
  const getTagColor = (type: string) => {
    switch (type) {
      case "das":
        return "bg-blue-100 text-blue-800";
      case "irpf":
        return "bg-purple-100 text-purple-800";
      case "cash_flow":
        return "bg-green-100 text-green-800";
      case "planning":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
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
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
            <p className="text-sm text-muted-foreground">Analisando sua situação fiscal...</p>
          </div>
        ) : error ? (
          <div className="text-center py-6">
            <AlertTriangle className="h-8 w-8 text-destructive mx-auto mb-2" />
            <p className="text-sm text-destructive font-medium">{error}</p>
            <Button variant="outline" size="sm" className="mt-4" onClick={generateAdvice}>
              Tentar novamente
            </Button>
          </div>
        ) : advice && summary ? (
          <div>
            <Tabs defaultValue="summary" className="w-full">
              <TabsList className="w-full grid grid-cols-2 mb-4">
                <TabsTrigger value="summary">Resumo Fiscal</TabsTrigger>
                <TabsTrigger value="advice">Recomendações</TabsTrigger>
              </TabsList>
              
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
                  <form onSubmit={handleQuerySubmit} className="flex gap-2">
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
              
              <TabsContent value="advice" className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Recomendações fiscais com base na análise do seu negócio:
                </p>
                
                {advice.map((item, index) => (
                  <div key={index} className="bg-muted p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium flex items-center gap-1">
                        <Badge className={getTagColor(item.type)}>
                          {item.type === "das" && "DAS-MEI"}
                          {item.type === "irpf" && "IRPF"}
                          {item.type === "cash_flow" && "Fluxo de Caixa"}
                          {item.type === "planning" && "Planejamento"}
                        </Badge>
                        <span>{item.title}</span>
                      </h4>
                      {item.deadline && (
                        <div className="flex items-center text-xs">
                          <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                          <span>{item.deadline}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                    <div className="text-xs font-medium text-primary">
                      Ação recomendada: {item.action}
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="text-center py-10 space-y-4">
            <Calculator className="h-12 w-12 text-primary mx-auto" />
            <h3 className="text-lg font-medium">Consultoria fiscal personalizada</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Nossa IA analisará seu perfil fiscal e fornecerá orientações sobre impostos, 
              prazos e estratégias para otimizar suas finanças como empreendedor.
            </p>
            <Button onClick={generateAdvice}>
              Gerar consultoria fiscal
            </Button>
          </div>
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
