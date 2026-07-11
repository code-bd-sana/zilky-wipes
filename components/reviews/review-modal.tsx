'use client';

import { useCreateReview } from '@/hooks/useReviews';
import { api } from '@/lib/api/axios';
import { ImagePlus, Loader2, Star, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';

interface ReviewModalProps {
  productId: string;
  onClose: () => void;
}

export default function ReviewModal({ productId, onClose }: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');

  const [images, setImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const { mutateAsync: createReviewAsync, isPending } = useCreateReview();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;

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

      await createReviewAsync({
        productId,
        rating,
        comment: comment.trim() || undefined,
        images: uploadedUrls.length > 0 ? uploadedUrls : undefined,
      });
      onClose();
    } catch (error) {
      console.error(error);
      toast.error('Failed to submit review');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className='fixed inset-0 z-100 flex items-center justify-center p-4'>
      <div className='absolute inset-0 bg-black/60 backdrop-blur-sm' onClick={onClose} />

      <div className='relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col'>
        <div className='flex items-center justify-between p-5 border-b border-gray-100'>
          <h2 className='text-xl font-bold text-[#141414]'>Tell us about your experience</h2>
          <button
            onClick={onClose}
            className='p-2 hover:bg-gray-100 rounded-full transition-colors'
          >
            <X className='w-5 h-5 text-gray-500' />
          </button>
        </div>

        <form onSubmit={handleSubmit} className='p-6 overflow-y-auto max-h-[80vh]'>
          {/* Star Rating */}
          <div className='mb-6 flex flex-col items-center'>
            <p className='text-sm font-medium text-gray-700 mb-3'>Overall Rating *</p>
            <div className='flex items-center gap-2'>
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
                    className={`w-10 h-10 ${
                      star <= (hoverRating || rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'fill-transparent text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating === 0 && <p className='text-xs text-red-500 mt-2'>Please select a rating</p>}
          </div>

          {/* Comment */}
          <div className='mb-6'>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Add a written review (Optional)
            </label>
            <textarea
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder='What did you like or dislike? What should other shoppers know?'
              className='w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7BB5A3] focus:border-transparent resize-none'
            />
          </div>

          {/* Image Upload */}
          <div className='mb-6'>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Add Photos (Optional)
            </label>
            <div className='flex flex-wrap gap-3'>
              {imagePreviewUrls.map((url, idx) => (
                <div
                  key={idx}
                  className='relative w-20 h-20 rounded-xl overflow-hidden border border-gray-200 group'
                >
                  <Image
                    src={url}
                    alt='Upload preview'
                    className='w-full h-full object-cover'
                    fill
                  />
                  <button
                    type='button'
                    onClick={() => removeImage(idx)}
                    className='absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'
                  >
                    <X className='w-5 h-5 text-white' />
                  </button>
                </div>
              ))}

              {imagePreviewUrls.length < 5 && (
                <label className='w-20 h-20 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 hover:text-gray-600 hover:border-gray-300 cursor-pointer transition-colors bg-gray-50'>
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

          {/* Actions */}
          <div className='flex items-center gap-3 pt-4'>
            <button
              type='button'
              onClick={onClose}
              className='flex-1 px-6 py-3 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors'
            >
              Cancel
            </button>
            <button
              type='submit'
              disabled={isPending || isUploading || rating === 0}
              className='flex-1 px-6 py-3 rounded-xl bg-[#7BB5A3] text-white font-medium hover:bg-[#68a08f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
            >
              {(isPending || isUploading) && <Loader2 className='w-4 h-4 animate-spin' />}
              {isPending || isUploading ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
