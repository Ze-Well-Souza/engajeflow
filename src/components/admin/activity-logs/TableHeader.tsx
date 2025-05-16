
import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";

interface TableHeaderProps<T> {
  headerGroups: ReturnType<ReturnType<typeof getHeaderGroups<T>>["getHeaderGroups"]>;
}

const getHeaderGroups = <T,>() => ({ getHeaderGroups: () => [] as any });

const TableHeader = <T,>({ headerGroups }: TableHeaderProps<T>) => {
  return (
    <TableHeader>
      {headerGroups.map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableHead key={header.id}>
              {header.isPlaceholder
                ? null
                : flexRender(header.column.columnDef.header, header.getContext())}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  );
};

export default TableHeader;
