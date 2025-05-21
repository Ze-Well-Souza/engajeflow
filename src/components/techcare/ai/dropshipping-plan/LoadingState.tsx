
import React from 'react';
import { Loader2 } from "lucide-react";

const LoadingState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
      <p className="text-sm text-muted-foreground">Analisando tendências de mercado e montando seu plano...</p>
    </div>
  );
};

export default LoadingState;
