
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Loader2, Wand2, Copy, Check } from 'lucide-react';
import { useAiContentGenerator } from '@/hooks/useAiContentGenerator';
import { toast } from 'sonner';

interface ContentGeneratorProps {
  defaultProduct?: {
    name: string;
    description?: string;
  };
  onContentSelected?: (content: string, type: string) => void;
}

const ContentGenerator: React.FC<ContentGeneratorProps> = ({ 
  defaultProduct, 
  onContentSelected 
}) => {
  const [productName, setProductName] = useState(defaultProduct?.name || '');
  const [productDescription, setProductDescription] = useState(defaultProduct?.description || '');
  const [platform, setPlatform] = useState('instagram');
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set());

  const { generateContent, isGenerating, progress } = useAiContentGenerator();

  const handleGenerate = async () => {
    if (!productName.trim()) {
      toast.error('Por favor, insira o nome do produto');
      return;
    }

    const content = await generateContent(
      productName,
      productDescription,
      undefined,
      ['caption', 'hashtags', 'description']
    );

    if (content) {
      setGeneratedContent(content);
    }
  };

  const handleCopy = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItems(prev => new Set([...prev, type]));
      toast.success(`${type} copiado para a área de transferência`);
      
      setTimeout(() => {
        setCopiedItems(prev => {
          const newSet = new Set(prev);
          newSet.delete(type);
          return newSet;
        });
      }, 2000);

      if (onContentSelected) {
        onContentSelected(text, type);
      }
    } catch (error) {
      toast.error('Erro ao copiar para a área de transferência');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="h-5 w-5" />
            Gerador de Conteúdo com IA
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Nome do Produto/Serviço</label>
              <Input
                placeholder="Ex: Smartphone XYZ Pro"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Plataforma</label>
              <Select value={platform} onValueChange={setPlatform}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="youtube">YouTube</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Descrição (Opcional)</label>
            <Textarea
              placeholder="Descreva características principais, benefícios, público-alvo..."
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              rows={3}
            />
          </div>

          <Button 
            onClick={handleGenerate} 
            disabled={isGenerating || !productName.trim()}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Gerando... {Math.round(progress)}%
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                Gerar Conteúdo
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {generatedContent && (
        <div className="space-y-4">
          {generatedContent.caption && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Legenda Gerada</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 p-4 rounded-md mb-3">
                  <p className="whitespace-pre-wrap">{generatedContent.caption}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopy(generatedContent.caption, 'Legenda')}
                  className="flex items-center gap-2"
                >
                  {copiedItems.has('Legenda') ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  {copiedItems.has('Legenda') ? 'Copiado!' : 'Copiar Legenda'}
                </Button>
              </CardContent>
            </Card>
          )}

          {generatedContent.hashtags && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Hashtags Sugeridas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-3">
                  {generatedContent.hashtags.map((hashtag: string, index: number) => (
                    <Badge key={index} variant="secondary">
                      {hashtag}
                    </Badge>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopy(generatedContent.hashtags.join(' '), 'Hashtags')}
                  className="flex items-center gap-2"
                >
                  {copiedItems.has('Hashtags') ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  {copiedItems.has('Hashtags') ? 'Copiado!' : 'Copiar Hashtags'}
                </Button>
              </CardContent>
            </Card>
          )}

          {generatedContent.description && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Descrição do Produto</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 p-4 rounded-md mb-3">
                  <p>{generatedContent.description}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopy(generatedContent.description, 'Descrição')}
                  className="flex items-center gap-2"
                >
                  {copiedItems.has('Descrição') ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  {copiedItems.has('Descrição') ? 'Copiado!' : 'Copiar Descrição'}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default ContentGenerator;
