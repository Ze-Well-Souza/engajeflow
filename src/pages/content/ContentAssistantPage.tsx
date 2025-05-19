
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { 
  Loader2, 
  Sparkles, 
  MessageSquare, 
  BarChart, 
  Send, 
  Image,
  Type,
  Hash,
  CalendarCheck,
  Copy
} from "lucide-react";
import { useAiContentGenerator } from "@/hooks/useAiContentGenerator";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface GeneratedContentResult {
  title: string;
  content: string;
  hashtags: string[];
}

interface SentimentAnalysisResult {
  text: string;
  sentiment: "positivo" | "neutro" | "negativo";
  confidence: number;
  keywords: string[];
  summary: string;
}

const ContentAssistantPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("gerador");
  const [contentType, setContentType] = useState<string>("post");
  const [topic, setTopic] = useState<string>("");
  const [tone, setTone] = useState<string>("profissional");
  const [keywords, setKeywords] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContentResult | null>(null);

  const [messageText, setMessageText] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<SentimentAnalysisResult | null>(null);

  const { generateContent, isGenerating: isAiGenerating, progress } = useAiContentGenerator();

  const handleGenerateContent = async () => {
    if (!topic) {
      toast.warning("Por favor, informe um tópico para gerar conteúdo");
      return;
    }

    setIsGenerating(true);
    setGeneratedContent(null);

    try {
      // Usando o hook useAiContentGenerator para gerar conteúdo
      const content = await generateContent(
        topic,
        keywords,
        undefined,
        ["caption", "hashtags", "description"]
      );
      
      if (content) {
        // Converta o formato retornado pelo hook para o formato usado neste componente
        const formattedContent: GeneratedContentResult = {
          title: `${topic.charAt(0).toUpperCase() + topic.slice(1)}: O que você precisa saber`,
          content: content.caption || content.description || "",
          hashtags: content.hashtags || []
        };
        
        setGeneratedContent(formattedContent);
        toast.success("Conteúdo gerado com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao gerar conteúdo:", error);
      toast.error("Falha ao gerar conteúdo. Tente novamente.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAnalyzeSentiment = async () => {
    if (!messageText) {
      toast.warning("Por favor, insira um texto para analisar");
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      // Simulando chamada à API de análise de sentimento
      // Em um ambiente real, isso seria uma chamada a uma edge function do Supabase
      setTimeout(() => {
        // Análise de exemplo simulando resposta da IA
        const sentiment = Math.random() > 0.6 ? "positivo" : Math.random() > 0.3 ? "neutro" : "negativo";
        
        const mockAnalysisResult: SentimentAnalysisResult = {
          text: messageText,
          sentiment: sentiment as "positivo" | "neutro" | "negativo",
          confidence: parseFloat((Math.random() * 0.3 + 0.7).toFixed(2)), // 0.7 a 1.0
          keywords: messageText
            .split(" ")
            .filter(word => word.length > 4)
            .slice(0, 5),
          summary: `A mensagem demonstra um tom predominantemente ${sentiment}, com foco em aspectos ${sentiment === "positivo" ? "favoráveis" : sentiment === "neutro" ? "informativos" : "críticos"} sobre o tema tratado.`
        };

        setAnalysisResult(mockAnalysisResult);
        setIsAnalyzing(false);
        toast.success("Análise de sentimento concluída!");
      }, 1500);
    } catch (error) {
      console.error("Erro na análise de sentimento:", error);
      toast.error("Falha ao analisar o sentimento. Tente novamente.");
      setIsAnalyzing(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Conteúdo copiado para a área de transferência");
  };

  return (
    <div className="container mx-auto max-w-6xl py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Assistente de IA</h1>
        <p className="text-muted-foreground mt-1">
          Use inteligência artificial para gerar conteúdo e analisar sentimento de mensagens
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="gerador" className="flex items-center gap-2">
            <Sparkles size={16} />
            Gerador de Conteúdo
          </TabsTrigger>
          <TabsTrigger value="sentimento" className="flex items-center gap-2">
            <MessageSquare size={16} />
            Análise de Sentimento
          </TabsTrigger>
        </TabsList>

        <TabsContent value="gerador" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações</CardTitle>
                  <CardDescription>
                    Configure as opções para geração de conteúdo
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tipo de Conteúdo</label>
                    <Select value={contentType} onValueChange={setContentType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="post">Post para Redes Sociais</SelectItem>
                        <SelectItem value="email">Email Marketing</SelectItem>
                        <SelectItem value="blog">Artigo de Blog</SelectItem>
                        <SelectItem value="anuncio">Texto para Anúncio</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tom de Voz</label>
                    <Select value={tone} onValueChange={setTone}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="profissional">Profissional</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="entusiasmado">Entusiasmado</SelectItem>
                        <SelectItem value="informativo">Informativo</SelectItem>
                        <SelectItem value="humoristico">Humorístico</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tópico Principal</label>
                    <Input 
                      value={topic} 
                      onChange={(e) => setTopic(e.target.value)} 
                      placeholder="Ex: marketing digital, vendas online"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Palavras-chave (opcionais)</label>
                    <Input 
                      value={keywords} 
                      onChange={(e) => setKeywords(e.target.value)} 
                      placeholder="Separe palavras-chave com vírgulas"
                    />
                  </div>

                  <Button 
                    onClick={handleGenerateContent} 
                    className="w-full" 
                    disabled={isGenerating || !topic || isAiGenerating}
                  >
                    {isGenerating || isAiGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Gerando conteúdo... {progress > 0 ? `${progress}%` : ''}
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

              <Card>
                <CardHeader>
                  <CardTitle>Dicas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-sm">
                    <div className="flex gap-2">
                      <div className="bg-primary/10 text-primary p-2 rounded-md">
                        <Type size={16} />
                      </div>
                      <div>
                        <p className="font-medium">Seja específico</p>
                        <p className="text-muted-foreground">Quanto mais detalhes você fornecer, melhor será o conteúdo gerado.</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="bg-primary/10 text-primary p-2 rounded-md">
                        <Hash size={16} />
                      </div>
                      <div>
                        <p className="font-medium">Use palavras-chave</p>
                        <p className="text-muted-foreground">Adicione palavras-chave para guiar a geração de conteúdo.</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="bg-primary/10 text-primary p-2 rounded-md">
                        <CalendarCheck size={16} />
                      </div>
                      <div>
                        <p className="font-medium">Planeje seu conteúdo</p>
                        <p className="text-muted-foreground">Use o conteúdo gerado como base e faça adaptações conforme necessário.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-2">
              {generatedContent ? (
                <Card className="border-primary/20">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle>{generatedContent.title}</CardTitle>
                      <Button variant="ghost" size="icon" onClick={() => copyToClipboard(`${generatedContent.title}\n\n${generatedContent.content}\n\n${generatedContent.hashtags.join(' ')}`)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardDescription>
                      Conteúdo gerado para {contentType === "post" ? "post em redes sociais" : 
                        contentType === "email" ? "email marketing" : 
                        contentType === "blog" ? "artigo de blog" : 
                        "texto de anúncio"} com tom {tone}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                          <Type className="h-4 w-4" /> Conteúdo
                        </h3>
                        <div className="bg-muted p-3 rounded-md">
                          <p className="whitespace-pre-wrap">{generatedContent.content}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                          <Hash className="h-4 w-4" /> Hashtags
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {generatedContent.hashtags.map((tag, index) => (
                            <Badge key={index} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Separator />
                      
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setGeneratedContent(null)}>
                          Novo Conteúdo
                        </Button>
                        <Button>
                          Agendar Publicação
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="h-full flex flex-col items-center justify-center border rounded-lg border-dashed min-h-[500px] py-10">
                  <div className="text-center space-y-4">
                    <div className="bg-primary/10 p-4 rounded-full inline-flex">
                      <Sparkles className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium">Gerador de Conteúdo com IA</h3>
                    <p className="text-muted-foreground max-w-sm">
                      Configure as opções e clique em "Gerar Conteúdo" para criar textos, legendas e hashtags para suas redes sociais.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="sentimento" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Análise de Sentimento</CardTitle>
                <CardDescription>
                  Entenda o sentimento e a intenção das mensagens dos seus clientes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Mensagem do Cliente</label>
                  <Textarea 
                    value={messageText} 
                    onChange={(e) => setMessageText(e.target.value)} 
                    placeholder="Cole aqui a mensagem do cliente para análise"
                    rows={8}
                    className="resize-none"
                  />
                </div>

                <div className="flex items-center">
                  <Button 
                    onClick={handleAnalyzeSentiment} 
                    className="ml-auto" 
                    disabled={isAnalyzing || !messageText}
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analisando...
                      </>
                    ) : (
                      <>
                        <BarChart className="mr-2 h-4 w-4" />
                        Analisar Sentimento
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div>
              {analysisResult ? (
                <Card className={`border-opacity-20 ${
                  analysisResult.sentiment === 'positivo' ? 'border-green-600 bg-green-50/5' : 
                  analysisResult.sentiment === 'neutro' ? 'border-blue-600 bg-blue-50/5' : 
                  'border-red-600 bg-red-50/5'
                }`}>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className={`${
                        analysisResult.sentiment === 'positivo' ? 'text-green-600' : 
                        analysisResult.sentiment === 'neutro' ? 'text-blue-600' : 
                        'text-red-600'
                      }`}>
                        Sentimento {analysisResult.sentiment.charAt(0).toUpperCase() + analysisResult.sentiment.slice(1)}
                      </CardTitle>
                      <div className="text-sm font-medium">
                        Confiança: {(analysisResult.confidence * 100).toFixed(0)}%
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-1">Resumo da Análise:</h4>
                      <p>{analysisResult.summary}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-1">Palavras-chave Detectadas:</h4>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.keywords.map((keyword, index) => (
                          <Badge key={index} variant="secondary">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-1">Sugestão de Resposta:</h4>
                      <div className="bg-background border rounded-md p-3">
                        {analysisResult.sentiment === 'positivo' ? (
                          <p>Obrigado pelo seu feedback positivo! Ficamos felizes em saber que sua experiência foi satisfatória. Estamos sempre trabalhando para melhorar ainda mais nossos serviços.</p>
                        ) : analysisResult.sentiment === 'neutro' ? (
                          <p>Agradecemos seu contato. Entendemos sua solicitação e estamos à disposição para mais esclarecimentos ou informações adicionais que possam ser necessárias.</p>
                        ) : (
                          <p>Lamentamos por sua experiência. Gostaríamos de entender melhor a situação para resolver seu problema da melhor forma possível. Poderia nos fornecer mais detalhes para que possamos ajudá-lo(a) adequadamente?</p>
                        )}
                      </div>
                      
                      <div className="flex justify-end mt-2">
                        <Button variant="outline" size="sm" onClick={() => {
                          const responseText = analysisResult.sentiment === 'positivo' ? 
                            "Obrigado pelo seu feedback positivo! Ficamos felizes em saber que sua experiência foi satisfatória. Estamos sempre trabalhando para melhorar ainda mais nossos serviços." :
                            analysisResult.sentiment === 'neutro' ?
                            "Agradecemos seu contato. Entendemos sua solicitação e estamos à disposição para mais esclarecimentos ou informações adicionais que possam ser necessárias." :
                            "Lamentamos por sua experiência. Gostaríamos de entender melhor a situação para resolver seu problema da melhor forma possível. Poderia nos fornecer mais detalhes para que possamos ajudá-lo(a) adequadamente?";
                          
                          copyToClipboard(responseText);
                        }}>
                          <Send className="h-3.5 w-3.5 mr-1" />
                          Usar Resposta
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="h-full flex flex-col items-center justify-center border rounded-lg border-dashed min-h-[400px] py-10">
                  <div className="text-center space-y-4">
                    <div className="bg-primary/10 p-4 rounded-full inline-flex">
                      <MessageSquare className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium">Análise de Sentimento</h3>
                    <p className="text-muted-foreground max-w-sm">
                      Cole uma mensagem do cliente e clique em "Analisar Sentimento" para entender o tom da comunicação e obter sugestões de resposta.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentAssistantPage;
