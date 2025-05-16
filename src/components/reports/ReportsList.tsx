
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, BarChart2, Download } from "lucide-react";

const ReportsList: React.FC = () => {
  return (
    <>
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
    </>
  );
};

export default ReportsList;
