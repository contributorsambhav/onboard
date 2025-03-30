"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

export default function DataTable({ columns, data }) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const table = useReactTable({
    data,
    columns,
    initialState: {
      pagination: {
        pageSize: 7, // thala for a reason
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  // Handler for when a row is clicked
  const handleRowClick = (row) => {
    setSelectedRow(row);
    setDialogOpen(true);
  };

  return (
    <div>
      <div className="rounded-md border border-neutral-100">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => handleRowClick(row)}
                  className="cursor-pointer hover:bg-neutral-50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      <span
                        className={
                          cell.column.id === "paymentMethod"
                            ? cell.getValue().toUpperCase() === "USDC" ||
                              cell.getValue().toUpperCase() === "USDT"
                              ? "flex justify-center w-fit items-center text-green-900 px-3 bg-green-100 border border-green-200 text-xs py-0.5 rounded-full"
                              : "text-red-900 border text-xs border-red-200 bg-red-50 rounded-full px-3 py-0.5"
                            : cell.column.id === "email"
                            ? "block max-w-32 md:max-w-xs truncate text-sm"
                            : ""
                        }
                        title={
                          cell.column.id === "email" ? cell.getValue() : ""
                        }
                      >
                        {cell.column.id === "email"
                          ? cell.getValue()
                          : flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                      </span>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>

      {/* ShadCN Dialog for showing row details */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Row Details</DialogTitle>
            <DialogDescription>
  {selectedRow ? (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="px-4 py-2 font-medium text-neutral-700">Name</td>
            <td className="px-4 py-2 text-neutral-900">{selectedRow.original.name}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-medium text-neutral-700">Email</td>
            <td className="px-4 py-2 text-neutral-900">{selectedRow.original.email}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-medium text-neutral-700">Country</td>
            <td className="px-4 py-2 text-neutral-900">{selectedRow.original.country}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-medium text-neutral-700">Payment Method</td>
            <td className="px-4 py-2 text-neutral-900">{selectedRow.original.paymentMethod}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-medium text-neutral-700">Amount</td>
            <td className="px-4 py-2 text-neutral-900">{selectedRow.original.amount}</td>
          </tr>
        </tbody>
      </table>
    </div>
  ) : (
    "No details available."
  )}
</DialogDescription>


          </DialogHeader>
          <DialogClose asChild>
            <Button onClick={() => setDialogOpen(false)}>Close</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
}
