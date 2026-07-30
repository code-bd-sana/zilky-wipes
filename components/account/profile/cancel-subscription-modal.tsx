"use client";
import PageTitle from "@/components/shared/page-title/page-title";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPage } from "@/lib/api/pages";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

type PageSectionContent = {
  title?: string;
  subtitle?: string;
  text?: string;
  submitText?: string;
  cancelText?: string;
};

type PageSection = {
  id?: string;
  sectionKey: string;
  content: PageSectionContent;
};

type PageData = {
  id: string;
  pageKey: string;
  title: string;
  sections: PageSection[];
};

export default function CancelSubscriptionModal({
  open,
  onClose,
  onConfirm,
}: Props) {
  const { data: pageData } = useQuery({
    queryKey: ["page", "cancelation"],
    queryFn: () => getPage("cancelation"),
    enabled: open, // Only fetch when modal opens
  });

  if (!open) return null;

  const getContent = (key: string) => (pageData as PageData)?.sections?.find((s: PageSection) => s.sectionKey === key)?.content || {};

  const hero = getContent("hero");
  const option1 = getContent("option1");
  const option2 = getContent("option2");
  const option3 = getContent("option3");
  const note = getContent("note");
  const ctas = getContent("ctas");

  const title = hero.title || "We’d hate to see you go";
  const subtitle = hero.subtitle || "Before you cancel, would any of these options help?";
  
  const opt1Text = option1.text || "Deliver less often";
  const opt2Text = option2.text || "Skip just one delivery";
  const opt3Text = option3.text || "Pause for a while";
  
  const noteText = note.text || "If none of these work for you right now, we understand.";
  
  const submitText = ctas.submitText || "Continue with cancellation";
  const cancelText = ctas.cancelText || "Keep my subscription";

  return (
    <section
      role='dialog'
      aria-modal='true'
      className='fixed inset-0 z-50 flex items-center justify-center'>
      <div className='absolute inset-0 bg-black/40' onClick={onClose} />

      <div className='relative z-10 w-[90%] max-w-140 shadow-lg p-6 bg-(--text-primary)'>
        <PageTitle
          align='start'
          title={title}
          titleClassName='text-white! font-medium! max-w-[450px] '
        />
        <div className='my-8'>
          <p className='text-2xl text-white mt-2'>
            {subtitle}
          </p>
          <div className='flex gap-x-2 items-center mt-8'>
            <p className='text-[22px] text-white underline'>
              {opt1Text}
            </p>
            <ArrowRight size={24} color='#FFFFFF' />
          </div>
          <div className='flex gap-x-2 items-center mt-2 '>
            <p className='text-[22px] text-white underline'>
              {opt2Text}
            </p>
            <ArrowRight size={24} color='#FFFFFF' />
          </div>
          <div className='flex gap-x-2 items-center mt-2'>
            <p className='text-[22px] text-white underline'>
              {opt3Text}
            </p>
            <ArrowRight size={24} color='#FFFFFF' />
          </div>
          <p className='text-[22px] text-white mt-8'>
            {noteText}
          </p>
        </div>
        <div className='mt-14 flex flex-col justify-end gap-3'>
          <Button
            onClick={() => {
              onConfirm();
            }}
            className='bg-white py-6 text-base md:text-xl rounded-full text-(--text-primary) shadow-sm hover:bg-[#ecebf0] hover:shadow-xl focus-visible:ring-2 focus-visible:ring-(--text-primary)/40 transition-all duration-300 cursor-pointer'>
            {submitText}
          </Button>
          <Button
            onClick={onClose}
            className='bg-transparent  text-white text-base md:text-xl underline cursor-pointer hover:text-white/90 transition-colors duration-200'>
            {cancelText}
          </Button>
        </div>
      </div>
    </section>
  );
}
