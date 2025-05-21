
import React from 'react';
import { ShieldAlert, BarChart, HardDrive, FileText, Rocket } from "lucide-react";
import { ChecklistItemCategory } from './types';

export const getCategoryIcon = (category: ChecklistItemCategory) => {
  switch (category) {
    case 'security': return <ShieldAlert className="h-5 w-5 mr-2" />;
    case 'performance': return <BarChart className="h-5 w-5 mr-2" />;
    case 'monitoring': return <HardDrive className="h-5 w-5 mr-2" />;
    case 'documentation': return <FileText className="h-5 w-5 mr-2" />;
    case 'rollout': return <Rocket className="h-5 w-5 mr-2" />;
    default: return null;
  }
};

export const getCategoryTitle = (category: ChecklistItemCategory) => {
  switch (category) {
    case 'security': return 'Revisão de Segurança Final';
    case 'performance': return 'Testes de Performance';
    case 'monitoring': return 'Backup e Monitoramento';
    case 'documentation': return 'Documentação';
    case 'rollout': return 'Lançamento Gradual';
    default: return 'Desconhecido';
  }
};

export const calculateProgress = (items: { completed: boolean }[], filterFn?: (item: any) => boolean) => {
  const filtered = filterFn ? items.filter(filterFn) : items;
  const completed = filtered.filter(item => item.completed).length;
  const total = filtered.length;
  
  return total === 0 ? 0 : Math.round((completed / total) * 100);
};
