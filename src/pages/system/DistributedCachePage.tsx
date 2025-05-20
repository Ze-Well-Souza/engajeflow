
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Database, 
  Server, 
  RefreshCw, 
  AlertCircle, 
  Layers, 
  Clock, 
  PieChart, 
  Activity, 
  Trash2, 
  Plus, 
  AlertTriangle,
  CheckCircle, 
  XCircle 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from 'react-hook-form';
import { distributedCache, ICacheNode, CacheStats } from '@/services/DistributedCacheService';

const DistributedCachePage: React.FC = () => {
  const { toast } = useToast();
  const [nodes, setNodes] = useState<ICacheNode[]>([]);
  const [stats, setStats] = useState<CacheStats | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  
  useEffect(() => {
    loadData();
    // Atualizar a cada 10 segundos
    const interval = setInterval(() => loadData(), 10000);
    return () => clearInterval(interval);
  }, []);
  
  const loadData = () => {
    try {
      setNodes(distributedCache.getNodes());
      setStats(distributedCache.getStats());
    } catch (error) {
      console.error("Erro ao carregar dados do cache:", error);
    }
  };

  const refreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      loadData();
      setIsRefreshing(false);
      toast({
        title: "Dados atualizados",
        description: "Informações do cache foram atualizadas"
      });
    }, 800);
  };
  
  const handleDeleteNode = (nodeId: string) => {
    if (distributedCache.removeNode(nodeId)) {
      loadData();
    }
  };
  
  const handleSimulateFailure = (nodeId: string) => {
    if (distributedCache.simulateNodeFailure(nodeId)) {
      loadData();
    }
  };
  
  const handleRecoverNode = (nodeId: string) => {
    if (distributedCache.recoverNode(nodeId)) {
      loadData();
      // Recarregar após um tempo para mostrar o status "syncing"
      setTimeout(loadData, 500);
    }
  };
  
  const handleClearCache = (options?: { region?: string }) => {
    try {
      distributedCache.clear(options);
      toast({
        title: "Cache limpo",
        description: options?.region 
          ? `Cache da região "${options.region}" foi limpo com sucesso`
          : "Todo o cache foi limpo com sucesso"
      });
      loadData();
    } catch (error) {
      toast({
        title: "Erro ao limpar cache",
        description: "Houve um erro ao limpar o cache",
        variant: "destructive"
      });
    }
  };
  
  const formatTimeSince = (date: Date | null) => {
    if (!date) return "N/A";
    
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return `${seconds}s atrás`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m atrás`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h atrás`;
    return `${Math.floor(seconds / 86400)}d atrás`;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Database className="text-primary" />
            Cache Distribuído
          </h1>
          <p className="text-muted-foreground">
            Gerenciamento de cache de alta performance, disponibilidade e redundância
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2"
            onClick={refreshData}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
          <Button 
            size="sm" 
            className="flex items-center gap-2"
            onClick={() => setAddDialogOpen(true)}
          >
            <Plus className="h-4 w-4" />
            Adicionar Nó
          </Button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Taxa de Acerto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">
                {stats ? `${(stats.hitRatio * 100).toFixed(1)}%` : "0.0%"}
              </div>
              <div className="p-2 rounded-full bg-emerald-500/10 text-emerald-600">
                <PieChart className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-2">
              <Progress 
                value={stats ? stats.hitRatio * 100 : 0} 
                className="h-1.5" 
              />
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              {stats ? `${stats.hits} acertos / ${stats.misses} falhas` : "Sem dados"}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Tamanho do Cache</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">
                {stats ? stats.size.toLocaleString() : "0"}
              </div>
              <div className="p-2 rounded-full bg-blue-500/10 text-blue-600">
                <Database className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              {stats?.newest ? `Última entrada: ${formatTimeSince(stats.newest)}` : "Sem entradas"}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Idade Média</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">
                {stats ? `${stats.avgAge.toFixed(1)}s` : "N/A"}
              </div>
              <div className="p-2 rounded-full bg-amber-500/10 text-amber-600">
                <Clock className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              {stats?.oldest ? `Entrada mais antiga: ${formatTimeSince(stats.oldest)}` : "Sem entradas"}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Nós Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">
                {nodes.filter(n => n.status === 'active').length}/{nodes.length}
              </div>
              <div className="p-2 rounded-full bg-indigo-500/10 text-indigo-600">
                <Server className="h-5 w-5" />
              </div>
            </div>
            {nodes.some(n => n.status !== 'active') && (
              <div className="mt-2 text-sm text-amber-600">
                {nodes.filter(n => n.status !== 'active').length} nós requerem atenção
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Main Content */}
      <Tabs defaultValue="nodes">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="nodes">Nós do Cluster</TabsTrigger>
          <TabsTrigger value="regions">Regiões</TabsTrigger>
          <TabsTrigger value="operations">Operações</TabsTrigger>
        </TabsList>
        
        <TabsContent value="nodes" className="space-y-4 mt-4">
          <div className="space-y-4">
            {nodes.map((node) => (
              <Card key={node.id} className={
                node.status === 'active' ? 'border-l-4 border-l-green-500' : 
                node.status === 'syncing' ? 'border-l-4 border-l-amber-500' : 
                'border-l-4 border-l-red-500'
              }>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <Server className="h-5 w-5 text-primary" />
                      <CardTitle>{node.name}</CardTitle>
                    </div>
                    <Badge className={
                      node.status === 'active' ? 'bg-green-500/10 text-green-600 hover:bg-green-500/20' :
                      node.status === 'syncing' ? 'bg-amber-500/10 text-amber-600 hover:bg-amber-500/20' :
                      'bg-red-500/10 text-red-600 hover:bg-red-500/20'
                    }>
                      {node.status === 'active' ? 'Ativo' :
                       node.status === 'syncing' ? 'Sincronizando' : 'Inativo'}
                    </Badge>
                  </div>
                  <CardDescription>
                    ID: {node.id} • Prioridade: {node.priority}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">URL</div>
                      <div className="font-mono text-sm">{node.url}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Última sincronização</div>
                      <div>{formatTimeSince(node.lastSync)}</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  {node.status === 'active' ? (
                    <Button variant="outline" size="sm" onClick={() => handleSimulateFailure(node.id)}>
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      Simular falha
                    </Button>
                  ) : node.status === 'inactive' ? (
                    <Button variant="outline" size="sm" onClick={() => handleRecoverNode(node.id)}>
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Recuperar
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" disabled>
                      <Activity className="h-4 w-4 mr-1 animate-pulse" />
                      Sincronizando...
                    </Button>
                  )}
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-100"
                    onClick={() => handleDeleteNode(node.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Remover
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="regions" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Regiões de Cache</CardTitle>
              <CardDescription>
                O cache é segmentado por regiões para gerenciamento e invalidação seletiva
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {['userdata', 'products', 'reports', 'settings', 'messages'].map((region) => (
                  <div key={region} className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center gap-3">
                      <Database className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">{region}</p>
                        <p className="text-xs text-muted-foreground">
                          {Math.floor(Math.random() * 1000)} entradas
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleClearCache({ region })}
                    >
                      Limpar região
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Alert className="w-full bg-blue-500/10 text-blue-600 border-blue-200 dark:border-blue-900">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Sobre regiões de cache</AlertTitle>
                <AlertDescription>
                  As regiões permitem organizar e invalidar seletivamente partes do cache sem afetar todo o sistema.
                  Em produção, use regiões separadas para diferentes tipos de dados.
                </AlertDescription>
              </Alert>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="operations" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Operações de Manutenção</CardTitle>
              <CardDescription>
                Gerencie o sistema de cache distribuído
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-full">
                      <Trash2 className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Limpar Cache</h3>
                      <p className="text-sm text-muted-foreground">
                        Remove todas as entradas de cache, afeta todos os nós
                      </p>
                    </div>
                  </div>
                  <Button 
                    variant="destructive" 
                    className="w-full"
                    onClick={() => handleClearCache()}
                  >
                    Limpar Todo o Cache
                  </Button>
                </div>
                
                <div className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-full">
                      <RefreshCw className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Sincronizar Nós</h3>
                      <p className="text-sm text-muted-foreground">
                        Força a sincronização entre todos os nós do cluster
                      </p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      toast({
                        title: "Sincronização iniciada",
                        description: "Os nós estão sendo sincronizados"
                      });
                      setTimeout(() => {
                        toast({
                          title: "Sincronização concluída",
                          description: "Todos os nós foram sincronizados com sucesso"
                        });
                      }, 2000);
                    }}
                  >
                    Sincronizar Agora
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h3 className="font-medium">Estatísticas de Sistema</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Status do Cluster</div>
                    <div className="flex items-center gap-2">
                      {nodes.every(n => n.status === 'active') ? (
                        <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20">
                          Saudável
                        </Badge>
                      ) : nodes.some(n => n.status === 'inactive') ? (
                        <Badge className="bg-red-500/10 text-red-600 hover:bg-red-500/20">
                          Degradado
                        </Badge>
                      ) : (
                        <Badge className="bg-amber-500/10 text-amber-600 hover:bg-amber-500/20">
                          Em recuperação
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Disponibilidade</div>
                    <div className="flex items-center gap-2">
                      <Progress 
                        value={
                          nodes.filter(n => n.status === 'active').length / nodes.length * 100
                        } 
                        className="h-2" 
                      />
                      <span className="text-sm">
                        {(nodes.filter(n => n.status === 'active').length / nodes.length * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Add Node Dialog */}
      <AddNodeDialog open={addDialogOpen} onOpenChange={setAddDialogOpen} onAddNode={() => loadData()} />
    </div>
  );
};

interface AddNodeFormValues {
  name: string;
  url: string;
  priority: "high" | "medium" | "low";
}

interface AddNodeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddNode: () => void;
}

const AddNodeDialog: React.FC<AddNodeDialogProps> = ({ open, onOpenChange, onAddNode }) => {
  const { toast } = useToast();
  const form = useForm<AddNodeFormValues>({
    defaultValues: {
      name: '',
      url: 'http://cache-node-',
      priority: 'medium'
    }
  });
  
  const onSubmit = (values: AddNodeFormValues) => {
    try {
      const priorityMap = {
        high: 90,
        medium: 75,
        low: 60
      };
      
      distributedCache.addNode({
        name: values.name,
        url: values.url,
        status: 'active',
        priority: priorityMap[values.priority]
      });
      
      onOpenChange(false);
      form.reset();
      onAddNode();
      
      toast({
        title: "Nó adicionado com sucesso",
        description: `${values.name} foi adicionado ao cluster de cache`
      });
    } catch (error) {
      toast({
        title: "Erro ao adicionar nó",
        description: "Houve um problema ao adicionar o nó",
        variant: "destructive"
      });
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Novo Nó de Cache</DialogTitle>
          <DialogDescription>
            Adicione um novo servidor ao cluster de cache distribuído
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Nó</FormLabel>
                  <FormControl>
                    <Input placeholder="Cache Node 4" {...field} />
                  </FormControl>
                  <FormDescription>
                    Um nome descritivo para identificar o nó
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL do Servidor</FormLabel>
                  <FormControl>
                    <Input placeholder="http://cache-node-4:6379" {...field} />
                  </FormControl>
                  <FormDescription>
                    Endereço para conexão com o servidor de cache
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prioridade</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="high" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Alta
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="medium" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Média
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="low" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Baixa
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormDescription>
                    Define a prioridade do nó no cluster
                  </FormDescription>
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="submit">Adicionar Nó</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DistributedCachePage;
