"use client";

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const titleRow1 = "BUILT ";
  const titleRow1b = "fOR";
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
    <section 
      ref={sectionRef} 
      id="home"
      className="relative w-full  flex flex-col justify-center items-stretch bg-brand-ink-deep bg-geometry-pattern bg-fixed pt-24 px-4 md:px-8 border-b border-brand-linen/15 [--black:var(--ink-deep)]"
    >

      {/* ROW 1 */}
      <div className="hero-row flex w-full items-center justify-center h-[15vh] lg:h-auto mt-24">
        <div className="@container w-full flex items-center justify-center overflow-hidden">
          <h1 className="font-bungee scale-y-[1.5] md:scale-y-[1.3] lg:-translate-y-4 lg:scale-y-120 text-[55cqw] lg:text-[29cqw] leading-none uppercase tracking-[-0.03em] text-brand-linen whitespace-nowrap">
            {titleRow1} {isMobile ? <></> : titleRow1b}
          </h1>
        </div>
      </div>

      {/* ROW 2 */}
      <div className="hero-row flex w-full items-center justify-center min-h-[15vh] lg:h-auto">
        <div className="@container w-full flex items-center justify-center overflow-hidden">
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
            className="px-10 py-4 w-full text-center mt-4 bg-brand-rust text-brand-linen rounded-full font-sans font-bold text-[14px] tracking-widest uppercase shadow-xl transition-colors duration-300 hover:bg-brand-rust-light"
          >
            Let's Chat
          </a>
        </div>
      ) : (<></>)}

    </section>
  );
}


