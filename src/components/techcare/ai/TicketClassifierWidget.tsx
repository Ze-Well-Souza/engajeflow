
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tag, CheckCircle, AlertTriangle, Loader2, HelpCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AIService, { TextClassificationResult } from '@/services/techcare/AIService';

interface TicketClassifierWidgetProps {
  text: string;
  onClassificationComplete?: (result: TextClassificationResult) => void;
  autoClassify?: boolean;
  compact?: boolean;
}

const TicketClassifierWidget: React.FC<TicketClassifierWidgetProps> = ({ 
  text, 
  onClassificationComplete,
  autoClassify = false,
  compact = false
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(autoClassify);
  const [classification, setClassification] = useState<TextClassificationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  React.useEffect(() => {
    if (autoClassify && text) {
      classifyText();
    }
  }, [text, autoClassify]);
  
  const classifyText = async () => {
    if (!text.trim()) {
      setError("Não há texto para classificar");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await AIService.classifyText(text);
      
      if (result.success && result.data) {
        setClassification(result.data);
        if (onClassificationComplete) {
          onClassificationComplete(result.data);
        }
      } else {
        setError(result.error || "Erro desconhecido durante a classificação");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Erro na classificação de ticket");
    } finally {
      setIsLoading(false);
    }
  };
  
  const getCategoryLabel = (category: string): string => {
    // Tradução das categorias retornadas pela API
    const categories: Record<string, string> = {
      "suporte_tecnico": "Suporte Técnico",
      "cobranca": "Cobrança",
      "elogio": "Elogio",
      "reclamacao": "Reclamação",
      "duvida": "Dúvida",
      "marketing": "Marketing",
      "parceria": "Parceria"
    };
    
    return categories[category] || category;
  };
  
  const getCategoryIcon = (category: string) => {
    // Ícones diferentes para cada categoria
    switch (category) {
      case "suporte_tecnico":
        return <HelpCircle className="h-4 w-4" />;
      case "cobranca":
        return <Tag className="h-4 w-4" />;
      case "elogio":
        return <CheckCircle className="h-4 w-4" />;
      case "reclamacao":
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Tag className="h-4 w-4" />;
    }
  };
  
  const getCategoryColor = (category: string): string => {
    // Cores diferentes para cada categoria
    switch (category) {
      case "suporte_tecnico":
        return "bg-blue-500/20 text-blue-700";
      case "cobranca":
        return "bg-purple-500/20 text-purple-700";
      case "elogio":
        return "bg-green-500/20 text-green-700";
      case "reclamacao":
        return "bg-red-500/20 text-red-700";
      case "duvida":
        return "bg-amber-500/20 text-amber-700";
      default:
        return "bg-gray-500/20 text-gray-700";
    }
  };
  
  const getConfidenceLabel = (confidence: number): string => {
    const confidencePercent = confidence * 100;
    if (confidencePercent > 90) return "Muito alta";
    if (confidencePercent > 75) return "Alta";
    if (confidencePercent > 50) return "Média";
    if (confidencePercent > 25) return "Baixa";
    return "Muito baixa";
  };
  
  // Renderização compacta (para uso em cards de tickets/mensagens)
  if (compact) {
    return (
      <div className="flex items-center gap-1.5">
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        ) : classification ? (
          <>
            {getCategoryIcon(classification.category)}
            <Badge 
              className={getCategoryColor(classification.category)} 
              variant="secondary"
            >
              {getCategoryLabel(classification.category)}
            </Badge>
          </>
        ) : (
          error ? (
            <Badge variant="destructive" className="text-xs">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Erro
            </Badge>
          ) : (
            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs" onClick={classifyText}>
              Classificar
            </Button>
          )
        )}
      </div>
    );
  }
  
  // Renderização completa
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          <Tag className="h-5 w-5" />
          Classificação de Ticket
        </CardTitle>
        <CardDescription>
          Identificação automática do tipo de atendimento
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-6">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
            <p className="text-sm text-muted-foreground">Classificando ticket...</p>
          </div>
        ) : error ? (
          <div className="text-center py-4">
            <AlertTriangle className="h-8 w-8 text-destructive mx-auto mb-2" />
            <p className="text-sm text-destructive font-medium">{error}</p>
            <Button variant="outline" size="sm" className="mt-4" onClick={classifyText}>
              Tentar novamente
            </Button>
          </div>
        ) : classification ? (
          <>
            <div className="flex flex-col items-center justify-center mb-4 py-2">
              <div className={`rounded-full p-4 ${getCategoryColor(classification.category)} mb-2`}>
                {getCategoryIcon(classification.category)}
              </div>
              <h3 className="text-xl font-bold">{getCategoryLabel(classification.category)}</h3>
              <Badge variant="outline" className="mt-1">
                Confiança: {getConfidenceLabel(classification.confidence)} ({(classification.confidence * 100).toFixed(0)}%)
              </Badge>
            </div>
            
            {classification.subcategories && classification.subcategories.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-1">Subcategorias detectadas:</h4>
                <div className="flex flex-wrap gap-1">
                  {classification.subcategories.map((subcat, index) => (
                    <Badge key={index} variant="secondary">
                      {getCategoryLabel(subcat)}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            <div className="text-sm text-muted-foreground mb-4">
              <p className="line-clamp-3">"{text}"</p>
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={classifyText}
            >
              Reclassificar
            </Button>
          </>
        ) : (
          <div className="text-center py-6">
            <Button onClick={classifyText}>
              Classificar ticket
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              Clique para classificar o tipo de atendimento
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TicketClassifierWidget;
