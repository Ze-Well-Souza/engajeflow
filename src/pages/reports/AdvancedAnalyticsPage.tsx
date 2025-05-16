
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, LineChart as LineChartIcon, AlertTriangle, ArrowUpRight, ArrowDownRight, BrainCircuit } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import ProductRecommendations from '@/components/store/recommendations/ProductRecommendations';

// Dados simulados para os gráficos
const salesForecastData = [
  { month: 'Jan', atual: 4000, previsao: 4400 },
  { month: 'Fev', atual: 4200, previsao: 4300 },
  { month: 'Mar', atual: 3800, previsao: 4100 },
  { month: 'Abr', atual: 4100, previsao: 4250 },
  { month: 'Mai', atual: 3700, previsao: 4000 },
  { month: 'Jun', atual: 3900, previsao: 4100 },
  { month: 'Jul', atual: 4300, previsao: 4500 },
  { month: 'Ago', atual: 4500, previsao: 4700 },
  { month: 'Set', atual: 4700, previsao: 4900 },
  { month: 'Out', atual: null, previsao: 5200 },
  { month: 'Nov', atual: null, previsao: 5500 },
  { month: 'Dez', atual: null, previsao: 5800 },
];

const campaignIssuesData = [
  {
    id: 'issue-1',
    campaign: 'Promoção de Verão',
    type: 'Alto custo de aquisição',
    severity: 'alta',
    impact: 'Redução de 23% no ROI',
    recommendation: 'Redirecionar orçamento para canais com menor CPA'
  },
  {
    id: 'issue-2',
    campaign: 'Lançamento Produto X',
    type: 'Baixa taxa de conversão',
    severity: 'média',
    impact: 'Apenas 1.2% de conversão vs 3% esperado',
    recommendation: 'Revisar funil de conversão e landing page'
  },
  {
    id: 'issue-3',
    campaign: 'Remarketing Geral',
    type: 'Frequência excessiva',
    severity: 'baixa',
    impact: 'Aumento de 15% em feedback negativo',
    recommendation: 'Limitar frequência de exposição para 3 por semana'
  }
];

const sentimentData = [
  { dia: '01/05', positivo: 65, neutro: 25, negativo: 10 },
  { dia: '02/05', positivo: 68, neutro: 22, negativo: 10 },
  { dia: '03/05', positivo: 62, neutro: 28, negativo: 10 },
  { dia: '04/05', positivo: 70, neutro: 20, negativo: 10 },
  { dia: '05/05', positivo: 72, neutro: 18, negativo: 10 },
  { dia: '06/05', positivo: 58, neutro: 27, negativo: 15 },
  { dia: '07/05', positivo: 60, neutro: 25, negativo: 15 },
  { dia: '08/05', positivo: 65, neutro: 23, negativo: 12 },
  { dia: '09/05', positivo: 68, neutro: 22, negativo: 10 },
  { dia: '10/05', positivo: 72, neutro: 23, negativo: 5 },
  { dia: '11/05', positivo: 75, neutro: 20, negativo: 5 },
  { dia: '12/05', positivo: 70, neutro: 25, negativo: 5 },
  { dia: '13/05', positivo: 68, neutro: 27, negativo: 5 },
  { dia: '14/05', positivo: 65, neutro: 30, negativo: 5 },
];

const AdvancedAnalyticsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("previsoes");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeframe, setTimeframe] = useState("mes");

  // Função auxiliar para cor com base na severidade
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'alta': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'média': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'baixa': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Análise Avançada</h1>
          <p className="text-muted-foreground">
            Insights detalhados com inteligência artificial e machine learning
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                {date ? format(date, 'PPP', { locale: ptBR }) : 'Selecione a data'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                locale={ptBR}
              />
            </PopoverContent>
          </Popover>
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="semana">Semana</SelectItem>
              <SelectItem value="mes">Mês</SelectItem>
              <SelectItem value="trimestre">Trimestre</SelectItem>
              <SelectItem value="ano">Ano</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="previsoes" className="flex items-center gap-2">
            <LineChartIcon size={16} />
            Previsões
          </TabsTrigger>
          <TabsTrigger value="problemas" className="flex items-center gap-2">
            <AlertTriangle size={16} />
            Detecção de Problemas
          </TabsTrigger>
          <TabsTrigger value="sentimento" className="flex items-center gap-2">
            <BrainCircuit size={16} />
            Análise de Sentimento
          </TabsTrigger>
          <TabsTrigger value="recomendacoes" className="flex items-center gap-2">
            <ArrowUpRight size={16} />
            Recomendações
          </TabsTrigger>
        </TabsList>

        <TabsContent value="previsoes" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Previsão de Vendas</CardTitle>
                  <CardDescription>
                    Projeções baseadas em machine learning e dados históricos
                  </CardDescription>
                </div>
                <Badge className="bg-purple-500 hover:bg-purple-600">AI Powered</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Vendas Projetadas vs Realizadas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={salesForecastData}>
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Line 
                            type="monotone" 
                            dataKey="atual" 
                            stroke="#6366f1" 
                            strokeWidth={2} 
                            name="Vendas atuais"
                            dot={{ r: 4 }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="previsao" 
                            stroke="#fb7185"
                            strokeWidth={2}
                            strokeDasharray="5 5"
                            name="Previsão"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Métricas de Previsão</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-sm">
                        <span>Vendas previstas (próximos 3 meses)</span>
                        <span className="font-medium">R$ 16.500,00</span>
                      </div>
                      <Progress value={75} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Meta: R$ 22.000,00</span>
                        <span>75% da meta</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex flex-col gap-1">
                            <span className="text-xs text-muted-foreground">Taxa de crescimento</span>
                            <div className="flex items-center">
                              <span className="text-xl font-bold">+12.4%</span>
                              <ArrowUpRight className="text-green-500 w-4 h-4 ml-2" />
                            </div>
                            <span className="text-xs text-green-500">+2.1% vs último trimestre</span>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex flex-col gap-1">
                            <span className="text-xs text-muted-foreground">Margem de lucro</span>
                            <div className="flex items-center">
                              <span className="text-xl font-bold">32.8%</span>
                              <ArrowDownRight className="text-red-500 w-4 h-4 ml-2" />
                            </div>
                            <span className="text-xs text-red-500">-1.3% vs último trimestre</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Alert>
                      <BrainCircuit className="h-4 w-4" />
                      <AlertTitle>Insight da IA</AlertTitle>
                      <AlertDescription>
                        A previsão indica tendência de crescimento de 12% até o final do ano. 
                        Considere aumentar estoque dos produtos mais vendidos para o trimestre.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="problemas" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Detecção Automática de Problemas</CardTitle>
              <CardDescription>
                Análise automática de campanhas para identificação de problemas e oportunidades de melhoria
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Problemas Detectados ({campaignIssuesData.length})</h3>
                  <Select defaultValue="todas">
                    <SelectTrigger className="w-44">
                      <SelectValue placeholder="Filtrar por campanha" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todas">Todas as campanhas</SelectItem>
                      <SelectItem value="verao">Promoção de Verão</SelectItem>
                      <SelectItem value="produtox">Lançamento Produto X</SelectItem>
                      <SelectItem value="remarketing">Remarketing Geral</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  {campaignIssuesData.map((issue) => (
                    <Card key={issue.id} className={`border ${getSeverityColor(issue.severity)}`}>
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div className="space-y-1">
                            <Badge variant="outline" className="mb-1">
                              {issue.campaign}
                            </Badge>
                            <h4 className="font-medium">{issue.type}</h4>
                            <p className="text-sm text-muted-foreground">{issue.impact}</p>
                          </div>
                          <div className="flex flex-col md:items-end gap-2">
                            <Badge className={
                              issue.severity === 'alta' ? 'bg-destructive' : 
                              issue.severity === 'média' ? 'bg-orange-500' : 
                              'bg-yellow-500'
                            }>
                              Severidade {issue.severity}
                            </Badge>
                            <Button size="sm" variant="outline">Ver detalhes</Button>
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t">
                          <p className="text-sm">
                            <span className="font-medium">Recomendação: </span>
                            {issue.recommendation}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sentimento" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análise de Sentimento</CardTitle>
              <CardDescription>
                Monitoramento de sentimento baseado em mensagens de clientes e redes sociais
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Sentimento Geral</p>
                      <h3 className="text-2xl font-bold">72% Positivo</h3>
                      <div className="flex items-center text-green-500 text-sm">
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                        <span>+5% desde a última semana</span>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <div className="flex items-center gap-1 text-xs">
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        <span>Positivo</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                        <span>Neutro</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <div className="h-3 w-3 rounded-full bg-red-500"></div>
                        <span>Negativo</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="md:col-span-2">
                  <CardContent className="p-4">
                    <h3 className="text-sm font-medium mb-4">Tendência de Sentimento</h3>
                    <div className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={sentimentData} stackOffset="expand" barSize={20}>
                          <XAxis dataKey="dia" />
                          <YAxis tickFormatter={(value) => `${value}%`} />
                          <Tooltip formatter={(value) => `${value}%`} />
                          <Bar 
                            dataKey="positivo" 
                            fill="#22c55e" 
                            name="Positivo"
                            radius={[4, 4, 0, 0]}
                          />
                          <Bar 
                            dataKey="neutro" 
                            fill="#3b82f6" 
                            name="Neutro"
                            radius={[4, 4, 0, 0]}
                          />
                          <Bar 
                            dataKey="negativo" 
                            fill="#ef4444" 
                            name="Negativo"
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Tópicos Principais (Positivos)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center justify-between">
                        <span>Atendimento ao cliente</span>
                        <Badge className="bg-green-500">85% positivo</Badge>
                      </li>
                      <li className="flex items-center justify-between">
                        <span>Qualidade do produto</span>
                        <Badge className="bg-green-500">78% positivo</Badge>
                      </li>
                      <li className="flex items-center justify-between">
                        <span>Interface do aplicativo</span>
                        <Badge className="bg-green-500">72% positivo</Badge>
                      </li>
                      <li className="flex items-center justify-between">
                        <span>Entrega</span>
                        <Badge className="bg-green-500">68% positivo</Badge>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Tópicos Principais (Negativos)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center justify-between">
                        <span>Tempo de carregamento</span>
                        <Badge className="bg-red-500">24% negativo</Badge>
                      </li>
                      <li className="flex items-center justify-between">
                        <span>Preço</span>
                        <Badge className="bg-red-500">18% negativo</Badge>
                      </li>
                      <li className="flex items-center justify-between">
                        <span>Processo de devolução</span>
                        <Badge className="bg-red-500">15% negativo</Badge>
                      </li>
                      <li className="flex items-center justify-between">
                        <span>Bugs no aplicativo</span>
                        <Badge className="bg-red-500">12% negativo</Badge>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recomendacoes" className="space-y-4">
          <ProductRecommendations />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedAnalyticsPage;
