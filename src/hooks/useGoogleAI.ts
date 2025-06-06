
import { useState } from 'react';
import { GoogleAIService, AIGenerationRequest, SentimentAnalysisRequest } from '@/services/GoogleAIService';
import { toast } from 'sonner';

export const useGoogleAI = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const generateContent = async (request: AIGenerationRequest) => {
    setIsGenerating(true);
    try {
      const result = await GoogleAIService.generateContent(request);
      toast.success('Conteúdo gerado com sucesso!');
      return result;
    } catch (error) {
      console.error('Erro ao gerar conteúdo:', error);
      toast.error(error instanceof Error ? error.message : 'Erro ao gerar conteúdo');
      throw error;
    } finally {
      setIsGenerating(false);
    }
  };

  const analyzeSentiment = async (request: SentimentAnalysisRequest) => {
    setIsAnalyzing(true);
    try {
      const result = await GoogleAIService.analyzeSentiment(request);
      return result;
    } catch (error) {
      console.error('Erro ao analisar sentimento:', error);
      toast.error(error instanceof Error ? error.message : 'Erro ao analisar sentimento');
      throw error;
    } finally {
      setIsAnalyzing(false);
    }
  };

  return {
    generateContent,
    analyzeSentiment,
    isGenerating,
    isAnalyzing
  };
};
