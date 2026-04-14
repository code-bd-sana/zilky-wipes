"use client";

import DashboardDataTable, {
  type DashboardTableColumn,
} from "@/components/shared/dashboard-data-table";
import {
  dashboardFeedbackRows,
  type DashboardFeedbackRow,
} from "@/constants/dashboard-feedback";
import {
  Calendar,
  ListFilter,
  MessageSquareText,
  Star,
  User,
} from "lucide-react";

const columns: DashboardTableColumn<DashboardFeedbackRow>[] = [
  {
    id: "name",
    header: "Name",
    icon: User,
    widthClassName: "w-[20%]",
    cell: (row) => <span>{row.customerName}</span>,
  },
  {
    id: "date",
    header: "Date",
    icon: Calendar,
    widthClassName: "w-[20%]",
    cell: (row) => <span>{row.date}</span>,
  },
  {
    id: "star",
    header: "Star",
    icon: Star,
    widthClassName: "w-[21%]",
    cell: (row) => <span>{row.starLabel}</span>,
  },
  {
    id: "feedback",
    header: "Feedback",
    icon: MessageSquareText,
    widthClassName: "w-[39%]",
    cell: (row) => <span>{row.feedback}</span>,
  },
];

export default function FeedbackListPage() {
  return (
    <section>
      <DashboardDataTable
        filterAction={{ label: "Filter", icon: ListFilter }}
        searchPlaceholder='Search order, customer name'
        data={dashboardFeedbackRows}
        columns={columns}
        getRowId={(row) => row.id}
        searchPredicate={(row, query) => {
          const text = `${row.customerName} ${row.date} ${row.starLabel} ${row.feedback}`;
          return text.toLowerCase().includes(query);
        }}
        pageSizeOptions={[5, 10, 20, 50]}
        defaultPageSize={20}
      />
    </section>
  );
}
