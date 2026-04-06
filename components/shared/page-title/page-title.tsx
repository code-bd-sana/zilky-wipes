import { cn } from "@/lib/utils";

type TitleAlign = "start" | "center";

export interface PageTitleProps {
  title?: string;
  titleContent?: React.ReactNode;
  subtitle?: string[];
  align?: TitleAlign;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export default function PageTitle({
  title,
  titleContent,
  subtitle,
  align = "center",
  className,
  titleClassName,
  subtitleClassName,
}: PageTitleProps) {
  if (!title && !titleContent && !subtitle) {
    return null;
  }

  const isCenter = align === "center";

  return (
    <section
      className={cn("", isCenter ? "text-center" : "text-left", className)}>
      <div className={cn(isCenter ? "mx-auto max-w-3xl" : "w-full")}>
        {title || titleContent ? (
          <h2
            className={cn(
              "font-heading text-5xl text-(--text-primary) font-bold md:text-[58px]",
              titleClassName,
            )}>
            {titleContent ?? title}
          </h2>
        ) : null}

        {subtitle?.length ? (
          <div
            className={cn(
              "font-mono text-lg text-(--text-secondary) md:text-[28px] pt-3",
              isCenter ? "mx-auto max-w-full" : "w-full",
              subtitleClassName,
            )}>
            {subtitle.map((line, index) => (
              <p key={index} className='leading-relaxed md:-m-2'>
                {line}
              </p>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
