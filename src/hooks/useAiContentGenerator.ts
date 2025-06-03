
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type ContentType = 'caption' | 'hashtags' | 'description' | 'translation';

export interface GeneratedContent {
  caption?: string;
  hashtags?: string[];
  description?: string;
  translation?: {
    caption: string;
    hashtags: string[];
    description: string;
    language: string;
  };
}

export const useAiContentGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const generateContent = async (
    productName: string,
    productDescription?: string,
    imageUrl?: string,
    contentTypes: ContentType[] = ['caption', 'hashtags', 'description'],
    targetLanguage?: string
  ): Promise<GeneratedContent | null> => {
    try {
      setIsGenerating(true);
      setProgress(10);

      // Em um cenário real, este seria um endpoint de uma edge function
      // Para demonstração, vamos simular a geração de conteúdo
      
      // Simulação de progresso
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + Math.floor(Math.random() * 10);
          return newProgress > 90 ? 90 : newProgress;
        });
      }, 500);
      
      // Simular delay da API
      await new Promise((resolve) => setTimeout(resolve, 2000));

      clearInterval(progressInterval);
      setProgress(100);
      
      const generatedContent: GeneratedContent = {};
      
      if (contentTypes.includes('caption')) {
        generatedContent.caption = generateCaption(productName, productDescription);
      }
      
      if (contentTypes.includes('hashtags')) {
        generatedContent.hashtags = generateHashtags(productName, productDescription);
      }
      
      if (contentTypes.includes('description')) {
        generatedContent.description = generateDescription(productName, productDescription);
      }
      
      if (contentTypes.includes('translation') && targetLanguage) {
        generatedContent.translation = {
          caption: translateText(generatedContent.caption || '', targetLanguage),
          hashtags: generatedContent.hashtags?.map(tag => translateText(tag, targetLanguage)) || [],
          description: translateText(generatedContent.description || '', targetLanguage),
          language: targetLanguage
        };
      }

      toast({
        title: 'Conteúdo gerado com sucesso',
        description: 'O assistente de IA criou seu conteúdo.',
      });
      
      return generatedContent;
    } catch (error) {
      console.error('Erro na geração de conteúdo:', error);
      toast({
        title: 'Erro na geração',
        description: 'Não foi possível gerar o conteúdo solicitado.',
        variant: 'destructive',
      });
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  // Funções de simulação para gerar conteúdo
  const generateCaption = (productName: string, productDescription?: string): string => {
    const captions = [
      `✨ Conheça o incrível ${productName}! Perfeito para quem busca qualidade e inovação.`,
      `🔥 O ${productName} chegou para revolucionar sua experiência! Não perca esta novidade.`,
      `💯 Lançamento: ${productName} - a solução que você estava esperando para seu dia a dia.`,
      `⭐ O novo ${productName} está disponível! Tecnologia de ponta com design excepcional.`
    ];
    
    return captions[Math.floor(Math.random() * captions.length)];
  };
  
  const generateHashtags = (productName: string, productDescription?: string): string[] => {
    const productNameWords = productName.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, '').split(' ');
    
    const commonHashtags = [
      'tecnologia', 'inovação', 'qualidade', 'exclusivo', 'novidade',
      'oferta', 'promoção', 'lançamento', 'tech', 'premium'
    ];
    
    // Seleciona 5-8 hashtags aleatórias combinando palavras do produto e hashtags comuns
    const result = [...productNameWords];
    const shuffledCommonHashtags = commonHashtags.sort(() => 0.5 - Math.random());
    result.push(...shuffledCommonHashtags.slice(0, 5));
    
    return result.slice(0, 8).map(word => `#${word}`);
  };
  
  const generateDescription = (productName: string, productDescription?: string): string => {
    const descriptions = [
      `O ${productName} combina tecnologia de ponta com design elegante. Desenvolvido para atender as suas necessidades com máxima eficiência e durabilidade. Um produto premium que vai transformar sua experiência.`,
      `Apresentamos o ${productName}, a solução definitiva para seu dia a dia. Com recursos avançados e acabamento premium, este produto foi projetado para superar suas expectativas e oferecer o melhor custo-benefício do mercado.`,
      `Desenvolvido com materiais de alta qualidade, o ${productName} oferece desempenho superior e durabilidade incomparável. Um investimento inteligente para quem busca excelência e inovação.`
    ];
    
    return descriptions[Math.floor(Math.random() * descriptions.length)];
  };
  
  const translateText = (text: string, targetLanguage: string): string => {
    // Simulação de tradução
    if (targetLanguage === 'en') {
      // Tradução simples para inglês (apenas simulação)
      return text
        .replace(/Conheça o incrível/g, 'Meet the incredible')
        .replace(/chegou para revolucionar/g, 'is here to revolutionize')
        .replace(/Lançamento/g, 'New Release')
        .replace(/está disponível/g, 'is now available')
        .replace(/tecnologia/g, 'technology')
        .replace(/inovação/g, 'innovation')
        .replace(/qualidade/g, 'quality')
        .replace(/exclusivo/g, 'exclusive')
        .replace(/novidade/g, 'novelty')
        .replace(/oferta/g, 'offer')
        .replace(/promoção/g, 'promotion')
        .replace(/lançamento/g, 'launch')
        .replace(/premium/g, 'premium');
    }
    
    // Retorna o texto original se a língua alvo não for suportada
    return text;
  };

  // Função para sugerir o melhor horário para postar
  const suggestPostTime = (platform: string): { day: string; time: string } => {
    // Dados fictícios baseados em estudos de marketing digital
    const bestTimes: Record<string, { day: string; time: string }[]> = {
      instagram: [
        { day: 'Segunda-feira', time: '11:00' },
        { day: 'Quarta-feira', time: '13:00' },
        { day: 'Quinta-feira', time: '19:00' },
        { day: 'Sexta-feira', time: '10:00' }
      ],
      facebook: [
        { day: 'Segunda-feira', time: '09:00' },
        { day: 'Terça-feira', time: '15:00' },
        { day: 'Quarta-feira', time: '13:00' },
        { day: 'Quinta-feira', time: '17:00' }
      ],
      youtube: [
        { day: 'Sábado', time: '10:00' },
        { day: 'Domingo', time: '17:00' },
        { day: 'Quinta-feira', time: '19:00' },
        { day: 'Sexta-feira', time: '17:00' }
      ]
    };
    
    const platformData = bestTimes[platform.toLowerCase()] || bestTimes.instagram;
    return platformData[Math.floor(Math.random() * platformData.length)];
  };

  return {
    generateContent,
    suggestPostTime,
    isGenerating,
    progress,
  };
};
