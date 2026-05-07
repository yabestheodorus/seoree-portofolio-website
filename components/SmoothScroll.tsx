"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
  gsap.ticker.lagSmoothing(1000, 16);
}

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const smoother = useRef<ScrollSmoother | null>(null);

  useEffect(() => {
    smoother.current = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1,
      effects: true,
      smoothTouch: 0.1,
      normalizeScroll: true,
    });

    return () => {
      smoother.current?.kill();
    };
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
