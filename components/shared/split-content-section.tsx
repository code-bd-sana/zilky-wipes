import { cn } from "@/lib/utils";
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
  return (
    <section
      className={cn("mx-5 md:mx-10 lg:mx-20 xl:mx-40 mt-20", sectionClassName)}>
      <div
        className={cn(
          "flex justify-between items-center gap-x-10 xl:gap-x-20 gap-y-12 md:gap-y-16 lg:gap-y-20",
          desktopDirection === "content-media"
            ? "flex-col-reverse lg:flex-row"
            : "flex-col-reverse lg:flex-row-reverse",
          innerClassName,
        )}>
        <div className={cn("w-full max-w-180 lg:max-w-170", contentClassName)}>
          {content}
        </div>
        <div className={cn("w-full max-w-170 lg:max-w-180", mediaClassName)}>
          {media}
        </div>
      </div>
    </section>
  );
}
