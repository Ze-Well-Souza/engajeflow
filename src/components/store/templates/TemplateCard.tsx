
import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ImageIcon, Instagram, Facebook, Youtube } from "lucide-react";

interface TemplateCardProps {
  template: {
    id: string;
    nome: string;
    plataforma: string;
    tipo: string;
    imagem: string;
  };
  onGenerateContent: (template: any) => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template, onGenerateContent }) => {
  return (
    <Card key={template.id} className="bg-gray-800 border-gray-700 overflow-hidden">
      <div className="aspect-[4/5] bg-gray-900 relative overflow-hidden">
        <img 
          src={template.imagem} 
          alt={template.nome} 
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <Badge className="bg-gray-800/80 backdrop-blur">
            {template.tipo}
          </Badge>
        </div>
      </div>
      <CardHeader className="py-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base">{template.nome}</CardTitle>
            <div className="flex items-center mt-1">
              {template.plataforma === 'instagram' && <Instagram className="h-3 w-3 mr-1" />}
              {template.plataforma === 'facebook' && <Facebook className="h-3 w-3 mr-1" />}
              {template.plataforma === 'youtube' && <Youtube className="h-3 w-3 mr-1" />}
              <p className="text-xs capitalize text-gray-400">{template.plataforma}</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <div className="p-3 pt-0">
        <Button 
          className="w-full bg-purple-600 hover:bg-purple-700"
          onClick={() => onGenerateContent(template)}
        >
          <ImageIcon className="h-4 w-4 mr-2" />
          Gerar conteúdo
        </Button>
      </div>
    </Card>
  );
};

export default TemplateCard;
