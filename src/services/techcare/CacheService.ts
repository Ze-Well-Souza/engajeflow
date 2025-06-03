
import logger from "../../utils/logger";

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
  accessCount: number;
  lastAccessed: number;
}

interface CacheStats {
  hits: number;
  misses: number;
  entries: number;
  totalSize: number;
  hitRate: number;
}

class CacheService {
  private static instance: CacheService;
  private cache = new Map<string, CacheEntry<any>>();
  private stats: CacheStats = {
    hits: 0,
    misses: 0,
    entries: 0,
    totalSize: 0,
    hitRate: 0
  };
  private maxSize = 1000;
  private defaultTTL = 300000; // 5 minutos

  private constructor() {
    // Limpar cache expirado a cada minuto
    setInterval(() => this.cleanup(), 60000);
    logger.info('[CacheService] Inicializado');
  }

  public static getInstance(): CacheService {
    if (!CacheService.instance) {
      CacheService.instance = new CacheService();
    }
    return CacheService.instance;
  }

  public set<T>(key: string, data: T, ttl: number = this.defaultTTL): void {
    try {
      const now = Date.now();
      const entry: CacheEntry<T> = {
        data,
        timestamp: now,
        expiresAt: now + ttl,
        accessCount: 0,
        lastAccessed: now
      };

      // Remover entrada mais antiga se cache estiver cheio
      if (this.cache.size >= this.maxSize) {
        this.evictOldest();
      }

      this.cache.set(key, entry);
      this.updateStats();
      
      logger.debug(`[CacheService] Cached data for key: ${key}`);
    } catch (error) {
      logger.error(`[CacheService] Error setting cache for key ${key}:`, error);
    }
  }

  public get<T>(key: string): T | null {
    try {
      const entry = this.cache.get(key) as CacheEntry<T> | undefined;
      const now = Date.now();

      if (!entry) {
        this.stats.misses++;
        this.updateHitRate();
        logger.debug(`[CacheService] Cache miss for key: ${key}`);
        return null;
      }

      if (now > entry.expiresAt) {
        this.cache.delete(key);
        this.stats.misses++;
        this.updateHitRate();
        logger.debug(`[CacheService] Cache expired for key: ${key}`);
        return null;
      }

      // Atualizar estatísticas de acesso
      entry.accessCount++;
      entry.lastAccessed = now;
      this.stats.hits++;
      this.updateHitRate();

      logger.debug(`[CacheService] Cache hit for key: ${key}`);
      return entry.data;
    } catch (error) {
      logger.error(`[CacheService] Error getting cache for key ${key}:`, error);
      return null;
    }
  }

  public has(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) return false;

    const now = Date.now();
    if (now > entry.expiresAt) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  public delete(key: string): boolean {
    const deleted = this.cache.delete(key);
    if (deleted) {
      this.updateStats();
      logger.debug(`[CacheService] Deleted cache for key: ${key}`);
    }
    return deleted;
  }

  public clear(): void {
    this.cache.clear();
    this.stats = {
      hits: 0,
      misses: 0,
      entries: 0,
      totalSize: 0,
      hitRate: 0
    };
    logger.info('[CacheService] Cache cleared');
  }

  public getStats(): CacheStats {
    this.updateStats();
    return { ...this.stats };
  }

  private cleanup(): void {
    const now = Date.now();
    let cleaned = 0;

    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiresAt) {
        this.cache.delete(key);
        cleaned++;
      }
    }

    if (cleaned > 0) {
      this.updateStats();
      logger.debug(`[CacheService] Cleaned ${cleaned} expired entries`);
    }
  }

  private evictOldest(): void {
    let oldestKey = '';
    let oldestTime = Date.now();

    for (const [key, entry] of this.cache.entries()) {
      if (entry.lastAccessed < oldestTime) {
        oldestTime = entry.lastAccessed;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      this.cache.delete(oldestKey);
      logger.debug(`[CacheService] Evicted oldest entry: ${oldestKey}`);
    }
  }

  private updateStats(): void {
    this.stats.entries = this.cache.size;
    this.stats.totalSize = this.calculateTotalSize();
    this.updateHitRate();
  }

  private updateHitRate(): void {
    const total = this.stats.hits + this.stats.misses;
    this.stats.hitRate = total > 0 ? (this.stats.hits / total) * 100 : 0;
  }

  private calculateTotalSize(): number {
    // Estimativa simples do tamanho do cache
    return this.cache.size * 1024; // 1KB por entrada (estimativa)
  }

  // Métodos para cache específico de AI
  public cacheAIResponse(operation: string, input: string, response: any, ttl: number = 600000): void {
    const key = `ai:${operation}:${this.hashString(input)}`;
    this.set(key, response, ttl);
  }

  public getAIResponse<T>(operation: string, input: string): T | null {
    const key = `ai:${operation}:${this.hashString(input)}`;
    return this.get<T>(key);
  }

  private hashString(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(36);
  }
}

export default CacheService.getInstance();
