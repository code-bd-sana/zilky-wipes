"use client";

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
  Plus,
  Settings2,
  Users,
} from "lucide-react";
import { useState } from "react";

type OrderStatus =
  | "Processing"
  | "Paid"
  | "Shipped"
  | "Delivered"
  | "Canceled"
  | "Previous client";

type ProductRow = {
  id: string;
  orderId: string;
  date: string;
  customer: string;
  items: number;
  amount: number;
  orderStatus: OrderStatus;
};

const STATUS_STYLES: Record<OrderStatus, string> = {
  Processing: "bg-[#FDF2F8] text-[#BE185D]",
  Paid: "bg-[#ECFDF5] text-[#047857]",
  Shipped: "bg-[#F0F9FF] text-[#0369A1]",
  Delivered: "bg-[#F5F3FF] text-[#6D28D9]",
  Canceled: "bg-[#FFF1F2] text-[#BE123C]",
  "Previous client": "bg-[#E6F7F7] text-[#064B46]",
};

const products: ProductRow[] = [
  {
    id: "1",
    orderId: "#1245321",
    date: "01/08/2026",
    customer: "John Doe",
    items: 4,
    amount: 180,
    orderStatus: "Processing",
  },
  {
    id: "2",
    orderId: "#1245330",
    date: "02/08/2026",
    customer: "Jessica Rodriguez",
    items: 6,
    amount: 200,
    orderStatus: "Paid",
  },
  {
    id: "3",
    orderId: "#1245327",
    date: "03/08/2026",
    customer: "Michael Brown",
    items: 7,
    amount: 280,
    orderStatus: "Shipped",
  },
  {
    id: "4",
    orderId: "#1245328",
    date: "04/08/2026",
    customer: "Chris Martinez",
    items: 12,
    amount: 140,
    orderStatus: "Delivered",
  },
  {
    id: "5",
    orderId: "#1245323",
    date: "05/08/2026",
    customer: "Matthew King",
    items: 9,
    amount: 100,
    orderStatus: "Canceled",
  },
  {
    id: "6",
    orderId: "#1245325",
    date: "06/08/2026",
    customer: "Daniel Lee",
    items: 2,
    amount: 220,
    orderStatus: "Processing",
  },
  {
    id: "7",
    orderId: "#1245329",
    date: "07/08/2026",
    customer: "David Wilson",
    items: 13,
    amount: 240,
    orderStatus: "Delivered",
  },
  {
    id: "8",
    orderId: "#1245322",
    date: "08/08/2026",
    customer: "Samantha Hernandez",
    items: 14,
    amount: 160,
    orderStatus: "Previous client",
  },
  {
    id: "9",
    orderId: "#1245326",
    date: "09/08/2026",
    customer: "Laura Garcia",
    items: 10,
    amount: 120,
    orderStatus: "Shipped",
  },
  {
    id: "10",
    orderId: "#1245332",
    date: "10/08/2026",
    customer: "Sarah Davis",
    items: 3,
    amount: 260,
    orderStatus: "Processing",
  },
  {
    id: "11",
    orderId: "#1245331",
    date: "11/08/2026",
    customer: "Jane Smith",
    items: 8,
    amount: 80,
    orderStatus: "Delivered",
  },
  {
    id: "12",
    orderId: "#1245324",
    date: "12/08/2026",
    customer: "Emily Johnson",
    items: 5,
    amount: 300,
    orderStatus: "Shipped",
  },
  {
    id: "13",
    orderId: "#1245321",
    date: "13/08/2026",
    customer: "John Doe",
    items: 11,
    amount: 320,
    orderStatus: "Paid",
  },
];

const columns: DashboardTableColumn<ProductRow>[] = [
  {
    id: "order-name",
    header: "Order",
    icon: Package,
    widthClassName: "w-[15%]",
    cell: (row) => <span>{row.orderId}</span>,
  },
  {
    id: "date",
    header: "Date",
    icon: Calendar,
    widthClassName: "w-[15%]",
    cell: (row) => <span>{row.date}</span>,
  },
  {
    id: "customer",
    header: "Customer",
    icon: Users,
    widthClassName: "w-[13%]",
    cell: (row) => <span>{row.customer}</span>,
  },
  {
    id: "item",
    header: "Items",
    icon: ListIndentIncrease,
    widthClassName: "w-[13%]",
    cell: (row) => <span>{row.items}</span>,
  },
  {
    id: "amount",
    header: "Amount",
    icon: DollarSign,
    widthClassName: "w-[13%]",
    cell: (row) => <span>${row.amount.toFixed(2)}</span>,
  },
  {
    id: "order-status",
    header: "Order Status",
    icon: Loader,
    widthClassName: "w-[13%]",
    cell: (row) => (
      <span
        className={`inline-flex items-center rounded-[6px] px-2.5 py-0.5 text-xs font-base ${STATUS_STYLES[row.orderStatus]}`}>
        {row.orderStatus}
      </span>
    ),
  },
  {
    id: "action",
    header: "Action",
    icon: Forward,
    widthClassName: "w-[24%]",
    cell: () => (
      <div className='flex items-center gap-2'>
        <button
          type='button'
          className='inline-flex items-center gap-1 rounded-md border border-[#E5E7EB] bg-[#FAFAF9] px-2.5 py-1 text-sm text-[#262626] transition-colors hover:bg-[#efefef] cursor-pointer'>
          <Plus className='h-3.5 w-3.5' color='#262626' />
          <span>Add internal note</span>
          <span className='bg-white p-1 rounded-lg text-[#262626] text-[8px]'>
            01
          </span>
        </button>
        <button
          type='button'
          className='inline-flex items-center gap-1 rounded-md border border-[#E5E7EB] bg-[#FAFAF9] px-2.5 py-1 text-sm text-[#262626] transition-colors hover:bg-[#efefef] cursor-pointer'>
          <span>View More</span>
        </button>
      </div>
    ),
  },
];

export default function OrderListPage() {
  const [customDateRange, setCustomDateRange] = useState<
    DateRange | undefined
  >();

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

  return (
    <section className=''>
      <DashboardDataTable
        filterAction={{ label: "Filter", icon: ListFilter }}
        filterMenu={productFilterMenu}
        searchPlaceholder='Search Products, Status'
        data={products}
        columns={columns}
        getRowId={(row) => row.id}
        searchPredicate={(row, query) => {
          const text = `${row.orderId} ${row.customer} ${row.orderStatus}`;
          return text.toLowerCase().includes(query);
        }}
        pageSizeOptions={[5, 10, 20, 50]}
        defaultPageSize={10}
      />
    </section>
  );
}
