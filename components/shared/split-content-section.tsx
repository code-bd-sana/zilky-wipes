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
      x: isMediaRight ? 120 : -120, // from right or left
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.9,
        ease: easing,
      },
    },
  };

  const contentVariants = {
    hidden: {
      opacity: 0,
      y: 40,
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
        "relative overflow-x-hidden mx-5 md:mx-10 lg:mx-20 xl:mx-40 mt-20",
        sectionClassName,
      )}>
      <div
        className={cn(
          "min-w-0 flex justify-between items-center gap-x-10 xl:gap-x-20 gap-y-12 md:gap-y-16 lg:gap-y-20",
          desktopDirection === "content-media"
            ? "flex-col-reverse lg:flex-row"
            : "flex-col-reverse lg:flex-row-reverse",
          innerClassName,
        )}>
        {/* Content */}
        <motion.div
          initial={shouldAnimate ? "hidden" : false}
          whileInView={shouldAnimate ? "visible" : undefined}
          viewport={shouldAnimate ? { once: true, amount: 0.3 } : undefined}
          variants={contentVariants}
          className={cn("min-w-0 w-full max-w-180 lg:max-w-170", contentClassName)}>
          {content}
        </motion.div>

        {/* Media */}
        <motion.div
          initial={shouldAnimate ? "hidden" : false}
          whileInView={shouldAnimate ? "visible" : undefined}
          viewport={shouldAnimate ? { once: true, amount: 0.3 } : undefined}
          variants={mediaVariants}
          className={cn("min-w-0 w-full max-w-170 lg:max-w-180", mediaClassName)}>
          {media}
        </motion.div>
      </div>
    </section>
  );
}