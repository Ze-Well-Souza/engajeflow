
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { actionTypes, moduleTypes } from "./mock-data";

interface LogsFilterProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedAction: string;
  setSelectedAction: (value: string) => void;
  selectedModule: string;
  setSelectedModule: (value: string) => void;
  selectedStatus: string;
  setSelectedStatus: (value: string) => void;
}

const LogsFilter: React.FC<LogsFilterProps> = ({
  searchTerm,
  setSearchTerm,
  selectedAction,
  setSelectedAction,
  selectedModule,
  setSelectedModule,
  selectedStatus,
  setSelectedStatus,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Filtros</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por usuário, IP ou detalhes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          
          <Select value={selectedAction} onValueChange={setSelectedAction}>
            <SelectTrigger>
              <SelectValue placeholder="Tipo de Ação" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todas as Ações</SelectItem>
              {actionTypes.map(action => (
                <SelectItem key={action} value={action}>
                  {action}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedModule} onValueChange={setSelectedModule}>
            <SelectTrigger>
              <SelectValue placeholder="Módulo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todos os Módulos</SelectItem>
              {moduleTypes.map(module => (
                <SelectItem key={module} value={module}>
                  {module}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todos os Status</SelectItem>
              <SelectItem value="success">Sucesso</SelectItem>
              <SelectItem value="error">Erro</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default LogsFilter;
