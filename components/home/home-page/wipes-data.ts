export type WipesProduct = {
  id: string;
  image: string;
  imageAlt: string;
  name: string;
  price: number;
  tags: string[];
  subscribeLabel?: string;
};

export const wipesData: WipesProduct[] = [
  {
    id: "roll",
    image: "/ZilkyWipes/p.png",
    imageAlt: "Zilky Wipes roll",
    name: "ZilkyWipes™ Roll",
    price: 12,
    tags: [
      "Flushable",
      "Biodegradable",
      "Roll Wipe",
      "Travel Friendly",
      "Recyclable",
    ],
  },
  {
    id: "pack-standard",
    image: "/ZilkyWipes/p2.png",
    imageAlt: "Zilky Wipes pack",
    name: "EcoClean Towels™",
    price: 16,
    tags: ["Soft Touch", "Travel Friendly", "Recyclable", "Flushable"],
    subscribeLabel: "Subscribe & Save 15%",
  },
  {
    id: "pack-plus",
    image: "/ZilkyWipes/p3.png",
    imageAlt: "Zilky Wipes pack",
    name: "NatureSoft Wipes™",
    price: 18,
    tags: ["Soft Touch", "Travel Friendly", "Recyclable", "Flushable"],
    subscribeLabel: "Subscribe & Save 15%",
  },
];
