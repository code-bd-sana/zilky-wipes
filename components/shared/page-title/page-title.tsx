"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type TitleAlign = "start" | "center";

export interface PageTitleProps {
  title?: string;
  titleContent?: React.ReactNode;
  subtitle?: string[];
  align?: TitleAlign;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  animate?: boolean;
  shineColor?: string;
}

export default function PageTitle({
  title,
  titleContent,
  subtitle,
  align = "center",
  className,
  titleClassName,
  subtitleClassName,
  animate = true,
  shineColor,
}: PageTitleProps) {
  const shouldReduceMotion = useReducedMotion();
  const shouldAnimate = animate && !shouldReduceMotion;

  const [startShine, setStartShine] = useState(false);
  const hasTriggeredRef = useRef(false);

  const easing = [0.22, 1, 0.36, 1] as const;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.18,
      },
    },
  };

  const titleVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: easing,
      },
    },
  };

  const subtitleVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(6px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: easing,
      },
    },
  };

  const hasContent = Boolean(title || titleContent || subtitle?.length);
  const isCenter = align === "center";

  const resolvedTitle = titleContent ?? title;
  const canShine = typeof resolvedTitle === "string" && shouldAnimate;
  const isLightTitle = (titleClassName ?? "").includes("text-white");
  const resolvedShineColor =
    shineColor ?? (isLightTitle ? "rgb(144, 145, 153)" : "rgb(255,255,255)");

  useEffect(() => {
    if (!startShine) return;

    const timer = setTimeout(() => {
      setStartShine(false); // remove shine after animation
    }, 1700);

    return () => clearTimeout(timer);
  }, [startShine]);

  if (!hasContent) return null;

  return (
    <motion.section
      initial={shouldAnimate ? "hidden" : false}
      whileInView={shouldAnimate ? "visible" : undefined}
      viewport={
        shouldAnimate
          ? { once: true, amount: 0.25 }
          : undefined
      }
      variants={shouldAnimate ? containerVariants : undefined}
      className={cn(isCenter ? "text-center" : "text-left", className)}
    >
      <div className={cn(isCenter ? "mx-auto max-w-3xl" : "w-full")}>
        {resolvedTitle && (
          <motion.h2
            variants={shouldAnimate ? titleVariants : undefined}
            onAnimationComplete={() => {
              if (!canShine || hasTriggeredRef.current) return;
              hasTriggeredRef.current = true;
              setStartShine(true);
            }}
            className={cn(
              "font-heading text-5xl text-(--text-primary) md:text-[58px] relative overflow-hidden",
              titleClassName
            )}
          >
            {canShine ? (
              <span className="relative inline-block">
                {/* Base text (always visible) */}
                <span className="relative z-10">
                  {resolvedTitle}
                </span>

                {/* Shine overlay */}
                {startShine && (
                  <motion.span
                    aria-hidden
                    initial={{ backgroundPosition: "-200% 0%" }}
                    animate={{ backgroundPosition: "200% 0%" }}
                    transition={{
                      duration: 2,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 z-20 pointer-events-none bg-clip-text text-transparent"
                    style={{
                      backgroundImage:
                        `linear-gradient(110deg, transparent 40%, ${resolvedShineColor} 50%, transparent 60%)`,
                      backgroundSize: "200% 100%",
                      WebkitBackgroundClip: "text",
                    }}
                  >
                    {resolvedTitle}
                  </motion.span>
                )}
              </span>
            ) : (
              resolvedTitle
            )}
          </motion.h2>
        )}

        {subtitle?.length && (
          <motion.div
            variants={shouldAnimate ? subtitleVariants : undefined}
            className={cn(
              "font-mono text-lg text-(--text-secondary) md:text-[28px] pt-3",
              isCenter ? "mx-auto max-w-full" : "w-full",
              subtitleClassName
            )}
          >
            {subtitle.map((line, index) => (
              <p key={index} className="leading-relaxed md:-m-2">
                {line}
              </p>
            ))}
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}