"use client";

import { useForm, type SubmitHandler } from "react-hook-form";
import { Star, CloudUpload } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  "w-full rounded-[8px] border border-[#F2F2F2] bg-white px-4 py-3.5 text-sm md:text-base text-(--checkout-muted-text) placeholder:text-[#979191] focus:border-(--text-primary) focus:outline-none";

const sectionOptions = [
  "Products",
  "Subscription",
  "Benefits",
  "About",
  "FAQ",
  "Contact",
];

export default function MarketResearchSurvey() {
  const { register, handleSubmit, watch, setValue } = useForm<MarketResearchFormValues>({
    defaultValues: {
      fullName: "",
      email: "",
      ageRange: "",
      gender: "",
      navigationEase: 5,
      informationFound: "",
      visualAppeal: 0,
      recommendLikelihood: -1,
      usefulSections: [],
      improvementSuggest: "",
      issuesEncountered: "",
      overallRating: 0,
      additionalComments: "",
    },
  });

  const onSubmit: SubmitHandler<MarketResearchFormValues> = (data) => {
    console.log("Market research data:", data);
  };

  // eslint-disable-next-line react-hooks/incompatible-library
  const visualAppeal = watch("visualAppeal");
  const recommendLikelihood = watch("recommendLikelihood");
  const overallRating = watch("overallRating");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='bg-white rounded-[8px] p-6 md:p-10 lg:p-12 border border-[#F2F2F2]'>
      <div className='flex flex-col gap-10 md:gap-12'>
        
        {/* PERSONAL INFO */}
        <section className='space-y-6'>
          <div className='flex items-baseline gap-2'>
            <h2 className='font-heading text-2xl md:text-3xl text-(--text-primary) leading-none'>
              Personal Information
            </h2>
            <span className='text-sm text-[#979191] tracking-wide'>(Optional)</span>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
            <input
              type='text'
              placeholder='Full Name'
              {...register("fullName")}
              className={inputBaseClass}
            />
            <input
              type='email'
              placeholder='Email'
              {...register("email")}
              className={inputBaseClass}
            />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-center'>
            <select
              {...register("ageRange")}
              className={`${inputBaseClass} appearance-none text-[#979191]`}>
              <option value='' disabled>Age Range</option>
              <option value='18-24'>18-24</option>
              <option value='25-34'>25-34</option>
              <option value='35-44'>35-44</option>
              <option value='45-54'>45-54</option>
              <option value='55+'>55+</option>
            </select>
            
            <div className='flex flex-col gap-2'>
              <label className='text-xs uppercase tracking-widest text-[#979191] font-medium'>Gender</label>
              <div className='flex items-center gap-6'>
                {["Female", "Male", "Other"].map((g) => (
                  <label key={g} className='flex items-center gap-2 cursor-pointer'>
                    <input
                      type='radio'
                      value={g.toLowerCase()}
                      {...register("gender")}
                      className='h-4 w-4 accent-(--text-primary) border-[#F2F2F2]'
                    />
                    <span className='text-sm md:text-base text-[#474747]'>{g}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className='w-full h-px bg-[#F2F2F2]' />

        {/* WEBSITE EXPERIENCE */}
        <section className='space-y-8 md:space-y-10'>
          <h2 className='font-heading text-2xl md:text-3xl text-(--text-primary) leading-none'>
            Website Experience
          </h2>

          <div className='space-y-4'>
            <p className='text-[15px] md:text-lg text-(--text-primary)'>
              How easy was it to navigate our website?
            </p>
            <div className='flex flex-col gap-2'>
              <input
                type='range'
                min='1'
                max='10'
                {...register("navigationEase")}
                className='w-full h-1 bg-[#F2F2F2] rounded-lg appearance-none cursor-pointer accent-(--text-primary)'
              />
              <div className='flex justify-between text-xs text-[#979191] font-mono'>
                <span>1 (Very Difficult)</span>
                <span>10 (Very Easy)</span>
              </div>
            </div>
          </div>

          <div className='space-y-4'>
            <p className='text-[15px] md:text-lg text-(--text-primary)'>
              Did you find the information you were looking for?
            </p>
            <div className='flex flex-col gap-3'>
              {[
                "Yes, easily",
                "Somewhat, it took some time",
                "No, I gave up",
              ].map((opt) => (
                <label
                  key={opt}
                  className='flex items-center gap-3 w-full rounded-[8px] border border-[#F2F2F2] px-4 py-3.5 cursor-pointer hover:bg-gray-50/50 transition-colors'>
                  <input
                    type='radio'
                    value={opt}
                    {...register("informationFound")}
                    className='h-4 w-4 accent-(--text-primary)'
                  />
                  <span className='text-sm md:text-base text-[#979191]'>{opt}</span>
                </label>
              ))}
            </div>
          </div>

          <div className='space-y-4'>
            <p className='text-[15px] md:text-lg text-(--text-primary)'>
              How visually appealing did you find the site?
            </p>
            <div className='flex items-center gap-2'>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type='button'
                  key={star}
                  onClick={() => setValue("visualAppeal", star)}
                  className='focus:outline-none transition-colors'>
                  <Star
                    className={`h-7 w-7 ${
                      visualAppeal >= star ? "fill-[#F2F2F2] text-[#E5E5E5]" : "text-[#F2F2F2]"
                    }`}
                    strokeWidth={1.5}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className='space-y-4'>
            <p className='text-[15px] md:text-lg text-(--text-primary)'>
              How likely are you to recommend the ZilkyWipes website?
            </p>
            <div className='flex flex-wrap items-center gap-2'>
              {Array.from({ length: 11 }, (_, i) => i).map((num) => {
                const isSelected = recommendLikelihood === num;
                return (
                  <button
                    key={num}
                    type='button'
                    onClick={() => setValue("recommendLikelihood", num)}
                    className={`h-9 w-9 md:h-10 md:w-10 rounded-full flex items-center justify-center text-sm transition-colors ${
                      isSelected
                        ? "bg-(--text-primary) text-white"
                        : "bg-[#F2F2F2] text-[#979191] hover:bg-[#E5E5E5]"
                    }`}>
                    {num}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <div className='w-full h-px bg-[#F2F2F2]' />

        {/* CONTENT FEEDBACK */}
        <section className='space-y-8 md:space-y-10'>
          <h2 className='font-heading text-2xl md:text-3xl text-(--text-primary) leading-none'>
            Content Feedback
          </h2>

          <div className='space-y-4'>
            <p className='text-[15px] md:text-lg text-(--text-primary)'>
              Which sections did you find most useful?
            </p>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3'>
              {sectionOptions.map((opt) => (
                <label
                  key={opt}
                  className='flex items-center gap-3 w-full rounded-[8px] border border-[#F2F2F2] px-4 py-3.5 cursor-pointer hover:bg-gray-50/50 transition-colors'>
                  <input
                    type='checkbox'
                    value={opt}
                    {...register("usefulSections")}
                    className='h-4 w-4 rounded-lg border-[#CCCCCC] accent-(--text-primary)'
                  />
                  <span className='text-sm md:text-base text-[#474747]'>{opt}</span>
                </label>
              ))}
            </div>
          </div>

          <div className='space-y-4'>
            <p className='text-[15px] md:text-lg text-(--text-primary)'>
              What would you improve?
            </p>
            <textarea
              rows={4}
              placeholder="Tell us how we can make it better..."
              {...register("improvementSuggest")}
              className={`${inputBaseClass} resize-none`}
            />
          </div>

          <div className='space-y-4'>
            <p className='text-[15px] md:text-lg text-(--text-primary)'>
              Did you Encounter Any Issues?
            </p>
            <input
              type='text'
              placeholder='e.g. Broken links, slow loading...'
              {...register("issuesEncountered")}
              className={inputBaseClass}
            />
          </div>
        </section>

        <div className='w-full h-px bg-[#F2F2F2]' />

        {/* FINAL THOUGHTS */}
        <section className='space-y-8 md:space-y-10'>
          <h2 className='font-heading text-2xl md:text-3xl text-(--text-primary) leading-none'>
            Final Thoughts
          </h2>

          <div className='space-y-4'>
            <p className='text-[15px] md:text-lg text-(--text-primary)'>
              Overall Experience Rating
            </p>
            <div className='flex items-center gap-2'>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type='button'
                  key={`overall-${star}`}
                  onClick={() => setValue("overallRating", star)}
                  className='focus:outline-none transition-colors'>
                  <Star
                    className={`h-7 w-7 ${
                      overallRating >= star ? "fill-[#F2F2F2] text-[#E5E5E5]" : "text-[#F2F2F2]"
                    }`}
                    strokeWidth={1.5}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className='space-y-4'>
            <p className='text-[15px] md:text-lg text-(--text-primary)'>
              Any Additional Comments?
            </p>
            <textarea
              rows={4}
              placeholder="We're all ears..."
              {...register("additionalComments")}
              className={`${inputBaseClass} resize-none`}
            />
          </div>

          <div className='space-y-4'>
            <p className='text-[15px] md:text-lg text-(--text-primary)'>
              Upload Screenshots (Optional)
            </p>
            <div className='relative w-full rounded-[12px] border border-dashed border-[#CCCCCC] px-6 py-10 transition-colors hover:bg-gray-50/50 cursor-pointer'>
              <input
                type='file'
                title='File Upload'
                className='absolute inset-0 h-full w-full opacity-0 cursor-pointer'
                accept='.png,.jpg,.jpeg,.pdf'
              />
              <div className='flex flex-col items-center justify-center text-center'>
                <CloudUpload className='h-6 w-6 text-[#979191] mb-2' strokeWidth={1.5} />
                <p className='text-xs text-[#979191]'>
                  Drag and drop files here, or click to select
                </p>
                <p className='text-[10px] text-[#979191] mt-1 uppercase'>PNG, JPG, or PDF up to 5MB</p>
              </div>
            </div>
          </div>
        </section>

        {/* Actions */}
        <div className='flex flex-col sm:flex-row gap-4 mt-2'>
          <Button
            type='button'
            className='bg-transparent border-2 border-(--text-primary) px-10 py-6 text-base md:text-lg rounded-full text-(--text-primary) hover:bg-(--text-primary)/5 transition-all duration-300 font-normal'>
            Refer a Friend
          </Button>
          <Button
            type='submit'
            className='bg-(--text-primary) px-10 py-6 text-base md:text-lg rounded-full text-white shadow-sm hover:bg-[#142e50] hover:-translate-y-0.5 hover:scale-105 transition-all duration-300 font-normal'>
            Submit Feedback
          </Button>
        </div>

      </div>
    </form>
  );
}