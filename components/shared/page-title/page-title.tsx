import { cn } from "@/lib/utils";

type TitleAlign = "start" | "center";

export interface PageTitleProps {
  title?: string;
  subtitle?: string;
  align?: TitleAlign;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export default function PageTitle({
  title,
  subtitle,
  align = "center",
  className,
  titleClassName,
  subtitleClassName,
}: PageTitleProps) {
  if (!title && !subtitle) {
    return null;
  }

  const isCenter = align === "center";

  return (
    <section
      className={cn("", isCenter ? "text-center" : "text-left", className)}>
      <div className={cn(isCenter ? "mx-auto max-w-3xl" : "w-full")}>
        {title ? (
          <h2
            className={cn(
              "font-heading text-5xl text-(--text-primary) font-bold md:text-[58px]",
              titleClassName,
            )}>
            {title}
          </h2>
        ) : null}

        {subtitle ? (
          <p
            className={cn(
              "font-mono text-xl text-(--text-secondary) md:text-[28px] pt-3",
              isCenter ? "mx-auto max-w-full" : "w-full",
              subtitleClassName,
            )}>
            {subtitle}
          </p>
        ) : null}
      </div>
    </section>
  );
}
