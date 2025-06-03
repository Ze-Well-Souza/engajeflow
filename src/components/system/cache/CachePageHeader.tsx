
import React from 'react';
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface CachePageHeaderProps {
  handleSyncNodes: () => void;
}

const CachePageHeader: React.FC<CachePageHeaderProps> = ({ handleSyncNodes }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-3xl font-bold">Cache Distribuído</h1>
        <p className="text-muted-foreground">
          Gerenciamento da infraestrutura de cache distribuído do sistema
        </p>
      </div>
      <Button onClick={handleSyncNodes}>
        <RefreshCw size={16} className="mr-2" /> Sincronizar Nós
      </Button>
    </div>
  );
};

export default CachePageHeader;
