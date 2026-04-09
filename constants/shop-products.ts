export type ShopProduct = {
  id: string;
  category: ShopCategory;
  purchaseType?: ShopPurchaseType;
  image: string;
  imageAlt: string;
  name: string;
  price: number;
  tags: string[];
  subscribeLabel?: string;
};

export type ShopCategory = "starter-kit" | "refill" | "bundles";
export type ShopPurchaseType = "one-time" | "subscription";

export type ProductDetailSection = {
  title: string;
  content: string;
};

export type ProductDetailContent = {
  headlineDescription: string;
  sections: ProductDetailSection[];
};

export const shopCategoryFilters: Array<{
  label: string;
  value: ShopCategory;
}> = [
  { label: "Starter Kit", value: "starter-kit" },
  { label: "Refill", value: "refill" },
  { label: "Bundles", value: "bundles" },
];

export const shopPurchaseTypeTabs: Array<{
  label: string;
  value: ShopPurchaseType;
}> = [
  { label: "One Time", value: "one-time" },
  { label: "Subscription", value: "subscription" },
];

export const shopProducts: ShopProduct[] = [
  {
    id: "1",
    category: "starter-kit",
    image: "/home/wipe.png",
    imageAlt: "ZilkyWipes roll",
    name: "ZilkyWipes\u2122",
    price: 12,
    tags: ["Flushable", "Biodegradable", "Roll Wipe", "Flushable", "Recyclable"],
    subscribeLabel: "Subscribe & Save 15%",
  },
  {
    id: "2",
    category: "refill",
    image: "/home/wipe.png",
    imageAlt: "EcoClean Towels",
    name: "EcoClean Towels\u2122",
    price: 10.5,
    tags: ["Reusable", "Compostable", "Towel", "Non-toxic", "Biodegradable"],
    subscribeLabel: "Subscribe & Save 15%",
  },
  {
    id: "3",
    category: "bundles",
    image: "/home/wipe.png",
    imageAlt: "NatureSoft Wipes",
    name: "NatureSoft Wipes\u2122",
    price: 15,
    tags: ["Flushable", "Recyclable", "Soft Wipe", "Hypoallergenic", "Biodegradable"],
    subscribeLabel: "Subscribe & Save 15%",
  },
  {
    id: "4",
    category: "starter-kit",
    purchaseType: "subscription",
    image: "/home/wipe.png",
    imageAlt: "ZilkyWipes roll",
    name: "ZilkyWipes\u2122 Roll",
    price: 12,
    tags: ["Flushable", "Biodegradable", "Roll Wipe", "Flushable", "Recyclable"],
    subscribeLabel: "Subscribe & Save 15%",
  },
  {
    id: "5",
    category: "refill",
    purchaseType: "subscription",
    image: "/home/wipe.png",
    imageAlt: "EcoClean Towels",
    name: "EcoClean Towels\u2122",
    price: 10.5,
    tags: ["Reusable", "Compostable", "Towel", "Non-toxic", "Biodegradable"],
    subscribeLabel: "Subscribe & Save 15%",
  },
  {
    id: "6",
    category: "bundles",
    purchaseType: "subscription",
    image: "/home/wipe.png",
    imageAlt: "NatureSoft Wipes",
    name: "NatureSoft Wipes\u2122",
    price: 15,
    tags: ["Flushable", "Recyclable", "Soft Wipe", "Hypoallergenic", "Biodegradable"],
    subscribeLabel: "Subscribe & Save 15%",
  },
  {
    id: "7",
    category: "starter-kit",
    image: "/home/wipe.png",
    imageAlt: "ZilkyWipes roll",
    name: "ZilkyWipes\u2122 Roll",
    price: 12,
    tags: ["Flushable", "Biodegradable", "Roll Wipe", "Flushable", "Recyclable"],
    subscribeLabel: "Subscribe & Save 15%",
  },
  {
    id: "8",
    category: "refill",
    image: "/home/wipe.png",
    imageAlt: "EcoClean Towels",
    name: "EcoClean Towels\u2122",
    price: 10.5,
    tags: ["Reusable", "Compostable", "Towel", "Non-toxic", "Biodegradable"],
    subscribeLabel: "Subscribe & Save 15%",
  },
  {
    id: "9",
    category: "bundles",
    image: "/home/wipe.png",
    imageAlt: "NatureSoft Wipes",
    name: "NatureSoft Wipes\u2122",
    price: 15,
    tags: [
      "Flushable",
      "Recyclable",
      "Soft Wipe",
      "Hypoallergenic",
      "Biodegradable",
    ],
    subscribeLabel: "Subscribe & Save 15%",
  },
  {
    id: "10",
    category: "starter-kit",
    purchaseType: "subscription",
    image: "/home/wipe.png",
    imageAlt: "ZilkyWipes roll",
    name: "ZilkyWipes\u2122 Roll",
    price: 12,
    tags: ["Flushable", "Biodegradable", "Roll Wipe", "Flushable", "Recyclable"],
    subscribeLabel: "Subscribe & Save 15%",
  },
  {
    id: "11",
    category: "refill",
    purchaseType: "subscription",
    image: "/home/wipe.png",
    imageAlt: "EcoClean Towels",
    name: "EcoClean Towels\u2122",
    price: 10.5,
    tags: ["Reusable", "Compostable", "Towel", "Non-toxic", "Biodegradable"],
    subscribeLabel: "Subscribe & Save 15%",
  },
  {
    id: "12",
    category: "bundles",
    purchaseType: "subscription",
    image: "/home/wipe.png",
    imageAlt: "NatureSoft Wipes",
    name: "NatureSoft Wipes\u2122",
    price: 15,
    tags: [
      "Flushable",
      "Recyclable",
      "Soft Wipe",
      "Hypoallergenic",
      "Biodegradable",
    ],
    subscribeLabel: "Subscribe & Save 15%",
  },
  {
    id: "13",
    category: "starter-kit",
    image: "/home/wipe.png",
    imageAlt: "ZilkyWipes roll",
    name: "ZilkyWipes\u2122 Roll",
    price: 12,
    tags: ["Flushable", "Biodegradable", "Roll Wipe", "Flushable", "Recyclable"],
    subscribeLabel: "Subscribe & Save 15%",
  },
  {
    id: "14",
    category: "starter-kit",
    image: "/home/wipe.png",
    imageAlt: "ZilkyWipes roll",
    name: "ZilkyWipes\u2122 Roll",
    price: 12,
    tags: ["Flushable", "Biodegradable", "Roll Wipe", "Flushable", "Recyclable"],
    subscribeLabel: "Subscribe & Save 15%",
  },
];

export const productDetailsByCategory: Record<
  ShopCategory,
  ProductDetailContent
> = {
  "starter-kit": {
    headlineDescription:
      "ZilkyWipes replaces toilet paper with something gentler, cleaner, and far more human. A soft, biodegradable wet wipe designed for real bathrooms and real bodies.",
    sections: [
      {
        title: "Product Introduction",
        content:
          "Dry paper was never the answer. ZilkyWipes replaces rough friction with a soft, soothing clean that feels better every day.",
      },
      {
        title: "What you're actually using",
        content:
          "A skin-safe wet wipe roll that focuses on comfort and consistency with materials chosen for daily use.",
      },
      {
        title: "Materials",
        content:
          "Biodegradable fibers and a balanced moisture blend, designed to be gentle while still cleaning effectively.",
      },
      {
        title: "Benifits",
        content:
          "Softer clean, reduced irritation, and a fresher feeling that makes traditional dry paper feel outdated.",
      },
    ],
  },
  refill: {
    headlineDescription:
      "EcoClean Towels make restocking effortless with a cleaner formula and a consistent soft-touch experience in every use.",
    sections: [
      {
        title: "Product Introduction",
        content:
          "Built for refill simplicity, this format keeps your routine uninterrupted and your bathroom setup neat.",
      },
      {
        title: "What you're actually using",
        content:
          "A refill-focused wipe format made for daily comfort, practical use, and easier household restocking.",
      },
      {
        title: "Materials",
        content:
          "Compostable and biodegradable fibers paired with a non-irritating moisture balance for everyday freshness.",
      },
      {
        title: "Benifits",
        content:
          "Cleaner feel, less harshness, and better refill value over time without compromising comfort.",
      },
    ],
  },
  bundles: {
    headlineDescription:
      "NatureSoft Wipes bundles are built for homes that want long-lasting stock and premium comfort in every roll.",
    sections: [
      {
        title: "Product Introduction",
        content:
          "Bundle packs reduce repeat purchasing and keep your essentials ready with fewer interruptions.",
      },
      {
        title: "What you're actually using",
        content:
          "A premium soft wipe bundle designed for reliable daily use and improved household convenience.",
      },
      {
        title: "Materials",
        content:
          "Hypoallergenic and biodegradable material blend focused on skin comfort and practical sustainability.",
      },
      {
        title: "Benifits",
        content:
          "Higher convenience, better value per unit, and a consistently gentle clean for everyone at home.",
      },
    ],
  },
};
