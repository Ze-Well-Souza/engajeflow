
import React from "react";
import { Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AgendamentosFilterProps {
  platformFilter: string;
  statusFilter: string;
  onPlatformFilterChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
}

const AgendamentosFilter: React.FC<AgendamentosFilterProps> = ({
  platformFilter,
  statusFilter,
  onPlatformFilterChange,
  onStatusFilterChange,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center mb-4">
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-gray-500" />
        <span className="text-sm font-medium">Filtros:</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full md:w-auto">
        <div className="w-full md:w-48">
          <Select value={platformFilter} onValueChange={onPlatformFilterChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Plataforma" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as plataformas</SelectItem>
              <SelectItem value="instagram">Instagram</SelectItem>
              <SelectItem value="facebook">Facebook</SelectItem>
              <SelectItem value="youtube">YouTube</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full md:w-48">
          <Select value={statusFilter} onValueChange={onStatusFilterChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
              <SelectItem value="pending">Pendentes</SelectItem>
              <SelectItem value="processing">Em processamento</SelectItem>
              <SelectItem value="posted">Publicados</SelectItem>
              <SelectItem value="failed">Falhas</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default AgendamentosFilter;
