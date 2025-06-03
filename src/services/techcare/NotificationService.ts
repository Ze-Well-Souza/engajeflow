
/**
 * Serviço de notificações para o sistema TechCare
 */

export interface NotificationConfig {
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  duration?: number;
  persistent?: boolean;
}

class NotificationServiceImpl {
  private notifications: NotificationConfig[] = [];
  
  send(config: NotificationConfig): void {
    console.log(`[NotificationService] Enviando notificação: ${config.title} - ${config.message}`);
    this.notifications.push(config);
  }
  
  sendBulk(notifications: NotificationConfig[]): void {
    notifications.forEach(notification => this.send(notification));
  }
  
  getNotifications(): NotificationConfig[] {
    return this.notifications;
  }
  
  clearNotifications(): void {
    this.notifications = [];
  }
}

const NotificationService = new NotificationServiceImpl();
export default NotificationService;
