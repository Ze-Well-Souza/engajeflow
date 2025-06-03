
import { distributedCache } from "../DistributedCacheService";
import { cacheService } from "@/integrations/gateway/cacheService";
import { CacheOptions as DistributedCacheOptions } from "./CacheEntry";
import { CacheOptions as GatewayCacheOptions } from "@/types/gateway";

/**
 * Classe de integração entre diferentes serviços de cache do sistema
 * Permite sincronização e comunicação entre o cache distribuído e o cache do gateway
 */
export class CacheIntegration {
  /**
   * Sincroniza um item específico entre os caches
   */
  static syncItem(key: string, data: any, options: {
    distributed: DistributedCacheOptions,
    gateway: GatewayCacheOptions
  }): void {
    // Armazenar nos dois caches
    distributedCache.set(key, data, options.distributed);
    cacheService.set(key, data, options.gateway);
    
    console.log(`[CacheIntegration] Item sincronizado: ${key}`);
  }
  
  /**
   * Invalida um item em todos os caches
   */
  static invalidateItem(key: string, options?: {
    gatewayPrefix?: string
  }): void {
    // Remover dos dois caches
    distributedCache.delete(key);
    cacheService.invalidate(key, options?.gatewayPrefix);
    
    console.log(`[CacheIntegration] Item invalidado: ${key}`);
  }
  
  /**
   * Sincroniza uma região inteira de cache
   */
  static syncRegion(region: string, items: Array<{key: string, data: any}>): void {
    items.forEach(item => {
      // Definir opções para ambos os caches
      const distributedOptions: DistributedCacheOptions = {
        ttl: 3600,
        region
      };
      
      const gatewayOptions: GatewayCacheOptions = {
        enabled: true,
        ttlSeconds: 3600,
        keyPrefix: region
      };
      
      // Sincronizar cada item
      this.syncItem(item.key, item.data, {
        distributed: distributedOptions,
        gateway: gatewayOptions
      });
    });
    
    console.log(`[CacheIntegration] Região sincronizada: ${region} (${items.length} itens)`);
  }
  
  /**
   * Limpa uma região inteira em todos os caches
   */
  static clearRegion(region: string): void {
    // Limpar em ambos os caches
    distributedCache.clear({ region });
    cacheService.clear(region);
    
    console.log(`[CacheIntegration] Região limpa: ${region}`);
  }
  
  /**
   * Obter um item do cache mais eficiente
   * (primeiro verifica o cache do gateway, depois o distribuído)
   */
  static getItem<T>(key: string, gatewayOptions: GatewayCacheOptions): T | null {
    // Primeiro tenta o cache do gateway (mais rápido)
    const gatewayData = cacheService.get(key, gatewayOptions);
    if (gatewayData) {
      return gatewayData as T;
    }
    
    // Se não encontrar, tenta o cache distribuído
    const distributedData = distributedCache.get<T>(key);
    
    // Se encontrar no cache distribuído mas não no gateway, sincroniza
    if (distributedData) {
      cacheService.set(key, distributedData, gatewayOptions);
      console.log(`[CacheIntegration] Item encontrado apenas no cache distribuído, sincronizado: ${key}`);
    }
    
    return distributedData;
  }
  
  /**
   * Gera relatório de status dos caches
   */
  static generateStatusReport(): {
    distributedStats: any,
    gatewayStatus: string,
    syncStatus: 'ok' | 'partial' | 'failed'
  } {
    const distributedStats = distributedCache.getStats();
    
    return {
      distributedStats,
      gatewayStatus: 'active', // Simplificado para exemplo
      syncStatus: 'ok' // Simplificado para exemplo
    };
  }
}
