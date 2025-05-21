
import React from 'react';
import { Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onGenerate: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onGenerate }) => {
  return (
    <div className="text-center py-10 space-y-4">
      <Calculator className="h-12 w-12 text-primary mx-auto" />
      <h3 className="text-lg font-medium">Consultoria fiscal personalizada</h3>
      <p className="text-sm text-muted-foreground max-w-md mx-auto">
        Nossa IA analisará seu perfil fiscal e fornecerá orientações sobre impostos, 
        prazos e estratégias para otimizar suas finanças como empreendedor.
      </p>
      <Button onClick={onGenerate}>
        Gerar consultoria fiscal
      </Button>
    </div>
  );
};

export default EmptyState;
