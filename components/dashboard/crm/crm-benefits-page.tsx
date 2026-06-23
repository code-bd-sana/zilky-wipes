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
import CRMDynamicEditModal from "./shared/crm-dynamic-edit-modal";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPage, upsertSection, createPage } from "@/lib/api/pages";
import { isVideo } from "@/lib/utils";

const CRM_PREVIEW_IMAGE = "/ZilkyWipes/1000308870.png";

type CrmBenefitsRow = {
  id: string;
  sectionKey: string;
  section: string;
  title: string;
  subtitle: string;
  points?: string[];
  detailList?: any[];
  statList?: any[];
  imagePaths: string[];
};

const defaultSections = [
  { sectionKey: "hero", section: "Hero Main Heading", title: "A cleaner way to care.", subtitle: "-", imagePaths: [CRM_PREVIEW_IMAGE] },
  { sectionKey: "section-1", section: "Why Superior", title: "Why ZilkyWipes Are Superior to Everything Else", subtitle: "Discover the revolutionary benefits that make ZilkyWipes the ultimate \nchoice for personal hygiene. Backed by science, loved by users.", detailList: [
    { title: "Eco-friendly", description: "Flushable, Biodegradable, Designed to disappear, responsibly." },
    { title: "Hygienic", description: "Water does what paper can’t.Every time!" },
    { title: "Luxury", description: "Soft. Calm. Considered.Every day!" }
  ], imagePaths: [CRM_PREVIEW_IMAGE] },
  { sectionKey: "advantage", section: "Zilky Advantage", title: "The ZilkyWipes Advantage", subtitle: "-", advantageList: [
    { label: "Cleanliness Level", zilkyType: "stars", zilkyText: "5", tpType: "stars", tpText: "2", wwType: "stars", wwText: "4" },
    { label: "Flushable & Safe", zilkyType: "check", zilkyText: "", tpType: "check", tpText: "", wwType: "cross", wwText: "Most aren't" },
    { label: "Convenience", zilkyType: "check", zilkyText: "", tpType: "check", tpText: "", wwType: "cross", wwText: "Separate dispenser" },
    { label: "Skin-Friendly", zilkyType: "check", zilkyText: "", tpType: "warn", tpText: "Can irritate", wwType: "warn", wwText: "Often harsh" },
    { label: "Environmental Impact", zilkyType: "check", zilkyText: "", tpType: "warn", tpText: "Deforestation", wwType: "cross", wwText: "Often harmful" }
  ], imagePaths: [] },
  { sectionKey: "comfort", section: "Engineered for Comfort", title: "Engineered for Comfort", subtitle: "-", detailList: [{title: "Superior Cleanliness", description: "Clinically effective formula that leaves you feeling remarkably fresh and clean."}], imagePaths: [] },
  { sectionKey: "section-2", section: "Environmental Responsibility", title: "Environmental Responsibility", subtitle: "We're committed to making clean choices that are also green choices. Every ZilkyWipe is designed with the planet in mind.", detailList: [{title: "100% Biodegradable", description: "Breaks down completely in water within 24 hours, leaving no harmful residue."}], imagePaths: ['/video/1.mp4'] },
  { sectionKey: "proven-results", section: "Proven Results", title: "Scientifically Proven Results", subtitle: "-", statList: [{value: "99.9%", title: "Bacteria Removal Rate", description: "Breaks down 4x faster than leading competitor wet wipes."}], imagePaths: [] },
  { sectionKey: "testimonial", section: "Testimonials", title: "People don’t talk about this. ....Until they try it!", subtitle: "-", imagePaths: [] },
  { sectionKey: "footer-video", section: "Footer Video", title: "-", subtitle: "-", imagePaths: [CRM_PREVIEW_IMAGE] },
];

export default function CrmBenefitsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<CrmBenefitsRow | null>(null);
  
  const queryClient = useQueryClient();
  
  const { data: pageData, isLoading } = useQuery({
    queryKey: ["page", "benefits"],
    queryFn: () => getPage("benefits"),
  });

  useEffect(() => {
    if (!isLoading && pageData === null) {
      createPage("benefits", "Benefits").then(() => {
        queryClient.invalidateQueries({ queryKey: ["page", "benefits"] });
      });
    }
  }, [isLoading, pageData, queryClient]);

  const upsertMutation = useMutation({
    mutationFn: ({ sectionKey, content }: { sectionKey: string; content: any }) => 
      upsertSection("benefits", sectionKey, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["page", "benefits"] });
    }
  });

  const crmBenefitsRows: CrmBenefitsRow[] = defaultSections.map((def, index) => {
    const sectionData = pageData?.sections?.find((s: any) => s.sectionKey === def.sectionKey);
    const content = sectionData?.content || {};
    
    return {
      id: sectionData?.id || String(index + 1),
      sectionKey: def.sectionKey,
      section: def.section,
      title: content.title || def.title,
      subtitle: content.subtitle || def.subtitle,
      points: content.points || (def as any).points,
      detailList: content.detailList || (def as any).detailList,
      statList: content.statList || (def as any).statList,
      advantageList: content.advantageList || (def as any).advantageList,
      imagePaths: content.imagePaths !== undefined ? content.imagePaths : def.imagePaths,
    };
  });

  const handleEdit = (row: CrmBenefitsRow) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const handleSave = async (sectionKey: string, content: any) => {
    await upsertMutation.mutateAsync({ sectionKey, content });
  };

  const columns: DashboardTableColumn<CrmBenefitsRow>[] = [
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
        data={crmBenefitsRows}
        columns={columns}
        getRowId={(row) => row.id}
        searchPredicate={(row, query) => {
          const text = `${row.section} ${row.title} ${row.subtitle}`;
          return text.toLowerCase().includes(query.toLowerCase());
        }}
        pageSizeOptions={[50]}
        defaultPageSize={50}
        footerMode='count-only'
        countOnlyLabel='Sections'
      />

      <CRMDynamicEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        sectionKey={selectedRow?.sectionKey || null}
        sectionName={selectedRow?.section || null}
        initialContent={
          selectedRow ? { 
            title: selectedRow.title, 
            subtitle: selectedRow.subtitle, 
            points: selectedRow.points,
            detailList: selectedRow.detailList,
            statList: selectedRow.statList,
            imagePaths: selectedRow.imagePaths 
          } : null
        }
        pageKey="benefits"
        onSave={handleSave}
      />
    </section>
  );
}
