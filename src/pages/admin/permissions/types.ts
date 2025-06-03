
// Tipos compartilhados para os componentes de permissões

export interface Client {
  id: number;
  name: string;
  type: string;
  plano: string;
}

export interface Organization {
  id: number;
  nome: string;
  clientes: number;
  usuarios: number;
}

export interface User {
  id: number;
  nome: string;
  email: string;
  perfil: string;
  organizacao: string;
}

export interface PermissionModule {
  id: string;
  name: string;
  permissions: string[];
}

export interface Profile {
  id: number;
  name: string;
  description: string;
  permissions: Record<string, string[]>;
}
