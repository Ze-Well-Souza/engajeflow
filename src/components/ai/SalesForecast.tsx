
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLocalization } from "@/contexts/LocalizationContext";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, Legend } from "recharts";
import { Calendar, TrendingUp, ArrowDown, ArrowUp, Filter, Download, AlertTriangle } from "lucide-react";

const SalesForecast: React.FC = () => {
  const { formatCurrency } = useLocalization();
  const [timeRange, setTimeRange] = useState("month");
  
  const forecastData = [
    { name: "Jan", actual: 42000, forecast: null },
    { name: "Fev", actual: 38000, forecast: null },
    { name: "Mar", actual: 35000, forecast: null },
    { name: "Abr", actual: 40000, forecast: null },
    { name: "Mai", actual: 45000, forecast: null },
    { name: "Jun", actual: null, forecast: 48000 },
    { name: "Jul", actual: null, forecast: 52000 },
    { name: "Ago", actual: null, forecast: 55000 },
    { name: "Set", actual: null, forecast: 58000 },
    { name: "Out", actual: null, forecast: 62000 },
    { name: "Nov", actual: null, forecast: 65000 },
    { name: "Dez", actual: null, forecast: 70000 },
  ];
  
  const dailyData = [
    { name: "01/07", revenue: 1560, orders: 12 },
    { name: "02/07", revenue: 1820, orders: 15 },
    { name: "03/07", revenue: 1650, orders: 13 },
    { name: "04/07", revenue: 1930, orders: 17 },
    { name: "05/07", revenue: 2100, orders: 19 },
    { name: "06/07", revenue: 1750, orders: 14 },
    { name: "07/07", revenue: 1840, orders: 16 },
  ];
  
  const confidenceData = [
    { name: "Jun", forecast: 48000, minRange: 45000, maxRange: 51000 },
    { name: "Jul", forecast: 52000, minRange: 48000, maxRange: 56000 },
    { name: "Ago", forecast: 55000, minRange: 50000, maxRange: 60000 },
    { name: "Set", forecast: 58000, minRange: 52000, maxRange: 64000 },
    { name: "Out", forecast: 62000, minRange: 56000, maxRange: 68000 },
    { name: "Nov", forecast: 65000, minRange: 58000, maxRange: 72000 },
    { name: "Dez", forecast: 70000, minRange: 62000, maxRange: 78000 },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-primary" /> 
              Previsão de Vendas com ML
            </CardTitle>
            <CardDescription>
              Previsões geradas por modelos de machine learning
            </CardDescription>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Semanal</SelectItem>
              <SelectItem value="month">Mensal</SelectItem>
              <SelectItem value="quarter">Trimestral</SelectItem>
              <SelectItem value="year">Anual</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="p-3 bg-muted/30 rounded-lg">
            <div className="text-sm font-medium text-muted-foreground mb-1">Este mês</div>
            <div className="text-2xl font-bold">R$ 48.000</div>
            <div className="flex items-center mt-1 text-xs text-green-600">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>6.7% vs mês anterior</span>
            </div>
          </div>
          <div className="p-3 bg-muted/30 rounded-lg">
            <div className="text-sm font-medium text-muted-foreground mb-1">Próximo mês</div>
            <div className="text-2xl font-bold">R$ 52.000</div>
            <div className="flex items-center mt-1 text-xs text-green-600">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>8.3% vs mês atual</span>
            </div>
          </div>
          <div className="p-3 bg-muted/30 rounded-lg">
            <div className="text-sm font-medium text-muted-foreground mb-1">Próximo trimestre</div>
            <div className="text-2xl font-bold">R$ 165.000</div>
            <div className="flex items-center mt-1 text-xs text-green-600">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>15.4% vs trimestre atual</span>
            </div>
          </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium">Previsão de faturamento anual</div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-7 text-xs gap-1">
                <Filter className="h-3 w-3" /> Filtros
              </Button>
              <Button variant="outline" size="sm" className="h-7 text-xs gap-1">
                <Download className="h-3 w-3" /> Exportar
              </Button>
            </div>
          </div>
          <div className="h-80 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={forecastData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis 
                  tickFormatter={(value) => `R$${value/1000}k`}
                />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip 
                  formatter={(value) => `R$ ${value}`}
                />
                <Area 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#0ea5e9" 
                  fillOpacity={1} 
                  fill="url(#colorActual)" 
                  name="Faturamento real"
                />
                <Area 
                  type="monotone" 
                  dataKey="forecast" 
                  stroke="#8884d8" 
                  fillOpacity={1} 
                  fill="url(#colorForecast)" 
                  strokeDasharray="5 5"
                  name="Previsão"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center mt-2">
            <div className="flex items-center text-xs text-muted-foreground mr-4">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
              <span>Faturamento real</span>
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <div className="w-3 h-3 bg-purple-500 rounded-full mr-1"></div>
              <span>Previsão ML (confiança 95%)</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm font-medium mb-2">Intervalo de confiança da previsão</div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={confidenceData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRange" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" />
                  <YAxis 
                    tickFormatter={(value) => `R$${value/1000}k`}
                  />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip 
                    formatter={(value) => `R$ ${value}`}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="maxRange" 
                    stackId="1"
                    stroke="transparent" 
                    fill="url(#colorRange)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="minRange" 
                    stackId="1"
                    stroke="transparent" 
                    fill="transparent" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="forecast" 
                    stroke="#8884d8" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div>
            <div className="text-sm font-medium mb-2">Tendência diária</div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" stroke="#0ea5e9" tickFormatter={(value) => `R$${value}`} />
                  <YAxis yAxisId="right" orientation="right" stroke="#10b981" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="revenue" fill="#0ea5e9" name="Faturamento (R$)" />
                  <Bar yAxisId="right" dataKey="orders" fill="#10b981" name="Pedidos" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <div className="flex items-start gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <p className="font-medium text-foreground">Nota sobre a previsão</p>
            <p>Estas previsões são geradas por algoritmos de aprendizado de máquina treinados com seu histórico de vendas e são atualizadas diariamente.</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SalesForecast;
