"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface MarqueeProps {
  speed?: "normal" | "fast" | "slow";
}

const items = [
  "Branding",
  "Editorial Design",
  "Art Direction",
  "Digital Campaigns",
  "Typography",
  "Visual Identity",
];

export default function Marquee({ speed = "normal" }: MarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const duration = speed === "fast" ? 10 : speed === "slow" ? 40 : 25;
    
    gsap.to(marqueeRef.current, {
      xPercent: -50,
      ease: "none",
      duration: duration,
      repeat: -1,
    });
  }, { dependencies: [speed] });

  return (
    <div className="marquee-strip bg-brand-green py-5 overflow-hidden relative">
      <div 
        ref={marqueeRef}
        className="marquee-inner flex gap-12 whitespace-nowrap w-fit"
      >
        {/* Render items twice for infinite effect */}
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <div key={i} className="marquee-item flex items-center gap-12 font-display text-[16px] tracking-[0.25em] text-brand-cream opacity-60 uppercase flex-shrink-0">
            {item}
            <div className="marquee-dot w-1 h-1 rounded-full bg-brand-gold flex-shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
