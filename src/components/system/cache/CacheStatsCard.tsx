
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Database } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { CacheStats } from '@/services/DistributedCacheService';

interface CacheStatsCardProps {
  stats: CacheStats;
}

const CacheStatsCard: React.FC<CacheStatsCardProps> = ({ stats }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Estatísticas de Cache</CardTitle>
        <CardDescription>
          Informações sobre o desempenho e uso do cache
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium mb-1">Acertos</div>
              <div className="flex items-center">
                <div className="font-bold text-xl text-green-600">{stats.hits}</div>
                <div className="text-xs ml-2 text-muted-foreground">operações</div>
              </div>
            </div>
            <div>
              <div className="text-sm font-medium mb-1">Falhas</div>
              <div className="flex items-center">
                <div className="font-bold text-xl text-red-600">{stats.misses}</div>
                <div className="text-xs ml-2 text-muted-foreground">operações</div>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <div className="text-sm font-medium mb-1">Item mais antigo</div>
            <div className="text-sm">
              {stats.oldest ? new Date(stats.oldest).toLocaleString() : 'Nenhum'}
            </div>
          </div>
          
          <div>
            <div className="text-sm font-medium mb-1">Item mais recente</div>
            <div className="text-sm">
              {stats.newest ? new Date(stats.newest).toLocaleString() : 'Nenhum'}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <Database size={16} className="mr-2" />
          {stats.size} itens em cache
        </div>
      </CardFooter>
    </Card>
  );
};

export default CacheStatsCard;
