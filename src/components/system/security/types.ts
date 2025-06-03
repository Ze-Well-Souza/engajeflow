
export type SecurityItemStatus = 'passed' | 'warning' | 'failed' | 'pending';
export type SecurityItemCategory = 'auth' | 'data' | 'api' | 'compliance';

export interface SecurityItem {
  id: string;
  title: string;
  description: string;
  status: SecurityItemStatus;
  category: SecurityItemCategory;
  details?: string;
}
