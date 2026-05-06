"use client";

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const titleRow1 = "BUILT ";
  const titleRow1b = "FOR";
  const titleRow2 = "GROWTH";

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    updateIsMobile();
    window.addEventListener('resize', updateIsMobile);
    return () => window.removeEventListener('resize', updateIsMobile);
  }, []);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Initial state to prevent FOUC
    gsap.set(".hero-title", {
      opacity: 0,
      y: 80,
    });

    const tl = gsap.timeline({ delay: 0.5 });

    tl.to(".hero-title", {
      opacity: 1,
      y: 0,
      duration: 1.5,
      stagger: 0.2,
      ease: "power4.out",
    });

    // Subtitle / Button reveal
    tl.from(".hero-cta", {
      opacity: 0,
      y: 20,
      duration: 1,
      ease: "power3.out"
    }, "-=1");

  }, { scope: containerRef });

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative w-full flex flex-col gap-y-0 lg:gap-y-0 justify-center items-stretch bg-brand-ink-deep bg-geometry-pattern bg-fixed pt-24 px-4 md:px-8 border-b border-brand-linen/15 [--black:var(--ink-deep)]"
    >

      {/* UNIFIED HEADLINE STACK */}
      <div ref={containerRef} className="flex flex-col items-center gap-0 mt-16">
        {/* ROW 1: BUILT */}
        <div className="@container w-full flex items-center justify-center overflow-visible">
          <h1 className="hero-title font-bungee uppercase md:scale-y-[1.3] lg:-translate-y-4 lg:scale-y-120 text-[48cqw] lg:text-[29cqw] leading-[0.75] md:leading-none lg:leading-[1.3] tracking-[-0.03em] text-brand-linen whitespace-nowrap">
            {titleRow1}
            <span className="hidden lg:inline text-transparent [-webkit-text-stroke:4px_var(--rust)] uppercase">{titleRow1b}</span>
          </h1>
        </div>

        {/* ROW 2: fOR (mobile) / GROWTH (desktop) */}
        <div className="@container w-full flex items-center justify-center lg:mt-0 overflow-visible">
          <h1 className="hero-title lg:hidden font-bungee uppercase scale-y-[1.4] text-[60cqw] leading-none lg:leading-[1.4] tracking-[-0.03em] text-transparent [-webkit-text-stroke:3px_var(--rust)] whitespace-nowrap">
            {titleRow1b}
          </h1>
          <h1 className="hero-title hidden lg:block font-bungee uppercase lg:-translate-y-4 lg:scale-y-150 lg:-mt-14 lg:text-[32cqw] leading-[0.9] md:leading-none lg:leading-[1.4] tracking-[-0.03em] text-brand-linen">
            {titleRow2}
          </h1>
        </div>

        {/* ROW 3: GROWTH (mobile) */}
        <div className="lg:hidden @container w-full flex px-8 justify-center overflow-visible">
          <h1 className="hero-title font-bungee uppercase scale-y-[1.2] text-[34cqw] leading-[1.2] tracking-[-0.03em] text-brand-linen">
            {titleRow2}
          </h1>
        </div>

        {/* CTA BUTTON */}
        <div className="hero-cta w-full flex justify-center mt-12 lg:hidden">
          <a
            href="mailto:fakhreemal@gmail.com"
            className="px-10 py-4 w-full text-center bg-brand-rust text-brand-linen rounded-full font-sans font-bold text-[14px] tracking-widest uppercase shadow-xl transition-colors duration-300 hover:bg-brand-rust-light"
          >
            Let's Chat
          </a>
        </div>
      </div>

    </section>
  );
}
