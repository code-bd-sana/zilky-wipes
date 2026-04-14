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
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

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

export type DashboardFilterOption = {
  id: string;
  label: string;
  icon?: LucideIcon;
  onSelect?: () => void;
  keepMenuOpen?: boolean;
  customContent?: ReactNode;
};

export type DashboardFilterGroup = {
  id: string;
  label: string;
  icon?: LucideIcon;
  options?: DashboardFilterOption[];
  onSelect?: () => void;
};

export type DashboardFilterMenuConfig = {
  searchPlaceholder?: string;
  groups: DashboardFilterGroup[];
  onSelect?: (selection: { groupId: string; optionId?: string }) => void;
};

export type DashboardDataTableProps<T> = {
  filterAction?: DashboardTableAction;
  filterMenu?: DashboardFilterMenuConfig;
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
  filterMenu,
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
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [filterMenuQuery, setFilterMenuQuery] = useState("");
  const [activeFilterGroupId, setActiveFilterGroupId] = useState<string | null>(
    null,
  );
  const [activeFilterOptionKey, setActiveFilterOptionKey] = useState<
    string | null
  >(null);
  const filterMenuRef = useRef<HTMLDivElement | null>(null);
  const filterPanelsRef = useRef<HTMLDivElement | null>(null);
  const groupButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [subMenuTop, setSubMenuTop] = useState(0);
  const resolvedDefaultPageSize =
    defaultPageSize && pageSizeOptions.includes(defaultPageSize)
      ? defaultPageSize
      : (pageSizeOptions[0] ?? 10);
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
  const filterButtonLabel = filterAction?.label ?? "Filter";
  const FilterButtonIcon = filterAction?.icon ?? Filter;

  const visibleFilterGroups = useMemo(() => {
    if (!filterMenu) {
      return [];
    }

    const normalized = filterMenuQuery.trim().toLowerCase();

    if (!normalized) {
      return filterMenu.groups;
    }

    return filterMenu.groups
      .map((group) => {
        const groupMatches = group.label.toLowerCase().includes(normalized);
        const matchedOptions =
          group.options?.filter((option) =>
            option.label.toLowerCase().includes(normalized),
          ) ?? [];

        if (!groupMatches && matchedOptions.length === 0) {
          return null;
        }

        if (group.options) {
          return {
            ...group,
            options: groupMatches ? group.options : matchedOptions,
          };
        }

        return group;
      })
      .filter((group): group is DashboardFilterGroup => group !== null);
  }, [filterMenu, filterMenuQuery]);

  const activeFilterGroup =
    visibleFilterGroups.find((group) => group.id === activeFilterGroupId) ??
    visibleFilterGroups[0] ??
    null;

  const activeCustomOption =
    activeFilterGroup?.options?.find(
      (option) => `${activeFilterGroup.id}:${option.id}` === activeFilterOptionKey,
    ) ?? null;

  const hasExpandedCustomContent = Boolean(activeCustomOption?.customContent);

  const activeGroupIdForSubmenu = activeFilterGroup?.id ?? null;

  const handleFilterButtonClick = () => {
    if (!filterMenu) {
      filterAction?.onClick?.();
      return;
    }

    setIsFilterMenuOpen((previous) => {
      const next = !previous;
      if (next && !activeFilterGroupId) {
        setActiveFilterGroupId(filterMenu.groups[0]?.id ?? null);
      }
      return next;
    });
  };

  const closeFilterMenu = () => {
    setIsFilterMenuOpen(false);
    setFilterMenuQuery("");
    setActiveFilterOptionKey(null);
  };

  const handleFilterGroupSelect = (group: DashboardFilterGroup) => {
    if (group.options?.length) {
      setActiveFilterGroupId(group.id);
      setActiveFilterOptionKey(null);
      return;
    }

    group.onSelect?.();
    filterMenu?.onSelect?.({ groupId: group.id });
    closeFilterMenu();
  };

  const handleFilterOptionSelect = (
    group: DashboardFilterGroup,
    option: DashboardFilterOption,
  ) => {
    option.onSelect?.();
    filterMenu?.onSelect?.({ groupId: group.id, optionId: option.id });

    const optionKey = `${group.id}:${option.id}`;
    if (option.keepMenuOpen || option.customContent) {
      setActiveFilterOptionKey((previous) =>
        previous === optionKey ? null : optionKey,
      );
      return;
    }

    closeFilterMenu();
  };

  useEffect(() => {
    if (!isFilterMenuOpen) {
      return;
    }

    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) {
        return;
      }

      if (filterMenuRef.current?.contains(target)) {
        return;
      }

      closeFilterMenu();
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isFilterMenuOpen]);

  useEffect(() => {
    if (!isFilterMenuOpen || !activeGroupIdForSubmenu) {
      return;
    }

    const panelsElement = filterPanelsRef.current;
    const buttonElement = groupButtonRefs.current[activeGroupIdForSubmenu];

    if (!panelsElement || !buttonElement) {
      return;
    }

    const panelsRect = panelsElement.getBoundingClientRect();
    const buttonRect = buttonElement.getBoundingClientRect();
    const nextTop = buttonRect.top - panelsRect.top;
    setSubMenuTop(nextTop);
  }, [isFilterMenuOpen, activeGroupIdForSubmenu, visibleFilterGroups]);

  return (
    <section className={cn("overflow-hidden ", className)}>
      <div className='flex items-center justify-between gap-3 border-b border-[#e1e1e1] px-4 py-2'>
        {filterAction || filterMenu ? (
          <div ref={filterMenuRef} className='relative'>
            <button
              type='button'
              onClick={handleFilterButtonClick}
              className='inline-flex items-center gap-1.5 rounded-md border border-[#e4e4e4] bg-[#f7f7f7] px-2.5 py-1 text-sm text-[#5b5b5b] transition-colors hover:bg-[#efefef]'>
              <FilterButtonIcon className='h-3.5 w-3.5' />
              <span>{filterButtonLabel}</span>
            </button>

            {filterMenu && isFilterMenuOpen ? (
              <div
                ref={filterPanelsRef}
                className='absolute left-0 top-[calc(100%+6px)] z-30'>
                <div className='w-40 rounded-md border border-[#dcdcdc] bg-[#fbfbfb] p-1.5 shadow-sm'>
                  <label className='relative block'>
                    <Search className='pointer-events-none absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#9e9e9e]' />
                    <input
                      value={filterMenuQuery}
                      onChange={(event) => setFilterMenuQuery(event.target.value)}
                      placeholder={filterMenu.searchPlaceholder ?? "Search..."}
                      className='h-8 w-full rounded-md border border-[#e3e3e3] bg-[#f8f8f8] pl-7 pr-2 text-xs text-[#4d4d4d] outline-none placeholder:text-[#afafaf]'
                    />
                  </label>

                  <div className='mt-1 flex flex-col gap-0.5'>
                    {visibleFilterGroups.map((group) => {
                      const GroupIcon = group.icon;
                      const hasOptions = Boolean(group.options?.length);

                      return (
                        <button
                          key={group.id}
                          type='button'
                          ref={(element) => {
                            groupButtonRefs.current[group.id] = element;
                          }}
                          onMouseEnter={() => setActiveFilterGroupId(group.id)}
                          onClick={() => handleFilterGroupSelect(group)}
                          className={cn(
                            "flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm text-[#3f3f3f] transition-colors",
                            activeFilterGroup?.id === group.id
                              ? "bg-[#efefef]"
                              : "hover:bg-[#f1f1f1]",
                          )}>
                          <span className='inline-flex items-center gap-1.5'>
                            {GroupIcon ? <GroupIcon className='h-3.5 w-3.5 text-[#757575]' /> : null}
                            <span>{group.label}</span>
                          </span>
                          {hasOptions ? (
                            <ChevronRight className='h-3.5 w-3.5 text-[#9a9a9a]' />
                          ) : null}
                        </button>
                      );
                    })}

                    {!visibleFilterGroups.length ? (
                      <p className='px-2 py-2 text-xs text-[#9a9a9a]'>
                        No filters found.
                      </p>
                    ) : null}
                  </div>
                </div>

                {activeFilterGroup?.options?.length ? (
                  <div
                    className={cn(
                      "absolute left-[calc(100%+4px)] rounded-md border border-[#dcdcdc] bg-[#fbfbfb] p-0.5 shadow-sm",
                      hasExpandedCustomContent
                        ? "w-max max-w-[calc(100vw-2rem)]"
                        : "w-36",
                    )}
                    style={{ top: subMenuTop }}>
                    <div className='flex flex-col gap-0.5'>
                      {activeFilterGroup.options.map((option) => {
                        const OptionIcon = option.icon;
                        const optionKey = `${activeFilterGroup.id}:${option.id}`;
                        const isOptionActive = activeFilterOptionKey === optionKey;

                        return (
                          <button
                            key={option.id}
                            type='button'
                            onClick={() =>
                              handleFilterOptionSelect(activeFilterGroup, option)
                            }
                            className={cn(
                              "flex w-full items-center gap-1.5 rounded-md px-2 py-1.5 text-sm text-[#3f3f3f] transition-colors hover:bg-[#f1f1f1]",
                              isOptionActive ? "bg-[#efefef]" : null,
                            )}>
                            {OptionIcon ? (
                              <OptionIcon className='h-3.5 w-3.5 text-[#757575]' />
                            ) : null}
                            <span>{option.label}</span>
                          </button>
                        );
                      })}

                      {hasExpandedCustomContent ? (
                        <div className='mt-1 overflow-x-auto border-t border-[#e6e6e6] p-1.5'>
                          {activeCustomOption?.customContent}
                        </div>
                      ) : null}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
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
                      {Icon ? (
                        <Icon className='h-3.5 w-3.5' color='#262626' />
                      ) : null}
                      <span className='text-[#262626]'>{column.header}</span>
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
            className='inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#E5E7EB] bg-[#FAFAF9] text-[#262626] transition-colors hover:bg-[#ededed] disabled:cursor-not-allowed disabled:opacity-45'>
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
            onClick={() =>
              setCurrentPage(Math.min(totalPages, safeCurrentPage + 1))
            }
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
