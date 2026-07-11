'use client';

import { useGetMe } from '@/hooks/useAuth';
import { useProductReviews, useProductReviewStats, useReviewEligibility } from '@/hooks/useReviews';
import { MessageSquarePlus, Star } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';
import ReviewModal from './review-modal';

interface ReviewsSectionProps {
  productId: string;
}

export default function ReviewsSection({ productId }: ReviewsSectionProps) {
  const { data: authData } = useGetMe();
  const user = authData?.data;

  const { data: statsData, isLoading: statsLoading } = useProductReviewStats(productId);
  const { data: reviewsData, isLoading: reviewsLoading } = useProductReviews(productId, {
    limit: 20,
  });
  const { data: eligibilityData } = useReviewEligibility(productId, !!user);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const stats = statsData?.data;
  const reviews = reviewsData?.data || [];

  const handleWriteReviewClick = () => {
    if (!user) {
      toast.error('Please login to leave a review.');
      return;
    }

    if (eligibilityData?.data?.alreadyReviewed) {
      toast.error('You have already reviewed this product.');
      return;
    }

    if (!eligibilityData?.data?.eligible) {
      toast.error('You must purchase this product to leave a review.');
      return;
    }

    setIsModalOpen(true);
  };

  if (statsLoading || reviewsLoading) {
    return (
      <div className='py-12 flex justify-center text-gray-500 animate-pulse'>
        Loading reviews...
      </div>
    );
  }

  return (
    <div className='py-16 border-t border-gray-100 mt-16' id='reviews'>
      <div className='max-w-7xl mx-auto px-4 md:px-8'>
        <h2 className='text-3xl font-bold text-[#141414] mb-10 text-center'>Customer Reviews</h2>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-12'>
          {/* Stats Column */}
          <div className='lg:col-span-1'>
            <div className='bg-[#FAFAF9] rounded-2xl p-8 sticky top-32'>
              <div className='text-center mb-6'>
                <div className='text-5xl font-bold text-[#141414] mb-2'>
                  {stats?.averageRating || '0.0'}
                </div>
                <div className='flex items-center justify-center gap-1 mb-2'>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= Math.round(stats?.averageRating || 0)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'fill-transparent text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className='text-gray-500 text-sm'>Based on {stats?.totalReviews || 0} reviews</p>
              </div>

              <div className='space-y-3 mb-8'>
                {[5, 4, 3, 2, 1].map((star) => {
                  const count =
                    stats?.ratingDistribution?.[
                      star.toString() as keyof typeof stats.ratingDistribution
                    ] || 0;
                  const percentage = stats?.totalReviews ? (count / stats.totalReviews) * 100 : 0;

                  return (
                    <div key={star} className='flex items-center gap-3 text-sm text-gray-600'>
                      <div className='flex items-center gap-1 w-12 font-medium'>
                        {star} <Star className='w-3.5 h-3.5 fill-gray-400 text-gray-400' />
                      </div>
                      <div className='flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden'>
                        <div
                          className='h-full bg-yellow-400 rounded-full'
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <div className='w-8 text-right text-gray-400'>{count}</div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={handleWriteReviewClick}
                className='w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-[#141414] text-white rounded-xl font-medium hover:bg-black transition-colors'
              >
                <MessageSquarePlus className='w-5 h-5' />
                Write a Review
              </button>
            </div>
          </div>

          {/* Reviews List */}
          <div className='lg:col-span-2 space-y-8'>
            {reviews.length === 0 ? (
              <div className='text-center py-16 bg-gray-50 rounded-2xl border border-gray-100 border-dashed'>
                <MessageSquarePlus className='w-12 h-12 text-gray-300 mx-auto mb-4' />
                <h3 className='text-lg font-medium text-gray-900 mb-1'>No reviews yet</h3>
                <p className='text-gray-500'>Be the first to review this product.</p>
              </div>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className='border-b border-gray-100 pb-8 last:border-0'>
                  <div className='flex items-center justify-between mb-4'>
                    <div>
                      <div className='font-semibold text-gray-900 flex items-center gap-2'>
                        {review.user?.firstName} {review.user?.lastName}
                        {review.isVerifiedPurchase && (
                          <span className='text-[10px] uppercase font-bold tracking-wider bg-green-100 text-green-700 px-2 py-0.5 rounded-full'>
                            Verified Buyer
                          </span>
                        )}
                      </div>
                      <div className='text-sm text-gray-500 mt-0.5'>
                        {new Date(review.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </div>
                    </div>
                    <div className='flex gap-1'>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= review.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'fill-transparent text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {review.comment && (
                    <p className='text-gray-700 leading-relaxed'>{review.comment}</p>
                  )}

                  {review.images && review.images.length > 0 && (
                    <div className='flex gap-3 mt-4 overflow-x-auto pb-2'>
                      {review.images.map((img, idx) => (
                        <Image
                          key={idx}
                          src={img}
                          alt='Review attachment'
                          className='w-24 h-24 object-cover rounded-xl border border-gray-200'
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {isModalOpen && <ReviewModal productId={productId} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
