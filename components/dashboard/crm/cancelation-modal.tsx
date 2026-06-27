"use client";

import DashboardDataTable from "@/components/shared/dashboard-data-table";
import { ArrowRight, Forward, ListFilter, UserRound, ChevronsRight, Save, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPage, upsertSection, createPage } from "@/lib/api/pages";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type CrmCancelationRow = {
  id: string;
  section: string;
  sectionKey: string;
  title: string;
  subtitle: string;
  type: "hero" | "option" | "note" | "ctas";
};

function CancelationEditModal({
  isOpen,
  onClose,
  rowData,
  pageData,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  rowData: CrmCancelationRow | null;
  pageData: any;
  onSave: (sectionKey: string, content: any) => Promise<void>;
}) {
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

  useEffect(() => {
    if (isOpen && rowData) {
      const content = pageData?.sections?.find((s: any) => s.sectionKey === rowData.sectionKey)?.content || {};
      reset(content);
    }
  }, [isOpen, rowData, pageData, reset]);

  if (!isOpen || !rowData) return null;

  const onSubmit = async (data: any) => {
    try {
      await onSave(rowData.sectionKey, data);
      toast.success("Saved successfully");
      onClose();
    } catch (e) {
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
          
          {rowData.type === "hero" && (
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

          {(rowData.type === "option" || rowData.type === "note") && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Text</label>
              <input {...register("text")} required className="w-full px-3 py-2 border rounded-md" />
            </div>
          )}

          {rowData.type === "ctas" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Primary Button Text</label>
                <input {...register("submitText")} required className="w-full px-3 py-2 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Button Text</label>
                <input {...register("cancelText")} required className="w-full px-3 py-2 border rounded-md" />
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

export default function CrmCancelationPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<CrmCancelationRow | null>(null);

  const queryClient = useQueryClient();

  const { data: pageData, isLoading } = useQuery({
    queryKey: ["page", "cancelation"],
    queryFn: () => getPage("cancelation"),
  });

  useEffect(() => {
    if (!isLoading && pageData === null) {
      createPage("cancelation", "Cancelation Modal Configuration").then(() => {
        queryClient.invalidateQueries({ queryKey: ["page", "cancelation"] });
      });
    }
  }, [isLoading, pageData, queryClient]);

  const upsertMutation = useMutation({
    mutationFn: ({ sectionKey, content }: { sectionKey: string; content: any }) =>
      upsertSection("cancelation", sectionKey, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["page", "cancelation"] });
    },
  });

  const handleEdit = (row: CrmCancelationRow) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const getContent = (key: string) => pageData?.sections?.find((s: any) => s.sectionKey === key)?.content || {};

  const rows: CrmCancelationRow[] = [];
  if (pageData) {
    const hero = getContent("hero");
    rows.push({
      id: "hero", sectionKey: "hero", section: "Modal Heading", 
      title: hero.title || "We’d hate to see you go", subtitle: hero.subtitle || "Before you cancel, would any of these options help?", type: "hero"
    });

    const option1 = getContent("option1");
    rows.push({
      id: "option1", sectionKey: "option1", section: "Option 1", 
      title: option1.text || "Deliver less often", subtitle: "-", type: "option"
    });

    const option2 = getContent("option2");
    rows.push({
      id: "option2", sectionKey: "option2", section: "Option 2", 
      title: option2.text || "Skip just one delivery", subtitle: "-", type: "option"
    });

    const option3 = getContent("option3");
    rows.push({
      id: "option3", sectionKey: "option3", section: "Option 3", 
      title: option3.text || "Pause for a while", subtitle: "-", type: "option"
    });

    const note = getContent("note");
    rows.push({
      id: "note", sectionKey: "note", section: "Note", 
      title: "-", subtitle: note.text || "If none of these work for you right now, we understand.", type: "note"
    });

    const ctas = getContent("ctas");
    rows.push({
      id: "ctas", sectionKey: "ctas", section: "Call to Action", 
      title: ctas.submitText || "Continue with cancellation", subtitle: ctas.cancelText || "Keep my subscription", type: "ctas"
    });
  }

  const columns = [
    {
      id: "section", header: "Section", icon: UserRound, widthClassName: "w-[20%]",
      cell: (row: CrmCancelationRow) => <span className="font-medium text-gray-800">{row.section}</span>,
    },
    {
      id: "title", header: "Primary Text", icon: ListFilter, widthClassName: "w-[30%]",
      cell: (row: CrmCancelationRow) => <span className="block truncate">{row.title}</span>,
    },
    {
      id: "subtitle", header: "Secondary Text", icon: Star, widthClassName: "w-[35%]",
      cell: (row: CrmCancelationRow) => <span className="block truncate text-gray-500">{row.subtitle}</span>,
    },
    {
      id: "action", header: "Action", icon: Forward, widthClassName: "w-[15%]",
      cell: (row: CrmCancelationRow) => (
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
      <CancelationEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        rowData={selectedRow}
        pageData={pageData}
        onSave={async (key, content) => await upsertMutation.mutateAsync({ sectionKey: key, content })}
      />
    </section>
  );
}
