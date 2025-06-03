
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChecklistItem } from '../types';
import { getCategoryIcon, getCategoryTitle, calculateProgress } from '../utils';

interface ProgressOverviewProps {
  checklist: ChecklistItem[];
}

const ProgressOverview: React.FC<ProgressOverviewProps> = ({ checklist }) => {
  const getProgress = (category?: string) => {
    return calculateProgress(checklist, category ? item => item.category === category : undefined);
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Progresso Geral</CardTitle>
        <CardDescription>Status de conclusão de todas as etapas</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">{getProgress()}% completo</span>
            <span className="text-sm text-muted-foreground">
              {checklist.filter(item => item.completed).length}/{checklist.length} tarefas
            </span>
          </div>
          <Progress value={getProgress()} className="h-2" />
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
            {['security', 'performance', 'monitoring', 'documentation', 'rollout'].map((category) => (
              <Card key={category} className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center mb-2">
                    {getCategoryIcon(category as any)}
                    <span className="text-xs font-medium">{getCategoryTitle(category as any)}</span>
                  </div>
                  <Progress value={getProgress(category)} className="h-1.5 mb-1" />
                  <div className="text-xs text-muted-foreground mt-1">
                    {getProgress(category)}% completo
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressOverview;
