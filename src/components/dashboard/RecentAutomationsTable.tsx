import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRecentAutomations } from "@/hooks/useRecentAutomations";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, RefreshCw, Eye, PlayCircle } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

// Mapeamento de status para cores de badge
const STATUS_COLORS = {
  pending: "bg-blue-500 hover:bg-blue-600",
  processing: "bg-yellow-500 hover:bg-yellow-600",
  completed: "bg-green-500 hover:bg-green-600",
  failed: "bg-red-500 hover:bg-red-600",
  cancelled: "bg-gray-500 hover:bg-gray-600"
};

// Tradução dos status para português
const STATUS_LABELS = {
  pending: "Pendente",
  processing: "Em Processamento",
  completed: "Concluído",
  failed: "Falhou",
  cancelled: "Cancelado"
};

export const RecentAutomationsTable: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const { 
    automations,
    isLoading,
    error,
    totalCount,
    totalPages,
    refreshAutomations
  } = useRecentAutomations(5, currentPage);

  // Função para formatar data
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return format(new Date(dateString), "dd/MM/yyyy HH:mm", { locale: ptBR });
  };

  // Função para navegar entre páginas
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Função para reexecutar uma automação (simulada)
  const handleRerun = (id: string) => {
    console.log(`Reexecutando automação ${id}`);
    // Aqui seria implementada a lógica real para reexecutar a automação
    alert(`Automação ${id} reexecutada com sucesso!`);
  };

  // Função para visualizar detalhes (simulada)
  const handleViewDetails = (id: string) => {
    console.log(`Visualizando detalhes da automação ${id}`);
    // Aqui seria implementada a navegação para a página de detalhes
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Automações Recentes</CardTitle>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => refreshAutomations()}
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-10 w-full bg-gray-700" />
            <Skeleton className="h-10 w-full bg-gray-700" />
            <Skeleton className="h-10 w-full bg-gray-700" />
            <Skeleton className="h-10 w-full bg-gray-700" />
            <Skeleton className="h-10 w-full bg-gray-700" />
          </div>
        ) : error ? (
          <div className="text-red-500 p-4 text-center">
            Erro ao carregar automações: {error}
          </div>
        ) : automations.length === 0 ? (
          <div className="text-gray-400 p-4 text-center">
            Nenhuma automação encontrada
          </div>
        ) : (
          <>
            <div className="rounded-md border border-gray-700">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">Data</TableHead>
                    <TableHead className="hidden lg:table-cell">Cliente</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {automations.map((automation) => (
                    <TableRow key={automation.id}>
                      <TableCell className="font-medium">{automation.task_type}</TableCell>
                      <TableCell>
                        <Badge className={STATUS_COLORS[automation.status as keyof typeof STATUS_COLORS]}>
                          {STATUS_LABELS[automation.status as keyof typeof STATUS_LABELS]}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {formatDate(automation.created_at)}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {automation.client_name || 'N/A'}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleViewDetails(automation.id)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {automation.status === 'failed' && (
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleRerun(automation.id)}
                            >
                              <PlayCircle className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {/* Paginação */}
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-400">
                Mostrando {automations.length} de {totalCount} automações
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm">
                  Página {currentPage} de {totalPages}
                </span>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentAutomationsTable;
