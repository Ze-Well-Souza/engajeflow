
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import CustomReportForm from "@/components/reports/CustomReportForm";

// Mocked data for saved reports
const savedReports = [
  {
    id: "1",
    name: "Desempenho de Conversão - Q2",
    type: "Conversão",
    date: "14/05/2023",
    metrics: ["Alcance", "Cliques", "Conversões"],
  },
  {
    id: "2",
    name: "Análise de Engajamento Instagram",
    type: "Redes Sociais",
    date: "02/05/2023",
    metrics: ["Engajamento", "Comentários", "Curtidas"],
  },
  {
    id: "3",
    name: "Relatório de Vendas por Canal",
    type: "Vendas",
    date: "29/04/2023",
    metrics: ["Vendas", "Receita", "ROI"],
  },
  {
    id: "4",
    name: "Funil de Vendas Mensal",
    type: "Funil",
    date: "01/05/2023",
    metrics: ["Leads", "Qualificados", "Conversões"],
  },
];

// Mocked data for scheduled reports
const scheduledReports = [
  {
    id: "101",
    name: "Relatório Semanal de Desempenho",
    schedule: "Segunda-feira, 8:00",
    recipients: ["marketing@example.com", "gerencia@example.com"],
    lastSent: "13/05/2023",
  },
  {
    id: "102",
    name: "Relatório Mensal de Conversões",
    schedule: "1º dia do mês, 8:00",
    recipients: ["diretoria@example.com"],
    lastSent: "01/05/2023",
  },
];

const CustomReportsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Relatórios Personalizados</h1>
      </div>

      <Tabs defaultValue="create" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="create">Criar Relatório</TabsTrigger>
          <TabsTrigger value="saved">Relatórios Salvos</TabsTrigger>
          <TabsTrigger value="scheduled">Agendados</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-4">
          <CustomReportForm />
        </TabsContent>

        <TabsContent value="saved" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedReports.map((report) => (
              <Card key={report.id} className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-500" />
                    {report.name}
                  </CardTitle>
                  <div className="text-sm text-gray-400">{report.type} • {report.date}</div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {report.metrics.map((metric) => (
                      <span 
                        key={metric}
                        className="bg-gray-700 text-xs px-2 py-1 rounded-full"
                      >
                        {metric}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                    <Button size="sm">
                      <Download className="h-4 w-4 mr-1" /> Baixar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scheduledReports.map((report) => (
              <Card key={report.id} className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="h-5 w-5 text-purple-500" />
                    {report.name}
                  </CardTitle>
                  <div className="text-sm text-gray-400">Agendado para {report.schedule}</div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="text-sm mb-1">Destinatários:</div>
                    <div className="flex flex-wrap gap-1">
                      {report.recipients.map((recipient) => (
                        <span 
                          key={recipient}
                          className="bg-gray-700 text-xs px-2 py-1 rounded-full"
                        >
                          {recipient}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-sm">Último envio: {report.lastSent}</div>
                  
                  <div className="flex justify-end space-x-2 mt-4">
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                    <Button variant="destructive" size="sm">
                      Cancelar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomReportsPage;
