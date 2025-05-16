
import React from "react";
import { HeaderGroup } from "@tanstack/react-table";
import { TableHead, TableHeader as UITableHeader, TableRow } from "@/components/ui/table";

interface TableHeaderProps<T> {
  headerGroups: HeaderGroup<T>[];
}

const LogsTableHeader = <T,>({ headerGroups }: TableHeaderProps<T>) => {
  return (
    <UITableHeader>
      {headerGroups.map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableHead key={header.id}>
              {header.isPlaceholder
                ? null
                : header.column.columnDef.header}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </UITableHeader>
  );
};

export default LogsTableHeader;
