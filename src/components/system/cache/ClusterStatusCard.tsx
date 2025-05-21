
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Server, Clock } from "lucide-react";
import { ICacheNode } from '@/services/DistributedCacheService';

interface ClusterStatusCardProps {
  cacheNodes: ICacheNode[];
}

const ClusterStatusCard: React.FC<ClusterStatusCardProps> = ({ cacheNodes }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Status do Cluster</CardTitle>
        <CardDescription>
          Status atual dos nós no cluster de cache
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center py-4">
          <div className="grid grid-flow-col gap-4">
            {cacheNodes.map(node => (
              <div 
                key={node.id} 
                className={`p-4 border rounded-md text-center ${
                  node.status === 'active' ? 'border-green-300 bg-green-50' : 
                  node.status === 'syncing' ? 'border-blue-300 bg-blue-50' : 
                  'border-red-300 bg-red-50'
                }`}
              >
                <Server className={`mx-auto mb-2 ${
                  node.status === 'active' ? 'text-green-500' : 
                  node.status === 'syncing' ? 'text-blue-500' : 
                  'text-red-500'
                }`} />
                <div className="text-sm font-medium">{node.name}</div>
                <div className="text-xs text-muted-foreground">{node.id}</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock size={16} className="mr-2" />
          Última atualização: {new Date().toLocaleTimeString()}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ClusterStatusCard;
