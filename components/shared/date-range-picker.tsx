"use client";

import { cn } from "@/lib/utils";
import { addMonths, format } from "date-fns";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState } from "react";
import { DayPicker, type DateRange } from "react-day-picker";

export type { DateRange };

export type DateRangePickerProps = {
  /** Currently selected range (controlled). */
  value?: DateRange;
  /** Called every time the in-progress selection changes. */
  onChange?: (range: DateRange | undefined) => void;
  /**
   * Called when the user clicks "Apply".
   * Receives the confirmed range (or undefined when cleared).
   */
  onApply?: (range: DateRange | undefined) => void;
  /** Extra class names for the wrapper. */
  className?: string;
};

export default function DateRangePicker({
  value,
  onChange,
  onApply,
  className,
}: DateRangePickerProps) {
  // Internal draft state – only committed when "Apply" is clicked.
  const [draft, setDraft] = useState<DateRange | undefined>(value);

  // The left-hand month displayed in the calendar.
  const [month, setMonth] = useState<Date>(
    () => new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  );

  const nextMonth = addMonths(month, 1);

  const handleSelect = (range: DateRange | undefined) => {
    setDraft(range);
    onChange?.(range);
  };

  const handleApply = () => {
    onApply?.(draft);
  };

  const handleClear = () => {
    setDraft(undefined);
    onChange?.(undefined);
  };

  const fromLabel = draft?.from ? format(draft.from, "MMM d, yyyy") : null;
  const toLabel = draft?.to ? format(draft.to, "MMM d, yyyy") : null;

  return (
    <div className={cn("select-none", className)}>
      {/* ── Selected-range summary bar ─────────────────────────────── */}
      <div className="mb-2 flex items-center gap-1.5 rounded-md border border-[#e6e6e6] bg-[#f5f5f5] px-2.5 py-1.5 text-xs text-[#5a5a5a]">
        {fromLabel ? (
          <>
            <span className="font-medium text-[#3a3a3a]">{fromLabel}</span>
            <span className="text-[#bdbdbd]">→</span>
            <span className="font-medium text-[#3a3a3a]">
              {toLabel ?? (
                <span className="font-normal text-[#adadad]">
                  Pick end date
                </span>
              )}
            </span>
            <button
              type="button"
              onClick={handleClear}
              className="ml-auto inline-flex h-4 w-4 items-center justify-center rounded text-[#b0b0b0] transition-colors hover:bg-[#ebebeb] hover:text-[#606060]"
              aria-label="Clear selection"
            >
              <X className="h-3 w-3" />
            </button>
          </>
        ) : (
          <span className="text-[#b0b0b0]">No date range selected</span>
        )}
      </div>

      {/* ── Custom navigation header ────────────────────────────────── */}
      {/*
       *  react-day-picker v9 renders a single <nav> element (containing both
       *  ◄ and ►) before the months container, causing both buttons to stack
       *  on the left. We suppress the built-in nav entirely (components.Nav →
       *  null) and build our own header so ← sits on the far left and → sits
       *  on the far right, with the two month labels centred between them.
       */}
      <div className="mb-1 flex items-center gap-1 px-1">
        {/* Previous month */}
        <button
          type="button"
          onClick={() => setMonth((m) => addMonths(m, -1))}
          className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded border border-[#e4e4e4] bg-[#f7f7f7] text-[#7a7a7a] transition-colors hover:bg-[#ececec] hover:text-[#3a3a3a]"
          aria-label="Previous month"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>

        {/* Month labels — each takes equal share of the remaining space */}
        <div className="flex flex-1 items-center">
          <span className="flex-1 text-center text-xs font-semibold tracking-wide text-[#3a3a3a]">
            {format(month, "MMMM yyyy")}
          </span>
          <span className="flex-1 text-center text-xs font-semibold tracking-wide text-[#3a3a3a]">
            {format(nextMonth, "MMMM yyyy")}
          </span>
        </div>

        {/* Next month */}
        <button
          type="button"
          onClick={() => setMonth((m) => addMonths(m, 1))}
          className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded border border-[#e4e4e4] bg-[#f7f7f7] text-[#7a7a7a] transition-colors hover:bg-[#ececec] hover:text-[#3a3a3a]"
          aria-label="Next month"
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
 
      {/* ── Calendar ───────────────────────────────────────────────── */}
      <DayPicker
        mode="range"
        selected={draft}
        onSelect={handleSelect}
        numberOfMonths={2}
        month={month}
        onMonthChange={setMonth}
        showOutsideDays
        /* Suppress the built-in Nav entirely — we own navigation above. */
        components={{ Nav: () => <></> }}
        classNames={{
          months: "flex gap-4",
          month: "flex flex-col gap-1",
          /* Hide the redundant caption rendered by DayPicker — we drew our
             own month labels in the custom header above. */
          month_caption: "hidden",
          caption_label: "hidden",
          month_grid: "w-full border-collapse",
          weekdays: "flex",
          weekday:
            "w-8 text-center text-[10px] font-medium text-[#b0b0b0] pb-1",
          week: "flex mt-0.5",
          day: "relative flex h-8 w-8 items-center justify-center p-0 text-xs",
          day_button: cn(
            "h-full w-full rounded-md text-[#3f3f3f] transition-colors",
            "hover:bg-[#f0f0f0]",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c4c4c4]",
          ),
          selected:
            "[&>button]:bg-[#3a3a3a] [&>button]:text-white [&>button]:hover:bg-[#2a2a2a]",
          today:
            "[&>button]:font-semibold [&>button]:text-[#1a1a1a]",
          outside:
            "[&>button]:text-[#d0d0d0] [&>button]:hover:text-[#b0b0b0]",
          range_start:
            "[&>button]:rounded-r-none [&>button]:bg-[#3a3a3a] [&>button]:text-white after:absolute after:inset-y-0 after:right-0 after:w-1/2 after:bg-[#efefef] after:-z-10",
          range_end:
            "[&>button]:rounded-l-none [&>button]:bg-[#3a3a3a] [&>button]:text-white after:absolute after:inset-y-0 after:left-0 after:w-1/2 after:bg-[#efefef] after:-z-10",
          range_middle:
            "bg-[#efefef] [&>button]:rounded-none [&>button]:hover:bg-[#e3e3e3]",
          hidden: "invisible",
          disabled:
            "[&>button]:opacity-30 [&>button]:cursor-not-allowed",
        }}
      />

      {/* ── Footer actions ─────────────────────────────────────────── */}
      <div className="mt-2 flex items-center justify-end gap-2 border-t border-[#ebebeb] pt-2">
        <button
          type="button"
          onClick={handleClear}
          className="rounded-md border border-[#e2e2e2] bg-[#f7f7f7] px-3 py-1 text-xs text-[#6a6a6a] transition-colors hover:bg-[#efefef]"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={handleApply}
          disabled={!draft?.from}
          className="rounded-md bg-[#3a3a3a] px-3 py-1 text-xs text-white transition-colors hover:bg-[#2a2a2a] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
