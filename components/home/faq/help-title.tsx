import PageTitle from "@/components/shared/page-title/page-title";
import { Search, X } from "lucide-react";

type HelpTitleProps = {
  data?: Record<string, unknown>;
  searchQuery?: string;
  onSearchChange?: (val: string) => void;
};

export default function HelpTitle({
  data,
  searchQuery = "",
  onSearchChange,
}: HelpTitleProps) {
  const title = (data?.title as string) || "Everything you need to know.";
  const subtitle =
    (data?.subtitle as string) ||
    "Find answers to common questions about ZilkyWipes, our subscription service, shipping, and more.";

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 pt-20 sm:pt-24 md:pt-32 pb-4 sm:pb-6">
      <div className="text-center">
        <PageTitle
          align="center"
          title={title}
          titleClassName="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-(--text-primary) text-center max-w-2xl mx-auto"
          subtitle={[subtitle]}
          subtitleClassName="text-xs sm:text-sm md:text-base text-(--text-secondary) mt-2 sm:mt-3 text-center max-w-xl mx-auto"
        />
      </div>
      <div className="mx-auto flex w-full max-w-md justify-center mt-5 sm:mt-6">
        <div className="relative w-full">
          <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="Search for questions or topics..."
            className="w-full rounded-full border border-gray-200 bg-white pl-11 sm:pl-12 pr-10 py-2.5 sm:py-3 text-xs sm:text-sm md:text-base text-(--text-primary) placeholder:text-gray-400 shadow-2xs outline-none focus:border-(--text-primary) focus:ring-1 focus:ring-(--text-primary) transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange?.("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

