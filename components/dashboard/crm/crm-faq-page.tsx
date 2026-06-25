"use client";

import DashboardDataTable from "@/components/shared/dashboard-data-table";
import {
  ArrowRight,
  Calendar,
  Forward,
  ListFilter,
  Star,
  UserRound,
  ChevronsRight,
  Save,
  Trash2
} from "lucide-react";
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPage, upsertSection, createPage } from "@/lib/api/pages";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

// --- Types ---
type CrmFAQRow = {
  id: string;
  section: string;
  topic: string;
  title: string;
  subtitle: string;
  type: "hero" | "cta" | "faq";
  topicIndex?: number;
  questionIndex?: number;
};

// --- Modals ---
function FAQEditModal({
  isOpen,
  onClose,
  rowData,
  pageData,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  rowData: CrmFAQRow | null;
  pageData: any;
  onSave: (sectionKey: string, content: any) => Promise<void>;
}) {
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

  useEffect(() => {
    if (isOpen && rowData) {
      reset({
        topic: rowData.topic !== "-" ? rowData.topic : "",
        title: rowData.title,
        subtitle: rowData.subtitle,
      });
    }
  }, [isOpen, rowData, reset]);

  if (!isOpen || !rowData) return null;

  const onSubmit = async (data: any) => {
    try {
      if (rowData.type === "hero") {
        await onSave("hero", { title: data.title, subtitle: data.subtitle });
      } else if (rowData.type === "cta") {
        await onSave("cta", { title: data.title, subtitle: data.subtitle });
      } else if (rowData.type === "faq") {
        const faqsContent = pageData?.sections?.find((s: any) => s.sectionKey === "faqs")?.content || { topics: [] };
        const topics = [...faqsContent.topics];
        
        // Remove from old topic
        const oldTopic = topics[rowData.topicIndex!];
        oldTopic.questions.splice(rowData.questionIndex!, 1);
        if (oldTopic.questions.length === 0) {
          topics.splice(rowData.topicIndex!, 1); // remove empty topic
        }

        // Add to new/existing topic
        const newTopicName = data.topic.trim();
        let targetTopic = topics.find((t: any) => t.name.toLowerCase() === newTopicName.toLowerCase());
        if (!targetTopic) {
          targetTopic = { name: newTopicName, questions: [] };
          topics.push(targetTopic);
        }
        targetTopic.questions.push({
          id: rowData.id,
          question: data.title,
          answer: data.subtitle
        });

        await onSave("faqs", { topics });
      }
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
          
          {rowData.type === "faq" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Topic / Category</label>
              <input {...register("topic")} required className="w-full px-3 py-2 border rounded-md" placeholder="e.g. Shipping & Delivery" />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{rowData.type === "faq" ? "Question" : "Title"}</label>
            <input {...register("title")} required className="w-full px-3 py-2 border rounded-md" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{rowData.type === "faq" ? "Answer" : "Subtitle"}</label>
            <textarea {...register("subtitle")} required rows={4} className="w-full px-3 py-2 border rounded-md" />
          </div>
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

function FAQAddModal({
  isOpen,
  onClose,
  pageData,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  pageData: any;
  onSave: (sectionKey: string, content: any) => Promise<void>;
}) {
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

  useEffect(() => {
    if (isOpen) reset({ topic: "", question: "", answer: "" });
  }, [isOpen, reset]);

  if (!isOpen) return null;

  const faqsContent = pageData?.sections?.find((s: any) => s.sectionKey === "faqs")?.content || { topics: [] };
  const existingTopics = faqsContent.topics.map((t: any) => t.name);

  const onSubmit = async (data: any) => {
    try {
      const topics = JSON.parse(JSON.stringify(faqsContent.topics));
      const topicName = data.topic.trim();
      
      let targetTopic = topics.find((t: any) => t.name.toLowerCase() === topicName.toLowerCase());
      if (!targetTopic) {
        targetTopic = { name: topicName, questions: [] };
        topics.push(targetTopic);
      }
      
      targetTopic.questions.push({
        id: Math.random().toString(36).substr(2, 9),
        question: data.question,
        answer: data.answer
      });

      await onSave("faqs", { topics });
      toast.success("FAQ added successfully");
      onClose();
    } catch (e) {
      toast.error("Failed to add FAQ");
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
          <p className="text-2xl font-semibold mb-6">Add New FAQ</p>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Topic / Category</label>
            <input {...register("topic")} required list="topics-list" className="w-full px-3 py-2 border rounded-md" placeholder="Type or select a topic..." />
            <datalist id="topics-list">
              {existingTopics.map((t: string) => <option key={t} value={t} />)}
            </datalist>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
            <input {...register("question")} required className="w-full px-3 py-2 border rounded-md" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
            <textarea {...register("answer")} required rows={4} className="w-full px-3 py-2 border rounded-md" />
          </div>
        </div>
        <div className="mt-10 border-t pt-4 flex justify-end">
          <button disabled={isSubmitting} type="submit" className="bg-[#FAFAF9] border px-4 py-2 rounded-md flex items-center">
            <Save className="w-4 h-4 mr-2" /> {isSubmitting ? "Adding..." : "Add FAQ"}
          </button>
        </div>
      </form>
    </section>
  );
}

// --- Main Page Component ---
export default function CrmFAQPage() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<CrmFAQRow | null>(null);

  const queryClient = useQueryClient();

  const { data: pageData, isLoading } = useQuery({
    queryKey: ["page", "faq"],
    queryFn: () => getPage("faq"),
  });

  useEffect(() => {
    if (!isLoading && pageData === null) {
      createPage("faq", "FAQ").then(() => {
        queryClient.invalidateQueries({ queryKey: ["page", "faq"] });
      });
    }
  }, [isLoading, pageData, queryClient]);

  const upsertMutation = useMutation({
    mutationFn: ({ sectionKey, content }: { sectionKey: string; content: any }) =>
      upsertSection("faq", sectionKey, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["page", "faq"] });
    },
  });

  const handleDelete = async (row: CrmFAQRow) => {
    if (row.type !== "faq") return;
    if (!confirm("Are you sure you want to delete this FAQ?")) return;
    
    const faqsContent = pageData?.sections?.find((s: any) => s.sectionKey === "faqs")?.content || { topics: [] };
    const topics = [...faqsContent.topics];
    
    topics[row.topicIndex!].questions.splice(row.questionIndex!, 1);
    if (topics[row.topicIndex!].questions.length === 0) {
      topics.splice(row.topicIndex!, 1);
    }
    
    try {
      await upsertMutation.mutateAsync({ sectionKey: "faqs", content: { topics } });
      toast.success("Deleted successfully");
    } catch (e) {
      toast.error("Failed to delete");
    }
  };

  // Build rows from dynamic data
  const rows: CrmFAQRow[] = [];
  if (pageData) {
    const heroContent = pageData.sections?.find((s: any) => s.sectionKey === "hero")?.content || { title: "Everything you need to know.", subtitle: "Find answers to common questions about your subscription" };
    rows.push({ id: "hero", section: "Page Header", topic: "-", title: heroContent.title, subtitle: heroContent.subtitle, type: "hero" });

    const ctaContent = pageData.sections?.find((s: any) => s.sectionKey === "cta")?.content || { title: "Still have questions?", subtitle: "Our support team is here to help Monday–Friday, 9am–5pm EST" };
    rows.push({ id: "cta", section: "CTA Section", topic: "-", title: ctaContent.title, subtitle: ctaContent.subtitle, type: "cta" });

    const faqsContent = pageData.sections?.find((s: any) => s.sectionKey === "faqs")?.content || { topics: [] };
    faqsContent.topics.forEach((topic: any, tIndex: number) => {
      topic.questions.forEach((q: any, qIndex: number) => {
        rows.push({
          id: q.id || `faq-${tIndex}-${qIndex}`,
          section: "FAQ",
          topic: topic.name,
          title: q.question,
          subtitle: q.answer,
          type: "faq",
          topicIndex: tIndex,
          questionIndex: qIndex
        });
      });
    });
  }

  const columns = [
    {
      id: "section", header: "Section", icon: UserRound, widthClassName: "w-[15%]",
      cell: (row: CrmFAQRow) => <span>{row.section}</span>,
    },
    {
      id: "topic", header: "Topic", icon: ListFilter, widthClassName: "w-[14%]",
      cell: (row: CrmFAQRow) => <span>{row.topic}</span>,
    },
    {
      id: "title", header: "Title/Question", icon: Calendar, widthClassName: "w-[24%]",
      cell: (row: CrmFAQRow) => <span className="block truncate">{row.title}</span>,
    },
    {
      id: "subtitle", header: "Subtitle/Answer", icon: Star, widthClassName: "w-[35%]",
      cell: (row: CrmFAQRow) => <span className="block truncate">{row.subtitle}</span>,
    },
    {
      id: "action", header: "Action", icon: Forward, widthClassName: "w-[14%]",
      cell: (row: CrmFAQRow) => (
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => { setSelectedRow(row); setIsEditModalOpen(true); }} className="inline-flex items-center gap-1 rounded-md border border-[#E5E7EB] bg-[#FAFAF9] px-2.5 py-1 text-sm text-[#262626] hover:bg-[#efefef]">
            <span>Edit</span> <ArrowRight className="h-3.5 w-3.5" />
          </button>
          {row.type === "faq" && (
            <button type="button" onClick={() => handleDelete(row)} className="inline-flex items-center gap-1 rounded-md border border-red-200 bg-red-50 px-2.5 py-1 text-sm text-red-600 hover:bg-red-100">
              <Trash2 className="h-3.5 w-3.5" /> <span>Delete</span>
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <section>
      {isLoading && <div className="mb-4 text-sm text-gray-500">Loading data...</div>}
      <DashboardDataTable
        searchPlaceholder="Search questions"
        data={rows}
        columns={columns}
        getRowId={(row) => row.id}
        searchPredicate={(row, query) => `${row.section} ${row.topic} ${row.title} ${row.subtitle}`.toLowerCase().includes(query)}
        pageSizeOptions={[50]}
        defaultPageSize={50}
        countOnlyLabel="Items"
        addButton="Add FAQ"
        onAddClick={() => setIsAddModalOpen(true)}
      />
      <FAQEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        rowData={selectedRow}
        pageData={pageData}
        onSave={async (key, content) => await upsertMutation.mutateAsync({ sectionKey: key, content })}
      />
      <FAQAddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        pageData={pageData}
        onSave={async (key, content) => await upsertMutation.mutateAsync({ sectionKey: key, content })}
      />
    </section>
  );
}
