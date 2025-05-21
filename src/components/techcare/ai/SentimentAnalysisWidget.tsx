
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown, MessageSquare, AlertTriangle, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AIService, { SentimentAnalysisResult } from '@/services/techcare/AIService';

interface SentimentAnalysisWidgetProps {
  text: string;
  onAnalysisComplete?: (result: SentimentAnalysisResult) => void;
  autoAnalyze?: boolean;
  compact?: boolean;
}

const SentimentAnalysisWidget: React.FC<SentimentAnalysisWidgetProps> = ({ 
  text, 
  onAnalysisComplete,
  autoAnalyze = false,
  compact = false
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(autoAnalyze);
  const [analysis, setAnalysis] = useState<SentimentAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  React.useEffect(() => {
    if (autoAnalyze && text) {
      analyzeText();
    }
  }, [text, autoAnalyze]);
  
  const analyzeText = async () => {
    if (!text.trim()) {
      setError("Não há texto para analisar");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await AIService.analyzeSentiment(text);
      
      if (result.success && result.data) {
        setAnalysis(result.data);
        if (onAnalysisComplete) {
          onAnalysisComplete(result.data);
        }
      } else {
        setError(result.error || "Erro desconhecido durante a análise");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Erro na análise de sentimento");
    } finally {
      setIsLoading(false);
    }
  };
  
  const getSentimentIcon = () => {
    if (!analysis) return <MessageSquare className="h-5 w-5 text-blue-500" />;
    
    switch (analysis.sentiment) {
      case "positive":
        return <ThumbsUp className="h-5 w-5 text-green-500" />;
      case "negative":
        return <ThumbsDown className="h-5 w-5 text-red-500" />;
      default:
        return <MessageSquare className="h-5 w-5 text-blue-500" />;
    }
  };
  
  const getSentimentLabel = () => {
    if (!analysis) return "Sem análise";
    
    switch (analysis.sentiment) {
      case "positive":
        return "Sentimento Positivo";
      case "negative":
        return "Sentimento Negativo";
      default:
        return "Sentimento Neutro";
    }
  };
  
  const getSentimentColor = () => {
    if (!analysis) return "bg-muted";
    
    switch (analysis.sentiment) {
      case "positive":
        return "bg-green-500/20";
      case "negative":
        return "bg-red-500/20";
      default:
        return "bg-blue-500/20";
    }
  };
  
  const getConfidenceLabel = () => {
    if (!analysis) return "";
    
    const confidence = analysis.confidence * 100;
    if (confidence > 90) return "Muito alta";
    if (confidence > 75) return "Alta";
    if (confidence > 50) return "Média";
    if (confidence > 25) return "Baixa";
    return "Muito baixa";
  };
  
  // Renderização compacta (para uso em cards de tickets/mensagens)
  if (compact) {
    return (
      <div className="flex items-center gap-1.5">
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        ) : analysis ? (
          <>
            {getSentimentIcon()}
            <span className="text-xs font-medium">{getSentimentLabel()}</span>
            <Badge variant="outline" className="text-xs px-1">
              {(analysis.score * 100).toFixed(0)}%
            </Badge>
          </>
        ) : (
          error ? (
            <Badge variant="destructive" className="text-xs">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Erro
            </Badge>
          ) : (
            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs" onClick={analyzeText}>
              Analisar
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
          {getSentimentIcon()}
          Análise de Sentimento
        </CardTitle>
        <CardDescription>
          Análise baseada no texto do cliente
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-6">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
            <p className="text-sm text-muted-foreground">Analisando texto...</p>
          </div>
        ) : error ? (
          <div className="text-center py-4">
            <AlertTriangle className="h-8 w-8 text-destructive mx-auto mb-2" />
            <p className="text-sm text-destructive font-medium">{error}</p>
            <Button variant="outline" size="sm" className="mt-4" onClick={analyzeText}>
              Tentar novamente
            </Button>
          </div>
        ) : analysis ? (
          <>
            <div className="text-lg font-semibold mb-2">
              {getSentimentLabel()}
              <Badge className="ml-2">{(analysis.score * 100).toFixed(0)}%</Badge>
              <Badge variant="outline" className="ml-2">Confiança: {getConfidenceLabel()}</Badge>
            </div>
            <div className="text-sm text-muted-foreground mb-4">
              <p className="line-clamp-2">"{text}"</p>
            </div>
            
            {analysis.keyPhrases.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-1">Frases-chave identificadas:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {analysis.keyPhrases.map((phrase, index) => (
                    <li key={index} className="flex gap-1.5 items-start">
                      <span className="text-primary">•</span>
                      <span>{phrase}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div className={`p-2 rounded ${analysis.sentiment === "positive" ? "bg-green-500/20" : "bg-muted"}`}>
                <ThumbsUp className="h-4 w-4 mx-auto mb-1" />
                <span className="text-xs font-medium">Positivo</span>
              </div>
              <div className={`p-2 rounded ${analysis.sentiment === "neutral" ? "bg-blue-500/20" : "bg-muted"}`}>
                <MessageSquare className="h-4 w-4 mx-auto mb-1" />
                <span className="text-xs font-medium">Neutro</span>
              </div>
              <div className={`p-2 rounded ${analysis.sentiment === "negative" ? "bg-red-500/20" : "bg-muted"}`}>
                <ThumbsDown className="h-4 w-4 mx-auto mb-1" />
                <span className="text-xs font-medium">Negativo</span>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-6">
            <Button onClick={analyzeText}>
              Analisar sentimento
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              Clique para analisar o sentimento do texto
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SentimentAnalysisWidget;
