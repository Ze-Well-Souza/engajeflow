
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface LogsPaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const LogsPagination: React.FC<LogsPaginationProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  // Function to create page numbers array
  const getPageNumbers = () => {
    const pageNumbers: number[] = [];
    
    // Always show first page
    if (totalPages > 0) {
      pageNumbers.push(1);
    }
    
    // Calculate start and end of the middle section
    let start = Math.max(2, currentPage - 1);
    let end = Math.min(totalPages - 1, currentPage + 1);
    
    // Adjust if we're at the start or end
    if (currentPage <= 2) {
      end = Math.min(4, totalPages - 1);
    } else if (currentPage >= totalPages - 1) {
      start = Math.max(totalPages - 3, 2);
    }
    
    // If there's a gap after page 1, add ellipsis
    if (start > 2) {
      pageNumbers.push(-1); // Use -1 to represent ellipsis
    }
    
    // Add middle pages
    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }
    
    // If there's a gap before the last page, add ellipsis
    if (end < totalPages - 1) {
      pageNumbers.push(-2); // Use -2 to represent ellipsis
    }
    
    // Always show last page if there is more than one page
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };

  return (
    <div className="py-4 flex items-center justify-between px-4">
      <div className="text-sm text-muted-foreground">
        Página <span className="font-medium">{currentPage}</span> de{" "}
        <span className="font-medium">{totalPages}</span>
      </div>
      
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              aria-disabled={currentPage === 1}
            />
          </PaginationItem>
          
          {getPageNumbers().map((pageNumber, index) => {
            // Render ellipsis
            if (pageNumber < 0) {
              return (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }
            
            // Render page number
            return (
              <PaginationItem key={`page-${pageNumber}`}>
                <PaginationLink 
                  isActive={currentPage === pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          
          <PaginationItem>
            <PaginationNext
              onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              aria-disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default LogsPagination;
