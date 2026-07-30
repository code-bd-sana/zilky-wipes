'use client';

import Image from 'next/image';

import DashboardDataTable, {
  type DashboardTableColumn,
} from '@/components/shared/dashboard-data-table';
import { useGetGeneralFeedbacks, useGetMarketResearchFeedbacks } from '@/hooks/useFeedback';
import { format } from 'date-fns';
import {
  Calendar,
  Eye,
  Image as ImageIcon,
  Info,
  ListFilter,
  Loader2,
  MessageSquareText,
  Star,
  User,
} from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import ViewGeneralFeedbackModal from './view-general-feedback-modal';
import ViewMarketResearchModal from './view-market-research-modal';

type FeedbackRow = {
  id: string;
  customerName: string;
  date: string;
  starLabel: string;
  feedback: string;
  attachmentUrls: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  raw: any;
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

type MarketResearchRow = {
  id: string;
  nameOrEmail: string;
  date: string;
  navEase: string;
  visualAppeal: string;
  recommend: string;
  overallRating: string;
  attachmentUrls: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  raw: any;
};

const marketColumns: DashboardTableColumn<MarketResearchRow>[] = [
  {
    id: 'name',
    header: 'User',
    icon: User,
    widthClassName: 'w-[15%]',
    cell: (row) => <span className='truncate'>{row.nameOrEmail}</span>,
  },
  {
    id: 'date',
    header: 'Date',
    icon: Calendar,
    widthClassName: 'w-[15%]',
    cell: (row) => <span>{row.date}</span>,
  },
  {
    id: 'navEase',
    header: 'Nav Ease',
    icon: Info,
    widthClassName: 'w-[15%]',
    cell: (row) => <span>{row.navEase}</span>,
  },
  {
    id: 'visualAppeal',
    header: 'Visual',
    icon: Star,
    widthClassName: 'w-[10%]',
    cell: (row) => <span>{row.visualAppeal}</span>,
  },
  {
    id: 'overallRating',
    header: 'Overall',
    icon: Star,
    widthClassName: 'w-[10%]',
    cell: (row) => <span>{row.overallRating}</span>,
  },
  {
    id: 'recommend',
    header: 'Recommend',
    icon: Info,
    widthClassName: 'w-[15%]',
    cell: (row) => <span>{row.recommend}</span>,
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

  const { data: marketResponse, isLoading: isLoadingMarket } = useGetMarketResearchFeedbacks();
  const marketResearches = marketResponse?.data || [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedGeneral, setSelectedGeneral] = useState<any | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedMarket, setSelectedMarket] = useState<any | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const generalFeedbackRows: FeedbackRow[] = feedbacks.map((fb: any) => ({
    id: fb.id,
    customerName: `${fb.firstName} ${fb.lastName}`,
    date: format(new Date(fb.createdAt), 'MMM dd, yyyy'),
    starLabel: fb.experienceOverall,
    feedback: fb.message,
    attachmentUrls: fb.attachmentUrls || [],
    raw: fb,
  }));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const marketResearchRows: MarketResearchRow[] = marketResearches.map((mr: any) => ({
    id: mr.id,
    nameOrEmail: mr.fullName || mr.email || 'Anonymous',
    date: format(new Date(mr.createdAt), 'MMM dd, yyyy'),
    navEase: `${mr.navigationEase}/10`,
    visualAppeal: `${mr.visualAppeal} Stars`,
    recommend: `${mr.recommendLikelihood}/10`,
    overallRating: `${mr.overallRating} Stars`,
    attachmentUrls: mr.attachmentUrls || [],
    raw: mr,
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
              columns={[
                ...columns,
                {
                  id: 'actions',
                  header: 'Actions',
                  icon: Eye,
                  widthClassName: 'w-[10%]',
                  cell: (row) => (
                    <button
                      onClick={() => setSelectedGeneral(row.raw)}
                      className='px-3 py-1.5 text-xs font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition'
                    >
                      View Details
                    </button>
                  ),
                },
              ]}
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
        <>
          {isLoadingMarket ? (
            <div className='flex justify-center py-20'>
              <Loader2 className='w-8 h-8 animate-spin text-gray-400' />
            </div>
          ) : (
            <DashboardDataTable
              filterAction={{ label: 'Filter', icon: ListFilter }}
              searchPlaceholder='Search by name or email...'
              data={marketResearchRows}
              columns={[
                ...marketColumns,
                {
                  id: 'actions',
                  header: 'Actions',
                  icon: Eye,
                  widthClassName: 'w-[10%]',
                  cell: (row) => (
                    <button
                      onClick={() => setSelectedMarket(row.raw)}
                      className='px-3 py-1.5 text-xs font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition'
                    >
                      View Details
                    </button>
                  ),
                },
              ]}
              getRowId={(row) => row.id}
              searchPredicate={(row, query) => {
                const text = `${row.nameOrEmail} ${row.date}`;
                return text.toLowerCase().includes(query);
              }}
              pageSizeOptions={[5, 10, 20, 50]}
              defaultPageSize={20}
            />
          )}
        </>
      )}

      {selectedGeneral && (
        <ViewGeneralFeedbackModal
          feedback={selectedGeneral}
          onClose={() => setSelectedGeneral(null)}
        />
      )}

      {selectedMarket && (
        <ViewMarketResearchModal data={selectedMarket} onClose={() => setSelectedMarket(null)} />
      )}
    </section>
  );
}
