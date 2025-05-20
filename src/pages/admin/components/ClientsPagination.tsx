
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface ClientsPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const ClientsPagination: React.FC<ClientsPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Não exibir paginação se houver apenas uma página
  if (totalPages <= 1) return null;

  // Criar array de páginas para mostrar (máximo de 5 páginas)
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // Mostrar todas as páginas se tivermos menos que o máximo
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Lógica para mostrar paginação com elipses
      if (currentPage <= 3) {
        // Caso 1: Página atual está no início
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push(-1); // Marcador para elipse
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Caso 2: Página atual está no final
        pages.push(1);
        pages.push(-1); // Marcador para elipse
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Caso 3: Página atual está no meio
        pages.push(1);
        pages.push(-1); // Marcador para elipse
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push(-1); // Marcador para elipse
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <Pagination className="mt-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
            aria-disabled={currentPage === 1}
          />
        </PaginationItem>

        {getPageNumbers().map((pageNumber, index) => (
          pageNumber === -1 ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <span className="flex h-9 w-9 items-center justify-center">...</span>
            </PaginationItem>
          ) : (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                isActive={currentPage === pageNumber}
                onClick={() => onPageChange(pageNumber)}
                className="cursor-pointer"
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          )
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
            className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
            aria-disabled={currentPage >= totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default ClientsPagination;
