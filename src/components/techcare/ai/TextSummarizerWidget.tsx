
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Loader2, AlertTriangle, Copy, Check, RefreshCcw, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import AIService, { TextSummaryResult } from '@/services/techcare/AIService';

interface TextSummarizerWidgetProps {
  text: string;
  onSummaryGenerated?: (summary: TextSummaryResult) => void;
  autoSummarize?: boolean;
  maxLength?: number;
}

const TextSummarizerWidget: React.FC<TextSummarizerWidgetProps> = ({
  text,
  onSummaryGenerated,
  autoSummarize = false,
  maxLength
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(autoSummarize);
  const [summary, setSummary] = useState<TextSummaryResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  
  React.useEffect(() => {
    if (autoSummarize && text && text.length > 200) {
      summarizeText();
    }
  }, [text, autoSummarize]);
  
  const summarizeText = async () => {
    if (!text.trim() || text.length < 100) {
      setError("O texto é muito curto para ser resumido");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await AIService.summarizeText(text, maxLength);
      
      if (result.success && result.data) {
        setSummary(result.data);
        if (onSummaryGenerated) {
          onSummaryGenerated(result.data);
        }
      } else {
        setError(result.error || "Erro desconhecido durante a geração do resumo");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Erro na geração do resumo");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCopySummary = () => {
    if (!summary) return;
    
    navigator.clipboard.writeText(summary.summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const getCompressionRate = (): number => {
    if (!summary) return 0;
    
    return Math.round((1 - (summary.summaryLength / summary.originalLength)) * 100);
  };
  
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Sumário Automático
        </CardTitle>
        <CardDescription>
          Resumo inteligente da conversa
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-6">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
            <p className="text-sm text-muted-foreground">Gerando resumo...</p>
          </div>
        ) : error ? (
          <div className="text-center py-4">
            <AlertTriangle className="h-8 w-8 text-destructive mx-auto mb-2" />
            <p className="text-sm text-destructive font-medium">{error}</p>
            <Button variant="outline" size="sm" className="mt-4" onClick={summarizeText}>
              Tentar novamente
            </Button>
          </div>
        ) : summary ? (
          <>
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-1">Resumo:</h3>
              <div className="bg-muted p-4 rounded-md relative group">
                <p className="text-sm">{summary.summary}</p>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8"
                    onClick={handleCopySummary}
                  >
                    {copied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Taxa de compressão</span>
                <span>{getCompressionRate()}%</span>
              </div>
              <Progress value={getCompressionRate()} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>{summary.originalLength} caracteres</span>
                <span>{summary.summaryLength} caracteres</span>
              </div>
            </div>
            
            {summary.keyPoints.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center gap-1 mb-1">
                  <List className="h-4 w-4" />
                  <h3 className="text-sm font-medium">Pontos principais:</h3>
                </div>
                <ul className="space-y-1 text-sm text-muted-foreground pl-5 list-disc">
                  {summary.keyPoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            )}
            
            <Separator className="my-4" />
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={summarizeText}
              className="w-full"
            >
              <RefreshCcw className="h-4 w-4 mr-1" /> Regenerar resumo
            </Button>
          </>
        ) : (
          <div className="text-center py-6">
            <Button onClick={summarizeText}>
              Gerar resumo
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              Clique para gerar um resumo da conversa
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TextSummarizerWidget;
