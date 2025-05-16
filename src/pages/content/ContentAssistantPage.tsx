
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
import { Loader2, Sparkles, MessageSquare, BarChart, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface SentimentAnalysisResult {
  text: string;
  sentiment: "positivo" | "neutro" | "negativo";
  confidence: number;
  keywords: string[];
  summary: string;
}

interface ContentGenerationResult {
  title: string;
  content: string;
  hashtags: string[];
}

const ContentAssistantPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("gerador");
  const [contentType, setContentType] = useState<string>("post");
  const [topic, setTopic] = useState<string>("");
  const [tone, setTone] = useState<string>("profissional");
  const [keywords, setKeywords] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedContent, setGeneratedContent] = useState<ContentGenerationResult | null>(null);

  const [messageText, setMessageText] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<SentimentAnalysisResult | null>(null);

  const handleGenerateContent = async () => {
    if (!topic) {
      toast.warning("Por favor, informe um tópico para gerar conteúdo");
      return;
    }

    setIsGenerating(true);
    setGeneratedContent(null);

    try {
      // Simulando chamada à API de IA (OpenAI ou similar)
      // Em um ambiente real, isso seria uma chamada a uma edge function do Supabase
      setTimeout(() => {
        // Conteúdo de exemplo simulando resposta da IA
        const mockAIResponse: ContentGenerationResult = {
          title: `${topic.charAt(0).toUpperCase() + topic.slice(1)}: O que você precisa saber`,
          content: `O ${topic} se tornou um tema essencial para empresas que buscam se destacar no mercado atual. Com as novas tendências e tecnologias emergentes, é fundamental entender como aplicar estratégias eficientes para maximizar resultados.\n\nTrês fatores são cruciais para o sucesso: planejamento estratégico, implementação consistente e análise contínua de desempenho. Empresas que adotam uma abordagem estruturada tendem a obter melhores resultados a longo prazo.`,
          hashtags: ["#" + topic.replace(/\s+/g, ""), "#estratégiasdigitais", "#marketingconteúdo", "#tendências2025"]
        };

        setGeneratedContent(mockAIResponse);
        setIsGenerating(false);
        toast.success("Conteúdo gerado com sucesso!");
      }, 2000);
    } catch (error) {
      console.error("Erro ao gerar conteúdo:", error);
      toast.error("Falha ao gerar conteúdo. Tente novamente.");
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Assistente de IA</h1>
        <p className="text-muted-foreground">
          Use inteligência artificial para gerar conteúdo e analisar sentimento de mensagens
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
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
          <Card>
            <CardHeader>
              <CardTitle>Gerador de Conteúdo com IA</CardTitle>
              <CardDescription>
                Crie conteúdos de alta qualidade para suas redes sociais com auxílio de inteligência artificial
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Tópico Principal</label>
                <Input 
                  value={topic} 
                  onChange={(e) => setTopic(e.target.value)} 
                  placeholder="Ex: marketing digital, vendas online, atendimento ao cliente"
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
                disabled={isGenerating || !topic}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Gerando conteúdo...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Gerar Conteúdo
                  </>
                )}
              </Button>

              {generatedContent && (
                <Card className="mt-6 border-green-600/20 bg-green-50/10">
                  <CardHeader>
                    <CardTitle>{generatedContent.title}</CardTitle>
                    <CardDescription>
                      Conteúdo gerado para {contentType === "post" ? "post em redes sociais" : 
                        contentType === "email" ? "email marketing" : 
                        contentType === "blog" ? "artigo de blog" : 
                        "texto de anúncio"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="whitespace-pre-wrap">{generatedContent.content}</div>
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      {generatedContent.hashtags.map((tag, index) => (
                        <div key={index} className="bg-primary/10 text-primary px-2 py-1 rounded-md text-sm">
                          {tag}
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => {
                        navigator.clipboard.writeText(
                          `${generatedContent.title}\n\n${generatedContent.content}\n\n${generatedContent.hashtags.join(' ')}`
                        );
                        toast.success("Conteúdo copiado para a área de transferência");
                      }}>
                        Copiar
                      </Button>
                      <Button>Agendar Publicação</Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sentimento" className="space-y-4">
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
                  rows={5}
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

              {analysisResult && (
                <Card className={`mt-6 border-opacity-20 ${
                  analysisResult.sentiment === 'positivo' ? 'border-green-600 bg-green-50/10' : 
                  analysisResult.sentiment === 'neutro' ? 'border-blue-600 bg-blue-50/10' : 
                  'border-red-600 bg-red-50/10'
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
                          <div key={index} className="bg-muted px-2 py-1 rounded-md text-sm">
                            {keyword}
                          </div>
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
                          toast.success("Resposta copiada para a área de transferência");
                        }}>
                          <Send className="h-3.5 w-3.5 mr-1" />
                          Usar Resposta
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentAssistantPage;
