'use client';

import Image from 'next/image';

import DashboardDataTable, {
  type DashboardTableColumn,
} from '@/components/shared/dashboard-data-table';
import { useGetGeneralFeedbacks } from '@/hooks/useFeedback';
import { format } from 'date-fns';
import { useSearchParams } from 'next/navigation';
import {
  Calendar,
  Image as ImageIcon,
  ListFilter,
  Loader2,
  MessageSquareText,
  Star,
  User,
} from 'lucide-react';

type FeedbackRow = {
  id: string;
  customerName: string;
  date: string;
  starLabel: string;
  feedback: string;
  attachmentUrls: string[];
};

const columns: DashboardTableColumn<FeedbackRow>[] = [
  {
    id: 'name',
    header: 'Name',
    icon: User,
    widthClassName: 'w-[15%]',
    cell: (row) => <span>{row.customerName}</span>,
  },
  {
    id: 'date',
    header: 'Date',
    icon: Calendar,
    widthClassName: 'w-[15%]',
    cell: (row) => <span>{row.date}</span>,
  },
  {
    id: 'star',
    header: 'Star',
    icon: Star,
    widthClassName: 'w-[15%]',
    cell: (row) => <span className='capitalize'>{row.starLabel.replace('-', ' ')}</span>,
  },
  {
    id: 'feedback',
    header: 'Feedback',
    icon: MessageSquareText,
    widthClassName: 'w-[35%]',
    cell: (row) => <span className='line-clamp-2'>{row.feedback}</span>,
  },
  {
    id: 'attachments',
    header: 'Attachments',
    icon: ImageIcon,
    widthClassName: 'w-[20%]',
    cell: (row) => (
      <div className='flex gap-2 flex-wrap items-center'>
        {row.attachmentUrls?.length > 0 ? (
          row.attachmentUrls.map((url, i) => (
            <a
              key={i}
              href={url}
              target='_blank'
              rel='noreferrer'
              className='block relative w-10 h-10 overflow-hidden rounded border border-gray-200 hover:opacity-80 transition bg-white items-center justify-center'
            >
              {url.toLowerCase().endsWith('.pdf') ? (
                <span className='text-[10px] font-bold text-gray-400'>PDF</span>
              ) : (
                <Image src={url} alt='Attachment' fill className='object-cover' />
              )}
            </a>
          ))
        ) : (
          <span className='text-gray-400 text-xs'>None</span>
        )}
      </div>
    ),
  },
];

export default function FeedbackListPage() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'general';
  const { data: feedbackResponse, isLoading } = useGetGeneralFeedbacks();

  const feedbacks = feedbackResponse?.data || [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const generalFeedbackRows: FeedbackRow[] = feedbacks.map((fb: any) => ({
    id: fb.id,
    customerName: `${fb.firstName} ${fb.lastName}`,
    date: format(new Date(fb.createdAt), 'MMM dd, yyyy'),
    starLabel: fb.experienceOverall,
    feedback: fb.message,
    attachmentUrls: fb.attachmentUrls || [],
  }));

  return (
    <section>
      {activeTab === 'general' && (
        <>
          {isLoading ? (
            <div className='flex justify-center py-20'>
              <Loader2 className='w-8 h-8 animate-spin text-gray-400' />
            </div>
          ) : (
            <DashboardDataTable
              filterAction={{ label: 'Filter', icon: ListFilter }}
              searchPlaceholder='Search by name or feedback...'
              data={generalFeedbackRows}
              columns={columns}
              getRowId={(row) => row.id}
              searchPredicate={(row, query) => {
                const text = `${row.customerName} ${row.date} ${row.starLabel} ${row.feedback}`;
                return text.toLowerCase().includes(query);
              }}
              pageSizeOptions={[5, 10, 20, 50]}
              defaultPageSize={20}
            />
          )}
        </>
      )}

      {activeTab === 'market' && (
        <div className='py-20 text-center text-gray-500'>
          Market Research Survey data will be displayed here.
        </div>
      )}
    </section>
  );
}
