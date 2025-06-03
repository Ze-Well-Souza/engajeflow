
import { SecurityItem, SecurityItemCategory } from './types';

export const getPassRate = (items: SecurityItem[], category?: SecurityItemCategory) => {
  const filteredItems = category 
    ? items.filter(item => item.category === category)
    : items;
  
  const passed = filteredItems.filter(item => item.status === 'passed').length;
  const total = filteredItems.length;
  
  return {
    rate: Math.round((passed / total) * 100),
    passed,
    total
  };
};
