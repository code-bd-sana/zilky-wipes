"use client";

import { useState } from "react";
import DashboardDataTable, {
  type DashboardFilterMenuConfig,
  type DashboardTableColumn,
} from "@/components/shared/dashboard-data-table";
import DateRangePicker, {
  type DateRange,
} from "@/components/shared/date-range-picker";
import {
  Calendar,
  CalendarDays,
  DollarSign,
  Forward,
  IndentIncrease,
  ListFilter,
  ListIndentIncrease,
  Loader,
  Package,
  PackageCheck,
  Settings2,
  Users,
} from "lucide-react";
import OrderDetail from "./order-details";
import { useGetOrders } from "@/hooks/useOrders";
import type { BackendOrder } from "@/lib/api/orders";

const STATUS_STYLES: Record<BackendOrder["status"], string> = {
  PROCESSING: "bg-[#FDF2F8] text-[#BE185D]",
  PENDING: "bg-[#FDF2F8] text-[#BE185D]",
  SHIPPED: "bg-[#EFF6FF] text-[#1D4ED8]",
  DELIVERED: "bg-[#F5F3FF] text-[#6D28D9]",
  CANCELLED: "bg-[#FFF1F2] text-[#BE123C]",
};

export default function OrderListPage() {
  const [selectedOrder, setSelectedOrder] = useState<BackendOrder | null>(null);
  const [customDateRange, setCustomDateRange] = useState<
    DateRange | undefined
  >();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState("");

  const { data: ordersResponse, isLoading } = useGetOrders({ page, limit, searchTerm: query });

  const handleSeeDetails = (row: BackendOrder) => {
    setSelectedOrder(row);
  };

  const columns: DashboardTableColumn<BackendOrder>[] = [
    {
      id: "order-name",
      header: "Order",
      icon: Package,
      widthClassName: "w-[15%]",
      cell: (row) => <span className="font-medium">{row.orderNumber}</span>,
    },
    {
      id: "date",
      header: "Date",
      icon: Calendar,
      widthClassName: "w-[15%]",
      cell: (row) => <span>{new Date(row.createdAt).toLocaleDateString()}</span>,
    },
    {
      id: "customer",
      header: "Customer",
      icon: Users,
      widthClassName: "w-[20%]",
      cell: (row) => <span>{row.shippingFirstName} {row.shippingLastName}</span>,
    },
    {
      id: "item",
      header: "Items",
      icon: ListIndentIncrease,
      widthClassName: "w-[10%]",
      cell: (row) => <span>{row.items?.reduce((acc, item) => acc + item.quantity, 0) || 0}</span>,
    },
    {
      id: "amount",
      header: "Amount",
      icon: DollarSign,
      widthClassName: "w-[15%]",
      cell: (row) => <span>${row.total.toFixed(2)}</span>,
    },
    {
      id: "order-status",
      header: "Order Status",
      icon: Loader,
      widthClassName: "w-[15%]",
      cell: (row) => (
        <span
          className={`inline-flex items-center rounded-[6px] px-2.5 py-0.5 text-xs font-base ${STATUS_STYLES[row.status] || "bg-gray-100 text-gray-800"}`}>
          {row.status}
        </span>
      ),
    },
    {
      id: "action",
      header: "Action",
      icon: Forward,
      widthClassName: "w-[10%]",
      cell: (row) => (
        <div className='flex items-center gap-2'>
          <button
            type='button'
            onClick={() => handleSeeDetails(row)}
            className='inline-flex items-center gap-1 rounded-md border border-[#E5E7EB] bg-[#FAFAF9] px-2.5 py-1 text-sm text-[#262626] transition-colors hover:bg-[#efefef] cursor-pointer'>
            <span>View More</span>
          </button>
        </div>
      ),
    },
  ];

  const productFilterMenu: DashboardFilterMenuConfig = {
    searchPlaceholder: "Search...",
    groups: [
      {
        id: "date-range",
        label: "Date range",
        icon: CalendarDays,
        options: [
          { id: "last-30-days", label: "Last 30 Days" },
          { id: "last-10-days", label: "Last 10 Days" },
          { id: "today", label: "Today" },
          {
            id: "custom",
            label: "Custom",
            icon: Settings2,
            keepMenuOpen: true,
            customContent: (
              <DateRangePicker
                value={customDateRange}
                onChange={setCustomDateRange}
                onApply={(range) => {
                  setCustomDateRange(range);
                  // TODO: filter data by range
                  console.log("Applied date range:", range);
                }}
              />
            ),
          },
        ],
      },
      {
        id: "stock-status",
        label: "Stock Status",
        icon: IndentIncrease,
        options: [
          { id: "all", label: "All" },
          { id: "in-stock", label: "In Stock" },
          { id: "low-stock", label: "Low Stock" },
          { id: "out-of-stock", label: "Out of Stock" },
        ],
      },
      {
        id: "product-type",
        label: "Product Type",
        icon: PackageCheck,
        options: [
          { id: "all-types", label: "All Types" },
          { id: "wipes", label: "Wipes" },
          { id: "towels", label: "Towels" },
          { id: "cloths", label: "Cloths" },
        ],
      },
    ],
  };

    if (isLoading) {
      return <div className="p-8 text-center text-gray-500">Loading orders...</div>;
    }
  
    return (
      <section className=''>
        <DashboardDataTable
          filterAction={{ label: "Filter", icon: ListFilter }}
          filterMenu={productFilterMenu}
          searchPlaceholder='Search Orders...'
          data={ordersResponse?.data || []}
          columns={columns}
          getRowId={(row) => row.id}
          searchPredicate={(row, query) => {
            const text = `${row.orderNumber} ${row.shippingFirstName} ${row.shippingLastName} ${row.status}`;
            return text.toLowerCase().includes(query.toLowerCase());
          }}
          pageSizeOptions={[10, 20, 50]}
          defaultPageSize={10}
        />
        <OrderDetail
          key={selectedOrder?.id ?? "order-detail-empty"}
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      </section>
    );
  }
