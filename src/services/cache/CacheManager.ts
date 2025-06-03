
import { CacheEntry, CacheOptions, CacheStats, ICacheNode } from './types';
import { CacheStatistics } from './CacheStatistics';
import { NodeManager } from './NodeManager';

/**
 * Gerenciador principal do cache distribuído
 */
class CacheManager {
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
  private nodeManager = new NodeManager();

  constructor() {
    console.log('[CacheManager] Inicializado com sucesso');
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
    
    console.log(`[CacheManager] Item adicionado ao cache: ${key}`);
  }

  /**
   * Remove um item do cache
   */
  public delete(key: string): boolean {
    const result = this.cache.delete(key);
    CacheStatistics.updateStats(this.cache, this.stats);
    
    if (result) {
      console.log(`[CacheManager] Item removido do cache: ${key}`);
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
      console.log('[CacheManager] Cache limpo completamente');
      return;
    }

    if (options.region) {
      for (const [key, entry] of this.cache.entries()) {
        if (entry.region === options.region) {
          this.cache.delete(key);
        }
      }
      console.log(`[CacheManager] Região '${options.region}' limpa`);
    }

    if (options.tags && options.tags.length > 0) {
      for (const [key, entry] of this.cache.entries()) {
        if (entry.tags && entry.tags.some(tag => options.tags!.includes(tag))) {
          this.cache.delete(key);
        }
      }
      console.log(`[CacheManager] Tags '${options.tags.join(', ')}' limpas`);
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
   * Acessa o gerenciador de nós
   */
  public nodes() {
    return this.nodeManager;
  }

  /**
   * Sincroniza o cache entre os nós
   */
  public syncNodes(): boolean {
    return this.nodeManager.syncNodes();
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

export default CacheManager;
