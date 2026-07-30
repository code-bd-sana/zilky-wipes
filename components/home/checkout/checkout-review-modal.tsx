'use client';

import { useGetMyOrders } from '@/hooks/useOrders';
import { useCreateReview } from '@/hooks/useReviews';
import { useGetMySubscriptions } from '@/hooks/useSubscriptions';
import { api } from '@/lib/api/axios';
import { getPage } from '@/lib/api/pages';
import { useQuery } from '@tanstack/react-query';
import { ImagePlus, Loader2, Star, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { toast } from 'sonner';

type CheckoutReviewModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function CheckoutReviewModal({ open, onClose }: CheckoutReviewModalProps) {
  const { data: pageData } = useQuery({
    queryKey: ['page', 'push-feedback'],
    queryFn: () => getPage('push-feedback'),
    enabled: open,
  });

  const { data: ordersData, isLoading: isOrdersLoading } = useGetMyOrders();
  const { data: subsData, isLoading: isSubsLoading } = useGetMySubscriptions();

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const { mutateAsync: createReviewAsync, isPending } = useCreateReview();

  const getContent = (key: string) =>
    pageData?.sections?.find(
      (s: { sectionKey: string; content: Record<string, unknown> }) => s.sectionKey === key,
    )?.content || {};
  const promptData = getContent('prompt');
  const ctaData = getContent('cta');

  const title = promptData.title || 'How does it feel so far?';
  const subtitle =
    promptData.subtitle ||
    "Your experience matters to us. Good or bad - we're listening. It helps us do better.";
  const submitBtnText = ctaData.submitText || 'Submit Feedback';

  useEffect(() => {
    if (!open || typeof document === 'undefined') return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setImages((prev) => [...prev, ...newFiles].slice(0, 5)); // Max 5 images

      const newUrls = newFiles.map((f) => URL.createObjectURL(f));
      setImagePreviewUrls((prev) => [...prev, ...newUrls].slice(0, 5));
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error('Please provide a rating');
      return;
    }

    const latestOrder = ordersData?.data?.[0];
    const latestSub = subsData?.data?.[0];

    const orderDate = latestOrder ? new Date(latestOrder.createdAt).getTime() : 0;
    const subDate = latestSub ? new Date(latestSub.createdAt).getTime() : 0;

    let productIds: string[] = [];

    if (orderDate > subDate && latestOrder) {
      productIds = Array.from(
        new Set(
          latestOrder.items
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .map((item: any) => item.productVariant?.product?.id || item.productVariant?.productId)
            .filter(Boolean),
        ),
      );
    } else if (latestSub) {
      productIds = [
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (latestSub.productVariant as any)?.product?.id || (latestSub.productVariant as any)?.productId,
      ].filter(Boolean);
    }

    if (productIds.length === 0) {
      toast.error('Could not find recent products to review.');
      onClose();
      return;
    }

    try {
      let uploadedUrls: string[] = [];
      if (images.length > 0) {
        setIsUploading(true);
        const formData = new FormData();
        images.forEach((img) => formData.append('files', img));
        const uploadRes = await api.post('/upload/public/reviews', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        uploadedUrls = uploadRes.data.data;
      }

      // Submit review for all unique products bought
      await Promise.all(
        productIds.map((id) =>
          createReviewAsync({
            productId: id as string,
            rating,
            comment: comment.trim() || undefined,
            images: uploadedUrls.length > 0 ? uploadedUrls : undefined,
          }),
        ),
      );
      // Wait for all to finish, success toast handled in hook
      onClose();
    } catch (error) {
      console.error(error);
      toast.error('Failed to submit review');
    } finally {
      setIsUploading(false);
    }
  };

  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <div
      className='fixed inset-0 z-120 flex items-center justify-center bg-black/40 px-3 py-4 backdrop-blur-sm sm:px-4 sm:py-6'
      role='dialog'
      aria-modal='true'
      onClick={onClose}
    >
      <div
        className='flex w-full max-w-2xl flex-col bg-[#1b3b5f] p-6 sm:p-8 rounded-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative'
        onClick={(event) => event.stopPropagation()}
      >
        <button
          onClick={onClose}
          className='absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors'
        >
          <X className='w-5 h-5 text-white/70 hover:text-white' />
        </button>

        <div className='flex flex-col gap-2 mb-6'>
          <h2 className='text-2xl md:text-4xl font-heading text-white'>{title}</h2>
          <p className='text-white/70 text-sm md:text-base'>{subtitle}</p>
        </div>

        <div className='flex flex-col gap-6'>
          <div className='flex justify-center gap-2'>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type='button'
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
                className='transition-transform hover:scale-110 focus:outline-none'
              >
                <Star
                  className={`w-10 h-10 md:w-12 md:h-12 ${
                    star <= (hoverRating || rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'fill-transparent text-gray-200 stroke-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>

          <div className='w-full'>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder='Write your experience...'
              className='min-h-30 w-full rounded-xl border border-white/20 bg-white/5 p-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent resize-none'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-white/90 mb-2'>
              Add Photos (Optional)
            </label>
            <div className='flex flex-wrap gap-3'>
              {imagePreviewUrls.map((url, idx) => (
                <div
                  key={idx}
                  className='relative w-20 h-20 rounded-xl overflow-hidden border border-white/20 group'
                >
                  <Image
                    src={url}
                    alt='Upload preview'
                    fill
                    className='w-full h-full object-cover'
                  />
                  <button
                    onClick={() => removeImage(idx)}
                    className='absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'
                  >
                    <X className='w-5 h-5 text-white' />
                  </button>
                </div>
              ))}

              {imagePreviewUrls.length < 5 && (
                <label className='w-20 h-20 rounded-xl border-2 border-dashed border-white/30 flex flex-col items-center justify-center text-white/50 hover:text-white/80 hover:border-white/50 cursor-pointer transition-colors bg-white/5'>
                  <ImagePlus className='w-6 h-6 mb-1' />
                  <span className='text-[10px] font-medium'>Add</span>
                  <input
                    type='file'
                    accept='image/*'
                    multiple
                    className='hidden'
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>
          </div>
        </div>

        <div className='mt-8'>
          <button
            type='button'
            onClick={handleSubmit}
            disabled={isPending || isUploading || isOrdersLoading || isSubsLoading || rating === 0}
            className='w-full flex justify-center items-center gap-2 rounded-full bg-white px-6 py-4 text-[#1b3b5f] font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {(isPending || isUploading || isOrdersLoading || isSubsLoading) && (
              <Loader2 className='w-5 h-5 animate-spin' />
            )}
            {isPending || isUploading
              ? 'Submitting...'
              : isOrdersLoading || isSubsLoading
                ? 'Loading...'
                : submitBtnText}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
