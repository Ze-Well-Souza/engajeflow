
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Loader2, Copy, ThumbsUp, ThumbsDown, Sparkles } from 'lucide-react';
import { useGoogleAI } from '@/hooks/useGoogleAI';
import { toast } from 'sonner';

interface GeneratedContent {
  content: string;
  hashtags?: string[];
  type: string;
  platform: string;
}

const EnhancedContentGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [platform, setPlatform] = useState('instagram');
  const [contentType, setContentType] = useState('post');
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  
  const { generateContent, isGenerating } = useGoogleAI();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Por favor, digite um prompt');
      return;
    }

    try {
      const result = await generateContent({
        prompt: prompt.trim(),
        type: contentType as 'post' | 'response' | 'hashtags' | 'caption',
        platform,
        context: contentType === 'response' ? 'Atendimento ao cliente' : undefined
      });
      
      setGeneratedContent(result);
    } catch (error) {
      // Erro já tratado no hook
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copiado para a área de transferência!');
  };

  const platforms = [
    { value: 'instagram', label: 'Instagram' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'twitter', label: 'Twitter' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'tiktok', label: 'TikTok' },
    { value: 'whatsapp', label: 'WhatsApp' }
  ];

  const contentTypes = [
    { value: 'post', label: 'Post Completo' },
    { value: 'caption', label: 'Legenda' },
    { value: 'hashtags', label: 'Hashtags' },
    { value: 'response', label: 'Resposta de Atendimento' }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Gerador de Conteúdo com IA
          </CardTitle>
          <CardDescription>
            Crie conteúdo personalizado para suas redes sociais usando inteligência artificial
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Plataforma</label>
              <Select value={platform} onValueChange={setPlatform}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {platforms.map((p) => (
                    <SelectItem key={p.value} value={p.value}>
                      {p.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Tipo de Conteúdo</label>
              <Select value={contentType} onValueChange={setContentType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {contentTypes.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Prompt</label>
            <Textarea
              placeholder="Descreva o que você quer criar... (ex: 'Post sobre os benefícios do exercício físico para iniciantes')"
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
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Gerando...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Gerar Conteúdo
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {generatedContent && (
        <Card>
          <CardHeader>
            <CardTitle>Conteúdo Gerado</CardTitle>
            <CardDescription>
              {contentTypes.find(t => t.value === generatedContent.type)?.label} para {platforms.find(p => p.value === generatedContent.platform)?.label}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Textarea
                value={generatedContent.content}
                readOnly
                rows={6}
                className="pr-12"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => copyToClipboard(generatedContent.content)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>

            {generatedContent.hashtags && generatedContent.hashtags.length > 0 && (
              <div>
                <label className="text-sm font-medium mb-2 block">Hashtags Sugeridas</label>
                <div className="flex flex-wrap gap-2">
                  {generatedContent.hashtags.map((hashtag, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => copyToClipboard(hashtag)}
                    >
                      {hashtag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-between items-center pt-4 border-t">
              <div className="text-sm text-muted-foreground">
                Avalie este conteúdo para melhorar futuras gerações
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  Bom
                </Button>
                <Button variant="outline" size="sm">
                  <ThumbsDown className="h-4 w-4 mr-1" />
                  Ruim
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EnhancedContentGenerator;
