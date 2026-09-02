'use client';

import { Button } from '@/components/ui/button';
import { useSubmitGeneralFeedback } from '@/hooks/useFeedback';
import { api } from '@/lib/api/axios';
import { CloudUpload, Frown, Meh, Smile, X } from 'lucide-react';
import { useId, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';

type FeedbackType = 'website' | 'product' | 'subscription' | 'design' | 'other';
type ExperienceRating = 'excellent' | 'good' | 'okay' | 'needs-improvement';

type FeedbackFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  feedbackType: FeedbackType;
  experienceOverall: ExperienceRating;
  message: string;
  contactConsent: boolean;
  attachmentUrls?: string[];
};

const inputBaseClass =
  'w-full rounded-xl border border-gray-200 bg-white px-3.5 sm:px-4 py-2.5 sm:py-3.5 text-xs sm:text-sm md:text-base text-(--checkout-muted-text) placeholder:text-[#979191] focus:border-(--text-primary) focus:ring-1 focus:ring-(--text-primary) outline-none transition-all';

const feedbackTypes: Array<{ label: string; value: FeedbackType }> = [
  { label: 'Website Experience', value: 'website' },
  { label: 'Product Browsing', value: 'product' },
  { label: 'Subscription & Pricing', value: 'subscription' },
  { label: 'Design & Packaging', value: 'design' },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ratings: Array<{ label: string; value: ExperienceRating; icon: any }> = [
  { label: 'Excellent', value: 'excellent', icon: Smile },
  { label: 'Good', value: 'good', icon: Smile },
  { label: 'Okay', value: 'okay', icon: Meh },
  { label: 'Needs Improvement', value: 'needs-improvement', icon: Frown },
];

export default function GeneralFeedbackForm() {
  const submitGeneralFeedback = useSubmitGeneralFeedback();
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const { register, handleSubmit, setValue, watch, reset } = useForm<FeedbackFormValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      feedbackType: 'website',
      experienceOverall: 'excellent',
      message: '',
      contactConsent: false,
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const feedbackType = watch('feedbackType');
  const experienceOverall = watch('experienceOverall');

  const onSubmit: SubmitHandler<FeedbackFormValues> = async (data) => {
    let uploadedUrls: string[] = [];

    if (files.length > 0) {
      setIsUploading(true);
      try {
        const formData = new FormData();
        files.forEach((file) => formData.append('files', file));

        const response = await api.post('/upload/public/feedback', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        if (response.data?.success) {
          uploadedUrls = response.data.data;
        }
      } catch (err) {
        toast.error('Failed to upload files');
        setIsUploading(false);
        console.error('File upload error:', err);
        return;
      }
      setIsUploading(false);
    }

    submitGeneralFeedback.mutate(
      { ...data, attachmentUrls: uploadedUrls },
      {
        onSuccess: () => {
          reset();
          setFiles([]);
        },
      },
    );
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const idPrefix = useId();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-10 border border-gray-200/80 shadow-2xs'
    >
      <div className='flex flex-col gap-5 sm:gap-7'>
        {/* Name Fields */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4'>
          <input
            type='text'
            placeholder='First Name'
            {...register('firstName')}
            className={inputBaseClass}
          />
          <input
            type='text'
            placeholder='Last Name'
            {...register('lastName')}
            className={inputBaseClass}
          />
        </div>

        {/* Email Field */}
        <input type='email' placeholder='Email' {...register('email')} className={inputBaseClass} />

        {/* Feedback Type */}
        <div>
          <p className='text-xs sm:text-sm font-semibold text-(--text-primary) mb-3'>
            What type of feedback are you sharing?
          </p>
          <div className='flex flex-wrap gap-2 sm:gap-2.5'>
            {feedbackTypes.map((type) => (
              <button
                key={type.value}
                type='button'
                onClick={() => setValue('feedbackType', type.value)}
                className={`rounded-full px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-all ${
                  feedbackType === type.value
                    ? 'bg-(--text-primary) text-white shadow-2xs'
                    : 'border border-(--text-primary)/30 text-(--text-primary) hover:bg-(--text-primary)/5 bg-white'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Overall Experience */}
        <div>
          <p className='text-xs sm:text-sm font-semibold text-(--text-primary) mb-3'>
            How was your experience overall?
          </p>
          <div className='grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3'>
            {ratings.map((rating) => {
              const Icon = rating.icon;
              const isSelected = experienceOverall === rating.value;
              return (
                <button
                  key={rating.value}
                  type='button'
                  onClick={() => setValue('experienceOverall', rating.value)}
                  className={`flex flex-col items-center justify-center py-4 sm:py-5 rounded-xl border transition-all ${
                    isSelected
                      ? 'border-(--text-primary) bg-(--text-primary)/5 shadow-2xs'
                      : 'border-gray-200 hover:border-(--text-primary)/30 bg-white'
                  }`}
                >
                  <Icon
                    className={`h-6 w-6 sm:h-7 sm:w-7 mb-1.5 sm:mb-2 ${
                      isSelected ? 'text-(--text-primary)' : 'text-gray-400'
                    }`}
                    strokeWidth={1.5}
                  />
                  <span
                    className={`text-xs sm:text-sm font-medium ${
                      isSelected ? 'text-(--text-primary)' : 'text-gray-500'
                    }`}
                  >
                    {rating.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Message / Feedback */}
        <div>
          <p className='text-xs sm:text-sm font-semibold text-(--text-primary) mb-3'>
            Message / Feedback
          </p>
          <textarea
            rows={5}
            placeholder="Tell us what you liked, what could be better, or what you'd love to see from ZilkyWipes"
            {...register('message')}
            className={`${inputBaseClass} resize-none`}
          />
        </div>

        {/* File Upload */}
        <div>
          <div className='relative w-full rounded-2xl border border-dashed border-gray-300 px-4 sm:px-6 py-7 sm:py-8 transition-colors hover:bg-gray-50/50 cursor-pointer text-center'>
            <input
              type='file'
              title='File Upload'
              multiple
              onChange={(e) => {
                if (e.target.files) {
                  setFiles((prev) => [...prev, ...Array.from(e.target.files as FileList)]);
                }
              }}
              className='absolute inset-0 h-full w-full opacity-0 cursor-pointer z-10'
              accept='.png,.jpg,.jpeg,.pdf'
            />
            <div className='flex flex-col items-center justify-center'>
              <CloudUpload className='h-7 w-7 sm:h-8 sm:w-8 text-(--text-primary) mb-2' strokeWidth={1.5} />
              <p className='text-xs sm:text-sm text-gray-700 font-medium'>
                Upload an image, screenshot, or document if it helps explain your feedback.
              </p>
              <p className='text-[11px] sm:text-xs text-gray-400 mt-1'>PNG, JPG, PDF up to 10MB</p>
            </div>
          </div>

          {files.length > 0 && (
            <div className='mt-3 flex flex-col gap-2'>
              {files.map((file, index) => (
                <div
                  key={index}
                  className='flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs sm:text-sm'
                >
                  <span className='truncate text-gray-600 max-w-[80%]'>{file.name}</span>
                  <button
                    type='button'
                    onClick={() => removeFile(index)}
                    className='text-gray-400 hover:text-red-500 transition-colors'
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Consent Checkbox */}
        <div className='flex items-center gap-2.5 mt-1'>
          <input
            type='checkbox'
            id={`consent-${idPrefix}`}
            {...register('contactConsent')}
            className='h-4 w-4 rounded border-gray-300 accent-(--text-primary) cursor-pointer'
          />
          <label htmlFor={`consent-${idPrefix}`} className='text-xs sm:text-sm text-gray-600 cursor-pointer'>
            I&apos;m happy to be contacted if clarification is needed.
          </label>
        </div>

        {/* Submit */}
        <div className='mt-2 text-start'>
          <Button
            type='submit'
            disabled={submitGeneralFeedback.isPending || isUploading}
            className='w-full sm:w-auto bg-(--text-primary) px-8 sm:px-10 py-5 sm:py-6 text-sm sm:text-base md:text-lg rounded-full text-white shadow-sm hover:bg-[#142e50] hover:-translate-y-0.5 hover:scale-[1.02] transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {isUploading
              ? 'Uploading files...'
              : submitGeneralFeedback.isPending
                ? 'Sending...'
                : 'Send Feedback'}
          </Button>
        </div>
      </div>
    </form>
  );
}

