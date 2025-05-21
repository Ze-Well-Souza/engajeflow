
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CacheStats } from '@/services/DistributedCacheService';

interface StatCardsProps {
  stats: CacheStats;
}

const StatCards: React.FC<StatCardsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Total de Operações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.hits + stats.misses}</div>
          <div className="text-xs text-muted-foreground mt-1">Desde a inicialização</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Taxa de Acerto</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold">{(stats.hitRatio * 100).toFixed(1)}%</div>
          </div>
          <Progress className="h-2 mt-2" value={stats.hitRatio * 100} />
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="text-xs">
              <span className="font-medium text-green-600">{stats.hits}</span> acertos
            </div>
            <div className="text-xs">
              <span className="font-medium text-red-600">{stats.misses}</span> falhas
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Itens em Cache</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.size}</div>
          <div className="text-xs text-muted-foreground mt-1">
            Idade média: {stats.avgAge.toFixed(1)}s
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatCards;
