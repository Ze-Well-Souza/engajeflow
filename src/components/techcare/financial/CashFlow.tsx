
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';

// Dados simulados
const monthlyData = [
  { month: 'Jan', income: 7500, expense: 5200, profit: 2300 },
  { month: 'Fev', income: 8900, expense: 6100, profit: 2800 },
  { month: 'Mar', income: 7800, expense: 5900, profit: 1900 },
  { month: 'Abr', income: 9500, expense: 6300, profit: 3200 },
  { month: 'Mai', income: 11200, expense: 7800, profit: 3400 },
  { month: 'Jun', income: 10500, expense: 7200, profit: 3300 },
];

const dailyData = [
  { day: '01/05', income: 350, expense: 120 },
  { day: '02/05', income: 420, expense: 80 },
  { day: '03/05', income: 0, expense: 1500 },
  { day: '04/05', income: 890, expense: 250 },
  { day: '05/05', income: 1200, expense: 350 },
  { day: '06/05', income: 750, expense: 120 },
  { day: '07/05', income: 600, expense: 1800 },
  { day: '08/05', income: 450, expense: 220 },
  { day: '09/05', income: 880, expense: 310 },
  { day: '10/05', income: 950, expense: 180 },
];

const forecastData = [
  { month: 'Mai', real: 11200, forecast: 11200 },
  { month: 'Jun', real: 10500, forecast: 10500 },
  { month: 'Jul', real: 0, forecast: 11800 },
  { month: 'Ago', real: 0, forecast: 12500 },
  { month: 'Set', real: 0, forecast: 13200 },
  { month: 'Out', real: 0, forecast: 14800 },
];

const CashFlow: React.FC = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Fluxo de Caixa</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="monthly" className="space-y-4">
            <TabsList>
              <TabsTrigger value="monthly">Mensal</TabsTrigger>
              <TabsTrigger value="daily">Diário</TabsTrigger>
              <TabsTrigger value="forecast">Previsão</TabsTrigger>
            </TabsList>
            
            <TabsContent value="monthly" className="space-y-4">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlyData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value: any) => [`R$ ${value}`, undefined]}
                      labelFormatter={(label: string) => `Mês: ${label}`}
                    />
                    <Legend />
                    <Bar dataKey="income" name="Receitas" fill="#4ade80" />
                    <Bar dataKey="expense" name="Despesas" fill="#f87171" />
                    <Bar dataKey="profit" name="Lucro" fill="#60a5fa" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground">Receitas (últimos 6 meses)</p>
                    <h3 className="text-xl font-bold text-green-600">R$ 55.400,00</h3>
                    <p className="text-xs text-muted-foreground mt-1">↑ 12% em relação ao semestre anterior</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground">Despesas (últimos 6 meses)</p>
                    <h3 className="text-xl font-bold text-red-600">R$ 38.500,00</h3>
                    <p className="text-xs text-muted-foreground mt-1">↑ 8% em relação ao semestre anterior</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground">Lucro (últimos 6 meses)</p>
                    <h3 className="text-xl font-bold text-blue-600">R$ 16.900,00</h3>
                    <p className="text-xs text-muted-foreground mt-1">↑ 15% em relação ao semestre anterior</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="daily" className="space-y-4">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={dailyData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value: any) => [`R$ ${value}`, undefined]}
                      labelFormatter={(label: string) => `Dia: ${label}`}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="income" name="Receitas" stroke="#4ade80" strokeWidth={2} />
                    <Line type="monotone" dataKey="expense" name="Despesas" stroke="#f87171" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="forecast" className="space-y-4">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={forecastData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value: any) => [`R$ ${value}`, undefined]}
                      labelFormatter={(label: string) => `Mês: ${label}`}
                    />
                    <Legend />
                    <Area type="monotone" dataKey="real" name="Receita Real" fill="#4ade80" stroke="#16a34a" />
                    <Area type="monotone" dataKey="forecast" name="Previsão" fill="#93c5fd" stroke="#2563eb" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-2">Análise da previsão</h3>
                  <p className="text-sm text-muted-foreground">
                    Com base no seu histórico de faturamento e nas tendências de mercado, 
                    projetamos um crescimento médio de 5% ao mês para os próximos 4 meses. 
                    Esta análise considera a sazonalidade do seu negócio e o comportamento 
                    histórico dos últimos 12 meses.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Receita prevista para os próximos 4 meses: <span className="font-medium">R$ 52.300,00</span>
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </>
  );
};

export default CashFlow;
