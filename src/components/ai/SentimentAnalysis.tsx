
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react";

interface SentimentAnalysisProps {
  text: string;
}

const SentimentAnalysis: React.FC<SentimentAnalysisProps> = ({ text }) => {
  // Em uma implementação real, isso seria uma chamada a uma API
  // Simplificação para demonstração
  const analyzeSentiment = (text: string) => {
    const positiveWords = ['bom', 'ótimo', 'excelente', 'perfeito', 'adorei', 'gostei', 'satisfeito'];
    const negativeWords = ['ruim', 'péssimo', 'horrível', 'detestei', 'insatisfeito', 'problema'];
    
    const words = text.toLowerCase().split(/\s+/);
    let positiveCount = 0;
    let negativeCount = 0;
    
    words.forEach(word => {
      if (positiveWords.some(pw => word.includes(pw))) positiveCount++;
      if (negativeWords.some(nw => word.includes(nw))) negativeCount++;
    });
    
    if (positiveCount > negativeCount) return "positive";
    if (negativeCount > positiveCount) return "negative";
    return "neutral";
  };
  
  const sentiment = analyzeSentiment(text);
  
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          {sentiment === "positive" ? (
            <ThumbsUp className="h-5 w-5 text-green-500" />
          ) : sentiment === "negative" ? (
            <ThumbsDown className="h-5 w-5 text-red-500" />
          ) : (
            <MessageSquare className="h-5 w-5 text-blue-500" />
          )}
          Análise de Sentimento
        </CardTitle>
        <CardDescription>
          Análise baseada no texto do cliente
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-lg font-semibold mb-2">
          {sentiment === "positive" 
            ? "Sentimento Positivo" 
            : sentiment === "negative" 
              ? "Sentimento Negativo" 
              : "Sentimento Neutro"}
        </div>
        <div className="text-sm text-muted-foreground">
          <p className="line-clamp-2">"{text}"</p>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <div className={`p-2 rounded ${sentiment === "positive" ? "bg-green-500/20" : "bg-muted"}`}>
            <ThumbsUp className="h-4 w-4 mx-auto mb-1" />
            <span className="text-xs font-medium">Positivo</span>
          </div>
          <div className={`p-2 rounded ${sentiment === "neutral" ? "bg-blue-500/20" : "bg-muted"}`}>
            <MessageSquare className="h-4 w-4 mx-auto mb-1" />
            <span className="text-xs font-medium">Neutro</span>
          </div>
          <div className={`p-2 rounded ${sentiment === "negative" ? "bg-red-500/20" : "bg-muted"}`}>
            <ThumbsDown className="h-4 w-4 mx-auto mb-1" />
            <span className="text-xs font-medium">Negativo</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SentimentAnalysis;
