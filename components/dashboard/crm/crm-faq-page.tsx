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
import CRMAddModal from "./shared/crm-add-modal";

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
    title: "Everything you need to know.",
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
    topic: "Shipping & Delivery",
    title: "When will I be charged for my subscription?",
    subtitle:
      "You will be charged on the same day each month based on your initial subscription date. For example, if you subscribed on the 15th, you will be charged on the 15th of each subsequent month.",
  },
  {
    id: "6",
    section: "Topic 2",
    topic: "Shipping & Delivery",
    title: "What payment methods do you accept?",
    subtitle:
      "We accept all major credit and debit cards, including Visa, MasterCard, American Express, and Discover. We also support payments through PayPal for added convenience.",
  },
  {
    id: "7",
    section: "Topic 2",
    topic: "Shipping & Delivery",
    title: "Can I get a refund if I'm not satisfied with the product?",
    subtitle:
      "Yes, we offer a satisfaction guarantee. If you're not happy with your purchase, please contact our customer support team within 30 days of receiving your order to request a refund. We may ask for feedback to help us improve our products and services.",
  },
  {
    id: "8",
    section: "Topic 2",
    topic: "Shipping & Delivery",
    title: "Are your wipes safe for sensitive skin?",
    subtitle:
      "Yes, our wipes are formulated with gentle, hypoallergenic ingredients that are safe for sensitive skin. They are free from harsh chemicals, fragrances, and alcohol, making them suitable for all skin types.",
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
];

export default function CrmFAQPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<CrmFAQRow | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleEdit = (row: CrmFAQRow) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  // Define table columns
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
  // Define FAQ-specific fields
  const faqFormFields = [
    {
      name: "section",
      label: "Section",
      type: "text" as const,
      required: true,
      placeholder: "Enter the section name (e.g., Topic 1, Topic 2)...",
    },
    {
      name: "topic",
      label: "Topic",
      type: "select" as const,
      required: true,
      options: [
        {
          value: "Managing Your Subscription",
          label: "Managing Your Subscription",
        },
        { value: "Shipping & Delivery", label: "Shipping & Delivery" },
        { value: "Payment & Billing", label: "Payment & Billing" },
        { value: "Product Questions", label: "Product Questions" },
      ],
    },
    {
      name: "title",
      label: "Title",
      type: "text" as const,
      required: true,
      placeholder: "Enter the question title...",
    },
    {
      name: "subtitle",
      label: "Subtitle",
      type: "textarea" as const,
      required: true,
      placeholder: "Enter the detailed answer...",
    },
  ];

  const handleAddClick = () => {
    setIsAddModalOpen(true); // Open the add modal
  };

  const handleAddSubmit = (data: Record<string, string>) => {
    console.log("New FAQ data:", data);
    // Here you would typically:
    // 1. Send to API
    // 2. Update your data array
    // 3. Refresh the table
  };

  return (
    <section>
      <DashboardDataTable
        searchPlaceholder='Search faq questions'
        data={crmProductRows}
        columns={columns}
        getRowId={(row) => row.id}
        searchPredicate={(row, query) => {
          const text = `${row.section} ${row.title} ${row.subtitle}`;
          return text.toLowerCase().includes(query);
        }}
        pageSizeOptions={[10]}
        defaultPageSize={10}
        countOnlyLabel='Sections'
        addButton='Add FAQ'
        onAddClick={handleAddClick}
      />
      <CRMEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        section={selectedRow?.section || ""}
        title={selectedRow?.title || ""}
        subtitle={selectedRow?.subtitle || ""}
        imagePaths={[]}
      />
      <CRMAddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        fields={faqFormFields}
        onSubmit={handleAddSubmit}
        title='Add FAQ'
      />
    </section>
  );
}
