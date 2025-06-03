
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAiContentGenerator, ContentType, GeneratedContent } from "@/hooks/useAiContentGenerator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Instagram, Facebook, Youtube } from "lucide-react";

interface GenerateContentFormProps {
  productInfo?: {
    name: string;
    description?: string;
    imageUrl?: string;
  };
  selectedPlatform: string;
  onPlatformChange: (platform: string) => void;
  onContentGenerated: (content: GeneratedContent) => void;
}

const GenerateContentForm: React.FC<GenerateContentFormProps> = ({
  productInfo,
  selectedPlatform,
  onPlatformChange,
  onContentGenerated
}) => {
  const { generateContent, isGenerating, progress } = useAiContentGenerator();
  
  const [productName, setProductName] = useState(productInfo?.name || "");
  const [productDescription, setProductDescription] = useState(productInfo?.description || "");
  const [selectedTypes, setSelectedTypes] = useState<ContentType[]>(["caption", "hashtags"]);

  const handleTypeToggle = (type: ContentType) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isGenerating) return;
    
    if (!productName.trim()) {
      return;
    }
    
    const content = await generateContent(
      productName,
      productDescription,
      productInfo?.imageUrl,
      selectedTypes
    );
    
    if (content) {
      onContentGenerated(content);
    }
  };

  const getPlatformIcon = () => {
    switch (selectedPlatform) {
      case "instagram": return <Instagram className="h-4 w-4" />;
      case "facebook": return <Facebook className="h-4 w-4" />;
      case "youtube": return <Youtube className="h-4 w-4" />;
      default: return <Instagram className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="platform">Plataforma</Label>
            <Select value={selectedPlatform} onValueChange={onPlatformChange}>
              <SelectTrigger id="platform" className="flex items-center gap-2">
                {getPlatformIcon()}
                <SelectValue placeholder="Selecione a plataforma" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="instagram" className="flex items-center gap-2">
                  <Instagram className="h-4 w-4" /> Instagram
                </SelectItem>
                <SelectItem value="facebook" className="flex items-center gap-2">
                  <Facebook className="h-4 w-4" /> Facebook
                </SelectItem>
                <SelectItem value="youtube" className="flex items-center gap-2">
                  <Youtube className="h-4 w-4" /> YouTube
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="product-name">Nome do Produto</Label>
            <Input
              id="product-name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Ex: Smartphone TechX Pro"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="product-description">Descrição do Produto (opcional)</Label>
            <Textarea
              id="product-description"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              placeholder="Descreva as características e benefícios do produto"
              rows={3}
            />
          </div>
          
          <div>
            <Label className="mb-2 block">Gerar</Label>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="caption" 
                  checked={selectedTypes.includes("caption")}
                  onCheckedChange={() => handleTypeToggle("caption")}
                />
                <label htmlFor="caption" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Legenda
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="hashtags" 
                  checked={selectedTypes.includes("hashtags")}
                  onCheckedChange={() => handleTypeToggle("hashtags")}
                />
                <label htmlFor="hashtags" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Hashtags
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="description" 
                  checked={selectedTypes.includes("description")}
                  onCheckedChange={() => handleTypeToggle("description")}
                />
                <label htmlFor="description" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Descrição Longa
                </label>
              </div>
            </div>
          </div>
          
          {isGenerating && (
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-center text-muted-foreground">
                Gerando conteúdo... {progress}%
              </p>
            </div>
          )}
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={isGenerating || !productName.trim() || selectedTypes.length === 0}
          >
            {isGenerating ? "Gerando..." : "Gerar Conteúdo com IA"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default GenerateContentForm;
