"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
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

  return (
    <section ref={container} className="about bg-brand-green px-12 py-[120px] grid grid-cols-1 md:grid-cols-2 gap-20 items-start relative overflow-hidden" id="about">
      <div className="absolute bottom-[-20px] right-[-20px] font-display text-[200px] text-brand-cream opacity-[0.04] pointer-events-none leading-none select-none">
        ABOUT
      </div>
      
      <div>
        <div className="about-headline reveal font-display text-[clamp(56px,8vw,110px)] leading-[0.9] text-brand-cream tracking-[0.02em]">
          <em className="block font-serif italic text-[0.55em] text-brand-gold tracking-[0.03em] mb-3 not-italic">The Designer</em>
          CRAFT MEETS VISION
        </div>
        <div className="mt-12 reveal">
          <div className="about-image-block aspect-[3/4] bg-brand-green-mid relative overflow-hidden [clip-path:polygon(0_0,100%_0,100%_85%,88%_100%,0_100%)] transition-[clip-path] duration-600 ease-[cubic-bezier(0.23,1,0.32,1)] hover:[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)] after:content-[''] after:absolute after:inset-0 after:bg-[repeating-linear-gradient(-45deg,transparent,transparent_20px,rgba(245,240,230,0.04)_20px,rgba(245,240,230,0.04)_21px)]">
            <img 
              src="/images/about_portrait.png" 
              alt="Seoree Workspace" 
              className="pf-bg w-full h-full object-cover grayscale-[0.1] contrast-[1.05]" 
            />
            <div className="pf-stripe absolute inset-0 bg-[repeating-linear-gradient(-45deg,transparent,transparent_30px,rgba(0,0,0,0.04)_30px,rgba(0,0,0,0.04)_31px)]"></div>
            <div className="about-image-inner absolute inset-0 flex items-center justify-center z-[1]">
              <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-brand-cream/30 opacity-0 group-hover:opacity-100 transition-opacity">Studio / Portraits</span>
            </div>
          </div>
        </div>
      </div>

      <div className="about-right reveal flex flex-col gap-10 pt-4">
        <p className="about-body font-serif text-[20px] leading-[1.7] text-white/90 font-light">
          A graphic designer crafting visual narratives through bold typography and innovative layouts. With a deep passion for editorial design and the art of the unexpected, every project becomes an opportunity to push the boundaries of what visual communication can be.
        </p>
        <p className="about-body font-serif text-[17px] leading-[1.7] text-white/70 font-light">
          Based between Seoul and New York, working globally with brands who believe design can change how people see the world.
        </p>
        <div className="about-stats grid grid-cols-2 gap-8 pt-4 border-t border-white/10">
          <div>
            <div className="stat-num font-display text-[56px] leading-none text-brand-cream tracking-[0.02em]">08<span className="text-brand-gold">+</span></div>
            <div className="stat-label font-sans text-[10px] tracking-[0.25em] uppercase text-white/70 mt-1.5">Years Experience</div>
          </div>
          <div>
            <div className="stat-num font-display text-[56px] leading-none text-brand-cream tracking-[0.02em]">120<span className="text-brand-gold">+</span></div>
            <div className="stat-label font-sans text-[10px] tracking-[0.25em] uppercase text-white/70 mt-1.5">Projects Delivered</div>
          </div>
          <div>
            <div className="stat-num font-display text-[56px] leading-none text-brand-cream tracking-[0.02em]">24<span className="text-brand-gold">+</span></div>
            <div className="stat-label font-sans text-[10px] tracking-[0.25em] uppercase text-white/70 mt-1.5">Awards Won</div>
          </div>
          <div>
            <div className="stat-num font-display text-[56px] leading-none text-brand-cream tracking-[0.02em]">40<span className="text-brand-gold">+</span></div>
            <div className="stat-label font-sans text-[10px] tracking-[0.25em] uppercase text-white/70 mt-1.5">Clients Global</div>
          </div>
        </div>
      </div>
    </section>
  );
}
