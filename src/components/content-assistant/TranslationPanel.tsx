
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GeneratedContent, useAiContentGenerator, ContentType } from "@/hooks/useAiContentGenerator";
import { Progress } from "@/components/ui/progress";
import { Globe, ArrowRightLeft } from "lucide-react";

interface TranslationPanelProps {
  content: GeneratedContent | null;
  onTranslated: (translatedContent: GeneratedContent) => void;
}

interface Language {
  code: string;
  name: string;
}

const languages: Language[] = [
  { code: 'en', name: 'Inglês' },
  { code: 'es', name: 'Espanhol' },
  { code: 'fr', name: 'Francês' },
  { code: 'de', name: 'Alemão' },
  { code: 'it', name: 'Italiano' },
];

const TranslationPanel: React.FC<TranslationPanelProps> = ({
  content,
  onTranslated
}) => {
  const [targetLanguage, setTargetLanguage] = useState('en');
  const { generateContent, isGenerating, progress } = useAiContentGenerator();
  
  if (!content) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">
            Nenhum conteúdo disponível para tradução.
          </p>
        </CardContent>
      </Card>
    );
  }
  
  const handleTranslate = async () => {
    const contentTypes: ContentType[] = [];
    
    if (content.caption) contentTypes.push('caption');
    if (content.hashtags?.length) contentTypes.push('hashtags');
    if (content.description) contentTypes.push('description');
    
    if (contentTypes.length === 0) return;
    
    const translatedContent = await generateContent(
      '',  // Não precisamos do nome do produto para tradução
      '',  // Não precisamos da descrição do produto para tradução
      undefined,  // Não precisamos da URL da imagem para tradução
      ['translation'],  // Apenas queremos traduzir
      targetLanguage  // Idioma alvo
    );
    
    if (translatedContent && translatedContent.translation) {
      onTranslated(translatedContent);
    }
  };
  
  // Mostrar o conteúdo traduzido se existir
  const showTranslation = content.translation && content.translation.language === targetLanguage;
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Globe className="h-5 w-5" />
          Tradução Automática
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="target-language">Idioma de destino</Label>
          <Select value={targetLanguage} onValueChange={setTargetLanguage}>
            <SelectTrigger id="target-language">
              <SelectValue placeholder="Selecione o idioma" />
            </SelectTrigger>
            <SelectContent>
              {languages.map(lang => (
                <SelectItem key={lang.code} value={lang.code}>
                  {lang.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {isGenerating && (
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-center text-muted-foreground">
              Traduzindo... {progress}%
            </p>
          </div>
        )}
        
        {showTranslation && (
          <div className="space-y-3 mt-3">
            {content.translation?.caption && (
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <Label className="text-xs">Legenda Traduzida</Label>
                </div>
                <div className="text-sm p-3 rounded-md bg-muted/50">
                  {content.translation.caption}
                </div>
              </div>
            )}
            
            {content.translation?.hashtags && content.translation.hashtags.length > 0 && (
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <Label className="text-xs">Hashtags Traduzidas</Label>
                </div>
                <div className="text-sm p-3 rounded-md bg-muted/50">
                  {content.translation.hashtags.join(" ")}
                </div>
              </div>
            )}
            
            {content.translation?.description && (
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <Label className="text-xs">Descrição Traduzida</Label>
                </div>
                <div className="text-sm p-3 rounded-md bg-muted/50 max-h-28 overflow-y-auto">
                  {content.translation.description}
                </div>
              </div>
            )}
          </div>
        )}
        
        <Button 
          onClick={handleTranslate}
          disabled={isGenerating}
          className="w-full gap-2"
        >
          <ArrowRightLeft className="h-4 w-4" />
          Traduzir Conteúdo
        </Button>
      </CardContent>
    </Card>
  );
};

export default TranslationPanel;
