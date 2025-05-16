
export interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
  statusCode?: number;
  timestamp: number;
}

export interface RetryOptions {
  maxRetries: number;
  initialDelayMs: number;
  backoffFactor: number;
  shouldRetry: (error: any) => boolean;
}

export interface CacheOptions {
  enabled: boolean;
  ttlSeconds: number;
  keyPrefix?: string;
}

export interface ApiRequest {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  data?: any;
  priority?: "high" | "normal" | "low";
  cache?: CacheOptions;
  retry?: RetryOptions;
}

export interface LoadBalancerConfig {
  endpoints: string[];
  strategy: "round-robin" | "least-connections" | "random";
  healthCheck: {
    enabled: boolean;
    intervalMs: number;
    timeoutMs: number;
    healthyThreshold: number;
    unhealthyThreshold: number;
  };
}

export interface GatewayConfig {
  defaultRetry: RetryOptions;
  defaultCache: CacheOptions;
  loadBalancer?: LoadBalancerConfig;
  rateLimiting: {
    enabled: boolean;
    requestsPerMinute: number;
  };
  circuitBreaker: {
    enabled: boolean;
    failureThreshold: number;
    resetTimeoutMs: number;
  };
}
