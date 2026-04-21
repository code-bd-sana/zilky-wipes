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
  IndentIncrease,
  ListFilter,
  UserRound,
  BadgeCheck,
  Settings2,
} from "lucide-react";
import { useState } from "react";

type SubscriptionRow = {
  id: string;
  customerName: string;
  email: string;
  frequency: string;
  status:
    | "Active"
    | "Canceled"
    | "Skipped next delivery"
    | "Paused indefinitely";
  startingDate: string;
};

const subscriptions: SubscriptionRow[] = [
  {
    id: "1",
    customerName: "John Doe",
    email: "johndoe@gmail.com",
    frequency: "Every 1 Month",
    status: "Active",
    startingDate: "01/08/2026",
  },
  {
    id: "2",
    customerName: "Jessica Rodriguez",
    email: "johndoe@gmail.com",
    frequency: "Every 1 Month",
    status: "Canceled",
    startingDate: "01/08/2026",
  },
  {
    id: "3",
    customerName: "Michael Brown",
    email: "johndoe@gmail.com",
    frequency: "Every 3 Months",
    status: "Active",
    startingDate: "01/08/2026",
  },
  {
    id: "4",
    customerName: "Chris Martinez",
    email: "johndoe@gmail.com",
    frequency: "Every 12 Months",
    status: "Active",
    startingDate: "01/08/2026",
  },
  {
    id: "5",
    customerName: "Matthew King",
    email: "johndoe@gmail.com",
    frequency: "Every 5 Months",
    status: "Skipped next delivery",
    startingDate: "01/08/2026",
  },
  {
    id: "6",
    customerName: "Daniel Lee",
    email: "johndoe@gmail.com",
    frequency: "Every 6 Months",
    status: "Paused indefinitely",
    startingDate: "01/08/2026",
  },
  {
    id: "7",
    customerName: "David Wilson",
    email: "johndoe@gmail.com",
    frequency: "Every 4 Months",
    status: "Canceled",
    startingDate: "01/08/2026",
  },
  {
    id: "8",
    customerName: "Samantha Hernandez",
    email: "johndoe@gmail.com",
    frequency: "Every 7 Months",
    status: "Canceled",
    startingDate: "01/08/2026",
  },
  {
    id: "9",
    customerName: "Laura Garcia",
    email: "johndoe@gmail.com",
    frequency: "Every 9 Months",
    status: "Active",
    startingDate: "01/08/2026",
  },
  {
    id: "10",
    customerName: "Sarah Davis",
    email: "johndoe@gmail.com",
    frequency: "Every 11 Months",
    status: "Paused indefinitely",
    startingDate: "01/08/2026",
  },
  {
    id: "11",
    customerName: "Jane Smith",
    email: "johndoe@gmail.com",
    frequency: "Every 8 Months",
    status: "Active",
    startingDate: "01/08/2026",
  },
  {
    id: "12",
    customerName: "Emily Johnson",
    email: "johndoe@gmail.com",
    frequency: "Every 8 Months",
    status: "Active",
    startingDate: "01/08/2026",
  },
  {
    id: "13",
    customerName: "John Doe",
    email: "johndoe@gmail.com",
    frequency: "Every 8 Months",
    status: "Skipped next delivery",
    startingDate: "01/08/2026",
  },
  {
    id: "14",
    customerName: "Olivia Clark",
    email: "johndoe@gmail.com",
    frequency: "Every 2 Months",
    status: "Active",
    startingDate: "01/08/2026",
  },
  {
    id: "15",
    customerName: "Liam Walker",
    email: "johndoe@gmail.com",
    frequency: "Every 10 Months",
    status: "Canceled",
    startingDate: "01/08/2026",
  },
  {
    id: "16",
    customerName: "Noah Hall",
    email: "johndoe@gmail.com",
    frequency: "Every 6 Months",
    status: "Active",
    startingDate: "01/08/2026",
  },
  {
    id: "17",
    customerName: "Ava Allen",
    email: "johndoe@gmail.com",
    frequency: "Every 3 Months",
    status: "Paused indefinitely",
    startingDate: "01/08/2026",
  },
  {
    id: "18",
    customerName: "Sophia Wright",
    email: "johndoe@gmail.com",
    frequency: "Every 12 Months",
    status: "Active",
    startingDate: "01/08/2026",
  },
  {
    id: "19",
    customerName: "James Scott",
    email: "johndoe@gmail.com",
    frequency: "Every 5 Months",
    status: "Canceled",
    startingDate: "01/08/2026",
  },
  {
    id: "20",
    customerName: "Benjamin Green",
    email: "johndoe@gmail.com",
    frequency: "Every 1 Month",
    status: "Active",
    startingDate: "01/08/2026",
  },
  {
    id: "21",
    customerName: "Isabella Adams",
    email: "johndoe@gmail.com",
    frequency: "Every 7 Months",
    status: "Skipped next delivery",
    startingDate: "01/08/2026",
  },
  {
    id: "22",
    customerName: "Mason Baker",
    email: "johndoe@gmail.com",
    frequency: "Every 9 Months",
    status: "Active",
    startingDate: "01/08/2026",
  },
  {
    id: "23",
    customerName: "Mia Nelson",
    email: "johndoe@gmail.com",
    frequency: "Every 4 Months",
    status: "Paused indefinitely",
    startingDate: "01/08/2026",
  },
  {
    id: "24",
    customerName: "Ethan Carter",
    email: "johndoe@gmail.com",
    frequency: "Every 11 Months",
    status: "Active",
    startingDate: "01/08/2026",
  },
  {
    id: "25",
    customerName: "Amelia Mitchell",
    email: "johndoe@gmail.com",
    frequency: "Every 2 Months",
    status: "Canceled",
    startingDate: "01/08/2026",
  },
];

const columns: DashboardTableColumn<SubscriptionRow>[] = [
  {
    id: "customer-name",
    header: "Customer Name",
    icon: UserRound,
    widthClassName: "w-[24%]",
    cell: (row) => <span>{row.customerName}</span>,
  },
  {
    id: "email",
    header: "Email",
    icon: Mail,
    widthClassName: "w-[27%]",
    cell: (row) => <span>{row.email}</span>,
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
    widthClassName: "w-[16%]",
    cell: (row) => <span>{row.startingDate}</span>,
  },
];

export default function SubscriptionList() {
  const [customDateRange, setCustomDateRange] = useState<
    DateRange | undefined
  >();

  const subscriptionFilterMenu: DashboardFilterMenuConfig = {
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
        id: "subscription-status",
        label: "Status",
        icon: BadgeCheck,
        options: [
          { id: "all", label: "All" },
          { id: "active", label: "Active" },
          { id: "canceled", label: "Canceled" },
          { id: "skipped-next-delivery", label: "Skipped" },
          { id: "paused-indefinitely", label: "Paused indefinitely" },
        ],
      },
      {
        id: "billing-frequency",
        label: "Frequency",
        icon: IndentIncrease,
        options: [
          { id: "all-frequencies", label: "All Frequencies" },
          { id: "every-1-month", label: "Every 1 Month" },
          { id: "every-3-months", label: "Every 3 Months" },
          { id: "every-6-months", label: "Every 6 Months" },
          { id: "every-12-months", label: "Every 12 Months" },
        ],
      },
    ],
  };

  return (
    <section className=''>
      <DashboardDataTable
        filterAction={{ label: "Filter", icon: ListFilter }}
        filterMenu={subscriptionFilterMenu}
        searchPlaceholder='Search Products, Status'
        data={subscriptions}
        columns={columns}
        getRowId={(row) => row.id}
        searchPredicate={(row, query) => {
          const text = `${row.customerName} ${row.email} ${row.frequency} ${row.status} ${row.startingDate}`;
          return text.toLowerCase().includes(query);
        }}
        pageSizeOptions={[5, 10, 20, 50]}
        defaultPageSize={10}
      />
    </section>
  );
}
