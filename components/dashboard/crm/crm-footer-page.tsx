'use client';

import DashboardDataTable from '@/components/shared/dashboard-data-table';
import {
  ArrowRight,
  ListFilter,
  Forward,
  UserRound,
  ChevronsRight,
  Save,
  Trash2,
  Plus,
  Star,
  AlignLeft,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPage, upsertSection, createPage } from '@/lib/api/pages';
import { useForm, useFieldArray } from 'react-hook-form';
import { toast } from 'sonner';

// --- Types ---
type CrmFooterRow = {
  id: string;
  section: string;
  sectionKey: string;
  topic: string;
  title: string;
  subtitle: string;
  type: 'text' | 'links' | 'social' | 'contact' | 'subscription';
};

// --- Modals ---

// Modal for editing text/basic sections (Company Info, Copyright, Subscription)
function BasicEditModal({
  isOpen,
  onClose,
  rowData,
  pageData,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  rowData: CrmFooterRow | null;
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
    if (isOpen && rowData) {
      const content =
        pageData?.sections?.find((s: any) => s.sectionKey === rowData.sectionKey)?.content || {};
      reset({
        text: content.text || '',
        title: content.title || '',
        buttonText: content.buttonText || '',
      });
    }
  }, [isOpen, rowData, pageData, reset]);

  if (!isOpen || !rowData || !['text', 'subscription'].includes(rowData.type)) return null;

  const onSubmit = async (data: any) => {
    try {
      if (rowData.type === 'text') {
        await onSave(rowData.sectionKey, { text: data.text });
      } else if (rowData.type === 'subscription') {
        await onSave(rowData.sectionKey, { title: data.title, buttonText: data.buttonText });
      }
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

          {rowData.type === 'text' && (
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Content</label>
              <textarea
                {...register('text')}
                required
                rows={6}
                className='w-full px-3 py-2 border rounded-md'
              />
            </div>
          )}

          {rowData.type === 'subscription' && (
            <>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Title</label>
                <input
                  {...register('title')}
                  required
                  className='w-full px-3 py-2 border rounded-md'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Button Text</label>
                <input
                  {...register('buttonText')}
                  required
                  className='w-full px-3 py-2 border rounded-md'
                />
              </div>
            </>
          )}
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

// Modal for Contact Info
function ContactEditModal({
  isOpen,
  onClose,
  rowData,
  pageData,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  rowData: CrmFooterRow | null;
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
    if (isOpen && rowData) {
      const content =
        pageData?.sections?.find((s: any) => s.sectionKey === rowData.sectionKey)?.content || {};
      reset({
        email: content.email || '',
        phone: content.phone || '',
        address: content.address || '',
      });
    }
  }, [isOpen, rowData, pageData, reset]);

  if (!isOpen || !rowData || rowData.type !== 'contact') return null;

  const onSubmit = async (data: any) => {
    try {
      await onSave(rowData.sectionKey, {
        email: data.email,
        phone: data.phone,
        address: data.address,
      });
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
            <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
            <input {...register('email')} required className='w-full px-3 py-2 border rounded-md' />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Phone</label>
            <input {...register('phone')} required className='w-full px-3 py-2 border rounded-md' />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Address</label>
            <textarea
              {...register('address')}
              required
              rows={3}
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

// Modal for editing Arrays of Links (Pages, Others, Socials)
function LinksEditModal({
  isOpen,
  onClose,
  rowData,
  pageData,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  rowData: CrmFooterRow | null;
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
    defaultValues: { links: [] as any[] },
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'links' });

  useEffect(() => {
    if (isOpen && rowData && (rowData.type === 'links' || rowData.type === 'social')) {
      const content = pageData?.sections?.find((s: any) => s.sectionKey === rowData.sectionKey)
        ?.content || { links: [] };
      reset({ links: content.links || [] });
    }
  }, [isOpen, rowData, pageData, reset]);

  if (!isOpen || !rowData || !['links', 'social'].includes(rowData.type)) return null;

  const isSocial = rowData.type === 'social';

  const onSubmit = async (data: any) => {
    try {
      await onSave(rowData.sectionKey, { links: data.links });
      toast.success('Links updated successfully');
      onClose();
    } catch (e) {
      toast.error('Failed to update links');
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
        className='relative z-10 w-full max-w-2xl bg-white rounded-[10px] h-full overflow-y-auto shadow-2xl flex flex-col p-4'
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
          <div className='flex items-center justify-between'>
            <p className='text-2xl font-semibold'>Edit {rowData.section}</p>
            <button
              type='button'
              onClick={() =>
                append(isSocial ? { platform: '', href: '' } : { label: '', href: '' })
              }
              className='flex items-center gap-1 text-sm bg-blue-50 text-blue-600 px-3 py-1.5 rounded-md hover:bg-blue-100 transition-colors'
            >
              <Plus size={16} /> Add Link
            </button>
          </div>

          <div className='space-y-4'>
            {fields.map((field, index) => (
              <div
                key={field.id}
                className='flex items-start gap-4 p-4 border rounded-lg bg-gray-50 relative group'
              >
                <div className='flex-1 space-y-3'>
                  <div>
                    <label className='block text-xs font-medium text-gray-500 mb-1'>
                      {isSocial ? 'Platform' : 'Label'}
                    </label>
                    {isSocial ? (
                      <select
                        {...register(`links.${index}.platform` as const)}
                        required
                        className='w-full px-3 py-2 text-sm border rounded-md'
                      >
                        <option value=''>Select Platform</option>
                        <option value='Facebook'>Facebook</option>
                        <option value='Instagram'>Instagram</option>
                        <option value='Tiktok'>Tiktok</option>
                        <option value='Youtube'>Youtube</option>
                        <option value='Snapchat'>Snapchat</option>
                      </select>
                    ) : (
                      <input
                        {...register(`links.${index}.label` as const)}
                        required
                        placeholder='e.g. Home'
                        className='w-full px-3 py-2 text-sm border rounded-md'
                      />
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">URL / Href</label>
                    <input 
                      {...register(`links.${index}.href` as const)} 
                      required 
                      placeholder={isSocial ? "e.g. https://facebook.com/..." : "e.g. /home or https://..."}
                      className="w-full px-3 py-2 text-sm border rounded-md" 
                    />
                  </div>
                </div>
                <button
                  type='button'
                  onClick={() => remove(index)}
                  className='mt-6 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors'
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
            {fields.length === 0 && (
              <p className='text-sm text-gray-500 text-center py-6 bg-gray-50 rounded-lg border border-dashed'>
                No links added yet. Click "Add Link" to start.
              </p>
            )}
          </div>
        </div>

        <div className='mt-8 border-t pt-4 flex justify-end sticky bottom-0 bg-white pb-2'>
          <button
            disabled={isSubmitting}
            type='submit'
            className='bg-[#262626] text-white px-6 py-2.5 rounded-md flex items-center hover:bg-black transition-colors shadow-sm'
          >
            <Save className='w-4 h-4 mr-2' /> {isSubmitting ? 'Saving...' : 'Save Links'}
          </button>
        </div>
      </form>
    </section>
  );
}

// --- Main Page Component ---
export default function CrmFooterPage() {
  const [activeModal, setActiveModal] = useState<'basic' | 'links' | 'contact' | null>(null);
  const [selectedRow, setSelectedRow] = useState<CrmFooterRow | null>(null);

  const queryClient = useQueryClient();

  const { data: pageData, isLoading } = useQuery({
    queryKey: ['page', 'footer'],
    queryFn: () => getPage('footer'),
  });

  useEffect(() => {
    if (!isLoading && pageData === null) {
      createPage('footer', 'Footer Config').then(() => {
        queryClient.invalidateQueries({ queryKey: ['page', 'footer'] });
      });
    }
  }, [isLoading, pageData, queryClient]);

  const upsertMutation = useMutation({
    mutationFn: ({ sectionKey, content }: { sectionKey: string; content: any }) =>
      upsertSection('footer', sectionKey, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['page', 'footer'] });
    },
  });

  const handleEdit = (row: CrmFooterRow) => {
    setSelectedRow(row);
    if (row.type === 'links' || row.type === 'social') setActiveModal('links');
    else if (row.type === 'contact') setActiveModal('contact');
    else setActiveModal('basic');
  };

  const getContent = (key: string) =>
    pageData?.sections?.find((s: any) => s.sectionKey === key)?.content || {};

  // Build rows dynamically
  const rows: CrmFooterRow[] = [];
  if (pageData) {
    const cInfo = getContent('company_info');
    rows.push({
      id: 'company_info',
      sectionKey: 'company_info',
      section: 'Company Description',
      topic: 'Text',
      title: 'Paragraph',
      subtitle: cInfo.text || 'ZilkyWipes was created for everyday hygiene...',
      type: 'text',
    });

    const lPages = getContent('links_pages');
    rows.push({
      id: 'links_pages',
      sectionKey: 'links_pages',
      section: 'Pages Links',
      topic: 'List',
      title: `${lPages.links?.length || 5} Links`,
      subtitle: 'Home, Shop, About Us, Benefits, FAQ',
      type: 'links',
    });

    const lOthers = getContent('links_others');
    rows.push({
      id: 'links_others',
      sectionKey: 'links_others',
      section: 'Other Links',
      topic: 'List',
      title: `${lOthers.links?.length || 5} Links`,
      subtitle: 'Press & Media, Blog, Careers, Terms, Return Policy',
      type: 'links',
    });

    const lSocial = getContent('links_social');
    rows.push({
      id: 'links_social',
      sectionKey: 'links_social',
      section: 'Social Media Icons',
      topic: 'List',
      title: `${lSocial.links?.length || 5} Platforms`,
      subtitle: 'Facebook, Instagram, Tiktok, Youtube, Snapchat',
      type: 'social',
    });

    const contact = getContent('contact_info');
    rows.push({
      id: 'contact_info',
      sectionKey: 'contact_info',
      section: 'Contact Info',
      topic: 'Details',
      title: 'Contact Info',
      subtitle: `${contact.email || 'Email'}, ${contact.phone || 'Phone'}, ${contact.address ? 'Address set' : ''}`,
      type: 'contact',
    });

    const sub = getContent('subscription');
    rows.push({
      id: 'subscription',
      sectionKey: 'subscription',
      section: 'Subscription Box',
      topic: 'Form',
      title: sub.title || 'Get Notified',
      subtitle: `Button: ${sub.buttonText || 'Subscribe'}`,
      type: 'subscription',
    });

    const copy = getContent('copyright');
    rows.push({
      id: 'copyright',
      sectionKey: 'copyright',
      section: 'Copyright Text',
      topic: 'Text',
      title: 'Copyright',
      subtitle: copy.text || 'All rights reserved by: ZilkyWipes© 2025',
      type: 'text',
    });
  }

  const columns = [
    {
      id: 'section',
      header: 'Section',
      icon: UserRound,
      widthClassName: 'w-[20%]',
      cell: (row: CrmFooterRow) => <span className='font-medium text-gray-800'>{row.section}</span>,
    },
    {
      id: 'topic',
      header: 'Type',
      icon: AlignLeft,
      widthClassName: 'w-[15%]',
      cell: (row: CrmFooterRow) => <span className='text-gray-500 text-sm'>{row.topic}</span>,
    },
    {
      id: 'title',
      header: 'Summary',
      icon: ListFilter,
      widthClassName: 'w-[20%]',
      cell: (row: CrmFooterRow) => <span className='block truncate'>{row.title}</span>,
    },
    {
      id: 'subtitle',
      header: 'Content Preview',
      icon: Star,
      widthClassName: 'w-[30%]',
      cell: (row: CrmFooterRow) => (
        <span className='block truncate text-gray-500'>{row.subtitle}</span>
      ),
    },
    {
      id: 'action',
      header: 'Action',
      icon: Forward,
      widthClassName: 'w-[15%]',
      cell: (row: CrmFooterRow) => (
        <button
          type='button'
          onClick={() => handleEdit(row)}
          className='inline-flex items-center gap-1 rounded-md border border-[#E5E7EB] bg-[#FAFAF9] px-2.5 py-1 text-sm text-[#262626] hover:bg-[#efefef]'
        >
          <span>Edit Section</span> <ArrowRight className='h-3.5 w-3.5' />
        </button>
      ),
    },
  ];

  return (
    <section>
      {isLoading && <div className='mb-4 text-sm text-gray-500'>Loading data...</div>}
      <DashboardDataTable
        searchPlaceholder='Search footer sections'
        data={rows}
        columns={columns}
        getRowId={(row) => row.id}
        searchPredicate={(row, query) =>
          `${row.section} ${row.title} ${row.subtitle}`.toLowerCase().includes(query)
        }
        pageSizeOptions={[50]}
        defaultPageSize={50}
        countOnlyLabel='Sections'
      />
      <BasicEditModal
        isOpen={activeModal === 'basic'}
        onClose={() => setActiveModal(null)}
        rowData={selectedRow}
        pageData={pageData}
        onSave={async (key, content) =>
          await upsertMutation.mutateAsync({ sectionKey: key, content })
        }
      />
      <LinksEditModal
        isOpen={activeModal === 'links'}
        onClose={() => setActiveModal(null)}
        rowData={selectedRow}
        pageData={pageData}
        onSave={async (key, content) =>
          await upsertMutation.mutateAsync({ sectionKey: key, content })
        }
      />
      <ContactEditModal
        isOpen={activeModal === 'contact'}
        onClose={() => setActiveModal(null)}
        rowData={selectedRow}
        pageData={pageData}
        onSave={async (key, content) =>
          await upsertMutation.mutateAsync({ sectionKey: key, content })
        }
      />
    </section>
  );
}
