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
  }, { scope: sectionRef });

  const handleMouseEnter = (index: number) => {
    setActiveIndex(index);
    gsap.killTweensOf(previewRef.current);
    // Clip-path reveal so the image stays at its full size (no distortion);
    // only the visible window opens vertically from center.
    gsap.fromTo(
      previewRef.current,
      { clipPath: "inset(50% 0%)", opacity: 1 },
      { clipPath: "inset(0% 0%)", duration: 0.5, ease: "power3.out" }
    );
  };

  const handleMouseLeave = () => {
    gsap.killTweensOf(previewRef.current);
    gsap.to(previewRef.current, {
      clipPath: "inset(50% 0%)",
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="works"
      className="relative w-full overflow-hidden bg-geometry-pattern bg-fixed [--black:#B84C2A]"
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

      {/* Works list */}
      <div ref={rowsRef} className="relative">
        {works.map((work, i) => (
          <Link
            key={work.index}
            href={`/works/${work.slug}`}
            className="work-row group relative flex items-center  px-4 md:px-4 py-2 md:py-4 cursor-pointer"
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={handleMouseLeave}
          >
            {/* Index — left */}
            <span className="font-space  text-[11px] tracking-[0.2em] text-brand-linen/40 shrink-0 w-10 transition-colors duration-300 group-hover:text-brand-linen">
              {work.index}
            </span>

            {/* Title centered, with category anchored to title's right edge */}
            <div className="grow flex items-center justify-center pointer-events-none">
              <div className="relative inline-flex items-center font-bungee text-[7vw] md:text-[5.5vw] leading-none uppercase tracking-tight whitespace-nowrap">
                <span className="text-brand-linen/40 group-hover:text-brand-linen transition-colors duration-500">
                  {work.title}
                </span>
                {/* Category sits immediately right of the title text */}
                <div className="absolute left-full ml-6 flex items-center gap-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out">
                  <span className="font-space text-[12px] tracking-[0.2em] uppercase text-brand-linen whitespace-nowrap translate-y-2">
                    {work.category}
                  </span>
                  <span className="font-space text-[11px] text-brand-linen">↗</span>
                </div>
              </div>
            </div>


          </Link>
        ))}

        {/* Floating image preview — fixed to viewport, scales Y from center */}
        <div className="pointer-events-none fixed right-8 md:right-20 top-1/2 -translate-y-1/2 w-[20vw] max-w-72 z-50">
          <div
            ref={previewRef}
            className="relative aspect-3/4 rounded-xl overflow-hidden shadow-2xl ring-1 ring-brand-linen/10"
          >
            <Image
              src={works[activeIndex].image}
              alt={works[activeIndex].title}
              fill
              className="object-cover object-center"
              sizes="224px"
            />
          </div>
        </div>
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
