
/**
 * Serviço de integrações para o sistema TechCare
 */

export interface IntegrationConfig {
  name: string;
  type: string;
  apiKey?: string;
  baseUrl?: string;
  enabled: boolean;
}

class IntegrationServiceImpl {
  private integrations: Map<string, IntegrationConfig> = new Map();
  
  register(name: string, config: IntegrationConfig): void {
    this.integrations.set(name, config);
    console.log(`[IntegrationService] Integração ${name} registrada`);
  }
  
  getIntegration(name: string): IntegrationConfig | undefined {
    return this.integrations.get(name);
  }
  
  getAllIntegrations(): IntegrationConfig[] {
    return Array.from(this.integrations.values());
  }
  
  enableIntegration(name: string): boolean {
    const integration = this.integrations.get(name);
    if (integration) {
      integration.enabled = true;
      return true;
    }
    return false;
  }
  
  disableIntegration(name: string): boolean {
    const integration = this.integrations.get(name);
    if (integration) {
      integration.enabled = false;
      return true;
    }
    return false;
  }
}

const IntegrationService = new IntegrationServiceImpl();
export default IntegrationService;
