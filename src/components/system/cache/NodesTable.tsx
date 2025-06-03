
import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, AlertTriangle, X, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ICacheNode, distributedCache } from '@/services/DistributedCacheService';

interface NodesTableProps {
  cacheNodes: ICacheNode[];
  onNodeStatusChange: () => void;
}

const NodesTable: React.FC<NodesTableProps> = ({ cacheNodes, onNodeStatusChange }) => {
  const { toast } = useToast();

  const handleNodeFailure = (id: string) => {
    if (distributedCache.simulateNodeFailure(id)) {
      toast({
        title: "Falha simulada",
        description: `O nó ${id} foi marcado como inativo para simulação`,
        variant: "destructive"
      });
      onNodeStatusChange();
    }
  };

  const handleNodeRecovery = (id: string) => {
    if (distributedCache.recoverNode(id)) {
      toast({
        title: "Nó recuperado",
        description: `O nó ${id} foi recuperado e está ativo`,
        variant: "default"
      });
      onNodeStatusChange();
    }
  };

  const handleNodeRemoval = (id: string) => {
    if (distributedCache.removeNode(id)) {
      toast({
        title: "Nó removido",
        description: `O nó ${id} foi removido do cluster`,
        variant: "default"
      });
      onNodeStatusChange();
    } else {
      toast({
        title: "Erro",
        description: `Não foi possível remover o nó ${id}`,
        variant: "destructive"
      });
    }
  };

  return (
    <Table>
      <TableCaption>Lista de nós no cluster de cache distribuído</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>URL</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Prioridade</TableHead>
          <TableHead>Última Sincronização</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cacheNodes.map((node) => (
          <TableRow key={node.id}>
            <TableCell className="font-medium">{node.id}</TableCell>
            <TableCell>{node.name}</TableCell>
            <TableCell>{node.url}</TableCell>
            <TableCell>
              {node.status === 'active' ? (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  <Check size={14} className="mr-1" /> Ativo
                </Badge>
              ) : node.status === 'syncing' ? (
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  <RefreshCw size={14} className="mr-1" /> Sincronizando
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                  <X size={14} className="mr-1" /> Inativo
                </Badge>
              )}
            </TableCell>
            <TableCell>{node.priority}</TableCell>
            <TableCell>{node.lastSync.toLocaleString()}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                {node.status === 'active' ? (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleNodeFailure(node.id)}
                    className="h-8 text-amber-600 hover:text-amber-700"
                  >
                    <AlertTriangle size={14} className="mr-1" /> Simular falha
                  </Button>
                ) : (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleNodeRecovery(node.id)}
                    className="h-8 text-green-600 hover:text-green-700"
                  >
                    <Check size={14} className="mr-1" /> Recuperar
                  </Button>
                )}
                {node.id !== 'primary' && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleNodeRemoval(node.id)}
                    className="h-8 text-red-600 hover:text-red-700"
                  >
                    <X size={14} className="mr-1" /> Remover
                  </Button>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default NodesTable;
