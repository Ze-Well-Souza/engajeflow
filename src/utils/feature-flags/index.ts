
import logger from '../logger';

interface FeatureFlag {
  name: string;
  enabled: boolean;
  description?: string;
}

export class FeatureFlagsManager {
  private flags: Map<string, FeatureFlag> = new Map();

  constructor() {
    logger.info('[FeatureFlags] Inicializando gerenciador de feature flags');
  }

  setFlag(name: string, enabled: boolean, description?: string): void {
    this.flags.set(name, { name, enabled, description });
    logger.info(`[FeatureFlags] Flag '${name}' definida como ${enabled}`);
  }

  isEnabled(name: string): boolean {
    const flag = this.flags.get(name);
    return flag ? flag.enabled : false;
  }

  getAllFlags(): FeatureFlag[] {
    return Array.from(this.flags.values());
  }
}

export const featureFlags = new FeatureFlagsManager();
