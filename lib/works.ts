const BASE = "/images";

export interface WorkItem {
  index: string;
  slug: string;
  title: string;
  category: string;
  year: string;
  image: string;
  images: string[];
  bg: string;
  fg: string;
  accent: string;
}

export const accentVar: Record<string, string> = {
  "brand-rust":       "var(--rust)",
  "brand-rust-light": "var(--rust-light)",
  "brand-amber":      "var(--amber)",
  "brand-sage":       "var(--sage)",
  "brand-sage-light": "var(--sage-light)",
};

export const works: WorkItem[] = [
  {
    index: "01",
    slug: "book-fair",
    title: "BOOK FAIR",
    category: "GRAPHIC DESIGN",
    year: "2024",
    image: `${BASE}/event1/HL.png`,
    images: [
      `${BASE}/event1/HL.png`,
      `${BASE}/event1/d1.png`,
      `${BASE}/event1/d2.png`,
      `${BASE}/event1/d3.png`,
      `${BASE}/event1/d4.png`,
    ],
    bg: "var(--ink)",
    fg: "var(--cream)",
    accent: "brand-rust",
  },
  {
    index: "02",
    slug: "carousel",
    title: "CAROUSEL",
    category: "SOCIAL MEDIA",
    year: "2024",
    image: `${BASE}/event2/d1.png`,
    images: [
      `${BASE}/event2/d1.png`,
      `${BASE}/event2/d2.png`,
    ],
    bg: "var(--sand)",
    fg: "var(--ink)",
    accent: "brand-sage",
  },
  {
    index: "03",
    slug: "event-poster",
    title: "EVENT POSTER",
    category: "POSTER DESIGN",
    year: "2024",
    image: `${BASE}/event3/d1.png`,
    images: [
      `${BASE}/event3/d1.png`,
      `${BASE}/event3/d2.png`,
      `${BASE}/event3/d3.png`,
      `${BASE}/event3/d4.png`,
    ],
    bg: "var(--rust)",
    fg: "var(--cream)",
    accent: "brand-amber",
  },
  {
    index: "04",
    slug: "goods",
    title: "GOODS",
    category: "PRODUCT DESIGN",
    year: "2024",
    image: `${BASE}/event4/d7.png`,
    images: [
      `${BASE}/event4/d1.png`,
      `${BASE}/event4/d2.png`,
      `${BASE}/event4/d3.png`,
      `${BASE}/event4/d4.png`,
      `${BASE}/event4/d5.png`,
      `${BASE}/event4/d6.png`,
      `${BASE}/event4/d7.png`,
    ],
    bg: "var(--linen)",
    fg: "var(--ink)",
    accent: "brand-sage-light",
  },
  {
    index: "05",
    slug: "others",
    title: "OTHERS",
    category: "MISCELLANEOUS",
    year: "2024",
    image: `${BASE}/event5/d1.png`,
    images: [
      `${BASE}/event5/d1.png`,
      `${BASE}/event5/d2.png`,
      `${BASE}/event5/d3.png`,
      `${BASE}/event5/d4.png`,
      `${BASE}/event5/d5.png`,
    ],
    bg: "var(--sage)",
    fg: "var(--ink)",
    accent: "brand-rust-light",
  },
];
