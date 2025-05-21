
import { CacheEntry, CacheStats } from "./CacheEntry";

/**
 * Classe utilitária para estatísticas do cache
 */
export class CacheStatistics {
  /**
   * Atualiza as estatísticas do cache
   */
  static updateStats(
    cache: Map<string, CacheEntry<any>>,
    stats: CacheStats
  ): void {
    stats.size = cache.size;
    
    let oldestTimestamp = Infinity;
    let newestTimestamp = 0;
    let totalAge = 0;
    
    cache.forEach(entry => {
      if (entry.created < oldestTimestamp) {
        oldestTimestamp = entry.created;
      }
      
      if (entry.created > newestTimestamp) {
        newestTimestamp = entry.created;
      }
      
      totalAge += Date.now() - entry.created;
    });
    
    stats.oldest = oldestTimestamp !== Infinity ? new Date(oldestTimestamp) : null;
    stats.newest = newestTimestamp !== 0 ? new Date(newestTimestamp) : null;
    stats.avgAge = cache.size > 0 ? totalAge / cache.size / 1000 : 0;
  }
  
  /**
   * Atualiza a taxa de acertos do cache
   */
  static updateHitRatio(stats: CacheStats): void {
    const total = stats.hits + stats.misses;
    stats.hitRatio = total > 0 ? stats.hits / total : 0;
  }
}
