
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Check, Settings, Trash, Filter } from "lucide-react";

const notificacoes = [
  { 
    id: 1, 
    tipo: 'vendas', 
    titulo: 'Nova venda realizada', 
    mensagem: 'Venda #12345 concluída com sucesso via cartão de crédito.', 
    data: 'Hoje, 10:45', 
    lida: false 
  },
  { 
    id: 2, 
    tipo: 'sistema', 
    titulo: 'Backup automático realizado', 
    mensagem: 'O backup diário do sistema foi concluído com sucesso.', 
    data: 'Hoje, 04:00', 
    lida: true 
  },
  { 
    id: 3, 
    tipo: 'clientes', 
    titulo: 'Novo cliente cadastrado', 
    mensagem: 'Ana Oliveira acabou de criar uma conta na plataforma.', 
    data: 'Ontem, 15:23', 
    lida: false 
  },
  { 
    id: 4, 
    tipo: 'estoque', 
    titulo: 'Produto com baixo estoque', 
    mensagem: 'O produto "Monitor 27" Full HD" está com apenas 2 unidades em estoque.', 
    data: 'Ontem, 11:30', 
    lida: false 
  },
  { 
    id: 5, 
    tipo: 'mensagens', 
    titulo: 'Nova mensagem recebida', 
    mensagem: 'João Santos enviou uma pergunta sobre o produto #PRD002.', 
    data: 'Ontem, 09:15', 
    lida: true 
  },
  { 
    id: 6, 
    tipo: 'sistema', 
    titulo: 'Atualização disponível', 
    mensagem: 'Uma nova atualização do sistema está disponível para instalação.', 
    data: '15/05/2025', 
    lida: true 
  },
  { 
    id: 7, 
    tipo: 'vendas', 
    titulo: 'Meta mensal alcançada', 
    mensagem: 'Parabéns! A meta de vendas do mês foi atingida com sucesso.', 
    data: '14/05/2025', 
    lida: true 
  },
];

const NotificacoesPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Notificações</h1>
        <div className="flex items-center space-x-2">
          <select className="bg-gray-800 border border-gray-700 rounded-md px-3 py-1.5 text-sm">
            <option>Todas</option>
            <option>Não lidas</option>
            <option>Lidas</option>
          </select>
          <button className="bg-gray-700 hover:bg-gray-600 p-2 rounded-md">
            <Filter className="h-4 w-4" />
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 p-2 rounded-md">
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Bell className="h-4 w-4 text-blue-500" />
              Total de Notificações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Bell className="h-4 w-4 text-red-500" />
              Não Lidas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Bell className="h-4 w-4 text-green-500" />
              Lidas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle>Central de Notificações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notificacoes.map((notificacao) => (
              <div 
                key={notificacao.id} 
                className={`p-4 border rounded-lg flex ${
                  notificacao.lida ? 'border-gray-700 bg-gray-850' : 'border-blue-600/50 bg-blue-950/20'
                }`}
              >
                <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-4 ${
                  notificacao.tipo === 'vendas' ? 'bg-green-900/30 text-green-500' : 
                  notificacao.tipo === 'sistema' ? 'bg-blue-900/30 text-blue-500' : 
                  notificacao.tipo === 'clientes' ? 'bg-purple-900/30 text-purple-500' : 
                  notificacao.tipo === 'estoque' ? 'bg-yellow-900/30 text-yellow-500' : 
                  'bg-gray-900/30 text-gray-500'
                }`}>
                  <Bell className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className={`font-medium ${!notificacao.lida ? 'text-white' : ''}`}>{notificacao.titulo}</h3>
                    <span className="text-xs text-gray-400">{notificacao.data}</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{notificacao.mensagem}</p>
                </div>
                <div className="flex space-x-2 ml-4">
                  {!notificacao.lida && (
                    <button className="p-1 hover:bg-gray-700 rounded-full" title="Marcar como lida">
                      <Check className="h-4 w-4 text-blue-500" />
                    </button>
                  )}
                  <button className="p-1 hover:bg-gray-700 rounded-full" title="Excluir">
                    <Trash className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle>Preferências de Notificações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border border-gray-700 rounded-lg">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-800/30 text-green-500 rounded-full flex items-center justify-center mr-3">
                  <Bell className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium">Notificações de Vendas</h3>
                  <p className="text-xs text-gray-400">Receba alertas sobre novas vendas e metas</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="h-4 w-4 rounded bg-gray-700 border-gray-600" checked />
                  <span className="text-sm">Email</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="h-4 w-4 rounded bg-gray-700 border-gray-600" checked />
                  <span className="text-sm">Sistema</span>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 border border-gray-700 rounded-lg">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-800/30 text-blue-500 rounded-full flex items-center justify-center mr-3">
                  <Bell className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium">Notificações de Sistema</h3>
                  <p className="text-xs text-gray-400">Receba alertas sobre atualizações e manutenções</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="h-4 w-4 rounded bg-gray-700 border-gray-600" checked />
                  <span className="text-sm">Email</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="h-4 w-4 rounded bg-gray-700 border-gray-600" checked />
                  <span className="text-sm">Sistema</span>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 border border-gray-700 rounded-lg">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-purple-800/30 text-purple-500 rounded-full flex items-center justify-center mr-3">
                  <Bell className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium">Notificações de Clientes</h3>
                  <p className="text-xs text-gray-400">Receba alertas sobre novos clientes e atividades</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="h-4 w-4 rounded bg-gray-700 border-gray-600" />
                  <span className="text-sm">Email</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="h-4 w-4 rounded bg-gray-700 border-gray-600" checked />
                  <span className="text-sm">Sistema</span>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 border border-gray-700 rounded-lg">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-yellow-800/30 text-yellow-500 rounded-full flex items-center justify-center mr-3">
                  <Bell className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium">Notificações de Estoque</h3>
                  <p className="text-xs text-gray-400">Receba alertas sobre níveis de estoque</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="h-4 w-4 rounded bg-gray-700 border-gray-600" checked />
                  <span className="text-sm">Email</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="h-4 w-4 rounded bg-gray-700 border-gray-600" checked />
                  <span className="text-sm">Sistema</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                Salvar Preferências
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificacoesPage;
