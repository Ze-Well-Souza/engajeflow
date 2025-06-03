
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Plus, Search, Filter as FilterIcon, QrCode, Edit, Trash } from "lucide-react";

const produtos = [
  { id: 'PRD001', nome: 'Smartphone TechX Pro', preco: 'R$ 1.899,00', estoque: 24, categoria: 'Eletrônicos', status: 'Ativo' },
  { id: 'PRD002', nome: 'Notebook UltraBook 15"', preco: 'R$ 4.599,00', estoque: 12, categoria: 'Eletrônicos', status: 'Ativo' },
  { id: 'PRD003', nome: 'Headphone Bluetooth', preco: 'R$ 299,90', estoque: 45, categoria: 'Acessórios', status: 'Ativo' },
  { id: 'PRD004', nome: 'Mouse Gamer RGB', preco: 'R$ 159,90', estoque: 38, categoria: 'Acessórios', status: 'Ativo' },
  { id: 'PRD005', nome: 'Monitor 27" Full HD', preco: 'R$ 1.299,00', estoque: 7, categoria: 'Eletrônicos', status: 'Baixo estoque' },
  { id: 'PRD006', nome: 'Teclado Mecânico', preco: 'R$ 349,90', estoque: 0, categoria: 'Acessórios', status: 'Sem estoque' },
  { id: 'PRD007', nome: 'Carregador USB-C', preco: 'R$ 89,90', estoque: 56, categoria: 'Acessórios', status: 'Ativo' },
  { id: 'PRD008', nome: 'Smartwatch Fitness', preco: 'R$ 599,90', estoque: 15, categoria: 'Wearables', status: 'Ativo' },
];

const ProdutosPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Produtos</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Novo Produto
        </button>
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
              <Package className="h-4 w-4 text-green-500" />
              Produtos Ativos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Package className="h-4 w-4 text-yellow-500" />
              Baixo Estoque
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Package className="h-4 w-4 text-red-500" />
              Sem Estoque
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle>Catálogo de Produtos</CardTitle>
          <div className="flex flex-col space-y-2 md:flex-row md:justify-between md:space-y-0 mt-4">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Buscar produto..." 
                className="pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-md w-full md:w-64"
              />
            </div>
            <div className="flex gap-2">
              <select className="bg-gray-900 border border-gray-700 rounded-md px-3 py-1.5 text-sm">
                <option>Todas as categorias</option>
                <option>Eletrônicos</option>
                <option>Acessórios</option>
                <option>Wearables</option>
              </select>
              <button className="bg-gray-700 hover:bg-gray-600 p-2 rounded-md">
                <FilterIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-400 text-sm">
                  <th className="pb-3">ID</th>
                  <th className="pb-3">Nome</th>
                  <th className="pb-3">Preço</th>
                  <th className="pb-3">Estoque</th>
                  <th className="pb-3">Categoria</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Ações</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {produtos.map((produto, i) => (
                  <tr key={i} className="border-t border-gray-700">
                    <td className="py-3">{produto.id}</td>
                    <td>{produto.nome}</td>
                    <td>{produto.preco}</td>
                    <td>{produto.estoque}</td>
                    <td>{produto.categoria}</td>
                    <td>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        produto.status === 'Ativo' ? 'bg-green-900/30 text-green-500 border border-green-800/50' : 
                        produto.status === 'Baixo estoque' ? 'bg-yellow-900/30 text-yellow-500 border border-yellow-800/50' : 
                        'bg-red-900/30 text-red-500 border border-red-800/50'
                      }`}>
                        {produto.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex space-x-2">
                        <button className="p-1 hover:bg-gray-700 rounded" title="Editar">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="p-1 hover:bg-gray-700 rounded" title="Gerar QR Code">
                          <QrCode className="h-4 w-4" />
                        </button>
                        <button className="p-1 hover:bg-gray-700 rounded" title="Excluir">
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-400">
              Exibindo 1-8 de 142 produtos
            </div>
            <div className="flex space-x-1">
              <button className="px-3 py-1 bg-gray-700 rounded-md text-sm">Anterior</button>
              <button className="px-3 py-1 bg-blue-600 rounded-md text-sm">1</button>
              <button className="px-3 py-1 bg-gray-700 rounded-md text-sm">2</button>
              <button className="px-3 py-1 bg-gray-700 rounded-md text-sm">3</button>
              <button className="px-3 py-1 bg-gray-700 rounded-md text-sm">Próximo</button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProdutosPage;
