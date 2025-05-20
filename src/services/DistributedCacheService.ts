
/**
 * Serviço de cache distribuído para alta disponibilidade e resiliência
 * Implementa padrões de cache distribuído com sincronização entre nós
 */

import { toast } from "sonner";

export interface CacheOptions {
  ttl: number; // tempo de vida em segundos
  region?: string; // região do cache (útil para invalidação seletiva)
  tags?: string[]; // tags para agrupar entradas de cache
}

export interface CacheStats {
  hits: number;
  misses: number;
  hitRatio: number;
  size: number;
  oldest: Date | null;
  newest: Date | null;
  avgAge: number;
}

export interface CacheEntry<T> {
  data: T;
  expiry: number;
  created: number;
  region?: string;
  tags?: string[];
  lastAccessed?: number;
}

export interface ICacheNode {
  id: string;
  name: string;
  url: string;
  status: 'active' | 'inactive' | 'syncing';
  priority: number;
  lastSync: Date;
}

class DistributedCacheService {
  private cache: Map<string, CacheEntry<any>> = new Map();
  private nodes: ICacheNode[] = [];
  private nodeId: string = 'node-' + Math.floor(Math.random() * 10000);
  private stats: CacheStats = {
    hits: 0,
    misses: 0,
    hitRatio: 0,
    size: 0,
    oldest: null,
    newest: null,
    avgAge: 0
  };

  constructor() {
    // Simular nós do cluster para demonstração
    this.nodes = [
      {
        id: this.nodeId,
        name: 'Primary Node',
        url: 'http://cache-node-1:6379',
        status: 'active',
        priority: 100,
        lastSync: new Date()
      },
      {
        id: 'node-2',
        name: 'Secondary Node 1',
        url: 'http://cache-node-2:6379',
        status: 'active',
        priority: 90,
        lastSync: new Date()
      },
      {
        id: 'node-3',
        name: 'Secondary Node 2',
        url: 'http://cache-node-3:6379', 
        status: 'active',
        priority: 80,
        lastSync: new Date()
      }
    ];

    // Iniciar limpeza periódica de cache
    this.startCleanupTask();
  }

  /**
   * Obtém um item do cache distribuído
   */
  public get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      this.stats.misses++;
      this.updateHitRatio();
      console.log(`[Cache] MISS: ${key}`);
      return null;
    }
    
    const now = Date.now();
    
    if (entry.expiry < now) {
      this.cache.delete(key);
      this.stats.misses++;
      this.updateHitRatio();
      console.log(`[Cache] EXPIRED: ${key}`);
      return null;
    }
    
    // Atualizar estatísticas de acesso
    entry.lastAccessed = now;
    this.stats.hits++;
    this.updateHitRatio();
    console.log(`[Cache] HIT: ${key}`);
    
    return entry.data;
  }

  /**
   * Define um item no cache distribuído
   */
  public set<T>(key: string, data: T, options: CacheOptions): void {
    const now = Date.now();
    const entry: CacheEntry<T> = {
      data,
      expiry: now + (options.ttl * 1000),
      created: now,
      region: options.region,
      tags: options.tags
    };
    
    this.cache.set(key, entry);
    this.notifyOtherNodes('set', key, entry);
    this.updateStats();
    
    console.log(`[Cache] SET: ${key}, TTL: ${options.ttl}s, Region: ${options.region || 'default'}`);
  }

  /**
   * Remove um item do cache distribuído
   */
  public delete(key: string): boolean {
    const result = this.cache.delete(key);
    if (result) {
      this.notifyOtherNodes('delete', key);
      this.updateStats();
      console.log(`[Cache] DELETE: ${key}`);
    }
    return result;
  }

  /**
   * Limpa todo o cache distribuído ou por região/tags
   */
  public clear(options?: { region?: string; tags?: string[] }): void {
    if (!options) {
      this.cache.clear();
      this.notifyOtherNodes('clear');
      console.log(`[Cache] CLEAR: Todos os itens`);
      return;
    }
    
    const { region, tags } = options;
    let deleteCount = 0;
    
    this.cache.forEach((entry, key) => {
      let shouldDelete = false;
      
      if (region && entry.region === region) {
        shouldDelete = true;
      }
      
      if (tags && tags.length > 0 && entry.tags) {
        if (tags.some(tag => entry.tags?.includes(tag))) {
          shouldDelete = true;
        }
      }
      
      if (shouldDelete) {
        this.cache.delete(key);
        deleteCount++;
      }
    });
    
    if (deleteCount > 0) {
      this.notifyOtherNodes('clear', undefined, undefined, options);
      console.log(`[Cache] CLEAR SELECTIVE: ${deleteCount} itens (Região: ${region}, Tags: ${tags?.join(', ')})`);
    }
    
    this.updateStats();
  }

  /**
   * Obtém estatísticas sobre o estado atual do cache
   */
  public getStats(): CacheStats {
    return { ...this.stats };
  }

  /**
   * Obtém os nós do cluster de cache
   */
  public getNodes(): ICacheNode[] {
    return [...this.nodes];
  }

  /**
   * Adiciona um novo nó ao cluster de cache
   */
  public addNode(node: Omit<ICacheNode, 'id' | 'lastSync'>): ICacheNode {
    const newNode: ICacheNode = {
      ...node,
      id: 'node-' + Math.floor(Math.random() * 10000),
      lastSync: new Date()
    };
    
    this.nodes.push(newNode);
    console.log(`[Cache] Novo nó adicionado: ${newNode.name} (${newNode.id})`);
    
    // Simular sincronização de cache para o novo nó
    setTimeout(() => {
      newNode.status = 'active';
      console.log(`[Cache] Nó ${newNode.id} sincronizado e ativo`);
      toast(`${newNode.name} foi sincronizado e está ativo agora`);
    }, 2000);
    
    return newNode;
  }

  /**
   * Remove um nó do cluster de cache
   */
  public removeNode(nodeId: string): boolean {
    const index = this.nodes.findIndex(node => node.id === nodeId);
    
    if (index === -1) {
      return false;
    }
    
    // Não permitir remover o nó atual
    if (this.nodes[index].id === this.nodeId) {
      toast("Não é possível remover o nó atual do cluster");
      return false;
    }
    
    const removedNode = this.nodes.splice(index, 1)[0];
    console.log(`[Cache] Nó removido: ${removedNode.name} (${removedNode.id})`);
    
    toast(`${removedNode.name} foi removido do cluster`);
    
    return true;
  }

  /**
   * Simula falha em um nó do cluster
   */
  public simulateNodeFailure(nodeId: string): boolean {
    const node = this.nodes.find(n => n.id === nodeId);
    
    if (!node) {
      return false;
    }
    
    // Não permitir simular falha no nó atual (por segurança)
    if (node.id === this.nodeId) {
      toast("Não é possível simular falha no nó atual");
      return false;
    }
    
    node.status = 'inactive';
    console.log(`[Cache] Simulada falha no nó: ${node.name} (${node.id})`);
    
    toast(`${node.name} está agora inativo`);
    
    return true;
  }

  /**
   * Recupera um nó com falha
   */
  public recoverNode(nodeId: string): boolean {
    const node = this.nodes.find(n => n.id === nodeId);
    
    if (!node || node.status !== 'inactive') {
      return false;
    }
    
    // Simular processo de sincronização
    node.status = 'syncing';
    console.log(`[Cache] Iniciando recuperação do nó: ${node.name} (${node.id})`);
    
    toast(`${node.name} está sincronizando...`);
    
    // Após um tempo, considerar o nó recuperado
    setTimeout(() => {
      node.status = 'active';
      node.lastSync = new Date();
      console.log(`[Cache] Nó recuperado: ${node.name} (${node.id})`);
      
      toast(`${node.name} foi sincronizado e está ativo novamente`);
    }, 3000);
    
    return true;
  }

  private notifyOtherNodes(
    operation: 'set' | 'delete' | 'clear', 
    key?: string, 
    entry?: CacheEntry<any>, 
    options?: { region?: string; tags?: string[] }
  ): void {
    // Em uma implementação real, isso usaria um mecanismo de mensagens
    // como Redis Pub/Sub, RabbitMQ, Kafka, ou mesmo webhooks diretos
    // para sincronizar alterações do cache entre os nós
    
    const activeNodes = this.nodes.filter(n => n.id !== this.nodeId && n.status === 'active');
    
    if (activeNodes.length === 0) {
      return;
    }

    console.log(`[Cache] Notificando ${activeNodes.length} nós sobre operação ${operation}`);
    
    // Atualizar o timestamp de sincronização dos nós
    setTimeout(() => {
      activeNodes.forEach(node => {
        node.lastSync = new Date();
      });
    }, 50);
  }

  private updateStats(): void {
    this.stats.size = this.cache.size;
    
    let oldestTimestamp = Infinity;
    let newestTimestamp = 0;
    let totalAge = 0;
    
    this.cache.forEach(entry => {
      if (entry.created < oldestTimestamp) {
        oldestTimestamp = entry.created;
      }
      
      if (entry.created > newestTimestamp) {
        newestTimestamp = entry.created;
      }
      
      totalAge += Date.now() - entry.created;
    });
    
    this.stats.oldest = oldestTimestamp !== Infinity ? new Date(oldestTimestamp) : null;
    this.stats.newest = newestTimestamp !== 0 ? new Date(newestTimestamp) : null;
    this.stats.avgAge = this.cache.size > 0 ? totalAge / this.cache.size / 1000 : 0;
  }
  
  private updateHitRatio(): void {
    const total = this.stats.hits + this.stats.misses;
    this.stats.hitRatio = total > 0 ? this.stats.hits / total : 0;
  }
  
  private startCleanupTask(): void {
    // Limpar entradas expiradas periodicamente
    setInterval(() => {
      const now = Date.now();
      let expiredCount = 0;
      
      this.cache.forEach((entry, key) => {
        if (entry.expiry < now) {
          this.cache.delete(key);
          expiredCount++;
        }
      });
      
      if (expiredCount > 0) {
        console.log(`[Cache] Cleanup: Removidas ${expiredCount} entradas expiradas`);
        this.updateStats();
      }
    }, 30000); // Executar a cada 30 segundos
  }
}

// Exportar uma instância única para uso em toda a aplicação
export const distributedCache = new DistributedCacheService();
