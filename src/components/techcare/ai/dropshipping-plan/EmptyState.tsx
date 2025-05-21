
import React from 'react';
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onGenerate: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onGenerate }) => {
  return (
    <div className="text-center py-10 space-y-4">
      <ShoppingCart className="h-12 w-12 text-primary mx-auto" />
      <h3 className="text-lg font-medium">Monte seu negócio de dropshipping</h3>
      <p className="text-sm text-muted-foreground max-w-md mx-auto">
        Nossa IA analisará tendências de mercado e criará um plano personalizado 
        com nichos promissores, fornecedores confiáveis e um passo a passo para 
        iniciar seu negócio online.
      </p>
      <Button onClick={onGenerate}>
        Gerar plano de negócio
      </Button>
    </div>
  );
};

export default EmptyState;
