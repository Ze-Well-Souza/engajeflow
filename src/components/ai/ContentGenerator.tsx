
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Wand, Copy, CheckCircle, RefreshCcw, MessageSquare, Hash, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAiContentGenerator } from "@/hooks/useAiContentGenerator";

type ContentType = "caption" | "hashtags" | "description";

interface ContentGeneratorProps {
  defaultProduct?: {
    name: string;
    description?: string;
  };
  onContentSelected?: (content: string, type: ContentType) => void;
}

const ContentGenerator: React.FC<ContentGeneratorProps> = ({
  defaultProduct,
  onContentSelected,
}) => {
  const [activeTab, setActiveTab] = useState<ContentType>("caption");
  const [productName, setProductName] = useState(defaultProduct?.name || "");
  const [productDescription, setProductDescription] = useState(defaultProduct?.description || "");
  const [copied, setCopied] = useState<ContentType | null>(null);
  
  const { toast } = useToast();
  const { generateContent, isGenerating, progress } = useAiContentGenerator();
  const [generatedContent, setGeneratedContent] = useState<{
    caption?: string;
    hashtags?: string[];
    description?: string;
  }>({});
  
  const handleGenerate = async () => {
    if (!productName.trim()) {
      toast({
        title: "Nome do produto obrigatório",
        description: "Por favor, insira o nome do produto para gerar conteúdo.",
        variant: "destructive",
      });
      return;
    }
    
    const content = await generateContent(
      productName,
      productDescription,
      undefined,
      [activeTab]
    );
    
    if (content) {
      setGeneratedContent((prev) => ({ ...prev, ...content }));
    }
  };
  
  const handleCopy = (text: string, type: ContentType) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    toast({
      title: "Copiado!",
      description: "Conteúdo copiado para a área de transferência.",
    });
    
    setTimeout(() => {
      setCopied(null);
    }, 2000);
  };
  
  const handleSelect = (text: string, type: ContentType) => {
    if (onContentSelected) {
      onContentSelected(text, type);
      toast({
        title: "Conteúdo selecionado",
        description: "O conteúdo foi aplicado com sucesso.",
      });
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand className="h-5 w-5 text-primary" />
          Gerador de Conteúdo com IA
        </CardTitle>
        <CardDescription>
          Crie legendas, hashtags e descrições profissionais para seus produtos
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="product-name" className="text-sm font-medium">
            Nome do Produto
          </label>
          <Input
            id="product-name"
            placeholder="Ex: Smartphone Galaxy S22"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="product-description" className="text-sm font-medium">
            Descrição (opcional)
          </label>
          <Textarea
            id="product-description"
            placeholder="Adicione mais detalhes sobre o produto..."
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            rows={3}
          />
        </div>
        
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as ContentType)}>
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="caption" className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              Legendas
            </TabsTrigger>
            <TabsTrigger value="hashtags" className="flex items-center gap-1">
              <Hash className="h-4 w-4" />
              Hashtags
            </TabsTrigger>
            <TabsTrigger value="description" className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              Descrição
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="caption" className="mt-4 space-y-4">
            {generatedContent.caption ? (
              <div className="bg-muted p-3 rounded-md">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-sm font-medium">Legenda gerada</h3>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      onClick={() => handleCopy(generatedContent.caption!, "caption")}
                    >
                      {copied === "caption" ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                    {onContentSelected && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 px-2 text-xs"
                        onClick={() => handleSelect(generatedContent.caption!, "caption")}
                      >
                        Usar
                      </Button>
                    )}
                  </div>
                </div>
                <p className="text-sm">{generatedContent.caption}</p>
              </div>
            ) : isGenerating ? (
              <div className="space-y-2">
                <Progress value={progress} className="w-full" />
                <p className="text-xs text-muted-foreground text-center">
                  Gerando legenda perfeita...
                </p>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-sm text-muted-foreground">
                  Clique em "Gerar Conteúdo" para criar uma legenda com IA
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="hashtags" className="mt-4 space-y-4">
            {generatedContent.hashtags?.length ? (
              <div className="bg-muted p-3 rounded-md">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-sm font-medium">Hashtags geradas</h3>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      onClick={() => handleCopy(generatedContent.hashtags!.join(" "), "hashtags")}
                    >
                      {copied === "hashtags" ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                    {onContentSelected && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 px-2 text-xs"
                        onClick={() => handleSelect(generatedContent.hashtags!.join(" "), "hashtags")}
                      >
                        Usar
                      </Button>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {generatedContent.hashtags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-sm bg-primary/10 text-primary px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ) : isGenerating ? (
              <div className="space-y-2">
                <Progress value={progress} className="w-full" />
                <p className="text-xs text-muted-foreground text-center">
                  Gerando hashtags relevantes...
                </p>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-sm text-muted-foreground">
                  Clique em "Gerar Conteúdo" para criar hashtags com IA
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="description" className="mt-4 space-y-4">
            {generatedContent.description ? (
              <div className="bg-muted p-3 rounded-md">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-sm font-medium">Descrição gerada</h3>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      onClick={() => handleCopy(generatedContent.description!, "description")}
                    >
                      {copied === "description" ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                    {onContentSelected && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 px-2 text-xs"
                        onClick={() => handleSelect(generatedContent.description!, "description")}
                      >
                        Usar
                      </Button>
                    )}
                  </div>
                </div>
                <p className="text-sm">{generatedContent.description}</p>
              </div>
            ) : isGenerating ? (
              <div className="space-y-2">
                <Progress value={progress} className="w-full" />
                <p className="text-xs text-muted-foreground text-center">
                  Gerando descrição completa...
                </p>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-sm text-muted-foreground">
                  Clique em "Gerar Conteúdo" para criar uma descrição com IA
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter>
        <Button
          onClick={handleGenerate}
          disabled={isGenerating || !productName.trim()}
          className="w-full flex items-center gap-1"
        >
          {isGenerating ? (
            <>
              <RefreshCcw className="h-4 w-4 animate-spin" />
              Gerando...
            </>
          ) : (
            <>
              <Wand className="h-4 w-4" />
              Gerar Conteúdo
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ContentGenerator;
