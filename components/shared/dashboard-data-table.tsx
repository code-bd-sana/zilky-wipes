"use client";

import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Filter,
  Search,
  type LucideIcon,
} from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";

type ColumnAlign = "left" | "center" | "right";

export type DashboardTableColumn<T> = {
  id: string;
  header: string;
  icon?: LucideIcon;
  align?: ColumnAlign;
  widthClassName?: string;
  headerClassName?: string;
  cellClassName?: string;
  cell: (row: T, index: number) => ReactNode;
};

type DashboardTableAction = {
  label: string;
  icon?: LucideIcon;
  onClick?: () => void;
};

export type DashboardDataTableProps<T> = {
  filterAction?: DashboardTableAction;
  searchPlaceholder?: string;
  data: T[];
  columns: DashboardTableColumn<T>[];
  getRowId?: (row: T, index: number) => string;
  searchPredicate?: (row: T, query: string) => boolean;
  pageSizeOptions?: number[];
  defaultPageSize?: number;
  className?: string;
};

function alignClass(align: ColumnAlign = "left") {
  if (align === "right") {
    return "text-right";
  }

  if (align === "center") {
    return "text-center";
  }

  return "text-left";
}

export default function DashboardDataTable<T>({
  filterAction,
  searchPlaceholder = "Search...",
  data,
  columns,
  getRowId,
  searchPredicate,
  pageSizeOptions = [10, 20, 50, 100],
  defaultPageSize,
  className,
}: DashboardDataTableProps<T>) {
  const [query, setQuery] = useState("");
  const resolvedDefaultPageSize =
    defaultPageSize && pageSizeOptions.includes(defaultPageSize)
      ? defaultPageSize
      : pageSizeOptions[0] ?? 10;
  const [pageSize, setPageSize] = useState(resolvedDefaultPageSize);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return data;
    }

    if (searchPredicate) {
      return data.filter((row) => searchPredicate(row, normalizedQuery));
    }

    return data.filter((row) =>
      JSON.stringify(row).toLowerCase().includes(normalizedQuery),
    );
  }, [data, query, searchPredicate]);

  const totalItems = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedData = useMemo(() => {
    const start = (safeCurrentPage - 1) * pageSize;
    const end = start + pageSize;
    return filteredData.slice(start, end);
  }, [safeCurrentPage, pageSize, filteredData]);

  const startItem = totalItems === 0 ? 0 : (safeCurrentPage - 1) * pageSize + 1;
  const endItem = Math.min(safeCurrentPage * pageSize, totalItems);

  const pageButtons = useMemo(() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (safeCurrentPage <= 4) {
      return [1, 2, 3, 4, 5, "ellipsis-right", totalPages] as const;
    }

    if (safeCurrentPage >= totalPages - 3) {
      return [
        1,
        "ellipsis-left",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ] as const;
    }

    return [
      1,
      "ellipsis-left",
      safeCurrentPage - 1,
      safeCurrentPage,
      safeCurrentPage + 1,
      "ellipsis-right",
      totalPages,
    ] as const;
  }, [safeCurrentPage, totalPages]);

  const canGoPrev = safeCurrentPage > 1;
  const canGoNext = safeCurrentPage < totalPages;

  return (
    <section
      className={cn(
        "overflow-hidden rounded-lg border border-[#dfdfdf] bg-[#f7f7f7]",
        className,
      )}>
      <div className='flex items-center justify-between gap-3 border-b border-[#e1e1e1] px-4 py-2'>
        {filterAction ? (
          <button
            type='button'
            onClick={filterAction.onClick}
            className='inline-flex items-center gap-1.5 rounded-md border border-[#e4e4e4] bg-[#f7f7f7] px-2.5 py-1 text-sm text-[#5b5b5b] transition-colors hover:bg-[#efefef]'>
            {(filterAction.icon ?? Filter) ? (
              <>
                {(() => {
                  const Icon = filterAction.icon ?? Filter;
                  return <Icon className='h-3.5 w-3.5' />;
                })()}
              </>
            ) : null}
            <span>{filterAction.label ?? "Filter"}</span>
          </button>
        ) : (
          <span />
        )}

        <label className='relative w-full max-w-75'>
          <Search className='pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#9b9b9b]' />
          <input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setCurrentPage(1);
            }}
            placeholder={searchPlaceholder}
            className='h-8 w-full rounded-md border border-[#e2e2e2] bg-[#f8f8f8] px-2.5 pr-8 text-sm text-[#505050] outline-none placeholder:text-[#b1b1b1] focus:border-[#d4d4d4]'
          />
        </label>
      </div>

      <div className='overflow-x-auto'>
        <table className='min-w-205 w-full table-fixed border-collapse'>
          <thead>
            <tr className='border-b border-[#e1e1e1]'>
              {columns.map((column) => {
                const Icon = column.icon;

                return (
                  <th
                    key={column.id}
                    className={cn(
                      "h-10 border-r border-[#e4e4e4] px-4 text-sm font-normal text-[#494949] last:border-r-0",
                      alignClass(column.align),
                      column.widthClassName,
                      column.headerClassName,
                    )}>
                    <span className='inline-flex items-center gap-1.5'>
                      {Icon ? <Icon className='h-3.5 w-3.5 text-[#7c7c7c]' /> : null}
                      <span>{column.header}</span>
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {paginatedData.length ? (
              paginatedData.map((row, rowIndex) => (
                <tr key={getRowId ? getRowId(row, rowIndex) : String(rowIndex)}>
                  {columns.map((column) => (
                    <td
                      key={column.id}
                      className={cn(
                        "h-11 border-r border-b border-[#e9e9e9] px-4 text-sm text-[#3f3f3f] last:border-r-0",
                        alignClass(column.align),
                        column.widthClassName,
                        column.cellClassName,
                      )}>
                      {column.cell(row, rowIndex)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className='h-16 border-b border-[#e9e9e9] px-4 text-center text-sm text-[#8e8e8e]'>
                  No rows found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className='flex flex-col gap-3 border-t border-[#e1e1e1] px-4 py-2.5 md:flex-row md:items-center md:justify-between'>
        <div className='flex items-center gap-2 text-sm text-[#707070]'>
          <span>Rows per page</span>
          <select
            value={pageSize}
            onChange={(event) => {
              setPageSize(Number(event.target.value));
              setCurrentPage(1);
            }}
            className='h-8 rounded-md border border-[#dddddd] bg-[#f8f8f8] px-2 text-sm text-[#4d4d4d] outline-none'>
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <span className='text-[#9a9a9a]'>
            {startItem}-{endItem} of {totalItems}
          </span>
        </div>

        <div className='flex items-center gap-1.5'>
          <button
            type='button'
            onClick={() => setCurrentPage(1)}
            disabled={!canGoPrev}
            className='inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#e0e0e0] bg-[#f7f7f7] text-[#6d6d6d] transition-colors hover:bg-[#ededed] disabled:cursor-not-allowed disabled:opacity-45'>
            <ChevronsLeft className='h-3.5 w-3.5' />
          </button>
          <button
            type='button'
            onClick={() => setCurrentPage(Math.max(1, safeCurrentPage - 1))}
            disabled={!canGoPrev}
            className='inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#e0e0e0] bg-[#f7f7f7] text-[#6d6d6d] transition-colors hover:bg-[#ededed] disabled:cursor-not-allowed disabled:opacity-45'>
            <ChevronLeft className='h-3.5 w-3.5' />
          </button>

          {pageButtons.map((value) =>
            typeof value === "number" ? (
              <button
                key={value}
                type='button'
                onClick={() => setCurrentPage(value)}
                className={cn(
                  "inline-flex h-8 min-w-8 items-center justify-center rounded-md border px-2 text-sm transition-colors",
                  value === safeCurrentPage
                    ? "border-[#cfcfcf] bg-[#e9e9e9] text-[#3a3a3a]"
                    : "border-[#e0e0e0] bg-[#f7f7f7] text-[#6d6d6d] hover:bg-[#ededed]",
                )}>
                {value}
              </button>
            ) : (
              <span key={value} className='px-1 text-[#9e9e9e]'>
                ...
              </span>
            ),
          )}

          <button
            type='button'
            onClick={() => setCurrentPage(Math.min(totalPages, safeCurrentPage + 1))}
            disabled={!canGoNext}
            className='inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#e0e0e0] bg-[#f7f7f7] text-[#6d6d6d] transition-colors hover:bg-[#ededed] disabled:cursor-not-allowed disabled:opacity-45'>
            <ChevronRight className='h-3.5 w-3.5' />
          </button>
          <button
            type='button'
            onClick={() => setCurrentPage(totalPages)}
            disabled={!canGoNext}
            className='inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#e0e0e0] bg-[#f7f7f7] text-[#6d6d6d] transition-colors hover:bg-[#ededed] disabled:cursor-not-allowed disabled:opacity-45'>
            <ChevronsRight className='h-3.5 w-3.5' />
          </button>
        </div>
      </div>
    </section>
  );
}
