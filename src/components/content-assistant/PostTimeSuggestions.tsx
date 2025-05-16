
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useAiContentGenerator } from "@/hooks/useAiContentGenerator";
import { Clock, Calendar, BarChart3 } from "lucide-react";

interface PostTimeSuggestionsProps {
  platform: string;
}

const PostTimeSuggestions: React.FC<PostTimeSuggestionsProps> = ({ platform }) => {
  const { suggestPostTime } = useAiContentGenerator();
  
  // Gerar 2 sugestões de horário para a plataforma
  const suggestion1 = suggestPostTime(platform);
  const suggestion2 = suggestPostTime(platform);
  
  // Garantir que as sugestões sejam diferentes
  let suggestion3 = suggestPostTime(platform);
  while (suggestion3.day === suggestion1.day && suggestion3.time === suggestion1.time) {
    suggestion3 = suggestPostTime(platform);
  }

  const platformName = 
    platform === "instagram" ? "Instagram" : 
    platform === "facebook" ? "Facebook" : 
    platform === "youtube" ? "YouTube" : 
    "Redes Sociais";

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <Clock className="h-5 w-5" />
          Melhores Horários para Postar
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Sugestões de horários para {platformName} baseadas em análise de engajamento:
          </p>
          
          <div className="space-y-3 mt-3">
            <div className="flex items-center gap-3 p-2 rounded-md bg-muted/50 hover:bg-muted transition-colors">
              <div className="h-10 w-10 rounded-md bg-primary/20 flex items-center justify-center text-primary">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">{suggestion1.day}</p>
                <p className="text-sm text-muted-foreground">{suggestion1.time}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-2 rounded-md bg-muted/50 hover:bg-muted transition-colors">
              <div className="h-10 w-10 rounded-md bg-primary/20 flex items-center justify-center text-primary">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">{suggestion2.day}</p>
                <p className="text-sm text-muted-foreground">{suggestion2.time}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-2 rounded-md bg-muted/50 hover:bg-muted transition-colors">
              <div className="h-10 w-10 rounded-md bg-primary/20 flex items-center justify-center text-primary">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">{suggestion3.day}</p>
                <p className="text-sm text-muted-foreground">{suggestion3.time}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-5 p-3 bg-muted/30 rounded-md">
            <div className="flex items-center gap-2 mb-1">
              <BarChart3 className="h-4 w-4 text-primary" />
              <h4 className="text-sm font-medium">Dica de especialista</h4>
            </div>
            <p className="text-xs text-muted-foreground">
              Posts durante estes horários podem ter até 20% mais engajamento devido aos hábitos de navegação do público. Considere programar suas publicações para estes momentos.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostTimeSuggestions;
