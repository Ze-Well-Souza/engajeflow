
import React from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, Download } from "lucide-react";

interface LogsPageHeaderProps {
  onRefresh: () => void;
  onExportOpen: () => void;
  isLoading: boolean;
}

const LogsPageHeader: React.FC<LogsPageHeaderProps> = ({ 
  onRefresh, 
  onExportOpen, 
  isLoading 
}) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Logs de Atividades</h2>
        <p className="text-muted-foreground">
          Visualize todas as atividades realizadas pelos usuários no sistema
        </p>
      </div>
      
      <div className="flex gap-2">
        <Button variant="outline" onClick={onRefresh} disabled={isLoading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Atualizar
        </Button>
        <Button variant="outline" onClick={onExportOpen}>
          <Download className="h-4 w-4 mr-2" />
          Exportar
        </Button>
      </div>
    </div>
  );
};

export default LogsPageHeader;
