"use client";

import { useEffect, useRef, useState } from 'react';
import ImageSlideshow from './ImageSlideshow';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const titleRow1 = "BUILT ";
  const titleRow1b = "fOR";
  const titleRow2 = "GROWTH";

  const slideshow1 = [
    "/images/event1/d1.png",
    "/images/event1/d2.png",
    "/images/event1/d3.png",
    "/images/event1/d4.png",
  ];

  const slideshow2 = [
    "/images/event5/d1.png",
    "/images/event5/d2.png",
    "/images/event5/d3.png",
    "/images/event5/d4.png",
  ];

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
    // Very minimal entrance
    gsap.from(".hero-row", {
      y: 20,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power2.out"
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative w-full  flex flex-col justify-center items-stretch bg-brand-ink-deep bg-geometry-pattern bg-fixed pt-24 px-4 md:px-8 border-b border-brand-linen/15 [--black:var(--ink-deep)]">

      {/* ROW 1 */}
      <div className="hero-row flex w-full items-stretch h-[15vh] lg:h-auto mt-24">
        <div className="@container w-full lg:w-2/3 flex pr-8 items-center overflow-hidden">
          <h1 className="font-bungee scale-y-[1.5] md:scale-y-[1.3] lg:-translate-y-4 lg:scale-y-120 text-[55cqw] lg:text-[29cqw] leading-none uppercase tracking-[-0.03em] text-brand-linen whitespace-nowrap">
            {titleRow1} {isMobile ? <></> : titleRow1b}
          </h1>
        </div>

        <div className="lg:w-1/3 w-full grow relative flex py-4">
          <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.01]">
            <ImageSlideshow
              images={slideshow1}
              interval={600}
              sizes={isMobile ? "100vw" : "33vw"}
            />
          </div>
        </div>
      </div>

      {/* ROW 2 */}
      <div className="hero-row flex w-full items-stretch min-h-[15vh] lg:h-auto">
        <div className="lg:w-1/3 w-full grow relative flex py-4">
          <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.01]">
            <ImageSlideshow
              images={slideshow2}
              interval={400}
              sizes={isMobile ? "100vw" : "33vw"}
            />
          </div>
        </div>

        <div className="@container w-2/3 flex px-8 items-center justify-center overflow-hidden">
          <h1 className="font-bungee scale-y-[1.8] md:scale-y-[1.3] lg:-translate-y-4 lg:scale-y-120 lg:text-[35cqw] text-[70cqw] leading-none uppercase tracking-[-0.03em] text-brand-linen whitespace-nowrap">
            {isMobile ? titleRow1b : titleRow2}
          </h1>
        </div>
      </div>

      {isMobile ? (
        <div className="hero-row flex flex-col items-center gap-6 ">
          <div className="@container w-full flex px-8 justify-center overflow-hidden">
            <h1 className="font-bungee scale-y-[1.2] md:scale-y-[1.1] text-[35cqw] leading-none uppercase tracking-[-0.03em] text-brand-linen whitespace-nowrap">
              {titleRow2}
            </h1>
          </div>

          <a
            href="mailto:fakhreemal@gmail.com"
            className="px-10 py-4 w-full text-center mt-4 bg-lime-300 text-brand-ink rounded-full font-sans font-bold text-[14px] tracking-widest uppercase shadow-xl transition-colors duration-300 hover:bg-brand-amber hover:text-brand-ink"
          >
            Let's Chat
          </a>
        </div>
      ) : (<></>)}

    </section>
  );
}


