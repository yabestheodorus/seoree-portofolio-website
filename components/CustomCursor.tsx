"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const xTo = gsap.quickTo(ringRef.current, "x", { duration: 0.15, ease: "power2.out" });
    const yTo = gsap.quickTo(ringRef.current, "y", { duration: 0.15, ease: "power2.out" });
    const dotX = gsap.quickSetter(dotRef.current, "x", "px");
    const dotY = gsap.quickSetter(dotRef.current, "y", "px");

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      dotX(clientX);
      dotY(clientY);

      xTo(clientX);
      yTo(clientY);
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div id="cursor" ref={cursorRef}>
      <div ref={dotRef} className="dot fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[10px] h-[10px] bg-brand-cream rounded-full pointer-events-none z-[9999] mix-blend-difference " />
      <div ref={ringRef} className="ring fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[40px] h-[40px] border border-brand-cream rounded-full pointer-events-none z-[9999] mix-blend-difference transition-[width,height,margin] duration-300" />
    </div>
  );
}
