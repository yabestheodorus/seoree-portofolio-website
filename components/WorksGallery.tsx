"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Flip, ScrollTrigger, ScrollSmoother);
}

interface WorksGalleryProps {
  images: string[];
  title: string;
  accentColor: string;
}

/**
 * Gallery + Flip lightbox.
 *
 * The lightbox is rendered through a React Portal into <body> so that
 * `position: fixed` is anchored to the viewport. (The page is wrapped in
 * GSAP ScrollSmoother which applies a `transform: matrix3d(...)` to
 * #smooth-content — that transform makes any fixed descendant positioned
 * relative to the wrapper, breaking native scroll on the lightbox.)
 *
 * Flip matches the grid thumbnail and the portal image via `data-flip-id`.
 * Only one element ever holds a given id at a time:
 *   - inactive: grid <img> has  data-flip-id="img-N"
 *   - active:   grid <img> has  no id (and visibility: hidden), portal <img> has it
 */
export default function WorksGallery({ images, title, accentColor }: WorksGalleryProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLSpanElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const isAnimatingRef = useRef(false);

  const flipIdSelector = "[data-flip-id^='img-']";
  const scrollScrollerToTop = () => {
    if (scrollerRef.current) scrollerRef.current.scrollTop = 0;
  };

  /* ── Reveal-on-scroll for tiles ── */
  useGSAP(() => {
    const tiles = gridRef.current?.querySelectorAll(".gallery-tile");
    if (!tiles?.length) return;
    gsap.set(tiles, { opacity: 0, y: 60 });
    gsap.to(tiles, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.06,
      scrollTrigger: {
        trigger: gridRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  }, { scope: gridRef });

  const runFlip = useCallback((state: Flip.FlipState, duration: number, onDone?: () => void) => {
    Flip.from(state, {
      duration,
      ease: "power3.inOut",
      absolute: true,
      scale: false,
      onComplete: () => {
        isAnimatingRef.current = false;
        onDone?.();
      },
    });
  }, []);

  /* ── Open ── */
  const openAt = useCallback((idx: number) => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const state = Flip.getState(flipIdSelector);
    setActiveIdx(idx);

    requestAnimationFrame(() => {
      scrollScrollerToTop();
      runFlip(state, 0.75);

      if (overlayRef.current) {
        gsap.fromTo(
          overlayRef.current.querySelectorAll(".overlay-chrome"),
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.35, stagger: 0.05 }
        );
      }
    });
  }, [runFlip]);

  /* ── Close ── */
  const close = useCallback(() => {
    if (isAnimatingRef.current || activeIdx === null) return;
    isAnimatingRef.current = true;

    if (overlayRef.current) {
      gsap.set(overlayRef.current.querySelectorAll(".overlay-chrome"), { opacity: 0 });
    }
    scrollScrollerToTop();

    const state = Flip.getState(flipIdSelector);
    setActiveIdx(null);

    requestAnimationFrame(() => {
      runFlip(state, 0.7);
    });
  }, [activeIdx, runFlip]);

  /* ── Step prev / next ── */
  const step = useCallback(
    (dir: 1 | -1) => {
      if (activeIdx === null || isAnimatingRef.current) return;
      const nextIdx = (activeIdx + dir + images.length) % images.length;

      isAnimatingRef.current = true;
      if (captionRef.current) {
        gsap.to(captionRef.current, {
          opacity: 0,
          y: dir * -8,
          duration: 0.2,
          ease: "power2.in",
        });
      }

      const state = Flip.getState(flipIdSelector);
      setActiveIdx(nextIdx);

      requestAnimationFrame(() => {
        scrollScrollerToTop();
        runFlip(state, 0.55, () => {
          if (captionRef.current) {
            gsap.fromTo(
              captionRef.current,
              { opacity: 0, y: dir * 8 },
              { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
            );
          }
        });
      });
    },
    [activeIdx, images.length, runFlip]
  );

  /* ── Keyboard + body scroll lock + smoother pause ── */
  useEffect(() => {
    if (activeIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Pause the smoother — its wheel/touch normalizer otherwise consumes
    // events even outside #smooth-content.
    const smoother = ScrollSmoother.get();
    smoother?.paused(true);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      smoother?.paused(false);
    };
  }, [activeIdx, close, step]);

  return (
    <>
      {/* ── Masonry grid ── */}
      <div ref={gridRef} className="columns-1 sm:columns-2 lg:columns-3 gap-3 md:gap-5">
        {images.map((src, i) => {
          const isActive = activeIdx === i;
          return (
            <figure
              key={`${src}-${i}`}
              className="gallery-tile group relative break-inside-avoid mb-3 md:mb-5 cursor-zoom-in"
              onClick={() => !isActive && openAt(i)}
            >
              <span className="pointer-events-none absolute top-3 left-3 z-10 font-space text-[9px] tracking-[0.3em] uppercase text-brand-linen/0 group-hover:text-brand-linen/90 transition-colors duration-500 mix-blend-difference">
                {String(i + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
              </span>
              <span className="pointer-events-none absolute bottom-3 right-3 z-10 flex items-center gap-2 font-space text-[9px] tracking-[0.3em] uppercase opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 text-brand-linen mix-blend-difference">
                View
                <span aria-hidden>↗</span>
              </span>
              <span
                className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ boxShadow: `inset 0 0 0 1px ${accentColor}` }}
              />

              <img
                data-flip-id={isActive ? undefined : `img-${i}`}
                src={src}
                alt={`${title} — image ${i + 1}`}
                loading={i === 0 ? "eager" : "lazy"}
                draggable={false}
                style={isActive ? { visibility: "hidden" } : undefined}
                className="block w-full h-auto select-none transition-[filter,transform] duration-700 ease-out group-hover:scale-[1.02]"
              />
            </figure>
          );
        })}
      </div>

      {/* ── Portal lightbox: rendered into <body> to escape ScrollSmoother's
            transform context so `position: fixed` and native scroll work. */}
      {typeof document !== "undefined" &&
        createPortal(
          <div
            ref={overlayRef}
            aria-hidden={activeIdx === null}
            className={
              "fixed inset-0 z-[100] " +
              (activeIdx === null ? "pointer-events-none" : "")
            }
          >
            {/* Backdrop */}
            <div
              onClick={close}
              className={
                "absolute inset-0 w-full h-full bg-brand-ink-deep/85 backdrop-blur-md cursor-zoom-out transition-opacity duration-500 " +
                (activeIdx === null ? "opacity-0" : "opacity-100")
              }
            />

            {/* Scrollable image container */}
            <div
              ref={scrollerRef}
              onClick={(e) => {
                // close when clicking outside the image (the centering wrapper)
                if (e.target === e.currentTarget || (e.target as HTMLElement).dataset.lightboxBg) {
                  close();
                }
              }}
              className={
                "absolute inset-0 overflow-y-auto overflow-x-hidden overscroll-contain " +
                (activeIdx === null ? "pointer-events-none" : "")
              }
            >
              <div
                data-lightbox-bg="1"
                className="min-h-full w-full flex items-start md:items-center justify-center px-4 py-20 md:px-16 md:py-20"
              >
                {activeIdx !== null && (
                  <img
                    data-flip-id={`img-${activeIdx}`}
                    src={images[activeIdx]}
                    alt={`${title} — image ${activeIdx + 1}`}
                    draggable={false}
                    onClick={(e) => e.stopPropagation()}
                    className="block w-auto h-auto max-w-full select-none shadow-2xl cursor-default"
                  />
                )}
              </div>
            </div>

            {/* Top-left meta */}
            <div className="overlay-chrome pointer-events-none absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-3">
              <span
                className="font-space text-[10px] tracking-[0.3em] uppercase"
                style={{ color: accentColor }}
              >
                {title}
              </span>
              <span className="font-space text-[10px] tracking-[0.3em] text-brand-cream/55">/</span>
              <span ref={captionRef} className="font-space text-[10px] tracking-[0.3em] uppercase text-brand-cream/60">
                {activeIdx !== null
                  ? `${String(activeIdx + 1).padStart(2, "0")} — ${String(images.length).padStart(2, "0")}`
                  : ""}
              </span>
            </div>

            {/* Top-right close */}
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="overlay-chrome absolute top-5 right-5 md:top-7 md:right-7 group flex items-center gap-3 px-3 py-2"
            >
              <span className="font-space text-[10px] tracking-[0.3em] uppercase text-brand-cream/60 group-hover:text-brand-cream transition-colors">
                Close
              </span>
              <span className="relative w-6 h-6 flex items-center justify-center">
                <span className="absolute w-5 h-px bg-brand-cream/70 group-hover:bg-brand-cream rotate-45 transition-colors" />
                <span className="absolute w-5 h-px bg-brand-cream/70 group-hover:bg-brand-cream -rotate-45 transition-colors" />
              </span>
            </button>

            {/* Prev / Next */}
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous image"
                  className="overlay-chrome group absolute left-4 md:left-8 top-1/2 -translate-y-1/2 flex items-center gap-3 px-3 py-3"
                >
                  <span className="font-space text-[18px] text-brand-cream/60 group-hover:text-brand-cream transition-colors">
                    ←
                  </span>
                  <span className="hidden md:inline font-space text-[10px] tracking-[0.3em] uppercase text-brand-cream/70 group-hover:text-brand-cream/80 transition-colors">
                    Prev
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next image"
                  className="overlay-chrome group absolute right-4 md:right-8 top-1/2 -translate-y-1/2 flex items-center gap-3 px-3 py-3"
                >
                  <span className="hidden md:inline font-space text-[10px] tracking-[0.3em] uppercase text-brand-cream/70 group-hover:text-brand-cream/80 transition-colors">
                    Next
                  </span>
                  <span className="font-space text-[18px] text-brand-cream/60 group-hover:text-brand-cream transition-colors">
                    →
                  </span>
                </button>
              </>
            )}

            {/* Bottom hint */}
            <div className="overlay-chrome pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 font-space text-[9px] tracking-[0.3em] uppercase text-brand-cream/60">
              <span>Esc — Close</span>
              <span className="text-brand-cream/35">·</span>
              <span>← / → — Navigate</span>
            </div>

            {/* Progress rule */}
            <div
              className="overlay-chrome absolute bottom-0 left-0 h-px"
              style={{
                width: activeIdx === null ? "0%" : `${((activeIdx + 1) / images.length) * 100}%`,
                backgroundColor: accentColor,
                transition: "width 0.5s ease",
              }}
            />
          </div>,
          document.body
        )}
    </>
  );
}
