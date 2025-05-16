
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, QrCode, Calendar, Download, Banknote, TrendingUp } from "lucide-react";

const VendasPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gerenciamento de Vendas</h1>
        <div className="flex items-center space-x-2">
          <select className="bg-gray-800 border border-gray-700 rounded-md px-3 py-1.5 text-sm">
            <option>Últimos 7 dias</option>
            <option>Últimos 30 dias</option>
            <option>Este mês</option>
            <option>Mês passado</option>
          </select>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md flex items-center gap-2">
            <Download className="h-4 w-4" /> Exportar
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Vendas Totais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 24.583,00</div>
            <p className="text-xs text-green-500">+12.5% que no período anterior</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pedidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-green-500">+8.3% que no período anterior</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 192,05</div>
            <p className="text-xs text-green-500">+3.7% que no período anterior</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.7%</div>
            <p className="text-xs text-green-500">+0.5% que no período anterior</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Últimas Vendas</CardTitle>
          <button className="text-sm text-blue-400 hover:text-blue-300">Ver todas</button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-400 text-sm">
                  <th className="pb-3">ID</th>
                  <th className="pb-3">Cliente</th>
                  <th className="pb-3">Data</th>
                  <th className="pb-3">Valor</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Ações</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[
                  { id: '#12345', cliente: 'Maria Silva', data: '16/05/2025', valor: 'R$ 378,90', status: 'Completo' },
                  { id: '#12344', cliente: 'João Santos', data: '15/05/2025', valor: 'R$ 142,50', status: 'Pendente' },
                  { id: '#12343', cliente: 'Ana Oliveira', data: '15/05/2025', valor: 'R$ 253,75', status: 'Completo' },
                  { id: '#12342', cliente: 'Carlos Souza', data: '14/05/2025', valor: 'R$ 89,99', status: 'Cancelado' },
                  { id: '#12341', cliente: 'Pedro Lima', data: '14/05/2025', valor: 'R$ 427,30', status: 'Completo' },
                ].map((venda, i) => (
                  <tr key={i} className="border-t border-gray-700">
                    <td className="py-3">{venda.id}</td>
                    <td>{venda.cliente}</td>
                    <td>{venda.data}</td>
                    <td>{venda.valor}</td>
                    <td>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        venda.status === 'Completo' ? 'bg-green-900/30 text-green-500 border border-green-800/50' : 
                        venda.status === 'Pendente' ? 'bg-yellow-900/30 text-yellow-500 border border-yellow-800/50' : 
                        'bg-red-900/30 text-red-500 border border-red-800/50'
                      }`}>
                        {venda.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex space-x-2">
                        <button className="p-1 hover:bg-gray-700 rounded">
                          <Download className="h-4 w-4" />
                        </button>
                        <button className="p-1 hover:bg-gray-700 rounded">
                          <QrCode className="h-4 w-4" />
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Métodos de Pagamento</CardTitle>
            <PieChart className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center">
              <div className="space-y-4 w-full">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Cartão de Crédito</span>
                    <span>65%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: "65%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Boleto</span>
                    <span>15%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-green-600 rounded-full" style={{ width: "15%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Pix</span>
                    <span>20%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-600 rounded-full" style={{ width: "20%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>QR Code Generator</CardTitle>
            <QrCode className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">ID da Venda ou Produto</label>
                <input 
                  type="text" 
                  placeholder="Digite o ID da venda ou o código do produto"
                  className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Tipo</label>
                <select className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2">
                  <option>Link de Pagamento</option>
                  <option>Info do Produto</option>
                  <option>Catálogo</option>
                </select>
              </div>

              <div className="flex justify-center mt-4">
                <div className="h-32 w-32 border-2 border-dashed border-gray-600 flex items-center justify-center">
                  <QrCode className="h-16 w-16 text-gray-500" />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
                  <QrCode className="h-4 w-4" /> Gerar QR Code
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VendasPage;
