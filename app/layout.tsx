import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import LenisProvider from "@/components/LenisProvider";
import { Barlow_Condensed, Space_Grotesk, Space_Mono, Bungee_Shade } from "next/font/google";
import "./globals.css";

const barlowCondensed = Barlow_Condensed({
  weight: "900",
  variable: "--next-bungee",
  subsets: ["latin"],
});

const bungeeShade = Bungee_Shade({
  weight: "400",
  variable: "--font-bungee-shade",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ['400', '700']
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
      className={`${barlowCondensed.variable} ${bungeeShade.variable} ${spaceGrotesk.variable} ${spaceMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-brand-cream text-brand-ink selection:bg-brand-gold selection:text-brand-ink">
        <CustomCursor />
        <Navbar />
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
