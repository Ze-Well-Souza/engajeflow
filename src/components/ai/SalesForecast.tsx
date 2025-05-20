
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  TrendingUp,
  Calendar,
  BarChart2,
  RefreshCw,
  Download,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import { useToast } from "@/hooks/use-toast";

const timeRangeOptions = [
  { value: "7d", label: "7 dias" },
  { value: "30d", label: "30 dias" },
  { value: "90d", label: "3 meses" },
  { value: "180d", label: "6 meses" },
  { value: "365d", label: "1 ano" },
];

const insightTypes = [
  { value: "revenue", label: "Receita" },
  { value: "orders", label: "Pedidos" },
  { value: "customers", label: "Clientes" },
];

interface DataPoint {
  date: string;
  actual: number;
  predicted: number;
  lowerBound?: number;
  upperBound?: number;
}

const SalesForecast: React.FC = () => {
  const [timeRange, setTimeRange] = useState("30d");
  const [insightType, setInsightType] = useState("revenue");
  const [isLoading, setIsLoading] = useState(false);
  const [forecastData, setForecastData] = useState<DataPoint[]>([]);
  const [showConfidenceInterval, setShowConfidenceInterval] = useState(true);
  
  const { toast } = useToast();
  
  // Gerar dados históricos e previsões simulando dados reais
  useEffect(() => {
    generateForecastData(timeRange, insightType);
  }, [timeRange, insightType]);
  
  const generateForecastData = (range: string, type: string) => {
    setIsLoading(true);
    
    // Simular uma chamada API
    setTimeout(() => {
      const daysCount = range === "7d" ? 7 : range === "30d" ? 30 : range === "90d" ? 90 : range === "180d" ? 180 : 365;
      const todayDate = new Date();
      const pastDays = daysCount / 2; // Metade dos dias são históricos
      const futureDays = daysCount / 2; // Metade dos dias são previsões
      
      // Configurar valores base e variação com base no tipo de insight
      let baseValue = 0;
      let variation = 0;
      
      if (type === "revenue") {
        baseValue = 5000;
        variation = 1500;
      } else if (type === "orders") {
        baseValue = 120;
        variation = 50;
      } else if (type === "customers") {
        baseValue = 80;
        variation = 30;
      }
      
      const data: DataPoint[] = [];
      
      // Gerar dados históricos
      for (let i = pastDays; i > 0; i--) {
        const date = new Date(todayDate);
        date.setDate(date.getDate() - i);
        
        const dateStr = date.toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' });
        const dayValue = baseValue + Math.random() * variation - variation / 2;
        
        data.push({
          date: dateStr,
          actual: Math.round(dayValue * 100) / 100,
          predicted: 0, // Sem previsão para dados históricos
        });
      }
      
      // Gerar dados atuais (hoje)
      const todayValue = baseValue + Math.random() * variation;
      data.push({
        date: todayDate.toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' }),
        actual: Math.round(todayValue * 100) / 100,
        predicted: Math.round(todayValue * 100) / 100,
      });
      
      // Gerar dados de previsão futura
      let lastValue = todayValue;
      const trend = Math.random() * 0.2 - 0.05; // Tendência leve de -5% a +15%
      
      for (let i = 1; i <= futureDays; i++) {
        const date = new Date(todayDate);
        date.setDate(date.getDate() + i);
        
        const dateStr = date.toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' });
        lastValue = lastValue * (1 + trend) + (Math.random() * variation * 0.4 - variation * 0.2);
        const intervalSize = lastValue * 0.1 * (i / futureDays); // Intervalo de confiança aumenta com o tempo
        
        data.push({
          date: dateStr,
          actual: 0, // Sem valor real para dados futuros
          predicted: Math.round(lastValue * 100) / 100,
          lowerBound: Math.round((lastValue - intervalSize) * 100) / 100,
          upperBound: Math.round((lastValue + intervalSize) * 100) / 100,
        });
      }
      
      setForecastData(data);
      setIsLoading(false);
    }, 1200);
  };
  
  // Manipular refresh dos dados
  const handleRefresh = () => {
    toast({
      title: "Atualizando previsões",
      description: "Carregando dados mais recentes e recalculando projeções.",
    });
    generateForecastData(timeRange, insightType);
  };
  
  // Formatar números para exibição
  const formatValue = (value: number) => {
    if (insightType === "revenue") {
      return `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return value.toLocaleString('pt-BR', { maximumFractionDigits: 0 });
  };
  
  // Calcular estatísticas de tendência
  const calculateTrendStats = () => {
    if (forecastData.length === 0) return { trend: 0, percentage: 0 };
    
    const historicalData = forecastData.filter(d => d.actual > 0);
    const forecastedData = forecastData.filter(d => d.predicted > 0 && d.actual === 0);
    
    if (historicalData.length === 0 || forecastedData.length === 0) return { trend: 0, percentage: 0 };
    
    const historicalAvg = historicalData.reduce((sum, d) => sum + d.actual, 0) / historicalData.length;
    const forecastAvg = forecastedData.reduce((sum, d) => sum + d.predicted, 0) / forecastedData.length;
    
    const trend = forecastAvg - historicalAvg;
    const percentage = (forecastAvg - historicalAvg) / historicalAvg * 100;
    
    return { trend, percentage };
  };
  
  const trendStats = calculateTrendStats();
  
  // Tooltip personalizado para o gráfico
  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as DataPoint;
      return (
        <div className="bg-popover border border-border p-2 rounded-md shadow-md text-sm">
          <p className="font-medium">{label}</p>
          {data.actual > 0 && (
            <p>
              <span className="text-blue-500 font-medium">Real: </span>
              {formatValue(data.actual)}
            </p>
          )}
          {data.predicted > 0 && (
            <p>
              <span className="text-green-500 font-medium">Previsto: </span>
              {formatValue(data.predicted)}
            </p>
          )}
          {data.lowerBound !== undefined && data.upperBound !== undefined && showConfidenceInterval && (
            <p className="text-xs text-muted-foreground">
              Intervalo: {formatValue(data.lowerBound)} - {formatValue(data.upperBound)}
            </p>
          )}
        </div>
      );
    }
    return null;
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Previsão de Vendas e Tendências
            </CardTitle>
            <CardDescription>
              Projeções baseadas em IA para futuras vendas e desempenho
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={handleRefresh} className="gap-1">
            <RefreshCw className="h-3.5 w-3.5" />
            Atualizar
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 min-w-[180px]">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                {timeRangeOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2 min-w-[180px]">
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
            <Select value={insightType} onValueChange={setInsightType}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Métrica" />
              </SelectTrigger>
              <SelectContent>
                {insightTypes.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="ml-auto gap-1"
            onClick={() => setShowConfidenceInterval(!showConfidenceInterval)}
          >
            <Info className="h-3.5 w-3.5" />
            {showConfidenceInterval ? "Ocultar Intervalo" : "Mostrar Intervalo"}
          </Button>
        </div>
        
        {isLoading ? (
          <div className="h-72 flex items-center justify-center">
            <div className="text-center">
              <RefreshCw className="h-8 w-8 text-muted-foreground animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Calculando previsões baseadas em IA...</p>
            </div>
          </div>
        ) : (
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={forecastData}
                margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="date" 
                  className="text-xs text-muted-foreground" 
                  tick={{ fontSize: 10 }}
                  tickMargin={10}
                />
                <YAxis 
                  className="text-xs text-muted-foreground" 
                  tick={{ fontSize: 10 }}
                  tickFormatter={(value) => {
                    if (insightType === "revenue") {
                      if (value >= 1000) return `${value / 1000}k`;
                      return value.toString();
                    }
                    return value.toString();
                  }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="top" height={36} />
                
                {showConfidenceInterval && (
                  <defs>
                    <linearGradient id="confidenceGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="rgb(134, 239, 172)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="rgb(134, 239, 172)" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                )}
                
                {/* Intervalo de confiança (área sombreada) */}
                {showConfidenceInterval && (
                  <LineChart data={forecastData}>
                    <Area
                      type="monotone"
                      dataKey="upperBound"
                      stroke="none"
                      fill="url(#confidenceGradient)"
                      fillOpacity={0.2}
                    />
                    <Area
                      type="monotone"
                      dataKey="lowerBound"
                      stroke="none"
                      fill="transparent"
                    />
                  </LineChart>
                )}
                
                {/* Linha de dados históricos reais */}
                <Line
                  type="monotone"
                  dataKey="actual"
                  name="Dados reais"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 6 }}
                  connectNulls
                />
                
                {/* Linha de previsão */}
                <Line
                  type="monotone"
                  dataKey="predicted"
                  name="Previsão"
                  stroke="#10b981"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 3, strokeWidth: 1, fill: "#10b981" }}
                  connectNulls
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <Card className="bg-muted/50 border">
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground mb-1">Tendência</div>
              <div className={`text-xl font-semibold ${trendStats.percentage > 0 ? 'text-green-500' : trendStats.percentage < 0 ? 'text-red-500' : ''}`}>
                {trendStats.percentage > 0 ? '↗' : trendStats.percentage < 0 ? '↘' : '→'} {Math.abs(Math.round(trendStats.percentage))}%
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                vs. período anterior
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-muted/50 border">
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground mb-1">Previsão média</div>
              <div className="text-xl font-semibold">
                {formatValue(Math.round(forecastData.filter(d => d.predicted > 0 && d.actual === 0).reduce((sum, d) => sum + d.predicted, 0) / Math.max(1, forecastData.filter(d => d.predicted > 0 && d.actual === 0).length)))}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                por dia nos próximos {Math.floor(forecastData.filter(d => d.predicted > 0 && d.actual === 0).length)} dias
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-muted/50 border">
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground mb-1">Confiança da previsão</div>
              <div className="text-xl font-semibold">
                80%
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                baseado em análise de séries temporais
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
      
      <CardFooter className="border-t pt-4">
        <div className="flex justify-between w-full items-center">
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <Info className="h-3.5 w-3.5" />
            <span>Atualizado em {new Date().toLocaleString('pt-BR')}</span>
          </div>
          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-3.5 w-3.5" />
            Exportar Dados
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SalesForecast;
