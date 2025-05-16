
export interface Channel {
  id: number;
  name: string;
  type: "whatsapp" | "email" | "sms" | "telegram";
  status: "ativo" | "inativo" | "recurring";
  messages: number;
  lastSync: string;
}

export interface PostAutomationConfig {
  channelId: number;
  platform: "Instagram" | "Facebook" | "TikTok";
  frequency: "daily" | "weekly" | "custom";
  templates: string[];
  enabled: boolean;
}

export interface AutoResponseConfig {
  channelId: number;
  triggers: string[];
  responses: string[];
  enabled: boolean;
}
