
import React, { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from "@/components/ui/card";
import { 
  ThumbsUp, 
  ThumbsDown, 
  MessageSquare, 
  AlertCircle, 
  TrendingUp, 
  PieChart 
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface AdvancedSentimentAnalysisProps {
  text: string;
}

interface SentimentResult {
  sentiment: "positive" | "negative" | "neutral";
  score: number;
  confidence: number;
  keywords: {
    word: string;
    sentiment: "positive" | "negative" | "neutral";
    strength: number;
  }[];
  suggestions: string[];
}

const AdvancedSentimentAnalysis: React.FC<AdvancedSentimentAnalysisProps> = ({ text }) => {
  const [result, setResult] = useState<SentimentResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  
  useEffect(() => {
    analyzeSentiment(text);
  }, [text]);
  
  // Em uma implementação real, isso seria uma chamada a uma API de IA
  const analyzeSentiment = (text: string) => {
    setLoading(true);
    
    // Simulando resposta da API
    setTimeout(() => {
      const words = text.toLowerCase().split(/\s+/);
      
      const positiveWords = ['bom', 'ótimo', 'excelente', 'perfeito', 'adorei', 'gostei', 'satisfeito', 'feliz', 'contente'];
      const negativeWords = ['ruim', 'péssimo', 'horrível', 'detestei', 'insatisfeito', 'problema', 'terrível', 'decepcionado'];
      
      let positiveCount = 0;
      let negativeCount = 0;
      
      const keywordAnalysis = words.map(word => {
        const isPositive = positiveWords.some(pw => word.includes(pw));
        const isNegative = negativeWords.some(nw => word.includes(nw));
        
        if (isPositive) positiveCount++;
        if (isNegative) negativeCount++;
        
        if (isPositive) {
          return {
            word,
            sentiment: "positive" as const,
            strength: Math.random() * 0.5 + 0.5
          };
        } else if (isNegative) {
          return {
            word,
            sentiment: "negative" as const,
            strength: Math.random() * 0.5 + 0.5
          };
        }
        return null;
      }).filter(Boolean);
      
      const totalWords = words.length;
      const positiveRatio = positiveCount / totalWords;
      const negativeRatio = negativeCount / totalWords;
      
      let sentiment: "positive" | "negative" | "neutral";
      let score: number;
      
      if (positiveRatio > negativeRatio && positiveRatio > 0.05) {
        sentiment = "positive";
        score = 0.5 + positiveRatio * 0.5;
      } else if (negativeRatio > positiveRatio && negativeRatio > 0.05) {
        sentiment = "negative";
        score = 0.5 + negativeRatio * 0.5;
      } else {
        sentiment = "neutral";
        score = 0.5;
      }
      
      // Gerar sugestões baseadas no sentimento
      const suggestions = [];
      if (sentiment === "negative") {
        suggestions.push(
          "Responda à mensagem o mais rápido possível para reverter a experiência negativa",
          "Ofereça uma solução concreta para o problema relatado",
          "Considere uma compensação ou desconto como gesto de boa vontade"
        );
      } else if (sentiment === "positive") {
        suggestions.push(
          "Agradeça ao cliente pelo feedback positivo",
          "Convide o cliente para um programa de fidelidade",
          "Solicite que compartilhe sua experiência positiva"
        );
      } else {
        suggestions.push(
          "Solicite mais informações para entender melhor o cliente",
          "Ofereça informações adicionais sobre produtos ou serviços",
          "Siga com uma pesquisa de satisfação para engajar o cliente"
        );
      }
      
      setResult({
        sentiment,
        score,
        confidence: 0.7 + Math.random() * 0.25,
        keywords: keywordAnalysis,
        suggestions
      });
      
      setLoading(false);
    }, 600);
  };
  
  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Analisando sentimento</CardTitle>
          <CardDescription>Processando texto com IA avançada</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Progress value={45} className="w-full" />
          <p className="text-sm text-muted-foreground">Analisando contexto e sentimentos...</p>
        </CardContent>
      </Card>
    );
  }
  
  if (!result) return null;
  
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between mb-1">
          <CardTitle className="text-xl flex items-center gap-2">
            {result.sentiment === "positive" ? (
              <ThumbsUp className="h-5 w-5 text-green-500" />
            ) : result.sentiment === "negative" ? (
              <ThumbsDown className="h-5 w-5 text-red-500" />
            ) : (
              <MessageSquare className="h-5 w-5 text-blue-500" />
            )}
            Análise Avançada de Sentimento
          </CardTitle>
          <div className="text-sm font-medium px-2 py-1 rounded-full bg-secondary">
            {Math.round(result.confidence * 100)}% confiança
          </div>
        </div>
        <CardDescription>
          {result.sentiment === "positive" 
            ? "Sentimento positivo detectado" 
            : result.sentiment === "negative" 
              ? "Sentimento negativo detectado" 
              : "Sentimento neutro"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-lg font-semibold mb-2 flex justify-between items-center">
          <div>
            Pontuação: {Math.round(result.score * 100)}/100
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? "Ocultar detalhes" : "Ver detalhes"}
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8"
            >
              <PieChart className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <div className={`p-2 rounded ${result.sentiment === "positive" ? "bg-green-500/20" : "bg-muted"}`}>
            <ThumbsUp className="h-4 w-4 mx-auto mb-1" />
            <span className="text-xs font-medium">Positivo</span>
          </div>
          <div className={`p-2 rounded ${result.sentiment === "neutral" ? "bg-blue-500/20" : "bg-muted"}`}>
            <MessageSquare className="h-4 w-4 mx-auto mb-1" />
            <span className="text-xs font-medium">Neutro</span>
          </div>
          <div className={`p-2 rounded ${result.sentiment === "negative" ? "bg-red-500/20" : "bg-muted"}`}>
            <ThumbsDown className="h-4 w-4 mx-auto mb-1" />
            <span className="text-xs font-medium">Negativo</span>
          </div>
        </div>
        
        {showDetails && (
          <div className="mt-4 space-y-4">
            <div>
              <h4 className="font-medium text-sm mb-2">Palavras-chave encontradas</h4>
              <div className="flex flex-wrap gap-2">
                {result.keywords.map((keyword, i) => (
                  <div 
                    key={i} 
                    className={`text-xs px-2 py-1 rounded-full ${
                      keyword.sentiment === "positive" 
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" 
                        : keyword.sentiment === "negative"
                          ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                          : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                    }`}
                  >
                    {keyword.word} ({Math.round(keyword.strength * 100)}%)
                  </div>
                ))}
                {result.keywords.length === 0 && (
                  <p className="text-sm text-muted-foreground">Nenhuma palavra-chave relevante encontrada</p>
                )}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-sm mb-2">Trecho analisado</h4>
              <div className="text-sm text-muted-foreground bg-muted/50 p-2 rounded">
                <p className="line-clamp-2">"{text}"</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t pt-4">
        <div className="w-full">
          <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
            <AlertCircle className="h-4 w-4 text-primary" />
            Ações recomendadas
          </h4>
          <ul className="text-sm space-y-1">
            {result.suggestions.map((suggestion, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <div className="min-w-4 h-4 rounded-full bg-primary/20 text-primary text-[10px] font-bold flex items-center justify-center mt-0.5">{i+1}</div>
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AdvancedSentimentAnalysis;
