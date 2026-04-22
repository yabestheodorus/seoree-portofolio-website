import type { Metadata } from "next";
import { Bebas_Neue, Cormorant_Garamond, Space_Grotesk } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-display",
  subsets: ["latin"],
});

const cormorantGaramond = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SEOREE — Editorial Portfolio",
  description: "Art Direction & Editorial Design Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${cormorantGaramond.variable} ${spaceGrotesk.variable} antialiased`}
    >
      <body className="min-h-screen bg-brand-cream text-brand-ink selection:bg-brand-gold selection:text-brand-ink">
        {children}
      </body>
    </html>
  );
}
