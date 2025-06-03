
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Download, FileType, Calendar } from "lucide-react";

interface LogsExportProps {
  onExport: (format: string, dateRange: string) => void;
  onClose: () => void;
  filteredCount: number;
}

const LogsExport: React.FC<LogsExportProps> = ({ onExport, onClose, filteredCount }) => {
  const [format, setFormat] = useState("csv");
  const [dateRange, setDateRange] = useState("current");

  const handleExport = () => {
    onExport(format, dateRange);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Exportar Logs</DialogTitle>
          <DialogDescription>
            Selecione as opções para exportar {filteredCount} logs filtrados.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="format" className="text-right">
              <FileType className="h-4 w-4 mr-2 inline-block" />
              Formato
            </Label>
            <Select
              value={format}
              onValueChange={setFormat}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione o formato" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="json">JSON</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dateRange" className="text-right">
              <Calendar className="h-4 w-4 mr-2 inline-block" />
              Período
            </Label>
            <Select
              value={dateRange}
              onValueChange={setDateRange}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione o período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">Resultados atuais</SelectItem>
                <SelectItem value="today">Hoje</SelectItem>
                <SelectItem value="week">Últimos 7 dias</SelectItem>
                <SelectItem value="month">Últimos 30 dias</SelectItem>
                <SelectItem value="all">Todos os registros</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleExport} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LogsExport;
