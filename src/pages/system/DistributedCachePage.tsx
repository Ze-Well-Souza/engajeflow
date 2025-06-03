
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { distributedCache, ICacheNode, CacheStats } from '@/services/DistributedCacheService';

// Componentes do cache distribuído
import CachePageHeader from '@/components/system/cache/CachePageHeader';
import OverviewPanel from '@/components/system/cache/OverviewPanel';
import NodesPanel from '@/components/system/cache/NodesPanel';
import OperationsPanel from '@/components/system/cache/OperationsPanel';

const DistributedCachePage: React.FC = () => {
  const [cacheNodes, setCacheNodes] = useState<ICacheNode[]>([]);
  const [stats, setStats] = useState<CacheStats>({
    hits: 0,
    misses: 0,
    hitRatio: 0,
    size: 0,
    oldest: null,
    newest: null,
    avgAge: 0
  });
  const [selectedTab, setSelectedTab] = useState<string>('overview');

  useEffect(() => {
    loadCacheData();
    const interval = setInterval(loadCacheData, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadCacheData = () => {
    setCacheNodes(distributedCache.getNodes());
    setStats(distributedCache.getStats());
  };

  const handleSyncNodes = () => {
    if (distributedCache.syncNodes()) {
      loadCacheData();
    }
  };

  return (
    <div className="container mx-auto p-6">
      <CachePageHeader handleSyncNodes={handleSyncNodes} />

      <Tabs 
        defaultValue="overview" 
        value={selectedTab} 
        onValueChange={setSelectedTab} 
        className="mb-6"
      >
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="nodes">Nós do Cluster</TabsTrigger>
          <TabsTrigger value="operations">Operações</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewPanel cacheNodes={cacheNodes} stats={stats} />
        </TabsContent>

        <TabsContent value="nodes">
          <NodesPanel 
            cacheNodes={cacheNodes} 
            onNodeChange={loadCacheData} 
          />
        </TabsContent>

        <TabsContent value="operations">
          <OperationsPanel onOperationComplete={loadCacheData} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DistributedCachePage;
