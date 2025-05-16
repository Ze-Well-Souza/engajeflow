
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Package, Plus, ImageIcon } from "lucide-react";
import { toast } from "sonner";
import ContentAssistantModal from "@/components/content-assistant/ContentAssistantModal";
import { GeneratedContent } from "@/hooks/useAiContentGenerator";

// Componentes refatorados
import StoreMetricsGrid from "@/components/store/metrics/StoreMetricsGrid";
import ProductCatalog from "@/components/store/products/ProductCatalog";
import TemplatesGallery from "@/components/store/templates/TemplatesGallery";

const CatalogoProdutosPage = () => {
  const [activeTab, setActiveTab] = useState("catalogo");
  const [produtoSelecionado, setProdutoSelecionado] = useState<any>(null);
  const [isContentAssistantOpen, setIsContentAssistantOpen] = useState(false);
  
  // Selecionar produto para design
  const selecionarParaDesign = (produto: any) => {
    setProdutoSelecionado(produto);
    setActiveTab("templates");
    toast.success(`Produto "${produto.nome}" selecionado para criação de conteúdo`);
  };
  
  // Gerar conteúdo a partir do template
  const gerarConteudo = (template: any) => {
    if (!produtoSelecionado) {
      toast.error("Selecione um produto primeiro!");
      setActiveTab("catalogo");
      return;
    }
    
    toast.success(`Gerando ${template.tipo} para ${template.plataforma} usando o produto "${produtoSelecionado.nome}"`);
    // Aqui seria a lógica para gerar o conteúdo
  };
  
  // Abrir assistente de IA para o produto
  const abrirAssistenteIA = (produto: any) => {
    setProdutoSelecionado(produto);
    setIsContentAssistantOpen(true);
  };
  
  // Salvar conteúdo gerado
  const salvarConteudo = (content: GeneratedContent) => {
    if (!produtoSelecionado) return;
    
    toast.success("Conteúdo gerado com IA salvo!", {
      description: `Conteúdo criado para ${produtoSelecionado.nome}`
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Catálogo de Produtos</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setActiveTab("catalogo")}>
            <Package className="mr-2 h-4 w-4" />
            Catálogo
          </Button>
          <Button variant="outline" onClick={() => setActiveTab("templates")}>
            <ImageIcon className="mr-2 h-4 w-4" />
            Templates
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Novo Produto
          </Button>
        </div>
      </div>

      <StoreMetricsGrid />

      <Tabs defaultValue="catalogo" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="catalogo">Catálogo de Produtos</TabsTrigger>
          <TabsTrigger value="templates">Templates de Conteúdo</TabsTrigger>
        </TabsList>
        
        {/* Tab de Catálogo */}
        <TabsContent value="catalogo">
          <ProductCatalog 
            onSelectForDesign={selecionarParaDesign}
            onOpenAiAssistant={abrirAssistenteIA}
          />
        </TabsContent>
        
        {/* Tab de Templates */}
        <TabsContent value="templates">
          <TemplatesGallery 
            produtoSelecionado={produtoSelecionado}
            onChangeProduto={() => setProdutoSelecionado(null)}
            onGenerateContent={gerarConteudo}
            onGoToCatalog={() => setActiveTab("catalogo")}
          />
        </TabsContent>
      </Tabs>
      
      {/* Modal do Assistente de Conteúdo */}
      <ContentAssistantModal 
        open={isContentAssistantOpen}
        onOpenChange={setIsContentAssistantOpen}
        productInfo={produtoSelecionado ? {
          id: produtoSelecionado.id,
          name: produtoSelecionado.nome,
          description: produtoSelecionado.descricao || undefined,
          imageUrl: produtoSelecionado.imagem
        } : undefined}
        onSaveContent={salvarConteudo}
      />
    </div>
  );
};

export default CatalogoProdutosPage;
