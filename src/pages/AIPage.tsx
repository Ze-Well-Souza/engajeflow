
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EnhancedContentGenerator from '@/components/ai/EnhancedContentGenerator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Brain, TrendingUp, MessageSquare } from 'lucide-react';

const AIPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Brain className="h-8 w-8" />
          Inteligência Artificial
        </h1>
        <p className="text-muted-foreground mt-2">
          Ferramentas de IA para criação de conteúdo, análise e automação
        </p>
      </div>

      <Tabs defaultValue="generator" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="generator">
            <Sparkles className="h-4 w-4 mr-2" />
            Gerador
          </TabsTrigger>
          <TabsTrigger value="analysis">
            <TrendingUp className="h-4 w-4 mr-2" />
            Análise
          </TabsTrigger>
          <TabsTrigger value="responses">
            <MessageSquare className="h-4 w-4 mr-2" />
            Respostas
          </TabsTrigger>
          <TabsTrigger value="history">
            Histórico
          </TabsTrigger>
        </TabsList>

        <TabsContent value="generator" className="mt-6">
          <EnhancedContentGenerator />
        </TabsContent>

        <TabsContent value="analysis" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Análise de Sentimento</CardTitle>
                <CardDescription>
                  Analise o sentimento de comentários e mensagens
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Em desenvolvimento - analise automática de sentimentos em tempo real
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tendências</CardTitle>
                <CardDescription>
                  Identifique tendências e hashtags populares
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Em desenvolvimento - análise de tendências baseada em IA
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="responses" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Respostas Inteligentes</CardTitle>
              <CardDescription>
                Gere respostas automáticas para comentários e mensagens
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Em desenvolvimento - sistema de respostas automáticas com IA
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de IA</CardTitle>
              <CardDescription>
                Visualize todo o conteúdo gerado pela IA
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Em desenvolvimento - histórico completo de conteúdo gerado
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIPage;
