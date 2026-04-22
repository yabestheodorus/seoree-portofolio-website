"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Contact() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const revealEls = container.current?.querySelectorAll(".reveal");
    if (!revealEls) return;

    revealEls.forEach((el) => {
      gsap.fromTo(el, 
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
          }
        }
      );
    });
  }, { scope: container });

  const onMouseEnter = () => document.body.classList.add("hovering");
  const onMouseLeave = () => document.body.classList.remove("hovering");

  return (
    <section ref={container} className="contact bg-brand-green px-12 py-[140px] text-center relative overflow-hidden" id="contact">
      {/* Decorative circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-white/3 pointer-events-none" />

      <div className="contact-inner relative z-[1]">
        <div className="contact-tag reveal font-sans text-[10px] tracking-[0.35em] uppercase text-brand-gold mb-8">
          Let&apos;s Create Together
        </div>
        <h2 className="contact-headline reveal font-display text-[clamp(60px,10vw,140px)] leading-[0.88] text-brand-cream mb-12">
          <em className="block font-serif italic text-brand-gold text-[0.45em] tracking-[0.04em] mb-2 not-italic">Available for Projects</em>
          START A<br/>PROJECT
        </h2>
        <a 
          href="mailto:hello@seoree.studio"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className="contact-email reveal inline-block font-serif text-[clamp(18px,2.5vw,26px)] text-white/90 tracking-[0.05em] no-underline border-b border-brand-gold pb-1.5 transition-colors duration-300 hover:text-brand-gold cursor-pointer"
        >
          hello@seoree.studio
        </a>
      </div>
    </section>
  );
}
