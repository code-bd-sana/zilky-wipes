"use client";

import DashboardDataTable from "@/components/shared/dashboard-data-table";
import { ArrowRight, Forward, ListFilter, UserRound, ChevronsRight, Save, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPage, upsertSection, createPage } from "@/lib/api/pages";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type CrmPushFeedbackRow = {
  id: string;
  section: string;
  sectionKey: string;
  title: string;
  subtitle: string;
  type: "prompt" | "input" | "upload" | "cta";
};

type PageSectionContent = {
  title?: string;
  subtitle?: string;
  text?: string;
  submitText?: string;
  referText?: string;
};

type PageSection = {
  id?: string;
  sectionKey: string;
  content: PageSectionContent;
};

type PageData = {
  id: string;
  pageKey: string;
  title: string;
  sections: PageSection[];
};

function PushFeedbackEditModal({
  isOpen,
  onClose,
  rowData,
  pageData,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  rowData: CrmPushFeedbackRow | null;
  pageData: PageData | null;
  onSave: (sectionKey: string, content: Record<string, unknown>) => Promise<void>;
}) {
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

  useEffect(() => {
    if (isOpen && rowData) {
      const content = pageData?.sections?.find((s: PageSection) => s.sectionKey === rowData.sectionKey)?.content || {};
      reset(content);
    }
  }, [isOpen, rowData, pageData, reset]);

  if (!isOpen || !rowData) return null;

  const onSubmit = async (data: Record<string, unknown>) => {
    try {
      await onSave(rowData.sectionKey, data);
      toast.success("Saved successfully");
      onClose();
    } catch {
      toast.error("Failed to save");
    }
  };

  return (
    <section className="fixed inset-0 flex justify-end z-50 p-3" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="absolute inset-0 backdrop-blur-sm bg-black/20" />
      <form onSubmit={handleSubmit(onSubmit)} className="relative z-10 w-full max-w-xl bg-white rounded-[10px] h-full overflow-y-auto shadow-2xl flex flex-col p-4">
        <div className="flex items-center gap-2 mb-4">
          <button type="button" onClick={onClose} className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400">
            <ChevronsRight className="w-6 h-6 text-gray-800" />
          </button>
        </div>
        <div className="flex-1 px-2 space-y-4">
          <p className="text-2xl font-semibold mb-6">Edit {rowData.section}</p>
          
          {rowData.type === "prompt" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input {...register("title")} required className="w-full px-3 py-2 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                <textarea {...register("subtitle")} required rows={4} className="w-full px-3 py-2 border rounded-md" />
              </div>
            </>
          )}

          {(rowData.type === "input" || rowData.type === "upload") && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Text</label>
              <input {...register("text")} required className="w-full px-3 py-2 border rounded-md" />
            </div>
          )}

          {rowData.type === "cta" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Submit Button Text</label>
                <input {...register("submitText")} required className="w-full px-3 py-2 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Refer Button Text</label>
                <input {...register("referText")} required className="w-full px-3 py-2 border rounded-md" />
              </div>
            </>
          )}

        </div>
        <div className="mt-10 border-t pt-4 flex justify-end">
          <button disabled={isSubmitting} type="submit" className="bg-[#FAFAF9] border px-4 py-2 rounded-md flex items-center">
            <Save className="w-4 h-4 mr-2" /> {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default function CrmPushFeedbackPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<CrmPushFeedbackRow | null>(null);

  const queryClient = useQueryClient();

  const { data: pageData, isLoading } = useQuery({
    queryKey: ["page", "push-feedback"],
    queryFn: () => getPage("push-feedback"),
  });

  useEffect(() => {
    if (!isLoading && pageData === null) {
      createPage("push-feedback", "Push Feedback Modal Configuration").then(() => {
        queryClient.invalidateQueries({ queryKey: ["page", "push-feedback"] });
      });
    }
  }, [isLoading, pageData, queryClient]);

  const upsertMutation = useMutation({
    mutationFn: ({ sectionKey, content }: { sectionKey: string; content: Record<string, unknown> }) =>
      upsertSection("push-feedback", sectionKey, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["page", "push-feedback"] });
    },
  });

  const handleEdit = (row: CrmPushFeedbackRow) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const getContent = (key: string) => (pageData as PageData)?.sections?.find((s: PageSection) => s.sectionKey === key)?.content || {};

  const rows: CrmPushFeedbackRow[] = [];
  if (pageData) {
    const prompt = getContent("prompt");
    rows.push({
      id: "prompt", sectionKey: "prompt", section: "Prompt", 
      title: prompt.title || "How does it feel so far?", subtitle: prompt.subtitle || "Your experience matters to us. Good or bad - we're listening...", type: "prompt"
    });

    const input = getContent("input");
    rows.push({
      id: "input", sectionKey: "input", section: "Input", 
      title: input.text || "Write your experience", subtitle: "-", type: "input"
    });

    const upload = getContent("upload");
    rows.push({
      id: "upload", sectionKey: "upload", section: "Upload", 
      title: upload.text || "Upload file, doc, image, gif", subtitle: "-", type: "upload"
    });

    const cta = getContent("cta");
    rows.push({
      id: "cta", sectionKey: "cta", section: "CTA", 
      title: cta.submitText || "Submit Feedback", subtitle: cta.referText || "Refer a Friend", type: "cta"
    });
  }

  const columns = [
    {
      id: "section", header: "Section", icon: UserRound, widthClassName: "w-[20%]",
      cell: (row: CrmPushFeedbackRow) => <span className="font-medium text-gray-800">{row.section}</span>,
    },
    {
      id: "title", header: "Title", icon: ListFilter, widthClassName: "w-[30%]",
      cell: (row: CrmPushFeedbackRow) => <span className="block truncate">{row.title}</span>,
    },
    {
      id: "subtitle", header: "Subtitle", icon: Star, widthClassName: "w-[35%]",
      cell: (row: CrmPushFeedbackRow) => <span className="block truncate text-gray-500">{row.subtitle}</span>,
    },
    {
      id: "action", header: "Action", icon: Forward, widthClassName: "w-[15%]",
      cell: (row: CrmPushFeedbackRow) => (
        <button type="button" onClick={() => handleEdit(row)} className="inline-flex items-center gap-1 rounded-md border border-[#E5E7EB] bg-[#FAFAF9] px-2.5 py-1 text-sm text-[#262626] hover:bg-[#efefef]">
          <span>Edit</span> <ArrowRight className="h-3.5 w-3.5" />
        </button>
      ),
    },
  ];

  return (
    <section>
      {isLoading && <div className="mb-4 text-sm text-gray-500">Loading data...</div>}
      <DashboardDataTable
        searchPlaceholder="Search sections"
        data={rows}
        columns={columns}
        getRowId={(row) => row.id}
        searchPredicate={(row, query) => `${row.section} ${row.title} ${row.subtitle}`.toLowerCase().includes(query)}
        pageSizeOptions={[50]}
        defaultPageSize={50}
        countOnlyLabel="Sections"
      />
      <PushFeedbackEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        rowData={selectedRow}
        pageData={pageData}
        onSave={async (key, content) => await upsertMutation.mutateAsync({ sectionKey: key, content })}
      />
    </section>
  );
}
