
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderTree, Plus, Edit, Trash } from "lucide-react";

const categorias = [
  { id: 'CAT001', nome: 'Eletrônicos', produtos: 48, subcategorias: 4, status: 'Ativo' },
  { id: 'CAT002', nome: 'Acessórios', produtos: 72, subcategorias: 6, status: 'Ativo' },
  { id: 'CAT003', nome: 'Wearables', produtos: 15, subcategorias: 2, status: 'Ativo' },
  { id: 'CAT004', nome: 'Smart Home', produtos: 8, subcategorias: 3, status: 'Ativo' },
  { id: 'CAT005', nome: 'Periféricos', produtos: 35, subcategorias: 4, status: 'Ativo' },
  { id: 'CAT006', nome: 'Gaming', produtos: 21, subcategorias: 5, status: 'Ativo' },
  { id: 'CAT007', nome: 'Áudio', produtos: 18, subcategorias: 3, status: 'Ativo' },
];

const CategoriasPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Categorias</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Nova Categoria
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <FolderTree className="h-4 w-4 text-blue-500" />
              Total de Categorias
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <FolderTree className="h-4 w-4 text-green-500" />
              Subcategorias
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">27</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <FolderTree className="h-4 w-4 text-purple-500" />
              Produtos Categorizados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">217</div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle>Estrutura de Categorias</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-400 text-sm">
                  <th className="pb-3">ID</th>
                  <th className="pb-3">Nome</th>
                  <th className="pb-3">Produtos</th>
                  <th className="pb-3">Subcategorias</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Ações</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {categorias.map((categoria, i) => (
                  <tr key={i} className="border-t border-gray-700">
                    <td className="py-3">{categoria.id}</td>
                    <td>{categoria.nome}</td>
                    <td>{categoria.produtos}</td>
                    <td>{categoria.subcategorias}</td>
                    <td>
                      <span className="px-2 py-1 text-xs rounded-full bg-green-900/30 text-green-500 border border-green-800/50">
                        {categoria.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex space-x-2">
                        <button className="p-1 hover:bg-gray-700 rounded" title="Editar">
                          <Edit className="h-4 w-4" />
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
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle>Adicionar/Editar Categoria</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nome da Categoria</label>
              <input 
                type="text" 
                className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2"
                placeholder="Digite o nome da categoria"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Categoria Pai</label>
              <select className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2">
                <option value="">Selecione (opcional)</option>
                <option>Eletrônicos</option>
                <option>Acessórios</option>
                <option>Wearables</option>
                <option>Smart Home</option>
                <option>Periféricos</option>
                <option>Gaming</option>
                <option>Áudio</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Descrição</label>
              <textarea 
                className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2" 
                rows={3}
                placeholder="Descrição da categoria (opcional)"
              ></textarea>
            </div>
            <div className="md:col-span-2 flex justify-end pt-2">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                Salvar Categoria
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoriasPage;
