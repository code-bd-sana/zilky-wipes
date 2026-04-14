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
  ArrowRight,
  CalendarDays,
  Forward,
  Infinity,
  IndentIncrease,
  ListFilter,
  Loader,
  Mail,
  Package,
  PackageCheck,
  User,
  UserPlus,
  Settings2,
} from "lucide-react";
import {
  dashboardCustomers,
  type DashboardCustomerRecord,
  type DashboardCustomerStatus,
} from "@/constants/dashboard-feedback";
import CustomerDetail from "./customer-details";

type ProductRow = DashboardCustomerRecord;

const STATUS_STYLES: Record<DashboardCustomerStatus, string> = {
  Active: "bg-[#FDF2F8] text-[#BE185D]",
  "Canceled subscription": "bg-[#FFF1F2] text-[#BE123C]",
  "Paused indefinetely": "bg-[#F0F9FF] text-[#0369A1]",
  "Skipped next Delivery": "bg-[#F5F3FF] text-[#6D28D9]",
};

const products: ProductRow[] = dashboardCustomers;

export default function CustomerListPage() {
  const [selectedCustomer, setSelectedCustomer] = useState<ProductRow | null>(
    null,
  );
  const [customDateRange, setCustomDateRange] = useState<
    DateRange | undefined
  >();

  const customerFilterMenu: DashboardFilterMenuConfig = {
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
        id: "status",
        label: "Status",
        icon: IndentIncrease,
        options: [
          { id: "all", label: "All" },
          { id: "active", label: "Active" },
          { id: "canceled", label: "Canceled subs." },
          { id: "paused", label: "Paused inf." },
          { id: "skipped", label: "Skipped next" },
        ],
      },
      {
        id: "subscription-type",
        label: "Subs. Type",
        icon: PackageCheck,
        options: [
          { id: "all-types", label: "All Types" },
          { id: "starter", label: "Starter Kit" },
          { id: "family", label: "Family" },
          { id: "refill", label: "Refill" },
        ],
      },
    ],
  };

  const handleSeeDetails = (row: ProductRow) => {
    setSelectedCustomer(row);
  };

  const columns: DashboardTableColumn<ProductRow>[] = [
    {
      id: "name",
      header: "Name",
      icon: User,
      widthClassName: "w-[15%]",
      cell: (row) => <span>{row.name}</span>,
    },
    {
      id: "email",
      header: "Email",
      icon: Mail,
      widthClassName: "w-[15%]",
      cell: (row) => <span>{row.email}</span>,
    },
    {
      id: "order",
      header: "Order",
      icon: Package,
      widthClassName: "w-[15%]",
      cell: (row) => <span>{row.order}</span>,
    },
    {
      id: "frequency",
      header: "Frequency",
      icon: Infinity,
      widthClassName: "w-[15%]",
      cell: (row) => <span>{row.frequency}</span>,
    },
    {
      id: "order-status",
      header: "Status",
      icon: Loader,
      widthClassName: "w-[15%]",
      cell: (row) => (
        <span
          className={`inline-flex items-center rounded-[6px] px-2.5 py-0.5 text-xs font-base ${STATUS_STYLES[row.status]}`}>
          {row.status}
        </span>
      ),
    },
    {
      id: "joined",
      header: "Joined",
      icon: UserPlus,
      widthClassName: "w-[15%]",
      cell: (row) => <span>{row.joined}</span>,
    },
    {
      id: "action",
      header: "Action",
      icon: Forward,
      widthClassName: "w-[20%]",
      cell: (row) => (
        <div className='flex items-center gap-2'>
          <button
            type='button'
            onClick={() => handleSeeDetails(row)}
            className='inline-flex items-center gap-1 rounded-md border border-[#E5E7EB] bg-[#FAFAF9] px-2.5 py-1 text-sm text-[#262626] transition-colors hover:bg-[#efefef] cursor-pointer'>
            <span>See Details</span>
            <ArrowRight className='h-3.5 w-3.5' color='#262626' />
          </button>
        </div>
      ),
    },
  ];

  return (
    <section className=''>
      <DashboardDataTable
        filterAction={{ label: "Filter", icon: ListFilter }}
        filterMenu={customerFilterMenu}
        searchPlaceholder='Search Products, Status'
        data={products}
        columns={columns}
        getRowId={(row) => row.id}
        searchPredicate={(row, query) => {
          const text = `${row.name} ${row.email} ${row.status}`;
          return text.toLowerCase().includes(query);
        }}
        pageSizeOptions={[5, 10, 20, 50]}
        defaultPageSize={10}
      />

      <CustomerDetail
        key={selectedCustomer?.id ?? "customer-detail-empty"}
        customer={selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
      />
    </section>
  );
}
