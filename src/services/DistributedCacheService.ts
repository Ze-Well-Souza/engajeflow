
import { CacheEntry, CacheOptions, CacheStats, ICacheNode } from './cache/CacheEntry';
import { CacheStatistics } from './cache/CacheStats';

/**
 * Serviço de cache distribuído para o sistema
 */
class DistributedCacheService {
  private cache: Map<string, CacheEntry<any>> = new Map();
  private stats: CacheStats = {
    hits: 0,
    misses: 0,
    hitRatio: 0,
    size: 0,
    oldest: null,
    newest: null,
    avgAge: 0
  };
  private nodes: ICacheNode[] = [];

  constructor() {
    // Inicializar com um nó padrão
    this.nodes.push({
      id: 'primary',
      name: 'Primary Node',
      url: 'localhost',
      status: 'active',
      priority: 1,
      lastSync: new Date()
    });

    console.log('[DistributedCacheService] Inicializado com sucesso');
  }

  /**
   * Obtém um item do cache
   */
  public get<T>(key: string): T | null {
    const entry = this.cache.get(key);

    if (!entry) {
      this.stats.misses++;
      CacheStatistics.updateHitRatio(this.stats);
      return null;
    }

    // Verificar expiração
    if (entry.expiry < Date.now()) {
      this.delete(key);
      this.stats.misses++;
      CacheStatistics.updateHitRatio(this.stats);
      return null;
    }

    // Atualizar estatísticas de acesso
    entry.lastAccessed = Date.now();
    this.stats.hits++;
    CacheStatistics.updateHitRatio(this.stats);

    return entry.data as T;
  }

  /**
   * Coloca um item no cache
   */
  public set<T>(key: string, data: T, options: CacheOptions): void {
    const entry: CacheEntry<T> = {
      data,
      created: Date.now(),
      expiry: Date.now() + (options.ttl * 1000),
      region: options.region,
      tags: options.tags,
      lastAccessed: Date.now()
    };

    this.cache.set(key, entry);
    CacheStatistics.updateStats(this.cache, this.stats);
    
    console.log(`[DistributedCacheService] Item adicionado ao cache: ${key}`);
  }

  /**
   * Remove um item do cache
   */
  public delete(key: string): boolean {
    const result = this.cache.delete(key);
    CacheStatistics.updateStats(this.cache, this.stats);
    
    if (result) {
      console.log(`[DistributedCacheService] Item removido do cache: ${key}`);
    }
    
    return result;
  }

  /**
   * Limpa todo o cache ou uma região específica
   */
  public clear(options?: { region?: string; tags?: string[] }): void {
    if (!options) {
      this.cache.clear();
      CacheStatistics.updateStats(this.cache, this.stats);
      console.log('[DistributedCacheService] Cache limpo completamente');
      return;
    }

    if (options.region) {
      for (const [key, entry] of this.cache.entries()) {
        if (entry.region === options.region) {
          this.cache.delete(key);
        }
      }
      console.log(`[DistributedCacheService] Região '${options.region}' limpa`);
    }

    if (options.tags && options.tags.length > 0) {
      for (const [key, entry] of this.cache.entries()) {
        if (entry.tags && entry.tags.some(tag => options.tags!.includes(tag))) {
          this.cache.delete(key);
        }
      }
      console.log(`[DistributedCacheService] Tags '${options.tags.join(', ')}' limpas`);
    }

    CacheStatistics.updateStats(this.cache, this.stats);
  }

  /**
   * Obtém estatísticas do cache
   */
  public getStats(): CacheStats {
    CacheStatistics.updateStats(this.cache, this.stats);
    return { ...this.stats };
  }

  /**
   * Adiciona um nó ao cluster de cache
   */
  public addNode(node: Omit<ICacheNode, 'lastSync'>): void {
    const newNode: ICacheNode = {
      ...node,
      lastSync: new Date()
    };

    this.nodes.push(newNode);
    console.log(`[DistributedCacheService] Nó adicionado ao cluster: ${node.name}`);
  }

  /**
   * Remove um nó do cluster
   */
  public removeNode(id: string): boolean {
    const initialLength = this.nodes.length;
    this.nodes = this.nodes.filter(node => node.id !== id);

    const removed = this.nodes.length < initialLength;
    if (removed) {
      console.log(`[DistributedCacheService] Nó removido do cluster: ${id}`);
    }

    return removed;
  }

  /**
   * Obtém todos os nós do cluster
   */
  public getNodes(): ICacheNode[] {
    return [...this.nodes];
  }

  /**
   * Simula a falha de um nó para testes
   */
  public simulateNodeFailure(id: string): boolean {
    const node = this.nodes.find(node => node.id === id);
    if (node) {
      node.status = 'inactive';
      console.log(`[DistributedCacheService] Nó ${id} marcado como inativo`);
      return true;
    }
    return false;
  }

  /**
   * Recupera um nó que estava inativo
   */
  public recoverNode(id: string): boolean {
    const node = this.nodes.find(node => node.id === id);
    if (node && node.status === 'inactive') {
      node.status = 'active';
      node.lastSync = new Date();
      console.log(`[DistributedCacheService] Nó ${id} recuperado para status ativo`);
      return true;
    }
    return false;
  }

  /**
   * Sincroniza o cache entre os nós
   */
  public syncNodes(): boolean {
    // Implementação simulada de sincronização
    this.nodes.forEach(node => {
      if (node.status === 'active' && node.id !== 'primary') {
        node.lastSync = new Date();
      }
    });

    console.log('[DistributedCacheService] Sincronização de nós concluída');
    return true;
  }

  /**
   * Busca entradas por tag
   */
  public getByTag<T>(tag: string): Map<string, T> {
    const result = new Map<string, T>();

    for (const [key, entry] of this.cache.entries()) {
      if (entry.tags && entry.tags.includes(tag)) {
        result.set(key, entry.data as T);
      }
    }

    return result;
  }

  /**
   * Busca entradas por região
   */
  public getByRegion<T>(region: string): Map<string, T> {
    const result = new Map<string, T>();

    for (const [key, entry] of this.cache.entries()) {
      if (entry.region === region) {
        result.set(key, entry.data as T);
      }
    }

    return result;
  }
}

// Exportando o serviço como singleton
export const distributedCache = new DistributedCacheService();

// Re-exportar interfaces para uso em outros arquivos usando 'export type'
export type { CacheEntry, CacheOptions, CacheStats, ICacheNode };
