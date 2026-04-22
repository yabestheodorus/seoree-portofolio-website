"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const portfolioItems = [
  {
    name: "FASHION EDITORIAL 01",
    cat: "Editorial",
    image: "/images/portfolio_fashion.png",
    bgClass: "bg-[linear-gradient(135deg,oklch(0.35_0.06_162),oklch(0.22_0.07_162))]",
    label: "Fashion Editorial",
    type: "item1"
  },
  {
    name: "URBAN IDENTITY",
    cat: "Branding",
    image: "/images/portfolio_branding.png",
    bgClass: "bg-[linear-gradient(135deg,oklch(0.82_0.06_80),oklch(0.65_0.09_80))]",
    label: "Brand Identity",
    type: "item2"
  },
  {
    name: "TYPOGRAPHY STUDY",
    cat: "Type",
    image: "/images/portfolio_typography.png",
    bgClass: "bg-[linear-gradient(160deg,oklch(0.18_0.04_162),oklch(0.12_0.03_162))]",
    label: "Typography",
    type: "item3"
  },
  {
    name: "DIGITAL CAMPAIGN",
    cat: "Campaign",
    image: "/images/portfolio_campaign.png",
    bgClass: "bg-[linear-gradient(135deg,oklch(0.55_0.07_162),oklch(0.35_0.07_162))]",
    label: "Campaign",
    type: "item4"
  }
];

export default function Portfolio() {
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
    <section ref={container} className="portfolio bg-brand-cream px-12 py-[120px]" id="portfolio">
      <div className="portfolio-header flex items-end justify-between mb-16">
        <h2 className="portfolio-title reveal font-display text-[clamp(56px,8vw,100px)] leading-[0.9] text-brand-ink">
          SELECTED<br/>WORKS
        </h2>
        <span 
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className="view-all reveal font-sans text-[11px] tracking-[0.2em] uppercase text-brand-green border-b border-brand-green pb-1 transition-colors duration-300 cursor-pointer"
        >
          View All Projects
        </span>
      </div>

      <div className="portfolio-grid reveal grid grid-cols-[1.4fr_1fr_0.8fr] gap-[2px] bg-brand-green overflow-hidden">
        {portfolioItems.map((item, i) => (
          <div
            key={i}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className={`pf-item group relative overflow-hidden bg-brand-cream-dark cursor-pointer 
              ${i === 0 ? "row-span-2 aspect-[3/4.5]" : ""}
              ${i === 1 ? "aspect-[4/3]" : ""}
              ${i === 2 ? "aspect-[3/4]" : ""}
              ${i === 3 ? "aspect-[4/3]" : ""}
            `}
          >
            <div className={`pf-bg ${item.bgClass} absolute inset-0 transition-transform duration-600 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105`}>
               <img 
                 src={item.image} 
                 alt={item.name} 
                 className="w-full h-full object-cover grayscale-[0.1] contrast-[1.05]" 
               />
            </div>
            <div className="pf-stripe absolute inset-0 bg-[repeating-linear-gradient(-45deg,transparent,transparent_30px,rgba(0,0,0,0.04)_30px,rgba(0,0,0,0.04)_31px)]" />
            
            {item.type === "item3" && false ? ( // Disabling the old Typography overlay in favor of the real image
              <div className="pf-type-text absolute inset-0 flex items-center justify-center z-[2] p-6">
                <span className="pf-type-word font-display text-[52px] leading-[0.85] text-brand-cream tracking-[0.04em] [writing-mode:vertical-rl] opacity-90">
                  TYPO<br/>GRA<br/>PHY
                </span>
              </div>
            ) : null}

            <div className="pf-overlay absolute bottom-0 left-0 right-0 p-6 bg-[linear-gradient(to_top,rgba(0,0,0,0.7)_0%,transparent_100%)] translate-y-2 opacity-0 transition-all duration-400 ease-[cubic-bezier(0.23,1,0.32,1)] z-10 group-hover:opacity-100 group-hover:translate-y-0">
              <div className="pf-cat font-sans text-[9px] tracking-[0.3em] uppercase text-brand-gold mb-1">
                {item.cat}
              </div>
              <div className="pf-name font-display text-[22px] text-brand-cream tracking-[0.05em]">
                {item.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
