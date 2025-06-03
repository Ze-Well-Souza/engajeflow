
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Loader2, Sparkles, Copy, Clock } from 'lucide-react';
import GoogleAIService from '@/services/GoogleAIService';
import { toast } from 'sonner';

interface GoogleAIContentGeneratorProps {
  onContentGenerated?: (content: string, hashtags: string[], bestTime: string) => void;
}

const GoogleAIContentGenerator: React.FC<GoogleAIContentGeneratorProps> = ({
  onContentGenerated
}) => {
  const [prompt, setPrompt] = useState('');
  const [platform, setPlatform] = useState('instagram');
  const [segment, setSegment] = useState('beauty');
  const [tone, setTone] = useState<'professional' | 'casual' | 'friendly' | 'formal'>('professional');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<{
    content: string;
    hashtags: string[];
    bestTime: string;
  } | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Por favor, insira um prompt para gerar conteúdo');
      return;
    }

    setIsGenerating(true);
    try {
      const result = await GoogleAIService.generateContent({
        prompt,
        platform,
        segment,
        tone,
        maxTokens: 500
      });

      if (result.success) {
        const content = {
          content: result.content,
          hashtags: result.hashtags,
          bestTime: result.bestTime
        };
        
        setGeneratedContent(content);
        
        if (onContentGenerated) {
          onContentGenerated(content.content, content.hashtags, content.bestTime);
        }
        
        toast.success('Conteúdo gerado com sucesso!');
      } else {
        toast.error(result.error || 'Erro ao gerar conteúdo');
      }
    } catch (error) {
      toast.error('Erro ao conectar com a IA');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copiado para a área de transferência!');
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-500" />
          Gerador de Conteúdo com IA Google
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Plataforma</label>
            <Select value={platform} onValueChange={setPlatform}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
                <SelectItem value="twitter">Twitter</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Segmento</label>
            <Select value={segment} onValueChange={setSegment}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beauty">Beleza & Estética</SelectItem>
                <SelectItem value="restaurant">Restaurante</SelectItem>
                <SelectItem value="realestate">Imóveis</SelectItem>
                <SelectItem value="retail">Varejo</SelectItem>
                <SelectItem value="services">Serviços</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Tom</label>
            <Select value={tone} onValueChange={(value: any) => setTone(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Profissional</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="friendly">Amigável</SelectItem>
                <SelectItem value="formal">Formal</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            Prompt para geração de conteúdo
          </label>
          <Textarea
            placeholder="Ex: Criar uma postagem sobre promoção de corte de cabelo para o final de semana..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={3}
          />
        </div>

        <Button 
          onClick={handleGenerate} 
          disabled={isGenerating || !prompt.trim()}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Gerando conteúdo...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              Gerar Conteúdo
            </>
          )}
        </Button>

        {generatedContent && (
          <div className="space-y-4 pt-4 border-t">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Conteúdo Gerado</h4>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(generatedContent.content)}
                >
                  <Copy className="h-4 w-4 mr-1" />
                  Copiar
                </Button>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm">{generatedContent.content}</p>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Hashtags</h4>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(generatedContent.hashtags.join(' '))}
                >
                  <Copy className="h-4 w-4 mr-1" />
                  Copiar
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {generatedContent.hashtags.map((hashtag, index) => (
                  <Badge key={index} variant="secondary">
                    {hashtag}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Melhor Horário para Postar
              </h4>
              <Badge variant="outline">{generatedContent.bestTime}</Badge>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GoogleAIContentGenerator;
