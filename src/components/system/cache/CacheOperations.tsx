
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { distributedCache } from '@/services/DistributedCacheService';

interface CacheOperationsProps {
  onOperationComplete: () => void;
}

const CacheOperations: React.FC<CacheOperationsProps> = ({ onOperationComplete }) => {
  const { toast } = useToast();

  const handleClearCache = () => {
    distributedCache.clear();
    toast({
      title: "Cache limpo",
      description: "Todo o cache foi limpo com sucesso",
      variant: "default"
    });
    onOperationComplete();
  };

  const handleSyncNodes = () => {
    if (distributedCache.syncNodes()) {
      toast({
        title: "Sincronização concluída",
        description: "Todos os nós ativos foram sincronizados",
        variant: "default"
      });
      onOperationComplete();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Operações do Cache</CardTitle>
        <CardDescription>
          Gerenciar o cache distribuído
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Limpar Todo o Cache</Label>
          <div className="text-sm text-muted-foreground mb-2">
            Esta operação removerá todos os itens do cache em todos os nós.
          </div>
          <Button
            variant="destructive"
            className="w-full"
            onClick={handleClearCache}
          >
            Limpar Cache
          </Button>
        </div>
        
        <Separator />
        
        <div className="space-y-2">
          <Label>Sincronizar Nós</Label>
          <div className="text-sm text-muted-foreground mb-2">
            Sincroniza dados entre todos os nós ativos do cluster.
          </div>
          <Button 
            variant="outline"
            className="w-full"
            onClick={handleSyncNodes}
          >
            <RefreshCw size={16} className="mr-2" />
            Sincronizar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CacheOperations;
