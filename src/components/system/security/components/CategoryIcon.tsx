
import React from 'react';
import { Key, FileLock, Lock, FileKey } from "lucide-react";
import { SecurityItemCategory } from '../types';

interface CategoryIconProps {
  category: SecurityItemCategory;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ category }) => {
  switch (category) {
    case 'auth':
      return <Key className="h-5 w-5" />;
    case 'data':
      return <FileLock className="h-5 w-5" />;
    case 'api':
      return <Lock className="h-5 w-5" />;
    case 'compliance':
      return <FileKey className="h-5 w-5" />;
    default:
      return null;
  }
};

export default CategoryIcon;
