
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Target, Users, TrendingUp } from 'lucide-react';

interface AdvancedSentimentAnalysisProps {
  text: string;
}

const AdvancedSentimentAnalysis: React.FC<AdvancedSentimentAnalysisProps> = ({ text }) => {
  const [analysis, setAnalysis] = useState<any>(null);

  useEffect(() => {
    if (text) {
      // Simulação de análise avançada
      const mockAnalysis = {
        sentiment: {
          overall: Math.random() > 0.5 ? 'positivo' : 'neutro',
          score: Math.random() * 2 - 1,
          confidence: 0.8 + Math.random() * 0.2
        },
        audience: {
          targetAge: ['18-24', '25-34', '35-44'][Math.floor(Math.random() * 3)],
          interests: ['tecnologia', 'lifestyle', 'negócios'],
          engagement: Math.random() * 100
        },
        recommendations: [
          'Adicione mais emojis para aumentar o engajamento',
          'Considere hashtags relacionadas a trending topics',
          'O horário ideal para publicação é entre 19h-21h'
        ],
        keywords: ['inovação', 'qualidade', 'exclusivo', 'tecnologia'],
        toxicity: Math.random() * 0.1,
        readability: 0.7 + Math.random() * 0.3
      };
      setAnalysis(mockAnalysis);
    }
  }, [text]);

  if (!analysis) return null;

  return (
    <Tabs defaultValue="sentiment" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="sentiment">Sentimento</TabsTrigger>
        <TabsTrigger value="audience">Audiência</TabsTrigger>
        <TabsTrigger value="recommendations">Sugestões</TabsTrigger>
        <TabsTrigger value="metrics">Métricas</TabsTrigger>
      </TabsList>
      
      <TabsContent value="sentiment" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Análise de Sentimento Avançada
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Sentimento Geral</label>
                <Badge className="mt-1">{analysis.sentiment.overall}</Badge>
              </div>
              <div>
                <label className="text-sm font-medium">Confiança</label>
                <div className="mt-1">
                  <Progress value={analysis.sentiment.confidence * 100} />
                </div>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Palavras-chave Detectadas</label>
              <div className="flex flex-wrap gap-2">
                {analysis.keywords.map((keyword: string, index: number) => (
                  <Badge key={index} variant="outline">{keyword}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="audience" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Análise de Audiência
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Faixa Etária Alvo</label>
                <p className="mt-1 font-semibold">{analysis.audience.targetAge} anos</p>
              </div>
              <div>
                <label className="text-sm font-medium">Potencial de Engajamento</label>
                <div className="mt-1">
                  <Progress value={analysis.audience.engagement} />
                  <span className="text-sm text-muted-foreground">{Math.round(analysis.audience.engagement)}%</span>
                </div>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Interesses da Audiência</label>
              <div className="flex flex-wrap gap-2">
                {analysis.audience.interests.map((interest: string, index: number) => (
                  <Badge key={index} variant="secondary">{interest}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="recommendations" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Recomendações IA
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {analysis.recommendations.map((rec: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <TrendingUp className="h-4 w-4 mt-0.5 text-primary" />
                  <span className="text-sm">{rec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="metrics" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Métricas de Qualidade</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Legibilidade</span>
                <span className="text-sm">{Math.round(analysis.readability * 100)}%</span>
              </div>
              <Progress value={analysis.readability * 100} />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Toxicidade</span>
                <span className="text-sm">{Math.round(analysis.toxicity * 100)}%</span>
              </div>
              <Progress value={analysis.toxicity * 100} className="bg-red-100" />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default AdvancedSentimentAnalysis;
