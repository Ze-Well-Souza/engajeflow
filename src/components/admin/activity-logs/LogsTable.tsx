import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ActivityLog } from "@/types"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { LogDetailsModal } from "./LogDetailsModal"
import { useState } from "react"

interface LogsTableProps {
  data: ActivityLog[]
}

const renderActionColumn = (row: ActivityLog) => {
  const variant = row.action === 'delete' ? 'destructive' : row.action === 'create' || row.action === 'login' ? 'default' : 'outline';
  return (
    <Badge variant={variant}>
      {row.action}
    </Badge>
  )
}

const columns: ColumnDef<ActivityLog>[] = [
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => format(new Date(row.createdAt), "MMMM d, yyyy hh:mm a"),
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => renderActionColumn(row),
  },
  {
    accessorKey: "tableName",
    header: "Table",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
]

export function LogsTable({ data }: LogsTableProps) {
  const [open, setOpen] = useState(false)
  const [selectedLog, setSelectedLog] = useState<ActivityLog | null>(null)

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const handleRowClick = (log: ActivityLog) => {
    setSelectedLog(log)
    setOpen(true)
  }

  return (
    <>
      <Table>
        <TableCaption>Activity Logs</TableCaption>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                onClick={() => handleRowClick(row.original)}
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
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <LogDetailsModal
        open={open}
        setOpen={setOpen}
        log={selectedLog}
      />
    </>
  )
}
