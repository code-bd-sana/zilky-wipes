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
  Trash2,
} from "lucide-react";
import { useState, useMemo } from "react";
import EditSubscriptionModal from "./edit-subscription-modal";
import { useGetAllSubscriptions, useDeleteSubscription } from "@/hooks/useSubscriptions";
import type { BackendSubscription } from "@/lib/api/subscriptions";

export default function SubscriptionList() {
  const [customDateRange, setCustomDateRange] = useState<DateRange | undefined>();
  const [selectedSubscriptionId, setSelectedSubscriptionId] = useState<string | null>(null);
  const [subscriptionToDelete, setSubscriptionToDelete] = useState<string | null>(null);
  
  const { data: response, isLoading } = useGetAllSubscriptions({ limit: 1000 });
  const subscriptions = useMemo(() => response?.data || [], [response?.data]);
  const { mutate: deleteSub } = useDeleteSubscription();

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
          
          {['UNPAID', 'PAST_DUE', 'CANCELED'].includes(row.status) && (
            <button
              type='button'
              onClick={() => setSubscriptionToDelete(row.id)}
              className='inline-flex items-center gap-1 rounded-md border border-red-200 bg-red-50 px-2.5 py-1 text-sm text-red-600 transition-colors hover:bg-red-100 cursor-pointer'>
              <Trash2 className='h-3.5 w-3.5' />
            </button>
          )}
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
          { id: "unpaid", label: "UNPAID" },
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

      {subscriptionToDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSubscriptionToDelete(null)} />
          <div className="relative z-10 w-full max-w-sm bg-white rounded-xl shadow-xl overflow-hidden p-6 text-center">
            <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-red-100 mb-4">
              <Trash2 className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Delete Subscription</h3>
            <p className="text-sm text-gray-500 mb-6">Are you sure you want to delete this subscription record? This action cannot be undone.</p>
            <div className="flex gap-3 justify-center">
              <button 
                type="button" 
                onClick={() => setSubscriptionToDelete(null)}
                className="flex-1 px-4 py-2 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="button" 
                onClick={() => {
                  deleteSub(subscriptionToDelete, {
                    onSuccess: () => setSubscriptionToDelete(null)
                  });
                }}
                className="flex-1 px-4 py-2 rounded-lg font-medium text-white bg-red-600 hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
