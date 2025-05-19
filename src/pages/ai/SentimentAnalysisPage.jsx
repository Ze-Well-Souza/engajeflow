
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLocalization } from "@/contexts/LocalizationContext";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { AlertCircle, ThumbsUp, ThumbsDown, MessageSquare, Filter } from "lucide-react";

const SentimentAnalysisPage = () => {
  const { t } = useLocalization();
  const [dateFilter, setDateFilter] = useState("7d");
  
  const sentimentData = [
    { name: "10/05", positive: 65, negative: 12, neutral: 23 },
    { name: "11/05", positive: 72, negative: 8, neutral: 20 },
    { name: "12/05", positive: 58, negative: 24, neutral: 18 },
    { name: "13/05", positive: 63, negative: 15, neutral: 22 },
    { name: "14/05", positive: 78, negative: 5, neutral: 17 },
    { name: "15/05", positive: 82, negative: 6, neutral: 12 },
    { name: "16/05", positive: 75, negative: 10, neutral: 15 },
  ];
  
  const pieData = [
    { name: 'Positivo', value: 65, color: '#4CAF50' },
    { name: 'Negativo', value: 15, color: '#F44336' },
    { name: 'Neutro', value: 20, color: '#2196F3' },
  ];
  
  const recentMessages = [
    {
      id: 1,
      text: "Estou muito satisfeito com a qualidade do produto. Superou minhas expectativas!",
      user: "João Silva",
      time: "15 minutos atrás",
      sentiment: "positive",
      score: 0.92,
    },
    {
      id: 2,
      text: "O serviço de atendimento ao cliente foi muito lento para resolver meu problema.",
      user: "Maria Oliveira",
      time: "1 hora atrás",
      sentiment: "negative",
      score: 0.78,
    },
    // Mais mensagens aqui
  ];
  
  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case "positive":
        return <ThumbsUp className="h-5 w-5 text-green-500" />;
      case "negative":
        return <ThumbsDown className="h-5 w-5 text-red-500" />;
      default:
        return <MessageSquare className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Análise de Sentimento</h1>
      
      {/* Conteúdo da página aqui */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
              <ThumbsUp className="h-5 w-5 text-green-500" />
              Sentimento Positivo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">65%</div>
            <p className="text-sm text-muted-foreground">↑ 8% em relação ao período anterior</p>
          </CardContent>
        </Card>
        
        {/* Outros cards aqui */}
      </div>
      
      {/* Mais conteúdo */}
    </div>
  );
};

// Badge necessário para componente
const Badge = ({ children, variant, className }) => {
  const baseClass = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
  
  const getVariantClass = () => {
    switch (variant) {
      case "outline":
        return "border border-muted bg-transparent";
      default:
        return "bg-primary text-primary-foreground";
    }
  };
  
  return (
    <span className={`${baseClass} ${getVariantClass()} ${className || ""}`}>
      {children}
    </span>
  );
};

export default SentimentAnalysisPage;
