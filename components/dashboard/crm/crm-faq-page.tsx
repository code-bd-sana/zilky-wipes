'use client';

import DashboardDataTable from '@/components/shared/dashboard-data-table';
import {
  ArrowRight,
  Forward,
  ListFilter,
  Star,
  UserRound,
  ChevronsRight,
  Save,
  Trash2,
  Plus,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPage, upsertSection, createPage } from '@/lib/api/pages';
import { useForm, useFieldArray } from 'react-hook-form';
import { toast } from 'sonner';

// --- Types ---
type CrmTopicRow = {
  id: string;
  section: string;
  topic: string;
  title: string;
  subtitle: string;
  type: 'hero' | 'cta' | 'topic';
  topicIndex?: number;
};

// --- Modals ---

// Modal for Hero & CTA
function SectionEditModal({
  isOpen,
  onClose,
  rowData,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  rowData: CrmTopicRow | null;
  onSave: (sectionKey: string, content: any) => Promise<void>;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  useEffect(() => {
    if (isOpen && rowData) {
      reset({
        title: rowData.title,
        subtitle: rowData.subtitle,
      });
    }
  }, [isOpen, rowData, reset]);

  if (!isOpen || !rowData || rowData.type === 'topic') return null;

  const onSubmit = async (data: any) => {
    try {
      await onSave(rowData.type, { title: data.title, subtitle: data.subtitle });
      toast.success('Saved successfully');
      onClose();
    } catch (e) {
      toast.error('Failed to save');
    }
  };

  return (
    <section
      className='fixed inset-0 flex justify-end z-50 p-3'
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className='absolute inset-0 backdrop-blur-sm bg-black/20' />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='relative z-10 w-full max-w-xl bg-white rounded-[10px] h-full overflow-y-auto shadow-2xl flex flex-col p-4'
      >
        <div className='flex items-center gap-2 mb-4'>
          <button
            type='button'
            onClick={onClose}
            className='p-1.5 rounded-md hover:bg-gray-100 text-gray-400'
          >
            <ChevronsRight className='w-6 h-6 text-gray-800' />
          </button>
        </div>
        <div className='flex-1 px-2 space-y-4'>
          <p className='text-2xl font-semibold mb-6'>Edit {rowData.section}</p>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Title</label>
            <input {...register('title')} required className='w-full px-3 py-2 border rounded-md' />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Subtitle</label>
            <textarea
              {...register('subtitle')}
              required
              rows={4}
              className='w-full px-3 py-2 border rounded-md'
            />
          </div>
        </div>
        <div className='mt-10 border-t pt-4 flex justify-end'>
          <button
            disabled={isSubmitting}
            type='submit'
            className='bg-[#FAFAF9] border px-4 py-2 rounded-md flex items-center'
          >
            <Save className='w-4 h-4 mr-2' /> {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </section>
  );
}

// Modal for editing a Topic and its Questions
function TopicEditModal({
  isOpen,
  onClose,
  rowData,
  pageData,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  rowData: CrmTopicRow | null;
  pageData: any;
  onSave: (sectionKey: string, content: any) => Promise<void>;
}) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      topicName: '',
      questions: [] as { question: string; answer: string; id: string }[],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  useEffect(() => {
    if (isOpen && rowData && rowData.type === 'topic') {
      const faqsContent = pageData?.sections?.find((s: any) => s.sectionKey === 'faqs')
        ?.content || { topics: [] };
      const topic = faqsContent.topics[rowData.topicIndex!];
      if (topic) {
        reset({
          topicName: topic.name,
          questions: topic.questions || [],
        });
      }
    }
  }, [isOpen, rowData, pageData, reset]);

  if (!isOpen || !rowData || rowData.type !== 'topic') return null;

  const onSubmit = async (data: any) => {
    try {
      const faqsContent = pageData?.sections?.find((s: any) => s.sectionKey === 'faqs')
        ?.content || { topics: [] };
      const topics = JSON.parse(JSON.stringify(faqsContent.topics));

      const targetTopic = topics[rowData.topicIndex!];
      targetTopic.name = data.topicName;

      // Assign unique ids to new questions if missing
      targetTopic.questions = data.questions.map((q: any) => ({
        id: q.id || Math.random().toString(36).substr(2, 9),
        question: q.question,
        answer: q.answer,
      }));

      await onSave('faqs', { topics });
      toast.success('Topic updated successfully');
      onClose();
    } catch (e) {
      toast.error('Failed to update topic');
    }
  };

  return (
    <section
      className='fixed inset-0 flex justify-end z-50 p-3'
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className='absolute inset-0 backdrop-blur-sm bg-black/20' />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='relative z-10 w-full max-w-3xl bg-white rounded-[10px] h-full overflow-y-auto shadow-2xl flex flex-col p-4'
      >
        <div className='flex items-center gap-2 mb-4'>
          <button
            type='button'
            onClick={onClose}
            className='p-1.5 rounded-md hover:bg-gray-100 text-gray-400'
          >
            <ChevronsRight className='w-6 h-6 text-gray-800' />
          </button>
        </div>
        <div className='flex-1 px-2 space-y-6'>
          <p className='text-2xl font-semibold'>Edit Topic</p>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Topic Name</label>
            <input
              {...register('topicName')}
              required
              className='w-full px-3 py-2 border rounded-md'
            />
          </div>

          <div className='border-t pt-6'>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='text-lg font-medium text-gray-900'>Questions</h3>
              <button
                type='button'
                onClick={() => append({ question: '', answer: '', id: '' })}
                className='flex items-center gap-1 text-sm bg-blue-50 text-blue-600 px-3 py-1.5 rounded-md hover:bg-blue-100 transition-colors'
              >
                <Plus size={16} /> Add Question
              </button>
            </div>

            <div className='space-y-4'>
              {fields.map((field, index) => (
                <div key={field.id} className='p-4 border rounded-lg bg-gray-50 relative group'>
                  <button
                    type='button'
                    onClick={() => remove(index)}
                    className='absolute top-4 right-4 p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors'
                  >
                    <Trash2 size={18} />
                  </button>
                  <div className='space-y-3 pr-10'>
                    <div>
                      <label className='block text-xs font-medium text-gray-500 mb-1'>
                        Question {index + 1}
                      </label>
                      <input
                        {...register(`questions.${index}.question` as const)}
                        required
                        placeholder='Enter the question'
                        className='w-full px-3 py-2 text-sm border rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none'
                      />
                    </div>
                    <div>
                      <label className='block text-xs font-medium text-gray-500 mb-1'>Answer</label>
                      <textarea
                        {...register(`questions.${index}.answer` as const)}
                        required
                        rows={3}
                        placeholder='Enter the answer'
                        className='w-full px-3 py-2 text-sm border rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none'
                      />
                    </div>
                  </div>
                </div>
              ))}
              {fields.length === 0 && (
                <p className='text-sm text-gray-500 text-center py-6 bg-gray-50 rounded-lg border border-dashed'>
                  No questions added yet. Click "Add Question" to start.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className='mt-8 border-t pt-4 flex justify-end sticky bottom-0 bg-white pb-2'>
          <button
            disabled={isSubmitting}
            type='submit'
            className='bg-[#262626] text-white px-6 py-2.5 rounded-md flex items-center hover:bg-black transition-colors shadow-sm'
          >
            <Save className='w-4 h-4 mr-2' /> {isSubmitting ? 'Saving...' : 'Save Topic'}
          </button>
        </div>
      </form>
    </section>
  );
}

// Modal for Adding a new Topic
function TopicAddModal({
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
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  useEffect(() => {
    if (isOpen) reset({ topicName: '' });
  }, [isOpen, reset]);

  if (!isOpen) return null;

  const onSubmit = async (data: any) => {
    try {
      const faqsContent = pageData?.sections?.find((s: any) => s.sectionKey === 'faqs')
        ?.content || { topics: [] };
      const topics = JSON.parse(JSON.stringify(faqsContent.topics));

      const topicName = data.topicName.trim();

      if (topics.some((t: any) => t.name.toLowerCase() === topicName.toLowerCase())) {
        toast.error('A topic with this name already exists');
        return;
      }

      topics.push({ name: topicName, questions: [] });

      await onSave('faqs', { topics });
      toast.success('Topic created successfully');
      onClose();
    } catch (e) {
      toast.error('Failed to create topic');
    }
  };

  return (
    <section
      className='fixed inset-0 flex justify-end z-50 p-3'
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className='absolute inset-0 backdrop-blur-sm bg-black/20' />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='relative z-10 w-full max-w-xl bg-white rounded-[10px] h-full overflow-y-auto shadow-2xl flex flex-col p-4'
      >
        <div className='flex items-center gap-2 mb-4'>
          <button
            type='button'
            onClick={onClose}
            className='p-1.5 rounded-md hover:bg-gray-100 text-gray-400'
          >
            <ChevronsRight className='w-6 h-6 text-gray-800' />
          </button>
        </div>
        <div className='flex-1 px-2 space-y-4'>
          <p className='text-2xl font-semibold mb-6'>Add New Topic</p>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Topic Name</label>
            <input
              {...register('topicName')}
              required
              className='w-full px-3 py-2 border rounded-md'
              placeholder='e.g. Shipping & Delivery'
            />
            <p className='text-xs text-gray-500 mt-2'>
              You will be able to add questions to this topic after creating it.
            </p>
          </div>
        </div>
        <div className='mt-10 border-t pt-4 flex justify-end'>
          <button
            disabled={isSubmitting}
            type='submit'
            className='bg-[#262626] text-white px-6 py-2.5 rounded-md flex items-center hover:bg-black transition-colors shadow-sm'
          >
            <Plus className='w-4 h-4 mr-2' /> {isSubmitting ? 'Creating...' : 'Create Topic'}
          </button>
        </div>
      </form>
    </section>
  );
}

// --- Main Page Component ---
export default function CrmFAQPage() {
  const [isSectionEditModalOpen, setIsSectionEditModalOpen] = useState(false);
  const [isTopicEditModalOpen, setIsTopicEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<CrmTopicRow | null>(null);

  const queryClient = useQueryClient();

  const { data: pageData, isLoading } = useQuery({
    queryKey: ['page', 'faq'],
    queryFn: () => getPage('faq'),
  });

  useEffect(() => {
    if (!isLoading && pageData === null) {
      createPage('faq', 'FAQ').then(() => {
        queryClient.invalidateQueries({ queryKey: ['page', 'faq'] });
      });
    }
  }, [isLoading, pageData, queryClient]);

  const upsertMutation = useMutation({
    mutationFn: ({ sectionKey, content }: { sectionKey: string; content: any }) =>
      upsertSection('faq', sectionKey, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['page', 'faq'] });
    },
  });

  const handleDelete = async (row: CrmTopicRow) => {
    if (row.type !== 'topic') return;
    if (
      !confirm(
        `Are you sure you want to delete the entire topic "${row.topic}" and all its questions?`,
      )
    )
      return;

    const faqsContent = pageData?.sections?.find((s: any) => s.sectionKey === 'faqs')?.content || {
      topics: [],
    };
    const topics = [...faqsContent.topics];

    topics.splice(row.topicIndex!, 1);

    try {
      await upsertMutation.mutateAsync({ sectionKey: 'faqs', content: { topics } });
      toast.success('Topic deleted successfully');
    } catch (e) {
      toast.error('Failed to delete topic');
    }
  };

  const handleEdit = (row: CrmTopicRow) => {
    setSelectedRow(row);
    if (row.type === 'topic') {
      setIsTopicEditModalOpen(true);
    } else {
      setIsSectionEditModalOpen(true);
    }
  };

  // Build rows grouped by topic
  const rows: CrmTopicRow[] = [];
  if (pageData) {
    const heroContent = pageData.sections?.find((s: any) => s.sectionKey === 'hero')?.content || {
      title: 'Everything you need to know.',
      subtitle: 'Find answers to common questions about your subscription',
    };
    rows.push({
      id: 'hero',
      section: 'Page Header',
      topic: '-',
      title: heroContent.title,
      subtitle: heroContent.subtitle,
      type: 'hero',
    });

    const ctaContent = pageData.sections?.find((s: any) => s.sectionKey === 'cta')?.content || {
      title: 'Still have questions?',
      subtitle: 'Our support team is here to help Monday–Friday, 9am–5pm EST',
    };
    rows.push({
      id: 'cta',
      section: 'CTA Section',
      topic: '-',
      title: ctaContent.title,
      subtitle: ctaContent.subtitle,
      type: 'cta',
    });

    const faqsContent = pageData.sections?.find((s: any) => s.sectionKey === 'faqs')?.content || {
      topics: [],
    };
    faqsContent.topics.forEach((topic: any, tIndex: number) => {
      rows.push({
        id: `topic-${tIndex}`,
        section: 'FAQ Topic',
        topic: topic.name,
        title: `${topic.questions?.length || 0} Questions`,
        subtitle: 'Click edit to manage questions for this topic',
        type: 'topic',
        topicIndex: tIndex,
      });
    });
  }

  const columns = [
    {
      id: 'section',
      header: 'Section',
      icon: UserRound,
      widthClassName: 'w-[15%]',
      cell: (row: CrmTopicRow) => <span>{row.section}</span>,
    },
    {
      id: 'topic',
      header: 'Topic',
      icon: ListFilter,
      widthClassName: 'w-[20%]',
      cell: (row: CrmTopicRow) => <span className='font-medium text-gray-800'>{row.topic}</span>,
    },
    {
      id: 'title',
      header: 'Content',
      icon: ListFilter,
      widthClassName: 'w-[25%]',
      cell: (row: CrmTopicRow) => (
        <span
          className={`block truncate ${row.type === 'topic' ? 'text-blue-600 font-medium' : ''}`}
        >
          {row.title}
        </span>
      ),
    },
    {
      id: 'subtitle',
      header: 'Description',
      icon: Star,
      widthClassName: 'w-[25%]',
      cell: (row: CrmTopicRow) => (
        <span className='block truncate text-gray-500'>{row.subtitle}</span>
      ),
    },
    {
      id: 'action',
      header: 'Action',
      icon: Forward,
      widthClassName: 'w-[15%]',
      cell: (row: CrmTopicRow) => (
        <div className='flex items-center gap-2'>
          <button
            type='button'
            onClick={() => handleEdit(row)}
            className='inline-flex items-center gap-1 rounded-md border border-[#E5E7EB] bg-[#FAFAF9] px-2.5 py-1 text-sm text-[#262626] hover:bg-[#efefef]'
          >
            <span>{row.type === 'topic' ? 'Manage' : 'Edit'}</span>{' '}
            <ArrowRight className='h-3.5 w-3.5' />
          </button>
          {row.type === 'topic' && (
            <button
              type='button'
              onClick={() => handleDelete(row)}
              className='inline-flex items-center gap-1 rounded-md border border-red-200 bg-red-50 px-2.5 py-1 text-sm text-red-600 hover:bg-red-100'
            >
              <Trash2 className='h-3.5 w-3.5' />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <section>
      {isLoading && <div className='mb-4 text-sm text-gray-500'>Loading data...</div>}
      <DashboardDataTable
        searchPlaceholder='Search topics'
        data={rows}
        columns={columns}
        getRowId={(row) => row.id}
        searchPredicate={(row, query) =>
          `${row.section} ${row.topic} ${row.title}`.toLowerCase().includes(query)
        }
        pageSizeOptions={[50]}
        defaultPageSize={50}
        countOnlyLabel='Items'
        addButton='Add Topic'
        onAddClick={() => setIsAddModalOpen(true)}
      />
      <SectionEditModal
        isOpen={isSectionEditModalOpen}
        onClose={() => setIsSectionEditModalOpen(false)}
        rowData={selectedRow}
        onSave={async (key, content) =>
          await upsertMutation.mutateAsync({ sectionKey: key, content })
        }
      />
      <TopicEditModal
        isOpen={isTopicEditModalOpen}
        onClose={() => setIsTopicEditModalOpen(false)}
        rowData={selectedRow}
        pageData={pageData}
        onSave={async (key, content) =>
          await upsertMutation.mutateAsync({ sectionKey: key, content })
        }
      />
      <TopicAddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        pageData={pageData}
        onSave={async (key, content) =>
          await upsertMutation.mutateAsync({ sectionKey: key, content })
        }
      />
    </section>
  );
}
