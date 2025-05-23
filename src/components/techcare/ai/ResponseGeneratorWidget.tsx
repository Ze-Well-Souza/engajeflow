
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Loader2, AlertTriangle, Copy, Check, RefreshCw, Download, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import AIService, { AIGeneratedResponse } from '@/services/techcare/AIService';

interface ResponseGeneratorWidgetProps {
  context: string;
  onInsert?: (text: string) => void;
  autoGenerate?: boolean;
  customPrompt?: string;
}

const ResponseGeneratorWidget: React.FC<ResponseGeneratorWidgetProps> = ({
  context,
  onInsert,
  autoGenerate = false,
  customPrompt
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(autoGenerate);
  const [response, setResponse] = useState<AIGeneratedResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedVariation, setSelectedVariation] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>(customPrompt || "");
  
  React.useEffect(() => {
    if (autoGenerate && context) {
      generateResponse();
    }
  }, [context, autoGenerate]);
  
  const generateResponse = async () => {
    if (!context.trim() && !prompt.trim()) {
      setError("Forneça um contexto ou prompt para gerar a resposta");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await AIService.generateResponse(
        prompt || "Gere uma resposta apropriada para esta situação",
        { context }
      );
      
      if (result.success && result.data) {
        setResponse(result.data);
        setSelectedVariation(0);
      } else {
        setError(result.error || "Erro desconhecido durante a geração de resposta");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Erro na geração de resposta");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCopyResponse = () => {
    if (!response) return;
    
    const textToCopy = response.variations[selectedVariation] || response.text;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleInsertResponse = () => {
    if (!response || !onInsert) return;
    
    const textToInsert = response.variations[selectedVariation] || response.text;
    onInsert(textToInsert);
  };
  
  const getCurrentResponse = (): string => {
    if (!response) return "";
    return response.variations[selectedVariation] || response.text;
  };
  
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Gerador de Respostas
        </CardTitle>
        <CardDescription>
          Gere respostas inteligentes e contextualizadas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">
              Prompt personalizado (opcional):
            </label>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ex: Gere uma resposta empática e solucionadora..."
              rows={2}
              className="text-sm"
            />
          </div>
          
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-6">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
              <p className="text-sm text-muted-foreground">Gerando resposta...</p>
            </div>
          ) : error ? (
            <div className="text-center py-4">
              <AlertTriangle className="h-8 w-8 text-destructive mx-auto mb-2" />
              <p className="text-sm text-destructive font-medium">{error}</p>
              <Button variant="outline" size="sm" className="mt-4" onClick={generateResponse}>
                Tentar novamente
              </Button>
            </div>
          ) : response ? (
            <>
              <div className="bg-muted p-4 rounded-md relative group">
                <p className="text-sm mb-3">{getCurrentResponse()}</p>
                
                {response.variations && response.variations.length > 1 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {response.variations.map((_, index) => (
                      <Button
                        key={index}
                        variant={selectedVariation === index ? "default" : "outline"}
                        size="sm"
                        className="h-6 px-2 text-xs"
                        onClick={() => setSelectedVariation(index)}
                      >
                        Variação {index + 1}
                      </Button>
                    ))}
                  </div>
                )}
                
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={handleCopyResponse}
                    className="h-8"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copied ? "Copiado!" : "Copiar"}
                  </Button>
                  
                  {onInsert && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={handleInsertResponse}
                      className="h-8"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Inserir Resposta
                    </Button>
                  )}
                </div>
              </div>
              
              {response.reasoning && (
                <div className="bg-blue-50 border border-blue-200 p-3 rounded-md">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-medium text-blue-900 mb-1">Fundamentação:</h4>
                      <p className="text-sm text-blue-700">{response.reasoning}</p>
                    </div>
                  </div>
                </div>
              )}
              
              <Separator />
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={generateResponse}
                className="w-full"
              >
                <RefreshCw className="h-4 w-4 mr-1" /> Gerar nova resposta
              </Button>
            </>
          ) : (
            <div className="text-center py-6">
              <Button onClick={generateResponse}>
                Gerar resposta
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                Clique para gerar uma resposta contextualizada
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResponseGeneratorWidget;
