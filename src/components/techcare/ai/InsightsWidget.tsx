
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { 
  Lightbulb, 
  Loader2, 
  AlertTriangle, 
  TrendingUp, 
  ArrowUpRight,
  ArrowDownRight, 
  RefreshCcw,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import AIService, { AIInsight } from '@/services/techcare/AIService';

interface InsightsWidgetProps {
  data?: any;
  onInsightsGenerated?: (insights: AIInsight[]) => void;
  autoGenerate?: boolean;
}

const InsightsWidget: React.FC<InsightsWidgetProps> = ({
  data,
  onInsightsGenerated,
  autoGenerate = false
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(autoGenerate);
  const [insights, setInsights] = useState<AIInsight[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  React.useEffect(() => {
    if (autoGenerate) {
      generateInsights();
    }
  }, [autoGenerate]);
  
  const generateInsights = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Usar dados fornecidos ou dados de exemplo
      const analysisData = data || {
        conversations: 245,
        averageResponseTime: 3.5,
        satisfactionScore: 4.2,
        ticketsResolved: 189,
        topIssues: ["login", "payment", "export"]
      };
      
      const result = await AIService.generateInsights(analysisData);
      
      if (result.success && result.data) {
        setInsights(result.data);
        if (onInsightsGenerated) {
          onInsightsGenerated(result.data);
        }
      } else {
        setError(result.error || "Erro desconhecido durante a geração de insights");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Erro na geração de insights");
    } finally {
      setIsLoading(false);
    }
  };
  
  const getPriorityColor = (priority: "high" | "medium" | "low"): string => {
    switch (priority) {
      case "high":
        return "bg-red-500/20 text-red-700";
      case "medium":
        return "bg-amber-500/20 text-amber-700";
      case "low":
        return "bg-blue-500/20 text-blue-700";
      default:
        return "bg-gray-500/20 text-gray-700";
    }
  };
  
  const getPriorityLabel = (priority: "high" | "medium" | "low"): string => {
    switch (priority) {
      case "high":
        return "Alta Prioridade";
      case "medium":
        return "Média Prioridade";
      case "low":
        return "Baixa Prioridade";
      default:
        return "Prioridade";
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-amber-500" />
          Insights Inteligentes
        </CardTitle>
        <CardDescription>
          Análise de dados e recomendações
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-6">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
            <p className="text-sm text-muted-foreground">Analisando dados e gerando insights...</p>
          </div>
        ) : error ? (
          <div className="text-center py-4">
            <AlertTriangle className="h-8 w-8 text-destructive mx-auto mb-2" />
            <p className="text-sm text-destructive font-medium">{error}</p>
            <Button variant="outline" size="sm" className="mt-4" onClick={generateInsights}>
              Tentar novamente
            </Button>
          </div>
        ) : insights && insights.length > 0 ? (
          <div className="space-y-4">
            {insights.map((insight, index) => (
              <div key={index} className="rounded-lg border p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-base font-medium">{insight.title}</h3>
                  <Badge 
                    variant="secondary"
                    className={getPriorityColor(insight.priority)}
                  >
                    {getPriorityLabel(insight.priority)}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
                
                {Object.keys(insight.metrics).length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
                    {Object.entries(insight.metrics).map(([key, value], i) => (
                      <div key={i} className="bg-muted rounded-md p-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center justify-between">
                                <span className="text-xs capitalize">
                                  {key.replace(/_/g, ' ')}
                                </span>
                                {typeof value === 'number' && value > 0 ? (
                                  <ArrowUpRight className="h-3 w-3 text-green-500" />
                                ) : (
                                  <ArrowDownRight className="h-3 w-3 text-red-500" />
                                )}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Métrica de análise IA</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <p className="text-sm font-medium">
                          {typeof value === 'number' && value % 1 === 0 
                            ? value.toLocaleString() 
                            : typeof value === 'number'
                              ? value.toFixed(2)
                              : value}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                
                {insight.recommendations.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="h-3 w-3 text-amber-500" />
                      <h4 className="text-xs font-medium">Recomendações:</h4>
                    </div>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {insight.recommendations.map((rec, i) => (
                        <li key={i} className="flex gap-1.5 items-start">
                          <span className="text-primary">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {index < insights.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <Button onClick={generateInsights}>
              Gerar insights
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              Clique para analisar os dados e gerar insights
            </p>
          </div>
        )}
      </CardContent>
      {insights && insights.length > 0 && (
        <>
          <Separator />
          <CardFooter className="pt-4 flex justify-between items-center">
            <p className="text-xs text-muted-foreground">
              Insights baseados em análise de dados com IA
            </p>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={generateInsights}
              className="h-8"
            >
              <RefreshCcw className="h-3 w-3 mr-1" /> Atualizar
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export default InsightsWidget;
