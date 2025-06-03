
/**
 * Serviço de analytics para o sistema TechCare
 */

export interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
  userId?: string;
  timestamp?: Date;
}

class AnalyticsServiceImpl {
  private debugMode: boolean = false;
  private events: AnalyticsEvent[] = [];
  
  track(event: string, properties?: Record<string, any>, userId?: string): void {
    const analyticsEvent: AnalyticsEvent = {
      event,
      properties,
      userId,
      timestamp: new Date()
    };
    
    this.events.push(analyticsEvent);
    
    if (this.debugMode) {
      console.log('[AnalyticsService] Event tracked:', analyticsEvent);
    }
  }
  
  enableDebugMode(): void {
    this.debugMode = true;
    console.log('[AnalyticsService] Debug mode enabled');
  }
  
  disableDebugMode(): void {
    this.debugMode = false;
  }
  
  getEvents(): AnalyticsEvent[] {
    return this.events;
  }
  
  clearEvents(): void {
    this.events = [];
  }
}

const AnalyticsService = new AnalyticsServiceImpl();
export default AnalyticsService;
