
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { MessageSquare, Loader2, AlertTriangle, Copy, Check, RefreshCcw, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AIService, { AIGeneratedResponse } from '@/services/techcare/AIService';

interface ResponseGeneratorWidgetProps {
  context: string;
  onResponseGenerated?: (response: string) => void;
  onInsert?: (text: string) => void;
  autoGenerate?: boolean;
  showContext?: boolean;
}

const ResponseGeneratorWidget: React.FC<ResponseGeneratorWidgetProps> = ({
  context,
  onResponseGenerated,
  onInsert,
  autoGenerate = false,
  showContext = true
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(autoGenerate);
  const [response, setResponse] = useState<AIGeneratedResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [useCustomPrompt, setUseCustomPrompt] = useState<boolean>(false);
  const [customPrompt, setCustomPrompt] = useState<string>("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  
  React.useEffect(() => {
    if (autoGenerate && context) {
      generateResponse();
    }
  }, [context, autoGenerate]);
  
  const generateResponse = async () => {
    if (!context.trim() && !customPrompt.trim()) {
      setError("Não há contexto ou prompt para gerar resposta");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const prompt = useCustomPrompt ? customPrompt : `Gere uma resposta profissional para este contexto: ${context}`;
      
      const result = await AIService.generateResponse(prompt, {
        temperature: 0.7,
        maxTokens: 300,
        context: context
      });
      
      if (result.success && result.data) {
        setResponse(result.data);
        if (onResponseGenerated) {
          onResponseGenerated(result.data.text);
        }
      } else {
        setError(result.error || "Erro desconhecido durante a geração de resposta");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Erro na geração de resposta");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCopyResponse = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };
  
  const handleInsertResponse = (text: string) => {
    if (onInsert) {
      onInsert(text);
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Gerador de Respostas
        </CardTitle>
        <CardDescription>
          Respostas inteligentes geradas por IA
        </CardDescription>
      </CardHeader>
      <CardContent>
        {showContext && (
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-1">Contexto:</h3>
            <div className="text-sm bg-muted p-3 rounded-md max-h-20 overflow-y-auto">
              <p className="text-muted-foreground">{context || "Sem contexto fornecido"}</p>
            </div>
          </div>
        )}
        
        <div className="flex items-center gap-2 mb-4">
          <Switch
            id="custom-prompt"
            checked={useCustomPrompt}
            onCheckedChange={setUseCustomPrompt}
          />
          <Label htmlFor="custom-prompt">Usar prompt personalizado</Label>
        </div>
        
        {useCustomPrompt && (
          <div className="mb-4">
            <Textarea
              placeholder="Digite instruções específicas para a IA..."
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              className="resize-none"
              rows={3}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Ex: "Gere uma resposta formal explicando que o problema está sendo analisado"
            </p>
          </div>
        )}
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-6">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
            <p className="text-sm text-muted-foreground">Gerando resposta inteligente...</p>
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
          <div>
            <Tabs defaultValue="main" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="main" className="flex-1">Principal</TabsTrigger>
                <TabsTrigger value="variations" className="flex-1">Variações ({response.variations.length})</TabsTrigger>
                <TabsTrigger value="reasoning" className="flex-1">Explicação</TabsTrigger>
              </TabsList>
              
              <TabsContent value="main" className="pt-4">
                <div className="bg-muted p-4 rounded-md mb-3 relative group">
                  <p className="text-sm">{response.text}</p>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleCopyResponse(response.text, 0)}
                    >
                      {copiedIndex === 0 ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => generateResponse()}
                  >
                    <RefreshCcw className="h-4 w-4 mr-1" /> Regenerar
                  </Button>
                  {onInsert && (
                    <Button 
                      size="sm"
                      onClick={() => handleInsertResponse(response.text)}
                    >
                      Inserir Resposta
                    </Button>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="variations" className="pt-4">
                <div className="space-y-4">
                  {response.variations.map((variation, index) => (
                    <div key={index} className="bg-muted p-4 rounded-md relative group">
                      <p className="text-sm">{variation}</p>
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleCopyResponse(variation, index + 1)}
                        >
                          {copiedIndex === index + 1 ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="reasoning" className="pt-4">
                <div className="bg-muted p-4 rounded-md">
                  <div className="flex gap-2 items-center mb-2">
                    <Lightbulb className="h-4 w-4 text-amber-500" />
                    <h3 className="text-sm font-medium">Raciocínio da IA</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{response.reasoning}</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="text-center py-6">
            <Button onClick={generateResponse}>
              Gerar resposta inteligente
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              Clique para gerar uma resposta com base no contexto fornecido
            </p>
          </div>
        )}
      </CardContent>
      <Separator />
      <CardFooter className="pt-4 text-xs text-muted-foreground">
        <p>As respostas são geradas por IA e podem precisar de revisão humana antes do envio.</p>
      </CardFooter>
    </Card>
  );
};

export default ResponseGeneratorWidget;
