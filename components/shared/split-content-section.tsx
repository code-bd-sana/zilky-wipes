"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type SplitContentSectionProps = {
  content: ReactNode;
  media: ReactNode;
  desktopDirection?: "content-media" | "media-content";
  sectionClassName?: string;
  innerClassName?: string;
  contentClassName?: string;
  mediaClassName?: string;
};

export default function SplitContentSection({
  content,
  media,
  desktopDirection = "content-media",
  sectionClassName,
  innerClassName,
  contentClassName,
  mediaClassName,
}: SplitContentSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const shouldAnimate = !shouldReduceMotion;

  const easing = [0.22, 1, 0.36, 1] as const;

  const isMediaRight = desktopDirection === "content-media";

  const mediaVariants = {
    hidden: {
      opacity: 0,
      x: isMediaRight ? 40 : -40,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: easing,
      },
    },
  };

  const contentVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: easing,
      },
    },
  };

  return (
    <section
      className={cn(
        "max-w-7xl mx-auto relative overflow-x-hidden px-4 sm:px-6 md:px-10 lg:px-12.5 mt-14 sm:mt-20 md:mt-28 lg:mt-36",
        sectionClassName,
      )}>
      <div
        className={cn(
          "min-w-0 flex justify-between items-center gap-x-8 lg:gap-x-12 xl:gap-x-16 gap-y-8 sm:gap-y-12 md:gap-y-16",
          desktopDirection === "content-media"
            ? "flex-col-reverse lg:flex-row"
            : "flex-col-reverse lg:flex-row-reverse",
          innerClassName,
        )}>
        {/* Content */}
        <motion.div
          initial={shouldAnimate ? "hidden" : false}
          whileInView={shouldAnimate ? "visible" : undefined}
          viewport={shouldAnimate ? { once: true, amount: 0.2 } : undefined}
          variants={contentVariants}
          className={cn(
            "min-w-0 w-full lg:w-1/2 flex flex-col justify-center",
            contentClassName,
          )}>
          {content}
        </motion.div>

        {/* Media */}
        <motion.div
          initial={shouldAnimate ? "hidden" : false}
          whileInView={shouldAnimate ? "visible" : undefined}
          viewport={shouldAnimate ? { once: true, amount: 0.2 } : undefined}
          variants={mediaVariants}
          className={cn(
            "min-w-0 w-full lg:w-1/2 flex items-center justify-center",
            mediaClassName,
          )}>
          {media}
        </motion.div>
      </div>
    </section>
  );
}

