
import React from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Instagram, Facebook, Youtube } from "lucide-react";
import TemplateCard from "./TemplateCard";

// Templates de conteúdo visual
const templates = [
  { id: 'TPL001', nome: 'Promoção Instagram', plataforma: 'instagram', tipo: 'Story', imagem: 'https://placehold.co/270x480/8a3cf3/FFF?text=Instagram+Story' },
  { id: 'TPL002', nome: 'Post de Produto Instagram', plataforma: 'instagram', tipo: 'Feed', imagem: 'https://placehold.co/800x800/833cf3/FFF?text=Instagram+Post' },
  { id: 'TPL003', nome: 'Carrossel Facebook', plataforma: 'facebook', tipo: 'Feed', imagem: 'https://placehold.co/1200x630/3b5998/FFF?text=Facebook+Post' },
  { id: 'TPL004', nome: 'Vídeo YouTube', plataforma: 'youtube', tipo: 'Vídeo', imagem: 'https://placehold.co/1080x1920/000/FFF?text=YouTube+Video' },
  { id: 'TPL005', nome: 'Mini-catálogo Instagram', plataforma: 'instagram', tipo: 'Carousel', imagem: 'https://placehold.co/800x800/833cf3/FFF?text=Instagram+Carousel' },
  { id: 'TPL006', nome: 'Anúncio Facebook', plataforma: 'facebook', tipo: 'Ad', imagem: 'https://placehold.co/1200x628/3b5998/FFF?text=Facebook+Ad' },
];

interface TemplatesGalleryProps {
  produtoSelecionado: any;
  onChangeProduto: () => void;
  onGenerateContent: (template: any) => void;
  onGoToCatalog: () => void;
}

const TemplatesGallery: React.FC<TemplatesGalleryProps> = ({
  produtoSelecionado,
  onChangeProduto,
  onGenerateContent,
  onGoToCatalog
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Templates para Redes Sociais</CardTitle>
        <CardDescription>
          {produtoSelecionado 
            ? `Criando conteúdo para: ${produtoSelecionado.nome}`
            : "Selecione um produto no catálogo para criar conteúdo"
          }
        </CardDescription>
        
        {produtoSelecionado && (
          <div className="mt-4 flex items-center gap-4">
            <img 
              src={produtoSelecionado.imagem} 
              alt={produtoSelecionado.nome} 
              className="w-16 h-16 object-cover rounded-md"
            />
            <div>
              <h3 className="font-medium">{produtoSelecionado.nome}</h3>
              <p className="text-sm text-gray-400">{produtoSelecionado.preco}</p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="ml-auto"
              onClick={onChangeProduto}
            >
              Trocar produto
            </Button>
          </div>
        )}
        
        <div className="flex mt-6 gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className={!produtoSelecionado ? "opacity-50" : ""}
            disabled={!produtoSelecionado}
          >
            <Instagram className="h-4 w-4 mr-2" />
            Instagram
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className={!produtoSelecionado ? "opacity-50" : ""}
            disabled={!produtoSelecionado}
          >
            <Facebook className="h-4 w-4 mr-2" />
            Facebook
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className={!produtoSelecionado ? "opacity-50" : ""}
            disabled={!produtoSelecionado}
          >
            <Youtube className="h-4 w-4 mr-2" />
            YouTube
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        {!produtoSelecionado ? (
          <div className="text-center py-10">
            <Package className="h-12 w-12 mx-auto text-gray-400 mb-3" />
            <p className="text-lg font-medium">Nenhum produto selecionado</p>
            <p className="text-gray-400 mt-1">Selecione um produto no catálogo para criar conteúdo visual</p>
            <Button 
              className="mt-4"
              onClick={onGoToCatalog}
            >
              Ir para o catálogo
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {templates.map((template) => (
              <TemplateCard 
                key={template.id} 
                template={template}
                onGenerateContent={onGenerateContent}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TemplatesGallery;
