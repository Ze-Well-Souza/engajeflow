
import React from 'react';
import { ICacheNode } from '@/services/DistributedCacheService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AddNodeForm from './AddNodeForm';
import NodesTable from './NodesTable';

interface NodesPanelProps {
  cacheNodes: ICacheNode[];
  onNodeChange: () => void;
}

const NodesPanel: React.FC<NodesPanelProps> = ({ cacheNodes, onNodeChange }) => {
  return (
    <>
      <AddNodeForm onNodeAdded={onNodeChange} />
      
      <Card>
        <CardHeader>
          <CardTitle>Nós do Cluster</CardTitle>
          <CardDescription>
            Gerenciar todos os nós no cluster de cache distribuído
          </CardDescription>
        </CardHeader>
        <CardContent>
          <NodesTable 
            cacheNodes={cacheNodes} 
            onNodeStatusChange={onNodeChange} 
          />
        </CardContent>
      </Card>
    </>
  );
};

export default NodesPanel;
