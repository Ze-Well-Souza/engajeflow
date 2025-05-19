
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useLocalization } from "@/contexts/LocalizationContext";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, Legend } from "recharts";
import { Calendar, TrendingUp, ArrowDown, ArrowUp, Filter, Download, AlertTriangle, Calendar as CalendarIcon, ChevronDown } from "lucide-react";

const SalesForecastPage = () => {
  const { formatCurrency, t } = useLocalization();
  const [timeRange, setTimeRange] = useState("month");
  const [historyRange, setHistoryRange] = useState("6m");
  const [showAlert, setShowAlert] = useState(true);
  
  const forecastDailyData = [
    { date: '01/06', actual: null, forecast: 12500 },
    { date: '02/06', actual: null, forecast: 13200 },
    { date: '03/06', actual: null, forecast: 15800 },
    { date: '04/06', actual: null, forecast: 14300 },
    { date: '05/06', actual: null, forecast: 16200 },
    { date: '06/06', actual: null, forecast: 17500 },
    { date: '07/06', actual: null, forecast: 19800 },
  ];
  
  const forecastMonthlyData = [
    { date: 'Jan', actual: 280000, forecast: null },
    { date: 'Fev', actual: 310000, forecast: null },
    { date: 'Mar', actual: 350000, forecast: null },
    { date: 'Abr', actual: 320000, forecast: null },
    { date: 'Mai', actual: 390000, forecast: null },
    { date: 'Jun', actual: null, forecast: 420000 },
    { date: 'Jul', actual: null, forecast: 450000 },
    { date: 'Ago', actual: null, forecast: 470000 },
    { date: 'Set', actual: null, forecast: 510000 },
    { date: 'Out', actual: null, forecast: 540000 },
    { date: 'Nov', actual: null, forecast: 590000 },
    { date: 'Dez', actual: null, forecast: 650000 },
  ];

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Previsão de Vendas com Machine Learning</h1>
      
      {showAlert && (
        <div className="bg-yellow-500/15 border border-yellow-500/30 p-4 rounded-md mb-6 flex items-center">
          <AlertTriangle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0" />
          <div className="flex-1">
            <h4 className="font-medium text-yellow-500">Novos dados disponíveis</h4>
            <p className="text-sm">Novos dados de vendas foram importados. Deseja recalcular as previsões com base nestes dados?</p>
          </div>
          <div className="flex-shrink-0 flex gap-2">
            <Button size="sm" variant="outline" onClick={() => setShowAlert(false)}>Ignorar</Button>
            <Button size="sm" variant="default">Recalcular</Button>
          </div>
        </div>
      )}
      
      {/* Mais conteúdo da página */}
    </div>
  );
};

export default SalesForecastPage;
