
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CircleOff, AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';

interface GatewayStatusProps {
  title?: string;
  refreshInterval?: number;
}

const GatewayStatus: React.FC<GatewayStatusProps> = ({
  title = "Status do Gateway",
  refreshInterval = 10000,
}) => {
  const [circuitStatus, setCircuitStatus] = useState<'closed' | 'open' | 'half-open'>('closed');
  const [requestsPerMinute, setRequestsPerMinute] = useState(0);
  const [cacheHitRate, setCacheHitRate] = useState(85);
  const [activeConnections, setActiveConnections] = useState(0);
  const [endpoints, setEndpoints] = useState<{url: string, healthy: boolean}[]>([
    {url: 'api1.example.com', healthy: true},
    {url: 'api2.example.com', healthy: true},
    {url: 'api3.example.com', healthy: false},
  ]);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());

  // Dados simulados para demonstração
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulação de dados atualizados
      setCircuitStatus(['closed', 'open', 'half-open', 'closed', 'closed'][Math.floor(Math.random() * 5)] as any);
      setRequestsPerMinute(Math.floor(Math.random() * 100));
      setCacheHitRate(Math.floor(60 + Math.random() * 40));
      setActiveConnections(Math.floor(Math.random() * 20));
      
      // Atualizar status de saúde dos endpoints para demonstração
      setEndpoints(prev => prev.map(ep => ({
        ...ep,
        healthy: Math.random() > 0.2 // 80% de chance de estar saudável
      })));
      
      setLastRefreshed(new Date());
    }, refreshInterval);
    
    return () => clearInterval(interval);
  }, [refreshInterval]);

  // Funções de renderização
  const renderCircuitStatus = () => {
    switch (circuitStatus) {
      case 'open':
        return (
          <Badge variant="destructive" className="gap-1">
            <CircleOff size={16} /> Aberto
          </Badge>
        );
      case 'half-open':
        return (
          <Badge variant="warning" className="gap-1 bg-yellow-500">
            <AlertCircle size={16} /> Semi-Aberto
          </Badge>
        );
      case 'closed':
      default:
        return (
          <Badge variant="outline" className="gap-1 bg-green-500 text-white">
            <CheckCircle size={16} /> Fechado
          </Badge>
        );
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          <Badge variant="outline" className="gap-1">
            <RefreshCw size={14} className="mr-1" />
            Atualizado: {lastRefreshed.toLocaleTimeString()}
          </Badge>
        </div>
        <CardDescription>Monitoramento do sistema de gateway</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Status do Circuit Breaker */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium">Circuit Breaker</p>
            {renderCircuitStatus()}
          </div>
          
          <div className="space-y-1">
            <p className="text-sm font-medium">Requisições / min</p>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold">{requestsPerMinute}</span>
              <Progress value={requestsPerMinute} max={100} className="h-2" />
            </div>
          </div>
        </div>

        {/* Taxa de Cache Hit */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Taxa de Cache Hit</p>
            <span className="text-sm">{cacheHitRate}%</span>
          </div>
          <Progress value={cacheHitRate} max={100} className="h-2" />
        </div>
        
        {/* Conexões ativas */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Conexões ativas</p>
            <span className="text-sm">{activeConnections}</span>
          </div>
          <Progress value={activeConnections} max={20} className="h-2" />
        </div>

        {/* Status dos Endpoints */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Status dos Endpoints</p>
          <div className="grid grid-cols-1 gap-2">
            {endpoints.map((endpoint, idx) => (
              <div key={idx} className="flex items-center justify-between px-3 py-1 border rounded-md">
                <span className="text-xs truncate">{endpoint.url}</span>
                {endpoint.healthy ? (
                  <Badge variant="outline" className="bg-green-100 text-green-800 text-xs">Ativo</Badge>
                ) : (
                  <Badge variant="outline" className="bg-red-100 text-red-800 text-xs">Inativo</Badge>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GatewayStatus;
