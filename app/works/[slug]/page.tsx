import Link from "next/link";
import { notFound } from "next/navigation";
import { works, accentVar } from "@/lib/works";
import WorksGallery from "@/components/WorksGallery";

export function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = works.find((w) => w.slug === slug);
  return {
    title: work ? `${work.title} — Fakhri Akmal` : "Work — Fakhri Akmal",
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = works.find((w) => w.slug === slug);
  if (!work) notFound();

  const accentColor = accentVar[work.accent];
  const currentIdx = works.indexOf(work);
  const prev = works[currentIdx - 1] ?? null;
  const next = works[currentIdx + 1] ?? null;
  const total = works.length;

  return (
    <main className="relative min-h-screen bg-brand-ink-deep text-brand-cream">

      {/* ── Header ── editorial dark masthead */}
      <header className="relative bg-brand-ink-deep bg-geometry-pattern bg-fixed border-b border-brand-linen/15 [--black:var(--ink-deep)]">
        <div className="px-4 pt-28 pb-12 md:px-8 md:pt-36 md:pb-16">

          {/* Top breadcrumb / index bar */}
          <div className="flex items-center justify-between mb-16 md:mb-24">
            <Link
              href="/#works"
              className="group inline-flex items-center gap-3 font-space text-[10px] tracking-[0.3em] uppercase text-brand-linen/65 hover:text-brand-linen transition-colors duration-300"
            >
              <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1">←</span>
              All Works
            </Link>
            <span className="font-space text-[10px] tracking-[0.3em] uppercase text-brand-linen/45">
              {work.index} / {String(total).padStart(2, "0")}
            </span>
          </div>

          {/* Category pill */}
          <div className="flex items-center gap-3 mb-6">
            <span
              className="inline-block w-8 h-px"
              style={{ backgroundColor: accentColor }}
            />
            <span
              className="font-space text-[10px] tracking-[0.3em] uppercase font-bold"
              style={{ color: accentColor }}
            >
              {work.category}
            </span>
          </div>

          {/* Massive title */}
          <h1 className="font-bungee text-[18vw] md:text-[14vw] leading-[0.86] uppercase tracking-tight text-brand-linen">
            {work.title}
          </h1>

          {/* Bottom meta strip */}
          <div className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-12 gap-6 md:gap-8 items-end">
            <div className="md:col-span-3">
              <span className="block font-space text-[9px] tracking-[0.3em] uppercase text-brand-linen/55 mb-2">
                Year
              </span>
              <span className="font-bungee text-[8vw] md:text-[2.4vw] leading-none text-brand-linen">
                {work.year}
              </span>
            </div>
            <div className="md:col-span-3">
              <span className="block font-space text-[9px] tracking-[0.3em] uppercase text-brand-linen/55 mb-2">
                Frames
              </span>
              <span className="font-bungee text-[8vw] md:text-[2.4vw] leading-none text-brand-linen">
                {String(work.images.length).padStart(2, "0")}
              </span>
            </div>
            <div className="md:col-span-6 md:text-right">
              <span className="block font-space text-[9px] tracking-[0.3em] uppercase text-brand-linen/55 mb-2">
                Discipline
              </span>
              <span className="font-space text-[12px] md:text-[13px] tracking-[0.18em] uppercase text-brand-linen/90">
                Art Direction · Editorial · {work.category}
              </span>
            </div>
          </div>

          {/* Accent rule */}
          <div className="mt-10 h-px w-full bg-brand-linen/15 relative overflow-hidden">
            <span
              className="absolute left-0 top-0 h-full w-1/4"
              style={{ backgroundColor: accentColor }}
            />
          </div>
        </div>
      </header>

      {/* ── Gallery ── light editorial canvas */}
      <section className="relative bg-brand-cream-dark bg-geometry-pattern-light bg-fixed [--cream:var(--cream-dark)]">
        <div className="px-4 pt-16 pb-20 md:px-8 md:pt-24 md:pb-32">

          {/* Section label */}
          <div className="flex items-end justify-between mb-10 md:mb-16">
            <div className="flex items-center gap-3">
              <span
                className="inline-block w-6 h-px"
                style={{ backgroundColor: accentColor }}
              />
              <span className="font-space text-[10px] tracking-[0.3em] uppercase text-brand-ink/70">
                Selected Frames
              </span>
            </div>
            <span className="font-space text-[10px] tracking-[0.3em] uppercase text-brand-ink/55">
              Tap any frame to expand
            </span>
          </div>

          <WorksGallery
            images={work.images}
            title={work.title}
            accentColor={accentColor}
          />
        </div>
      </section>

      {/* ── Prev / Next nav ── */}
      <nav className="relative bg-brand-ink-deep border-t border-brand-cream/15">
        <div className="px-4 py-14 md:px-8 md:py-20">
          <div className="flex items-center justify-between mb-10">
            <span className="font-space text-[10px] tracking-[0.3em] uppercase text-brand-cream/55">
              Continue
            </span>
            <Link
              href="/#works"
              className="font-space text-[10px] tracking-[0.3em] uppercase text-brand-cream/70 hover:text-brand-cream transition-colors duration-300"
            >
              Index ↗
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-6 md:gap-12 items-stretch">
            {prev ? (
              <Link
                href={`/works/${prev.slug}`}
                className="group flex flex-col gap-3 border-l border-brand-cream/15 pl-4 md:pl-8 hover:border-brand-cream/40 transition-colors duration-300"
              >
                <span className="font-space text-[9px] tracking-[0.3em] uppercase text-brand-cream/60 group-hover:text-brand-cream/70 transition-colors duration-300">
                  ← Prev · {prev.index}
                </span>
                <span
                  className="font-bungee text-[7vw] md:text-[3vw] leading-[0.95] uppercase tracking-tight text-brand-cream/70 group-hover:text-brand-cream transition-colors duration-500"
                >
                  {prev.title}
                </span>
                <span
                  className="font-space text-[9px] tracking-[0.3em] uppercase opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ color: accentVar[prev.accent] }}
                >
                  {prev.category}
                </span>
              </Link>
            ) : (
              <div className="border-l border-brand-cream/5 pl-4 md:pl-8 flex flex-col gap-3 opacity-30">
                <span className="font-space text-[9px] tracking-[0.3em] uppercase text-brand-cream/55">
                  — Start
                </span>
                <span className="font-bungee text-[7vw] md:text-[3vw] leading-[0.95] uppercase tracking-tight text-brand-cream/40">
                  First Work
                </span>
              </div>
            )}

            {next ? (
              <Link
                href={`/works/${next.slug}`}
                className="group flex flex-col gap-3 items-end text-right border-r border-brand-cream/15 pr-4 md:pr-8 hover:border-brand-cream/40 transition-colors duration-300"
              >
                <span className="font-space text-[9px] tracking-[0.3em] uppercase text-brand-cream/60 group-hover:text-brand-cream/70 transition-colors duration-300">
                  {next.index} · Next →
                </span>
                <span
                  className="font-bungee text-[7vw] md:text-[3vw] leading-[0.95] uppercase tracking-tight text-brand-cream/70 group-hover:text-brand-cream transition-colors duration-500"
                >
                  {next.title}
                </span>
                <span
                  className="font-space text-[9px] tracking-[0.3em] uppercase opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ color: accentVar[next.accent] }}
                >
                  {next.category}
                </span>
              </Link>
            ) : (
              <div className="border-r border-brand-cream/5 pr-4 md:pr-8 flex flex-col gap-3 items-end text-right opacity-30">
                <span className="font-space text-[9px] tracking-[0.3em] uppercase text-brand-cream/55">
                  End —
                </span>
                <span className="font-bungee text-[7vw] md:text-[3vw] leading-[0.95] uppercase tracking-tight text-brand-cream/40">
                  Last Work
                </span>
              </div>
            )}
          </div>
        </div>
      </nav>

    </main>
  );
}
