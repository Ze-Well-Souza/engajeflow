
import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ActivityLog } from "@/types";
import ActionBadge from "./ActionBadge";

export const useLogsTableColumns = () => {
  const columns = useMemo<ColumnDef<ActivityLog>[]>(() => [
    {
      accessorKey: "timestamp",
      header: "Date",
      cell: ({ row }) => format(new Date(row.getValue("timestamp")), "MMMM d, yyyy hh:mm a"),
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => <ActionBadge action={row.original.action} />,
    },
    {
      accessorKey: "module",
      header: "Módulo",
    },
    {
      accessorKey: "details",
      header: "Descrição",
    },
  ], []);

  return columns;
};

export default useLogsTableColumns;
