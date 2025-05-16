
import { useState } from "react";

export const usePagination = <T>(items: T[], itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  // Paginação
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(items.length / itemsPerPage);
  
  return {
    currentPage,
    setCurrentPage,
    currentItems,
    totalPages
  };
};
