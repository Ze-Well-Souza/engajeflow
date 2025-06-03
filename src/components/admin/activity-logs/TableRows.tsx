
import React from "react";
import { RowModel } from "@tanstack/react-table";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";
import { ActivityLog } from "@/types";

interface TableRowsProps {
  rowModel: RowModel<ActivityLog>;
  columns: any[];
  onRowClick: (log: ActivityLog) => void;
}

const TableRows: React.FC<TableRowsProps> = ({ rowModel, columns, onRowClick }) => {
  return (
    <TableBody>
      {rowModel.rows.length ? (
        rowModel.rows.map((row) => (
          <TableRow
            key={row.id}
            data-state={row.getIsSelected() && "selected"}
            onClick={() => onRowClick(row.original)}
            className="cursor-pointer"
          >
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={columns.length} className="h-24 text-center">
            Nenhum resultado.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};

export default TableRows;
