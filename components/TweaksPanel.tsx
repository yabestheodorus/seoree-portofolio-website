"use client";

import { useEffect, useState } from "react";

export type Scheme = "green" | "noir" | "ivory";
export type Speed = "normal" | "fast" | "slow";
export type Layout = "diagonal" | "split";

interface TweaksPanelProps {
  onSchemeChange: (s: Scheme) => void;
  onSpeedChange: (s: Speed) => void;
  onLayoutChange: (l: Layout) => void;
  currentScheme: Scheme;
  currentSpeed: Speed;
  currentLayout: Layout;
}

export default function TweaksPanel({
  onSchemeChange,
  onSpeedChange,
  onLayoutChange,
  currentScheme,
  currentSpeed,
  currentLayout,
}: TweaksPanelProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === "__activate_edit_mode") setIsVisible(true);
      if (e.data?.type === "__deactivate_edit_mode") setIsVisible(false);
    };
    window.addEventListener("message", handleMessage);
    // Notify parent that edit mode is available (simulating original behavior)
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="tweaks-panel fixed bottom-8 right-8 z-[1000] bg-brand-ink/95 border border-white/10 rounded-[2px] p-6 w-[260px] shadow-[0_24px_80px_rgba(0,0,0,0.4)] flex flex-col gap-5">
      <div className="tweaks-title font-sans text-[10px] tracking-[0.3em] uppercase text-brand-gold pb-4 border-b border-white/10">
        Tweaks
      </div>

      <div className="tweak-row flex flex-col gap-2">
        <div className="tweak-label font-sans text-[9px] tracking-[0.2em] uppercase text-brand-cream/50">
          Color Scheme
        </div>
        <div className="tweak-options flex gap-2 flex-wrap">
          {(["green", "noir", "ivory"] as Scheme[]).map((s) => (
            <button
              key={s}
              onClick={() => onSchemeChange(s)}
              className={`tweak-btn font-sans text-[9px] tracking-[0.15em] uppercase px-3 py-1.5 border rounded-[1px] transition-all duration-200 cursor-pointer ${
                currentScheme === s
                  ? "border-brand-gold text-brand-gold bg-brand-gold/10"
                  : "border-white/15 text-brand-cream/60 hover:border-brand-gold hover:text-brand-gold"
              }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="tweak-row flex flex-col gap-2">
        <div className="tweak-label font-sans text-[9px] tracking-[0.2em] uppercase text-brand-cream/50">
          Marquee Speed
        </div>
        <div className="tweak-options flex gap-2 flex-wrap">
          {(["normal", "fast", "slow"] as Speed[]).map((s) => (
            <button
              key={s}
              onClick={() => onSpeedChange(s)}
              className={`tweak-btn font-sans text-[9px] tracking-[0.15em] uppercase px-3 py-1.5 border rounded-[1px] transition-all duration-200 cursor-pointer ${
                currentSpeed === s
                  ? "border-brand-gold text-brand-gold bg-brand-gold/10"
                  : "border-white/15 text-brand-cream/60 hover:border-brand-gold hover:text-brand-gold"
              }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="tweak-row flex flex-col gap-2">
        <div className="tweak-label font-sans text-[9px] tracking-[0.2em] uppercase text-brand-cream/50">
          Hero Layout
        </div>
        <div className="tweak-options flex gap-2 flex-wrap">
          {(["diagonal", "split"] as Layout[]).map((l) => (
            <button
              key={l}
              onClick={() => onLayoutChange(l)}
              className={`tweak-btn font-sans text-[9px] tracking-[0.15em] uppercase px-3 py-1.5 border rounded-[1px] transition-all duration-200 cursor-pointer ${
                currentLayout === l
                  ? "border-brand-gold text-brand-gold bg-brand-gold/10"
                  : "border-white/15 text-brand-cream/60 hover:border-brand-gold hover:text-brand-gold"
              }`}
            >
              {l.charAt(0).toUpperCase() + l.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
