
/**
 * Interface para entradas no cache distribuído
 */
export interface CacheEntry<T> {
  data: T;
  expiry: number;
  created: number;
  region?: string;
  tags?: string[];
  lastAccessed?: number;
}

/**
 * Opções para configuração do cache
 */
export interface CacheOptions {
  ttl: number; // tempo de vida em segundos
  region?: string; // região do cache (útil para invalidação seletiva)
  tags?: string[]; // tags para agrupar entradas de cache
}

/**
 * Estatísticas do cache
 */
export interface CacheStats {
  hits: number;
  misses: number;
  hitRatio: number;
  size: number;
  oldest: Date | null;
  newest: Date | null;
  avgAge: number;
}

/**
 * Interface para nós do cluster de cache
 */
export interface ICacheNode {
  id: string;
  name: string;
  url: string;
  status: 'active' | 'inactive' | 'syncing';
  priority: number;
  lastSync: Date;
}
