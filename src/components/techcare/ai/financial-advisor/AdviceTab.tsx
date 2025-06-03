
import React from 'react';
import { Calendar } from "lucide-react";
import { TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { FinancialAdvice } from './types';

interface AdviceTabProps {
  advice: FinancialAdvice[];
}

const AdviceTab: React.FC<AdviceTabProps> = ({ advice }) => {
  const getTagColor = (type: string) => {
    switch (type) {
      case "das":
        return "bg-blue-100 text-blue-800";
      case "irpf":
        return "bg-purple-100 text-purple-800";
      case "cash_flow":
        return "bg-green-100 text-green-800";
      case "planning":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  return (
    <TabsContent value="advice" className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Recomendações fiscais com base na análise do seu negócio:
      </p>
      
      {advice.map((item, index) => (
        <div key={index} className="bg-muted p-4 rounded-lg">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-medium flex items-center gap-1">
              <Badge className={getTagColor(item.type)}>
                {item.type === "das" && "DAS-MEI"}
                {item.type === "irpf" && "IRPF"}
                {item.type === "cash_flow" && "Fluxo de Caixa"}
                {item.type === "planning" && "Planejamento"}
              </Badge>
              <span>{item.title}</span>
            </h4>
            {item.deadline && (
              <div className="flex items-center text-xs">
                <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                <span>{item.deadline}</span>
              </div>
            )}
          </div>
          <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
          <div className="text-xs font-medium text-primary">
            Ação recomendada: {item.action}
          </div>
        </div>
      ))}
    </TabsContent>
  );
};

export default AdviceTab;
