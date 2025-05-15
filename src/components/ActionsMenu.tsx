
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Edit, Copy, Trash, Play, Pause } from "lucide-react";

interface ActionsMenuProps {
  onEdit?: () => void;
  onDuplicate?: () => void;
  onDelete?: () => void;
  onToggleActive?: () => void;
  isActive?: boolean;
}

const ActionsMenu: React.FC<ActionsMenuProps> = ({
  onEdit,
  onDuplicate,
  onDelete,
  onToggleActive,
  isActive = true,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={onEdit} className="flex items-center cursor-pointer">
          <Edit className="mr-2 h-4 w-4" />
          <span>Editar</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDuplicate} className="flex items-center cursor-pointer">
          <Copy className="mr-2 h-4 w-4" />
          <span>Duplicar</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onToggleActive} className="flex items-center cursor-pointer">
          {isActive ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
          <span>{isActive ? "Pausar" : "Ativar"}</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={onDelete}
          className="flex items-center cursor-pointer text-destructive focus:text-destructive"
        >
          <Trash className="mr-2 h-4 w-4" />
          <span>Excluir</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionsMenu;
