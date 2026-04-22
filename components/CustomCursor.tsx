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

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      // Move dot immediately
      gsap.set(dotRef.current, {
        x: clientX,
        y: clientY,
      });

      // Ring follows with lag
      gsap.to(ringRef.current, {
        x: clientX,
        y: clientY,
        duration: 0.35,
        ease: "power2.out",
      });
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
