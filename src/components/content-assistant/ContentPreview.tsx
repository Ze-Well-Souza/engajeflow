
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check, Save } from "lucide-react";
import { GeneratedContent } from "@/hooks/useAiContentGenerator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface ContentPreviewProps {
  content: GeneratedContent | null;
  productInfo?: {
    name: string;
    imageUrl?: string;
  };
  onSave?: () => void;
}

const ContentPreview: React.FC<ContentPreviewProps> = ({
  content,
  productInfo,
  onSave
}) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState<Record<string, boolean>>({});

  if (!content) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">
            Nenhum conteúdo gerado ainda. Use o formulário para criar conteúdo.
          </p>
        </CardContent>
      </Card>
    );
  }

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied({ ...copied, [type]: true });
    
    toast({
      title: "Copiado!",
      description: "Conteúdo copiado para a área de transferência",
    });
    
    setTimeout(() => {
      setCopied({ ...copied, [type]: false });
    }, 2000);
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Conteúdo Gerado</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pb-3">
        {content.caption && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-medium">Legenda</h4>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6" 
                onClick={() => copyToClipboard(content.caption || "", "caption")}
              >
                {copied.caption ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-sm rounded-md p-3 bg-muted/50">
              {content.caption}
            </p>
          </div>
        )}
        
        {content.hashtags && content.hashtags.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-medium">Hashtags</h4>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6" 
                onClick={() => copyToClipboard(content.hashtags?.join(" ") || "", "hashtags")}
              >
                {copied.hashtags ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {content.hashtags.map((tag, idx) => (
                <Badge key={idx} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {content.description && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-medium">Descrição</h4>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6" 
                onClick={() => copyToClipboard(content.description || "", "description")}
              >
                {copied.description ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-sm rounded-md p-3 bg-muted/50 max-h-28 overflow-y-auto">
              {content.description}
            </p>
          </div>
        )}
      </CardContent>
      
      <CardFooter>
        <Button 
          className="w-full gap-2" 
          onClick={onSave}
        >
          <Save className="h-4 w-4" />
          Salvar Conteúdo
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ContentPreview;
