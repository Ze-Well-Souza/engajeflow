
import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter as FilterIcon } from "lucide-react";
import ProductCard from "./ProductCard";

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

interface ProductCatalogProps {
  onSelectForDesign: (produto: any) => void;
  onOpenAiAssistant: (produto: any) => void;
}

const ProductCatalog: React.FC<ProductCatalogProps> = ({
  onSelectForDesign,
  onOpenAiAssistant
}) => {
  const [filtro, setFiltro] = useState("");
  const [categoria, setCategoria] = useState("todas");
  
  // Filtra produtos com base nos critérios
  const produtosFiltrados = produtos.filter(produto => {
    const matchesSearch = produto.nome.toLowerCase().includes(filtro.toLowerCase()) || 
                         produto.id.toLowerCase().includes(filtro.toLowerCase());
    const matchesCategoria = categoria === "todas" || produto.categoria.toLowerCase() === categoria.toLowerCase();
    return matchesSearch && matchesCategoria;
  });

  return (
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
            <ProductCard 
              key={produto.id} 
              produto={produto}
              onSelectForDesign={onSelectForDesign}
              onOpenAiAssistant={onOpenAiAssistant}
            />
          ))}
        </div>
        
        {produtosFiltrados.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-400">Nenhum produto encontrado com os filtros aplicados.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCatalog;
