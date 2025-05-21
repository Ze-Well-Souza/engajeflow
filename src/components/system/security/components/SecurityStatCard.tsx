
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { SecurityItem, SecurityItemCategory } from '../types';
import CategoryIcon from './CategoryIcon';

interface SecurityStatCardProps {
  category: SecurityItemCategory;
  passRate: number;
  passed: number;
  total: number;
}

export const SecurityStatCard: React.FC<SecurityStatCardProps> = ({ 
  category, 
  passRate, 
  passed, 
  total 
}) => {
  const getCategoryName = (cat: SecurityItemCategory) => {
    switch (cat) {
      case 'auth': return 'Autenticação';
      case 'data': return 'Dados';
      case 'api': return 'APIs';
      case 'compliance': return 'Conformidade';
      default: return '';
    }
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <CategoryIcon category={category} />
            <span className="ml-2 text-xs font-medium">
              {getCategoryName(category)}
            </span>
          </div>
          <Badge variant="outline" className="text-xs">
            {passed}/{total}
          </Badge>
        </div>
        <Progress value={passRate} className="h-1.5" />
        <div className="text-xs mt-1">{passRate}% aprovado</div>
      </CardContent>
    </Card>
  );
};

export default SecurityStatCard;
