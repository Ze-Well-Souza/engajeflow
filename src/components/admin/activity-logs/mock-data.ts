
import { format } from "date-fns";

export interface ActivityLog {
  id: number;
  action: string;
  module: string;
  user: string;
  ip: string;
  timestamp: Date;
  details: string;
  status: "success" | "error";
}

// Mock log data
export const generateMockLogs = () => {
  const actions = [
    "Login", "Logout", "Create", "Edit", "Delete", "View", 
    "Export", "Import", "Send Message", "Configure", "API Call"
  ];
  
  const modules = [
    "Sistema", "Mensagens", "Canais", "Automação", "Bot de Vendas", 
    "Templates", "Gateway", "Relatórios", "Loja", "Clientes"
  ];
  
  const users = [
    "admin@techcare.com", 
    "marcelo.silva@email.com", 
    "ana.ferreira@email.com", 
    "suporte@comerciofacil.com"
  ];
  
  const logs = [];
  const now = new Date();
  
  for (let i = 0; i < 50; i++) {
    const actionIndex = Math.floor(Math.random() * actions.length);
    const moduleIndex = Math.floor(Math.random() * modules.length);
    const userIndex = Math.floor(Math.random() * users.length);
    
    const date = new Date(now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000);
    
    logs.push({
      id: i + 1,
      action: actions[actionIndex],
      module: modules[moduleIndex],
      user: users[userIndex],
      ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      timestamp: date,
      details: `${actions[actionIndex]} operation on ${modules[moduleIndex]}`,
      status: Math.random() > 0.1 ? "success" : "error"
    });
  }
  
  // Sort by timestamp, most recent first
  logs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  
  return logs;
};

export const mockLogs = generateMockLogs();

// Get unique action types and modules for filters
export const actionTypes = Array.from(new Set(mockLogs.map(log => log.action)));
export const moduleTypes = Array.from(new Set(mockLogs.map(log => log.module)));
