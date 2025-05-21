
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { Check, AlertTriangle, X, RefreshCw, Server, Database, Clock } from 'lucide-react';
import { distributedCache, ICacheNode, CacheStats } from '@/services/DistributedCacheService';

const DistributedCachePage: React.FC = () => {
  const { toast } = useToast();
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
  const [nodeFormData, setNodeFormData] = useState({
    id: `node-${Date.now()}`,
    name: '',
    url: '',
    priority: 2
  });
  const [cacheFormData, setcacheFormData] = useState({
    key: '',
    value: '',
    ttl: 300,
    region: 'default',
    tags: ''
  });

  useEffect(() => {
    loadCacheData();
    const interval = setInterval(loadCacheData, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadCacheData = () => {
    setCacheNodes(distributedCache.getNodes());
    setStats(distributedCache.getStats());
  };

  const handleNodeFailure = (id: string) => {
    if (distributedCache.simulateNodeFailure(id)) {
      toast({
        title: "Falha simulada",
        description: `O nó ${id} foi marcado como inativo para simulação`,
        variant: "destructive"
      });
      loadCacheData();
    }
  };

  const handleNodeRecovery = (id: string) => {
    if (distributedCache.recoverNode(id)) {
      toast({
        title: "Nó recuperado",
        description: `O nó ${id} foi recuperado e está ativo`,
        variant: "default"
      });
      loadCacheData();
    }
  };

  const handleNodeRemoval = (id: string) => {
    if (distributedCache.removeNode(id)) {
      toast({
        title: "Nó removido",
        description: `O nó ${id} foi removido do cluster`,
        variant: "default"
      });
      loadCacheData();
    } else {
      toast({
        title: "Erro",
        description: `Não foi possível remover o nó ${id}`,
        variant: "destructive"
      });
    }
  };

  const handleSyncNodes = () => {
    if (distributedCache.syncNodes()) {
      toast({
        title: "Sincronização concluída",
        description: "Todos os nós ativos foram sincronizados",
        variant: "default"
      });
      loadCacheData();
    }
  };

  const handleAddNode = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      distributedCache.addNode({
        id: nodeFormData.id,
        name: nodeFormData.name,
        url: nodeFormData.url,
        status: 'active',
        priority: nodeFormData.priority
      });
      toast({
        title: "Nó adicionado",
        description: `O nó ${nodeFormData.name} foi adicionado ao cluster`,
        variant: "default"
      });
      setNodeFormData({
        id: `node-${Date.now()}`,
        name: '',
        url: '',
        priority: 2
      });
      loadCacheData();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o nó",
        variant: "destructive"
      });
    }
  };

  const handleAddToCache = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { key, value, ttl, region, tags } = cacheFormData;
      distributedCache.set(key, value, {
        ttl: Number(ttl),
        region,
        tags: tags ? tags.split(',').map(tag => tag.trim()) : undefined
      });
      toast({
        title: "Item adicionado",
        description: `Item "${key}" adicionado ao cache`,
        variant: "default"
      });
      setcacheFormData({
        key: '',
        value: '',
        ttl: 300,
        region: 'default',
        tags: ''
      });
      loadCacheData();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o item ao cache",
        variant: "destructive"
      });
    }
  };

  const handleClearCache = () => {
    distributedCache.clear();
    toast({
      title: "Cache limpo",
      description: "Todo o cache foi limpo com sucesso",
      variant: "default"
    });
    loadCacheData();
  };

  const renderNodesTable = () => (
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

  const renderStatCards = () => (
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

  return (
    <div className="container mx-auto p-6">
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
          {renderStatCards()}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          </div>
        </TabsContent>

        <TabsContent value="nodes">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Adicionar Novo Nó</CardTitle>
              <CardDescription>
                Inclua um novo servidor no cluster de cache distribuído
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddNode} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="node-id">ID do Nó</Label>
                  <Input 
                    id="node-id" 
                    placeholder="ID único do nó" 
                    value={nodeFormData.id}
                    onChange={e => setNodeFormData({...nodeFormData, id: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="node-name">Nome</Label>
                  <Input 
                    id="node-name" 
                    placeholder="Nome amigável do nó" 
                    value={nodeFormData.name}
                    onChange={e => setNodeFormData({...nodeFormData, name: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="node-url">URL</Label>
                  <Input 
                    id="node-url" 
                    placeholder="Endereço do servidor" 
                    value={nodeFormData.url}
                    onChange={e => setNodeFormData({...nodeFormData, url: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="node-priority">Prioridade</Label>
                  <Select 
                    value={nodeFormData.priority.toString()} 
                    onValueChange={val => setNodeFormData({...nodeFormData, priority: parseInt(val)})}
                  >
                    <SelectTrigger id="node-priority">
                      <SelectValue placeholder="Selecione a prioridade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 - Alta</SelectItem>
                      <SelectItem value="2">2 - Média</SelectItem>
                      <SelectItem value="3">3 - Baixa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2 flex justify-end">
                  <Button type="submit">Adicionar Nó</Button>
                </div>
              </form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Nós do Cluster</CardTitle>
              <CardDescription>
                Gerenciar todos os nós no cluster de cache distribuído
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderNodesTable()}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="operations">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Adicionar ao Cache</CardTitle>
                <CardDescription>
                  Adicione novos itens ao cache distribuído
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddToCache} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cache-key">Chave</Label>
                    <Input 
                      id="cache-key" 
                      placeholder="Nome da chave" 
                      value={cacheFormData.key}
                      onChange={e => setcacheFormData({...cacheFormData, key: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cache-value">Valor</Label>
                    <Input 
                      id="cache-value" 
                      placeholder="Valor a ser armazenado" 
                      value={cacheFormData.value}
                      onChange={e => setcacheFormData({...cacheFormData, value: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cache-ttl">Tempo de vida (segundos)</Label>
                    <Input 
                      id="cache-ttl" 
                      type="number" 
                      min="1"
                      value={cacheFormData.ttl}
                      onChange={e => setcacheFormData({...cacheFormData, ttl: parseInt(e.target.value)})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cache-region">Região</Label>
                    <Input 
                      id="cache-region" 
                      placeholder="Região do cache" 
                      value={cacheFormData.region}
                      onChange={e => setcacheFormData({...cacheFormData, region: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cache-tags">Tags (separadas por vírgula)</Label>
                    <Input 
                      id="cache-tags" 
                      placeholder="ex: produto, destaque, novo" 
                      value={cacheFormData.tags}
                      onChange={e => setcacheFormData({...cacheFormData, tags: e.target.value})}
                    />
                  </div>
                  <Button type="submit" className="w-full">Adicionar ao Cache</Button>
                </form>
              </CardContent>
            </Card>
            
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
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DistributedCachePage;
