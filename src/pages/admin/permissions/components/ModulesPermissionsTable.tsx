
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield } from "lucide-react";
import { PermissionModule } from "../types";

interface ModulesPermissionsTableProps {
  modulesList: PermissionModule[];
  isPermissionChecked: (moduleId: string, permission: string) => boolean;
  handlePermissionChange: (moduleId: string, permission: string, checked: boolean) => void;
}

const ModulesPermissionsTable = ({
  modulesList,
  isPermissionChecked,
  handlePermissionChange
}: ModulesPermissionsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[300px]">Módulo</TableHead>
          <TableHead>Permissões</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {modulesList.map(module => (
          <TableRow key={module.id}>
            <TableCell className="font-medium">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-muted-foreground" />
                {module.name}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-6">
                {module.permissions.map(permission => (
                  <div key={`${module.id}-${permission}`} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`${module.id}-${permission}`}
                      checked={isPermissionChecked(module.id, permission)}
                      onCheckedChange={(checked) => 
                        handlePermissionChange(module.id, permission, !!checked)
                      }
                    />
                    <label 
                      htmlFor={`${module.id}-${permission}`} 
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize"
                    >
                      {permission.replace('_', ' ')}
                    </label>
                  </div>
                ))}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ModulesPermissionsTable;
