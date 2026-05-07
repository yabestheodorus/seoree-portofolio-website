"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis
    const lenis = new Lenis({
      lerp: 0.1, // Smooth but responsive
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      smoothWheel: true,
    });

    lenisRef.current = lenis;
    (window as any).lenis = lenis;

    // Sync ScrollTrigger with Lenis
    lenis.on("scroll", ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);

    // Stabilize GSAP ticker
    gsap.ticker.lagSmoothing(1000, 16);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateTicker);
      (window as any).lenis = null;
    };
  }, []);

  return <>{children}</>;
}
