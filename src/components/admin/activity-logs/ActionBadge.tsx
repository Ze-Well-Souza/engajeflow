
import React from "react";
import { Badge } from "@/components/ui/badge";

interface ActionBadgeProps {
  action: string;
}

const ActionBadge: React.FC<ActionBadgeProps> = ({ action }) => {
  const variant = 
    action === 'delete' ? 'destructive' : 
    action === 'create' || action === 'login' ? 'default' : 
    'outline';

  return (
    <Badge variant={variant}>
      {action}
    </Badge>
  );
};

export default ActionBadge;
