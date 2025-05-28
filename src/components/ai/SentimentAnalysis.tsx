
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Heart, Frown, Meh, Smile, TrendingUp } from 'lucide-react';

interface SentimentAnalysisProps {
  text: string;
}

const SentimentAnalysis: React.FC<SentimentAnalysisProps> = ({ text }) => {
  const [sentiment, setSentiment] = useState<{
    score: number;
    label: string;
    confidence: number;
    emotions: { [key: string]: number };
  } | null>(null);

  useEffect(() => {
    if (text) {
      // Simulação de análise de sentimento
      const mockAnalysis = {
        score: Math.random() * 2 - 1, // -1 a 1
        label: ['Negativo', 'Neutro', 'Positivo'][Math.floor(Math.random() * 3)],
        confidence: 0.7 + Math.random() * 0.3,
        emotions: {
          alegria: Math.random() * 0.8,
          tristeza: Math.random() * 0.3,
          raiva: Math.random() * 0.2,
          medo: Math.random() * 0.1,
          surpresa: Math.random() * 0.4
        }
      };
      setSentiment(mockAnalysis);
    }
  }, [text]);

  if (!sentiment) return null;

  const getSentimentIcon = () => {
    if (sentiment.score > 0.3) return <Smile className="h-5 w-5 text-green-500" />;
    if (sentiment.score < -0.3) return <Frown className="h-5 w-5 text-red-500" />;
    return <Meh className="h-5 w-5 text-yellow-500" />;
  };

  const getSentimentColor = () => {
    if (sentiment.score > 0.3) return 'text-green-600';
    if (sentiment.score < -0.3) return 'text-red-600';
    return 'text-yellow-600';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getSentimentIcon()}
          Análise de Sentimento
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-medium">Sentimento Geral:</span>
          <Badge className={getSentimentColor()}>
            {sentiment.label}
          </Badge>
        </div>
        
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm">Confiança</span>
            <span className="text-sm">{Math.round(sentiment.confidence * 100)}%</span>
          </div>
          <Progress value={sentiment.confidence * 100} />
        </div>

        <div className="space-y-2">
          <h4 className="font-medium">Emoções Detectadas:</h4>
          {Object.entries(sentiment.emotions).map(([emotion, score]) => (
            <div key={emotion} className="flex justify-between items-center">
              <span className="capitalize text-sm">{emotion}</span>
              <div className="flex items-center gap-2">
                <Progress value={score * 100} className="w-20" />
                <span className="text-sm w-10">{Math.round(score * 100)}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SentimentAnalysis;
