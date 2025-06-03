
import React from 'react';
import { TabsContent } from "@/components/ui/tabs";
import { Calendar, Store } from "lucide-react";
import { BusinessPlan } from './types';

interface PlanTabProps {
  businessPlan: BusinessPlan;
}

const PlanTab: React.FC<PlanTabProps> = ({ businessPlan }) => {
  return (
    <TabsContent value="plan" className="space-y-4">
      <p className="text-sm text-muted-foreground mb-2">
        Plano de implementação passo a passo:
      </p>
      
      <div className="relative">
        <div className="absolute top-0 bottom-0 left-3 border-l-2 border-dashed border-primary/30"></div>
        
        <div className="space-y-4">
          {businessPlan.steps.map((step, index) => (
            <div key={index} className="pl-8 relative">
              <div className="absolute left-0 top-0 bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs">
                {index + 1}
              </div>
              
              <div className="bg-muted p-3 rounded-lg">
                <h4 className="font-medium text-sm mb-1">{step.title}</h4>
                <p className="text-xs text-muted-foreground mb-2">{step.description}</p>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs">{step.estimatedTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-4 bg-amber-50 p-3 rounded-md">
        <div className="flex items-center gap-1 mb-1 text-sm font-medium text-amber-700">
          <Store className="h-4 w-4" />
          <span>Investimento inicial estimado</span>
        </div>
        <p className="text-xs text-amber-700">
          Para começar seu negócio de dropshipping, preveja um investimento inicial 
          de R$ 1.000 a R$ 3.000, incluindo amostras de produtos, criação da loja 
          e marketing inicial. O retorno pode começar a partir do primeiro mês 
          com as estratégias certas.
        </p>
      </div>
    </TabsContent>
  );
};

export default PlanTab;
