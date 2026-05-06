"use client";

import React, { useRef, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname, useRouter } from "next/navigation";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Navbar() {
  const ref = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useGSAP(() => {
    if (!ref.current) return;
    const tl = gsap.timeline({ delay: 0.3 });

    gsap.set(ref.current, { autoAlpha: 1 });
    gsap.set([".nav-left-item", ".nav-right-item"], { y: -16, opacity: 0 });

    tl.to(".nav-left-item", {
      y: 0,
      opacity: 1,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.06,
    })
      .to(
        ".nav-right-item",
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.05,
        },
        "<0.05"
      )
      .to(
        ".nav-dot",
        {
          scale: 1.6,
          opacity: 0.35,
          duration: 1.2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          transformOrigin: "center",
        },
        ">-0.2"
      );

    // Minimal Sticky Nav Reveal
    gsap.to(stickyRef.current, {
      y: 0,
      autoAlpha: 1,
      duration: 0.5,
      ease: "power2.inOut",
      scrollTrigger: {
        start: 100,
        toggleActions: "play none none reverse",
      }
    });

    // Main Nav Fade Out
    gsap.to(ref.current, {
      autoAlpha: 0,
      y: -20,
      duration: 0.4,
      ease: "power2.inOut",
      scrollTrigger: {
        start: 100,
        toggleActions: "play none none reverse",
      }
    });
  });

  const handleNav = useCallback((target: string) => {
    if (pathname === "/") {
      const smoother = ScrollSmoother.get();
      if (smoother) {
        smoother.scrollTo(target, true, "top top");
      } else {
        document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(`/${target}`);
    }
  }, [pathname, router]);

  const navItems = [
    { label: "HOME", target: "#home" },
    { label: "ABOUT", target: "#about" },
    { label: "WORKS", target: "#works" },
    { label: "CONTACT", target: "#contact" },
  ];

  return (
    <>
      {/* Main Large Navbar */}
      <header
        ref={ref}
        style={{ visibility: "hidden", opacity: 0 }}
        className="fixed top-0 left-0 right-0 w-full flex justify-between items-center px-4 py-4 md:px-8 md:py-6 text-[12px] md:text-[14px] font-black tracking-widest uppercase text-brand-linen z-40"
      >
        <div className="flex gap-6 md:gap-16 items-center">
          <span className="nav-left-item inline-block">FAKHRI AKMAL</span>

          <div className="nav-left-item hidden lg:block flex items-center gap-2 group">
            <span className="relative inline-flex w-1 h-1 md:w-1.5 md:h-1.5">
              <span className="nav-dot absolute inset-0 bg-brand-linen rounded-full" />
            </span>
            BOGOR, ID
          </div>

          <p className="nav-left-item hidden lg:block max-w-xs text-[11px] font-space font-base normal-case text-left">
            &nbsp;&nbsp;&nbsp;&nbsp;A graphic designer who loves turning ideas into cool visuals. Let&apos;s create something awesome together!
          </p>

          <a
            href="mailto:fakhreemal@gmail.com"
            className="nav-left-item hidden md:flex flex-col font-space normal-case group leading-tight"
          >
            <span className="flex items-center gap-1.5 text-brand-linen/80 group-hover:text-brand-linen transition-colors duration-300">
              Let&apos;s chat
              <span
                aria-hidden
                className="inline-block translate-x-0 -translate-y-px opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 ease-out"
              >
                ↗
              </span>
            </span>
            <span className="relative w-fit">
              fakhreemal@gmail.com
              <span
                aria-hidden
                className="absolute left-0 -bottom-px h-px w-full origin-left scale-x-0 bg-brand-linen group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.3,1)]"
              />
            </span>
          </a>
        </div>

        <nav className="flex gap-4 md:gap-8">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNav(item.target)}
              className="nav-right-item group relative inline-block leading-none cursor-pointer overflow-hidden h-3.5"
            >
              <span className="block transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.3,1)] group-hover:-translate-y-full">
                {item.label}
              </span>
              <span
                aria-hidden
                className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.3,1)] group-hover:translate-y-0"
              >
                {item.label}
              </span>
              <span
                aria-hidden
                className="absolute left-0 -bottom-1 h-px w-full origin-left scale-x-0 bg-brand-linen group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.3,1)]"
              />
            </button>
          ))}
        </nav>
      </header>

      {/* Minimal Sticky Navbar (appears on scroll) */}
      <div
        ref={stickyRef}
        className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 py-3 md:px-8 md:py-4 bg-brand-ink-deep/85 backdrop-blur-lg border-b border-brand-linen/10 -translate-y-full opacity-0 invisible"
      >
        <span className="font-black text-[12px] md:text-[14px] tracking-widest uppercase text-brand-linen">
          FAKHRI AKMAL
        </span>

        <nav className="flex gap-4 md:gap-8">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNav(item.target)}
              className="group relative inline-block leading-none cursor-pointer overflow-hidden h-3.5 text-[11px] md:text-[13px] font-black tracking-widest uppercase text-brand-linen"
            >
              <span className="block transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.3,1)] group-hover:-translate-y-full">
                {item.label}
              </span>
              <span
                aria-hidden
                className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.3,1)] group-hover:translate-y-0"
              >
                {item.label}
              </span>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
