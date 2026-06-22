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
import { useState, useEffect } from "react";
import CRMHomeEditModal from "./shared/crm-home-edit-modal";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPage, upsertSection, createPage } from "@/lib/api/pages";
import { isVideo } from "@/lib/utils";

const CRM_PREVIEW_IMAGE = "/ZilkyWipes/1000308870.png";

type CrmProductRow = {
  id: string;
  sectionKey: string;
  section: string;
  title: string;
  subtitle: string;
  imagePaths: string[];
};

const defaultSections = [
  { sectionKey: "footer-video", section: "Footer Video", title: "-", subtitle: "-", imagePaths: [CRM_PREVIEW_IMAGE] },
];

export default function CrmProductPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<CrmProductRow | null>(null);
  
  const queryClient = useQueryClient();
  
  const { data: pageData, isLoading } = useQuery({
    queryKey: ["page", "shop"],
    queryFn: () => getPage("shop"),
  });

  // Auto-create the page if it doesn't exist yet
  useEffect(() => {
    if (!isLoading && pageData === null) {
      createPage("shop", "Shop").then(() => {
        queryClient.invalidateQueries({ queryKey: ["page", "shop"] });
      });
    }
  }, [isLoading, pageData, queryClient]);

  const upsertMutation = useMutation({
    mutationFn: ({ sectionKey, content }: { sectionKey: string; content: any }) => 
      upsertSection("shop", sectionKey, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["page", "shop"] });
    }
  });

  const crmProductRows: CrmProductRow[] = defaultSections.map((def, index) => {
    const sectionData = pageData?.sections?.find((s: any) => s.sectionKey === def.sectionKey);
    const content = sectionData?.content || {};
    
    return {
      id: sectionData?.id || String(index + 1),
      sectionKey: def.sectionKey,
      section: def.section,
      title: content.title || def.title,
      subtitle: content.subtitle || def.subtitle,
      imagePaths: content.imagePaths !== undefined ? content.imagePaths : def.imagePaths,
    };
  });

  const handleEdit = (row: CrmProductRow) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const handleSave = async (sectionKey: string, content: any) => {
    await upsertMutation.mutateAsync({ sectionKey, content });
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
        <span className='block max-w-full truncate text-[#2f2f2f]'>
          {row.title}
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
            {row.imagePaths.slice(0, 3).map((imagePath, index) => {
              const renderVideo = isVideo(imagePath);
              return renderVideo ? (
                <video
                  key={`${row.id}-image-${index}`}
                  src={imagePath}
                  className='rounded-sm border border-[#E5E7EB] object-cover min-h-5 max-h-5 min-w-7 max-w-7'
                  muted
                  playsInline
                />
              ) : (
                <Image
                  key={`${row.id}-image-${index}`}
                  src={imagePath.startsWith('/') || imagePath.startsWith('http') ? imagePath : CRM_PREVIEW_IMAGE}
                  alt={`${row.section} preview ${index + 1}`}
                  width={28}
                  height={20}
                  className='rounded-sm border border-[#E5E7EB] object-cover min-h-5 max-h-5 min-w-7 max-w-7'
                />
              );
            })}
            {row.imagePaths.length > 3 && (
              <span className="text-xs text-gray-500 ml-1">+{row.imagePaths.length - 3}</span>
            )}
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
      {isLoading && <div className="mb-4 text-sm text-gray-500">Loading data...</div>}
      <DashboardDataTable
        searchPlaceholder='Search section'
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

      <CRMHomeEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        sectionKey={selectedRow?.sectionKey || null}
        sectionName={selectedRow?.section || null}
        initialContent={
          selectedRow ? { title: selectedRow.title, subtitle: selectedRow.subtitle, imagePaths: selectedRow.imagePaths } : null
        }
        pageKey="shop"
        onSave={handleSave}
      />
    </section>
  );
}
