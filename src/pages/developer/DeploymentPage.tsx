
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, FileText } from "lucide-react";
import { toast } from "sonner";
import { ChecklistItem, ChecklistItemCategory } from './deployment/types';
import ProgressOverview from './deployment/components/ProgressOverview';
import CategoryTabContent from './deployment/components/CategoryTabContent';
import { initialChecklist } from './deployment/checklistData';

const DeploymentPage: React.FC = () => {
  const [checklist, setChecklist] = useState<ChecklistItem[]>(initialChecklist);

  const toggleItem = (id: string) => {
    setChecklist(items => 
      items.map(item => 
        item.id === id 
          ? { ...item, completed: !item.completed } 
          : item
      )
    );
    
    const item = checklist.find(item => item.id === id);
    if (item) {
      toast.success(`${item.completed ? 'Desmarcado' : 'Concluído'}: ${item.title}`);
    }
  };

  const getCategoryItems = (category: ChecklistItemCategory) => {
    return checklist.filter(item => item.category === category);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Checklist de Deploy</h1>
          <p className="text-muted-foreground">Acompanhe e gerencie as etapas finais para o lançamento da plataforma</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
            <Clock size={14} />
            <span>Última atualização: {new Date().toLocaleDateString()}</span>
          </Badge>
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => toast.info("Relatório de progresso gerado!")}
          >
            <FileText size={16} />
            Exportar
          </Button>
        </div>
      </div>

      {/* Progresso Geral */}
      <ProgressOverview checklist={checklist} />

      {/* Categorias de tarefas */}
      <Tabs defaultValue="security" className="w-full">
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger value="security">Segurança</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoramento</TabsTrigger>
          <TabsTrigger value="documentation">Documentação</TabsTrigger>
          <TabsTrigger value="rollout">Lançamento</TabsTrigger>
        </TabsList>
        
        {(['security', 'performance', 'monitoring', 'documentation', 'rollout'] as const).map((category) => (
          <TabsContent key={category} value={category}>
            <CategoryTabContent 
              category={category} 
              items={getCategoryItems(category)} 
              onToggleItem={toggleItem}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default DeploymentPage;
