
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Share2, Loader2, AlertTriangle, RefreshCcw, Lightbulb, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MediaConsultantWidgetProps {
  businessType?: string;
  onSuggestionGenerated?: (suggestion: string) => void;
}

interface MediaSuggestion {
  platform: "instagram" | "facebook" | "tiktok" | "whatsapp" | "youtube";
  content: string;
  bestTime: string;
  hashtags: string[];
  reasoning: string;
}

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
  
  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "instagram":
        return "bg-gradient-to-r from-purple-500 to-pink-500 text-white";
      case "facebook":
        return "bg-blue-600 text-white";
      case "tiktok":
        return "bg-black text-white";
      case "whatsapp":
        return "bg-green-500 text-white";
      case "youtube":
        return "bg-red-600 text-white";
      default:
        return "bg-gray-200";
    }
  };
  
  const getPlatformIcon = (platform: string) => {
    return <Share2 className="h-4 w-4" />;
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
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
            <p className="text-sm text-muted-foreground">Analisando as melhores estratégias para seu negócio...</p>
          </div>
        ) : error ? (
          <div className="text-center py-6">
            <AlertTriangle className="h-8 w-8 text-destructive mx-auto mb-2" />
            <p className="text-sm text-destructive font-medium">{error}</p>
            <Button variant="outline" size="sm" className="mt-4" onClick={generateSuggestions}>
              Tentar novamente
            </Button>
          </div>
        ) : suggestions ? (
          <div>
            <p className="text-sm text-muted-foreground mb-4">
              Com base no seu tipo de negócio, identificamos estas estratégias 
              de conteúdo para diferentes plataformas:
            </p>
            
            <Tabs defaultValue={suggestions[0].platform} className="w-full">
              <TabsList className="w-full grid grid-cols-3 mb-4">
                {suggestions.map((suggestion, index) => (
                  <TabsTrigger 
                    key={index} 
                    value={suggestion.platform}
                    className="text-xs"
                  >
                    {suggestion.platform.charAt(0).toUpperCase() + suggestion.platform.slice(1)}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {suggestions.map((suggestion, index) => (
                <TabsContent key={index} value={suggestion.platform}>
                  <div className="space-y-4">
                    <Badge className={`${getPlatformColor(suggestion.platform)} p-2`}>
                      {getPlatformIcon(suggestion.platform)}
                      {suggestion.platform.charAt(0).toUpperCase() + suggestion.platform.slice(1)}
                    </Badge>
                    
                    <div className="bg-muted rounded-md p-4">
                      <h4 className="font-medium mb-2">Conteúdo sugerido:</h4>
                      <p className="text-sm">{suggestion.content}</p>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Melhor momento: {suggestion.bestTime}</span>
                    </div>
                    
                    {suggestion.hashtags.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium mb-2">Hashtags recomendadas:</h4>
                        <div className="flex flex-wrap gap-1">
                          {suggestion.hashtags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="outline" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-start gap-2 mt-2 bg-amber-50 p-3 rounded-md">
                      <Lightbulb className="h-4 w-4 text-amber-500 mt-0.5" />
                      <p className="text-xs">{suggestion.reasoning}</p>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        ) : (
          <div className="text-center py-10 space-y-4">
            <Share2 className="h-12 w-12 text-primary mx-auto" />
            <h3 className="text-lg font-medium">Amplie seu alcance nas redes sociais</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Nossa IA criará sugestões de conteúdo personalizado para diferentes 
              plataformas sociais, com base no seu tipo de negócio e público-alvo.
            </p>
            <Button onClick={generateSuggestions}>
              Gerar estratégias de mídia
            </Button>
          </div>
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
