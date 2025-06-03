
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { BarChart3, Download, FileText, PieChart } from "lucide-react";
import {
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
} from 'recharts';

// Dados simulados
const mockDREData = [
  { month: 'Janeiro', revenue: 8250, expenses: 5890, profit: 2360 },
  { month: 'Fevereiro', revenue: 9120, expenses: 6250, profit: 2870 },
  { month: 'Março', revenue: 7980, expenses: 5780, profit: 2200 },
  { month: 'Abril', revenue: 8650, expenses: 6120, profit: 2530 },
  { month: 'Maio', revenue: 11400, expenses: 7850, profit: 3550 },
];

const mockExpenseCategories = [
  { name: 'Fornecedores', value: 3800, color: '#3b82f6' },
  { name: 'Aluguel', value: 2200, color: '#ef4444' },
  { name: 'Serviços', value: 850, color: '#eab308' },
  { name: 'Logística', value: 520, color: '#22c55e' },
  { name: 'Marketing', value: 480, color: '#a855f7' },
];

const mockRevenueCategories = [
  { name: 'Vendas online', value: 6800, color: '#06b6d4' },
  { name: 'Vendas físicas', value: 2900, color: '#8b5cf6' },
  { name: 'Serviços', value: 1700, color: '#f97316' },
];

const FinancialReports: React.FC = () => {
  const [period, setPeriod] = useState("2025-05");
  
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
              <FileText className="h-5 w-5 text-muted-foreground" />
              DRE Simples
            </CardTitle>
            <Select defaultValue={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecionar período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2025-01">Janeiro 2025</SelectItem>
                <SelectItem value="2025-02">Fevereiro 2025</SelectItem>
                <SelectItem value="2025-03">Março 2025</SelectItem>
                <SelectItem value="2025-04">Abril 2025</SelectItem>
                <SelectItem value="2025-05">Maio 2025</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mês</TableHead>
                    <TableHead className="text-right">Receita</TableHead>
                    <TableHead className="text-right">Despesas</TableHead>
                    <TableHead className="text-right">Lucro</TableHead>
                    <TableHead className="text-right">Margem</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockDREData.map((item) => (
                    <TableRow key={item.month}>
                      <TableCell className="font-medium">{item.month}</TableCell>
                      <TableCell className="text-right">R$ {item.revenue.toFixed(2)}</TableCell>
                      <TableCell className="text-right">R$ {item.expenses.toFixed(2)}</TableCell>
                      <TableCell className="text-right">R$ {item.profit.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        {Math.round((item.profit / item.revenue) * 100)}%
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell className="font-medium">Total</TableCell>
                    <TableCell className="text-right font-medium">
                      R$ {mockDREData.reduce((sum, item) => sum + item.revenue, 0).toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      R$ {mockDREData.reduce((sum, item) => sum + item.expenses, 0).toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      R$ {mockDREData.reduce((sum, item) => sum + item.profit, 0).toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {Math.round(
                        (mockDREData.reduce((sum, item) => sum + item.profit, 0) / 
                         mockDREData.reduce((sum, item) => sum + item.revenue, 0)) * 100
                      )}%
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            
            <div className="flex justify-end mt-4">
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Exportar DRE
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
              <PieChart className="h-5 w-5 text-muted-foreground" />
              Distribuição Financeira
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-base font-medium mb-2 text-center">Despesas por Categoria</h3>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={mockExpenseCategories}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {mockExpenseCategories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: any) => [`R$ ${value}`, undefined]}
                    />
                  </RePieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div>
              <h3 className="text-base font-medium mb-2 text-center">Receitas por Categoria</h3>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={mockRevenueCategories}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {mockRevenueCategories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: any) => [`R$ ${value}`, undefined]}
                    />
                  </RePieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-muted-foreground" />
              Resumo Financeiro
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="bg-muted p-4 rounded-md">
                <h4 className="text-sm font-medium mb-2">Análise de Desempenho</h4>
                <p className="text-sm text-muted-foreground">
                  No mês de Maio/2025, seu negócio alcançou o maior faturamento do ano, 
                  com um total de <span className="font-medium">R$ 11.400,00</span>, representando um 
                  crescimento de 31,8% em relação ao mesmo período do ano anterior.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  A margem de lucro se manteve em <span className="font-medium">31,1%</span>, em linha 
                  com a média do ano que é de 29,8%. Recomenda-se atenção ao crescimento das despesas 
                  que acompanham o aumento do faturamento.
                </p>
              </div>
              
              <div className="bg-muted p-4 rounded-md">
                <h4 className="text-sm font-medium mb-2">Lembretes Fiscais</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• DAS-MEI vence dia 20/06/2025 - R$ 66,00</li>
                  <li>• Próximo prazo para declaração trimestral: 15/07/2025</li>
                  <li>• Faturamento atual no ano: R$ 45.400,00 (56% do limite do MEI)</li>
                </ul>
              </div>
              
              <div className="bg-muted p-4 rounded-md">
                <h4 className="text-sm font-medium mb-2">Sugestões para Otimização Fiscal</h4>
                <p className="text-sm text-muted-foreground">
                  Considerando seu perfil de negócio e faturamento projetado, é recomendável:
                </p>
                <ul className="space-y-1 text-sm text-muted-foreground mt-2">
                  <li>• Organizar notas fiscais de despesas para possível dedução no IR</li>
                  <li>• Avaliar pró-labore atual e contribuição para aposentadoria</li>
                  <li>• Planejar transição para ME caso o crescimento continue acelerado</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default FinancialReports;
