"use client";

import DashboardDataTable, {
  type DashboardTableColumn,
} from "@/components/shared/dashboard-data-table";
import {
  ArrowRight,
  Calendar,
  Forward,
  Image as ImageIcon,
  Star,
  UserRound,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import CRMEditModal from "./shared/crm-edit-modal";

type CrmSubscriptionRow = {
  id: string;
  section: string;
  title: string;
  subtitle: string;
  imagePaths: string[];
  hasMoveRightIcon?: boolean;
};

const CRM_PREVIEW_IMAGE = "/ZilkyWipes/1000308870.png";

const crmSubscriptionRows: CrmSubscriptionRow[] = [
  {
    id: "1",
    section: "Hero Main Heading",
    title: "Never run out again.",
    subtitle: "-",
    imagePaths: [CRM_PREVIEW_IMAGE],
  },
  {
    id: "2",
    section: "Feature 1",
    title: ".....Because comfort shouldn’t be a reminder!",
    subtitle:
      "ZilkyWipes arrives before you need it. No last-minute runs. No guessing. Just the right amount, on your schedule.",
    imagePaths: [CRM_PREVIEW_IMAGE],
    hasMoveRightIcon: true,
  },
  {
    id: "3",
    section: "Feature 2",
    title: "Choose your rhythm.",
    subtitle:
      "Monthly delivery / Bi-monthly delivery. You can change this anytime.",
    imagePaths: [CRM_PREVIEW_IMAGE],
    hasMoveRightIcon: true,
  },
  {
    id: "4",
    section: "Difference Section",
    title: "See the difference by yourself",
    subtitle: "-",
    imagePaths: [],
    hasMoveRightIcon: true,
  },
  {
    id: "5",
    section: "Before Footer",
    title: "-",
    subtitle: "-",
    imagePaths: [CRM_PREVIEW_IMAGE],
  },
];

export default function CrmSubscriptionPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<CrmSubscriptionRow | null>(
    null,
  );

  const handleEdit = (row: CrmSubscriptionRow) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const columns: DashboardTableColumn<CrmSubscriptionRow>[] = [
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
        searchPlaceholder='Search'
        data={crmSubscriptionRows}
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
