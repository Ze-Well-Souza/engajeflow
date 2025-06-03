
import React from 'react';
import { SecurityItem, SecurityItemCategory } from '../types';
import SecurityItemCard from './SecurityItemCard';
import CategoryIcon from './CategoryIcon';

interface CategorySectionProps {
  category: SecurityItemCategory;
  items: SecurityItem[];
}

export const CategorySection: React.FC<CategorySectionProps> = ({ category, items }) => {
  const getCategoryName = (cat: SecurityItemCategory) => {
    switch (cat) {
      case 'auth': return 'Autenticação e Autorização';
      case 'data': return 'Proteção de Dados';
      case 'api': return 'Segurança de APIs';
      case 'compliance': return 'Conformidade Legal';
      default: return '';
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium flex items-center gap-2">
        <CategoryIcon category={category} />
        {getCategoryName(category)}
      </h3>
      {items.map((item) => (
        <SecurityItemCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default CategorySection;
