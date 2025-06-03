
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Filter, Download } from "lucide-react";

// Dados de exemplo para o gráfico de conversão
const conversionData = [
  { name: "Jan", visitas: 4000, leads: 2400, vendas: 400 },
  { name: "Fev", visitas: 3000, leads: 1398, vendas: 210 },
  { name: "Mar", visitas: 2000, leads: 950, vendas: 190 },
  { name: "Abr", visitas: 2780, leads: 1908, vendas: 300 },
  { name: "Mai", visitas: 1890, leads: 1200, vendas: 281 },
  { name: "Jun", visitas: 2390, leads: 1800, vendas: 310 },
];

const conversionBySource = [
  { name: "Instagram", conversao: 3.2 },
  { name: "Facebook", conversao: 2.8 },
  { name: "YouTube", conversao: 4.5 },
  { name: "Email", conversao: 5.7 },
  { name: "Blog", conversao: 1.9 },
  { name: "Direto", conversao: 3.1 },
];

const ConversionsReportPage: React.FC = () => {
  const [period, setPeriod] = React.useState("last30days");
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Relatório de Conversões</h1>
        <div className="flex items-center space-x-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione o período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last7days">Últimos 7 dias</SelectItem>
              <SelectItem value="last30days">Últimos 30 dias</SelectItem>
              <SelectItem value="last90days">Últimos 90 dias</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.4%</div>
            <p className="text-xs text-green-500">+0.7% que no período anterior</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Visitantes Únicos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14,382</div>
            <p className="text-xs text-green-500">+12% que no período anterior</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Leads Gerados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">928</div>
            <p className="text-xs text-green-500">+8% que no período anterior</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Vendas Realizadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124</div>
            <p className="text-xs text-green-500">+15% que no período anterior</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="sources">Fontes</TabsTrigger>
          <TabsTrigger value="campaigns">Campanhas</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>Funil de Conversão</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={conversionData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="visitas" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="leads" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="vendas" stroke="#ffc658" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sources">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Taxa de Conversão por Fonte</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={conversionBySource}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="conversao" stroke="#82ca9d" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Desempenho por Fonte</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-5">
                  {["Instagram", "Facebook", "YouTube", "Email", "Blog"].map((source) => (
                    <div key={source} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{source}</span>
                        <span className="text-sm">
                          {
                            source === "Instagram" ? "28%" :
                            source === "Facebook" ? "23%" :
                            source === "YouTube" ? "18%" :
                            source === "Email" ? "19%" :
                            "12%"
                          }
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            source === "Instagram" ? "bg-pink-500" :
                            source === "Facebook" ? "bg-blue-500" :
                            source === "YouTube" ? "bg-red-500" :
                            source === "Email" ? "bg-purple-500" :
                            "bg-green-500"
                          }`} 
                          style={{ 
                            width: 
                              source === "Instagram" ? "28%" :
                              source === "Facebook" ? "23%" :
                              source === "YouTube" ? "18%" :
                              source === "Email" ? "19%" :
                              "12%"
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="campaigns">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>Desempenho por Campanha</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4">Campanha</th>
                      <th className="text-center py-3 px-4">Visitantes</th>
                      <th className="text-center py-3 px-4">Leads</th>
                      <th className="text-center py-3 px-4">Conversões</th>
                      <th className="text-center py-3 px-4">Taxa</th>
                      <th className="text-center py-3 px-4">Custo/Conv.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "Promoção Verão", visits: 5863, leads: 421, conversions: 87, rate: "1.48%", cost: "R$ 12,45" },
                      { name: "Lançamento Produto", visits: 9241, leads: 736, conversions: 124, rate: "1.34%", cost: "R$ 15,20" },
                      { name: "Remarketing Carrinho", visits: 3152, leads: 284, conversions: 78, rate: "2.47%", cost: "R$ 8,35" },
                      { name: "Conteúdo Blog", visits: 2845, leads: 186, conversions: 32, rate: "1.12%", cost: "R$ 14,68" },
                      { name: "Webinar Gratuito", visits: 1983, leads: 312, conversions: 54, rate: "2.72%", cost: "R$ 9,14" },
                    ].map((campaign) => (
                      <tr key={campaign.name} className="border-b border-gray-700">
                        <td className="py-3 px-4">{campaign.name}</td>
                        <td className="text-center py-3 px-4">{campaign.visits.toLocaleString()}</td>
                        <td className="text-center py-3 px-4">{campaign.leads}</td>
                        <td className="text-center py-3 px-4">{campaign.conversions}</td>
                        <td className="text-center py-3 px-4">{campaign.rate}</td>
                        <td className="text-center py-3 px-4">{campaign.cost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConversionsReportPage;
