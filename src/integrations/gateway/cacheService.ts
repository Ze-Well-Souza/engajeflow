
import { CacheOptions } from "@/types/gateway";

class CacheService {
  private cache: Map<string, { data: any; expiry: number }> = new Map();

  /**
   * Gera uma chave de cache com base na URL e nos parâmetros da requisição
   */
  generateCacheKey(url: string, method: string, data?: any): string {
    const dataString = data ? JSON.stringify(data) : '';
    return `${method}:${url}:${dataString}`;
  }

  /**
   * Armazena dados no cache
   */
  set(key: string, data: any, options: CacheOptions): void {
    if (!options.enabled) return;
    
    const expiry = Date.now() + (options.ttlSeconds * 1000);
    this.cache.set(
      options.keyPrefix ? `${options.keyPrefix}:${key}` : key, 
      { data, expiry }
    );
    
    console.log(`Cache: Armazenado "${key}" (expira em ${options.ttlSeconds}s)`);
  }

  /**
   * Recupera dados do cache
   */
  get(key: string, options: CacheOptions): any | null {
    if (!options.enabled) return null;
    
    const cacheKey = options.keyPrefix ? `${options.keyPrefix}:${key}` : key;
    const cached = this.cache.get(cacheKey);
    
    if (!cached) {
      console.log(`Cache: Miss para "${key}"`);
      return null;
    }
    
    if (cached.expiry < Date.now()) {
      console.log(`Cache: Expirado para "${key}"`);
      this.cache.delete(cacheKey);
      return null;
    }
    
    console.log(`Cache: Hit para "${key}"`);
    return cached.data;
  }

  /**
   * Remove um item do cache
   */
  invalidate(key: string, prefix?: string): void {
    const cacheKey = prefix ? `${prefix}:${key}` : key;
    this.cache.delete(cacheKey);
    console.log(`Cache: Invalidado "${cacheKey}"`);
  }

  /**
   * Limpa todo o cache ou apenas os itens com um prefixo específico
   */
  clear(prefix?: string): void {
    if (prefix) {
      const keysToDelete = Array.from(this.cache.keys())
        .filter(key => key.startsWith(`${prefix}:`));
      
      keysToDelete.forEach(key => this.cache.delete(key));
      console.log(`Cache: Limpou ${keysToDelete.length} itens com prefixo "${prefix}"`);
    } else {
      this.cache.clear();
      console.log('Cache: Limpou todo o cache');
    }
  }
}

export const cacheService = new CacheService();
