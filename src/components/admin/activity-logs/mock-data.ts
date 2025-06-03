
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
  userId?: number;
  metadata?: Record<string, any>;
}

// User types for more realistic data
export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "manager" | "user";
  company: string;
}

// Mock users
export const mockUsers: User[] = [
  { id: 1, name: "Admin TechCare", email: "admin@techcare.com", role: "admin", company: "TechCare" },
  { id: 2, name: "Marcelo Silva", email: "marcelo.silva@email.com", role: "manager", company: "Comércio Fácil" },
  { id: 3, name: "Ana Ferreira", email: "ana.ferreira@email.com", role: "user", company: "Loja Virtual" },
  { id: 4, name: "Suporte Técnico", email: "suporte@comerciofacil.com", role: "user", company: "Comércio Fácil" }
];

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
  
  const logs = [];
  const now = new Date();
  
  for (let i = 0; i < 50; i++) {
    const actionIndex = Math.floor(Math.random() * actions.length);
    const moduleIndex = Math.floor(Math.random() * modules.length);
    const userIndex = Math.floor(Math.random() * mockUsers.length);
    const user = mockUsers[userIndex];
    
    const date = new Date(now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000);
    
    logs.push({
      id: i + 1,
      action: actions[actionIndex],
      module: modules[moduleIndex],
      user: user.email,
      ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      timestamp: date,
      details: `${actions[actionIndex]} operation on ${modules[moduleIndex]}`,
      status: Math.random() > 0.1 ? "success" : "error",
      userId: user.id,
      metadata: {
        browser: ["Chrome", "Firefox", "Safari", "Edge"][Math.floor(Math.random() * 4)],
        os: ["Windows", "MacOS", "Linux", "iOS"][Math.floor(Math.random() * 4)]
      }
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
export const userList = mockUsers.map(user => ({
  id: user.id,
  email: user.email,
  name: user.name
}));
