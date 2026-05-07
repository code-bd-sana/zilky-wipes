"use client";

import { useId } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Smile, Frown, Meh, CloudUpload } from "lucide-react";
import { Button } from "@/components/ui/button";

type FeedbackType = "website" | "product" | "subscription" | "design" | "other";
type ExperienceRating = "excellent" | "good" | "okay" | "needs-improvement";

type FeedbackFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  feedbackType: FeedbackType;
  experienceOverall: ExperienceRating;
  message: string;
  contactConsent: boolean;
};

const inputBaseClass =
  "w-full rounded-[8px] border border-[#F2F2F2] bg-white px-4 py-3.5 text-sm md:text-base text-(--checkout-muted-text) placeholder:text-[#979191] focus:border-(--text-primary) focus:outline-none";

const feedbackTypes: Array<{ label: string; value: FeedbackType }> = [
  { label: "Website Experience", value: "website" },
  { label: "Product Browsing", value: "product" },
  { label: "Subscription & Pricing", value: "subscription" },
  { label: "Design & Packaging", value: "design" },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ratings: Array<{ label: string; value: ExperienceRating; icon: any }> = [
  { label: "Excellent", value: "excellent", icon: Smile },
  { label: "Good", value: "good", icon: Smile }, // Assuming similar
  { label: "Okay", value: "okay", icon: Meh },
  { label: "Needs Improvement", value: "needs-improvement", icon: Frown },
];

export default function GeneralFeedbackForm() {
  const { register, handleSubmit, setValue, watch } = useForm<FeedbackFormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      feedbackType: "website",
      experienceOverall: "excellent",
      message: "",
      contactConsent: false,
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const feedbackType = watch("feedbackType");
  const experienceOverall = watch("experienceOverall");

  const onSubmit: SubmitHandler<FeedbackFormValues> = (data) => {
    console.log("Feedback data:", data);
  };

  const idPrefix = useId();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='bg-white rounded-[8px] p-6 md:p-10 lg:p-12 border border-[#F2F2F2]'>
      <div className='flex flex-col gap-6 md:gap-8'>
        {/* Name Fields */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
          <input
            type='text'
            placeholder='First Name'
            {...register("firstName")}
            className={inputBaseClass}
          />
          <input
            type='text'
            placeholder='Last Name'
            {...register("lastName")}
            className={inputBaseClass}
          />
        </div>

        {/* Email Field */}
        <input
          type='email'
          placeholder='Email'
          {...register("email")}
          className={inputBaseClass}
        />

        {/* Feedback Type */}
        <div>
          <p className='text-[15px] md:text-base font-medium text-[#474747] mb-4'>
            What type of feedback are you sharing?
          </p>
          <div className='flex flex-wrap gap-3'>
            {feedbackTypes.map((type) => (
              <button
                key={type.value}
                type='button'
                onClick={() => setValue("feedbackType", type.value)}
                className={`rounded-full px-5 py-2 text-sm transition-colors ${
                  feedbackType === type.value
                    ? "bg-(--text-primary) text-white"
                    : "border border-(--text-primary)/30 text-(--text-primary) hover:bg-(--text-primary)/5"
                }`}>
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Overall Experience */}
        <div>
          <p className='text-[15px] md:text-base font-medium text-[#474747] mb-4'>
            How was your experience overall?
          </p>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
            {ratings.map((rating) => {
              const Icon = rating.icon;
              const isSelected = experienceOverall === rating.value;
              return (
                <button
                  key={rating.value}
                  type='button'
                  onClick={() => setValue("experienceOverall", rating.value)}
                  className={`flex flex-col items-center justify-center py-5 rounded-[8px] border transition-colors ${
                    isSelected
                      ? "border-(--text-primary) bg-(--text-primary)/5"
                      : "border-[#F2F2F2] hover:border-(--text-primary)/20"
                  }`}>
                  <Icon
                    className={`h-7 w-7 mb-2 ${
                      isSelected ? "text-(--text-primary)" : "text-[#979191]"
                    }`}
                    strokeWidth={1.5}
                  />
                  <span
                    className={`text-xs md:text-sm ${
                      isSelected ? "text-(--text-primary) font-medium" : "text-[#979191]"
                    }`}>
                    {rating.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Message / Feedback */}
        <div>
          <p className='text-[15px] md:text-base font-medium text-[#474747] mb-4'>
            Message / Feedback
          </p>
          <textarea
            rows={5}
            placeholder="Tell us what you liked, what could be better, or what you'd love to see from ZilkyWipes"
            {...register("message")}
            className={`${inputBaseClass} resize-none`}
          />
        </div>

        {/* File Upload */}
        <div className='relative w-full rounded-[12px] border border-dashed border-[#CCCCCC] px-6 py-10 transition-colors hover:bg-gray-50/50 cursor-pointer'>
          <input
            type='file'
            title='File Upload'
            className='absolute inset-0 h-full w-full opacity-0 cursor-pointer'
            accept='.png,.jpg,.jpeg,.pdf'
          />
          <div className='flex flex-col items-center justify-center text-center'>
            <CloudUpload className='h-8 w-8 text-(--text-primary) mb-3' strokeWidth={1.5} />
            <p className='text-sm text-[#474747] font-medium'>
              Upload an image, screenshot, or document if it helps explain your feedback.
            </p>
            <p className='text-xs text-[#979191] mt-1'>PNG, JPG, PDF up to 10MB</p>
          </div>
        </div>

        {/* Consent Checkbox */}
        <div className='flex items-center gap-3 mt-2'>
          <input
            type='checkbox'
            id={`consent-${idPrefix}`}
            {...register("contactConsent")}
            className='h-4 w-4 rounded border-[#CCCCCC] accent-(--text-primary) cursor-pointer'
          />
          <label htmlFor={`consent-${idPrefix}`} className='text-sm text-[#474747] cursor-pointer'>
            I&apos;m happy to be contacted if clarification is needed.
          </label>
        </div>

        {/* Submit */}
        <div className='mt-2 text-start'>
          <Button
            type='submit'
            className='bg-(--text-primary) px-10 py-6 text-base md:text-lg rounded-full text-white shadow-sm hover:bg-[#142e50] hover:-translate-y-0.5 hover:scale-105 transition-all duration-300 font-normal'>
            Send Feedback
          </Button>
        </div>
      </div>
    </form>
  );
}