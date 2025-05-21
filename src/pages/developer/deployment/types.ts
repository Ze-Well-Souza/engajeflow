
export type ChecklistItemPriority = 'high' | 'medium' | 'low';
export type ChecklistItemCategory = 'security' | 'performance' | 'monitoring' | 'documentation' | 'rollout';

export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  category: ChecklistItemCategory;
  priority: ChecklistItemPriority;
}
