"use client";

import DashboardDataTable, {
  type DashboardTableColumn,
} from "@/components/shared/dashboard-data-table";
import {
  ArrowRight,
  Calendar,
  Forward,
  Image as ImageIcon,
  MoveRight,
  Star,
  UserRound,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import CRMEditModal from "./shared/crm-edit-modal";

type CrmProductRow = {
  id: string;
  section: string;
  title: string;
  subtitle: string;
  imagePaths: string[];
  hasMoveRightIcon?: boolean;
};

const crmProductRows: CrmProductRow[] = [
  {
    id: "1",
    section: "Modal Heading",
    title: "See subscription benefits",
    subtitle:
      "Would you consider subscribing to our products? Subscription reduce costs 15% from one time buying.",
    imagePaths: [],
  },
  {
    id: "2",
    section: "Link 1",
    title: "See subscription benefits",
    subtitle: "-",
    imagePaths: [],
    hasMoveRightIcon: true,
  },
  {
    id: "3",
    section: "Link 2",
    title: "Tell us about this product",
    subtitle: "-",
    imagePaths: [],
    hasMoveRightIcon: true,
  },
  {
    id: "4",
    section: "CTA",
    title: "Track your order",
    subtitle: "-",
    imagePaths: [],
  },
];

export default function CrmPushSubscriptionPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<CrmProductRow | null>(null);

  const handleEdit = (row: CrmProductRow) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const columns: DashboardTableColumn<CrmProductRow>[] = [
    {
      id: "section",
      header: "Section",
      icon: UserRound,
      widthClassName: "w-[15%]",
      cell: (row) => <span>{row.section}</span>,
    },
    {
      id: "title",
      header: "Title",
      icon: Calendar,
      widthClassName: "w-[24%]",
      cell: (row) => (
        <span className='flex items-center gap-1 max-w-full truncate text-[#2f2f2f]'>
          <span className='truncate'>{row.title}</span>
          {row.hasMoveRightIcon && <MoveRight className='h-4 w-4 shrink-0' />}
        </span>
      ),
    },
    {
      id: "subtitle",
      header: "Subtitle",
      icon: Star,
      widthClassName: "w-[35%]",
      cell: (row) => (
        <span className='block max-w-full truncate text-[#2f2f2f]'>
          {row.subtitle}
        </span>
      ),
    },
    {
      id: "image",
      header: "Image",
      icon: ImageIcon,
      widthClassName: "w-[12%]",
      cell: (row) => {
        if (!row.imagePaths.length) {
          return <span>-</span>;
        }

        return (
          <div className='flex items-center gap-1'>
            {row.imagePaths.map((imagePath, index) => (
              <Image
                key={`${row.id}-image-${index}`}
                src={imagePath}
                alt={`${row.section} preview ${index + 1}`}
                width={28}
                height={20}
                className='rounded-sm border border-[#E5E7EB] object-cover'
              />
            ))}
          </div>
        );
      },
    },
    {
      id: "action",
      header: "Action",
      icon: Forward,
      widthClassName: "w-[14%]",
      cell: (row) => (
        <button
          type='button'
          onClick={() => handleEdit(row)}
          className='inline-flex items-center gap-1 rounded-md border border-[#E5E7EB] bg-[#FAFAF9] px-2.5 py-1 text-sm text-[#262626] transition-colors hover:bg-[#efefef] cursor-pointer'>
          <span>Edit</span>
          <ArrowRight className='h-3.5 w-3.5' color='#262626' />
        </button>
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
        pageSizeOptions={[50]}
        defaultPageSize={50}
        footerMode='count-only'
        countOnlyLabel='Sections'
      />
      <CRMEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        section={selectedRow?.section || ""}
        title={selectedRow?.title || ""}
        subtitle={selectedRow?.subtitle || ""}
        imagePaths={selectedRow?.imagePaths || []}
      />
    </section>
  );
}
