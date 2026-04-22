"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface HeroProps {
  layout?: "split" | "diagonal";
}

export default function Hero({ layout = "diagonal" }: HeroProps) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    // Reset initial states for elements that use the 'reveal' class if needed, 
    // but here hero has its own animation logic in original
    tl.to(".hero-shape", {
      clipPath: layout === "diagonal" 
        ? "polygon(0 0, 58% 0, 42% 100%, 0 100%)" 
        : "polygon(0 0, 50% 0, 50% 100%, 0 100%)",
      duration: 1.4,
      ease: "power4.inOut",
    })
    .to(".hero-shape-2", {
      opacity: 1,
      clipPath: "polygon(78% 0, 100% 0, 100% 100%, 62% 100%)",
      duration: 1.2,
      ease: "power4.inOut",
    }, 0.6)
    .from(".hero-display", {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    }, 0.5)
    .from(".hero-eyebrow", {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    }, 0.8)
    .from(".hero-sub", {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    }, 1.0)
    .from(".hero-scroll-hint", {
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    }, 1.5);

  }, { scope: container, dependencies: [layout] });

  return (
    <section ref={container} className="hero relative w-screen h-screen bg-brand-green overflow-hidden flex items-end px-12 pb-16" id="home">
      {/* Background Shapes */}
      <div className={`hero-shape absolute inset-0 bg-brand-cream clip-empty z-0 transition-[clip-path] duration-700`} />
      <div className="hero-shape-2 absolute inset-0 right-0 bg-brand-green-mid opacity-0 clip-vertical-slit z-0" />
      
      {/* Image Area */}
      <div className={`hero-image-area absolute inset-0 z-[1] overflow-hidden ${layout === 'diagonal' ? 'clip-diagonal' : 'clip-none'}`}>
        <div className="hero-image-placeholder absolute inset-0 bg-brand-green-mid flex items-center justify-center overflow-hidden after:content-[''] after:absolute after:inset-0 after:bg-[repeating-linear-gradient(-45deg,transparent,transparent_20px,rgba(245,240,230,0.04)_20px,rgba(245,240,230,0.04)_21px)]">
          <img 
            src="/images/hero_portrait.png" 
            alt="Seoree Portrait" 
            className="w-full h-full object-cover grayscale-[0.2] contrast-[1.1]"
          />
          {/* Gold decorative corner lines (preserved from original aesthetic) */}
          <div className="absolute inset-0 pointer-events-none opacity-40">
             <div className="absolute top-8 left-8 w-16 h-[0.8px] bg-brand-gold" />
             <div className="absolute top-8 left-8 w-[0.8px] h-16 bg-brand-gold" />
             <div className="absolute top-8 right-8 w-16 h-[0.8px] bg-brand-gold" />
             <div className="absolute top-8 right-8 w-[0.8px] h-16 bg-brand-gold" />
          </div>
          <div className="absolute bottom-16 left-12 font-mono text-[9px] text-white/20 tracking-[3px] select-none uppercase">
            SEOREE · 2025
          </div>
        </div>
      </div>

      {/* Hero Text */}
      <div className="hero-text-group relative z-10 flex flex-col w-full">
        <div className="hero-eyebrow font-sans text-[11px] tracking-[0.3em] uppercase text-brand-gold mb-2">
          Editorial Portfolio · 2025
        </div>
        <h1 className="hero-display font-display text-[clamp(100px,16vw,220px)] leading-[0.85] text-brand-cream mix-blend-normal relative -tracking-[0.01em]">
          SEOREE
        </h1>
        <p className="hero-sub font-serif text-[clamp(16px,2vw,22px)] italic text-[#d9d9d9] mt-4">
          Art Direction & Editorial Design
        </p>
      </div>

      {/* Scroll Hint */}
      <div className="hero-scroll-hint absolute right-12 bottom-16 flex flex-col items-center gap-3 z-10">
        <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-white/70 [writing-mode:vertical-rl]">
          Scroll
        </span>
        <div className="scroll-line w-[1px] h-[60px] bg-[linear-gradient(to_bottom,var(--gold),transparent)] animate-[scrollPulse_2s_2s_ease-in-out_infinite]" />
      </div>

      <style jsx>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.4; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.2); }
        }
      `}</style>
    </section>
  );
}
