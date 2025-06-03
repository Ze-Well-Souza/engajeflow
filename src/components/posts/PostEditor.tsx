import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Textarea } from '@/ui/textarea';
import { Label } from '@/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/ui/card';
import { Badge } from '@/ui/badge';
import { Switch } from '@/ui/switch';
import { Separator } from '@/ui/separator';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';
import { 
  Calendar,
  Clock,
  Hash,
  AtSign,
  Image,
  Video,
  Sparkles,
  Send,
  Save,
  Eye,
  Target,
  Lightbulb
} from 'lucide-react';
import { toast } from 'sonner';
import { usePosts, CreatePostData, Post } from '@/hooks/usePosts';
import { 
  generateContent, 
  suggestHashtags, 
  optimizeContent,
  ContentGenerationOptions,
  HashtagSuggestion 
} from '@/services/ai/geminiService';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Form validation schema
const postSchema = z.object({
  title: z.string().optional(),
  content: z.string().min(1, 'Conteúdo é obrigatório'),
  platforms: z.array(z.string()).min(1, 'Selecione ao menos uma plataforma'),
  scheduled_for: z.string().optional(),
  hashtags: z.array(z.string()).optional(),
  mentions: z.array(z.string()).optional(),
  content_type: z.enum(['text', 'image', 'video', 'carousel', 'story', 'reel']).optional()
});

type PostFormData = z.infer<typeof postSchema>;

interface PostEditorProps {
  post?: Post;
  onSave?: (post: Post) => void;
  onCancel?: () => void;
  isOpen?: boolean;
}

const platformOptions = [
  { value: 'facebook', label: 'Facebook', color: 'bg-blue-500' },
  { value: 'instagram', label: 'Instagram', color: 'bg-pink-500' },
  { value: 'whatsapp', label: 'WhatsApp', color: 'bg-green-500' },
  { value: 'youtube', label: 'YouTube', color: 'bg-red-500' },
  { value: 'linkedin', label: 'LinkedIn', color: 'bg-blue-700' },
  { value: 'twitter', label: 'Twitter', color: 'bg-blue-400' }
];

const contentTypes = [
  { value: 'text', label: 'Texto' },
  { value: 'image', label: 'Imagem' },
  { value: 'video', label: 'Vídeo' },
  { value: 'carousel', label: 'Carrossel' },
  { value: 'story', label: 'Story' },
  { value: 'reel', label: 'Reel' }
];

const toneOptions = [
  { value: 'professional', label: 'Profissional' },
  { value: 'casual', label: 'Casual' },
  { value: 'friendly', label: 'Amigável' },
  { value: 'humorous', label: 'Humorístico' },
  { value: 'inspiring', label: 'Inspirador' },
  { value: 'informative', label: 'Informativo' }
];

export const PostEditor: React.FC<PostEditorProps> = ({
  post,
  onSave,
  onCancel,
  isOpen = true
}) => {
  const { createPost, updatePost, loading } = usePosts();
  const [aiLoading, setAiLoading] = useState(false);
  const [suggestedHashtags, setSuggestedHashtags] = useState<HashtagSuggestion[]>([]);
  const [contentIdeas, setContentIdeas] = useState<string[]>([]);
  const [currentHashtags, setCurrentHashtags] = useState<string[]>([]);
  const [currentMentions, setCurrentMentions] = useState<string[]>([]);
  const [hashtagInput, setHashtagInput] = useState('');
  const [mentionInput, setMentionInput] = useState('');
  const [aiOptions, setAiOptions] = useState({
    tone: 'professional' as const,
    targetAudience: 'Empreendedores',
    includeHashtags: true,
    includeCTA: true
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors }
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      content: post?.content || '',
      title: post?.title || '',
      platforms: post?.platforms || ['instagram'],
      content_type: post?.content_type || 'text',
      hashtags: post?.hashtags || [],
      mentions: post?.mentions || [],
      scheduled_for: post?.scheduled_for ? 
        format(new Date(post.scheduled_for), "yyyy-MM-dd'T'HH:mm") : ''
    }
  });

  const watchedContent = watch('content');
  const watchedPlatforms = watch('platforms');

  // Initialize current hashtags and mentions
  useEffect(() => {
    if (post) {
      setCurrentHashtags(post.hashtags || []);
      setCurrentMentions(post.mentions || []);
    }
  }, [post]);

  // Update form when hashtags/mentions change
  useEffect(() => {
    setValue('hashtags', currentHashtags);
  }, [currentHashtags, setValue]);

  useEffect(() => {
    setValue('mentions', currentMentions);
  }, [currentMentions, setValue]);

  // Generate content with AI
  const handleGenerateContent = async (prompt: string) => {
    if (!prompt.trim()) {
      toast.error('Digite uma ideia ou prompt para gerar conteúdo');
      return;
    }

    if (watchedPlatforms.length === 0) {
      toast.error('Selecione ao menos uma plataforma');
      return;
    }

    try {
      setAiLoading(true);

      const options: ContentGenerationOptions = {
        platform: watchedPlatforms[0] as any,
        contentType: 'post',
        tone: aiOptions.tone,
        targetAudience: aiOptions.targetAudience,
        includeHashtags: aiOptions.includeHashtags,
        includeCTA: aiOptions.includeCTA
      };

      const generatedContent = await generateContent(prompt, options);
      setValue('content', generatedContent);

      // Extract hashtags from generated content
      if (aiOptions.includeHashtags) {
        const hashtagMatches = generatedContent.match(/#\w+/g);
        if (hashtagMatches) {
          const extractedHashtags = hashtagMatches.map(h => h.substring(1));
          setCurrentHashtags(prev => [...new Set([...prev, ...extractedHashtags])]);
        }
      }

      toast.success('Conteúdo gerado com sucesso!');
    } catch (error) {
      console.error('Erro ao gerar conteúdo:', error);
      toast.error('Erro ao gerar conteúdo com IA');
    } finally {
      setAiLoading(false);
    }
  };

  // Suggest hashtags based on content
  const handleSuggestHashtags = async () => {
    if (!watchedContent.trim()) {
      toast.error('Digite o conteúdo primeiro para sugerir hashtags');
      return;
    }

    try {
      setAiLoading(true);
      const platform = watchedPlatforms[0] || 'instagram';
      const suggestions = await suggestHashtags(
        watchedContent, 
        platform, 
        aiOptions.targetAudience,
        15
      );
      
      setSuggestedHashtags(suggestions);
      toast.success(`${suggestions.length} hashtags sugeridas`);
    } catch (error) {
      console.error('Erro ao sugerir hashtags:', error);
      toast.error('Erro ao sugerir hashtags');
    } finally {
      setAiLoading(false);
    }
  };

  // Optimize content
  const handleOptimizeContent = async () => {
    if (!watchedContent.trim()) {
      toast.error('Digite o conteúdo primeiro para otimizar');
      return;
    }

    try {
      setAiLoading(true);
      const platform = watchedPlatforms[0] || 'instagram';
      const optimization = await optimizeContent(
        watchedContent,
        platform,
        aiOptions.targetAudience
      );

      // Show optimization suggestions
      toast.success(
        `Score de engajamento: ${optimization.engagement_score}%\n` +
        `Legibilidade: ${optimization.readability_score}%`,
        { duration: 5000 }
      );

      // Add suggested hashtags
      if (optimization.recommended_hashtags.length > 0) {
        setSuggestedHashtags(optimization.recommended_hashtags);
      }
    } catch (error) {
      console.error('Erro ao otimizar conteúdo:', error);
      toast.error('Erro ao otimizar conteúdo');
    } finally {
      setAiLoading(false);
    }
  };

  // Add hashtag
  const addHashtag = (hashtag: string) => {
    if (hashtag && !currentHashtags.includes(hashtag)) {
      setCurrentHashtags(prev => [...prev, hashtag]);
      setHashtagInput('');
    }
  };

  // Remove hashtag
  const removeHashtag = (hashtag: string) => {
    setCurrentHashtags(prev => prev.filter(h => h !== hashtag));
  };

  // Add mention
  const addMention = (mention: string) => {
    if (mention && !currentMentions.includes(mention)) {
      setCurrentMentions(prev => [...prev, mention]);
      setMentionInput('');
    }
  };

  // Remove mention
  const removeMention = (mention: string) => {
    setCurrentMentions(prev => prev.filter(m => m !== mention));
  };

  // Handle form submission
  const onSubmit = async (data: PostFormData) => {
    try {
      const postData: CreatePostData = {
        ...data,
        hashtags: currentHashtags,
        mentions: currentMentions,
        ai_generated: false // Set to true if content was AI-generated
      };

      let savedPost: Post | null;
      
      if (post?.id) {
        savedPost = await updatePost(post.id, postData);
      } else {
        savedPost = await createPost(postData);
      }

      if (savedPost && onSave) {
        onSave(savedPost);
      }
    } catch (error) {
      console.error('Erro ao salvar post:', error);
      toast.error('Erro ao salvar post');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            {post ? 'Editar Post' : 'Criar Novo Post'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="content">Conteúdo</TabsTrigger>
                <TabsTrigger value="ai">IA Assistente</TabsTrigger>
                <TabsTrigger value="media">Mídia</TabsTrigger>
                <TabsTrigger value="schedule">Agendamento</TabsTrigger>
              </TabsList>

              {/* Content Tab */}
              <TabsContent value="content" className="space-y-4">
                <div>
                  <Label htmlFor="title">Título (Opcional)</Label>
                  <Input
                    id="title"
                    placeholder="Título do post..."
                    {...register('title')}
                  />
                </div>

                <div>
                  <Label htmlFor="content">Conteúdo *</Label>
                  <Textarea
                    id="content"
                    placeholder="Escreva seu post aqui..."
                    rows={6}
                    {...register('content')}
                    className={errors.content ? 'border-red-500' : ''}
                  />
                  {errors.content && (
                    <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
                  )}
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>{watchedContent?.length || 0} caracteres</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleOptimizeContent}
                      disabled={aiLoading}
                    >
                      <Target className="h-4 w-4 mr-1" />
                      Otimizar
                    </Button>
                  </div>
                </div>

                {/* Platforms */}
                <div>
                  <Label>Plataformas *</Label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {platformOptions.map((platform) => (
                      <label
                        key={platform.value}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          value={platform.value}
                          {...register('platforms')}
                          className="rounded"
                        />
                        <div className={`w-3 h-3 rounded ${platform.color}`} />
                        <span className="text-sm">{platform.label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.platforms && (
                    <p className="text-red-500 text-sm mt-1">{errors.platforms.message}</p>
                  )}
                </div>

                {/* Content Type */}
                <div>
                  <Label htmlFor="content_type">Tipo de Conteúdo</Label>
                  <Select onValueChange={(value) => setValue('content_type', value as any)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {contentTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Hashtags */}
                <div>
                  <Label>Hashtags</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      placeholder="Adicionar hashtag..."
                      value={hashtagInput}
                      onChange={(e) => setHashtagInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addHashtag(hashtagInput);
                        }
                      }}
                    />
                    <Button
                      type="button"
                      onClick={() => addHashtag(hashtagInput)}
                      size="sm"
                    >
                      <Hash className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleSuggestHashtags}
                      disabled={aiLoading}
                    >
                      <Sparkles className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* Current Hashtags */}
                  <div className="flex flex-wrap gap-1">
                    {currentHashtags.map((hashtag) => (
                      <Badge
                        key={hashtag}
                        variant="secondary"
                        className="cursor-pointer"
                        onClick={() => removeHashtag(hashtag)}
                      >
                        #{hashtag} ×
                      </Badge>
                    ))}
                  </div>

                  {/* Suggested Hashtags */}
                  {suggestedHashtags.length > 0 && (
                    <div className="mt-2">
                      <Label className="text-sm text-gray-600">Sugestões:</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {suggestedHashtags.map((suggestion) => (
                          <Badge
                            key={suggestion.hashtag}
                            variant="outline"
                            className="cursor-pointer hover:bg-blue-50"
                            onClick={() => addHashtag(suggestion.hashtag)}
                          >
                            #{suggestion.hashtag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Mentions */}
                <div>
                  <Label>Menções</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      placeholder="Adicionar menção..."
                      value={mentionInput}
                      onChange={(e) => setMentionInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addMention(mentionInput);
                        }
                      }}
                    />
                    <Button
                      type="button"
                      onClick={() => addMention(mentionInput)}
                      size="sm"
                    >
                      <AtSign className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {currentMentions.map((mention) => (
                      <Badge
                        key={mention}
                        variant="secondary"
                        className="cursor-pointer"
                        onClick={() => removeMention(mention)}
                      >
                        @{mention} ×
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* AI Assistant Tab */}
              <TabsContent value="ai" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Sparkles className="h-5 w-5" />
                      Assistente de IA
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* AI Options */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Tom do Conteúdo</Label>
                        <Select 
                          value={aiOptions.tone}
                          onValueChange={(value) => setAiOptions(prev => ({ ...prev, tone: value as any }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {toneOptions.map((tone) => (
                              <SelectItem key={tone.value} value={tone.value}>
                                {tone.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Público-Alvo</Label>
                        <Input
                          value={aiOptions.targetAudience}
                          onChange={(e) => setAiOptions(prev => ({ ...prev, targetAudience: e.target.value }))}
                          placeholder="Ex: Empreendedores, Jovens, Mães..."
                        />
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={aiOptions.includeHashtags}
                          onCheckedChange={(checked) => 
                            setAiOptions(prev => ({ ...prev, includeHashtags: checked }))
                          }
                        />
                        <Label>Incluir Hashtags</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={aiOptions.includeCTA}
                          onCheckedChange={(checked) => 
                            setAiOptions(prev => ({ ...prev, includeCTA: checked }))
                          }
                        />
                        <Label>Incluir Call-to-Action</Label>
                      </div>
                    </div>

                    <Separator />

                    {/* Content Generation */}
                    <div>
                      <Label>Gerar Conteúdo com IA</Label>
                      <div className="flex gap-2 mt-2">
                        <Input
                          placeholder="Digite uma ideia ou prompt..."
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleGenerateContent(e.currentTarget.value);
                            }
                          }}
                        />
                        <Button
                          type="button"
                          onClick={(e) => {
                            const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                            handleGenerateContent(input.value);
                          }}
                          disabled={aiLoading}
                        >
                          {aiLoading ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                          ) : (
                            <Lightbulb className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleSuggestHashtags}
                        disabled={aiLoading}
                      >
                        <Hash className="h-4 w-4 mr-1" />
                        Sugerir Hashtags
                      </Button>
                      
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleOptimizeContent}
                        disabled={aiLoading}
                      >
                        <Target className="h-4 w-4 mr-1" />
                        Otimizar Conteúdo
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Media Tab */}
              <TabsContent value="media" className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <div className="flex justify-center space-x-4 mb-4">
                        <Image className="h-12 w-12 text-gray-400" />
                        <Video className="h-12 w-12 text-gray-400" />
                      </div>
                      <p className="text-gray-500">
                        Upload de mídia será implementado na próxima versão
                      </p>
                      <p className="text-sm text-gray-400 mt-2">
                        Suporte para imagens, vídeos e GIFs
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Schedule Tab */}
              <TabsContent value="schedule" className="space-y-4">
                <div>
                  <Label htmlFor="scheduled_for">Agendar Publicação</Label>
                  <div className="flex gap-2 mt-2">
                    <Calendar className="h-5 w-5 text-gray-400 mt-2" />
                    <Input
                      id="scheduled_for"
                      type="datetime-local"
                      {...register('scheduled_for')}
                      min={format(new Date(), "yyyy-MM-dd'T'HH:mm")}
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Deixe em branco para salvar como rascunho
                  </p>
                </div>
              </TabsContent>
            </Tabs>

            {/* Action Buttons */}
            <div className="flex justify-between pt-6 border-t">
              <div className="flex gap-2">
                {onCancel && (
                  <Button type="button" variant="outline" onClick={onCancel}>
                    Cancelar
                  </Button>
                )}
              </div>
              
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    const formData = watch();
                    onSubmit({ ...formData, scheduled_for: undefined });
                  }}
                  disabled={loading}
                >
                  <Save className="h-4 w-4 mr-1" />
                  Salvar Rascunho
                </Button>
                
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  ) : (
                    <Send className="h-4 w-4 mr-1" />
                  )}
                  {watch('scheduled_for') ? 'Agendar' : 'Publicar'}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}; 