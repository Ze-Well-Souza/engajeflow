
import React from 'react';
import { TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";
import { NicheInfo } from './types';

interface NichesTabProps {
  niches: NicheInfo[];
}

const NichesTab: React.FC<NichesTabProps> = ({ niches }) => {
  const getCompetitionBadge = (level: "baixa" | "média" | "alta") => {
    switch (level) {
      case "baixa":
        return <Badge className="bg-green-100 text-green-800">Baixa</Badge>;
      case "média":
        return <Badge className="bg-yellow-100 text-yellow-800">Média</Badge>;
      case "alta":
        return <Badge className="bg-red-100 text-red-800">Alta</Badge>;
    }
  };
  
  const getProfitBadge = (level: "baixa" | "média" | "alta") => {
    switch (level) {
      case "baixa":
        return <Badge className="bg-red-100 text-red-800">Baixa</Badge>;
      case "média":
        return <Badge className="bg-yellow-100 text-yellow-800">Média</Badge>;
      case "alta":
        return <Badge className="bg-green-100 text-green-800">Alta</Badge>;
    }
  };
  
  return (
    <TabsContent value="niches" className="space-y-4">
      <p className="text-sm text-muted-foreground mb-2">
        Nichos de mercado em alta com potencial para seu negócio de dropshipping:
      </p>
      
      {niches.map((niche, index) => (
        <div key={index} className="bg-muted p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium">{niche.name}</h4>
            <Badge className="bg-blue-100 text-blue-800">
              <TrendingUp className="h-3 w-3 mr-1" />
              {niche.growthRate}% crescimento
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{niche.description}</p>
          <div className="flex gap-2">
            <div className="flex items-center gap-1">
              <span className="text-xs text-muted-foreground">Competição:</span>
              {getCompetitionBadge(niche.competition)}
            </div>
            <div className="flex items-center gap-1">
              <span className="text-xs text-muted-foreground">Margem:</span>
              {getProfitBadge(niche.profit)}
            </div>
          </div>
        </div>
      ))}
    </TabsContent>
  );
};

export default NichesTab;
