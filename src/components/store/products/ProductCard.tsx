
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, QrCode, Trash, Sparkles, Share2 } from "lucide-react";

interface ProductCardProps {
  produto: {
    id: string;
    nome: string;
    preco: string;
    estoque: number;
    categoria: string;
    status: string;
    imagem: string;
    descricao?: string;
  };
  onSelectForDesign: (produto: any) => void;
  onOpenAiAssistant: (produto: any) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  produto,
  onSelectForDesign,
  onOpenAiAssistant,
}) => {
  return (
    <Card key={produto.id} className="bg-gray-800 border-gray-700 overflow-hidden">
      <div className="aspect-square bg-gray-900 relative">
        <img 
          src={produto.imagem} 
          alt={produto.nome} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge 
            className={
              produto.status === 'Ativo' ? 'bg-green-600' : 
              produto.status === 'Baixo estoque' ? 'bg-amber-600' : 
              'bg-red-600'
            }
          >
            {produto.status}
          </Badge>
        </div>
      </div>
      <CardHeader className="py-3">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs text-gray-400">{produto.id}</p>
            <CardTitle className="text-base">{produto.nome}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="py-0">
        <div className="flex justify-between text-sm">
          <span>{produto.preco}</span>
          <span>Estoque: {produto.estoque}</span>
        </div>
        <p className="text-xs text-gray-400 mt-1">Categoria: {produto.categoria}</p>
      </CardContent>
      <div className="p-3 pt-0 flex justify-between">
        <div className="flex gap-1">
          <Button variant="ghost" size="sm">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <QrCode className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Trash className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex gap-1">
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => onOpenAiAssistant(produto)}
            className="h-8"
          >
            <Sparkles className="h-3 w-3 mr-1" />
            IA
          </Button>
          <Button 
            size="sm" 
            onClick={() => onSelectForDesign(produto)}
            className="bg-purple-600 hover:bg-purple-700 h-8"
          >
            <Share2 className="h-3 w-3 mr-1" />
            Conteúdo
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
