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
    slug: "event-campaigns",
    title: "EVENT CAMPAIGNS",
    category: "BRANDING & CAMPAIGN",
    year: "2024",
    image: `${BASE}/Event Campaigns/HL.png`,
    images: [
      `${BASE}/Event Campaigns/HL.png`,
      `${BASE}/Event Campaigns/POSTER.png`,
      `${BASE}/Event Campaigns/POSTER V2.1.png`,
      `${BASE}/Event Campaigns/DARUSSALAM CUP.png`,
      `${BASE}/Event Campaigns/REMAKE POSTER.png`,
    ],
    bg: "var(--ink-deep)",
    fg: "var(--cream)",
    accent: "brand-rust",
  },
  {
    index: "02",
    slug: "poster-design",
    title: "POSTER DESIGN",
    category: "EDITORIAL DESIGN",
    year: "2024",
    image: `${BASE}/Poster Design/5 TRAVEL MISTAKES.png`,
    images: [
      `${BASE}/Poster Design/5 TRAVEL MISTAKES.png`,
      `${BASE}/Poster Design/IDUL ADHA.png`,
      `${BASE}/Poster Design/IU.png`,
      `${BASE}/Poster Design/JIEUN.png`,
      `${BASE}/Poster Design/BATIK SHOE.png`,
      `${BASE}/Poster Design/LIVE STREAM AQIL.png`,
      `${BASE}/Poster Design/GIMBAP FIXED.png`,
    ],
    bg: "var(--cream-dark)",
    fg: "var(--ink)",
    accent: "brand-sage",
  },
  {
    index: "03",
    slug: "product-visuals",
    title: "PRODUCT VISUALS",
    category: "3D & BRANDING",
    year: "2024",
    image: `${BASE}/Product Visuals/DEPAN.png`,
    images: [
      `${BASE}/Product Visuals/DEPAN.png`,
      `${BASE}/Product Visuals/BEHIND.png`,
      `${BASE}/Product Visuals/BLKG2.png`,
      `${BASE}/Product Visuals/BUKU YONO.png`,
      `${BASE}/Product Visuals/FRONTT.png`,
      `${BASE}/Product Visuals/LANYARD.png`,
      `${BASE}/Product Visuals/PAPER BAG.png`,
    ],
    bg: "var(--rust)",
    fg: "var(--cream)",
    accent: "brand-amber",
  },
];
