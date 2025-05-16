
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Package, 
  Plus, 
  Search, 
  Filter as FilterIcon, 
  QrCode, 
  Edit, 
  Trash,
  Instagram,
  Facebook,
  Youtube,
  ImageIcon,
  Share2,
  Sparkles
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import ProductContentButton from "@/components/content-assistant/ProductContentButton";
import ContentAssistantModal from "@/components/content-assistant/ContentAssistantModal";
import { GeneratedContent } from "@/hooks/useAiContentGenerator";

// Dados simulados de produtos
const produtos = [
  { id: 'PRD001', nome: 'Smartphone TechX Pro', preco: 'R$ 1.899,00', estoque: 24, categoria: 'Eletrônicos', status: 'Ativo', imagem: 'https://placehold.co/300x300/333/FFF?text=TechX' },
  { id: 'PRD002', nome: 'Notebook UltraBook 15"', preco: 'R$ 4.599,00', estoque: 12, categoria: 'Eletrônicos', status: 'Ativo', imagem: 'https://placehold.co/300x300/333/FFF?text=UltraBook' },
  { id: 'PRD003', nome: 'Headphone Bluetooth', preco: 'R$ 299,90', estoque: 45, categoria: 'Acessórios', status: 'Ativo', imagem: 'https://placehold.co/300x300/333/FFF?text=Headphone' },
  { id: 'PRD004', nome: 'Mouse Gamer RGB', preco: 'R$ 159,90', estoque: 38, categoria: 'Acessórios', status: 'Ativo', imagem: 'https://placehold.co/300x300/333/FFF?text=Mouse' },
  { id: 'PRD005', nome: 'Monitor 27" Full HD', preco: 'R$ 1.299,00', estoque: 7, categoria: 'Eletrônicos', status: 'Baixo estoque', imagem: 'https://placehold.co/300x300/333/FFF?text=Monitor' },
  { id: 'PRD006', nome: 'Teclado Mecânico', preco: 'R$ 349,90', estoque: 0, categoria: 'Acessórios', status: 'Sem estoque', imagem: 'https://placehold.co/300x300/333/FFF?text=Teclado' },
  { id: 'PRD007', nome: 'Carregador USB-C', preco: 'R$ 89,90', estoque: 56, categoria: 'Acessórios', status: 'Ativo', imagem: 'https://placehold.co/300x300/333/FFF?text=Carregador' },
  { id: 'PRD008', nome: 'Smartwatch Fitness', preco: 'R$ 599,90', estoque: 15, categoria: 'Wearables', status: 'Ativo', imagem: 'https://placehold.co/300x300/333/FFF?text=Smartwatch' },
];

// Templates de conteúdo visual
const templates = [
  { id: 'TPL001', nome: 'Promoção Instagram', plataforma: 'instagram', tipo: 'Story', imagem: 'https://placehold.co/270x480/8a3cf3/FFF?text=Instagram+Story' },
  { id: 'TPL002', nome: 'Post de Produto Instagram', plataforma: 'instagram', tipo: 'Feed', imagem: 'https://placehold.co/800x800/833cf3/FFF?text=Instagram+Post' },
  { id: 'TPL003', nome: 'Carrossel Facebook', plataforma: 'facebook', tipo: 'Feed', imagem: 'https://placehold.co/1200x630/3b5998/FFF?text=Facebook+Post' },
  { id: 'TPL004', nome: 'Vídeo YouTube', plataforma: 'youtube', tipo: 'Vídeo', imagem: 'https://placehold.co/1080x1920/000/FFF?text=YouTube+Video' },
  { id: 'TPL005', nome: 'Mini-catálogo Instagram', plataforma: 'instagram', tipo: 'Carousel', imagem: 'https://placehold.co/800x800/833cf3/FFF?text=Instagram+Carousel' },
  { id: 'TPL006', nome: 'Anúncio Facebook', plataforma: 'facebook', tipo: 'Ad', imagem: 'https://placehold.co/1200x628/3b5998/FFF?text=Facebook+Ad' },
];

const CatalogoProdutosPage = () => {
  const [activeTab, setActiveTab] = useState("catalogo");
  const [produtoSelecionado, setProdutoSelecionado] = useState<any>(null);
  const [filtro, setFiltro] = useState("");
  const [categoria, setCategoria] = useState("todas");
  const [isContentAssistantOpen, setIsContentAssistantOpen] = useState(false);
  
  // Filtra produtos com base nos critérios
  const produtosFiltrados = produtos.filter(produto => {
    const matchesSearch = produto.nome.toLowerCase().includes(filtro.toLowerCase()) || 
                         produto.id.toLowerCase().includes(filtro.toLowerCase());
    const matchesCategoria = categoria === "todas" || produto.categoria.toLowerCase() === categoria.toLowerCase();
    return matchesSearch && matchesCategoria;
  });
  
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

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Package className="h-4 w-4 text-blue-500" />
              Total de Produtos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Instagram className="h-4 w-4 text-purple-500" />
              Posts Instagram
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Facebook className="h-4 w-4 text-blue-600" />
              Posts Facebook
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Youtube className="h-4 w-4 text-red-500" />
              Posts YouTube
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="catalogo" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="catalogo">Catálogo de Produtos</TabsTrigger>
          <TabsTrigger value="templates">Templates de Conteúdo</TabsTrigger>
        </TabsList>
        
        {/* Tab de Catálogo */}
        <TabsContent value="catalogo">
          <Card>
            <CardHeader>
              <CardTitle>Produtos Cadastrados</CardTitle>
              <CardDescription>
                Gerencie seus produtos e crie conteúdo para redes sociais.
              </CardDescription>
              
              <div className="flex flex-col space-y-2 md:flex-row md:justify-between md:space-y-0 mt-4">
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text" 
                    placeholder="Buscar produto..." 
                    className="pl-10 pr-4 py-2 w-full md:w-64"
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={categoria} onValueChange={setCategoria}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Todas as categorias" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todas">Todas as categorias</SelectItem>
                      <SelectItem value="Eletrônicos">Eletrônicos</SelectItem>
                      <SelectItem value="Acessórios">Acessórios</SelectItem>
                      <SelectItem value="Wearables">Wearables</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button size="sm" variant="ghost">
                    <FilterIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {produtosFiltrados.map((produto) => (
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
                          onClick={() => abrirAssistenteIA(produto)}
                          className="h-8"
                        >
                          <Sparkles className="h-3 w-3 mr-1" />
                          IA
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={() => selecionarParaDesign(produto)}
                          className="bg-purple-600 hover:bg-purple-700 h-8"
                        >
                          <Share2 className="h-3 w-3 mr-1" />
                          Conteúdo
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              
              {produtosFiltrados.length === 0 && (
                <div className="text-center py-10">
                  <p className="text-gray-400">Nenhum produto encontrado com os filtros aplicados.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Tab de Templates */}
        <TabsContent value="templates">
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
                    onClick={() => setProdutoSelecionado(null)}
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
                    onClick={() => setActiveTab("catalogo")}
                  >
                    Ir para o catálogo
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {templates.map((template) => (
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
                          onClick={() => gerarConteudo(template)}
                        >
                          <ImageIcon className="h-4 w-4 mr-2" />
                          Gerar conteúdo
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
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
