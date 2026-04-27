"use client";

import DashboardDataTable from "@/components/shared/dashboard-data-table";
import {
  ArrowRight,
  Calendar,
  Forward,
  ListFilter,
  Star,
  UserRound,
} from "lucide-react";
import { useState } from "react";
import CRMEditModal from "./shared/crm-edit-modal";

type CrmFAQRow = {
  id: string;
  section: string;
  topic: string;
  title: string;
  subtitle: string;
};

const crmProductRows: CrmFAQRow[] = [
  {
    id: "0",
    section: "Page Header",
    topic: "-",
    title: "How can we help?",
    subtitle: "Find answers to common questions about your subscription",
  },
  {
    id: "1",
    section: "Topic 1",
    topic: "Managing Your Subscription",
    title: "How do I pause my subscription?",
    subtitle:
      "From your dashboard, click 'Modify delivery' to open the adjustment panel, then select 'Pause indefinitely.' You won't be charged while paused, and you can resume anytime from the same place.",
  },
  {
    id: "2",
    section: "Topic 1",
    topic: "Managing Your Subscription",
    title: "Can I skip just one delivery?",
    subtitle:
      "Yes, in the adjustment panel, click 'Skip next delivery.' Your subscription will automatically resume with the following cycle. This doesn't change your regular delivery frequency.",
  },
  {
    id: "3",
    section: "Topic 1",
    topic: "Managing Your Subscription",
    title: "What if I need extra wipes before my next delivery?",
    subtitle:
      "You can request additional wipes at any time through your account settings. Just go to 'Manage Subscription' and click 'Request Extra Wipes.' Our team will review your request and get back to you within 24-48 hours. Please note that extra wipes are subject to availability and may incur an additional charge based on your subscription plan.",
  },
  {
    id: "4",
    section: "Topic 1",
    topic: "Managing Your Subscription",
    title: "How do I change my delivery address?",
    subtitle:
      "You can update your delivery address at any time through your account settings. Just go to 'Manage Subscription' and click 'Edit Address.' Our team will review your request and get back to you within 24-48 hours.",
  },
  {
    id: "5",
    section: "Topic 2",
    topic: "Billing and Payments",
    title: "When will I be charged for my subscription?",
    subtitle:
      "You will be charged on the same day each month based on your initial subscription date. For example, if you subscribed on the 15th, you will be charged on the 15th of each subsequent month.",
  },
  {
    id: "6",
    section: "Topic 2",
    topic: "Billing and Payments",
    title: "What payment methods do you accept?",
    subtitle:
      "We accept all major credit and debit cards, including Visa, MasterCard, American Express, and Discover. We also support payments through PayPal for added convenience.",
  },
  {
    id: "7",
    section: "Topic 2",
    topic: "Billing and Payments",
    title: "Can I get a refund if I'm not satisfied with the product?",
    subtitle:
      "Yes, we offer a satisfaction guarantee. If you're not happy with your purchase, please contact our customer support team within 30 days of receiving your order to request a refund. We may ask for feedback to help us improve our products and services.",
  },
  {
    id: "8",
    section: "Topic 2",
    topic: "Product Information",
    title: "Are your wipes safe for sensitive skin?",
    subtitle:
      "Yes, our wipes are formulated with gentle, hypoallergenic ingredients that are safe for sensitive skin. They are free from harsh chemicals, fragrances, and alcohol, making them suitable for all skin types.",
  },
];

export default function CrmFAQPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<CrmFAQRow | null>(null);

  const handleEdit = (row: CrmFAQRow) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const columns = [
    {
      id: "section",
      header: "Section",
      icon: UserRound,
      widthClassName: "w-[15%]",
      cell: (row: CrmFAQRow) => <span>{row.section}</span>,
    },
    {
      id: "topic",
      header: "Topic",
      icon: ListFilter,
      widthClassName: "w-[14%]",
      cell: (row: CrmFAQRow) => <span>{row.topic}</span>,
    },
    {
      id: "title",
      header: "Title",
      icon: Calendar,
      widthClassName: "w-[24%]",
      cell: (row: CrmFAQRow) => (
        <span className="flex items-center gap-1 max-w-full truncate text-[#2f2f2f]">
          <span className="truncate">{row.title}</span>
        </span>
      ),
    },
    {
      id: "subtitle",
      header: "Subtitle",
      icon: Star,
      widthClassName: "w-[35%]",
      cell: (row: CrmFAQRow) => (
        <span className="block max-w-full truncate text-[#2f2f2f]">
          {row.subtitle}
        </span>
      ),
    },
    {
      id: "action",
      header: "Action",
      icon: Forward,
      widthClassName: "w-[14%]",
      cell: (row: CrmFAQRow) => (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleEdit(row)}
            className="inline-flex items-center gap-1 rounded-md border border-[#E5E7EB] bg-[#FAFAF9] px-2.5 py-1 text-sm text-[#262626] transition-colors hover:bg-[#efefef] cursor-pointer"
          >
            <span>Edit</span>
            <ArrowRight className="h-3.5 w-3.5" color="#262626" />
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-md border border-[#E5E7EB] bg-[#FAFAF9] px-2.5 py-1 text-sm text-[#262626] transition-colors hover:bg-[#efefef] cursor-pointer"
          >
            <span>Delete</span>
          </button>
        </div>
      ),
    },
  ];

  return (
    <section>
      <DashboardDataTable
        searchPlaceholder="Search order, customer name"
        data={crmProductRows}
        columns={columns}
        getRowId={(row) => row.id}
        searchPredicate={(row, query) => {
          const text = `${row.section} ${row.title} ${row.subtitle}`;
          return text.toLowerCase().includes(query);
        }}
        pageSizeOptions={[50]}
        defaultPageSize={50}
        footerMode="count-only"
        countOnlyLabel="Sections"
      />
      <CRMEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        section={selectedRow?.section || ""}
        title={selectedRow?.title || ""}
        subtitle={selectedRow?.subtitle || ""}
        imagePaths={[]}
      />
    </section>
  );
}
