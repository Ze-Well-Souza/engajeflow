
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShieldCheck, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { SecurityItemCategory } from './types';
import SecurityStatCard from './components/SecurityStatCard';
import CategorySection from './components/CategorySection';
import SecurityTools from './components/SecurityTools';
import { getPassRate } from './utils';
import { securityItems } from './data';

const SecurityReview: React.FC = () => {
  const getStats = (category: SecurityItemCategory) => {
    return getPassRate(securityItems, category);
  };

  const getCategoryItems = (category: SecurityItemCategory) => {
    return securityItems.filter(item => item.category === category);
  };

  const handleRunSecurityScan = () => {
    toast.info("Iniciando verificação de segurança completa...");
  };

  const overallPassRate = getPassRate(securityItems);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">Revisão de Segurança</h2>
          <p className="text-muted-foreground">Análise das medidas de segurança implementadas</p>
        </div>
        <div>
          <Button onClick={handleRunSecurityScan} variant="outline" className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" />
            Executar Verificação
          </Button>
        </div>
      </div>
      
      {/* Visão geral */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5" />
              Visão Geral
            </CardTitle>
            <Badge variant="outline" className="flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              <span>{overallPassRate.rate}% concluído</span>
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {(['auth', 'data', 'api', 'compliance'] as const).map((category) => {
              const stats = getStats(category);
              return (
                <SecurityStatCard 
                  key={category} 
                  category={category} 
                  passRate={stats.rate} 
                  passed={stats.passed} 
                  total={stats.total}
                />
              );
            })}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(['auth', 'data', 'api', 'compliance'] as const).map((category) => (
              <CategorySection 
                key={category} 
                category={category} 
                items={getCategoryItems(category)} 
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ferramentas de segurança adicionais */}
      <SecurityTools />
    </div>
  );
};

export default SecurityReview;
