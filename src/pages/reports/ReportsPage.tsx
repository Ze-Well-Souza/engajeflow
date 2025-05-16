import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2, PieChart, LineChart, Calendar, Download, Filter, Users } from "lucide-react";

const ReportsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Relatórios e Métricas</h1>
        <div className="flex items-center space-x-2">
          <select className="bg-gray-800 border border-gray-700 rounded-md px-3 py-1.5 text-sm">
            <option>Últimos 7 dias</option>
            <option>Últimos 30 dias</option>
            <option>Últimos 90 dias</option>
          </select>
          <button className="bg-blue-600 hover:bg-blue-700 text-white p-1.5 rounded-md">
            <Filter className="h-4 w-4" />
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white p-1.5 rounded-md">
            <Download className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Mensagens</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24,583</div>
            <p className="text-xs text-green-500">+12.5% que no período anterior</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Abertura</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68.3%</div>
            <p className="text-xs text-green-500">+3.7% que no período anterior</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Resposta</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42.1%</div>
            <p className="text-xs text-green-500">+5.2% que no período anterior</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Conversões</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">341</div>
            <p className="text-xs text-green-500">+8.3% que no período anterior</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Mensagens por Canal</CardTitle>
            <LineChart className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center">
              <div className="space-y-4 w-full">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>WhatsApp</span>
                    <span>12,451</span>
                  </div>
                  <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-green-600 rounded-full" style={{ width: "65%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Email</span>
                    <span>8,327</span>
                  </div>
                  <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: "45%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>SMS</span>
                    <span>3,805</span>
                  </div>
                  <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-600 rounded-full" style={{ width: "25%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Telegram</span>
                    <span>0</span>
                  </div>
                  <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-600 rounded-full" style={{ width: "0%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Desempenho do Bot</CardTitle>
            <PieChart className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center">
              <div className="space-y-4 w-full">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Perguntas respondidas automaticamente</span>
                    <span>78%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-green-600 rounded-full" style={{ width: "78%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Taxa de qualificação de leads</span>
                    <span>45%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: "45%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Conversões de bot para venda</span>
                    <span>23%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-600 rounded-full" style={{ width: "23%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Transferência para humano</span>
                    <span>12%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-600 rounded-full" style={{ width: "12%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Atividade por Dia</CardTitle>
          <BarChart2 className="h-4 w-4 text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center">
            <div className="flex items-end justify-between w-full h-full px-2">
              {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day, i) => {
                const heights = [30, 65, 45, 80, 55, 40, 25];
                return (
                  <div key={day} className="flex flex-col items-center space-y-2">
                    <div 
                      className="w-12 bg-blue-600 rounded-t-md" 
                      style={{ height: `${heights[i]}%` }}
                    ></div>
                    <span className="text-xs text-gray-400">{day}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Relatórios Disponíveis</h2>
        <button className="text-sm text-blue-400 hover:text-blue-500">Ver todos</button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gray-800 border-gray-700 hover:border-blue-500/50 cursor-pointer transition-all">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-500" />
              Relatório de Desempenho Mensal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-400">
              Análise completa do desempenho mensal das mensagens e automações.
            </p>
            <div className="mt-4 flex justify-end">
              <button className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded flex items-center gap-1">
                <Download className="h-3 w-3" /> Baixar
              </button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700 hover:border-blue-500/50 cursor-pointer transition-all">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="h-4 w-4 text-green-500" />
              Segmentação de Clientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-400">
              Análise detalhada dos segmentos de clientes e suas interações.
            </p>
            <div className="mt-4 flex justify-end">
              <button className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded flex items-center gap-1">
                <Download className="h-3 w-3" /> Baixar
              </button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700 hover:border-blue-500/50 cursor-pointer transition-all">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <BarChart2 className="h-4 w-4 text-purple-500" />
              Análise de Conversão
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-400">
              Detalhamento das taxas de conversão por canal e campanha.
            </p>
            <div className="mt-4 flex justify-end">
              <button className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded flex items-center gap-1">
                <Download className="h-3 w-3" /> Baixar
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportsPage;
