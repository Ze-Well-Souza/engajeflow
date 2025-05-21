
/**
 * Serviço de cache distribuído para alta disponibilidade e resiliência
 * Implementa padrões de cache distribuído com sincronização entre nós
 */

import { toast } from "sonner";
import { CacheEntry, CacheOptions, CacheStats, ICacheNode } from "./cache/CacheEntry";
import { CacheOperations } from "./cache/CacheOperations";
import { CacheStatistics } from "./cache/CacheStats";

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
      CacheStatistics.updateHitRatio(this.stats);
      console.log(`[Cache] MISS: ${key}`);
      return null;
    }
    
    const now = Date.now();
    
    if (entry.expiry < now) {
      this.cache.delete(key);
      this.stats.misses++;
      CacheStatistics.updateHitRatio(this.stats);
      console.log(`[Cache] EXPIRED: ${key}`);
      return null;
    }
    
    // Atualizar estatísticas de acesso
    entry.lastAccessed = now;
    this.stats.hits++;
    CacheStatistics.updateHitRatio(this.stats);
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
    CacheOperations.notifyOtherNodes(this.nodes, this.nodeId, 'set', key, entry);
    CacheStatistics.updateStats(this.cache, this.stats);
    
    console.log(`[Cache] SET: ${key}, TTL: ${options.ttl}s, Region: ${options.region || 'default'}`);
  }

  /**
   * Remove um item do cache distribuído
   */
  public delete(key: string): boolean {
    const result = this.cache.delete(key);
    if (result) {
      CacheOperations.notifyOtherNodes(this.nodes, this.nodeId, 'delete', key);
      CacheStatistics.updateStats(this.cache, this.stats);
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
      CacheOperations.notifyOtherNodes(this.nodes, this.nodeId, 'clear');
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
      CacheOperations.notifyOtherNodes(this.nodes, this.nodeId, 'clear', undefined, undefined, options);
      console.log(`[Cache] CLEAR SELECTIVE: ${deleteCount} itens (Região: ${region}, Tags: ${tags?.join(', ')})`);
    }
    
    CacheStatistics.updateStats(this.cache, this.stats);
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
    return CacheOperations.addNode(this.nodes, node);
  }

  /**
   * Remove um nó do cluster de cache
   */
  public removeNode(nodeId: string): boolean {
    return CacheOperations.removeNode(this.nodes, nodeId, this.nodeId);
  }

  /**
   * Simula falha em um nó do cluster
   */
  public simulateNodeFailure(nodeId: string): boolean {
    return CacheOperations.simulateNodeFailure(this.nodes, nodeId, this.nodeId);
  }

  /**
   * Recupera um nó com falha
   */
  public recoverNode(nodeId: string): boolean {
    return CacheOperations.recoverNode(this.nodes, nodeId);
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
        CacheStatistics.updateStats(this.cache, this.stats);
      }
    }, 30000); // Executar a cada 30 segundos
  }
}

// Exportar uma instância única para uso em toda a aplicação
export const distributedCache = new DistributedCacheService();
