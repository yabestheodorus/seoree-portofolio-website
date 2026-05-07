"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Flip, ScrollTrigger);
}

// useSyncExternalStore helpers — stable identities so the hook doesn't resubscribe.
const subscribeNoop = () => () => { };
const getMountedClient = () => true;
const getMountedServer = () => false;

interface WorksGalleryProps {
  images: string[];
  title: string;
  accentColor: string;
}

/**
 * Gallery Image component with blur-up optimization
 */
function GalleryImage({ src, alt, width, height, quality = 70, priority = false, sizes = "33vw", className = "", imgClassName = "", flipId = "" }: any) {
  const [isLoaded, setIsLoaded] = useState(false);
  
  return (
    <div className={`relative ${className}`}>
      <Image
        data-flip-id={flipId || undefined}
        src={src}
        alt={alt}
        width={width}
        height={height}
        quality={quality}
        priority={priority}
        sizes={sizes}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-auto select-none transition-[filter,opacity] duration-1000 ease-out ${imgClassName} ${isLoaded ? "blur-0 opacity-100" : "blur-2xl opacity-0"}`}
        draggable={false}
      />
    </div>
  );
}

export default function WorksGallery({ images, title, accentColor }: WorksGalleryProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLSpanElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const isAnimatingRef = useRef(false);

  // Defer portal render to after hydration
  const mounted = useSyncExternalStore(
    subscribeNoop,
    getMountedClient,
    getMountedServer
  );

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

    // Freeze masonry layout to prevent shifting during re-renders
    const tiles = gridRef.current?.querySelectorAll<HTMLElement>(".gallery-tile");
    tiles?.forEach(tile => {
      tile.style.height = `${tile.offsetHeight}px`;
    });

    const state = Flip.getState(flipIdSelector, { props: "object-fit,border-radius" });
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

    const state = Flip.getState(flipIdSelector, { props: "object-fit,border-radius" });
    setActiveIdx(null);

    requestAnimationFrame(() => {
      runFlip(state, 0.7, () => {
        // Unfreeze masonry layout
        const tiles = gridRef.current?.querySelectorAll<HTMLElement>(".gallery-tile");
        tiles?.forEach(tile => {
          tile.style.height = "";
        });
      });
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

      const state = Flip.getState(flipIdSelector, { props: "object-fit,border-radius" });
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

    // Pause Lenis smooth scrolling when lightbox is active
    const lenis = (window as any).lenis;
    lenis?.stop();

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      lenis?.start();
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
              <span className="pointer-events-none absolute top-3 left-3 z-20 font-space text-[9px] tracking-[0.3em] uppercase text-brand-linen/0 group-hover:text-brand-linen/90 transition-colors duration-500 mix-blend-difference">
                {String(i + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
              </span>
              <span className="pointer-events-none absolute bottom-3 right-3 z-20 flex items-center gap-2 font-space text-[9px] tracking-[0.3em] uppercase opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 text-brand-linen mix-blend-difference">
                View
                <span aria-hidden>↗</span>
              </span>
              <span
                className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ boxShadow: `inset 0 0 0 1px ${accentColor}` }}
              />

              <GalleryImage
                src={src}
                alt={`${title} — image ${i + 1}`}
                width={800}
                height={1200}
                priority={i < 3}
                flipId={isActive ? "" : `img-${i}`}
                className={`transition-transform duration-700 ease-out group-hover:scale-[1.02] ${activeIdx !== null ? "!transition-none" : ""}`}
                style={isActive ? { opacity: 0, pointerEvents: "none" } : undefined}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </figure>
          );
        })}
      </div>

      {/* ── Portal lightbox ── */}
      {mounted &&
        createPortal(
          <div
            ref={overlayRef}
            aria-hidden={activeIdx === null}
            className={
              "fixed inset-0 z-[100] transition-opacity duration-500 " +
              (activeIdx === null ? "pointer-events-none opacity-0" : "opacity-100")
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
                  <div className="relative w-full h-full flex items-center justify-center">
                    <GalleryImage
                      src={images[activeIdx]}
                      alt={`${title} — image ${activeIdx + 1}`}
                      width={1920}
                      height={1080}
                      quality={90}
                      priority
                      flipId={`img-${activeIdx}`}
                      className="shadow-2xl cursor-default"
                      imgClassName="max-w-full max-h-[85vh] object-contain !w-auto !h-auto"
                      sizes="90vw"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Overlay UI (Caption, Buttons, etc.) */}
            <div className="overlay-chrome pointer-events-none absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-3">
              <span className="font-space text-[10px] tracking-[0.3em] uppercase" style={{ color: accentColor }}>{title}</span>
              <span className="font-space text-[10px] tracking-[0.3em] text-brand-cream/55">/</span>
              <span ref={captionRef} className="font-space text-[10px] tracking-[0.3em] uppercase text-brand-cream/60">
                {activeIdx !== null ? `${String(activeIdx + 1).padStart(2, "0")} — ${String(images.length).padStart(2, "0")}` : ""}
              </span>
            </div>

            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="overlay-chrome absolute top-5 right-5 md:top-7 md:right-7 group flex items-center gap-3 px-3 py-2"
            >
              <span className="font-space text-[10px] tracking-[0.3em] uppercase text-brand-cream/60 group-hover:text-brand-cream transition-colors">Close</span>
              <span className="relative w-6 h-6 flex items-center justify-center">
                <span className="absolute w-5 h-px bg-brand-cream/70 group-hover:bg-brand-cream rotate-45 transition-colors" />
                <span className="absolute w-5 h-px bg-brand-cream/70 group-hover:bg-brand-cream -rotate-45 transition-colors" />
              </span>
            </button>

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

            <div className="overlay-chrome pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 font-space text-[9px] tracking-[0.3em] uppercase text-brand-cream/60">
              <span>Esc — Close</span>
              <span className="text-brand-cream/35">·</span>
              <span>← / → — Navigate</span>
            </div>

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
