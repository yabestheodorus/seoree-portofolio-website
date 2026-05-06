"use client";


import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

const leftImages = [
  { src: "/images/event1/d1.png", label: "Poster Design" },
  { src: "/images/event2/d1.png", label: "Event Visual" },
  { src: "/images/event3/d1.png", label: "Motion Works" },
  { src: "/images/event4/d1.png", label: "Branding" },
];

const rightImages = [
  { src: "/images/event1/d2.png", label: "Editorial" },
  { src: "/images/event5/d1.png", label: "Campaign" },
  { src: "/images/event3/d3.png", label: "3D Render" },
  { src: "/images/event4/d3.png", label: "Typography" },
];

export default function Quote() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  const bioText = "I'm Fakhri Akmal, a graphic designer from Bogor who enjoys playing around with colors, shapes, and motion. Whether it's posters, motion graphics, or 3D designs—I love bringing ideas to life.";

  useGSAP(() => {
    if (!textRef.current || !leftColRef.current || !rightColRef.current) return;

    const split = SplitText.create(textRef.current, {
      type: "words",
      mask: "words",
    });

    gsap.set(split.masks, { color: "#ffffff20" });

    gsap.to(split.words, {
      color: "#ffffff",
      stagger: 0.1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 30%",
        end: "bottom 60%",
        scrub: 0.5,
      },
    });

    // Left column scrolls upward
    gsap.fromTo(
      leftColRef.current,
      { y: 0 },
      {
        y: "-30%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      }
    );

    // Right column scrolls downward (starts offset, returns to baseline)
    gsap.fromTo(
      rightColRef.current,
      { y: "-30%" },
      {
        y: "0%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      }
    );

    return () => {
      split.revert();
    };
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full min-h-screen lg:py-132 bg-brand-ink-deep bg-geometry-pattern bg-fixed flex items-center justify-center py-20 px-4 md:px-20 overflow-hidden [--black:var(--ink-deep)]"
    >
      {/* Left parallax column */}
      <div className="absolute left-0 top-56 bottom-0 w-[22vw] overflow-hidden hidden lg:flex pointer-events-none z-0">
        <div ref={leftColRef} className="flex flex-col gap-48 w-full">
          {leftImages.map(({ src, label }, i) => (
            <div
              key={i}
              className={`relative w-48 xl:w-56 aspect-2/3 rounded-xl overflow-hidden shrink-0 self-start ${i % 2 !== 0 ? "ml-16" : "ml-24"}`}
            >
              <Image src={src} alt={label} fill className="object-cover" sizes="336px" />
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-black/80 to-transparent" />
              <p className="absolute bottom-2 left-2 right-2 text-brand-linen/80 text-[9px] font-mono uppercase tracking-wider leading-tight">
                {label}
              </p>
            </div>
          ))}
        </div>
        <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-brand-ink-deep to-transparent z-10" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-brand-ink-deep to-transparent z-10" />
      </div>

      {/* Right parallax column */}
      <div className="absolute right-0 top-56 bottom-0 w-[22vw] overflow-hidden hidden lg:flex pointer-events-none z-0">
        <div ref={rightColRef} className="flex flex-col gap-48 w-full">
          {rightImages.map(({ src, label }, i) => (
            <div
              key={i}
              className={`relative w-48 xl:w-56 aspect-2/3 rounded-xl overflow-hidden shrink-0 self-end ${i % 2 !== 0 ? "mr-16" : "mr-24"}`}
            >
              <Image src={src} alt={label} fill className="object-cover" sizes="336px" />
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-black/80 to-transparent" />
              <p className="absolute bottom-2 left-2 right-2 text-brand-linen/80 text-[9px] font-mono uppercase tracking-wider leading-tight">
                {label}
              </p>
            </div>
          ))}
        </div>
        <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-brand-ink-deep to-transparent z-10" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-brand-ink-deep to-transparent z-10" />
      </div>

      <div className="lg:max-w-3xl max-w-lg w-full relative z-10">
        <p
          ref={textRef}
          className="text-[56px] lg:text-[84px] font-mono font-black leading-[1.1] tracking-tight text-center text-brand-linen"
        >
          {bioText}
        </p>
      </div>
    </section>
  );
}
