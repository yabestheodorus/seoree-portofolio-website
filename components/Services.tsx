"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  "BRANDING",
  "EDITORIAL DESIGN",
  "DIGITAL CAMPAIGNS",
  "ART DIRECTION",
];

export default function Services() {
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
    <section ref={container} className="services bg-brand-cream px-12 py-[120px]" id="services">
      <div className="section-label reveal font-sans text-[10px] tracking-[0.35em] uppercase text-brand-gold mb-16 flex items-center gap-4 before:content-[''] before:inline-block before:w-8 before:h-[1px] before:bg-brand-gold">
        What I Do
      </div>
      <div className="services-list [counter-reset:svc]">
        {services.map((service, index) => (
          <div
            key={service}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className={`service-row reveal group [counter-increment:svc] flex items-baseline gap-6 py-10 border-b border-brand-ink/10 cursor-pointer overflow-hidden relative transition-[padding-left] duration-400 ease-[cubic-bezier(0.23,1,0.32,1)] hover:pl-6 first:border-t before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-brand-gold before:scale-y-0 before:origin-bottom before:transition-transform before:duration-400 hover:before:scale-y-100`}
          >
            <span className="svc-num font-serif text-[14px] text-brand-gold min-w-8 before:content-['0'_counter(svc)_'.']"></span>
            <span className="svc-title font-display text-[clamp(36px,5vw,72px)] leading-none tracking-[0.02em] flex-1 text-brand-ink transition-colors duration-300 group-hover:text-brand-green">
              {service}
            </span>
            <span className="svc-arrow text-2xl text-brand-gold opacity-0 -translate-x-4 transition-all duration-400 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:opacity-100 group-hover:translate-x-0">
              →
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
