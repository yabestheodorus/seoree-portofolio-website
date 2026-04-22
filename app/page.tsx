"use client";

import { useState, useEffect } from "react";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import TweaksPanel, { Scheme, Speed, Layout } from "@/components/TweaksPanel";

export default function PortfolioPage() {
  const [scheme, setScheme] = useState<Scheme>("green");
  const [speed, setSpeed] = useState<Speed>("normal");
  const [layout, setLayout] = useState<Layout>("diagonal");

  useEffect(() => {
    const r = document.documentElement.style;
    if (scheme === "green") {
      r.setProperty("--green", "oklch(0.21 0.065 162)");
      r.setProperty("--green-mid", "oklch(0.28 0.07 162)");
      r.setProperty("--cream", "oklch(0.97 0.018 85)");
      r.setProperty("--ink", "oklch(0.14 0.04 162)");
      // Update Tailwind theme colors (if using CSS vars)
      r.setProperty("--color-brand-green", "oklch(0.21 0.065 162)");
      r.setProperty("--color-brand-green-mid", "oklch(0.28 0.07 162)");
      r.setProperty("--color-brand-cream", "oklch(0.97 0.018 85)");
      r.setProperty("--color-brand-ink", "oklch(0.14 0.04 162)");
    } else if (scheme === "noir") {
      r.setProperty("--green", "oklch(0.12 0.01 0)");
      r.setProperty("--green-mid", "oklch(0.2 0.01 0)");
      r.setProperty("--cream", "oklch(0.96 0.01 80)");
      r.setProperty("--ink", "oklch(0.1 0.01 0)");
      r.setProperty("--color-brand-green", "oklch(0.12 0.01 0)");
      r.setProperty("--color-brand-green-mid", "oklch(0.2 0.01 0)");
      r.setProperty("--color-brand-cream", "oklch(0.96 0.01 80)");
      r.setProperty("--color-brand-ink", "oklch(0.1 0.01 0)");
    } else if (scheme === "ivory") {
      r.setProperty("--green", "oklch(0.88 0.04 80)");
      r.setProperty("--green-mid", "oklch(0.82 0.05 80)");
      r.setProperty("--cream", "oklch(0.99 0.005 85)");
      r.setProperty("--ink", "oklch(0.22 0.04 162)");
      r.setProperty("--color-brand-green", "oklch(0.88 0.04 80)");
      r.setProperty("--color-brand-green-mid", "oklch(0.82 0.05 80)");
      r.setProperty("--color-brand-cream", "oklch(0.99 0.005 85)");
      r.setProperty("--color-brand-ink", "oklch(0.22 0.04 162)");
    }
  }, [scheme]);

  return (
    <main className="relative min-h-screen">
      <CustomCursor />
      <Navbar />
      
      <Hero layout={layout} />
      
      <Marquee speed={speed} />
      
      <Services />
      
      <About />
      
      <Portfolio />
      
      <Contact />
      
      <Footer />

      <TweaksPanel 
        currentScheme={scheme}
        currentSpeed={speed}
        currentLayout={layout}
        onSchemeChange={setScheme}
        onSpeedChange={setSpeed}
        onLayoutChange={setLayout}
      />
    </main>
  );
}
