import Image from "next/image";
import Link from "next/link";
import { Package, TrendingUp } from "lucide-react";

type ProgressItem = {
  label: string;
  value: string;
  percent: number;
  color: string;
};

type CardData = {
  title: string;
  actionLabel: string;
  actionHref: string;
  accent: string;
  topStat: string;
  topDescription?: string;
  subHeading: string;
  progressItems?: ProgressItem[];
  metrics?: Array<{
    label: string;
    value: string;
  }>;
  footerType: "alert" | "summary" | "review";
  footerTitle: string;
  footerDescription: string;
  footerValue?: string;
  metricsProgress?: number;
  footerMeta?: string;
  footerRating?: number;
  footerImage?: string;
  footerImageAlt?: string;
  footerInitials?: string;
};

const cardData: CardData[] = [
  {
    title: "Orders & Fulfillment",
    actionLabel: "View All",
    actionHref: "/dashboard?view=orders",
    accent: "#14b8a6",
    topStat: "24 Orders Today",
    topDescription:
      "8 orders in the last hour\n12 shipments scheduled for tomorrow",
    subHeading: "Fulfillment Status",
    progressItems: [
      { label: "Shipped", value: "18", percent: 50, color: "#14b8a6" },
      { label: "Processing", value: "04", percent: 20, color: "#d97706" },
      { label: "Pending", value: "02", percent: 10, color: "#9ca3af" },
    ],
    footerType: "alert",
    footerTitle: "3 products low in stock",
    footerDescription: "Restock needed to avoid fulfillment delays",
  },
  {
    title: "Subscriptions",
    actionLabel: "View All",
    actionHref: "/dashboard?view=subscriptions",
    accent: "#22c55e",
    topStat: "342 Active Subscriptions",
    topDescription: "+12% this month",
    subHeading: "Next 7 Days",
    metrics: [
      { label: "Upcoming renewals", value: "47" },
      { label: "Expected revenue", value: "$3,420" },
      { label: "Renewal Success Rate", value: "96.8%" },
    ],
    metricsProgress: 86,
    footerType: "summary",
    footerTitle: "$24,680",
    footerDescription: "Monthly Recurring Revenue",
    footerValue: "$24,680",
  },
  {
    title: "Customer Feedback",
    actionLabel: "View All",
    actionHref: "/dashboard?view=feedback",
    accent: "#2563eb",
    topStat: "4.8 Average Rating",
    topDescription: "Based on 127 reviews",
    subHeading: "This Month",
    metrics: [
      { label: "New reviews", value: "47" },
      { label: "Pending replies", value: "$3,420" },
      { label: "Client Satisfaction", value: "96.8%" },
    ],
    metricsProgress: 90,
    footerType: "review",
    footerTitle: "Sarah M.",
    footerMeta: "2 hours ago",
    footerRating: 5,
    footerDescription:
      "“Best eco-friendly product I've ever used. The quality is amazing!”",
    footerImage: "/ZilkyWipes/p.png",
    footerImageAlt: "Sarah M.",
    footerInitials: "SM",
  },
];

function getMetricBarPercent(card: CardData) {
  if (typeof card.metricsProgress === "number") {
    return Math.max(0, Math.min(100, card.metricsProgress));
  }

  const lastMetric = card.metrics?.[card.metrics.length - 1];
  if (!lastMetric) {
    return 0;
  }

  const parsedValue = Number.parseFloat(
    lastMetric.value.replace(/[^0-9.]/g, ""),
  );
  if (!Number.isFinite(parsedValue)) {
    return 0;
  }

  return Math.max(0, Math.min(100, parsedValue));
}

function ProgressBar({
  percent,
  color,
}: Pick<ProgressItem, "percent" | "color">) {
  return (
    <div className='h-3 rounded-full bg-[#e5e5e5]'>
      <div
        className='h-3 rounded-full transition-all'
        style={{ width: `${percent}%`, backgroundColor: color }}
      />
    </div>
  );
}

function FooterCard({ card }: { card: CardData }) {
  if (card.footerType === "alert") {
    return (
      <div className='rounded-xl border border-[#DC2626] bg-[#fff7f7] p-4'>
        <div className='flex items-start gap-3'>
          <div className='rounded-lg p-2 text-[#DC2626]'>
            <Package className='h-5 w-5' />
          </div>
          <div>
            <p className='text-[17px] text-[#DC2626]'>{card.footerTitle}</p>
            <p className='mt-1 text-sm text-[#262626]'>
              {card.footerDescription}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (card.footerType === "summary") {
    return (
      <div className='rounded-xl border border-[#16A34A] bg-[#F5FBF6] p-5'>
        <p className='flex items-center gap-2 text-[18px] text-[#16A34A]'>
          <TrendingUp className='h-4 w-4' />
          {card.footerValue}
        </p>
        <p className='mt-1 text-sm text-[#262626]'>{card.footerDescription}</p>
      </div>
    );
  }

  return (
    <div className='rounded-xl border border-[#E5E5E5] bg-[#F5F5F4] p-4'>
      <div className='flex items-start gap-3'>
        {card.footerImage ? (
          <Image
            src={card.footerImage}
            alt={card.footerImageAlt ?? card.footerTitle}
            width={36}
            height={36}
            className='h-9 w-9 rounded-full object-cover'
          />
        ) : (
          <div className='flex h-9 w-9 items-center justify-center rounded-full bg-[#e5e7eb] text-xs font-medium text-[#262626]'>
            {card.footerInitials}
          </div>
        )}
        <div>
          <div className='flex items-center gap-2 text-sm text-[#A8A29E]'>
            <span>{card.footerTitle}</span>
            {card.footerMeta ? <span>· {card.footerMeta}</span> : null}
          </div>
          {/* <div className='mt-2 flex items-center gap-1'>
            {Array.from({ length: 5 }).map((_, index) => {
              const isFilled = index < (card.footerRating ?? 0);

              return (
                <Star
                  key={index}
                  className='h-3.5 w-3.5'
                  style={{
                    color: isFilled ? "#f97316" : "#d4d4d4",
                    fill: isFilled ? "#f97316" : "none",
                  }}
                />
              );
            })}
          </div> */}
          <p className='mt-1 text-sm leading-6 text-[#262626]'>
            {card.footerDescription}
          </p>
        </div>
      </div>
    </div>
  );
}

function MetricList({ items }: { items: NonNullable<CardData["metrics"]> }) {
  return (
    <div className='space-y-4'>
      {items.map((item) => (
        <div
          key={item.label}
          className='flex items-center justify-between gap-4'>
          <span className='text-sm text-[#2f2f2f]'>{item.label}</span>
          <span className='text-sm text-[#3a3a3a]'>{item.value}</span>
        </div>
      ))}
    </div>
  );
}

export default function HomeCard() {
  return (
    <section className='bg-white py-6md:py-8 mt-10 md:mt-20 mx-6 xl:mx-30'>
      <div className='grid gap-6 xl:grid-cols-3'>
        {cardData.map((card) => (
          <article
            key={card.title}
            className='flex h-full flex-col rounded-[10px] border border-[#e4e4e4] bg-[#FAFAF9] p-6 shadow-[0_1px_0_rgba(0,0,0,0.02)]'>
            <div className='flex items-center justify-between gap-4'>
              <h2 className='text-base tracking-[-0.01em] text-[#262626]'>
                {card.title}
              </h2>
              <Link
                href={card.actionHref}
                className='inline-flex h-10 items-center rounded-xl border border-[#E5E7EB] bg-transparent px-4 text-sm text-[#313131] transition-colors hover:bg-[#f5f5f5]'>
                {card.actionLabel}
              </Link>
            </div>

            <div className='mt-8'>
              <p className='text-base text-[#262626]'>{card.topStat}</p>
              {card.topDescription ? (
                <p className='whitespace-pre-line text-sm leading-6 text-[#A8A29E]'>
                  {card.topDescription}
                </p>
              ) : null}
            </div>

            <div className='pt-12 mt-auto'>
              <h3 className='text-base text-[#6A7282]'>{card.subHeading}</h3>

              {card.progressItems ? (
                <div className='mt-6 space-y-4'>
                  {card.progressItems.map((item) => (
                    <div key={item.label}>
                      <div className='mb-2 flex items-center justify-between gap-3'>
                        <span className='text-sm text-[#262626]'>
                          {item.label}
                        </span>
                        <span className='text-sm text-[#262626]'>
                          {item.value}
                        </span>
                      </div>
                      <ProgressBar percent={item.percent} color={item.color} />
                    </div>
                  ))}
                </div>
              ) : null}

              {card.metrics ? (
                <div className='mt-6'>
                  <MetricList items={card.metrics} />
                  <div className='mt-4 h-3 rounded-full bg-[#e5e7eb]'>
                    <div
                      className='h-3 rounded-full'
                      style={{
                        backgroundColor: card.accent,
                        width: `${getMetricBarPercent(card)}%`,
                      }}
                    />
                  </div>
                </div>
              ) : null}
            </div>

            <div className='mt-auto pt-8'>
              <FooterCard card={card} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
