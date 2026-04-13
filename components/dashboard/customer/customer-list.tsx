"use client";

import { useState } from "react";
import DashboardDataTable, {
  type DashboardTableColumn,
} from "@/components/shared/dashboard-data-table";
import {
  ArrowRight,
  Forward,
  Infinity,
  ListFilter,
  Loader,
  Mail,
  Package,
  User,
  UserPlus,
} from "lucide-react";
import CustomerDetail from "./customer-details";

type CustomerStatus =
  | "Active"
  | "Canceled subscription"
  | "Paused indefinetely"
  | "Skipped next Delivery";

type OrderHistoryEntry = {
  date: string;
  time: string;
  label: string;
  amount: string;
  isPending?: boolean;
};

type ProductRow = {
  id: string;
  name: string;
  email: string;
  order: string;
  frequency: string;
  status: CustomerStatus;
  joined: string;
  phone: string;
  customerSince: string;
  lifetimeValue: string;
  subscriptionType: string;
  items: string;
  orderHistory: OrderHistoryEntry[];
};

type SelectedCustomer = Omit<ProductRow, "order" | "frequency" | "joined">;

type ProductRowSeed = Omit<
  ProductRow,
  | "phone"
  | "customerSince"
  | "lifetimeValue"
  | "subscriptionType"
  | "items"
  | "orderHistory"
>;

const STATUS_STYLES: Record<CustomerStatus, string> = {
  Active: "bg-[#FDF2F8] text-[#BE185D]",
  "Canceled subscription": "bg-[#FFF1F2] text-[#BE123C]",
  "Paused indefinetely": "bg-[#F0F9FF] text-[#0369A1]",
  "Skipped next Delivery": "bg-[#F5F3FF] text-[#6D28D9]",
};

const buildOrderHistory = (subscriptionType: string): OrderHistoryEntry[] => [
  {
    date: "Feb 01, 2026",
    time: "08:14 AM",
    label: `Bought ${subscriptionType}`,
    amount: "$12.00",
  },
  {
    date: "Feb 01, 2026",
    time: "08:14 AM",
    label: `Bought ${subscriptionType}`,
    amount: "$12.00",
  },
  {
    date: "Feb 01, 2026",
    time: "08:14 AM",
    label: `Bought ${subscriptionType}`,
    amount: "$12.00",
  },
  {
    date: "Feb 01, 2026",
    time: "08:14 AM",
    label: `Bought ${subscriptionType}`,
    amount: "$12.00",
  },
  {
    date: "Expected today by 8:00 PM",
    time: "",
    label: `Bought ${subscriptionType}`,
    amount: "$12.00",
    isPending: true,
  },
];

const getSubscriptionType = (order: string) => {
  if (order.includes("Starter")) {
    return "Starter Kit";
  }

  if (order.includes("Familly")) {
    return "Family";
  }

  return "Refill";
};

const baseProducts: ProductRowSeed[] = [
  {
    id: "1",
    name: "John Doe",
    email: "janedoe@yahoo.com",
    order: "Starter Kit - One time",
    frequency: "Every 1 Month",
    status: "Active",
    joined: "01/08/2026",
  },
  {
    id: "2",
    name: "Jessica Rodriguez",
    email: "johndoe@gmail.com",
    order: "Familly - Subscription",
    frequency: "Every 1 Month",
    status: "Canceled subscription",
    joined: "02/08/2026",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "laurawhite@aol.com",
    order: "Refill - One time",
    frequency: "Every 3 Months",
    status: "Paused indefinetely",
    joined: "03/08/2026",
  },
  {
    id: "4",
    name: "Chris Martinez",
    email: "alexsmith@hotmail.com",
    order: "Familly - Subscription",
    frequency: "Every 10 Months",
    status: "Skipped next Delivery",
    joined: "04/08/2026",
  },
  {
    id: "5",
    name: "Matthew King",
    email: "emilyjohnson@gmail.com",
    order: "Refill - One time",
    frequency: "Every 5 Months",
    status: "Active",
    joined: "05/08/2026",
  },
  {
    id: "6",
    name: "Daniel Lee",
    email: "sarahwilliams@icloud.com",
    order: "Refill - One time",
    frequency: "Every 6 Months",
    status: "Paused indefinetely",
    joined: "06/08/2026",
  },
  {
    id: "7",
    name: "David Wilson",
    email: "michaelbrown@outlook.com",
    order: "Refill - One time",
    frequency: "Every 4 Months",
    status: "Skipped next Delivery",
    joined: "07/08/2026",
  },
  {
    id: "8",
    name: "Samantha Hernandez",
    email: "davidjones@live.com",
    order: "Familly - Subscription",
    frequency: "Every 7 Months",
    status: "Paused indefinetely",
    joined: "08/08/2026",
  },
  {
    id: "9",
    name: "Laura Garcia",
    email: "robertgarcia@gmail.com",
    order: "Refill - One time",
    frequency: "Every 9 Months",
    status: "Skipped next Delivery",
    joined: "09/08/2026",
  },
  {
    id: "10",
    name: "Sarah Davis",
    email: "marylopez@yahoo.com",
    order: "Refill - One time",
    frequency: "Every 2 Months",
    status: "Active",
    joined: "10/08/2026",
  },
  {
    id: "11",
    name: "Jane Smith",
    email: "williammartinez@outlook.com",
    order: "Refill - One time",
    frequency: "Every 11 Months",
    status: "Paused indefinetely",
    joined: "11/08/2026",
  },
  {
    id: "12",
    name: "Emily Johnson",
    email: "isabellahernandez@gmail.com",
    order: "Refill - One time",
    frequency: "Every 1 Month",
    status: "Active",
    joined: "12/08/2026",
  },
  {
    id: "13",
    name: "John Doe",
    email: "charleswilson@icloud.com",
    order: "Familly - Subscription",
    frequency: "Every 8 Months",
    status: "Paused indefinetely",
    joined: "13/08/2026",
  },
];

const products: ProductRow[] = baseProducts.map((product) => {
  const subscriptionType = getSubscriptionType(product.order);

  return {
    ...product,
    phone: `+1 111 222 ${product.id.padStart(4, "0")}`,
    customerSince: product.joined,
    lifetimeValue: `$${(900 + Number(product.id) * 73.5).toFixed(2)}`,
    subscriptionType,
    items: product.order,
    orderHistory: buildOrderHistory(subscriptionType),
  };
});

export default function CustomerListPage() {
  const [selectedCustomer, setSelectedCustomer] =
    useState<SelectedCustomer | null>(null);

  const handleSeeDetails = (row: ProductRow) => {
    setSelectedCustomer({
      id: row.id,
      name: row.name,
      email: row.email,
      status: row.status,
      phone: row.phone,
      customerSince: row.customerSince,
      lifetimeValue: row.lifetimeValue,
      subscriptionType: row.subscriptionType,
      items: row.items,
      orderHistory: row.orderHistory,
    });
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
        customer={selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
      />
    </section>
  );
}
