
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ThumbsUp, ThumbsDown, MessageSquare, TrendingUp, AlertTriangle, Settings } from "lucide-react";
import { toast } from "sonner";

interface SentimentResult {
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence: number;
  score: number;
  timestamp: Date;
  text: string;
}

interface RealTimeSentimentAnalysisProps {
  geminiApiKey?: string;
  autoAnalyze?: boolean;
}

const RealTimeSentimentAnalysis: React.FC<RealTimeSentimentAnalysisProps> = ({ 
  geminiApiKey,
  autoAnalyze = true 
}) => {
  const [text, setText] = useState('');
  const [apiKey, setApiKey] = useState(geminiApiKey || '');
  const [showSettings, setShowSettings] = useState(!geminiApiKey);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentSentiment, setCurrentSentiment] = useState<SentimentResult | null>(null);
  const [sentimentHistory, setSentimentHistory] = useState<SentimentResult[]>([]);
  const [realTimeMode, setRealTimeMode] = useState(false);

  // Análise automática em tempo real
  useEffect(() => {
    if (!realTimeMode || !text.trim() || !apiKey) return;

    const debounceTimer = setTimeout(() => {
      analyzeSentiment(text);
    }, 1000); // Aguarda 1 segundo após parar de digitar

    return () => clearTimeout(debounceTimer);
  }, [text, realTimeMode, apiKey]);

  const analyzeSentiment = async (inputText: string) => {
    if (!apiKey) {
      toast.error('Configure a chave da API do Gemini primeiro');
      return;
    }

    if (!inputText.trim()) {
      toast.error('Digite um texto para análise');
      return;
    }

    setIsAnalyzing(true);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `Analise o sentimento do texto a seguir e retorne um JSON válido com esta estrutura exata:
                {
                  "sentiment": "positive" | "negative" | "neutral",
                  "confidence": number_between_0_and_1,
                  "score": number_between_-1_and_1,
                  "keywords": ["palavra1", "palavra2"],
                  "reasoning": "explicação breve"
                }

                Texto para análise: "${inputText}"
                
                Considere:
                - Palavras positivas: bom, ótimo, excelente, feliz, satisfeito, adorei
                - Palavras negativas: ruim, péssimo, horrível, triste, insatisfeito, detestei
                - Score: -1 (muito negativo) a +1 (muito positivo)
                - Confidence: quão certo você está da análise`
              }]
            }],
            generationConfig: {
              temperature: 0.1,
              maxOutputTokens: 512,
            }
          })
        }
      );

      const data = await response.json();
      const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      
      try {
        // Extrair JSON da resposta
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) throw new Error('JSON não encontrado');
        
        const analysisData = JSON.parse(jsonMatch[0]);
        
        const result: SentimentResult = {
          sentiment: analysisData.sentiment || 'neutral',
          confidence: Math.min(1, Math.max(0, analysisData.confidence || 0.5)),
          score: Math.min(1, Math.max(-1, analysisData.score || 0)),
          timestamp: new Date(),
          text: inputText
        };

        setCurrentSentiment(result);
        setSentimentHistory(prev => [...prev.slice(-19), result]); // Manter últimas 20 análises
        
        toast.success(`Sentimento: ${result.sentiment} (${Math.round(result.confidence * 100)}%)`);
      } catch (parseError) {
        console.error('Erro ao interpretar resposta:', parseError);
        toast.error('Erro ao interpretar análise de sentimento');
      }
    } catch (error) {
      console.error('Erro na análise de sentimento:', error);
      toast.error('Erro ao analisar sentimento');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return <ThumbsUp className="h-5 w-5 text-green-500" />;
      case 'negative': return <ThumbsDown className="h-5 w-5 text-red-500" />;
      default: return <MessageSquare className="h-5 w-5 text-blue-500" />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-green-100 text-green-800 border-green-200';
      case 'negative': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getSentimentLabel = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'Positivo';
      case 'negative': return 'Negativo';
      default: return 'Neutro';
    }
  };

  // Dados para gráficos
  const chartData = sentimentHistory.slice(-10).map((item, index) => ({
    id: index + 1,
    score: item.score,
    confidence: item.confidence,
    sentiment: item.sentiment
  }));

  const pieData = [
    { 
      name: 'Positivo', 
      value: sentimentHistory.filter(s => s.sentiment === 'positive').length, 
      color: '#22c55e' 
    },
    { 
      name: 'Negativo', 
      value: sentimentHistory.filter(s => s.sentiment === 'negative').length, 
      color: '#ef4444' 
    },
    { 
      name: 'Neutro', 
      value: sentimentHistory.filter(s => s.sentiment === 'neutral').length, 
      color: '#3b82f6' 
    },
  ];

  const averageScore = sentimentHistory.length > 0 
    ? sentimentHistory.reduce((acc, s) => acc + s.score, 0) / sentimentHistory.length 
    : 0;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Análise de Sentimento em Tempo Real
            </CardTitle>
            <CardDescription>
              Análise avançada usando IA do Gemini
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-4">
          {showSettings && (
            <div className="p-4 border rounded-lg bg-muted/50">
              <Label htmlFor="api-key">Chave da API do Gemini</Label>
              <Input
                id="api-key"
                placeholder="Sua chave da API do Gemini"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Obtenha sua chave em: https://makersuite.google.com/app/apikey
              </p>
            </div>
          )}

          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="realtime"
                checked={realTimeMode}
                onChange={(e) => setRealTimeMode(e.target.checked)}
              />
              <Label htmlFor="realtime">Análise em tempo real</Label>
            </div>
            
            {realTimeMode && (
              <Badge variant="outline" className="bg-green-50 text-green-700">
                Tempo real ativo
              </Badge>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="text-input">Texto para análise</Label>
            <Textarea
              id="text-input"
              placeholder="Digite ou cole o texto que deseja analisar..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[100px]"
              disabled={isAnalyzing}
            />
          </div>

          {!realTimeMode && (
            <Button 
              onClick={() => analyzeSentiment(text)} 
              disabled={isAnalyzing || !text.trim() || !apiKey}
              className="w-full"
            >
              {isAnalyzing ? 'Analisando...' : 'Analisar Sentimento'}
            </Button>
          )}

          {currentSentiment && (
            <Card className="border-2">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {getSentimentIcon(currentSentiment.sentiment)}
                    <span className="font-semibold">
                      {getSentimentLabel(currentSentiment.sentiment)}
                    </span>
                  </div>
                  <Badge className={getSentimentColor(currentSentiment.sentiment)}>
                    {Math.round(currentSentiment.confidence * 100)}% confiança
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div>
                    <Label>Pontuação de Sentimento</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Progress 
                        value={((currentSentiment.score + 1) / 2) * 100} 
                        className="flex-1"
                      />
                      <span className="text-sm font-medium">
                        {currentSentiment.score.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      -1 (muito negativo) a +1 (muito positivo)
                    </p>
                  </div>

                  <div>
                    <Label>Nível de Confiança</Label>
                    <Progress 
                      value={currentSentiment.confidence * 100} 
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {sentimentHistory.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Sentimentos</CardTitle>
              <CardDescription>
                Últimas {Math.min(10, sentimentHistory.length)} análises
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="id" />
                  <YAxis domain={[-1, 1]} />
                  <Tooltip 
                    formatter={(value: number, name: string) => [
                      name === 'score' ? value.toFixed(2) : `${(value * 100).toFixed(0)}%`,
                      name === 'score' ? 'Pontuação' : 'Confiança'
                    ]}
                  />
                  <Bar dataKey="score" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Distribuição de Sentimentos</CardTitle>
              <CardDescription>
                Total de {sentimentHistory.length} análises
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-4">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>

                <div className="grid grid-cols-3 gap-4 w-full">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <ThumbsUp className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">Positivo</span>
                    </div>
                    <p className="text-2xl font-bold text-green-600">
                      {pieData[0].value}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <ThumbsDown className="h-4 w-4 text-red-500" />
                      <span className="text-sm font-medium">Negativo</span>
                    </div>
                    <p className="text-2xl font-bold text-red-600">
                      {pieData[1].value}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <MessageSquare className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium">Neutro</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-600">
                      {pieData[2].value}
                    </p>
                  </div>
                </div>

                <div className="w-full pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Sentimento médio:</span>
                    <Badge className={getSentimentColor(
                      averageScore > 0.1 ? 'positive' : averageScore < -0.1 ? 'negative' : 'neutral'
                    )}>
                      {averageScore.toFixed(2)}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default RealTimeSentimentAnalysis;
