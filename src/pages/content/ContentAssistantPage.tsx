
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  MessageSquare, 
  Clock, 
  Globe, 
  Plus,
  Lightbulb,
} from "lucide-react";
import ContentAssistantModal from "@/components/content-assistant/ContentAssistantModal";
import { GeneratedContent } from "@/hooks/useAiContentGenerator";
import { toast } from "sonner";

const ContentAssistantPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [savedContents, setSavedContents] = useState<Array<GeneratedContent & { id: string; timestamp: string }>>([]);

  const handleOpenModal = (product?: any) => {
    setSelectedProduct(product || null);
    setIsModalOpen(true);
  };

  const handleSaveContent = (content: GeneratedContent) => {
    const newContent = {
      ...content,
      id: `content-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    
    setSavedContents([newContent, ...savedContents]);
    
    toast.success("Conteúdo salvo com sucesso!", {
      description: "O conteúdo gerado pela IA foi salvo na sua biblioteca."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Assistente de Conteúdo com IA</h1>
        <Button onClick={() => handleOpenModal()} className="gap-2">
          <Plus className="h-4 w-4" />
          Criar Novo Conteúdo
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-blue-500" />
              Conteúdos Gerados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{savedContents.length}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4 text-green-500" />
              Sugestões de Horários
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3 Plataformas</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Globe className="h-4 w-4 text-purple-500" />
              Idiomas Disponíveis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recursos do Assistente de IA</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-md bg-blue-800/30 text-blue-500 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Geração de Conteúdo</h3>
                    <p className="text-sm text-muted-foreground">
                      Gere automaticamente legendas, hashtags e descrições de produtos com base em palavras-chave ou imagens.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-md bg-green-800/30 text-green-500 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Sugestões de Horários</h3>
                    <p className="text-sm text-muted-foreground">
                      Receba sugestões inteligentes dos melhores horários para postar, com base no comportamento do seu público-alvo.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-md bg-purple-800/30 text-purple-500 flex items-center justify-center flex-shrink-0">
                    <Globe className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Tradução Automática</h3>
                    <p className="text-sm text-muted-foreground">
                      Traduza automaticamente suas legendas, hashtags e descrições para vários idiomas e alcance um público internacional.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-3">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-md bg-amber-800/30 text-amber-500 flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Dicas para Maximizar o Uso do Assistente de IA</h3>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="p-4 bg-gray-750 border border-gray-700 rounded-lg">
                    <h4 className="font-medium mb-2 text-sm">Seja específico nas descrições</h4>
                    <p className="text-sm text-muted-foreground">
                      Quanto mais detalhes você fornecer sobre seu produto, como características, público-alvo e benefícios, mais preciso será o conteúdo gerado.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-gray-750 border border-gray-700 rounded-lg">
                    <h4 className="font-medium mb-2 text-sm">Aproveite as traduções</h4>
                    <p className="text-sm text-muted-foreground">
                      Use a tradução automática para alcançar públicos internacionais. Posts bilíngues aumentam seu alcance sem exigir conhecimento do idioma.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-gray-750 border border-gray-700 rounded-lg">
                    <h4 className="font-medium mb-2 text-sm">Programe nos horários sugeridos</h4>
                    <p className="text-sm text-muted-foreground">
                      As sugestões de horários são baseadas em análises de engajamento. Programar suas postagens nesses horários pode aumentar o alcance em até 20%.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-gray-750 border border-gray-700 rounded-lg">
                    <h4 className="font-medium mb-2 text-sm">Edite e personalize</h4>
                    <p className="text-sm text-muted-foreground">
                      Use o conteúdo gerado como ponto de partida e adicione seu toque pessoal para maior autenticidade nas postagens.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
      
      <ContentAssistantModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen}
        productInfo={selectedProduct}
        onSaveContent={handleSaveContent}
      />
      
    </div>
  );
};

export default ContentAssistantPage;
