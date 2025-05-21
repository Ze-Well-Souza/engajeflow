
import React from 'react';
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onGenerate: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onGenerate }) => {
  return (
    <div className="text-center py-10 space-y-4">
      <Share2 className="h-12 w-12 text-primary mx-auto" />
      <h3 className="text-lg font-medium">Amplie seu alcance nas redes sociais</h3>
      <p className="text-sm text-muted-foreground max-w-md mx-auto">
        Nossa IA criará sugestões de conteúdo personalizado para diferentes 
        plataformas sociais, com base no seu tipo de negócio e público-alvo.
      </p>
      <Button onClick={onGenerate}>
        Gerar estratégias de mídia
      </Button>
    </div>
  );
};

export default EmptyState;
