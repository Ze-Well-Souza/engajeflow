
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Share2, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MediaSuggestion, MediaConsultantWidgetProps } from './media-consultant/types';
import LoadingState from './media-consultant/LoadingState';
import ErrorState from './media-consultant/ErrorState';
import EmptyState from './media-consultant/EmptyState';
import SuggestionsDisplay from './media-consultant/SuggestionsDisplay';

const MediaConsultantWidget: React.FC<MediaConsultantWidgetProps> = ({
  businessType = "varejo",
  onSuggestionGenerated
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<MediaSuggestion[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const generateSuggestions = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Em produção, isso seria uma chamada real à API de IA
      // Dados simulados para demonstração
      setTimeout(() => {
        const demoSuggestions: MediaSuggestion[] = [
          {
            platform: "instagram",
            content: "Carrossel mostrando os 5 produtos mais vendidos, com depoimentos reais de clientes para cada um.",
            bestTime: "Terça e quinta, entre 18h e 20h",
            hashtags: ["ofertasdodia", "promoçãorelâmpago", "melhoresdoinstagram", "confiraagora"],
            reasoning: "O Instagram tem alto engajamento com conteúdo visual, especialmente carrosséis que mostram produtos com contexto de uso real."
          },
          {
            platform: "tiktok",
            content: "Vídeo curto mostrando o 'antes e depois' do uso do produto, com música viral e chamada para ação clara.",
            bestTime: "Quarta e sexta, entre 19h e 21h",
            hashtags: ["fyp", "paravocê", "antesedepois", "resultadoreal"],
            reasoning: "O TikTok favorece conteúdo autêntico e transformações rápidas que demonstram resultados visíveis, com boa chance de viralização."
          },
          {
            platform: "whatsapp",
            content: "Lista de transmissão com oferta exclusiva por tempo limitado (24h) para clientes da sua base.",
            bestTime: "Segunda e quinta, entre 12h e 14h",
            hashtags: [],
            reasoning: "O WhatsApp gera senso de urgência com ofertas exclusivas e limitadas, com taxas de abertura superiores a emails promocionais."
          }
        ];
        
        setSuggestions(demoSuggestions);
        setIsLoading(false);
      }, 2000);
      
    } catch (error) {
      setError("Erro ao gerar sugestões de mídias");
      setIsLoading(false);
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Share2 className="h-5 w-5" />
          Consultor de Mídias Sociais
        </CardTitle>
        <CardDescription>
          Estratégias personalizadas para cada plataforma
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState error={error} onRetry={generateSuggestions} />
        ) : suggestions ? (
          <SuggestionsDisplay suggestions={suggestions} />
        ) : (
          <EmptyState onGenerate={generateSuggestions} />
        )}
      </CardContent>
      {suggestions && (
        <>
          <Separator />
          <CardFooter className="pt-4">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={generateSuggestions}
            >
              <RefreshCcw className="h-4 w-4 mr-2" /> Atualizar sugestões
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export default MediaConsultantWidget;
