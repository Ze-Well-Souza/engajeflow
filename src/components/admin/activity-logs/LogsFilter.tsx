
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { actionTypes, moduleTypes, userList } from "./mock-data";

interface LogsFilterProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedAction: string;
  setSelectedAction: (value: string) => void;
  selectedModule: string;
  setSelectedModule: (value: string) => void;
  selectedStatus: string;
  setSelectedStatus: (value: string) => void;
  selectedUser: string;
  setSelectedUser: (value: string) => void;
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
  selectedUser,
  setSelectedUser,
}) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center gap-2">
          <Filter className="h-5 w-5" /> Filtros
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por usuário, IP ou detalhes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          
          <Select value={selectedUser} onValueChange={setSelectedUser}>
            <SelectTrigger>
              <SelectValue placeholder="Usuário" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todos os Usuários</SelectItem>
              {userList.map(user => (
                <SelectItem key={user.id} value={user.email}>
                  {user.email}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
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
