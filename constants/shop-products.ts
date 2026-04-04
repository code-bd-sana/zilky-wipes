export type ShopProduct = {
  id: string;
  category: ShopCategory;
  image: string;
  imageAlt: string;
  name: string;
  price: number;
  tags: string[];
  subscribeLabel?: string;
};

export type ShopCategory = "starter-kit" | "refill" | "bundles";

export const shopCategoryFilters: Array<{
  label: string;
  value: ShopCategory;
}> = [
  { label: "Starter Kit", value: "starter-kit" },
  { label: "Refill", value: "refill" },
  { label: "Bundles", value: "bundles" },
];

export const shopProducts: ShopProduct[] = [
  {
    id: "1",
    category: "starter-kit",
    image: "/home/wipe.png",
    imageAlt: "ZilkyWipes roll",
    name: "ZilkyWipes\u2122 Roll",
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
    subscribeLabel: "Price: $24.00",
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
    image: "/home/wipe.png",
    imageAlt: "EcoClean Towels",
    name: "EcoClean Towels\u2122",
    price: 10.5,
    tags: ["Reusable", "Compostable", "Towel", "Non-toxic", "Biodegradable"],
    subscribeLabel: "Price: $24.00",
  },
  {
    id: "6",
    category: "bundles",
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
    subscribeLabel: "Price: $24.00",
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
    image: "/home/wipe.png",
    imageAlt: "EcoClean Towels",
    name: "EcoClean Towels\u2122",
    price: 10.5,
    tags: ["Reusable", "Compostable", "Towel", "Non-toxic", "Biodegradable"],
    subscribeLabel: "Price: $24.00",
  },
  {
    id: "12",
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
