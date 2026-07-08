"use client";

import DashboardDataTable, {
  type DashboardFilterMenuConfig,
  type DashboardTableColumn,
} from "@/components/shared/dashboard-data-table";
import DateRangePicker, {
  type DateRange,
} from "@/components/shared/date-range-picker";
import {
  CalendarDays,
  Mail,
  CircleGauge,
  ListFilter,
  UserRound,
  BadgeCheck,
  Settings2,
  PencilLine,
  Forward,
} from "lucide-react";
import { useState, useMemo } from "react";
import EditSubscriptionModal from "./edit-subscription-modal";
import { useGetAllSubscriptions } from "@/hooks/useSubscriptions";
import type { BackendSubscription } from "@/lib/api/subscriptions";

export default function SubscriptionList() {
  const [customDateRange, setCustomDateRange] = useState<DateRange | undefined>();
  const [selectedSubscriptionId, setSelectedSubscriptionId] = useState<string | null>(null);
  
  // We fetch a large limit so the client-side DashboardDataTable can handle pagination properly
  const { data: response, isLoading } = useGetAllSubscriptions({ limit: 1000 });
  const subscriptions = useMemo(() => response?.data || [], [response?.data]);

  const handleEditDetails = (row: BackendSubscription) => {
    setSelectedSubscriptionId(row.id);
  };

  const handleCloseModal = () => {
    setSelectedSubscriptionId(null);
  };

  const selectedSubscription = useMemo(() => {
    return subscriptions.find(s => s.id === selectedSubscriptionId) || null;
  }, [subscriptions, selectedSubscriptionId]);

  const columns: DashboardTableColumn<BackendSubscription>[] = useMemo(() => [
    {
      id: "customer-name",
      header: "Customer Name",
      icon: UserRound,
      widthClassName: "w-[24%]",
      cell: (row) => <span>{row.user?.firstName} {row.user?.lastName}</span>,
    },
    {
      id: "email",
      header: "Email",
      icon: Mail,
      widthClassName: "w-[27%]",
      cell: (row) => <span>{row.user?.email}</span>,
    },
    {
      id: "frequency",
      header: "Frequency",
      icon: CircleGauge,
      widthClassName: "w-[22%]",
      cell: (row) => <span>{row.frequency}</span>,
    },
    {
      id: "status",
      header: "Status",
      icon: BadgeCheck,
      widthClassName: "w-[21%]",
      cell: (row) => <span>{row.status}</span>,
    },
    {
      id: "starting-date",
      header: "Starting Date",
      icon: CalendarDays,
      widthClassName: "w-[18%]",
      cell: (row) => <span>{new Date(row.startingDate).toLocaleDateString()}</span>,
    },
    {
      id: "action",
      header: "Action",
      icon: Forward,
      widthClassName: "w-[16%]",
      cell: (row) => (
        <div className='flex items-center gap-2'>
          <button
            type='button'
            onClick={() => handleEditDetails(row)}
            className='inline-flex items-center gap-1 rounded-md border border-[#E5E7EB] bg-[#FAFAF9] px-2.5 py-1 text-sm text-[#262626] transition-colors hover:bg-[#efefef] cursor-pointer'>
            <PencilLine className='h-3.5 w-3.5' color='#262626' />
            <span>Edit</span>
          </button>
        </div>
      ),
    },
  ], []);

  const subscriptionFilterMenu: DashboardFilterMenuConfig = useMemo(() => ({
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
                  console.log("Applied date range:", range);
                }}
              />
            ),
          },
        ],
      },
      {
        id: "subscription-status",
        label: "Status",
        icon: BadgeCheck,
        options: [
          { id: "all", label: "All" },
          { id: "active", label: "ACTIVE" },
          { id: "canceled", label: "CANCELED" },
          { id: "paused", label: "PAUSED" },
          { id: "past_due", label: "PAST_DUE" },
        ],
      },
    ],
  }), [customDateRange, setCustomDateRange]);

  if (isLoading) {
    return <div className="p-8 text-center text-gray-500">Loading subscriptions...</div>;
  }

  return (
    <section className=''>
      <DashboardDataTable
        filterAction={{ label: "Filter", icon: ListFilter }}
        filterMenu={subscriptionFilterMenu}
        searchPlaceholder='Search Customers, Status'
        data={subscriptions}
        columns={columns}
        getRowId={(row) => row.id}
        searchPredicate={(row, query) => {
          const text = `${row.user?.firstName} ${row.user?.lastName} ${row.user?.email} ${row.frequency} ${row.status} ${row.startingDate}`;
          return text.toLowerCase().includes(query.toLowerCase());
        }}
        pageSizeOptions={[10, 20, 50]}
        defaultPageSize={10}
      />

      {selectedSubscription && (
        <EditSubscriptionModal
          key={selectedSubscription.id}
          subscription={selectedSubscription}
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
}
