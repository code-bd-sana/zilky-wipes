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
    title: "We’d hate to see you go",
    subtitle: "Before you cancel, would any of these options help?",
    imagePaths: [],
  },
  {
    id: "2",
    section: "Option 1",
    title: "Deliver less often", 
    subtitle: "-",
    imagePaths: [],
    hasMoveRightIcon: true, 
  },
  {
    id: "3",
    section: "Option 2",
    title: "Skip just one delivery",
    subtitle: "-",
    imagePaths: [],
    hasMoveRightIcon: true, 
  },
  {
    id: "4",
    section: "Option 3",
    title: "Pause for a while",
    subtitle: "Refer a Friend",
    imagePaths: [],
    hasMoveRightIcon: true,
  },
  {
    id: "5",
    section: "Note",
    title: "",
    subtitle: "If none of these work for you right now, we understand.",
    imagePaths: [],
  },
  {
    id: "6",
    section: "CTA 1",
    title: "Continue with cancellation",
    subtitle: "-",
    imagePaths: [],
  },
  {
    id: "7",
    section: "CTA 2",
    title: "Keep my subscription",
    subtitle: "-",
    imagePaths: [],
  }
];

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
        <span className="truncate">{row.title}</span>
        {row.hasMoveRightIcon && <MoveRight className="h-4 w-4 shrink-0" />}
      </span>
    ),
  },
  {
    id: "subtitle",
    header: "Subtitle",
    icon: Star,
    widthClassName: "w-[35%]",
    cell: (row) => (
      <span className='block max-w-full truncate text-[#2f2f2f]'>{row.subtitle}</span>
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
    cell: () => (
      <button
        type='button'
        className='inline-flex items-center gap-1 rounded-md border border-[#E5E7EB] bg-[#FAFAF9] px-2.5 py-1 text-sm text-[#262626] transition-colors hover:bg-[#efefef] cursor-pointer'>
        <span>Edit</span>
        <ArrowRight className='h-3.5 w-3.5' color='#262626' />
      </button>
    ),
  },
];

export default function CrmCancelationPage() {
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
    </section>
  );
}