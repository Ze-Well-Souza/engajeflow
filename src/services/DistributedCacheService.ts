
import CacheManager from './cache/CacheManager';
import { CacheOptions, CacheStats, ICacheNode } from './cache/types';

/**
 * Serviço de cache distribuído para o sistema
 * 
 * Implementação de singleton para acesso ao gerenciador de cache
 */
class DistributedCacheService {
  private static instance: DistributedCacheService;
  private cacheManager: CacheManager;

  private constructor() {
    this.cacheManager = new CacheManager();
    console.log('[DistributedCacheService] Inicializado com sucesso');
  }

  /**
   * Obtém a instância única do serviço de cache
   */
  public static getInstance(): DistributedCacheService {
    if (!DistributedCacheService.instance) {
      DistributedCacheService.instance = new DistributedCacheService();
    }
    return DistributedCacheService.instance;
  }

  /**
   * Obtém um item do cache
   */
  public get<T>(key: string): T | null {
    return this.cacheManager.get<T>(key);
  }

  /**
   * Coloca um item no cache
   */
  public set<T>(key: string, data: T, options: CacheOptions): void {
    this.cacheManager.set(key, data, options);
  }

  /**
   * Remove um item do cache
   */
  public delete(key: string): boolean {
    return this.cacheManager.delete(key);
  }

  /**
   * Limpa todo o cache ou uma região específica
   */
  public clear(options?: { region?: string; tags?: string[] }): void {
    this.cacheManager.clear(options);
  }

  /**
   * Obtém estatísticas do cache
   */
  public getStats(): CacheStats {
    return this.cacheManager.getStats();
  }

  /**
   * Adiciona um nó ao cluster de cache
   */
  public addNode(node: Omit<ICacheNode, 'lastSync'>): void {
    this.cacheManager.nodes().addNode(node);
  }

  /**
   * Remove um nó do cluster
   */
  public removeNode(id: string): boolean {
    return this.cacheManager.nodes().removeNode(id);
  }

  /**
   * Obtém todos os nós do cluster
   */
  public getNodes(): ICacheNode[] {
    return this.cacheManager.nodes().getNodes();
  }

  /**
   * Simula a falha de um nó para testes
   */
  public simulateNodeFailure(id: string): boolean {
    return this.cacheManager.nodes().simulateNodeFailure(id);
  }

  /**
   * Recupera um nó que estava inativo
   */
  public recoverNode(id: string): boolean {
    return this.cacheManager.nodes().recoverNode(id);
  }

  /**
   * Sincroniza o cache entre os nós
   */
  public syncNodes(): boolean {
    return this.cacheManager.syncNodes();
  }

  /**
   * Busca entradas por tag
   */
  public getByTag<T>(tag: string): Map<string, T> {
    return this.cacheManager.getByTag(tag);
  }

  /**
   * Busca entradas por região
   */
  public getByRegion<T>(region: string): Map<string, T> {
    return this.cacheManager.getByRegion(region);
  }
}

// Exportando o serviço como singleton
export const distributedCache = DistributedCacheService.getInstance();

// Re-exportar interfaces para uso em outros arquivos
export type { CacheOptions, CacheStats, ICacheNode };
export { default as CacheManager } from './cache/CacheManager';
