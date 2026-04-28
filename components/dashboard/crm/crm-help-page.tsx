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
      "Click 'Order extra now' in the adjustment panel to place a one-time purchase. It ships separately within 2 business days and doesn't affect your subscription schedule.",
  },
  {
    id: "4",
    section: "Topic 1",
    topic: "Managing Your Subscription",
    title: "How do I change how often I receive deliveries?",
    subtitle:
      "Open the adjustment panel and select 'Change frequency.' You can choose delivery every 3, 4, 6, or 8 weeks. Changes apply starting with your next scheduled delivery.",
  },
  {
    id: "5",
    section: "Topic 2",
    topic: "Shipping & Delivery",
    title: "How long does shipping take?",
    subtitle:
      "Standard delivery takes 3-5 business days. You'll get tracking information by email as soon as your order ships.",
  },
  {
    id: "6",
    section: "Topic 2",
    topic: "Shipping & Delivery",
    title: "Can I change my delivery address?",
    subtitle:
      "Yes. Click 'Edit address' on your dashboard or update it in Settings. Changes apply to all future orders. If an order has already shipped, contact support immediately.",
  },
  {
    id: "7",
    section: "Topic 2",
    topic: "Shipping & Delivery",
    title: "Do I need to be home when my package arrives?",
    subtitle:
      "No signature needed. Your package will be left at your door. You can add special instructions for your carrier in Settings if you'd like.",
  },
  {
    id: "8",
    section: "Topic 2",
    topic: "Shipping & Delivery",
    title: "My package hasn't arrived. What should I do?",
    subtitle:
      "First, check the tracking link in your delivery email. If it shows delivered but you haven't received it, check with neighbors or your building manager. Still can't find it? Contact our support team and we'll help resolve it.",
  },
  {
    id: "9",
    section: "Topic 3",
    topic: "Payment & Billing",
    title: "When will I be charged?",
    subtitle:
      "We charge your card 2 days before each scheduled delivery. If your payment doesn't go through, we'll try again after 24 hours. If it still fails, your subscription will pause automatically.",
  },
  {
    id: "10",
    section: "Topic 3",
    topic: "Payment & Billing",
    title: "How do I update my payment method?",
    subtitle:
      "Click 'Update via Stripe' on your dashboard or in Settings. You'll be securely redirected to Stripe to update your card. We don't store your complete payment information.",
  },
  {
    id: "11",
    section: "Topic 3",
    topic: "Payment & Billing",
    title: "Can I get a refund?",
    subtitle:
      "Unopened products can be returned within 30 days for a full refund. For hygiene reasons, we can't accept opened items. Contact support to start a return.",
  },
  {
    id: "12",
    section: "Topic 3",
    topic: "Payment & Billing",
    title: "Where can I find my invoices?",
    subtitle:
      "We email an invoice after each charge. You can also view and download all past invoices from Settings under 'Billing history.'",
  },
  {
    id: "13",
    section: "Topic 4",
    topic: "Product Questions",
    title: "Are these actually flushable?",
    subtitle:
      "Yes, ZilkyWipes are certified flushable by independent labs and break down in water faster than toilet paper. They're safe for all plumbing systems, including septic tanks.",
  },
  {
    id: "14",
    section: "Topic 4",
    topic: "Product Questions",
    title: "How long does one roll last?",
    subtitle:
      "For one person, a roll typically lasts 3-4 weeks. It varies by household size and usage habits. You can adjust your delivery frequency anytime to match your actual needs.",
  },
  {
    id: "15",
    section: "Topic 4",
    topic: "Product Questions",
    title: "What are they made of?",
    subtitle:
      "100% biodegradable plant-based fibers. No plastic, no harsh chemicals, and free from parabens, alcohol, and synthetic fragrances.",
  },
  {
    id: "16",
    section: "Topic 4",
    topic: "Product Questions",
    title: "Are they safe for sensitive skin?",
    subtitle:
      "Yes. Our wipes are hypoallergenic and pH balanced. They're gentler than toilet paper and contain no irritating ingredients. If you have specific concerns, we recommend checking with your dermatologist.",
  },
  {
    id: "17",
    section: "Before Footer",
    topic: "-",
    title: "Still have questions?",
    subtitle: "Our support team is here to help Monday–Friday, 9am–5pm EST",
  },
];

export default function CrmHelpPage() {
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
        <span className='flex items-center gap-1 max-w-full truncate text-[#2f2f2f]'>
          <span className='truncate'>{row.title}</span>
        </span>
      ),
    },
    {
      id: "subtitle",
      header: "Subtitle",
      icon: Star,
      widthClassName: "w-[35%]",
      cell: (row: CrmFAQRow) => (
        <span className='block max-w-full truncate text-[#2f2f2f]'>
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
        <div className='flex items-center gap-2'>
          <button
            type='button'
            onClick={() => handleEdit(row)}
            className='inline-flex items-center gap-1 rounded-md border border-[#E5E7EB] bg-[#FAFAF9] px-2.5 py-1 text-sm text-[#262626] transition-colors hover:bg-[#efefef] cursor-pointer'>
            <span>Edit</span>
            <ArrowRight className='h-3.5 w-3.5' color='#262626' />
          </button>
          <button
            type='button'
            className='inline-flex items-center gap-1 rounded-md border border-[#E5E7EB] bg-[#FAFAF9] px-2.5 py-1 text-sm text-[#262626] transition-colors hover:bg-[#efefef] cursor-pointer'>
            <span>Delete</span>
          </button>
        </div>
      ),
    },
  ];

  return (
    <section>
      <DashboardDataTable
        searchPlaceholder='Search order, customer name'
        data={crmProductRows}
        columns={columns}
        getRowId={(row) => row.id}
        searchPredicate={(row, query) => {
          const text = `${row.section} ${row.title} ${row.subtitle}`;
          return text.toLowerCase().includes(query);
        }}
        pageSizeOptions={[10]}
        defaultPageSize={10}
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
