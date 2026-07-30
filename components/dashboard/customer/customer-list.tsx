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
import { useGetCustomers } from "@/hooks/useCustomers";
import type { BackendCustomer } from "@/lib/api/customers";
import CustomerDetail from "./customer-details";

type ProductRow = BackendCustomer;

const STATUS_STYLES: Record<string, string> = {
  ACTIVE: "bg-green-50 text-green-700",
  Active: "bg-green-50 text-green-700",
  "CANCELED": "bg-red-100 text-red-600",
  "PAUSED": "bg-blue-100 text-blue-600",
  "PAST_DUE": "bg-orange-100 text-orange-600",
  "UNPAID": "bg-red-100 text-red-700",
};

export default function CustomerListPage() {
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  const [customDateRange, setCustomDateRange] = useState<
    DateRange | undefined
  >();
  const [page] = useState(1);
  const [limit] = useState(10);
  const [query] = useState("");

  const { data: customersResponse, isLoading } = useGetCustomers({ page, limit, searchTerm: query });

  const selectedCustomer = customersResponse?.data?.find((c: BackendCustomer) => c.id === selectedCustomerId) || null;

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
    setSelectedCustomerId(row.id);
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
          className={`inline-flex items-center rounded-[6px] px-2.5 py-0.5 text-xs font-base ${STATUS_STYLES[row.status] || "bg-gray-100 text-gray-800"}`}>
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

  if (isLoading) {
    return <div className="p-8 text-center text-gray-500">Loading customers...</div>;
  }

  return (
    <section className=''>
      <DashboardDataTable
        filterAction={{ label: "Filter", icon: ListFilter }}
        filterMenu={customerFilterMenu}
        searchPlaceholder='Search Products, Status'
        data={customersResponse?.data || []}
        columns={columns}
        getRowId={(row) => row.id}
        searchPredicate={(row, query) => {
          const text = `${row.name} ${row.email} ${row.status}`;
          return text.toLowerCase().includes(query.toLowerCase());
        }}
        pageSizeOptions={[10, 20, 50]}
        defaultPageSize={10}
      />

      <CustomerDetail
        key={selectedCustomerId ?? "customer-detail-empty"}
        customer={selectedCustomer}
        onClose={() => setSelectedCustomerId(null)}
      />
    </section>
  );
}
