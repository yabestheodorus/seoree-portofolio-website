"use client";

import React, { useRef, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollSmoother } from "gsap/ScrollSmoother";

export default function Navbar() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(ref.current, { opacity: 0 }, { opacity: 1, visibility: "visible", duration: 0.8, delay: 2.2 });
  }, { scope: ref });

  const handleNav = useCallback((target: string) => {
    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.scrollTo(target, true, "top top");
    } else {
      document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const navItems = [
    { label: "HOME", target: "#home" },
    { label: "WORKS", target: "#works" },
    { label: "BREAK", target: "#break" },
    { label: "ABOUT", target: "#about" },
  ];

  return (
    <header
      ref={ref}
      style={{ visibility: "hidden" }}
      className="fixed top-0 left-0 right-0 w-full flex justify-between items-center px-4 py-4 md:px-8 md:py-6 text-[12px] md:text-[14px] font-black tracking-widest uppercase text-brand-linen z-50"
    >
      <div className="flex gap-6 md:gap-16 items-center">
        FAKHRI AKMAL
        <div className="flex items-center gap-2">
          <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-brand-linen rounded-full"></div>
          BOGOR, ID
        </div>

        <p className="hidden md:block max-w-xs text-[11px] font-space font-base normal-case text-left"> &nbsp;&nbsp;&nbsp;&nbsp;A graphic designer who loves turning ideas into cool visuals. Let's create something awesome together!</p>
        <div className="hidden md:flex flex-col font-space normal-case">
          <span>Let's chat</span>
          <span>fakhreemal@gmail.com</span>
        </div>


      </div>

      <nav className="hidden md:flex gap-4 md:gap-8">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => handleNav(item.target)}
            className="hover:opacity-70 transition-opacity cursor-pointer"
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
