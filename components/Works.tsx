"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { works } from "@/lib/works";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Works() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(() => {
    gsap.set(previewRef.current, { clipPath: "inset(50% 0%)", opacity: 0 });

    /* ── Title char-by-char entrance ── */
    const chars = headerRef.current?.querySelectorAll(".works-char");
    if (chars?.length) {
      gsap.set(chars, { opacity: 0, y: 80 });
      gsap.to(chars, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power4.out",
        stagger: 0.03,
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }

    gsap.from(".works-eyebrow", {
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: headerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    const rows = rowsRef.current?.querySelectorAll(".work-row");
    if (rows?.length) {
      gsap.set(rows, { opacity: 0, y: 56 });
      gsap.to(rows, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power4.out",
        stagger: 0.09,
        scrollTrigger: {
          trigger: rowsRef.current,
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });
    }

    /* ── Responsive Logic ── */
    const mm = gsap.matchMedia();

    mm.add({
      isMobile: "(max-width: 767px)",
      isDesktop: "(min-width: 768px)"
    }, (context) => {
      const { isMobile } = context.conditions as { isMobile: boolean };

      if (isMobile) {
        const rows = rowsRef.current?.querySelectorAll(".work-row");
        rows?.forEach((row) => {
          const title = row.querySelector(".work-title");
          const preview = row.querySelector(".mobile-preview");
          const category = row.querySelector(".work-category");

          gsap.timeline({
            scrollTrigger: {
              trigger: row,
              start: "top 50%",
              end: "bottom top",
              toggleActions: "play reverse play reverse",
            }
          })
            .fromTo(title, { color: "rgba(250, 249, 246, 0.3)" }, { color: "#faf9f6", duration: 0.25 })
            .fromTo(category, { opacity: 0, y: 4 }, { opacity: 1, y: 0, duration: 0.25 }, 0)
            .fromTo(preview,
              { height: 0, opacity: 0 },
              { height: "auto", opacity: 1, duration: 0.4, ease: "power2.inOut" },
              0
            );
        });
      }
    });
  }, { scope: sectionRef });

  const handleMouseEnter = (index: number) => {
    if (window.innerWidth < 768) return;
    setActiveIndex(index);
    gsap.killTweensOf(previewRef.current);
    gsap.fromTo(
      previewRef.current,
      { clipPath: "inset(50% 0%)", opacity: 1 },
      { clipPath: "inset(0% 0%)", duration: 0.6, ease: "power4.out" }
    );
  };

  const handleMouseLeave = () => {
    if (window.innerWidth < 768) return;
    gsap.killTweensOf(previewRef.current);
    gsap.to(previewRef.current, {
      clipPath: "inset(50% 0%)",
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="works"
      className="relative w-full overflow-hidden bg-brand-ink-deep bg-geometry-pattern bg-fixed [--black:#B84C2A]"
    >

      {/* Header */}
      <div ref={headerRef} className="px-4 pt-24 pb-14 md:px-8 md:pt-32 border-b border-brand-linen/10">
        <div className="works-eyebrow flex items-center justify-between mb-8">
          <span className="font-space text-[10px] tracking-[0.35em] uppercase text-brand-linen/30">
            Selected Works
          </span>
          <span className="font-space text-[10px] tracking-[0.25em] uppercase text-brand-linen/15">
            2022 — 2024
          </span>
        </div>
        <div className="font-bungee text-[15vw] leading-[0.88] uppercase tracking-tight text-brand-linen">
          {["SELECTED", "WORKS"].map((word, wi) => (
            <span key={wi} className="block overflow-hidden">
              {word.split("").map((char, ci) => (
                <span
                  key={`${wi}-${ci}`}
                  className="works-char inline-block"
                >
                  {char}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* Works list + Preview Layout */}
      <div ref={rowsRef} className="relative flex flex-col md:flex-row items-stretch ">

        {/* Left: Works list */}
        <div className="w-full md:w-3/5 border-r border-brand-linen/5  flex flex-col justify-center">
          {works.map((work, i) => (
            <Link
              key={work.index}
              href={`/works/${work.slug}`}
              className="work-row group relative flex flex-col md:flex-row items-stretch md:items-start px-4 md:px-12 py-2 md:py-8 border-b border-brand-linen/5 cursor-pointer overflow-hidden"
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Index - Top on mobile, Left on desktop */}
              <span className="font-space text-[11px] tracking-[0.2em] text-brand-linen/30 mb-1 md:mb-0 md:shrink-0 md:w-12 transition-colors duration-300 group-hover:text-brand-linen text-center md:text-left">
                {work.index}
              </span>

              {/* Title Content */}
              <div className="grow flex flex-col md:flex-row md:items-baseline gap-4 md:gap-10 pointer-events-none items-center md:items-start text-center md:text-left w-full">
                <span className="work-title font-bungee text-[12vw] md:text-[6.5vw] leading-[0.85] uppercase tracking-normal text-brand-linen/30 group-hover:text-brand-linen transition-colors duration-500">
                  {work.title}
                </span>

                {/* Category info */}
                <div className="work-category flex items-center justify-center md:justify-start gap-3 md:opacity-0 md:translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
                  <span className="font-space text-[10px] tracking-[0.3em] uppercase text-brand-linen/60 whitespace-nowrap">
                    {work.category}
                  </span>
                  <span className="font-space text-[11px] text-brand-rust">↗</span>
                </div>

                {/* MOBILE PREVIEW (visible on mobile scroll) */}
                <div className="mobile-preview md:hidden w-full h-0 opacity-0 overflow-hidden mt-6">
                  <div className="relative aspect-[1/2] w-full">
                    <Image
                      src={work.image}
                      alt={work.title}
                      fill
                      className="object-contain"
                      sizes="90vw"
                    />
                  </div>
                </div>
              </div>

              {/* Hover highlight background (desktop) */}
              <div className="hidden md:block absolute inset-0 bg-brand-linen/0 group-hover:bg-brand-linen/2 transition-colors duration-500 -z-10" />
            </Link>
          ))}
        </div>

        {/* Right: Full-height Sticky Preview */}
        <div className="hidden md:block md:w-2/5 relative mr-18">
          <div className=" h-[50vh] w-full overflow-hidden">
            <div
              ref={previewRef}
              className="relative w-full h-full"
            >
              {works.map((work, idx) => (
                <Image
                  key={work.index}
                  src={work.image}
                  alt={work.title}
                  fill
                  className={`object-contain object-center transition-opacity duration-500 ${idx === activeIndex ? "opacity-100" : "opacity-0"}`}
                  sizes="40vw"
                  priority
                />
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Hidden Preloader for Mobile/Desktop smooth transitions */}
      <div className="sr-only" aria-hidden="true">
        {works.map((work) => (
          <img key={work.index} src={work.image} alt="" />
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-brand-linen/10 px-4 py-14 md:px-8 flex justify-between items-center">
        <span className="font-space text-[9px] tracking-[0.3em] uppercase text-brand-linen/20">
          Art Direction & Motion
        </span>
        <span className="font-space text-[9px] tracking-[0.3em] uppercase text-brand-linen/20">
          Fakhri Akmal
        </span>
      </div>
    </section>
  );
}
