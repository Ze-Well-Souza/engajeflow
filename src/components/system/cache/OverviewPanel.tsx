
import React from 'react';
import { ICacheNode, CacheStats } from '@/services/DistributedCacheService';
import StatCards from './StatCards';
import ClusterStatusCard from './ClusterStatusCard';
import CacheStatsCard from './CacheStatsCard';

interface OverviewPanelProps {
  cacheNodes: ICacheNode[];
  stats: CacheStats;
}

const OverviewPanel: React.FC<OverviewPanelProps> = ({ cacheNodes, stats }) => {
  return (
    <>
      <StatCards stats={stats} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ClusterStatusCard cacheNodes={cacheNodes} />
        <CacheStatsCard stats={stats} />
      </div>
    </>
  );
};

export default OverviewPanel;
