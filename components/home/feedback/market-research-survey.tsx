'use client';

import { Button } from '@/components/ui/button';
import { useSubmitMarketResearch } from '@/hooks/useFeedback';
import { api } from '@/lib/api/axios';
import { CloudUpload, Loader2, Star, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';

type MarketResearchFormValues = {
  fullName: string;
  email: string;
  ageRange: string;
  gender: string;
  navigationEase: number;
  informationFound: string;
  visualAppeal: number;
  recommendLikelihood: number;
  usefulSections: string[];
  improvementSuggest: string;
  issuesEncountered: string;
  overallRating: number;
  additionalComments: string;
};

const inputBaseClass =
  'w-full rounded-xl border border-gray-200 bg-white px-3.5 sm:px-4 py-2.5 sm:py-3.5 text-xs sm:text-sm md:text-base text-(--checkout-muted-text) placeholder:text-[#979191] focus:border-(--text-primary) focus:ring-1 focus:ring-(--text-primary) outline-none transition-all';

const sectionOptions = ['Products', 'Subscription', 'Benefits', 'About', 'FAQ', 'Contact'];

export default function MarketResearchSurvey() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: submitSurvey, isPending } = useSubmitMarketResearch();

  const { register, handleSubmit, watch, setValue, reset } = useForm<MarketResearchFormValues>({
    defaultValues: {
      fullName: '',
      email: '',
      ageRange: '',
      gender: '',
      navigationEase: 5,
      informationFound: '',
      visualAppeal: 0,
      recommendLikelihood: -1,
      usefulSections: [],
      improvementSuggest: '',
      issuesEncountered: '',
      overallRating: 0,
      additionalComments: '',
    },
  });

  const onSubmit: SubmitHandler<MarketResearchFormValues> = async (data) => {
    let attachmentUrls: string[] = [];

    if (uploadedFiles.length > 0) {
      setIsUploading(true);
      try {
        const formData = new FormData();
        uploadedFiles.forEach((file) => {
          formData.append('files', file);
        });

        const response = await api.post('/upload/public/feedback', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        if (response.data?.success && response.data?.data) {
          attachmentUrls = response.data.data;
        }
      } catch (error) {
        console.error('Failed to upload files', error);
        setIsUploading(false);
        return;
      }
      setIsUploading(false);
    }

    submitSurvey(
      { ...data, attachmentUrls },
      {
        onSuccess: () => {
          reset();
          setUploadedFiles([]);
          setValue('visualAppeal', 0);
          setValue('recommendLikelihood', -1);
          setValue('overallRating', 0);
        },
      },
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setUploadedFiles((prev) => [...prev, ...filesArray]);
    }
  };

  const removeFile = (indexToRemove: number) => {
    setUploadedFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  // eslint-disable-next-line react-hooks/incompatible-library
  const visualAppeal = watch('visualAppeal');
  const recommendLikelihood = watch('recommendLikelihood');
  const overallRating = watch('overallRating');

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-10 border border-gray-200/80 shadow-2xs'
    >
      <div className='flex flex-col gap-8 sm:gap-10'>
        {/* PERSONAL INFO */}
        <section className='space-y-4 sm:space-y-5'>
          <div className='flex items-baseline gap-2'>
            <h2 className='font-heading text-xl sm:text-2xl font-bold text-(--text-primary)'>
              Personal Information
            </h2>
            <span className='text-xs sm:text-sm text-[#979191] tracking-wide'>(Optional)</span>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4'>
            <input
              type='text'
              placeholder='Full Name'
              {...register('fullName')}
              className={inputBaseClass}
            />
            <input
              type='email'
              placeholder='Email'
              {...register('email')}
              className={inputBaseClass}
            />
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 items-center'>
            <select
              {...register('ageRange')}
              className={`${inputBaseClass} appearance-none text-gray-500`}
            >
              <option value='' disabled>
                Age Range
              </option>
              <option value='18-24'>18-24</option>
              <option value='25-34'>25-34</option>
              <option value='35-44'>35-44</option>
              <option value='45-54'>45-54</option>
              <option value='55+'>55+</option>
            </select>

            <div className='flex flex-col gap-1.5'>
              <label className='text-[11px] uppercase tracking-widest text-[#979191] font-semibold'>
                Gender
              </label>
              <div className='flex items-center gap-4 sm:gap-6'>
                {['Female', 'Male', 'Other'].map((g) => (
                  <label key={g} className='flex items-center gap-2 cursor-pointer'>
                    <input
                      type='radio'
                      value={g.toLowerCase()}
                      {...register('gender')}
                      className='h-4 w-4 accent-(--text-primary) border-gray-300'
                    />
                    <span className='text-xs sm:text-sm text-[#474747]'>{g}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className='w-full h-px bg-gray-100' />

        {/* WEBSITE EXPERIENCE */}
        <section className='space-y-6 sm:space-y-8'>
          <h2 className='font-heading text-xl sm:text-2xl font-bold text-(--text-primary)'>
            Website Experience
          </h2>

          <div className='space-y-3 sm:space-y-4'>
            <p className='text-xs sm:text-sm md:text-base font-medium text-(--text-primary)'>
              How easy was it to navigate our website?
            </p>
            <div className='flex flex-col gap-2'>
              <input
                type='range'
                min='1'
                max='10'
                {...register('navigationEase', { valueAsNumber: true })}
                className='w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-(--text-primary)'
              />
              <div className='flex justify-between text-[11px] sm:text-xs text-[#979191] font-mono'>
                <span>1 (Very Difficult)</span>
                <span>10 (Very Easy)</span>
              </div>
            </div>
          </div>

          <div className='space-y-3 sm:space-y-4'>
            <p className='text-xs sm:text-sm md:text-base font-medium text-(--text-primary)'>
              Did you find the information you were looking for?
            </p>
            <div className='flex flex-col gap-2 sm:gap-2.5'>
              {['Yes, easily', 'Somewhat, it took some time', 'No, I gave up'].map((opt) => (
                <label
                  key={opt}
                  className='flex items-center gap-3 w-full rounded-xl border border-gray-200 px-3.5 sm:px-4 py-2.5 sm:py-3 cursor-pointer hover:bg-gray-50/50 transition-colors'
                >
                  <input
                    type='radio'
                    value={opt}
                    {...register('informationFound')}
                    className='h-4 w-4 accent-(--text-primary)'
                  />
                  <span className='text-xs sm:text-sm text-gray-700'>{opt}</span>
                </label>
              ))}
            </div>
          </div>

          <div className='space-y-3 sm:space-y-4'>
            <p className='text-xs sm:text-sm md:text-base font-medium text-(--text-primary)'>
              How visually appealing did you find the site?
            </p>
            <div className='flex items-center gap-1.5 sm:gap-2'>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type='button'
                  key={star}
                  onClick={() => setValue('visualAppeal', star)}
                  className='p-1 focus:outline-none transition-colors'
                  aria-label={`Rate ${star} star`}
                >
                  <Star
                    className={`h-6 w-6 sm:h-7 sm:w-7 transition-colors ${
                      visualAppeal >= star ? 'fill-[#EAB308] text-[#EAB308]' : 'text-gray-300'
                    }`}
                    strokeWidth={1.5}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className='space-y-3 sm:space-y-4'>
            <p className='text-xs sm:text-sm md:text-base font-medium text-(--text-primary)'>
              How likely are you to recommend the ZilkyWipes website?
            </p>
            <div className='flex flex-wrap items-center gap-1.5 sm:gap-2'>
              {Array.from({ length: 11 }, (_, i) => i).map((num) => {
                const isSelected = recommendLikelihood === num;
                return (
                  <button
                    key={num}
                    type='button'
                    onClick={() => setValue('recommendLikelihood', num)}
                    className={`h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium transition-all ${
                      isSelected
                        ? 'bg-(--text-primary) text-white shadow-2xs'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {num}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <div className='w-full h-px bg-gray-100' />

        {/* CONTENT FEEDBACK */}
        <section className='space-y-6 sm:space-y-8'>
          <h2 className='font-heading text-xl sm:text-2xl font-bold text-(--text-primary)'>
            Content Feedback
          </h2>

          <div className='space-y-3 sm:space-y-4'>
            <p className='text-xs sm:text-sm md:text-base font-medium text-(--text-primary)'>
              Which sections did you find most useful?
            </p>
            <div className='grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3'>
              {sectionOptions.map((opt) => (
                <label
                  key={opt}
                  className='flex items-center gap-2.5 w-full rounded-xl border border-gray-200 px-3 sm:px-4 py-2.5 sm:py-3 cursor-pointer hover:bg-gray-50/50 transition-colors'
                >
                  <input
                    type='checkbox'
                    value={opt}
                    {...register('usefulSections')}
                    className='h-4 w-4 rounded border-gray-300 accent-(--text-primary)'
                  />
                  <span className='text-xs sm:text-sm text-[#474747]'>{opt}</span>
                </label>
              ))}
            </div>
          </div>

          <div className='space-y-3 sm:space-y-4'>
            <p className='text-xs sm:text-sm md:text-base font-medium text-(--text-primary)'>What would you improve?</p>
            <textarea
              rows={4}
              placeholder='Tell us how we can make it better...'
              {...register('improvementSuggest')}
              className={`${inputBaseClass} resize-none`}
            />
          </div>

          <div className='space-y-3 sm:space-y-4'>
            <p className='text-xs sm:text-sm md:text-base font-medium text-(--text-primary)'>
              Did you Encounter Any Issues?
            </p>
            <input
              type='text'
              placeholder='e.g. Broken links, slow loading...'
              {...register('issuesEncountered')}
              className={inputBaseClass}
            />
          </div>
        </section>

        <div className='w-full h-px bg-gray-100' />

        {/* FINAL THOUGHTS */}
        <section className='space-y-6 sm:space-y-8'>
          <h2 className='font-heading text-xl sm:text-2xl font-bold text-(--text-primary)'>
            Final Thoughts
          </h2>

          <div className='space-y-3 sm:space-y-4'>
            <p className='text-xs sm:text-sm md:text-base font-medium text-(--text-primary)'>
              Overall Experience Rating
            </p>
            <div className='flex items-center gap-1.5 sm:gap-2'>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type='button'
                  key={`overall-${star}`}
                  onClick={() => setValue('overallRating', star)}
                  className='p-1 focus:outline-none transition-colors'
                  aria-label={`Rate ${star} star`}
                >
                  <Star
                    className={`h-6 w-6 sm:h-7 sm:w-7 transition-colors ${
                      overallRating >= star ? 'fill-[#EAB308] text-[#EAB308]' : 'text-gray-300'
                    }`}
                    strokeWidth={1.5}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className='space-y-3 sm:space-y-4'>
            <p className='text-xs sm:text-sm md:text-base font-medium text-(--text-primary)'>Any Additional Comments?</p>
            <textarea
              rows={4}
              placeholder="We're all ears..."
              {...register('additionalComments')}
              className={`${inputBaseClass} resize-none`}
            />
          </div>

          <div className='space-y-3 sm:space-y-4'>
            <p className='text-xs sm:text-sm md:text-base font-medium text-(--text-primary)'>
              Upload Screenshots (Optional)
            </p>
            <div
              className='relative w-full rounded-2xl border border-dashed border-gray-300 px-4 sm:px-6 py-7 sm:py-8 transition-colors hover:bg-gray-50/50 cursor-pointer text-center'
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type='file'
                title='File Upload'
                className='hidden'
                accept='.png,.jpg,.jpeg,.pdf'
                multiple
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <div className='flex flex-col items-center justify-center'>
                <CloudUpload className='h-6 w-6 sm:h-7 sm:w-7 text-gray-400 mb-2' strokeWidth={1.5} />
                <p className='text-xs sm:text-sm text-gray-700 font-medium'>
                  Drag and drop files here, or click to select
                </p>
                <p className='text-[10px] sm:text-xs text-gray-400 mt-1 uppercase'>
                  PNG, JPG, or PDF up to 5MB
                </p>
              </div>
            </div>

            {/* Uploaded Files Preview */}
            {uploadedFiles.length > 0 && (
              <div className='flex flex-wrap gap-2 sm:gap-3 mt-3'>
                {uploadedFiles.map((file, index) => (
                  <div
                    key={index}
                    className='relative flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 sm:py-2 text-xs'
                  >
                    <span className='text-xs text-gray-600 truncate max-w-37.5'>{file.name}</span>
                    <button
                      type='button'
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile(index);
                      }}
                      className='text-gray-400 hover:text-red-500 transition-colors'
                    >
                      <X className='h-4 w-4' />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Actions */}
        <div className='flex flex-col sm:flex-row gap-4 mt-2'>
          <Button
            type='submit'
            disabled={isPending || isUploading}
            className='w-full sm:w-auto bg-(--text-primary) px-8 sm:px-10 py-5 sm:py-6 text-sm sm:text-base md:text-lg rounded-full text-white shadow-sm hover:bg-[#142e50] hover:-translate-y-0.5 hover:scale-[1.02] transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {isPending || isUploading ? (
              <span className='flex items-center gap-2'>
                <Loader2 className='h-5 w-5 animate-spin' />
                {isUploading ? 'Uploading...' : 'Submitting...'}
              </span>
            ) : (
              'Submit Feedback'
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}

