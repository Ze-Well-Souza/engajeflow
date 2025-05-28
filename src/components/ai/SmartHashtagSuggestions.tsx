
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Hash, TrendingUp, Target, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

interface SmartHashtagSuggestionsProps {
  content?: string;
  platform?: string;
  onHashtagsGenerated?: (hashtags: string[]) => void;
}

const SmartHashtagSuggestions: React.FC<SmartHashtagSuggestionsProps> = ({
  content = '',
  platform = 'instagram',
  onHashtagsGenerated
}) => {
  const [suggestions, setSuggestions] = useState<{
    trending: string[];
    niche: string[];
    branded: string[];
  }>({
    trending: [],
    niche: [],
    branded: []
  });
  const [customHashtag, setCustomHashtag] = useState('');
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    generateHashtagSuggestions();
  }, [content, platform]);

  const generateHashtagSuggestions = () => {
    // Simulação de sugestões inteligentes baseadas no conteúdo e plataforma
    const mockSuggestions = {
      trending: [
        '#trending2024',
        '#viral',
        '#fyp',
        '#explore',
        '#reels',
        '#instagood',
        '#photooftheday',
        '#follow'
      ],
      niche: [
        '#tecnologia',
        '#inovacao',
        '#digital',
        '#tech',
        '#futuro',
        '#automation',
        '#ai',
        '#gadgets'
      ],
      branded: [
        '#engajeflow',
        '#marketingdigital',
        '#socialmedia',
        '#contentcreator',
        '#brand',
        '#business',
        '#entrepreneur',
        '#startup'
      ]
    };

    // Filtrar baseado na plataforma
    if (platform === 'linkedin') {
      mockSuggestions.trending = ['#profissional', '#carreira', '#networking', '#lideranca'];
      mockSuggestions.niche = ['#business', '#empreendedorismo', '#gestao', '#inovacao'];
    } else if (platform === 'twitter') {
      mockSuggestions.trending = ['#TwitterTrends', '#viral', '#breaking', '#news'];
    }

    setSuggestions(mockSuggestions);
  };

  const toggleHashtag = (hashtag: string) => {
    setSelectedHashtags(prev => {
      const newSelection = prev.includes(hashtag)
        ? prev.filter(h => h !== hashtag)
        : [...prev, hashtag];
      
      if (onHashtagsGenerated) {
        onHashtagsGenerated(newSelection);
      }
      
      return newSelection;
    });
  };

  const addCustomHashtag = () => {
    if (customHashtag.trim() && !selectedHashtags.includes(`#${customHashtag.trim()}`)) {
      const newHashtag = customHashtag.startsWith('#') ? customHashtag : `#${customHashtag}`;
      setSelectedHashtags(prev => [...prev, newHashtag]);
      setCustomHashtag('');
      
      if (onHashtagsGenerated) {
        onHashtagsGenerated([...selectedHashtags, newHashtag]);
      }
    }
  };

  const copyAllHashtags = async () => {
    if (selectedHashtags.length === 0) {
      toast.error('Selecione algumas hashtags primeiro');
      return;
    }

    try {
      await navigator.clipboard.writeText(selectedHashtags.join(' '));
      setCopied(true);
      toast.success('Hashtags copiadas para a área de transferência!');
      
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Erro ao copiar hashtags');
    }
  };

  const clearSelection = () => {
    setSelectedHashtags([]);
    if (onHashtagsGenerated) {
      onHashtagsGenerated([]);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Hash className="h-5 w-5" />
          Sugestões Inteligentes de Hashtags
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Hashtags Trending */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <h4 className="font-medium">Trending Now</h4>
            <Badge variant="outline" className="text-xs">
              Alta relevância
            </Badge>
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestions.trending.map((hashtag, index) => (
              <Badge
                key={index}
                variant={selectedHashtags.includes(hashtag) ? 'default' : 'outline'}
                className="cursor-pointer hover:bg-primary/80 transition-colors"
                onClick={() => toggleHashtag(hashtag)}
              >
                {hashtag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Hashtags de Nicho */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Target className="h-4 w-4 text-blue-500" />
            <h4 className="font-medium">Nicho Específico</h4>
            <Badge variant="outline" className="text-xs">
              Público-alvo
            </Badge>
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestions.niche.map((hashtag, index) => (
              <Badge
                key={index}
                variant={selectedHashtags.includes(hashtag) ? 'default' : 'outline'}
                className="cursor-pointer hover:bg-primary/80 transition-colors"
                onClick={() => toggleHashtag(hashtag)}
              >
                {hashtag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Hashtags de Marca */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Hash className="h-4 w-4 text-purple-500" />
            <h4 className="font-medium">Branded & Comunidade</h4>
            <Badge variant="outline" className="text-xs">
              Marca própria
            </Badge>
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestions.branded.map((hashtag, index) => (
              <Badge
                key={index}
                variant={selectedHashtags.includes(hashtag) ? 'default' : 'outline'}
                className="cursor-pointer hover:bg-primary/80 transition-colors"
                onClick={() => toggleHashtag(hashtag)}
              >
                {hashtag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Adicionar Hashtag Personalizada */}
        <div className="space-y-2">
          <h4 className="font-medium">Adicionar Hashtag Personalizada</h4>
          <div className="flex gap-2">
            <Input
              placeholder="Digite sua hashtag..."
              value={customHashtag}
              onChange={(e) => setCustomHashtag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addCustomHashtag()}
            />
            <Button onClick={addCustomHashtag} variant="outline">
              Adicionar
            </Button>
          </div>
        </div>

        {/* Hashtags Selecionadas */}
        {selectedHashtags.length > 0 && (
          <div className="space-y-3 pt-4 border-t">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">
                Hashtags Selecionadas ({selectedHashtags.length})
              </h4>
              <div className="flex gap-2">
                <Button
                  onClick={copyAllHashtags}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  {copied ? 'Copiado!' : 'Copiar'}
                </Button>
                <Button
                  onClick={clearSelection}
                  variant="outline"
                  size="sm"
                >
                  Limpar
                </Button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedHashtags.map((hashtag, index) => (
                <Badge
                  key={index}
                  variant="default"
                  className="cursor-pointer"
                  onClick={() => toggleHashtag(hashtag)}
                >
                  {hashtag} ×
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SmartHashtagSuggestions;
