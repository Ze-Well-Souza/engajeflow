
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  BanknoteIcon, 
  CircleDollarSign, 
  BarChart3, 
  CalendarDaysIcon, 
  PlusIcon
} from "lucide-react";

// Componentes do módulo financeiro
import AccountsReceivable from './AccountsReceivable';
import AccountsPayable from './AccountsPayable';
import CashFlow from './CashFlow';
import FinancialReports from './FinancialReports';

const FinancialDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("receivable");

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <CircleDollarSign className="text-primary" />
            Módulo Financeiro
          </h1>
          <p className="text-muted-foreground">
            Gerencie suas finanças, contas a pagar e receber
          </p>
        </div>
        
        <Button className="flex items-center gap-2">
          <PlusIcon className="h-4 w-4" />
          Nova Transação
        </Button>
      </div>

      {/* Resumo financeiro */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-medium text-muted-foreground">Saldo atual</p>
              <CircleDollarSign className="h-4 w-4 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-green-600">R$ 24.750,00</h3>
            <p className="text-xs text-muted-foreground mt-1">Atualizado há 2 horas</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-medium text-muted-foreground">A receber (30 dias)</p>
              <BanknoteIcon className="h-4 w-4 text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold text-blue-600">R$ 12.350,00</h3>
            <p className="text-xs text-muted-foreground mt-1">8 transações pendentes</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-medium text-muted-foreground">A pagar (30 dias)</p>
              <BanknoteIcon className="h-4 w-4 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold text-red-600">R$ 8.120,00</h3>
            <p className="text-xs text-muted-foreground mt-1">5 contas pendentes</p>
          </CardContent>
        </Card>
      </div>

      {/* Abas principais */}
      <Tabs 
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="receivable">Contas a Receber</TabsTrigger>
          <TabsTrigger value="payable">Contas a Pagar</TabsTrigger>
          <TabsTrigger value="cashflow">Fluxo de Caixa</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
        </TabsList>

        <TabsContent value="receivable" className="space-y-4">
          <AccountsReceivable />
        </TabsContent>

        <TabsContent value="payable" className="space-y-4">
          <AccountsPayable />
        </TabsContent>

        <TabsContent value="cashflow" className="space-y-4">
          <CashFlow />
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <FinancialReports />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialDashboard;
