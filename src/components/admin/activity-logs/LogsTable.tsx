
import { useState } from "react";
import {
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableCaption,
} from "@/components/ui/table";
import { ActivityLog } from "@/types";
import LogDetailsModal from "./LogDetailsModal";
import useLogsTableColumns from "./useLogsTableColumns";
import LogsTableHeader from "./TableHeader";
import TableRows from "./TableRows";
import EmptyLogs from "./EmptyLogs";

interface LogsTableProps {
  data: ActivityLog[]
}

export function LogsTable({ data }: LogsTableProps) {
  const [open, setOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState<ActivityLog | null>(null);
  const columns = useLogsTableColumns();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleRowClick = (log: ActivityLog) => {
    setSelectedLog(log);
    setOpen(true);
  };

  if (data.length === 0) {
    return <EmptyLogs />;
  }

  return (
    <>
      <Table>
        <TableCaption>Logs de Atividades</TableCaption>
        <LogsTableHeader headerGroups={table.getHeaderGroups()} />
        <TableRows 
          rowModel={table.getRowModel()} 
          columns={columns} 
          onRowClick={handleRowClick} 
        />
      </Table>
      
      {selectedLog && (
        <LogDetailsModal
          open={open}
          setOpen={setOpen}
          log={selectedLog}
        />
      )}
    </>
  );
}

export default LogsTable;
