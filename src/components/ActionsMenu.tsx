
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Edit, Copy, Trash2, Power, PowerOff } from 'lucide-react';

interface ActionsMenuProps {
  onEdit: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onToggleActive: () => void;
  isActive: boolean;
}

const ActionsMenu: React.FC<ActionsMenuProps> = ({
  onEdit,
  onDuplicate,
  onDelete,
  onToggleActive,
  isActive
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onEdit}>
          <Edit className="mr-2 h-4 w-4" />
          Editar
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDuplicate}>
          <Copy className="mr-2 h-4 w-4" />
          Duplicar
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onToggleActive}>
          {isActive ? (
            <>
              <PowerOff className="mr-2 h-4 w-4" />
              Desativar
            </>
          ) : (
            <>
              <Power className="mr-2 h-4 w-4" />
              Ativar
            </>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDelete} className="text-destructive">
          <Trash2 className="mr-2 h-4 w-4" />
          Excluir
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionsMenu;
