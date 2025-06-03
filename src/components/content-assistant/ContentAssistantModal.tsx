
import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GenerateContentForm from "./GenerateContentForm";
import ContentPreview from "./ContentPreview";
import PostTimeSuggestions from "./PostTimeSuggestions";
import TranslationPanel from "./TranslationPanel";
import { ContentType, GeneratedContent } from "@/hooks/useAiContentGenerator";

interface ContentAssistantModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productInfo?: {
    id?: string;
    name: string;
    description?: string;
    imageUrl?: string;
  };
  onSaveContent?: (content: GeneratedContent) => void;
}

const ContentAssistantModal: React.FC<ContentAssistantModalProps> = ({
  open,
  onOpenChange,
  productInfo,
  onSaveContent
}) => {
  const [activeTab, setActiveTab] = useState("generate");
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState("instagram");

  const handleContentGenerated = (content: GeneratedContent) => {
    setGeneratedContent(content);
    setActiveTab("preview");
  };

  const handleSaveContent = () => {
    if (generatedContent && onSaveContent) {
      onSaveContent(generatedContent);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Assistente de Conteúdo IA</DialogTitle>
          <DialogDescription>
            Gere automaticamente legendas, hashtags e descrições para suas postagens.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="generate">Gerar Conteúdo</TabsTrigger>
            <TabsTrigger value="preview" disabled={!generatedContent}>Preview</TabsTrigger>
            <TabsTrigger value="translate" disabled={!generatedContent}>Traduzir</TabsTrigger>
          </TabsList>
          
          <TabsContent value="generate">
            <GenerateContentForm 
              productInfo={productInfo}
              onContentGenerated={handleContentGenerated}
              selectedPlatform={selectedPlatform}
              onPlatformChange={setSelectedPlatform}
            />
          </TabsContent>
          
          <TabsContent value="preview">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ContentPreview 
                content={generatedContent} 
                productInfo={productInfo} 
                onSave={handleSaveContent}
              />
              <PostTimeSuggestions platform={selectedPlatform} />
            </div>
          </TabsContent>
          
          <TabsContent value="translate">
            <TranslationPanel 
              content={generatedContent} 
              onTranslated={(translatedContent) => setGeneratedContent({ ...generatedContent, ...translatedContent })}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ContentAssistantModal;
