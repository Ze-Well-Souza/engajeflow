
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserPlus, Search, Filter, Edit, Trash } from "lucide-react";

const clientes = [
  { id: 'CLI001', nome: 'Maria Silva', email: 'maria.silva@email.com', telefone: '(11) 98765-4321', compras: 8, valor: 'R$ 2.450,00', status: 'Ativo' },
  { id: 'CLI002', nome: 'João Santos', email: 'joao.santos@email.com', telefone: '(11) 97654-3210', compras: 5, valor: 'R$ 1.890,75', status: 'Ativo' },
  { id: 'CLI003', nome: 'Ana Oliveira', email: 'ana.oliveira@email.com', telefone: '(11) 96543-2109', compras: 3, valor: 'R$ 780,00', status: 'Ativo' },
  { id: 'CLI004', nome: 'Carlos Souza', email: 'carlos.souza@email.com', telefone: '(11) 95432-1098', compras: 1, valor: 'R$ 159,90', status: 'Inativo' },
  { id: 'CLI005', nome: 'Pedro Lima', email: 'pedro.lima@email.com', telefone: '(11) 94321-0987', compras: 12, valor: 'R$ 3.780,50', status: 'Ativo' },
  { id: 'CLI006', nome: 'Juliana Costa', email: 'juliana.costa@email.com', telefone: '(11) 93210-9876', compras: 6, valor: 'R$ 1.250,00', status: 'Ativo' },
  { id: 'CLI007', nome: 'Roberto Almeida', email: 'roberto.almeida@email.com', telefone: '(11) 92109-8765', compras: 0, valor: 'R$ 0,00', status: 'Inativo' },
];

const ClientesPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Clientes</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          Novo Cliente
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-500" />
              Total de Clientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">285</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-green-500" />
              Clientes Ativos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">246</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-yellow-500" />
              Novos (Este mês)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-purple-500" />
              Recorrentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">154</div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle>Lista de Clientes</CardTitle>
          <div className="flex flex-col space-y-2 md:flex-row md:justify-between md:space-y-0 mt-4">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Buscar cliente..." 
                className="pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-md w-full md:w-64"
              />
            </div>
            <div className="flex gap-2">
              <select className="bg-gray-900 border border-gray-700 rounded-md px-3 py-1.5 text-sm">
                <option>Todos os status</option>
                <option>Ativos</option>
                <option>Inativos</option>
              </select>
              <button className="bg-gray-700 hover:bg-gray-600 p-2 rounded-md">
                <Filter className="h-4 w-4" />
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
                  <th className="pb-3">Email</th>
                  <th className="pb-3">Telefone</th>
                  <th className="pb-3">Compras</th>
                  <th className="pb-3">Valor Total</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Ações</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {clientes.map((cliente, i) => (
                  <tr key={i} className="border-t border-gray-700">
                    <td className="py-3">{cliente.id}</td>
                    <td>{cliente.nome}</td>
                    <td>{cliente.email}</td>
                    <td>{cliente.telefone}</td>
                    <td>{cliente.compras}</td>
                    <td>{cliente.valor}</td>
                    <td>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        cliente.status === 'Ativo' ? 'bg-green-900/30 text-green-500 border border-green-800/50' : 
                        'bg-gray-900/30 text-gray-400 border border-gray-800/50'
                      }`}>
                        {cliente.status}
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
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-400">
              Exibindo 1-7 de 285 clientes
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

export default ClientesPage;
