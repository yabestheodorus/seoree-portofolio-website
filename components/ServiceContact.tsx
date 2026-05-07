"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const socials = [
  {
    label: "BEHANCE",
    href: "https://www.behance.net/fakhriakmal",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.337.5-.837.9-1.502 1.19.906.26 1.576.72 2.022 1.37.448.66.665 1.45.665 2.36 0 .75-.13 1.39-.41 1.93-.28.55-.67 1-.161 1.35-.49.35-1.05.61-1.68.78-.63.17-1.29.25-1.98.25H1V4.503h5.938zm-.588 5.5h-1.6v2.875h1.6c.307 0 .6-.03.87-.095.27-.063.51-.168.71-.312.2-.143.36-.33.474-.555.115-.224.172-.494.172-.808 0-.646-.18-1.112-.54-1.4-.362-.286-.866-.43-1.51-.43H6.35v.726zm.293 5.34c.34 0 .65-.03.932-.09.283-.06.527-.16.735-.295.205-.135.366-.316.484-.54.116-.226.174-.508.174-.848 0-.664-.192-1.154-.576-1.47-.382-.317-.92-.476-1.606-.476H4.75v3.72h1.893zM18.5 5H14V3h4.5v2zm1.774 11.498c-.302.896-1.462 2.502-4.074 2.502-2.662 0-4.7-1.63-4.7-5.295C11.5 9.812 13.338 8 15.774 8c2.417 0 3.882 1.387 4.189 3.432.078.5.107 1.133.095 2.07H13.5c.101 2.208 3.274 2.364 4.15.992h2.624zm-4.124-8c-1.43 0-2.1 1.018-2.1 2.27h4c-.02-1.252-.774-2.27-1.9-2.27z" />
      </svg>
    ),
  },
  {
    label: "INSTAGRAM",
    href: "https://www.instagram.com/seor.ee",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
];

const services = [
  {
    label: "CRAFT",
    headline: ["The art", "of detail"],
    paragraph:
      "Making things look good is easy. Making them right is another story. Every element we place serves a purpose: to tell a story, to seduce, to convert. It's that balance between aesthetics and performance that makes people click, scroll, and remember. Nothing's left to chance except maybe where we set our coffee on the desk.",
  },
  {
    label: "NO-CODE & BEYOND",
    headline: ["Faster.", "Smoother."],
    paragraph:
      "Digital is our playground. We master the best tools from Webflow to GSAP, via Three.js and the latest trends in UI/UX. But beyond the tech itself, what truly drives us is how it enhances the user experience. If it doesn't work, congrats — you've built a screensaver.",
  },
  {
    label: "MOTION & 3D",
    headline: ["Alive by", "design"],
    paragraph:
      "Static is dead. We breathe motion into every frame — from social media animations to immersive 3D product renders. Each keyframe, each transition, each camera move is choreographed to hold attention and amplify the message. Because if it doesn't move people, what's the point?",
  },
];

export default function ServiceContact() {
  const sectionRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    /* ── Section title char-by-char entrance ── */
    const chars = servicesRef.current?.querySelectorAll(".svc-char");
    if (chars?.length) {
      gsap.set(chars, { opacity: 0, y: 80 });
      gsap.to(chars, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power4.out",
        stagger: 0.03,
        scrollTrigger: {
          trigger: servicesRef.current?.querySelector(".svc-title"),
          start: "top 95%",
          toggleActions: "play none none reverse",
        },
      });
    }

    /* ── Service rows entrance ── */
    const rows = servicesRef.current?.querySelectorAll(".svc-row");
    if (rows?.length) {
      rows.forEach((row) => {
        const label = row.querySelector(".svc-label");
        const headline = row.querySelector(".svc-headline");
        const para = row.querySelector(".svc-paragraph");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
        });

        if (label) tl.from(label, { opacity: 0, x: -30, duration: 0.8, ease: "power3.out" }, 0);
        if (headline) tl.from(headline, { opacity: 0, y: 50, duration: 1, ease: "power4.out" }, 0.1);
        if (para) tl.from(para, { opacity: 0, y: 30, duration: 0.9, ease: "power3.out" }, 0.25);
      });
    }

    /* ── Divider lines ── */
    const dividers = servicesRef.current?.querySelectorAll(".svc-divider");
    if (dividers?.length) {
      dividers.forEach((div) => {
        gsap.from(div, {
          scaleX: 0,
          transformOrigin: "left",
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: div,
            start: "top bottom",
            toggleActions: "play none none reverse",
          },
        });
      });
    }

    /* ── Contact animations ── */
    const line1 = contactRef.current?.querySelector(".c-line-1") as HTMLElement;
    const line2 = contactRef.current?.querySelector(".c-line-2") as HTMLElement;
    if (line1 && line2) {
      gsap.set(line1, { xPercent: -100 });
      gsap.set(line2, { xPercent: 100 });
      gsap.timeline({
        scrollTrigger: {
          trigger: contactRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      })
        .to(line1, { xPercent: 0, duration: 1.1, ease: "power4.out" }, 0)
        .to(line2, { xPercent: 0, duration: 1.1, ease: "power4.out" }, 0.12);
    }

    gsap.from(".contact-detail", {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: contactRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="contact" className="relative w-full overflow-hidden">

      {/* ── Services ── editorial 3-column row layout */}
      <div
        ref={servicesRef}
        className="bg-brand-cream bg-geometry-pattern-light bg-fixed px-6 pt-28 pb-32 md:px-12 lg:px-20 md:pt-36 md:pb-40"
      >
        {/* ── Section Title ── */}
        <h2 className="svc-title font-bungee text-[13vw] md:text-[8.5vw] leading-[0.92] uppercase tracking-tight text-brand-black mb-24 md:mb-32">
          {["THE FUEL", "BEHIND", "THE CRAFT"].map((word, wi) => (
            <span key={wi} className="block overflow-hidden">
              {word.split("").map((char, ci) => (
                <span
                  key={`${wi}-${ci}`}
                  className="svc-char inline-block"
                  style={{ whiteSpace: char === " " ? "pre" : undefined }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>
          ))}
        </h2>

        <div className="flex flex-col">
          {services.map((svc, i) => (
            <div key={svc.label}>
              {/* Divider line */}
              {i === 0 && (
                <div className="svc-divider h-px w-full bg-brand-black/10 mb-16 md:mb-24" />
              )}

              <div className="svc-row grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
                {/* Left: Label */}
                <div className="svc-label md:col-span-2">
                  <span className="font-space text-[10px] tracking-[0.35em] uppercase text-brand-black/40">
                    {svc.label}
                  </span>
                </div>

                {/* Middle: Large headline */}
                <div className="svc-headline md:col-span-4">
                  {svc.headline.map((line) => (
                    <h3
                      key={line}
                      className="font-bungee text-[11vw] md:text-[3.2vw] leading-[1.05] tracking-tight text-brand-black"
                    >
                      {line}
                    </h3>
                  ))}
                </div>

                {/* Right: Paragraph */}
                <div className="svc-paragraph md:col-span-5 md:col-start-8">
                  <p className="font-sans text-[14px] md:text-[15px] leading-[1.75] text-brand-black/70">
                    {svc.paragraph}
                  </p>
                </div>
              </div>

              {/* Spacing between rows */}
              <div className="svc-divider h-px w-full bg-brand-black/10 mt-16 mb-16 md:mt-24 md:mb-24 last:mb-0" />
            </div>
          ))}
        </div>
      </div>

      {/* ── Contact ── */}
      <div ref={contactRef} className="bg-brand-ink-deep overflow-hidden px-4 pt-20 pb-16 md:px-8 md:pt-28 md:pb-24">

        <div className="contact-detail mb-10">
          <span className="font-space text-[10px] tracking-[0.35em] uppercase text-brand-cream/40">
            Get In Touch
          </span>
        </div>

        <div className="overflow-hidden mb-1">
          <div className="c-line-1 font-bungee text-[13vw] leading-[0.88] uppercase tracking-tight text-brand-cream">
            LET'S WORK
          </div>
        </div>
        <div className="overflow-hidden mb-16 md:mb-20">
          <div className="c-line-2 font-bungee text-[13vw] leading-[0.88] uppercase tracking-tight text-brand-cream">
            TOGETHER
          </div>
        </div>

        <div className="flex flex-col gap-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">

            <div className="flex flex-col gap-5">
              <a
                href="mailto:fakhreemal@gmail.com"
                className="contact-detail group flex items-center gap-3 w-fit"
              >
                <span className="font-space text-[11px] md:text-[13px] tracking-[0.12em] uppercase text-brand-cream/60 group-hover:text-brand-cream transition-colors duration-300 border-b border-brand-cream/20 group-hover:border-brand-cream pb-0.5">
                  fakhreemal@gmail.com
                </span>
                <span className="text-brand-cream/30 group-hover:text-brand-cream transition-colors duration-300">↗</span>
              </a>

              <a
                href="https://wa.me/6285117132004"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-detail group flex items-center gap-3 w-fit"
              >
                <span className="font-space text-[11px] md:text-[13px] tracking-[0.12em] uppercase text-brand-cream/60 group-hover:text-brand-cream transition-colors duration-300 border-b border-brand-cream/20 group-hover:border-brand-cream pb-0.5">
                  WhatsApp +62 851 1713 2004
                </span>
                <span className="text-brand-cream/30 group-hover:text-brand-cream transition-colors duration-300">↗</span>
              </a>
            </div>

            <div className="contact-detail flex flex-col gap-4">
              <span className="font-space text-[9px] tracking-[0.3em] uppercase text-brand-cream/25">
                Follow
              </span>
              <div className="flex items-center gap-6">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2.5"
                    aria-label={s.label}
                  >
                    <span className="text-brand-cream/40 group-hover:text-brand-cream transition-colors duration-300">
                      {s.icon}
                    </span>
                    <span className="font-space text-[9px] tracking-[0.2em] uppercase text-brand-cream/35 group-hover:text-brand-cream/80 transition-colors duration-300">
                      {s.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="contact-detail flex justify-between items-center border-t border-brand-cream/10 pt-6">
            <span className="font-space text-[9px] tracking-[0.3em] uppercase text-brand-cream/20">
              Bogor, Indonesia
            </span>
            <span className="font-space text-[9px] tracking-[0.3em] uppercase text-brand-cream/20">
              Fakhri Akmal © 2024
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
