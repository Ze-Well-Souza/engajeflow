
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Plus, Clock, Check, X, Trash, Edit } from "lucide-react";

const agendamentos = [
  { 
    id: 1, 
    titulo: 'Disparar campanha de marketing', 
    data: '16/05/2025', 
    hora: '14:00', 
    tipo: 'Único', 
    status: 'Pendente' 
  },
  { 
    id: 2, 
    titulo: 'Envio de relatório semanal', 
    data: '19/05/2025', 
    hora: '08:00', 
    tipo: 'Recorrente', 
    status: 'Pendente' 
  },
  { 
    id: 3, 
    titulo: 'Backup automático do banco de dados', 
    data: '16/05/2025', 
    hora: '03:00', 
    tipo: 'Recorrente', 
    status: 'Concluído' 
  },
  { 
    id: 4, 
    titulo: 'Envio de e-mail para clientes inativos', 
    data: '20/05/2025', 
    hora: '10:00', 
    tipo: 'Único', 
    status: 'Pendente' 
  },
  { 
    id: 5, 
    titulo: 'Atualização do catálogo de produtos', 
    data: '22/05/2025', 
    hora: '09:00', 
    tipo: 'Único', 
    status: 'Pendente' 
  },
];

const AgendamentosPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Agendamentos</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Novo Agendamento
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-500" />
              Total de Agendamentos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4 text-yellow-500" />
              Pendentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              Concluídos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4 text-purple-500" />
              Recorrentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-800 border-gray-700 md:col-span-2">
          <CardHeader>
            <CardTitle>Agendamentos Programados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {agendamentos.map((agendamento) => (
                <div 
                  key={agendamento.id} 
                  className={`p-4 border rounded-lg flex justify-between ${
                    agendamento.status === 'Concluído' ? 'border-green-700 bg-green-950/10' : 'border-gray-700 bg-gray-850'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-4 ${
                      agendamento.tipo === 'Recorrente' ? 'bg-purple-900/30 text-purple-500' : 'bg-blue-900/30 text-blue-500'
                    }`}>
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">{agendamento.titulo}</h3>
                      <div className="flex items-center gap-3 text-sm text-gray-400 mt-1">
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" /> {agendamento.data}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" /> {agendamento.hora}
                        </span>
                        <span className={`px-1.5 py-0.5 text-xs rounded-full ${
                          agendamento.tipo === 'Recorrente' ? 'bg-purple-900/30 text-purple-400 border border-purple-700/50' : 'bg-blue-900/30 text-blue-400 border border-blue-700/50'
                        }`}>
                          {agendamento.tipo}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {agendamento.status === 'Pendente' ? (
                      <>
                        <button className="p-1 hover:bg-gray-700 rounded" title="Marcar como concluído">
                          <Check className="h-4 w-4 text-green-500" />
                        </button>
                        <button className="p-1 hover:bg-gray-700 rounded" title="Cancelar">
                          <X className="h-4 w-4 text-red-500" />
                        </button>
                      </>
                    ) : (
                      <span className="px-2 py-0.5 text-xs rounded-full bg-green-900/30 text-green-500 border border-green-700/50">Concluído</span>
                    )}
                    <button className="p-1 hover:bg-gray-700 rounded" title="Editar">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-1 hover:bg-gray-700 rounded" title="Excluir">
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
            <CardTitle>Novo Agendamento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Título</label>
                <input 
                  type="text" 
                  className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2"
                  placeholder="Digite o título do agendamento"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Data</label>
                <input 
                  type="date" 
                  className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Hora</label>
                <input 
                  type="time" 
                  className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tipo</label>
                <select className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2">
                  <option>Único</option>
                  <option>Recorrente</option>
                </select>
              </div>
              <div className="hidden" id="recorrencia">
                <label className="block text-sm font-medium mb-1">Recorrência</label>
                <select className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2">
                  <option>Diário</option>
                  <option>Semanal</option>
                  <option>Mensal</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Descrição</label>
                <textarea 
                  className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2" 
                  rows={3}
                  placeholder="Descrição do agendamento (opcional)"
                ></textarea>
              </div>
              <div className="flex justify-end pt-2">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                  Salvar Agendamento
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle>Calendário</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <div className="w-full max-w-md">
            <div className="bg-gray-750 rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <button className="text-gray-400 hover:text-white">&lt;</button>
                <h2 className="text-lg font-semibold">Maio 2025</h2>
                <button className="text-gray-400 hover:text-white">&gt;</button>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-sm text-gray-400 mb-2">
                <div>Dom</div>
                <div>Seg</div>
                <div>Ter</div>
                <div>Qua</div>
                <div>Qui</div>
                <div>Sex</div>
                <div>Sáb</div>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center">
                {[...Array(31)].map((_, i) => {
                  const day = i + 1;
                  const hasEvent = [16, 19, 20, 22].includes(day);
                  return (
                    <div 
                      key={i} 
                      className={`h-10 flex items-center justify-center rounded-md ${
                        day === 16 ? 'bg-blue-600 text-white' : 
                        hasEvent ? 'bg-gray-700 text-white' : 
                        'text-gray-400'
                      }`}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgendamentosPage;
